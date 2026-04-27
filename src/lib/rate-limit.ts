interface RateLimitEntry {
  count: number
  windowStart: number
  resetAt: number
}

const store = new Map<string, RateLimitEntry>()

const MAX_REQUESTS = Number(process.env.API_RATE_LIMIT_REQUESTS) || 30
const WINDOW_MS = Number(process.env.API_RATE_LIMIT_WINDOW_MS) || 60000

// Periodically evict entries whose rate-limit window has already expired to
// prevent unbounded memory growth. The interval is intentionally longer than
// WINDOW_MS so that short-lived burst windows are naturally cleaned up without
// constant churn.
// Guard is required because Next.js may run this module in edge runtimes that
// do not expose setInterval (though this file uses runtime = 'nodejs').
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, entry] of store) {
      // An entry is safe to evict once its window has elapsed.
      if (now > entry.resetAt) {
        store.delete(key)
      }
    }
  }, 5 * 60 * 1000) // run every 5 minutes
}

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetAt: number
}

export function checkRateLimit(identifier: string): RateLimitResult {
  const now = Date.now()
  const entry = store.get(identifier)

  if (!entry || now > entry.resetAt) {
    const resetAt = now + WINDOW_MS
    store.set(identifier, { count: 1, windowStart: now, resetAt })
    return {
      allowed: true,
      remaining: MAX_REQUESTS - 1,
      resetAt,
    }
  }

  if (entry.count >= MAX_REQUESTS) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: entry.resetAt,
    }
  }

  entry.count++
  return {
    allowed: true,
    remaining: MAX_REQUESTS - entry.count,
    resetAt: entry.resetAt,
  }
}
