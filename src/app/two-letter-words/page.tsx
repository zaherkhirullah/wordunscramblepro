import { createPageMetadata } from '@/lib/metadata'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import GoogleAd from '@/components/ads/GoogleAd'
import Link from 'next/link'

export const metadata = createPageMetadata({
  title: 'Two Letter Words - Scrabble & Words With Friends',
  description: 'Complete list of all valid 2-letter words in Scrabble (NWL/TWL) and Collins (CSW) dictionaries.',
  path: '/two-letter-words',
  keywords: ['two letter words', '2 letter scrabble words', 'two letter scrabble words'],
})

const TWO_LETTER_WORDS = [
  'aa','ab','ad','ae','ag','ah','ai','al','am','an','ar','as','at','aw','ax','ay',
  'ba','be','bi','bo','by',
  'da','de','do',
  'ed','ef','eh','el','em','en','er','es','et','ex',
  'fa','fe',
  'gi','go',
  'ha','he','hi','hm','ho',
  'id','if','in','is','it',
  'jo',
  'ka','ki',
  'la','li','lo',
  'ma','me','mi','mm','mo','mu','my',
  'na','ne','no','nu',
  'od','oe','of','oh','oi','ok','om','on','op','or','os','ow','ox','oy',
  'pa','pe','pi','po',
  'qi',
  're',
  'sh','si','so',
  'ta','te','ti','to',
  'uh','um','un','up','us','ut',
  'we','wo',
  'xi','xu',
  'ya','ye','yo',
  'za',
]

export default function TwoLetterWordsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="font-display font-bold text-navy mb-2">Two Letter Words</h1>
          <p className="text-navy/60 font-body mb-2">
            All {TWO_LETTER_WORDS.length} valid 2-letter words accepted in Scrabble (NWL) and Words With Friends.
          </p>
          <p className="text-sm text-navy/40 font-body mb-8">
            Two-letter words are crucial for scoring big in Scrabble. Memorize these to maximize every play.
          </p>
          <div className="card">
            <div className="flex flex-wrap gap-2">
              {TWO_LETTER_WORDS.map((word) => (
                <Link
                  key={word}
                  href={`/check-dictionary?word=${word.toUpperCase()}`}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-parchment-dark hover:bg-gold/10 border border-transparent hover:border-gold/30 font-display font-bold text-navy uppercase text-sm transition-colors cursor-pointer"
                >
                  {word}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Ad */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-6">
          <GoogleAd slot={process.env.NEXT_PUBLIC_AD_SLOT_CONTENT_BOTTOM || ''} format="rectangle" />
        </div>

        {/* Browse more word lists */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-10">
          <div className="card">
            <h3 className="font-display font-semibold text-navy mb-4">Browse More Word Lists</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/word-lists" className="btn-primary text-sm">All Word Lists</Link>
              <Link href="/word-lists/3-letter" className="inline-flex items-center px-4 py-2 rounded-lg border border-navy/20 hover:border-gold/40 text-navy font-body text-sm transition-colors">3-Letter Words</Link>
              <Link href="/word-lists/4-letter" className="inline-flex items-center px-4 py-2 rounded-lg border border-navy/20 hover:border-gold/40 text-navy font-body text-sm transition-colors">4-Letter Words</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
