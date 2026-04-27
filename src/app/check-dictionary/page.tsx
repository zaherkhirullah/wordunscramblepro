import { createPageMetadata } from '@/lib/metadata'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DictionaryCheckerTool from '@/components/DictionaryCheckerTool'
import GoogleAd from '@/components/ads/GoogleAd'
import RelatedTools from '@/components/RelatedTools'

export const metadata = createPageMetadata({
  title: 'Check Dictionary - Is It a Valid Scrabble Word?',
  description:
    'Instantly check if any word is valid in NWL (Scrabble North America), CSW (Collins Scrabble Words) or ENABLE dictionaries. Free online word validity checker.',
  path: '/check-dictionary',
  keywords: [
    'check dictionary',
    'is it a word',
    'valid scrabble word',
    'word validity checker',
    'nwl dictionary',
    'csw dictionary',
    'enable word list',
  ],
})

export default function CheckDictionaryPage({ searchParams }: { searchParams: { word?: string } }) {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="font-display font-bold text-navy mb-2">Check Dictionary</h1>
          <p className="text-navy/60 font-body mb-8">
            Look up any word across NWL, CSW and ENABLE dictionaries in one click.
          </p>

          <DictionaryCheckerTool initialWord={searchParams.word} />

          <div className="mt-6">
            <GoogleAd slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP_BANNER || ''} format="leaderboard" />
          </div>

          <div className="mt-16 space-y-10 border-t border-parchment-dark pt-10">
            <div>
              <h2 className="font-display text-2xl font-bold text-navy mb-3">
                Which dictionaries do we check?
              </h2>
              <div className="space-y-4 font-body text-navy/70 leading-relaxed">
                <p>
                  We check your word against three authoritative word lists used by different word games
                  and communities:
                </p>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span className="font-bold text-navy shrink-0">NWL</span>
                    <span>
                      The North American Word List (formerly TWL — Tournament Word List) is the official
                      dictionary for Scrabble tournaments in North America. Published by NASPA (North
                      American Scrabble Players Association), it contains approximately 187,000 words.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-navy shrink-0">CSW</span>
                    <span>
                      Collins Scrabble Words is the international tournament word list, used in most
                      countries outside North America. It is a superset of NWL and contains over 270,000
                      words, including many more regional English words.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-navy shrink-0">ENABLE</span>
                    <span>
                      The Enhanced North American Benchmark Lexicon is a general-purpose English word list
                      (~173,000 words) used by many online word games and solvers. It is the default
                      dictionary on this site.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-navy mb-3">
                Why does dictionary membership matter?
              </h2>
              <p className="text-navy/70 font-body leading-relaxed">
                Playing a word that is not in the official dictionary of your game results in a challenge
                penalty in Scrabble, or a failed submission in online apps like Wordle and Words With
                Friends. Knowing exactly which lists a word appears in lets you play with confidence — or
                challenge your opponent when you suspect their play.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-navy mb-3">
                Common questions about word validity
              </h2>
              <div className="space-y-4">
                {[
                  {
                    q: 'Are proper nouns valid in Scrabble?',
                    a: 'No. Proper nouns (names, places, brands) are never valid in standard Scrabble, even if they appear in a general dictionary.',
                  },
                  {
                    q: 'Are two-letter words always valid?',
                    a: 'All 101 two-letter words in NWL and all 127 in CSW are valid Scrabble plays. Check our two-letter word list for the full reference.',
                  },
                  {
                    q: 'What if a word is in CSW but not NWL?',
                    a: 'That word is valid in international Scrabble tournaments but not in North American ones. Always confirm which dictionary your game uses before playing.',
                  },
                  {
                    q: 'Can I use this for Words With Friends?',
                    a: "Words With Friends uses its own dictionary (ENABLE-based but with additions and removals). Our ENABLE check is a very close approximation, but edge cases may differ.",
                  },
                ].map(({ q, a }) => (
                  <div key={q} className="card py-4">
                    <p className="font-display font-semibold text-navy mb-1">{q}</p>
                    <p className="text-navy/60 font-body text-sm leading-relaxed">{a}</p>
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
              <RelatedTools currentPath="/check-dictionary" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
