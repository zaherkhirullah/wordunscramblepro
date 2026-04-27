import { createPageMetadata } from '@/lib/metadata'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import UnscrambleForm from '@/components/UnscrambleForm'
import ResultsPanel from '@/components/ResultsPanel'

export const metadata = createPageMetadata({
  title: 'Scrabble Word Finder',
  description: 'Find all valid Scrabble words from your tiles. Supports blank tiles and all Scrabble dictionaries.',
  path: '/scrabble-word-finder',
  keywords: ['scrabble word finder', 'scrabble cheat', 'scrabble helper'],
})

export default function ScrabbleWordFinderPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="font-display font-bold text-navy mb-2">Scrabble Word Finder</h1>
          <p className="text-navy/60 font-body mb-8">
            Enter your Scrabble rack letters to find all valid plays. Use ? for blank tiles.
          </p>
          <UnscrambleForm />
          <ResultsPanel />
        </div>
      </main>
      <Footer />
    </>
  )
}
