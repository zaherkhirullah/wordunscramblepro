import { createPageMetadata } from '@/lib/metadata'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import GoogleAd from '@/components/ads/GoogleAd'
import Link from 'next/link'

export const metadata = createPageMetadata({
  title: 'High Value Scrabble Words – Z, Q, X and J Words',
  description: 'The best high-scoring Scrabble words using Z (10 pts), Q (10 pts), X (8 pts) and J (8 pts) tiles. Learn these plays to dominate your next game.',
  path: '/word-lists/high-value',
  keywords: ['high value scrabble words', 'scrabble z words', 'scrabble q words', 'high scoring words', 'scrabble x words', 'scrabble j words'],
})

const HIGH_VALUE_WORDS = [
  // Z words (10 pts)
  { word: 'ZOEAE', points: 14, letters: 'Z=10', tip: '5-letter Z word without difficult consonants' },
  { word: 'ADZE', points: 14, letters: 'Z=10', tip: 'A woodworking tool. Z on a double/triple = game-changer' },
  { word: 'JAZZ', points: 30, letters: 'Z=10×2', tip: 'Two Z tiles makes this worth 30+ base points' },
  { word: 'FIZZ', points: 29, letters: 'Z=10×2', tip: 'Double Z powerhouse' },
  { word: 'BUZZ', points: 24, letters: 'Z=10×2', tip: 'Classic high-scorer' },
  // Q words (10 pts)
  { word: 'QUIZ', points: 22, letters: 'Q=10,Z=10', tip: 'Both premium tiles in one word' },
  { word: 'QUIXOTIC', points: 26, letters: 'Q=10,X=8', tip: 'Long word covering two high-value tiles' },
  { word: 'QOPH', points: 18, letters: 'Q=10', tip: 'Short Q word needing no U' },
  // X words (8 pts)
  { word: 'OXAZINE', points: 19, letters: 'X=8,Z=10', tip: 'Chemistry term — covers X and Z' },
  { word: 'EXQUISITE', points: 26, letters: 'X=8,Q=10', tip: 'Premium tiles with common rack letters' },
  { word: 'RELAXED', points: 17, letters: 'X=8', tip: 'Familiar word with a powerful X' },
  // J words (8 pts)
  { word: 'JABBERWOCK', points: 32, letters: 'J=8', tip: 'Fictional but J words rack up points' },
  { word: 'HAJJ', points: 24, letters: 'J=8×2', tip: 'Two Js — rare but devastating' },
  { word: 'JUKEBOX', points: 28, letters: 'J=8,X=8', tip: 'J and X in the same word' },
  { word: 'JAMB', points: 15, letters: 'J=8', tip: 'Door frame — short and powerful' },
]

const TILE_VALUES = [
  { letter: 'Z', points: 10, count: 1 },
  { letter: 'Q', points: 10, count: 1 },
  { letter: 'X', points: 8, count: 1 },
  { letter: 'J', points: 8, count: 1 },
  { letter: 'K', points: 5, count: 1 },
]

const STRATEGY_TIPS = [
  {
    title: 'Play premium tiles on bonus squares',
    body: 'A Z on a Triple Letter Score is worth 30 points before the word multiplier. Position high-value tiles on DLS or TLS whenever possible.',
  },
  {
    title: 'Know your Q-without-U words',
    body: 'QI, QAT, QOPH and QAID don\'t need a U tile. If U tiles are gone, these words turn a liability Q into a scoring weapon.',
  },
  {
    title: 'Use short J and X plays to hook',
    body: 'JO, JA, XI, XU and OX are 2–3 letter plays that let you drop a high-value tile while extending an existing word for massive parallel points.',
  },
  {
    title: 'Save high-value tiles for late-game',
    body: 'As the board fills up, bonus squares get covered. Try to hold your Z or Q until a premium square becomes available — but don\'t hold so long you get stuck with them at game end.',
  },
]

export default function HighValueWordsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          {/* Breadcrumb */}
          <nav className="text-sm text-navy/50 font-body mb-3">
            <Link href="/word-lists" className="hover:text-gold transition-colors">Word Lists</Link>
            <span className="mx-2">/</span>
            <span className="text-navy">High-Value Words</span>
          </nav>

          {/* Header */}
          <h1 className="font-display font-bold text-navy mb-2">High-Value Scrabble Words</h1>
          <p className="text-navy/60 font-body mb-8">
            Words using Z (10 pts), Q (10 pts), X (8 pts) and J (8 pts) tiles to maximize your Scrabble score.
          </p>

          {/* Tile value reference table */}
          <div className="card mb-8">
            <h2 className="font-display font-semibold text-navy text-lg mb-4">Tile Point Values</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-body">
                <thead>
                  <tr className="border-b border-navy/10">
                    <th className="text-left text-navy/60 font-semibold py-2 pr-6">Letter</th>
                    <th className="text-left text-navy/60 font-semibold py-2 pr-6">Base Points</th>
                    <th className="text-left text-navy/60 font-semibold py-2">On Triple Letter Square</th>
                  </tr>
                </thead>
                <tbody>
                  {TILE_VALUES.map(({ letter, points }) => (
                    <tr key={letter} className="border-b border-navy/5">
                      <td className="py-2.5 pr-6">
                        <span className="font-display font-bold text-navy text-lg">{letter}</span>
                      </td>
                      <td className="py-2.5 pr-6">
                        <span className="tag-gold font-display font-bold">{points} pts</span>
                      </td>
                      <td className="py-2.5 text-navy/60">{points * 3} pts (before word multiplier)</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-navy/40 font-body mt-3">
              * Tiles on Double Word Score or Triple Word Score squares multiply the entire word value, stacking with any letter bonuses.
            </p>
          </div>

          {/* Word cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {HIGH_VALUE_WORDS.map(({ word, points, letters, tip }) => (
              <div key={word} className="card hover:border-gold/30 border border-transparent transition-all duration-200 hover:-translate-y-0.5">
                <div className="flex items-start justify-between mb-2">
                  <span className="font-display font-bold text-navy text-2xl uppercase tracking-wide">{word}</span>
                  <span className="tag-gold font-display font-bold shrink-0 ml-2">{points} pts</span>
                </div>
                <div className="text-xs text-gold font-body font-semibold mb-2">{letters}</div>
                <p className="text-navy/60 font-body text-sm leading-relaxed mb-3">{tip}</p>
                <Link
                  href={`/check-dictionary?word=${word}`}
                  className="text-gold hover:text-gold-dark font-body text-xs font-semibold transition-colors"
                >
                  Check →
                </Link>
              </div>
            ))}
          </div>

          {/* Strategy tips */}
          <div className="card mb-8">
            <h2 className="font-display font-semibold text-navy text-xl mb-6">Strategy Tips for High-Value Tiles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {STRATEGY_TIPS.map((tip, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center">
                    <span className="font-display font-bold text-gold text-sm">{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-navy text-sm mb-1">{tip.title}</h3>
                    <p className="text-navy/60 font-body text-sm leading-relaxed">{tip.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ad */}
          <div className="mb-8">
            <GoogleAd slot={process.env.NEXT_PUBLIC_AD_SLOT_CONTENT_BOTTOM || ''} format="rectangle" />
          </div>

          {/* Browse more */}
          <div className="card">
            <h3 className="font-display font-semibold text-navy mb-4">Browse More Word Lists</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/word-lists" className="btn-primary text-sm">All Word Lists</Link>
              <Link href="/word-lists/q-without-u" className="inline-flex items-center px-4 py-2 rounded-lg border border-navy/20 hover:border-gold/40 text-navy font-body text-sm transition-colors">Q Without U</Link>
              <Link href="/word-lists/3-letter" className="inline-flex items-center px-4 py-2 rounded-lg border border-navy/20 hover:border-gold/40 text-navy font-body text-sm transition-colors">3-Letter Words</Link>
              <Link href="/two-letter-words" className="inline-flex items-center px-4 py-2 rounded-lg border border-navy/20 hover:border-gold/40 text-navy font-body text-sm transition-colors">2-Letter Words</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
