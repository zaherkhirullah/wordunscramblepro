import { createPageMetadata } from '@/lib/metadata'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import GoogleAd from '@/components/ads/GoogleAd'
import Link from 'next/link'

export const metadata = createPageMetadata({
  title: 'About Word Unscrambler',
  description:
    'Learn about Word Unscrambler — the fastest free word unscrambler and word game tool suite for Scrabble, Words With Friends, Wordle and more.',
  path: '/about',
})

const tools = [
  {
    emoji: '🔤',
    href: '/',
    label: 'Word Unscrambler',
    desc: 'The core tool — find all valid words hidden in your letters instantly.',
  },
  {
    emoji: '🔀',
    href: '/descrambler',
    label: 'Word Descrambler',
    desc: 'Descramble jumbled words and reveal the hidden word beneath.',
  },
  {
    emoji: '🧩',
    href: '/word-scramble',
    label: 'Word Scramble Solver',
    desc: 'Solve word scramble puzzles from newspapers, apps and classrooms.',
  },
  {
    emoji: '♻️',
    href: '/anagram-solver',
    label: 'Anagram Solver',
    desc: 'Find exact anagrams and partial anagram matches for any set of letters.',
  },
  {
    emoji: '🟩',
    href: '/wordle-solver',
    label: 'Wordle Solver',
    desc: 'Solve the NYT Wordle using green, yellow and gray tile clues.',
  },
  {
    emoji: '🟦',
    href: '/quordle-solver',
    label: 'Quordle Solver',
    desc: 'Tackle four simultaneous Wordle boards with smart letter filtering.',
  },
  {
    emoji: '🎯',
    href: '/wordfeud-helper',
    label: 'Wordfeud Helper',
    desc: 'Find the highest-scoring valid plays using the CSW dictionary.',
  },
  {
    emoji: '📖',
    href: '/check-dictionary',
    label: 'Dictionary Checker',
    desc: 'Instantly verify if a word is valid in NWL, CSW or ENABLE.',
  },
  {
    emoji: '✅',
    href: '/word-checker',
    label: 'Word Checker',
    desc: 'Quick single-word validity check across all three dictionaries.',
  },
  {
    emoji: '🎲',
    href: '/random-word-generator',
    label: 'Random Word Generator',
    desc: 'Generate random words filtered by length, pattern or dictionary.',
  },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

          {/* Hero card */}
          <div className="card bg-gradient-to-br from-navy to-navy/90 text-parchment p-8 mb-10">
            <h1 className="font-display font-bold text-parchment text-3xl sm:text-4xl mb-3">
              Word Unscrambler
            </h1>
            <p className="font-body text-parchment/80 text-lg mb-6">
              Free, fast, and ad-light word game tools for every puzzle player
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                '173,000+ words',
                '9 tools',
                '3 dictionaries',
                'Free forever',
              ].map((stat) => (
                <span
                  key={stat}
                  className="bg-white/10 px-4 py-2 rounded-full text-sm font-body"
                >
                  {stat}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-10 font-body text-navy/70 leading-relaxed">

            {/* What is this site */}
            <section>
              <h2 className="font-display text-xl font-bold text-navy mb-3">What is this site?</h2>
              <p>
                Word Unscrambler is a free toolkit for word game players. Whether you&apos;re stuck on a
                Scrabble rack, need to solve today&apos;s Wordle, or just want to check if a word is
                valid, we have a tool for it. Every tool works instantly in your browser — no account,
                no download, no paywall.
              </p>
              <p className="mt-3">
                The site is built with <strong className="text-navy">Next.js 14</strong>, TypeScript and
                Tailwind CSS, deployed on edge infrastructure so pages load fast no matter where in the
                world you are. All word lookups run server-side on optimized data structures and return
                results in milliseconds — even for long queries with wildcards.
              </p>
              <p className="mt-3">
                We are committed to keeping this site <strong className="text-navy">ad-light and
                privacy-respecting</strong>. We show a small number of non-intrusive ads to cover
                hosting costs, but we never sell your data, never require an account, and never
                show pop-ups or interstitials. Your letters and word searches are never stored.
              </p>
            </section>

            {/* How it works */}
            <section>
              <h2 className="font-display text-xl font-bold text-navy mb-3">How it works</h2>
              <p>
                Our core algorithm uses an optimized frequency-map approach. Rather than generating
                permutations (which grows factorially), we count letter frequencies in your input and
                compare them against each word in the dictionary — O(n × L) time, where n is the
                dictionary size and L is average word length. This makes even 15-letter queries return
                in milliseconds.
              </p>
              <p className="mt-3">
                Wildcard tiles (? or *) are expanded into all 26 possible letters before matching, with
                results deduplicated and sorted by length then alphabetically.
              </p>
            </section>

            {/* Why trust our word lists */}
            <section>
              <h2 className="font-display text-xl font-bold text-navy mb-3">
                Why trust our word lists?
              </h2>
              <p>
                We use <strong className="text-navy">ENABLE</strong>,{' '}
                <strong className="text-navy">NWL (TWL)</strong> and{' '}
                <strong className="text-navy">CSW</strong> — the exact same word lists used in
                competitive Scrabble tournaments around the world. These are not scraped from random
                internet sources; they are the definitive lexicons maintained by NASPA and Collins for
                official tournament play.
              </p>
              <p className="mt-3">
                We run automated validation checks on every build to ensure dictionary integrity — word
                counts are verified against known baselines and any unexpected changes trigger an alert
                before they reach production.
              </p>
              <p className="mt-3">
                We default to <strong className="text-navy">ENABLE</strong> because it is the most
                broadly useful general-purpose dictionary. If you play in a North American tournament
                context, switch to <strong className="text-navy">NWL</strong>. If you play Wordfeud or
                international Scrabble, switch to <strong className="text-navy">CSW</strong>. The
                active dictionary is shown on every results page.
              </p>
            </section>

            {/* Dictionaries */}
            <section>
              <h2 className="font-display text-xl font-bold text-navy mb-3">Dictionaries</h2>
              <div className="space-y-3">
                {[
                  {
                    name: 'ENABLE',
                    full: 'Enhanced North American Benchmark Lexicon',
                    detail:
                      '~173,000 general-purpose English words. The default dictionary and the basis for many word game apps.',
                  },
                  {
                    name: 'NWL',
                    full: 'North American Word List (TWL)',
                    detail:
                      'The official tournament Scrabble dictionary for North America, published by NASPA. ~187,000 words.',
                  },
                  {
                    name: 'CSW',
                    full: 'Collins Scrabble Words',
                    detail:
                      'The international tournament word list — a superset of NWL with over 270,000 words, used in most countries outside North America and in Wordfeud.',
                  },
                ].map(({ name, full, detail }) => (
                  <div key={name} className="card py-4">
                    <p className="font-display font-semibold text-navy">
                      {name}{' '}
                      <span className="font-body font-normal text-sm text-navy/50">— {full}</span>
                    </p>
                    <p className="text-sm mt-1">{detail}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Our word game tools */}
            <section>
              <h2 className="font-display text-xl font-bold text-navy mb-4">Our word game tools</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tools.map(({ emoji, href, label, desc }) => (
                  <div key={href} className="card py-5 px-5 flex flex-col gap-2">
                    <span className="text-2xl">{emoji}</span>
                    <Link
                      href={href}
                      className="font-display font-semibold text-navy hover:text-gold-dark transition-colors"
                    >
                      {label}
                    </Link>
                    <p className="text-sm text-navy/60">{desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Contact & Feedback */}
            <section>
              <h2 className="font-display text-xl font-bold text-navy mb-3">
                Contact &amp; Feedback
              </h2>
              <div className="card py-6 px-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <p className="flex-1 text-navy/70">
                  Found a bug, missing word, or have a feature request? We read every message and try
                  to respond within a few days.
                </p>
                <Link href="/contact" className="btn-primary shrink-0">
                  Contact us
                </Link>
              </div>
            </section>

            {/* Disclaimer */}
            <section>
              <h2 className="font-display text-xl font-bold text-navy mb-3">Disclaimer</h2>
              <p className="text-sm">
                Word Unscrambler is not affiliated with, endorsed by, or associated with Scrabble®,
                Words With Friends®, Wordle® (NYT), Wordfeud® or any other word game publisher.
                All trademarks belong to their respective owners. Our tools are intended for
                entertainment, learning and game strategy purposes only.
              </p>
            </section>
          </div>

          {/* Bottom ad */}
          <div className="mt-10">
            <GoogleAd slot={process.env.NEXT_PUBLIC_AD_SLOT_CONTENT_BOTTOM || ''} format="rectangle" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
