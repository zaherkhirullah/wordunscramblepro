import Link from 'next/link'

const footerLinks = {
  Tools: [
    { href: '/', label: 'Word Unscramble Pro' },
    { href: '/descrambler', label: 'Word Descrambler' },
    { href: '/word-scramble', label: 'Word Scramble' },
    { href: '/anagram-solver', label: 'Anagram Solver' },
    { href: '/wordle-solver', label: 'Wordle Solver' },
    { href: '/quordle-solver', label: 'Quordle Solver' },
    { href: '/wordfeud-helper', label: 'Wordfeud Helper' },
    { href: '/scrabble-word-finder', label: 'Scrabble Word Finder' },
    { href: '/words-with-friends', label: 'Words With Friends' },
    { href: '/check-dictionary', label: 'Check Dictionary' },
    { href: '/random-word-generator', label: 'Random Word Generator' },
  ],
  Resources: [
    { href: '/two-letter-words', label: 'Two Letter Words' },
    { href: '/word-lists', label: 'Word Lists' },
    { href: '/word-checker', label: 'Word Checker' },
    { href: '/word-lists/3-letter', label: '3 Letter Words' },
    { href: '/word-lists/4-letter', label: '4 Letter Words' },
    { href: '/word-lists/5-letter', label: '5 Letter Words' },
    { href: '/word-lists/q-without-u', label: 'Q Without U Words' },
  ],
  Info: [
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms-of-service', label: 'Terms of Service' },
    { href: '/sitemap-page', label: 'Sitemap' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-navy-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gold/20 border border-gold/30 text-gold font-display font-bold text-sm">
                W
              </span>
              <span className="font-display font-bold text-parchment text-lg">
                Word<span className="text-gold">Unscrambler</span>
              </span>
            </Link>
            <p className="text-parchment/40 text-sm font-body leading-relaxed">
              Fast, free Word Unscramble Pro for Scrabble, Words With Friends, Wordle, Wordfeud and more.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-display font-semibold text-parchment/80 text-sm mb-3">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-parchment/40 hover:text-parchment/80 text-sm font-body transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-parchment/30 text-xs font-body">
            © {new Date().getFullYear()} WordUnscramblePro. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="text-parchment/30 hover:text-parchment/60 text-xs font-body transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="text-parchment/30 hover:text-parchment/60 text-xs font-body transition-colors">Terms of Service</Link>
            <p className="text-parchment/20 text-xs font-body hidden sm:block">Not affiliated with Scrabble® or Words With Friends®</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
