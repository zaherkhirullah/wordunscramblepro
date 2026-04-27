import { NextRequest, NextResponse } from 'next/server'
import { generateRandomWords } from '@/lib/word-engine/random'
import { checkRateLimit } from '@/lib/rate-limit'

export const runtime = 'nodejs'

const ALPHA_RE = /^[a-zA-Z]*$/

export async function GET(request: NextRequest) {
  // NOTE: x-forwarded-for can be spoofed by clients not behind a trusted proxy.
  // In production, configure your reverse proxy (nginx / Vercel / Cloudflare)
  // to overwrite x-forwarded-for with the verified client IP so this value
  // cannot be manipulated by the end user.
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'

  const rateLimit = checkRateLimit(`random:${ip}`)
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

  const countParam = searchParams.get('count')
  const startsWith = searchParams.get('startsWith') ?? ''
  const endsWith = searchParams.get('endsWith') ?? ''
  const contains = searchParams.get('contains') ?? ''
  const minLengthParam = searchParams.get('minLength')
  const maxLengthParam = searchParams.get('maxLength')

  // --- Input validation ---
  for (const [name, value] of [['startsWith', startsWith], ['endsWith', endsWith], ['contains', contains]] as const) {
    if (value.length > 15) {
      return NextResponse.json(
        { error: `${name} must be at most 15 characters.` },
        { status: 400 }
      )
    }
    if (!ALPHA_RE.test(value)) {
      return NextResponse.json(
        { error: `${name} must only contain letters a-z/A-Z.` },
        { status: 400 }
      )
    }
  }
  // --- End input validation ---

  const count = Math.min(Math.max(1, Number(countParam) || 10), 100)
  const minLength = Math.max(2, Number(minLengthParam) || 2)
  const maxLength = Math.min(15, Number(maxLengthParam) || 15)

  try {
    const words = generateRandomWords({
      count,
      startsWith,
      endsWith,
      contains,
      minLength,
      maxLength,
    })
    return NextResponse.json({ words })
  } catch (err) {
    console.error('Random words error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
