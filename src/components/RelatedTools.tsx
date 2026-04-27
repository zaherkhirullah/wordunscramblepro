import Link from 'next/link'

interface RelatedToolsProps {
  currentPath: string
  count?: number
}

const ALL_TOOLS = [
  { href: '/', label: 'Word Unscrambler', description: 'Unscramble any letters into valid words', emoji: '🔤' },
  { href: '/descrambler', label: 'Word Descrambler', description: 'Descramble tiles for Scrabble & WWF', emoji: '🎯' },
  { href: '/word-scramble', label: 'Word Scramble Solver', description: 'Solve any word jumble puzzle', emoji: '🧩' },
  { href: '/anagram-solver', label: 'Anagram Solver', description: 'Find every anagram from your letters', emoji: '↔️' },
  { href: '/wordle-solver', label: 'Wordle Solver', description: 'Get the best Wordle guesses', emoji: '🟩' },
  { href: '/wordfeud-helper', label: 'Wordfeud Helper', description: 'Find top Wordfeud plays', emoji: '📱' },
  { href: '/check-dictionary', label: 'Dictionary Checker', description: 'Check NWL, CSW and ENABLE validity', emoji: '📖' },
  { href: '/word-checker', label: 'Word Checker', description: 'Verify any word across dictionaries', emoji: '✅' },
  { href: '/random-word-generator', label: 'Random Word Generator', description: 'Generate random words for games', emoji: '🎲' },
]

export default function RelatedTools({ currentPath, count = 4 }: RelatedToolsProps) {
  const tools = ALL_TOOLS.filter((t) => t.href !== currentPath).slice(0, count)

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-navy mb-4">Related Tools</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="block card py-4 text-center hover:border-gold/60 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="text-2xl mb-1.5">{tool.emoji}</div>
            <div className="font-display font-bold text-navy text-sm group-hover:text-gold-dark transition-colors">{tool.label}</div>
            <div className="text-[11px] text-navy/50 font-body mt-1 leading-snug">{tool.description}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
