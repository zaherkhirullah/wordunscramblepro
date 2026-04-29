import { NextRequest, NextResponse } from 'next/server'
import { trackPageVisit, generateSessionId } from '@/lib/page-visits'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, path } = body
    
    const sid = sessionId || generateSessionId()
    
    if (path) {
      trackPageVisit(sid, path)
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to track' }, { status: 500 })
  }
}