import { NextRequest, NextResponse } from 'next/server'
import { solveWordle, type WordleOptions } from '@/lib/word-engine/wordle'
import { checkRateLimit } from '@/lib/rate-limit'

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

  const rateLimit = checkRateLimit(`wordle:${ip}`)
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait before trying again.' },
      { status: 429 }
    )
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const { validLetters, placedLetters, badLetters, wordLength } = body as {
    validLetters?: string
    placedLetters?: string[]
    badLetters?: string
    wordLength?: number
  }

  // --- Input validation ---
  const LETTERS_RE = /^[a-zA-Z]*$/

  const safeValidLetters = typeof validLetters === 'string' ? validLetters : ''
  if (safeValidLetters.length > 26 || !LETTERS_RE.test(safeValidLetters)) {
    return NextResponse.json(
      { error: 'validLetters must only contain a-z/A-Z and be at most 26 characters.' },
      { status: 400 }
    )
  }

  const safeBadLetters = typeof badLetters === 'string' ? badLetters : ''
  if (safeBadLetters.length > 26 || !LETTERS_RE.test(safeBadLetters)) {
    return NextResponse.json(
      { error: 'badLetters must only contain a-z/A-Z and be at most 26 characters.' },
      { status: 400 }
    )
  }

  const rawWordLength = typeof wordLength === 'number' ? wordLength : 5
  const safeWordLength = Math.floor(rawWordLength)
  if (safeWordLength < 2 || safeWordLength > 15) {
    return NextResponse.json(
      { error: 'wordLength must be between 2 and 15.' },
      { status: 400 }
    )
  }

  const rawPlacedLetters = Array.isArray(placedLetters) ? placedLetters : []
  // placedLetters is an array of per-position hints; cap at wordLength entries,
  // each entry must be a short alphabetic string (or empty).
  if (rawPlacedLetters.length > safeWordLength) {
    return NextResponse.json(
      { error: 'placedLetters length must not exceed wordLength.' },
      { status: 400 }
    )
  }
  for (const entry of rawPlacedLetters) {
    if (typeof entry !== 'string' || entry.length > 15 || !LETTERS_RE.test(entry)) {
      return NextResponse.json(
        { error: 'Each placedLetters entry must be an alphabetic string of at most 15 characters.' },
        { status: 400 }
      )
    }
  }
  // --- End input validation ---

  const options: WordleOptions = {
    validLetters: safeValidLetters,
    placedLetters: rawPlacedLetters,
    badLetters: safeBadLetters,
    wordLength: safeWordLength,
  }

  try {
    const words = solveWordle(options)
    return NextResponse.json({ words, count: words.length })
  } catch (err) {
    console.error('Wordle solve error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
