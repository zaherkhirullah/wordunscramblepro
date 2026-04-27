import { createPageMetadata } from '@/lib/metadata'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DictionaryCheckerTool from '@/components/DictionaryCheckerTool'
import GoogleAd from '@/components/ads/GoogleAd'
import RelatedTools from '@/components/RelatedTools'
import Link from 'next/link'

export const metadata = createPageMetadata({
  title: 'Word Checker – Is It a Valid Word?',
  description: 'Free word checker. Instantly verify if any word is valid in Scrabble NWL, Collins CSW or ENABLE dictionary. Essential for Scrabble and Words With Friends players.',
  path: '/word-checker',
  keywords: ['word checker', 'is it a valid word', 'word validity checker', 'scrabble word checker', 'valid scrabble word', 'dictionary word checker'],
})

export default function WordCheckerPage({ searchParams }: { searchParams: { word?: string } }) {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="font-display font-bold text-navy mb-2">Word Checker</h1>
          <p className="text-navy/60 font-body mb-8">
            Instantly check if any word is valid in Scrabble, Collins or ENABLE dictionary.
          </p>

          <DictionaryCheckerTool initialWord={searchParams.word} />

          <div className="mt-6">
            <GoogleAd slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP_BANNER || ''} format="leaderboard" />
          </div>

          {/* Example words */}
          <div className="mt-10">
            <h2 className="font-display text-xl font-bold text-navy mb-2">Try these example words</h2>
            <p className="text-navy/60 font-body text-sm mb-4">Click any word to check it instantly:</p>
            <div className="flex flex-wrap gap-2">
              {['QUIZ', 'ZOEAE', 'QOPH', 'ETUI', 'OXAZINE', 'CWMS', 'SUQ', 'FROE', 'TYES', 'ADZE', 'WRIZ', 'BLERG'].map((w) => (
                <Link
                  key={w}
                  href={`/word-checker?word=${w}`}
                  className="px-3 py-1.5 rounded-full bg-parchment-dark text-navy text-sm font-medium font-display tracking-wide hover:bg-gold/20 hover:text-navy transition-colors"
                >
                  {w}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-16 space-y-10 border-t border-parchment-dark pt-10">
            <div>
              <h2 className="font-display text-2xl font-bold text-navy mb-3">How to check if a word is valid</h2>
              <p className="text-navy/70 font-body leading-relaxed">
                Enter any word (2–15 letters) and click Check Word. We instantly look it up in three authoritative dictionaries used by Scrabble players worldwide: NWL (North American tournament standard), CSW (Collins international standard) and ENABLE (general-purpose benchmark). A green checkmark means the word is valid in that dictionary; a red cross means it is not.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-navy mb-3">NWL vs CSW — which should I use?</h2>
              <p className="text-navy/70 font-body leading-relaxed">
                NWL (North American Word List) is the official Scrabble dictionary for US and Canada tournaments. CSW (Collins Scrabble Words) covers the rest of the world and contains substantially more words — including many British and international English terms. If you are playing online apps like Words With Friends, ENABLE is your best approximation.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-navy mb-3">Unusual short words worth knowing</h2>
              <p className="text-navy/70 font-body leading-relaxed">
                Some of the highest-scoring Scrabble plays are short, obscure words. QI (life force, 11 pts), ZA (pizza slang, 11 pts), XI (Greek letter, 9 pts), KA (spiritual double, 6 pts) and JO (sweetheart, 9 pts) are all valid in NWL and CSW. Knowing these two-letter gems can transform your game.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-navy mb-3">Frequently asked questions</h2>
              <div className="space-y-4">
                {[
                  {
                    q: 'Is QI a valid Scrabble word?',
                    a: 'Yes. QI (also spelled CHI) is valid in both NWL and CSW. It scores 11 points before board bonuses — one of the best 2-letter words in the game.',
                  },
                  {
                    q: 'Does capitalisation matter?',
                    a: 'No. The checker is case-insensitive — QUIZ, quiz and Quiz all check the same word.',
                  },
                  {
                    q: 'What about words with apostrophes?',
                    a: "Apostrophes are not allowed in Scrabble. Contractions like CAN'T or IT'S are not valid plays, and our checker only accepts letters a–z.",
                  },
                  {
                    q: 'Can I check proper nouns?',
                    a: 'Proper nouns (names, places, brands) are never valid in Scrabble even if they appear in a general dictionary. Our word lists contain only common nouns and valid Scrabble words.',
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
              <RelatedTools currentPath="/word-checker" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
