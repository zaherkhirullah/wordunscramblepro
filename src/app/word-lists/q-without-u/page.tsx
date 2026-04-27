import { createPageMetadata } from '@/lib/metadata'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import GoogleAd from '@/components/ads/GoogleAd'
import Link from 'next/link'

export const metadata = createPageMetadata({
  title: 'Q Without U Words – Scrabble Q Words That Need No U',
  description: 'Complete list of valid Scrabble words with Q but no U. QI, QAT, QOPH and more — learn these rare words to make the most of your Q tile.',
  path: '/word-lists/q-without-u',
  keywords: ['q without u words', 'q words no u', 'scrabble q words', 'words with q no u', 'qi scrabble'],
})

const Q_WITHOUT_U_WORDS_RAW = [
  { word: 'QI', points: 11, definition: 'Life force in Chinese philosophy. Valid in NWL & CSW.' },
  { word: 'QAT', points: 12, definition: 'A shrub whose leaves are chewed as a stimulant. CSW only.' },
  { word: 'QOPH', points: 18, definition: 'The 19th letter of the Hebrew alphabet. NWL & CSW.' },
  { word: 'QANAT', points: 15, definition: 'An irrigation tunnel. CSW only.' },
  { word: 'QIGONG', points: 17, definition: 'Chinese system of breathing exercises. CSW only.' },
  { word: 'QINTAR', points: 15, definition: 'A monetary unit of Albania. NWL & CSW.' },
  { word: 'QWERTY', points: 21, definition: 'Describing the standard keyboard layout. CSW only.' },
  { word: 'TRANQ', points: 14, definition: 'A tranquilizer. Informal. NWL & CSW.' },
  { word: 'QADI', points: 14, definition: 'A Muslim judge. NWL & CSW.' },
  { word: 'QAIDS', points: 15, definition: 'Plural of qaid. Muslim judge or leader.' },
  { word: 'FAQIR', points: 17, definition: 'A Muslim or Hindu religious ascetic. Variant spelling.' },
  { word: 'QAID', points: 14, definition: 'A Muslim judge or leader. NWL & CSW.' },
  { word: 'SUQ', points: 12, definition: 'A market in Muslim countries. NWL & CSW.' },
  { word: 'SUQS', points: 13, definition: 'Plural of suq.' },
  { word: 'TSADI', points: 6, definition: 'The 18th letter of the Hebrew alphabet.' },
]

// Deduplicate by word
const seen = new Set<string>()
const Q_WITHOUT_U_WORDS = Q_WITHOUT_U_WORDS_RAW.filter(({ word }) => {
  if (seen.has(word)) return false
  seen.add(word)
  return true
})

export default function QWithoutUPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          {/* Breadcrumb */}
          <nav className="text-sm text-navy/50 font-body mb-3">
            <Link href="/word-lists" className="hover:text-gold transition-colors">Word Lists</Link>
            <span className="mx-2">/</span>
            <span className="text-navy">Q Without U</span>
          </nav>

          {/* Header */}
          <h1 className="font-display font-bold text-navy mb-2">Q Without U Words</h1>
          <p className="text-navy/60 font-body mb-6">
            Scrabble&apos;s secret weapon — valid Q words that need no U tile.
          </p>

          {/* Intro */}
          <div className="card mb-8">
            <p className="text-navy/70 font-body text-sm leading-relaxed mb-3">
              The Q tile is worth <strong>10 points</strong> — tied with Z for the highest face value in Scrabble. But Q almost always demands a U, and U tiles are in short supply. If you draw Q without a U, most players panic. Not you.
            </p>
            <p className="text-navy/70 font-body text-sm leading-relaxed">
              The words below are valid in NWL (North American) or CSW (Collins Scrabble Words) dictionaries and require <strong>no U tile at all</strong>. Memorize these and your Q will never strand you again.
            </p>
          </div>

          {/* Word cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {Q_WITHOUT_U_WORDS.map(({ word, points, definition }) => (
              <div key={word} className="card hover:border-gold/30 border border-transparent transition-all duration-200 hover:-translate-y-0.5">
                <div className="flex items-start justify-between mb-2">
                  <span className="font-display font-bold text-navy text-2xl uppercase tracking-wide">{word}</span>
                  <span className="tag-gold font-display font-bold shrink-0 ml-2">{points} pts</span>
                </div>
                <p className="text-navy/60 font-body text-sm leading-relaxed mb-3">{definition}</p>
                <Link
                  href={`/check-dictionary?word=${word}`}
                  className="text-gold hover:text-gold-dark font-body text-xs font-semibold transition-colors"
                >
                  Check word →
                </Link>
              </div>
            ))}
          </div>

          {/* Why learn Q without U section */}
          <div className="card mb-8">
            <h2 className="font-display font-semibold text-navy text-xl mb-4">Why Learn Q Without U Words?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div className="bg-gold/5 border border-gold/20 rounded-lg p-4 text-center">
                <div className="font-display font-bold text-navy text-3xl mb-1">10</div>
                <div className="text-navy/60 font-body text-sm">Points for the Q tile</div>
              </div>
              <div className="bg-gold/5 border border-gold/20 rounded-lg p-4 text-center">
                <div className="font-display font-bold text-navy text-3xl mb-1">4</div>
                <div className="text-navy/60 font-body text-sm">U tiles in a Scrabble bag</div>
              </div>
              <div className="bg-gold/5 border border-gold/20 rounded-lg p-4 text-center">
                <div className="font-display font-bold text-navy text-3xl mb-1">11+</div>
                <div className="text-navy/60 font-body text-sm">Points for QI alone</div>
              </div>
            </div>
            <p className="text-navy/70 font-body text-sm leading-relaxed mb-3">
              There are only four U tiles in a standard Scrabble set. If they&apos;re all on the board or in your opponents&apos; racks, your Q becomes a liability — unless you know these words.
            </p>
            <p className="text-navy/70 font-body text-sm leading-relaxed">
              <strong>QI</strong> (11 pts) is the most important: short, versatile, and easy to place. <strong>QAT</strong> and <strong>QOPH</strong> are essential for intermediate players. <strong>QWERTY</strong> (21 pts) is a spectacular play if you can ever build it on the board.
            </p>
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
              <Link href="/word-lists/high-value" className="inline-flex items-center px-4 py-2 rounded-lg border border-navy/20 hover:border-gold/40 text-navy font-body text-sm transition-colors">High-Value Words</Link>
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
