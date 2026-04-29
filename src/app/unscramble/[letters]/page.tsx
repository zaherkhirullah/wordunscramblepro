import { notFound } from 'next/navigation'
import { getAllLetterCombos, getComboWords, getComboCategorySEO, groupWordsByLength } from '@/lib/category-engine'
import { createPageMetadata } from '@/lib/metadata'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import GoogleAd from '@/components/ads/GoogleAd'
import RelatedTools from '@/components/RelatedTools'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: { letters: string } }) {
  const seo = getComboCategorySEO(params.letters)
  return createPageMetadata({
    title: seo.title,
    description: seo.description,
    path: `/unscramble/${params.letters}`,
    keywords: seo.keywords,
  })
}

function getSimilarCombos(current: string, allCombos: string[], count = 8): string[] {
  const currentSet = current.split('')
  return allCombos
    .filter((c) => c !== current)
    .map((c) => {
      const cSet = c.split('')
      const shared = currentSet.filter((l) => cSet.includes(l)).length
      return { combo: c, shared }
    })
    .sort((a, b) => b.shared - a.shared)
    .slice(0, count)
    .map((x) => x.combo)
}

export default function UnscrambleLettersPage({ params }: { params: { letters: string } }) {
  const { letters } = params
  if (!letters || letters.length === 0) notFound()

  const seo = getComboCategorySEO(letters)
  const words = getComboWords(letters)
  const grouped = groupWordsByLength(words.map((w) => w.word))
  const lengths = Object.keys(grouped).map(Number).sort((a, b) => b - a)

  const allCombos = getAllLetterCombos()
  const similarCombos = getSimilarCombos(letters, allCombos)

  const LETTERS_UPPER = letters.toUpperCase()

  // Stats
  const totalWords = words.length
  const bestWord = words.reduce<{ word: string; points: number } | null>((best, w) => {
    if (!best || w.points > best.points) return w
    return best
  }, null)

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          {/* Breadcrumb */}
          <nav className="text-sm text-navy/50 font-body mb-3">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/unscramble" className="hover:text-gold transition-colors">Unscramble</Link>
            <span className="mx-2">/</span>
            <span className="text-navy">{LETTERS_UPPER}</span>
          </nav>

          {/* Header with letter tiles */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {LETTERS_UPPER.split('').map((letter, i) => (
                <span
                  key={i}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg border-2 border-gold/60 bg-gold/10 font-display font-bold text-navy text-lg"
                >
                  {letter}
                </span>
              ))}
            </div>
            <h1 className="font-display font-bold text-navy mb-2">{seo.h1}</h1>
            <p className="text-navy/60 font-body leading-relaxed max-w-2xl">{seo.intro}</p>
          </div>

          {/* Results */}
          {totalWords === 0 ? (
            <div className="card mb-8 text-center py-8">
              <p className="text-navy/60 font-body mb-4">
                No valid words found for <strong>{LETTERS_UPPER}</strong>.
              </p>
              <Link href="/" className="btn-primary">
                Try the Full Unscramble Tool →
              </Link>
            </div>
          ) : (
            <>
              {/* Stats bar */}
              <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-parchment-dark rounded-lg border border-gold/10">
                <div className="text-center">
                  <div className="font-display font-bold text-navy text-2xl">{totalWords}</div>
                  <div className="text-xs text-navy/50 font-body">Total Words</div>
                </div>
                {bestWord && (
                  <>
                    <div className="w-px h-8 bg-navy/10" />
                    <div className="text-center">
                      <div className="font-display font-bold text-navy text-xl uppercase">{bestWord.word}</div>
                      <div className="text-xs text-navy/50 font-body">Best Word</div>
                    </div>
                    <div className="w-px h-8 bg-navy/10" />
                    <div className="text-center">
                      <div className="font-display font-bold text-gold text-2xl">{bestWord.points}</div>
                      <div className="text-xs text-navy/50 font-body">Best Points</div>
                    </div>
                  </>
                )}
              </div>

              {/* Words by length */}
              {lengths.map((len) => {
                const lengthWords = grouped[len]
                const wordObjs = words.filter((w) => w.word.length === len)
                return (
                  <section key={len} className="mb-8">
                    <h2 className="font-display font-bold text-navy text-xl mb-3 border-b border-gold/20 pb-2">
                      {len}-Letter Words
                      <span className="ml-2 text-sm font-body font-normal text-navy/40">({lengthWords.length} words)</span>
                    </h2>
                    <div className="flex flex-wrap gap-1.5">
                      {wordObjs.map(({ word, points }) => (
                        <Link
                          key={word}
                          href={`/check-dictionary?word=${word.toUpperCase()}`}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-parchment-dark hover:bg-gold/10 border border-transparent hover:border-gold/30 font-display font-bold text-navy uppercase text-xs transition-colors cursor-pointer"
                        >
                          {word}
                          <span className="text-gold text-[10px] font-normal">{points}</span>
                        </Link>
                      ))}
                    </div>
                  </section>
                )
              })}
            </>
          )}

          {/* About card */}
          <div className="card mt-10 mb-8">
            <h2 className="font-display font-semibold text-navy text-xl mb-3">About Unscrambling {LETTERS_UPPER}</h2>
            <p className="text-navy/70 font-body text-sm leading-relaxed mb-4">{seo.about}</p>
            {seo.tips.length > 0 && (
              <ul className="space-y-1.5">
                {seo.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-navy/70 font-body">
                    <span className="text-gold mt-0.5">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* CTA to main tool */}
          <div className="card mb-8 bg-gold/5 border border-gold/20">
            <h3 className="font-display font-semibold text-navy mb-2">Try the Full Unscramble Tool</h3>
            <p className="text-navy/60 font-body text-sm mb-4">
              Enter up to 15 letters including wildcards (? *) to find every possible word.
            </p>
            <Link href="/" className="btn-primary">
              Open Word Unscrambler →
            </Link>
          </div>

          {/* Ad */}
          <div className="mb-8">
            <GoogleAd slot={process.env.NEXT_PUBLIC_AD_SLOT_CONTENT_BOTTOM || ''} format="rectangle" />
          </div>

          {/* Similar Combos */}
          {similarCombos.length > 0 && (
            <div className="card mb-8">
              <h3 className="font-display font-semibold text-navy mb-4">Try Similar Combos</h3>
              <div className="flex flex-wrap gap-2">
                {similarCombos.map((combo) => (
                  <Link
                    key={combo}
                    href={`/unscramble/${combo}`}
                    className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-parchment-dark hover:bg-gold/10 border border-transparent hover:border-gold/30 font-display font-bold text-navy uppercase text-sm transition-colors"
                  >
                    {combo.toUpperCase()}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <RelatedTools currentPath={`/unscramble/${letters}`} />
        </div>
      </main>
      <Footer />
    </>
  )
}
