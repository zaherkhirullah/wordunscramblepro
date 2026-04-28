import GoogleAd from '@/components/ads/GoogleAd'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import RelatedTools from '@/components/RelatedTools'
import { createPageMetadata } from '@/lib/metadata'
import Link from 'next/link'

export const dynamic = 'force-static'

export const metadata = createPageMetadata({
  title: 'Word Categories – Browse by Length, Letter & Pattern | Word Unscramble Pro',
  description: 'Explore thousands of English word categories. Browse words by length (2–15 letters), by containing letter, starting letter, ending letter, or unscramble popular letter combos.',
  path: '/categories',
  keywords: ['word categories', 'words by letter', 'words by length', 'word patterns scrabble'],
})

const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('')

const WORD_LENGTHS = [
  { n: 2, href: '/word-lists/2', label: '2-Letter Words' },
  { n: 3, href: '/word-lists/3-letter', label: '3-Letter Words' },
  { n: 4, href: '/word-lists/4-letter', label: '4-Letter Words' },
  { n: 5, href: '/word-lists/5-letter', label: '5-Letter Words' },
  { n: 6, href: '/word-lists/6', label: '6-Letter Words' },
  { n: 7, href: '/word-lists/7', label: '7-Letter Words' },
  { n: 8, href: '/word-lists/8', label: '8-Letter Words' },
  { n: 9, href: '/word-lists/9', label: '9-Letter Words' },
  { n: 10, href: '/word-lists/10', label: '10-Letter Words' },
  { n: 11, href: '/word-lists/11', label: '11-Letter Words' },
  { n: 12, href: '/word-lists/12', label: '12-Letter Words' },
  { n: 13, href: '/word-lists/13', label: '13-Letter Words' },
  { n: 14, href: '/word-lists/14', label: '14-Letter Words' },
  { n: 15, href: '/word-lists/15', label: '15-Letter Words' },
]

const POPULAR_COMBOS = [
  'aer', 'est', 'aes', 'ing', 'ers', 'ant', 'ate', 'ear',
  'tion', 'ster', 'ness', 'less', 'ment', 'able', 'ious', 'ated',
  'rate', 'tale', 'seat', 'late', 'lane', 'rage', 'lame', 'lean',
]

export default function CategoriesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display font-bold text-navy mb-2">Word Categories</h1>
            <p className="text-navy/60 font-body leading-relaxed max-w-2xl">
              Explore thousands of English words organized into useful categories. Browse by word length,
              find words containing specific letters, or unscramble popular letter combinations for Scrabble and word games.
            </p>
          </div>

          {/* Section 1: Browse by Word Length */}
          <section className="mb-12">
            <h2 className="font-display font-bold text-navy text-2xl mb-4 border-b border-gold/20 pb-2">
              Browse by Word Length
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {WORD_LENGTHS.map(({ n, href, label }) => (
                <Link
                  key={n}
                  title={label}
                  href={href}
                  className="card hover:border-gold/40 border border-transparent group transition-all duration-200 hover:-translate-y-0.5 text-center py-4"
                >
                  <div className="font-display font-bold text-navy text-lg group-hover:text-gold-dark transition-colors">
                    {n}
                  </div>
                  <div className="text-xs text-navy/60 font-body mt-1">{label}</div>
                </Link>
              ))}
            </div>
          </section>

          {/* Section 2: Words Containing Letter */}
          <section className="mb-10">
            <h2 className="font-display font-bold text-navy text-2xl mb-2 border-b border-gold/20 pb-2">
              Words Containing Letter
            </h2>
            <p className="text-navy/50 font-body text-sm mb-4">Find all words that contain a specific letter anywhere.</p>
            <div className="flex flex-wrap gap-2">
              {LETTERS.map((letter) => (
                <Link
                  key={letter}
                  title={`Words Containing Letter ${letter}`}
                  aria-label={`Words Containing Letter ${letter}`}
                  href={`/words/containing/${letter}`}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-parchment-dark hover:bg-gold/10 border border-transparent hover:border-gold/30 font-display font-bold text-navy uppercase transition-colors"
                >
                  {letter.toUpperCase()}
                </Link>
              ))}
            </div>
          </section>

          {/* Section 3: Words Starting With */}
          <section className="mb-10">
            <h2 className="font-display font-bold text-navy text-2xl mb-2 border-b border-gold/20 pb-2">
              Words Starting With
            </h2>
            <p className="text-navy/50 font-body text-sm mb-4">Browse words that begin with each letter of the alphabet.</p>
            <div className="flex flex-wrap gap-2">
              {LETTERS.map((letter) => (
                <Link
                  key={letter}
                  title={`Words Stating with ${letter}`}
                  aria-label={`Words Stating with ${letter}`}
                  href={`/words/starting-with/${letter}`}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-parchment-dark hover:bg-gold/10 border border-transparent hover:border-gold/30 font-display font-bold text-navy uppercase transition-colors"
                >
                  {letter.toUpperCase()}
                </Link>
              ))}
            </div>
          </section>

          {/* Section 4: Words Ending With */}
          <section className="mb-10">
            <h2 className="font-display font-bold text-navy text-2xl mb-2 border-b border-gold/20 pb-2">
              Words Ending With
            </h2>
            <p className="text-navy/50 font-body text-sm mb-4">Find words that end with a specific letter.</p>
            <div className="flex flex-wrap gap-2">
              {LETTERS.map((letter) => (
                <Link
                  key={letter}
                  title={`Words Ending with ${letter}`}
                  aria-label={`Words Ending with ${letter}`}
                  href={`/words/ending-with/${letter}`}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-parchment-dark hover:bg-gold/10 border border-transparent hover:border-gold/30 font-display font-bold text-navy uppercase transition-colors"
                >
                  {letter.toUpperCase()}
                </Link>
              ))}
            </div>
          </section>

          {/* Section 5: Popular Letter Combinations */}
          <section className="mb-10">
            <h2 className="font-display font-bold text-navy text-2xl mb-2 border-b border-gold/20 pb-2">
              Popular Letter Combinations to Unscramble
            </h2>
            <p className="text-navy/50 font-body text-sm mb-4">
              Unscramble these popular letter sets to find all valid words you can make.
            </p>
            <div className="flex flex-wrap gap-2">
              {POPULAR_COMBOS.map((combo) => (
                <Link
                  key={combo}
                  title={`Popular Letter Combinations to Unscramble ${combo}`}
                  aria-label={`Popular Letter Combinations to Unscramble ${combo}`}
                  href={`/unscramble/${combo}`}
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-parchment-dark hover:bg-gold/10 border border-transparent hover:border-gold/30 font-display font-bold text-navy uppercase text-sm transition-colors"
                >
                  {combo.toUpperCase()}
                </Link>
              ))}
            </div>
          </section>

          {/* Ad */}
          <div className="mb-8">
            <GoogleAd slot={process.env.NEXT_PUBLIC_AD_SLOT_CONTENT_BOTTOM || ''} format="rectangle" />
          </div>

          {/* Related Tools */}
          <div className="mb-8">
            <RelatedTools currentPath="/categories" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
