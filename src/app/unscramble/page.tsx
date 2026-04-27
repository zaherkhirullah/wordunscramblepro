import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import ResultsPanel from '@/components/ResultsPanel'
import UnscrambleForm from '@/components/UnscrambleForm'
import { createPageMetadata } from '@/lib/metadata'

export const metadata = createPageMetadata({
  title: 'Word Unscramble Pro',
  description: 'Unscramble letters to find all valid Scrabble and Words With Friends words instantly.',
  path: '/unscramble',
  keywords: ['Word Unscramble Pro', 'unscramble letters', 'word finder'],
})

export default function UnscramblePage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="font-display font-bold text-navy mb-2">Word Unscramble Pro</h1>
          <p className="text-navy/60 font-body mb-8">Enter your letters below to find all valid words.</p>
          <UnscrambleForm />
          <ResultsPanel />
        </div>
      </main>
      <Footer />
    </>
  )
}
