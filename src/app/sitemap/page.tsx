import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { createPageMetadata } from '@/lib/metadata'
import Link from 'next/link'
import sitemapData from '@/data/sitemap-data.json'
import { getPopularPages } from '@/lib/page-visits'

export const metadata = createPageMetadata({
  title: 'Sitemap - All Pages on Word Unscramble Pro',
  description: 'Complete sitemap with all tools, word lists, categories, and resources. Browse every page on Word Unscramble Pro for Scrabble, Wordle, Words With Friends.',
  path: '/sitemap',
})

const sitemapSections = sitemapData.sections

const popularPages = getPopularPages(8)
  .filter(p => p.path.startsWith('/unscramble/'))
  .map(p => ({
    href: p.path,
    label: p.path.replace('/unscramble/', '').toUpperCase()
  }))

interface Link {
  href: string
  label: string
  desc?: string
}

const expandedSections: { title: string; links: Link[] }[] = sitemapSections.map(section => {
  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')
  
  if (section.title === 'Words Containing Letter') {
    return {
      ...section,
      links: letters.map(l => ({
        href: `/words/containing/${l}`,
        label: `Words Containing ${l.toUpperCase()}`
      }))
    }
  }
  
  if (section.title === 'Words Starting With') {
    return {
      ...section,
      links: letters.map(l => ({
        href: `/words/starting-with/${l}`,
        label: `Words Starting With ${l.toUpperCase()}`
      }))
    }
  }
  
  if (section.title === 'Words Ending With') {
    return {
      ...section,
      links: letters.map(l => ({
        href: `/words/ending-with/${l}`,
        label: `Words Ending With ${l.toUpperCase()}`
      }))
    }
  }
  
  if (section.title === 'Popular Unscramble Pages') {
    return {
      ...section,
      links: popularPages.length > 0 ? popularPages : section.links
    }
  }
  
  return section
})

export default function SitemapPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="font-display font-bold text-navy mb-2">Sitemap</h1>
          <p className="text-navy/60 font-body mb-10">
            Complete sitemap of all tools, word lists, categories, and resources on Word Unscramble Pro.
          </p>

          <div className="space-y-10">
            {expandedSections.map((section) => (
              <div key={section.title}>
                <h2 className="font-display text-xl font-bold text-navy mb-4 pb-2 border-b border-parchment-dark">
                  {section.title}
                </h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="flex flex-col px-4 py-3 rounded-lg border border-parchment-dark hover:border-gold/40 hover:bg-gold/5 transition-all group"
                      >
                        <span className="font-display font-semibold text-navy group-hover:text-gold-dark transition-colors text-sm">
                          {link.label}
                        </span>
                        {link.desc && (
                          <span className="text-xs text-navy/50 font-body mt-0.5">{link.desc}</span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}