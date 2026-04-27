import { createPageMetadata } from '@/lib/metadata'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = createPageMetadata({
  title: 'Random Words Generator',
  description: 'Generate random words with filters. Filter by length, starting letter, ending letter and more.',
  path: '/random-words',
  keywords: ['random word generator', 'random words', 'word generator'],
})

export default function RandomWordsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="font-display font-bold text-navy mb-2">Random Word Generator</h1>
          <p className="text-navy/60 font-body mb-8">
            Generate random English words with optional filters. Perfect for games, writing prompts and vocabulary building.
          </p>
          <div className="card space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-navy/60 mb-1">Count (1–100)</label>
                <input
                  type="number"
                  defaultValue={10}
                  min={1}
                  max={100}
                  className="w-full px-3 py-2 border border-parchment-dark rounded-lg text-navy focus:outline-none focus:border-gold transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy/60 mb-1">Min length</label>
                <input
                  type="number"
                  defaultValue={4}
                  min={2}
                  max={15}
                  className="w-full px-3 py-2 border border-parchment-dark rounded-lg text-navy focus:outline-none focus:border-gold transition-colors"
                />
              </div>
            </div>
            <button className="btn-primary w-full">Generate Words</button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
