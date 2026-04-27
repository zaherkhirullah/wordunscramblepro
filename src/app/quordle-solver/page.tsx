import { createPageMetadata } from '@/lib/metadata'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WordleSolverTool from '@/components/WordleSolverTool'
import GoogleAd from '@/components/ads/GoogleAd'
import RelatedTools from '@/components/RelatedTools'

export const metadata = createPageMetadata({
  title: 'Quordle Solver - Solve Quordle & Multi-Wordle Puzzles',
  description:
    'Free Quordle solver. Enter your green, yellow and gray clues for each board to find all valid 5-letter words simultaneously. Works for Quordle, Dordle, Octordle and more.',
  path: '/quordle-solver',
  keywords: [
    'quordle solver',
    'quordle helper',
    'quordle cheat',
    'quordle answer',
    'multi wordle solver',
    'dordle solver',
    '5 letter words',
  ],
})

export default function QuordleSolverPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="font-display font-bold text-navy mb-2">Quordle Solver</h1>
          <p className="text-navy/60 font-body mb-8">
            Solving four Wordle boards at once? Use the solver below for each board independently to
            narrow down possible answers.
          </p>

          {/* Board tabs explanation */}
          <div className="card mb-6 bg-gold/5 border border-gold/20">
            <p className="text-sm font-body text-navy/70 leading-relaxed">
              <strong className="text-navy">How to use for Quordle:</strong> Run the solver once per
              board. Enter that board&apos;s unique clues (green/yellow/gray) and find matching words.
              Your guesses apply to all four boards simultaneously, so shared gray letters carry over.
            </p>
          </div>

          <WordleSolverTool />

          <div className="mt-6">
            <GoogleAd slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP_BANNER || ''} format="leaderboard" />
          </div>

          <div className="mt-16 space-y-10 border-t border-parchment-dark pt-10">
            <div>
              <h2 className="font-display text-2xl font-bold text-navy mb-3">What is Quordle?</h2>
              <p className="text-navy/70 font-body leading-relaxed">
                Quordle is a daily word puzzle that challenges you to solve four Wordle boards
                simultaneously in just nine guesses. Every guess you make applies to all four boards at
                once, so each attempt must be chosen carefully to gain maximum information across all
                boards. Quordle was created by Freddie Meyer and is available at quordle.com.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-navy mb-3">
                Quordle vs Wordle — what changes?
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: 'Boards to solve', wordle: '1', quordle: '4' },
                  { label: 'Guesses allowed', wordle: '6', quordle: '9' },
                  { label: 'Every guess applies to', wordle: '1 board', quordle: 'all 4 boards' },
                  { label: 'Difficulty', wordle: 'Easy–Medium', quordle: 'Hard' },
                ].map(({ label, wordle, quordle }) => (
                  <div key={label} className="card py-3">
                    <p className="font-display font-semibold text-navy mb-2 text-sm">{label}</p>
                    <p className="text-xs font-body text-navy/60">
                      <span className="font-medium text-navy">Wordle:</span> {wordle}
                    </p>
                    <p className="text-xs font-body text-navy/60 mt-1">
                      <span className="font-medium text-navy">Quordle:</span> {quordle}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-navy mb-3">
                Quordle solving strategy
              </h2>
              <ul className="space-y-3 font-body text-navy/70">
                {[
                  {
                    tip: 'Use your first 2–3 guesses to gather information',
                    detail:
                      'Choose high-entropy opening words that cover as many common letters as possible before trying to solve individual boards.',
                  },
                  {
                    tip: 'Track which letters are confirmed absent',
                    detail:
                      'A letter that turns gray on any board is absent from that specific answer. A letter gray on all four boards is absent from all answers.',
                  },
                  {
                    tip: 'Solve your most-constrained board first',
                    detail:
                      'Once one board has several green tiles, shift your guesses to solve it — fewer possible words means less solver work.',
                  },
                  {
                    tip: 'Reserve your last 2 guesses',
                    detail:
                      'Do not commit to a risky guess on guess 8. Use guess 8 for the hardest remaining board and keep guess 9 as a backup.',
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
                Other multi-board Wordle variants
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  {
                    name: 'Dordle',
                    boards: 2,
                    guesses: 7,
                    desc: 'Two boards, seven guesses. A good stepping stone from Wordle to Quordle.',
                  },
                  {
                    name: 'Quordle',
                    boards: 4,
                    guesses: 9,
                    desc: 'The most popular multi-board variant. Four boards, nine guesses.',
                  },
                  {
                    name: 'Octordle',
                    boards: 8,
                    guesses: 13,
                    desc: 'Eight boards, thirteen guesses. Only for the most dedicated Wordle fans.',
                  },
                ].map(({ name, boards, guesses, desc }) => (
                  <div key={name} className="card py-4 text-center">
                    <p className="font-display font-bold text-navy text-lg">{name}</p>
                    <p className="text-xs text-navy/50 font-body mt-1">
                      {boards} boards · {guesses} guesses
                    </p>
                    <p className="text-xs text-navy/60 font-body mt-2 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Ad */}
            <div className="mt-10">
              <GoogleAd slot={process.env.NEXT_PUBLIC_AD_SLOT_CONTENT_BOTTOM || ''} format="rectangle" />
            </div>
            {/* Related Tools */}
            <div className="mt-10 border-t border-parchment-dark pt-10">
              <RelatedTools currentPath="/quordle-solver" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
