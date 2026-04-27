import { createPageMetadata } from '@/lib/metadata'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RandomWordTool from '@/components/RandomWordTool'
import GoogleAd from '@/components/ads/GoogleAd'
import RelatedTools from '@/components/RelatedTools'

export const metadata = createPageMetadata({
  title: 'Random Word Generator - Generate Random English Words',
  description:
    'Free random word generator. Generate random English words by length, starting letter, ending pattern and more. Perfect for word games, practice, brainstorming and education.',
  path: '/random-word-generator',
  keywords: [
    'random word generator',
    'random word',
    'generate random words',
    'random english words',
    'random word picker',
    'word generator',
  ],
})

export default function RandomWordGeneratorPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="font-display font-bold text-navy mb-2">Random Word Generator</h1>
          <p className="text-navy/60 font-body mb-8">
            Generate random valid English words filtered by length, prefix, suffix and more.
          </p>

          <RandomWordTool />

          <div className="mt-6">
            <GoogleAd slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP_BANNER || ''} format="leaderboard" />
          </div>

          <div className="mt-16 space-y-10 border-t border-parchment-dark pt-10">
            <div>
              <h2 className="font-display text-2xl font-bold text-navy mb-3">
                What can you use random words for?
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    title: 'Word Game Practice',
                    desc: 'Generate a set of letters and practice unscrambling them under a time limit to sharpen your Scrabble skills.',
                  },
                  {
                    title: 'Creative Writing',
                    desc: 'Use random words as story prompts, character names, or writing constraints to spark creativity.',
                  },
                  {
                    title: 'Teaching & Education',
                    desc: 'Teachers can quickly generate vocabulary lists filtered by letter count for spelling exercises.',
                  },
                  {
                    title: 'Password Passphrases',
                    desc: 'Combine several random words to create memorable, strong passphrases (e.g., correct-horse-battery).',
                  },
                  {
                    title: 'Naming & Branding',
                    desc: 'Browse random words as inspiration for product names, usernames, domain names or brand identities.',
                  },
                  {
                    title: 'Games & Quizzes',
                    desc: 'Use random words as prompts for charades, Pictionary, 20 questions or trivia questions.',
                  },
                ].map(({ title, desc }) => (
                  <div key={title} className="card py-4">
                    <p className="font-display font-semibold text-navy mb-1">{title}</p>
                    <p className="text-navy/60 font-body text-sm leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-navy mb-3">
                How random are the words?
              </h2>
              <p className="text-navy/70 font-body leading-relaxed">
                Words are drawn by randomly shuffling the filtered word list and selecting from it. The
                source dictionary is ENABLE — the Enhanced North American Benchmark Lexicon, a
                well-regarded general-purpose English word list used by many word game apps. Every word
                returned is a real, valid English word (no nonsense strings).
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-navy mb-3">
                Filtering options explained
              </h2>
              <ul className="space-y-3 font-body text-navy/70">
                {[
                  {
                    label: 'Number of words',
                    desc: 'How many random words to return per generation. Choose from 5 to 100.',
                  },
                  {
                    label: 'Min / Max letter length',
                    desc: 'Only return words with a letter count in this range. Set both to the same value to get words of an exact length.',
                  },
                  {
                    label: 'Starts with',
                    desc: 'Only return words that begin with this prefix. Useful for practicing specific letter combinations.',
                  },
                  {
                    label: 'Ends with',
                    desc: 'Only return words that end with this suffix. Great for finding rhyming words or words with a particular ending.',
                  },
                ].map(({ label, desc }) => (
                  <li key={label} className="flex gap-3">
                    <span className="font-bold text-navy shrink-0 min-w-[120px]">{label}</span>
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Ad */}
            <div className="mt-10">
              <GoogleAd slot={process.env.NEXT_PUBLIC_AD_SLOT_CONTENT_BOTTOM || ''} format="rectangle" />
            </div>
            {/* Related Tools */}
            <div className="mt-10 border-t border-parchment-dark pt-10">
              <RelatedTools currentPath="/random-word-generator" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
