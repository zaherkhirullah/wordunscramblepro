import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Word Unscrambler'
const siteDescription =
  process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
  'Simple, fast and powerful word unscrambler tool for Scrabble, Words With Friends, Wordle and more.'

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName,
    title: siteName,
    description: siteDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

interface PageMetadataOptions {
  title: string
  description: string
  path: string
  keywords?: string[]
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
}: PageMetadataOptions): Metadata {
  const url = `${siteUrl}${path}`
  return {
    title,
    description,
    keywords: keywords?.join(', '),
    openGraph: {
      title,
      description,
      url,
      type: 'website',
    },
    twitter: {
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  }
}
