'use client'

import { useEffect, useRef } from 'react'

interface GoogleAdProps {
  slot: string
  format?: 'auto' | 'rectangle' | 'leaderboard' | 'skyscraper'
  className?: string
  style?: React.CSSProperties
}

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

export default function GoogleAd({
  slot,
  format = 'auto',
  className = '',
  style,
}: GoogleAdProps) {
  const adRef = useRef<HTMLModElement>(null)
  const adsEnabled = process.env.NEXT_PUBLIC_ADS_ENABLED === 'true'
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID

  const isConfigured =
    adsEnabled &&
    publisherId &&
    !publisherId.includes('XXXXXXXXX')

  useEffect(() => {
    if (!isConfigured) return
    try {
      if (adRef.current) {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    } catch {
      // AdSense script not yet loaded
    }
  }, [isConfigured])

  if (!isConfigured) return null

  const adStyle: React.CSSProperties =
    format === 'rectangle'
      ? { display: 'block', minHeight: '250px' }
      : format === 'leaderboard'
      ? { display: 'block', minHeight: '90px' }
      : format === 'skyscraper'
      ? { display: 'block', minHeight: '600px' }
      : { display: 'block' }

  return (
    <div className={`ad-container overflow-hidden ${className}`} style={style}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ ...adStyle, width: '100%' }}
        data-ad-client={publisherId}
        data-ad-slot={slot}
        data-ad-format={format === 'auto' ? 'auto' : undefined}
        data-full-width-responsive="true"
      />
    </div>
  )
}
