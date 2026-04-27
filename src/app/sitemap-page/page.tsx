import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { createPageMetadata } from '@/lib/metadata'
import Link from 'next/link'

export const metadata = createPageMetadata({
  title: 'Sitemap - All Pages on Word Unscramble Pro',
  description: 'Browse all tools, pages and resources available on Word Unscramble Pro.',
  path: '/sitemap',
})

const sitemapSections = [
  {
    title: 'Word Game Tools',
    links: [
      { href: '/', label: 'Word Unscramble Pro', desc: 'Unscramble any set of letters into valid words' },
      { href: '/descrambler', label: 'Word Descrambler', desc: 'Descramble letters with advanced filters' },
      { href: '/anagram-solver', label: 'Anagram Solver', desc: 'Find exact and partial anagrams' },
      { href: '/word-scramble', label: 'Word Scramble Solver', desc: 'Solve word scramble and jumble puzzles' },
      { href: '/scrabble-word-finder', label: 'Scrabble Word Finder', desc: 'Find best words for Scrabble' },
      { href: '/words-with-friends', label: 'Words With Friends Helper', desc: 'Find best words for Words With Friends' },
      { href: '/wordfeud-helper', label: 'Wordfeud Helper', desc: 'Find valid words using the CSW dictionary' },
    ],
  },
  {
    title: 'Puzzle Solvers',
    links: [
      { href: '/wordle-solver', label: 'Wordle Solver', desc: 'Find possible Wordle answers from your clues' },
      { href: '/quordle-solver', label: 'Quordle Solver', desc: 'Solve Quordle and multi-board Wordle variants' },
    ],
  },
  {
    title: 'Dictionary & Word Tools',
    links: [
      { href: '/check-dictionary', label: 'Check Dictionary', desc: 'Verify words in NWL, CSW and ENABLE' },
      { href: '/word-checker', label: 'Word Checker', desc: 'Quick word validity check' },
      { href: '/random-word-generator', label: 'Random Word Generator', desc: 'Generate random words with filters' },
    ],
  },
  {
    title: 'Word Lists & Resources',
    links: [
      { href: '/two-letter-words', label: 'Two Letter Words', desc: 'All valid 2-letter Scrabble words' },
      { href: '/word-lists', label: 'Word Lists', desc: 'Curated word lists by category and length' },
    ],
  },
  {
    title: 'Information',
    links: [
      { href: '/about', label: 'About', desc: 'About Word Unscramble Pro' },
      { href: '/contact', label: 'Contact', desc: 'Get in touch' },
      { href: '/privacy-policy', label: 'Privacy Policy', desc: 'How we handle your data' },
    ],
  },
]

export default function SitemapPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="font-display font-bold text-navy mb-2">Sitemap</h1>
          <p className="text-navy/60 font-body mb-10">
            All tools, pages and resources on Word Unscramble Pro.
          </p>

          <div className="space-y-10">
            {sitemapSections.map((section) => (
              <div key={section.title}>
                <h2 className="font-display text-xl font-bold text-navy mb-4 pb-2 border-b border-parchment-dark">
                  {section.title}
                </h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="flex flex-col px-4 py-3 rounded-lg border border-parchment-dark hover:border-gold/40 hover:bg-gold/5 transition-all group"
                      >
                        <span className="font-display font-semibold text-navy group-hover:text-gold-dark transition-colors text-sm">
                          {link.label}
                        </span>
                        <span className="text-xs text-navy/50 font-body mt-0.5">{link.desc}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
