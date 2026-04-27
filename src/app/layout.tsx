import { WebSiteSchema } from '@/components/JsonLd'
import { defaultMetadata } from '@/lib/metadata'
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata, Viewport } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = defaultMetadata

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

const adsEnabled =
  process.env.NEXT_PUBLIC_ADS_ENABLED === 'true' &&
  process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID &&
  !process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID.includes('XXXXXXXXX')

const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const gaEnabled = gaId && !gaId.includes('XXXXXXXXX')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${dmSans.variable}`}>
      <head>
        {adsEnabled && (
          <meta name="google-adsense-account" content={process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID} />
        )}
      </head>
      <body className="font-body bg-parchment text-navy">
        {children}
        <WebSiteSchema
          siteUrl={process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}
          siteName={process.env.NEXT_PUBLIC_SITE_NAME || 'Word Unscramble Pro'}
        />

        {/* Google Analytics */}
        {gaEnabled && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        )}

        {/* Google AdSense */}
        {adsEnabled && (
          <Script
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID}`}
            strategy="afterInteractive"
            crossOrigin="anonymous"
          />
        )}
        <Analytics/>
        <SpeedInsights/>
      </body>
    </html>
  )
}
