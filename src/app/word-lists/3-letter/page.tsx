import { createPageMetadata } from '@/lib/metadata'
import { getWordsByLength } from '@/lib/word-engine/loader'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import GoogleAd from '@/components/ads/GoogleAd'
import Link from 'next/link'

export const metadata = createPageMetadata({
  title: '3 Letter Words – Complete List for Scrabble & Word Games',
  description: 'Complete list of all valid 3-letter words from the ENABLE dictionary. Essential reference for Scrabble, Words With Friends and word game players.',
  path: '/word-lists/3-letter',
  keywords: ['3 letter words', 'three letter words', 'scrabble 3 letter words', '3 letter scrabble words'],
})

export default function ThreeLetterWordsPage() {
  const wordsSet = getWordsByLength(3, 'enable')
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
              <span className="text-navy">3-Letter Words</span>
            </nav>
            <h1 className="font-display font-bold text-navy mb-2">3-Letter Words</h1>
            <p className="text-navy/60 font-body mb-4">
              All valid 3-letter words from the ENABLE word list, sorted alphabetically.
            </p>
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
              <div className="flex flex-wrap gap-2">
                {grouped[letter].map((word) => (
                  <Link
                    key={word}
                    href={`/check-dictionary?word=${word.toUpperCase()}`}
                    className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg bg-parchment-dark hover:bg-gold/10 border border-transparent hover:border-gold/30 font-display font-bold text-navy uppercase text-sm transition-colors cursor-pointer"
                  >
                    {word}
                  </Link>
                ))}
              </div>
            </section>
          ))}

          {/* SEO paragraph */}
          <div className="card mt-10 mb-8">
            <h2 className="font-display font-semibold text-navy text-xl mb-3">About 3-Letter Words in Scrabble</h2>
            <p className="text-navy/70 font-body text-sm leading-relaxed mb-3">
              Three-letter words are among the most important to memorize in Scrabble. With over 1,000 valid 3-letter words in the ENABLE dictionary, these short plays let you extend existing tiles on the board, clear awkward racks, and set up high-scoring follow-up moves.
            </p>
            <p className="text-navy/70 font-body text-sm leading-relaxed">
              Common 3-letter words like <strong>QAT</strong>, <strong>ZAX</strong>, <strong>JEU</strong>, and <strong>OXO</strong> are invaluable when you need to play off premium squares. Mastering the full list of 3-letter words will dramatically improve your Scrabble endgame — when the board is tight, these short words are often your only option.
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
              <Link href="/word-lists/4-letter" className="inline-flex items-center px-4 py-2 rounded-lg border border-navy/20 hover:border-gold/40 text-navy font-body text-sm transition-colors">4-Letter Words</Link>
              <Link href="/word-lists/5-letter" className="inline-flex items-center px-4 py-2 rounded-lg border border-navy/20 hover:border-gold/40 text-navy font-body text-sm transition-colors">5-Letter Words</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
