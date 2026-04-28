import { notFound } from 'next/navigation'
import { getWordsContaining, getLetterCategorySEO, groupWordsByLength } from '@/lib/category-engine'
import { createPageMetadata } from '@/lib/metadata'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import GoogleAd from '@/components/ads/GoogleAd'
import RelatedTools from '@/components/RelatedTools'
import Link from 'next/link'

export const dynamic = 'force-static'

const VALID_LETTERS = new Set('abcdefghijklmnopqrstuvwxyz'.split(''))
const ALL_LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('')

export async function generateStaticParams() {
  return ALL_LETTERS.map((letter) => ({ letter }))
}

export async function generateMetadata({ params }: { params: { letter: string } }) {
  const { letter } = params
  if (!VALID_LETTERS.has(letter)) return {}
  const seo = getLetterCategorySEO(letter, 'contains')
  return createPageMetadata({
    title: seo.title,
    description: seo.description,
    path: `/words/containing/${letter}`,
    keywords: seo.keywords,
  })
}

const MAX_PER_LENGTH = 150

export default function WordsContainingPage({ params }: { params: { letter: string } }) {
  const { letter } = params
  if (!VALID_LETTERS.has(letter)) notFound()

  const seo = getLetterCategorySEO(letter, 'contains')
  const words = getWordsContaining(letter)
  const grouped = groupWordsByLength(words)
  const lengths = Object.keys(grouped).map(Number).sort((a, b) => a - b)

  const letterIndex = ALL_LETTERS.indexOf(letter)
  const prevLetter = letterIndex > 0 ? ALL_LETTERS[letterIndex - 1] : null
  const nextLetter = letterIndex < ALL_LETTERS.length - 1 ? ALL_LETTERS[letterIndex + 1] : null
  const L = letter.toUpperCase()

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          {/* Breadcrumb */}
          <nav className="text-sm text-navy/50 font-body mb-3">
            <Link href="/categories" className="hover:text-gold transition-colors">Categories</Link>
            <span className="mx-2">/</span>
            <Link href="/words" className="hover:text-gold transition-colors">Words</Link>
            <span className="mx-2">/</span>
            <span className="text-navy">Words Containing {L}</span>
          </nav>

          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display font-bold text-navy mb-2">{seo.h1}</h1>
            <div className="flex items-center gap-3 mb-3">
              <span className="tag-gold font-display font-bold">{words.length.toLocaleString()} words</span>
              <span className="text-sm text-navy/50 font-body">Click any word to check it in the dictionary</span>
            </div>
            <p className="text-navy/60 font-body leading-relaxed max-w-2xl">{seo.intro}</p>
          </div>

          {/* Words grouped by length */}
          {lengths.map((len) => {
            const lengthWords = grouped[len]
            const shown = lengthWords.slice(0, MAX_PER_LENGTH)
            const remaining = lengthWords.length - shown.length
            return (
              <section key={len} className="mb-8">
                <h2 className="font-display font-bold text-navy text-xl mb-3 border-b border-gold/20 pb-2">
                  {len}-Letter Words Containing {L}
                  <span className="ml-2 text-sm font-body font-normal text-navy/40">({lengthWords.length})</span>
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {shown.map((word) => (
                    <Link
                      key={word}
                      href={`/check-dictionary?word=${word.toUpperCase()}`}
                      className="inline-flex items-center justify-center px-2 py-1 rounded-lg bg-parchment-dark hover:bg-gold/10 border border-transparent hover:border-gold/30 font-display font-bold text-navy uppercase text-xs transition-colors cursor-pointer"
                    >
                      {word}
                    </Link>
                  ))}
                </div>
                {remaining > 0 && (
                  <p className="text-xs text-navy/40 font-body mt-2">
                    Showing {MAX_PER_LENGTH} of {lengthWords.length} words
                  </p>
                )}
              </section>
            )
          })}

          {/* About card */}
          <div className="card mt-10 mb-8">
            <h2 className="font-display font-semibold text-navy text-xl mb-3">About Words Containing {L}</h2>
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

          {/* Ad */}
          <div className="mb-8">
            <GoogleAd slot={process.env.NEXT_PUBLIC_AD_SLOT_CONTENT_BOTTOM || ''} format="rectangle" />
          </div>

          {/* Explore More */}
          <div className="card mb-8">
            <h3 className="font-display font-semibold text-navy mb-4">Explore More</h3>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/words/starting-with/${letter}`}
                className="inline-flex items-center px-4 py-2 rounded-lg border border-navy/20 hover:border-gold/40 text-navy font-body text-sm transition-colors"
              >
                Words Starting With {L}
              </Link>
              <Link
                href={`/words/ending-with/${letter}`}
                className="inline-flex items-center px-4 py-2 rounded-lg border border-navy/20 hover:border-gold/40 text-navy font-body text-sm transition-colors"
              >
                Words Ending With {L}
              </Link>
              {prevLetter && (
                <Link
                  href={`/words/containing/${prevLetter}`}
                  className="inline-flex items-center px-4 py-2 rounded-lg border border-navy/20 hover:border-gold/40 text-navy font-body text-sm transition-colors"
                >
                  ← Words Containing {prevLetter.toUpperCase()}
                </Link>
              )}
              {nextLetter && (
                <Link
                  href={`/words/containing/${nextLetter}`}
                  className="inline-flex items-center px-4 py-2 rounded-lg border border-navy/20 hover:border-gold/40 text-navy font-body text-sm transition-colors"
                >
                  Words Containing {nextLetter.toUpperCase()} →
                </Link>
              )}
              <Link href="/categories" className="btn-primary text-sm">All Categories</Link>
            </div>
          </div>

          <RelatedTools currentPath={`/words/containing/${letter}`} />
        </div>
      </main>
      <Footer />
    </>
  )
}
