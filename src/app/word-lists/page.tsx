import { createPageMetadata } from '@/lib/metadata'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = createPageMetadata({
  title: 'Word Lists',
  description: 'Browse word lists by length, game type and category for Scrabble and Words With Friends.',
  path: '/word-lists',
  keywords: ['word lists', 'scrabble word lists', 'words by length'],
})

const wordLists = [
  { href: '/two-letter-words', label: '2 Letter Words', count: '107 words', description: 'All valid 2-letter Scrabble words' },
  { href: '/word-lists/3-letter', label: '3 Letter Words', count: '1,000+ words', description: 'All valid 3-letter Scrabble words' },
  { href: '/word-lists/4-letter', label: '4 Letter Words', count: '3,000+ words', description: 'All valid 4-letter Scrabble words' },
  { href: '/word-lists/5-letter', label: '5 Letter Words', count: '8,000+ words', description: 'All valid 5-letter Scrabble words' },
  { href: '/word-lists/q-without-u', label: 'Q Without U Words', count: '20+ words', description: 'Words with Q but no U — rare Scrabble plays' },
  { href: '/word-lists/high-value', label: 'High Value Words', count: '50+ words', description: 'Words with Z, Q, X and J for maximum points' },
]

export default function WordListsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="font-display font-bold text-navy mb-2">Word Lists</h1>
          <p className="text-navy/60 font-body mb-8">
            Browse curated word lists to improve your game.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {wordLists.map((list) => (
              <Link
                key={list.href}
                href={list.href}
                className="card hover:border-gold/30 border border-transparent group transition-all duration-200 hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="font-display font-semibold text-navy text-lg group-hover:text-gold-dark transition-colors">
                      {list.label}
                    </h2>
                    <p className="text-navy/50 text-sm font-body mt-1">{list.description}</p>
                  </div>
                  <span className="tag-gold shrink-0 ml-3">{list.count}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
