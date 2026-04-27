import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { createPageMetadata } from '@/lib/metadata'

export const metadata = createPageMetadata({
  title: 'Contact Us',
  description: 'Get in touch with the Word Unscramble Pro team.',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="font-display font-bold text-navy mb-2">Contact Us</h1>
          <p className="text-navy/60 font-body mb-8">
            Have a question, bug report or feature request? We&apos;d love to hear from you.
          </p>
          <div className="card space-y-4">
            <div>
              <label className="block text-sm font-medium text-navy/60 mb-1">Name</label>
              <input
                type="text"
                className="w-full px-3 py-2.5 border border-parchment-dark rounded-lg text-navy focus:outline-none focus:border-gold transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy/60 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2.5 border border-parchment-dark rounded-lg text-navy focus:outline-none focus:border-gold transition-colors"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy/60 mb-1">Message</label>
              <textarea
                rows={5}
                className="w-full px-3 py-2.5 border border-parchment-dark rounded-lg text-navy focus:outline-none focus:border-gold transition-colors resize-none"
                placeholder="Your message..."
              />
            </div>
            <button className="btn-primary w-full">Send Message</button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
