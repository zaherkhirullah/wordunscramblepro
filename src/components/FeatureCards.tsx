import Link from 'next/link'

const features = [
  {
    icon: '⚡',
    title: 'Lightning Fast',
    description: 'Results in milliseconds using an optimized frequency-map algorithm. No waiting around.',
    href: null,
  },
  {
    icon: '📚',
    title: '173,000+ Words',
    description: 'Full ENABLE, NWL (Scrabble NA) and Collins Scrabble Words (CSW) dictionaries.',
    href: null,
  },
  {
    icon: '🃏',
    title: 'Wildcard Support',
    description: 'Use ? or * as blank tiles, just like in Scrabble and Words With Friends.',
    href: null,
  },
  {
    icon: '🎯',
    title: 'Advanced Filters',
    description: 'Filter by length, must-include letters, starts with or ends with to nail your play.',
    href: null,
  },
  {
    icon: '✅',
    title: 'Check Dictionary',
    description: 'Instantly verify any word across NWL, CSW and ENABLE dictionaries.',
    href: '/check-dictionary',
  },
  {
    icon: '🟩',
    title: 'Wordle Solver',
    description: 'Solve today\'s Wordle fast. Enter green, yellow and gray clues to find the answer.',
    href: '/wordle-solver',
  },
  {
    icon: '🔡',
    title: 'Anagram Solver',
    description: 'Find every anagram from your letters. Exact and partial anagram matching.',
    href: '/anagram-solver',
  },
  {
    icon: '🎲',
    title: 'Random Words',
    description: 'Generate random words by length, starting letter and more for practice.',
    href: '/random-word-generator',
  },
  {
    icon: '🔀',
    title: 'Quordle Solver',
    description: 'Solving four Wordle boards at once? Use our Quordle helper to find matching words.',
    href: '/quordle-solver',
  },
]

export default function FeatureCards() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <h2 className="font-display font-bold text-navy text-center mb-2">
        Everything You Need to Win
      </h2>
      <p className="text-navy/50 text-center mb-10 font-body">
        Powerful tools built for Scrabble, Words With Friends, Wordle and every other word game.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f) => {
          const inner = (
            <>
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-display font-semibold text-navy text-lg mb-1">{f.title}</h3>
              <p className="text-navy/60 text-sm font-body leading-relaxed">{f.description}</p>
              {f.href && (
                <span className="inline-block mt-3 text-xs font-medium text-gold-dark hover:text-gold transition-colors">
                  Try it →
                </span>
              )}
            </>
          )

          return f.href ? (
            <Link
              key={f.title}
              href={f.href}
              className="card hover:border-gold/30 border border-transparent hover:-translate-y-0.5 transition-all duration-200 block"
            >
              {inner}
            </Link>
          ) : (
            <div
              key={f.title}
              className="card hover:border-gold/30 border border-transparent hover:-translate-y-0.5 transition-all duration-200"
            >
              {inner}
            </div>
          )
        })}
      </div>
    </section>
  )
}
