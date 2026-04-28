import { notFound } from 'next/navigation'
import { getWordsByLengthSorted, getLengthCategorySEO, groupWordsByFirstLetter } from '@/lib/category-engine'
import { createPageMetadata } from '@/lib/metadata'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import GoogleAd from '@/components/ads/GoogleAd'
import RelatedTools from '@/components/RelatedTools'
import Link from 'next/link'

export const dynamic = 'force-static'

// Only lengths NOT covered by static pages (3, 4, 5 have their own static pages)
const DYNAMIC_LENGTHS = [2, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

export async function generateStaticParams() {
  return DYNAMIC_LENGTHS.map((n) => ({ length: String(n) }))
}

export async function generateMetadata({ params }: { params: { length: string } }) {
  const n = parseInt(params.length)
  if (isNaN(n) || n < 2 || n > 15) return {}
  const seo = getLengthCategorySEO(n)
  return createPageMetadata({
    title: seo.title,
    description: seo.description,
    path: `/word-lists/${params.length}`,
    keywords: seo.keywords,
  })
}

export default function WordListByLengthPage({ params }: { params: { length: string } }) {
  const n = parseInt(params.length)
  if (isNaN(n) || n < 2 || n > 15) notFound()

  const seo = getLengthCategorySEO(n)
  const words = getWordsByLengthSorted(n)
  const grouped = groupWordsByFirstLetter(words)
  const letters = Object.keys(grouped).sort()

  // Adjacent lengths for navigation
  const prevLength = DYNAMIC_LENGTHS.includes(n - 1) ? n - 1 : n - 1 >= 3 && n - 1 <= 5 ? n - 1 : null
  const nextLength = DYNAMIC_LENGTHS.includes(n + 1) ? n + 1 : n + 1 >= 3 && n + 1 <= 5 ? n + 1 : null

  function getLengthHref(len: number): string {
    if (len === 3) return '/word-lists/3-letter'
    if (len === 4) return '/word-lists/4-letter'
    if (len === 5) return '/word-lists/5-letter'
    return `/word-lists/${len}`
  }

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          {/* Breadcrumb */}
          <nav className="text-sm text-navy/50 font-body mb-3">
            <Link href="/word-lists" className="hover:text-gold transition-colors">Word Lists</Link>
            <span className="mx-2">/</span>
            <span className="text-navy">{n}-Letter Words</span>
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

          {/* Words grouped alphabetically */}
          {letters.map((letter) => (
            <section key={letter} className="mb-8">
              <h2 className="font-display font-bold text-navy text-2xl mb-3 border-b border-gold/20 pb-2">
                {letter}
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {grouped[letter].map((word) => (
                  <Link
                    key={word}
                    href={`/check-dictionary?word=${word.toUpperCase()}`}
                    className="inline-flex items-center justify-center px-2 py-1 rounded-lg bg-parchment-dark hover:bg-gold/10 border border-transparent hover:border-gold/30 font-display font-bold text-navy uppercase text-xs transition-colors cursor-pointer"
                  >
                    {word}
                  </Link>
                ))}
              </div>
            </section>
          ))}

          {/* About card */}
          <div className="card mt-10 mb-8">
            <h2 className="font-display font-semibold text-navy text-xl mb-3">About {n}-Letter Words</h2>
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

          {/* Browse Other Word Lists */}
          <div className="card mb-8">
            <h3 className="font-display font-semibold text-navy mb-4">Browse Other Word Lists</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/word-lists" className="btn-primary text-sm">All Word Lists</Link>
              {prevLength && (
                <Link
                  href={getLengthHref(prevLength)}
                  className="inline-flex items-center px-4 py-2 rounded-lg border border-navy/20 hover:border-gold/40 text-navy font-body text-sm transition-colors"
                >
                  ← {prevLength}-Letter Words
                </Link>
              )}
              {nextLength && (
                <Link
                  href={getLengthHref(nextLength)}
                  className="inline-flex items-center px-4 py-2 rounded-lg border border-navy/20 hover:border-gold/40 text-navy font-body text-sm transition-colors"
                >
                  {nextLength}-Letter Words →
                </Link>
              )}
              <Link href="/categories" className="inline-flex items-center px-4 py-2 rounded-lg border border-navy/20 hover:border-gold/40 text-navy font-body text-sm transition-colors">
                Word Categories
              </Link>
            </div>
          </div>

          <RelatedTools currentPath={`/word-lists/${params.length}`} />
        </div>
      </main>
      <Footer />
    </>
  )
}
