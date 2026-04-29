'use client'

import Link from 'next/link'
import { useState } from 'react'

const navLinks = [
  { href: '/check-dictionary', label: 'Check Dictionary' },
  { href: '/descrambler', label: 'Word Descrambler' },
  { href: '/word-scramble', label: 'Word Scramble' },
  { href: '/anagram-solver', label: 'Anagram Solver' },
  { href: '/wordle-solver', label: 'Wordle Solver' },
  { href: '/wordfeud-helper', label: 'Wordfeud' },
  { href: '/quordle-solver', label: 'Quordle' },
  { href: '/random-word-generator', label: 'Random Words' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-sm border-b border-white/5">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gold/20 border border-gold/30 text-gold font-display font-bold text-sm">
            W
          </span>
          <span className="font-display font-bold text-parchment text-lg">
            Word<span className="text-gold">UnscramblePro</span>
          </span>
        </Link>

        {/* Desktop nav — scrollable if many links */}
        <div className="hidden md:flex items-center gap-0.5 overflow-x-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap px-3 py-2 rounded-lg text-sm font-medium text-parchment/60 hover:text-parchment hover:bg-white/5 transition-all duration-150"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 text-parchment/60 hover:text-parchment"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-0.5 bg-current transition-transform ${
              menuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-current transition-opacity ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-current transition-transform ${
              menuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-navy border-t border-white/5 px-4 py-3 flex flex-col gap-1 animate-fade-in">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="px-3 py-2.5 rounded-lg text-sm font-medium text-parchment/70 hover:text-parchment hover:bg-white/5 transition-all"
          >
            Home
          </Link>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm font-medium text-parchment/70 hover:text-parchment hover:bg-white/5 transition-all"
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-white/5 mt-2 pt-2">
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm font-medium text-parchment/50 hover:text-parchment hover:bg-white/5 transition-all block"
            >
              About
            </Link>
            <Link
              href="/sitemap"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm font-medium text-parchment/50 hover:text-parchment hover:bg-white/5 transition-all block"
            >
              Sitemap
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
