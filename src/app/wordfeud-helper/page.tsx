import { createPageMetadata } from '@/lib/metadata'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import UnscrambleTool from '@/components/UnscrambleTool'
import GoogleAd from '@/components/ads/GoogleAd'
import RelatedTools from '@/components/RelatedTools'

export const metadata = createPageMetadata({
  title: 'Wordfeud Helper - Find the Best Wordfeud Words',
  description:
    'Free Wordfeud helper and word finder. Enter your Wordfeud tiles and find the highest-scoring valid words. Supports the CSW (Collins) dictionary used in Wordfeud.',
  path: '/wordfeud-helper',
  keywords: [
    'wordfeud helper',
    'wordfeud word finder',
    'wordfeud cheat',
    'wordfeud solver',
    'wordfeud dictionary',
    'wordfeud tiles',
  ],
})

export default function WordfeudHelperPage({ searchParams }: { searchParams: { word?: string } }) {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="font-display font-bold text-navy mb-2">Wordfeud Helper</h1>
          <p className="text-navy/60 font-body mb-8">
            Enter your Wordfeud tiles to find every valid word you can play. Uses the CSW (Collins)
            dictionary — the same one Wordfeud uses.
          </p>

          <UnscrambleTool defaultLetters={searchParams.word} />

          <div className="mt-6">
            <GoogleAd slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP_BANNER || ''} format="leaderboard" />
          </div>

          <div className="mt-16 space-y-10 border-t border-parchment-dark pt-10">
            <div>
              <h2 className="font-display text-2xl font-bold text-navy mb-3">What is Wordfeud?</h2>
              <p className="text-navy/70 font-body leading-relaxed">
                Wordfeud is a free multiplayer word game for iOS and Android, very similar to Scrabble.
                Players take turns placing tiles on a 15×15 board to form words and score points. Wordfeud
                uses the Collins Scrabble Words (CSW) dictionary, which is larger than the North American
                NWL/TWL dictionary and includes many British and international English words.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-navy mb-3">
                Wordfeud tile values
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm font-body border-collapse">
                  <thead>
                    <tr className="border-b border-parchment-dark">
                      <th className="text-left py-2 pr-4 font-semibold text-navy">Points</th>
                      <th className="text-left py-2 font-semibold text-navy">Letters</th>
                    </tr>
                  </thead>
                  <tbody className="text-navy/70">
                    {[
                      { pts: 0, letters: 'Blank (×2)' },
                      { pts: 1, letters: 'A, E, I, L, N, O, R, S, T, U' },
                      { pts: 2, letters: 'D, G' },
                      { pts: 3, letters: 'B, C, M, P' },
                      { pts: 4, letters: 'F, H, V, W, Y' },
                      { pts: 5, letters: 'K' },
                      { pts: 8, letters: 'J, X' },
                      { pts: 10, letters: 'Q, Z' },
                    ].map(({ pts, letters }) => (
                      <tr key={pts} className="border-b border-parchment-dark/50">
                        <td className="py-2 pr-4 font-bold text-navy">{pts}</td>
                        <td className="py-2">{letters}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-navy mb-3">
                Wordfeud strategy tips
              </h2>
              <ul className="space-y-2 font-body text-navy/70">
                {[
                  'Wordfeud bonus squares are randomly placed each game — always check their positions before planning your play.',
                  'Use the "Starts with" or "Ends with" filter to find words that hook onto existing board letters.',
                  'CSW contains many more short words than NWL. Two-letter words like ZO, QI, XI and more are valid.',
                  'Playing through a high-value bonus square on your opponent\'s side of the board can swing a game.',
                  'Keep a balanced rack. Avoid hoarding all vowels or all consonants — both slow your scoring potential.',
                ].map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <span className="text-gold shrink-0 mt-0.5">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-navy mb-3">
                Wordfeud vs Scrabble — key differences
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    label: 'Dictionary',
                    wf: 'Collins Scrabble Words (CSW)',
                    sc: 'NWL (North America) or CSW (international)',
                  },
                  {
                    label: 'Bonus squares',
                    wf: 'Randomly placed each game',
                    sc: 'Fixed positions on every board',
                  },
                  {
                    label: 'Blank tiles',
                    wf: '2 blanks in the bag',
                    sc: '2 blanks in the bag',
                  },
                  {
                    label: 'Platform',
                    wf: 'Mobile only (iOS / Android)',
                    sc: 'Board game + many apps',
                  },
                ].map(({ label, wf, sc }) => (
                  <div key={label} className="card py-3">
                    <p className="font-display font-semibold text-navy mb-2 text-sm">{label}</p>
                    <p className="text-xs text-navy/60 font-body">
                      <span className="font-medium text-navy">Wordfeud:</span> {wf}
                    </p>
                    <p className="text-xs text-navy/60 font-body mt-1">
                      <span className="font-medium text-navy">Scrabble:</span> {sc}
                    </p>
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
              <RelatedTools currentPath="/wordfeud-helper" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
