import { createPageMetadata } from '@/lib/metadata'
import { getWordsByLength } from '@/lib/word-engine/loader'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import GoogleAd from '@/components/ads/GoogleAd'
import Link from 'next/link'

export const metadata = createPageMetadata({
  title: '5 Letter Words – Complete List (Wordle & Scrabble)',
  description: 'All valid 5-letter words from ENABLE — the reference dictionary for Wordle, Scrabble and Words With Friends. Browse 8,000+ words grouped A–Z.',
  path: '/word-lists/5-letter',
  keywords: ['5 letter words', 'five letter words', 'wordle words', '5 letter scrabble words', 'five letter wordle words'],
})

export default function FiveLetterWordsPage() {
  const wordsSet = getWordsByLength(5, 'enable')
  const words = Array.from(wordsSet).sort()

  // Group by first letter
  const grouped: Record<string, string[]> = {}
  for (const word of words) {
    const letter = word[0].toUpperCase()
    if (!grouped[letter]) grouped[letter] = []
    grouped[letter].push(word)
  }
  const letters = Object.keys(grouped).sort()

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          {/* Header */}
          <div className="mb-8">
            <nav className="text-sm text-navy/50 font-body mb-3">
              <Link href="/word-lists" className="hover:text-gold transition-colors">Word Lists</Link>
              <span className="mx-2">/</span>
              <span className="text-navy">5-Letter Words</span>
            </nav>
            <h1 className="font-display font-bold text-navy mb-2">5-Letter Words</h1>
            <p className="text-navy/60 font-body mb-3">
              All valid 5-letter words from the ENABLE word list, sorted alphabetically.
            </p>
            {/* Wordle callout */}
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-lg px-4 py-2 mb-4">
              <span className="text-gold font-display font-bold text-sm">Wordle</span>
              <span className="text-navy/70 font-body text-sm">5-letter words are the building block of Wordle. Browse them all below.</span>
              <Link href="/wordle-solver" className="text-gold font-body text-sm font-semibold hover:underline ml-1">Try Wordle Solver →</Link>
            </div>
            <p className="text-xs text-navy/40 font-body mb-4">
              Showing words from the ENABLE word list. Download the full list for 173,000+ words.
            </p>
            {/* Stats bar */}
            <div className="flex items-center gap-3">
              <span className="tag-gold font-display font-bold">{words.length} words</span>
              <span className="text-sm text-navy/50 font-body">Click any word to check it in the dictionary</span>
            </div>
          </div>

          {/* Alphabetical sections */}
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

          {/* SEO paragraph */}
          <div className="card mt-10 mb-8">
            <h2 className="font-display font-semibold text-navy text-xl mb-3">About 5-Letter Words</h2>
            <p className="text-navy/70 font-body text-sm leading-relaxed mb-3">
              Five-letter words are the foundation of Wordle — the viral daily word game that challenges players to guess a hidden 5-letter word in six tries. The ENABLE dictionary contains over 8,000 valid 5-letter words, and Wordle draws its answers from a carefully curated subset of common ones.
            </p>
            <p className="text-navy/70 font-body text-sm leading-relaxed">
              In Scrabble, 5-letter words are key for bingos (playing all 7 tiles). Words like <strong>ADZES</strong>, <strong>JAZZY</strong>, and <strong>SQUAB</strong> can earn massive points on triple-word squares. Use our{' '}
              <Link href="/wordle-solver" className="text-gold hover:underline font-semibold">Wordle Solver</Link> to narrow down your guesses using letter patterns.
            </p>
          </div>

          {/* Ad */}
          <div className="mb-8">
            <GoogleAd slot={process.env.NEXT_PUBLIC_AD_SLOT_CONTENT_BOTTOM || ''} format="rectangle" />
          </div>

          {/* Browse other word lists */}
          <div className="card">
            <h3 className="font-display font-semibold text-navy mb-4">Browse Other Word Lists</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/word-lists" className="btn-primary text-sm">All Word Lists</Link>
              <Link href="/two-letter-words" className="inline-flex items-center px-4 py-2 rounded-lg border border-navy/20 hover:border-gold/40 text-navy font-body text-sm transition-colors">2-Letter Words</Link>
              <Link href="/word-lists/3-letter" className="inline-flex items-center px-4 py-2 rounded-lg border border-navy/20 hover:border-gold/40 text-navy font-body text-sm transition-colors">3-Letter Words</Link>
              <Link href="/word-lists/4-letter" className="inline-flex items-center px-4 py-2 rounded-lg border border-navy/20 hover:border-gold/40 text-navy font-body text-sm transition-colors">4-Letter Words</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
