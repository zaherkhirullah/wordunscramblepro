import { createPageMetadata } from '@/lib/metadata'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import UnscrambleTool from '@/components/UnscrambleTool'
import GoogleAd from '@/components/ads/GoogleAd'
import RelatedTools from '@/components/RelatedTools'

export const metadata = createPageMetadata({
  title: 'Word Descrambler - Unscramble Any Word',
  description:
    'Free word descrambler tool. Enter scrambled letters and instantly find all valid words. Supports wildcards, filters by length, starts with, ends with. Great for Scrabble and Words With Friends.',
  path: '/descrambler',
  keywords: [
    'word descrambler',
    'descramble words',
    'unscramble letters',
    'word finder',
    'scrambled word solver',
    'scrabble word descrambler',
  ],
})

export default function DescramblerPage({ searchParams }: { searchParams: { word?: string } }) {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="font-display font-bold text-navy mb-2">Word Descrambler</h1>
          <p className="text-navy/60 font-body mb-8">
            Enter your scrambled letters and instantly find every valid word hiding in them.
          </p>

          <UnscrambleTool defaultLetters={searchParams.word} />

          <div className="mt-6">
            <GoogleAd slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP_BANNER || ''} format="leaderboard" />
          </div>

          <div className="mt-16 space-y-10 border-t border-parchment-dark pt-10">
            <div>
              <h2 className="font-display text-2xl font-bold text-navy mb-3">
                What is a word descrambler?
              </h2>
              <p className="text-navy/70 font-body leading-relaxed">
                A word descrambler (also called a word unscrambler) takes a jumbled set of letters and
                finds all valid English words that can be formed from those letters. It is an essential
                tool for word game players who want to maximize their score in Scrabble, Words With Friends,
                Wordfeud or any other tile-based game.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-navy mb-3">
                How to use the word descrambler
              </h2>
              <ol className="space-y-3 font-body text-navy/70">
                {[
                  'Type your letters into the input box. Up to 15 letters are supported.',
                  'Add a ? or * to represent a blank tile (wildcard). Results using wildcards are marked.',
                  'Use Advanced Filters to require certain letters, or to set a starting/ending pattern.',
                  'Select your game dictionary (ENABLE, NWL or CSW) to match your word game.',
                  'Click Unscramble Words. Results are grouped by word length, longest first.',
                ].map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gold/20 text-gold-dark text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-navy mb-3">
                Tips for finding high-scoring words
              </h2>
              <ul className="space-y-2 font-body text-navy/70">
                {[
                  'Look for 7- and 8-letter words first — they earn a 50-point bingo bonus in Scrabble.',
                  'High-value tiles (Q, Z, X, J) are worth 10, 10, 8 and 8 points respectively. Find words that use them.',
                  'Common suffixes like -ING, -ED, -ER, -LY and -TION can extend shorter words on the board.',
                  'Two-letter words are invaluable for parallel plays and hooking — learn them all.',
                  'If you have a blank tile, try it as a common letter (E, A, R, T) rather than a rare one.',
                ].map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <span className="text-gold mt-0.5 shrink-0">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Ad */}
            <div className="mt-10">
              <GoogleAd slot={process.env.NEXT_PUBLIC_AD_SLOT_CONTENT_BOTTOM || ''} format="rectangle" />
            </div>
            {/* Related Tools */}
            <div className="mt-10 border-t border-parchment-dark pt-10">
              <RelatedTools currentPath="/descrambler" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
