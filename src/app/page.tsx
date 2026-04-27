import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import FeatureCards from '@/components/FeatureCards'
import HowItWorks from '@/components/HowItWorks'
import UnscrambleTool from '@/components/UnscrambleTool'
import GoogleAd from '@/components/ads/GoogleAd'
import RelatedTools from '@/components/RelatedTools'
import { createPageMetadata } from '@/lib/metadata'
import { SoftwareAppSchema } from '@/components/JsonLd'

export const metadata = createPageMetadata({
  title: 'Word Unscrambler - Unscramble Letters To Find Words',
  description:
    'Free word unscrambler tool. Enter scrambled letters to find all valid words for Scrabble, Words With Friends, Wordle, Wordscapes and more. Supports 173,000+ words.',
  path: '/',
  keywords: [
    'word unscrambler',
    'unscramble letters',
    'scrabble word finder',
    'words with friends',
    'wordle helper',
    'anagram solver',
  ],
})

export default function HomePage({ searchParams }: { searchParams: { word?: string } }) {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8 -mt-8 relative z-10">
          <UnscrambleTool defaultLetters={searchParams.word} />
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <GoogleAd slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP_BANNER || ''} format="leaderboard" />
        </div>

        {/* SEO content */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 border-t border-parchment-dark">
          <div className="space-y-10">
            <div>
              <h2 className="font-display text-2xl font-bold text-navy mb-3">
                What is the use of Word Unscrambler?
              </h2>
              <p className="text-navy/70 font-body leading-relaxed">
                When you are stuck with some random letters and want to make words out of those scrambled letters,
                that is what this website is designed for. Whether you need help or just want to learn new words,
                or perhaps want a little assistance in word games, this website will save your time and frustration.
                Word games become more fun when you have a well-designed site like this one at your disposal.
              </p>
              <p className="text-navy/70 font-body leading-relaxed mt-3">
                You can enter up to 15 letters (including two wild cards or blank tiles using ? or *) and it shows
                you all valid words that can be made from those scrambled letters. Using this word helper tool, you
                will not only improve your game performance but also learn plenty of useful words and new letter
                combinations that will enrich your vocabulary.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-navy mb-3">
                How to use the advanced options?
              </h2>
              <p className="text-navy/70 font-body leading-relaxed">
                You can change the dictionary if applicable to the game you are playing. The default is ENABLE
                (the standard English word list used widely in competitive word games). NWL is the official Scrabble
                dictionary for US/Canada players, and CSW (Collins Scrabble Words) is used for UK and international
                tournament play.
              </p>
              <p className="text-navy/70 font-body leading-relaxed mt-3">
                When you click on &quot;Advanced filters&quot;, you can further narrow results by using &quot;Starts with&quot;,
                &quot;Ends with&quot;, or &quot;Must include&quot; options. This is particularly useful for longer words or when
                you are trying to play onto a specific board position in Scrabble or Words With Friends.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-navy mb-3">
                How does this work? — An example
              </h2>
              <p className="text-navy/70 font-body leading-relaxed">
                It is very simple. Let&apos;s say you have these letters: <strong className="text-navy">SHIRKEQUL</strong>.
                Enter them in the input box and click Unscramble. Here are example results:
              </p>
              <ul className="mt-4 space-y-1.5 font-body text-navy/70 bg-parchment-dark/50 rounded-xl p-5">
                <li><strong className="text-navy font-semibold">8 letter words:</strong> rushlike</li>
                <li><strong className="text-navy font-semibold">7 letter words:</strong> hulkier, huskier</li>
                <li><strong className="text-navy font-semibold">6 letter words:</strong> shrike, hikers, quirks, squire</li>
                <li><strong className="text-navy font-semibold">5 letter words:</strong> hiker, hikes, skier, shirk, hurls</li>
                <li><strong className="text-navy font-semibold">4 letter words:</strong> hike, risk, rise, heir, rule, rush</li>
                <li><strong className="text-navy font-semibold">3 letter words:</strong> her, his, ski, sir, lie</li>
                <li><strong className="text-navy font-semibold">2 letter words:</strong> hi, is, er, qi</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-navy mb-3">
                Supported word games
              </h2>
              <p className="text-navy/70 font-body leading-relaxed">
                Our word unscrambler works for all major word games. Whether you play{' '}
                <strong className="text-navy">Scrabble</strong> at home or in tournaments, compete at{' '}
                <strong className="text-navy">Words With Friends</strong>, guess the daily{' '}
                <strong className="text-navy">Wordle</strong>, solve a{' '}
                <strong className="text-navy">Jumble</strong> puzzle, or play{' '}
                <strong className="text-navy">Wordscapes</strong>, <strong className="text-navy">Wordfeud</strong>,
                or <strong className="text-navy">Quordle</strong> — this tool has you covered with the right
                dictionary and filters.
              </p>
            </div>

            {/* Bottom Ad */}
            <div className="mt-10">
              <GoogleAd slot={process.env.NEXT_PUBLIC_AD_SLOT_CONTENT_BOTTOM || ''} format="rectangle" />
            </div>
            {/* Related Tools */}
            <div className="mt-10 border-t border-parchment-dark pt-10">
              <RelatedTools currentPath="/" />
            </div>
          </div>
        </section>

        <FeatureCards />
        <HowItWorks />
      </main>
      <Footer />
      <SoftwareAppSchema
        name="Word Unscrambler"
        description="Free word unscrambler tool. Enter scrambled letters to find all valid words for Scrabble, Words With Friends, Wordle and more."
        url={process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}
      />
    </>
  )
}
