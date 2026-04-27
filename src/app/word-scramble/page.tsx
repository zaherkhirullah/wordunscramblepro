import { createPageMetadata } from '@/lib/metadata'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import UnscrambleTool from '@/components/UnscrambleTool'
import GoogleAd from '@/components/ads/GoogleAd'
import RelatedTools from '@/components/RelatedTools'
import Link from 'next/link'

export const metadata = createPageMetadata({
  title: 'Word Scramble - Unscramble Scrambled Words',
  description:
    'Solve any word scramble puzzle instantly. Enter scrambled letters and find all valid English words. Works for word scramble games, jumbles, and anagram puzzles.',
  path: '/word-scramble',
  keywords: [
    'word scramble',
    'word scramble solver',
    'word jumble',
    'jumble solver',
    'scrambled words',
    'word scramble game',
  ],
})

export default function WordScramblePage({ searchParams }: { searchParams: { word?: string } }) {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="font-display font-bold text-navy mb-2">Word Scramble Solver</h1>
          <p className="text-navy/60 font-body mb-8">
            Paste in any scrambled word or jumble and find the answer instantly.
          </p>

          <UnscrambleTool defaultLetters={searchParams.word} />

          <div className="mt-6">
            <GoogleAd slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP_BANNER || ''} format="leaderboard" />
          </div>

          <div className="mt-16 space-y-10 border-t border-parchment-dark pt-10">
            <div>
              <h2 className="font-display text-2xl font-bold text-navy mb-3">
                What is a word scramble?
              </h2>
              <p className="text-navy/70 font-body leading-relaxed">
                A word scramble (also called a word jumble) is a puzzle where you are given a set of
                mixed-up letters and must rearrange them to form a valid English word. Word scrambles
                appear in newspapers, puzzle books, classroom exercises and mobile apps. Our solver handles
                every difficulty level — from simple 3-letter scrambles to challenging 10+ letter jumbles.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-navy mb-3">
                Strategies for solving word scrambles
              </h2>
              <ul className="space-y-3 font-body text-navy/70">
                {[
                  {
                    tip: 'Look for vowels first',
                    detail:
                      'Every English word needs at least one vowel (A, E, I, O, U). Group your vowels and consonants mentally before trying combinations.',
                  },
                  {
                    tip: 'Spot common letter pairs',
                    detail:
                      'Common digraphs like TH, SH, CH, WH, PH and QU appear frequently. Identify them early to reduce the search space.',
                  },
                  {
                    tip: 'Try common endings',
                    detail:
                      'Endings like -ING, -ED, -ER, -LY, -TION and -NESS appear in thousands of English words. See if your letters can form one.',
                  },
                  {
                    tip: 'Use the solver to check',
                    detail:
                      "Once you have a guess, enter all the letters above to see if it's one of the valid answers and discover other words you may have missed.",
                  },
                ].map(({ tip, detail }) => (
                  <li key={tip} className="flex gap-3">
                    <span className="text-gold mt-1 shrink-0">•</span>
                    <span>
                      <strong className="text-navy">{tip}: </strong>
                      {detail}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-navy mb-3">
                Popular word scramble examples
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { scramble: 'EPLAP', answer: 'APPLE' },
                  { scramble: 'RETAW', answer: 'WATER' },
                  { scramble: 'OUSHE', answer: 'HOUSE' },
                  { scramble: 'RELTTET', answer: 'LETTER' },
                  { scramble: 'LDWOR', answer: 'WORLD' },
                  { scramble: 'GNRAEO', answer: 'ORANGE' },
                  { scramble: 'BARET', answer: 'BRATE / TABLE' },
                  { scramble: 'CITSMU', answer: 'MUSIC' },
                ].map(({ scramble, answer }) => (
                  <Link href={`/word-scramble?word=${scramble}`} key={scramble} className="block">
                    <div className="card py-3 text-center">
                      <p className="font-display font-bold text-navy tracking-widest text-lg">
                        {scramble}
                      </p>
                      <p className="text-xs text-navy/40 font-body mt-1">{answer}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom Ad */}
            <div className="mt-10">
              <GoogleAd slot={process.env.NEXT_PUBLIC_AD_SLOT_CONTENT_BOTTOM || ''} format="rectangle" />
            </div>
            {/* Related Tools */}
            <div className="mt-10 border-t border-parchment-dark pt-10">
              <RelatedTools currentPath="/word-scramble" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
