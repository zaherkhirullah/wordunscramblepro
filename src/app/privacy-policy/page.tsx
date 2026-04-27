import { createPageMetadata } from '@/lib/metadata'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = createPageMetadata({
  title: 'Privacy Policy',
  description: 'Privacy policy for Word Unscrambler — how we collect, use and protect your data.',
  path: '/privacy-policy',
})

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="font-display font-bold text-navy mb-2">Privacy Policy</h1>
          <p className="text-navy/50 font-body text-sm mb-10">Last updated: April 26, 2026</p>

          <div className="space-y-8 font-body text-navy/70 leading-relaxed">

            {/* 1. Introduction */}
            <section>
              <h2 className="font-display font-bold text-navy text-xl mb-3">1. Introduction</h2>
              <p>
                Word Unscrambler (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) operates this
                website as a free word game tool. This privacy policy explains what data we collect when
                you use our site and how we use it.
              </p>
            </section>

            {/* 2. Information we collect */}
            <section>
              <h2 className="font-display font-bold text-navy text-xl mb-3">2. Information we collect</h2>
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <span className="text-gold shrink-0 mt-0.5">•</span>
                  <span>
                    <strong className="text-navy">Usage data:</strong> Pages visited, time spent, referring
                    pages and browser/device type. Collected anonymously via analytics (if enabled).
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gold shrink-0 mt-0.5">•</span>
                  <span>
                    <strong className="text-navy">Tool inputs:</strong> Letters or words you enter into
                    our tools are processed server-side to return results. We do not store these inputs
                    after your request completes.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gold shrink-0 mt-0.5">•</span>
                  <span>
                    <strong className="text-navy">Contact form data:</strong> If you use our contact form,
                    we receive your email address and message. We use this only to respond to your inquiry.
                  </span>
                </li>
              </ul>
            </section>

            {/* 3. Cookies and tracking */}
            <section>
              <h2 className="font-display font-bold text-navy text-xl mb-3">
                3. Cookies and tracking
              </h2>
              <p>
                We may use cookies for analytics purposes (e.g., Google Analytics). These cookies collect
                anonymous aggregate data about site usage. We do not use cookies to personally identify
                you or track you across other websites.
              </p>
            </section>

            {/* 3.5 Google Analytics */}
            <section>
              <h2 className="font-display font-bold text-navy text-xl mb-3">
                3.5. Google Analytics
              </h2>
              <p>
                We may use <strong className="text-navy">Google Analytics</strong> to understand how
                visitors use our site. Google Analytics collects information such as pages visited, time
                spent on the site and general location at the country level. No personally identifiable
                information is collected or sent to Google Analytics.
              </p>
              <p className="mt-3">
                Google Analytics uses cookies to distinguish users and sessions. The data is aggregated
                and anonymised before we review it. You can opt out of Google Analytics tracking at any
                time by installing the{' '}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-dark hover:underline"
                >
                  Google Analytics opt-out browser add-on
                </a>
                .
              </p>
            </section>

            {/* 4. Advertising */}
            <section>
              <h2 className="font-display font-bold text-navy text-xl mb-3">4. Advertising</h2>
              <p>
                We use <strong className="text-navy">Google AdSense</strong> to display advertisements
                on this site. Google AdSense is a service provided by Google LLC that allows us to earn
                revenue by showing relevant ads to our visitors.
              </p>
              <p className="mt-3">
                Third-party vendors, including Google, use cookies to serve ads based on your prior visits
                to our site or other sites on the internet. Google&apos;s use of advertising cookies
                enables it and its partners to serve ads to you based on your visit to our site and/or
                other sites on the internet.
              </p>
              <p className="mt-3">
                Users in the <strong className="text-navy">European Economic Area (EEA) and UK</strong>{' '}
                have the right to consent to or reject personalised advertising. Where required by law,
                Google will ask for your consent before serving personalised ads.
              </p>
              <p className="mt-3">
                You may opt out of personalised advertising by visiting{' '}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-dark hover:underline"
                >
                  Google Ads Settings
                </a>
                . You can also opt out of a third-party vendor&apos;s use of cookies for personalised
                advertising by visiting{' '}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-dark hover:underline"
                >
                  www.aboutads.info
                </a>
                .
              </p>
              <p className="mt-3">
                Our use of Google AdSense is subject to the{' '}
                <a
                  href="https://support.google.com/adsense/answer/48182"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-dark hover:underline"
                >
                  Google AdSense programme policies
                </a>
                .
              </p>
            </section>

            {/* 5. Third-party services */}
            <section>
              <h2 className="font-display font-bold text-navy text-xl mb-3">
                5. Third-party services
              </h2>
              <p>
                We do not sell or share your personal data with third parties for marketing purposes. We
                may use third-party services (analytics, hosting) that process data according to their own
                privacy policies.
              </p>
            </section>

            {/* 6. Data retention */}
            <section>
              <h2 className="font-display font-bold text-navy text-xl mb-3">6. Data retention</h2>
              <p>
                We do not retain any personally identifiable data beyond what is needed to respond to a
                direct inquiry. Anonymous analytics data is retained in aggregate form by the analytics
                provider.
              </p>
            </section>

            {/* 7. Your rights */}
            <section>
              <h2 className="font-display font-bold text-navy text-xl mb-3">7. Your rights</h2>
              <p>
                Depending on your jurisdiction, you may have rights to access, correct or delete personal
                data we hold about you. To exercise these rights, contact us via the{' '}
                <a href="/contact" className="text-gold-dark hover:underline">
                  contact page
                </a>
                .
              </p>
              <p className="mt-3">
                <strong className="text-navy">EU/EEA residents</strong> have the following specific
                rights under the General Data Protection Regulation (GDPR):
              </p>
              <ul className="space-y-2 mt-3">
                {[
                  'Right to access the personal data we hold about you.',
                  'Right to rectify inaccurate or incomplete personal data.',
                  'Right to erasure ("right to be forgotten") of your personal data.',
                  'Right to restrict or object to the processing of your personal data.',
                  'Right to data portability — to receive your data in a structured, machine-readable format.',
                  'Right to lodge a complaint with a supervisory authority in your country of residence.',
                ].map((right) => (
                  <li key={right} className="flex gap-2">
                    <span className="text-gold shrink-0 mt-0.5">•</span>
                    <span>{right}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3">
                To exercise any of the above rights, please contact us via our{' '}
                <a href="/contact" className="text-gold-dark hover:underline">
                  contact page
                </a>
                . We will respond within 30 days.
              </p>
            </section>

            {/* 8. Changes to this policy */}
            <section>
              <h2 className="font-display font-bold text-navy text-xl mb-3">
                8. Changes to this policy
              </h2>
              <p>
                We may update this policy from time to time. The &ldquo;last updated&rdquo; date at the
                top of this page reflects the most recent revision. Continued use of the site after
                changes constitutes acceptance of the updated policy.
              </p>
            </section>

            {/* 9. Contact */}
            <section>
              <h2 className="font-display font-bold text-navy text-xl mb-3">9. Contact</h2>
              <p>
                If you have questions about this privacy policy, please use our{' '}
                <a href="/contact" className="text-gold-dark hover:underline">
                  contact page
                </a>
                .
              </p>
            </section>

            {/* 9.5 Children's Privacy */}
            <section>
              <h2 className="font-display font-bold text-navy text-xl mb-3">
                9.5. Children&apos;s Privacy
              </h2>
              <p>
                This site is <strong className="text-navy">not directed to children under the age of
                13</strong>. We do not knowingly collect personal information from children under 13. Our
                tools are intended for general audiences and we do not tailor content or advertising to
                children.
              </p>
              <p className="mt-3">
                If you believe that a child under 13 has provided us with personal information, please
                contact us immediately via our{' '}
                <a href="/contact" className="text-gold-dark hover:underline">
                  contact page
                </a>{' '}
                and we will take steps to delete that information promptly.
              </p>
            </section>

            {/* 10. Contact (secondary) */}
            <section>
              <h2 className="font-display font-bold text-navy text-xl mb-3">10. Contact</h2>
              <p>
                For all privacy-related enquiries, please use our{' '}
                <a href="/contact" className="text-gold-dark hover:underline">
                  contact page
                </a>
                . We aim to respond to all enquiries within 5 business days.
              </p>
            </section>
          </div>

          {/* Back to home */}
          <div className="mt-10">
            <Link href="/" className="text-gold-dark hover:underline font-body text-sm">
              ← Back to home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
