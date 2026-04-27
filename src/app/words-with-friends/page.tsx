import { createPageMetadata } from '@/lib/metadata'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import UnscrambleForm from '@/components/UnscrambleForm'
import ResultsPanel from '@/components/ResultsPanel'

export const metadata = createPageMetadata({
  title: 'Words With Friends Word Finder',
  description: 'Find all valid Words With Friends words from your tiles instantly.',
  path: '/words-with-friends',
  keywords: ['words with friends', 'words with friends cheat', 'words with friends helper'],
})

export default function WordsWithFriendsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="font-display font-bold text-navy mb-2">Words With Friends Helper</h1>
          <p className="text-navy/60 font-body mb-8">
            Find all valid Words With Friends plays from your rack. Use ? for blank tiles.
          </p>
          <UnscrambleForm />
          <ResultsPanel />
        </div>
      </main>
      <Footer />
    </>
  )
}
