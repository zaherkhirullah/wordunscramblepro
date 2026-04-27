import { createPageMetadata } from '@/lib/metadata'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WordleSolverTool from '@/components/WordleSolverTool'
import GoogleAd from '@/components/ads/GoogleAd'
import RelatedTools from '@/components/RelatedTools'

export const metadata = createPageMetadata({
  title: 'Wordle Solver - Find Today\'s Wordle Answer',
  description:
    'Free Wordle solver tool. Enter your green, yellow and gray letters to instantly find all possible 5-letter Wordle answers. Works for NYT Wordle, Wordle Archive and more.',
  path: '/wordle-solver',
  keywords: [
    'wordle solver',
    'wordle helper',
    'wordle answer today',
    'wordle cheat',
    'nyt wordle solver',
    '5 letter words',
  ],
})

export default function WordleSolverPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="font-display font-bold text-navy mb-2">Wordle Solver</h1>
          <p className="text-navy/60 font-body mb-8">
            Stuck on today&apos;s Wordle? Enter your clues below and instantly see every possible answer.
          </p>

          <WordleSolverTool />

          <div className="mt-6">
            <GoogleAd slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP_BANNER || ''} format="leaderboard" />
          </div>

          {/* SEO content */}
          <div className="mt-16 space-y-10 border-t border-parchment-dark pt-10">
            <div>
              <h2 className="font-display text-2xl font-bold text-navy mb-3">
                What is Wordle?
              </h2>
              <p className="text-navy/70 font-body leading-relaxed">
                Wordle is a daily word puzzle created by Josh Wardle and now published by The New York Times.
                Every day a new secret 5-letter word is chosen and players have six attempts to guess it.
                After each guess, the game tells you which letters are correct and in the right position
                (green tiles), which letters are in the word but in the wrong position (yellow tiles),
                and which letters are not in the word at all (gray tiles).
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-navy mb-3">
                How to use the Wordle Solver
              </h2>
              <ol className="space-y-3 font-body text-navy/70">
                <li className="flex gap-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-forest/10 text-forest text-xs font-bold shrink-0 mt-0.5">
                    1
                  </span>
                  <span>
                    <strong className="text-navy">Green letters:</strong> Enter the letter in the position
                    box that matches. For example, if position 3 is &ldquo;A&rdquo;, type A in box 3.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gold/20 text-gold-dark text-xs font-bold shrink-0 mt-0.5">
                    2
                  </span>
                  <span>
                    <strong className="text-navy">Yellow letters:</strong> Type all letters that appeared
                    yellow in your guesses into the yellow letters field.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-navy/10 text-navy text-xs font-bold shrink-0 mt-0.5">
                    3
                  </span>
                  <span>
                    <strong className="text-navy">Gray letters:</strong> Type all letters that turned gray
                    — these are not in the answer at all.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gold/20 text-gold-dark text-xs font-bold shrink-0 mt-0.5">
                    4
                  </span>
                  <span>
                    Click <strong className="text-navy">Find Wordle Words</strong> to see all remaining
                    valid 5-letter words that match your constraints.
                  </span>
                </li>
              </ol>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-navy mb-3">
                Tips for solving Wordle faster
              </h2>
              <ul className="space-y-2 font-body text-navy/70">
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-0.5">•</span>
                  <span>
                    Start with high-frequency letter words. Good opening guesses include{' '}
                    <strong className="text-navy">CRANE</strong>,{' '}
                    <strong className="text-navy">STARE</strong>,{' '}
                    <strong className="text-navy">ADIEU</strong> or{' '}
                    <strong className="text-navy">RAISE</strong> — they cover the most common vowels and
                    consonants.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-0.5">•</span>
                  <span>
                    Use each guess to eliminate as many letters as possible. Don&apos;t repeat letters you
                    already know are gray.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-0.5">•</span>
                  <span>
                    Remember that the same letter can appear more than once in the answer (e.g.,{' '}
                    <strong className="text-navy">LEVEL</strong>,{' '}
                    <strong className="text-navy">SLEEP</strong>).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-0.5">•</span>
                  <span>
                    Common word endings like <strong className="text-navy">-ING</strong>,{' '}
                    <strong className="text-navy">-TION</strong>, <strong className="text-navy">-ER</strong>,{' '}
                    <strong className="text-navy">-LY</strong> can help narrow results quickly.
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-navy mb-3">
                Other Wordle-style games
              </h2>
              <p className="text-navy/70 font-body leading-relaxed">
                Wordle&apos;s popularity spawned many variants. If you enjoy Wordle, try{' '}
                <a href="/quordle-solver" className="text-gold-dark hover:underline font-medium">
                  Quordle
                </a>{' '}
                (four Wordle boards at once),{' '}
                <strong className="text-navy">Dordle</strong> (two boards), or{' '}
                <strong className="text-navy">Octordle</strong> (eight boards). Our solver works for
                standard 5-letter Wordle. For longer words, try our{' '}
                <a href="/descrambler" className="text-gold-dark hover:underline font-medium">
                  word descrambler
                </a>
                .
              </p>
            </div>

            {/* Bottom Ad */}
            <div className="mt-10">
              <GoogleAd slot={process.env.NEXT_PUBLIC_AD_SLOT_CONTENT_BOTTOM || ''} format="rectangle" />
            </div>
            {/* Related Tools */}
            <div className="mt-10 border-t border-parchment-dark pt-10">
              <RelatedTools currentPath="/wordle-solver" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
