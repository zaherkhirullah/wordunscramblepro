'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const SESSION_KEY = 'wordunscramble_session'

function getSessionId(): string {
  if (typeof window === 'undefined') return ''
  
  let sessionId = localStorage.getItem(SESSION_KEY)
  
  if (!sessionId) {
    sessionId = `s_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`
    localStorage.setItem(SESSION_KEY, sessionId)
  }
  
  return sessionId
}

export default function PageTracker() {
  const pathname = usePathname()
  const [tracked, setTracked] = useState(false)
  
  useEffect(() => {
    if (tracked) return
    
    const sessionId = getSessionId()
    if (!sessionId) return
    
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, path: pathname })
    }).catch(() => {}) // Silent fail
    
    setTracked(true)
  }, [pathname, tracked])
  
  return null
}