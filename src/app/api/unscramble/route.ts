import { NextRequest, NextResponse } from 'next/server'
import { unscrambleLetters, type UnscrambleOptions } from '@/lib/word-engine/unscramble'
import { checkRateLimit } from '@/lib/rate-limit'
import type { DictionaryType } from '@/lib/word-engine/loader'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  // NOTE: x-forwarded-for can be spoofed by clients not behind a trusted proxy.
  // In production, configure your reverse proxy (nginx / Vercel / Cloudflare)
  // to overwrite x-forwarded-for with the verified client IP so this value
  // cannot be manipulated by the end user.
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'

  const rateLimit = checkRateLimit(ip)
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

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const { letters, dictionary, mustInclude, startsWith, endsWith, minLength, maxLength } = body as {
    letters?: string
    dictionary?: string
    mustInclude?: string
    startsWith?: string
    endsWith?: string
    minLength?: number
    maxLength?: number
  }

  if (!letters || typeof letters !== 'string') {
    return NextResponse.json({ error: 'letters is required.' }, { status: 400 })
  }

  const trimmedLetters = letters.trim()
  if (trimmedLetters.length < 2 || trimmedLetters.length > 15) {
    return NextResponse.json(
      { error: 'letters must be between 2 and 15 characters.' },
      { status: 400 }
    )
  }

  if (!/^[a-zA-Z?*]+$/.test(trimmedLetters)) {
    return NextResponse.json(
      { error: 'letters may only contain a-z, A-Z, ? and *.' },
      { status: 400 }
    )
  }

  const validDictionaries: DictionaryType[] = ['nwl', 'csw', 'enable']
  const dict: DictionaryType =
    dictionary && validDictionaries.includes(dictionary as DictionaryType)
      ? (dictionary as DictionaryType)
      : 'enable'

  // Validate optional filter strings: alpha-only, max 10 chars each.
  const ALPHA_RE = /^[a-zA-Z]*$/
  const optionalFields = [
    ['mustInclude', mustInclude],
    ['startsWith', startsWith],
    ['endsWith', endsWith],
  ] as const
  for (const [name, value] of optionalFields) {
    if (typeof value !== 'string' && value !== undefined) {
      return NextResponse.json({ error: `${name} must be a string.` }, { status: 400 })
    }
    if (typeof value === 'string') {
      if (value.length > 10) {
        return NextResponse.json(
          { error: `${name} must be at most 10 characters.` },
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
  }

  // Validate numeric length constraints.
  if (minLength !== undefined) {
    if (typeof minLength !== 'number' || !Number.isInteger(minLength) || minLength < 1 || minLength > 15) {
      return NextResponse.json({ error: 'minLength must be an integer between 1 and 15.' }, { status: 400 })
    }
  }
  if (maxLength !== undefined) {
    if (typeof maxLength !== 'number' || !Number.isInteger(maxLength) || maxLength < 1 || maxLength > 15) {
      return NextResponse.json({ error: 'maxLength must be an integer between 1 and 15.' }, { status: 400 })
    }
  }

  const options: UnscrambleOptions = {
    dictionary: dict,
    mustInclude: typeof mustInclude === 'string' ? mustInclude : undefined,
    startsWith: typeof startsWith === 'string' ? startsWith : undefined,
    endsWith: typeof endsWith === 'string' ? endsWith : undefined,
    minLength: typeof minLength === 'number' ? minLength : undefined,
    maxLength: typeof maxLength === 'number' ? maxLength : undefined,
  }

  try {
    const result = unscrambleLetters(trimmedLetters, options)
    return NextResponse.json(result, {
      headers: {
        'X-RateLimit-Remaining': String(rateLimit.remaining),
        'X-RateLimit-Reset': String(rateLimit.resetAt),
      },
    })
  } catch (err) {
    console.error('Unscramble error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
