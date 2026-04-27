import { NextRequest, NextResponse } from 'next/server'
import { checkWordInDictionary } from '@/lib/word-engine/dictionary'
import { checkRateLimit } from '@/lib/rate-limit'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  // Rate-limit this endpoint to prevent dictionary enumeration attacks.
  // NOTE: x-forwarded-for can be spoofed by clients not behind a trusted proxy.
  // In production, configure your reverse proxy (nginx / Vercel / Cloudflare)
  // to overwrite x-forwarded-for with the verified client IP so this value
  // cannot be manipulated by the end user.
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'

  const rateLimit = checkRateLimit(`dict:${ip}`)
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait before trying again.' },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': String(process.env.API_RATE_LIMIT_REQUESTS || 30),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(rateLimit.resetAt),
          'Retry-After': String(Math.ceil((rateLimit.resetAt - Date.now()) / 1000)),
        },
      }
    )
  }

  const { searchParams } = new URL(request.url)
  const word = searchParams.get('word')

  if (!word || typeof word !== 'string') {
    return NextResponse.json({ error: 'word query param is required.' }, { status: 400 })
  }

  const trimmed = word.trim().toLowerCase()
  if (trimmed.length < 2 || trimmed.length > 15) {
    return NextResponse.json(
      { error: 'word must be between 2 and 15 characters.' },
      { status: 400 }
    )
  }

  if (!/^[a-z]+$/.test(trimmed)) {
    return NextResponse.json(
      { error: 'word may only contain letters a-z.' },
      { status: 400 }
    )
  }

  try {
    const result = await checkWordInDictionary(trimmed)
    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        'X-RateLimit-Remaining': String(rateLimit.remaining),
        'X-RateLimit-Reset': String(rateLimit.resetAt),
      },
    })
  } catch (err) {
    console.error('Dictionary check error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
