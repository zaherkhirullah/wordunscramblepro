import { NextResponse } from 'next/server'
import { getAllWords } from '@/lib/word-engine/loader'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const words = getAllWords('enable')
    return NextResponse.json({
      status: 'ok',
      wordlistLoaded: words.length > 0,
      wordCount: words.length,
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    return NextResponse.json(
      {
        status: 'error',
        wordlistLoaded: false,
        wordCount: 0,
        timestamp: new Date().toISOString(),
        error: String(err),
      },
      { status: 500 }
    )
  }
}
