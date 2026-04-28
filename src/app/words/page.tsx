import { createPageMetadata } from '@/lib/metadata'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RelatedTools from '@/components/RelatedTools'
import Link from 'next/link'

export const dynamic = 'force-static'

export const metadata = createPageMetadata({
  title: 'Browse Words by Letter – Contains, Starts With, Ends With',
  description: 'Find English words by letter pattern. Browse words containing any letter A-Z, words starting with any letter, or words ending with any letter.',
  path: '/words',
  keywords: ['words by letter', 'words containing letter', 'words starting with', 'words ending with'],
})

const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('')

export default function WordsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          {/* Header */}
          <div className="mb-8">
            <nav className="text-sm text-navy/50 font-body mb-3">
              <Link href="/categories" className="hover:text-gold transition-colors">Categories</Link>
              <span className="mx-2">/</span>
              <span className="text-navy">Browse by Letter</span>
            </nav>
            <h1 className="font-display font-bold text-navy mb-2">Browse Words by Letter</h1>
            <p className="text-navy/60 font-body leading-relaxed max-w-2xl">
              Find English words filtered by any letter of the alphabet. Choose whether you want words
              that <em>contain</em> a letter anywhere, <em>start with</em> a specific letter, or <em>end with</em> a letter.
              Perfect for Scrabble strategy, Wordle guessing, and expanding your vocabulary.
            </p>
          </div>

          {/* Words Containing */}
          <section className="mb-10">
            <h2 className="font-display font-bold text-navy text-2xl mb-2 border-b border-gold/20 pb-2">
              Words Containing Letter
            </h2>
            <p className="text-navy/50 font-body text-sm mb-4">
              All valid words that include the selected letter at any position.
            </p>
            <div className="flex flex-wrap gap-2">
              {LETTERS.map((letter) => (
                <Link
                  key={letter}
                  title={`Words Containing Letter ${letter}`}
                  aria-label={`Words Containing Letter ${letter}`}
                  href={`/words/containing/${letter}`}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-parchment-dark hover:bg-gold/10 border border-transparent hover:border-gold/30 font-display font-bold text-navy uppercase transition-colors"
                >
                  {letter.toUpperCase()}
                </Link>
              ))}
            </div>
          </section>

          {/* Words Starting With */}
          <section className="mb-10">
            <h2 className="font-display font-bold text-navy text-2xl mb-2 border-b border-gold/20 pb-2">
              Words Starting With
            </h2>
            <p className="text-navy/50 font-body text-sm mb-4">
              All valid words that begin with the selected letter.
            </p>
            <div className="flex flex-wrap gap-2">
              {LETTERS.map((letter) => (
                <Link
                  key={letter}
                  title={`Words Starting with ${letter}`}
                  aria-label={`Words Starting with ${letter}`}
                  href={`/words/starting-with/${letter}`}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-parchment-dark hover:bg-gold/10 border border-transparent hover:border-gold/30 font-display font-bold text-navy uppercase transition-colors"
                >
                  {letter.toUpperCase()}
                </Link>
              ))}
            </div>
          </section>

          {/* Words Ending With */}
          <section className="mb-10">
            <h2 className="font-display font-bold text-navy text-2xl mb-2 border-b border-gold/20 pb-2">
              Words Ending With
            </h2>
            <p className="text-navy/50 font-body text-sm mb-4">
              All valid words that end with the selected letter.
            </p>
            <div className="flex flex-wrap gap-2">
              {LETTERS.map((letter) => (
                <Link
                  key={letter}
                  title={`Words Ending with ${letter}`}
                  aria-label={`Words Ending with ${letter}`}
                  href={`/words/ending-with/${letter}`}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-parchment-dark hover:bg-gold/10 border border-transparent hover:border-gold/30 font-display font-bold text-navy uppercase transition-colors"
                >
                  {letter.toUpperCase()}
                </Link>
              ))}
            </div>
          </section>

          {/* Back links */}
          <div className="card mb-8">
            <h3 className="font-display font-semibold text-navy mb-4">Explore More</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/categories" className="btn-primary text-sm">All Categories</Link>
              <Link href="/word-lists" className="inline-flex items-center px-4 py-2 rounded-lg border border-navy/20 hover:border-gold/40 text-navy font-body text-sm transition-colors">
                Word Lists by Length
              </Link>
            </div>
          </div>

          <RelatedTools currentPath="/words" />
        </div>
      </main>
      <Footer />
    </>
  )
}
