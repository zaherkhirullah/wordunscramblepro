import { createPageMetadata } from '@/lib/metadata'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import UnscrambleTool from '@/components/UnscrambleTool'
import GoogleAd from '@/components/ads/GoogleAd'
import RelatedTools from '@/components/RelatedTools'
import Link from 'next/link'

export const metadata = createPageMetadata({
  title: 'Anagram Solver - Find All Anagrams of Any Word',
  description:
    'Free anagram solver. Enter any word or letters and find all exact and partial anagrams instantly. Uses 173,000+ word dictionaries including NWL and CSW.',
  path: '/anagram-solver',
  keywords: [
    'anagram solver',
    'anagram finder',
    'word anagrams',
    'find anagrams',
    'anagram maker',
    'anagram generator',
  ],
})

export default function AnagramSolverPage({ searchParams }: { searchParams: { word?: string } }) {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="font-display font-bold text-navy mb-2">Anagram Solver</h1>
          <p className="text-navy/60 font-body mb-8">
            Find every anagram from your letters. Exact anagrams use all your letters; partial anagrams
            use some.
          </p>

          <UnscrambleTool defaultLetters={searchParams.word} />

          <div className="mt-6">
            <GoogleAd slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP_BANNER || ''} format="leaderboard" />
          </div>

          <div className="mt-16 space-y-10 border-t border-parchment-dark pt-10">
            <div>
              <h2 className="font-display text-2xl font-bold text-navy mb-3">What is an anagram?</h2>
              <p className="text-navy/70 font-body leading-relaxed">
                An anagram is a word or phrase formed by rearranging the letters of another word or
                phrase, using each letter exactly once. For example,{' '}
                <strong className="text-navy">LISTEN</strong> is an anagram of{' '}
                <strong className="text-navy">SILENT</strong>, and{' '}
                <strong className="text-navy">CINEMA</strong> is an anagram of{' '}
                <strong className="text-navy">ICEMAN</strong>. Anagrams have been used in puzzles,
                literature and cryptography for centuries.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-navy mb-3">
                Famous anagram examples
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { word: 'LISTEN', anagram: 'SILENT' },
                  { word: 'EARTH', anagram: 'HEART' },
                  { word: 'CINEMA', anagram: 'ICEMAN' },
                  { word: 'DUSTY', anagram: 'STUDY' },
                  { word: 'NIGHT', anagram: 'THING' },
                  { word: 'STREAM', anagram: 'MASTER' },
                  { word: 'RESCUE', anagram: 'SECURE' },
                  { word: 'STONE', anagram: 'NOTES / TONES' },
                  { word: 'RANGE', anagram: 'ANGER' },
                ].map(({ word, anagram }) => (
                  <Link href={`/anagram-solver?word=${word}`} key={word} className="block">
                    <div className="card py-3 text-center">
                      <p className="font-display font-bold text-navy tracking-wide">{word}</p>
                      <p className="text-xs text-navy/40 font-body mt-1">↕ {anagram}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-navy mb-3">
                Anagrams in word games
              </h2>
              <p className="text-navy/70 font-body leading-relaxed mb-4">
                Anagram-solving skills are directly applicable to Scrabble, Words With Friends, and
                Wordfeud. In these games your rack is essentially a scrambled set of letters — finding
                the best word is an anagram problem. High-value plays often involve recognising that
                your tiles are an anagram of a 7- or 8-letter word, earning a bingo bonus.
              </p>
              <p className="text-navy/70 font-body leading-relaxed">
                Our solver shows results grouped by word length, so you can immediately spot all possible
                bingo words (7+ letters) at the top.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-navy mb-3">
                Tips for finding anagrams
              </h2>
              <ul className="space-y-2 font-body text-navy/70">
                {[
                  'Write the letters in alphabetical order to spot patterns — many anagram solvers work this way internally.',
                  'Look for common prefixes and suffixes (UN-, RE-, -ING, -ED) — they often reveal hidden words.',
                  'If you have a Q, remember QI is a valid Scrabble word (life force in Chinese philosophy).',
                  'Vowel-heavy racks (AAEIOU) often hide words like AOURIE, AURAE or short precise words.',
                  'Use the "must include" filter to force specific letters and narrow results quickly.',
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
              <RelatedTools currentPath="/anagram-solver" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
