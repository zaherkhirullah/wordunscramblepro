import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import GoogleAd from '@/components/ads/GoogleAd'
import { createPageMetadata } from '@/lib/metadata'

export const metadata = createPageMetadata({
  title: 'Terms of Service – Word Unscramble Pro',
  description: 'Terms of Service for Word Unscramble Pro. Read our terms before using our free word game tools.',
  path: '/terms-of-service',
})

export default function TermsOfServicePage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="font-display font-bold text-navy mb-2">Terms of Service</h1>
          <p className="text-navy/50 font-body text-sm mb-10">Last updated: April 26, 2026</p>

          <div className="space-y-8 font-body text-navy/70 leading-relaxed">

            {/* 1. Introduction */}
            <section>
              <h2 className="font-display font-bold text-navy text-xl mb-3">1. Introduction</h2>
              <p>
                Word Unscramble Pro (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) provides free
                online word game tools at this website. By accessing or using our service, you agree to
                these Terms of Service. If you disagree with any part of these terms, you may not use
                our service.
              </p>
            </section>

            {/* 2. Use of Service */}
            <section>
              <h2 className="font-display font-bold text-navy text-xl mb-3">2. Use of Service</h2>
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <span className="text-gold shrink-0 mt-0.5">•</span>
                  <span>
                    Our tools are provided for personal, non-commercial entertainment and educational
                    purposes.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gold shrink-0 mt-0.5">•</span>
                  <span>
                    You may not use automated bots, scrapers or scripts to access our API endpoints at
                    scale. Reasonable programmatic use is permitted within the rate limits posted on our
                    API.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gold shrink-0 mt-0.5">•</span>
                  <span>
                    You agree not to use the service to transmit harmful, abusive, or illegal content.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gold shrink-0 mt-0.5">•</span>
                  <span>
                    You agree not to attempt to reverse-engineer, decompile or extract our word lists or
                    software in bulk.
                  </span>
                </li>
              </ul>
            </section>

            {/* 3. Intellectual Property */}
            <section>
              <h2 className="font-display font-bold text-navy text-xl mb-3">3. Intellectual Property</h2>
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <span className="text-gold shrink-0 mt-0.5">•</span>
                  <span>
                    The Word Unscramble Pro software, design, and original content are copyright &copy;
                    2024&ndash;2026 Word Unscramble Pro. All rights reserved.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gold shrink-0 mt-0.5">•</span>
                  <span>
                    The word lists used (ENABLE, NWL, CSW) are publicly available datasets and are not
                    proprietary to us.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gold shrink-0 mt-0.5">•</span>
                  <span>
                    Scrabble&reg; is a registered trademark of Hasbro, Inc. (North America) and Mattel
                    Inc. (international). Words With Friends&reg; is a registered trademark of Zynga
                    Inc. Wordle&reg; is a trademark of The New York Times Company. We are not affiliated
                    with any of these companies.
                  </span>
                </li>
              </ul>
            </section>

            {/* 4. Disclaimer of Warranties */}
            <section>
              <h2 className="font-display font-bold text-navy text-xl mb-3">
                4. Disclaimer of Warranties
              </h2>
              <p>
                The service is provided &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; without
                warranties of any kind. We do not warrant that:
              </p>
              <ul className="space-y-2 mt-3">
                <li className="flex gap-2">
                  <span className="text-gold shrink-0 mt-0.5">•</span>
                  <span>The service will be uninterrupted or error-free</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gold shrink-0 mt-0.5">•</span>
                  <span>
                    Results will be 100% accurate or complete for all competitive word game uses
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gold shrink-0 mt-0.5">•</span>
                  <span>The service will be available at any particular time</span>
                </li>
              </ul>
            </section>

            {/* 5. Limitation of Liability */}
            <section>
              <h2 className="font-display font-bold text-navy text-xl mb-3">
                5. Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by law, Word Unscramble Pro shall not be liable for any
                indirect, incidental, special, or consequential damages arising from your use of, or
                inability to use, the service. Our total liability shall not exceed the amount you paid
                us in the past 12 months (which for a free service is $0).
              </p>
            </section>

            {/* 6. Accuracy of Word Lists */}
            <section>
              <h2 className="font-display font-bold text-navy text-xl mb-3">
                6. Accuracy of Word Lists
              </h2>
              <p>
                Our word lists are derived from publicly available sources and are intended as a
                reference only. Word game publishers may update their official dictionaries periodically.
                Always verify critical plays against the official dictionary for your specific game and
                version. We accept no responsibility for game losses resulting from reliance on our
                tools.
              </p>
            </section>

            {/* 7. Third-Party Services */}
            <section>
              <h2 className="font-display font-bold text-navy text-xl mb-3">
                7. Third-Party Services
              </h2>
              <p>
                Our site uses Google AdSense for advertising and Google Analytics for usage statistics.
                These services are governed by Google&apos;s own terms and privacy policies. We are not
                responsible for the content of third-party advertisements.
              </p>
            </section>

            {/* 8. Changes to Terms */}
            <section>
              <h2 className="font-display font-bold text-navy text-xl mb-3">8. Changes to Terms</h2>
              <p>
                We may update these Terms of Service at any time. The &ldquo;last updated&rdquo; date
                below reflects the most recent revision. Continued use of the service after changes
                constitutes acceptance of the updated terms.
              </p>
            </section>

            {/* 9. Governing Law */}
            <section>
              <h2 className="font-display font-bold text-navy text-xl mb-3">9. Governing Law</h2>
              <p>
                These terms are governed by the laws of the jurisdiction in which the service operates,
                without regard to conflict of law provisions.
              </p>
            </section>

            {/* 10. Contact */}
            <section>
              <h2 className="font-display font-bold text-navy text-xl mb-3">10. Contact</h2>
              <p>
                For questions about these terms, please use our{' '}
                <a href="/contact" className="text-gold-dark hover:underline">
                  contact page
                </a>
                .
              </p>
            </section>
          </div>

          {/* Back to home */}
          <div className="mt-10">
            <a href="/" className="text-gold-dark hover:underline font-body text-sm">
              ← Back to home
            </a>
          </div>

          {/* Ad */}
          <div className="mt-10">
            <GoogleAd slot={process.env.NEXT_PUBLIC_AD_SLOT_CONTENT_BOTTOM || ''} format="rectangle" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
