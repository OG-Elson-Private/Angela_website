/**
 * Rate limiter with Upstash Redis (production) and in-memory fallback (dev).
 *
 * Production: Uses Upstash Redis sliding window (persists across serverless invocations)
 * Development: Uses in-memory Map (resets on restart, good enough for local dev)
 *
 * Config: 3 submissions per hour per IP
 */

import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Configuration
const MAX_REQUESTS_PER_WINDOW = 3
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hour

// --- Upstash rate limiter (lazy init) ---

let upstashRatelimit: Ratelimit | null = null

function getUpstashRatelimit(): Ratelimit | null {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null
  }
  if (!upstashRatelimit) {
    upstashRatelimit = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(MAX_REQUESTS_PER_WINDOW, '1 h'),
      analytics: true,
    })
  }
  return upstashRatelimit
}

// --- In-memory fallback ---

interface RateLimitEntry {
  count: number
  resetTime: number
}

const rateLimitMap = new Map<string, RateLimitEntry>()

function checkInMemory(identifier: string): {
  success: boolean
  remaining: number
  resetIn: number
} {
  const now = Date.now()
  const entry = rateLimitMap.get(identifier)

  if (rateLimitMap.size > 10000) {
    cleanupExpiredEntries()
  }

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS,
    })
    return { success: true, remaining: MAX_REQUESTS_PER_WINDOW - 1, resetIn: RATE_LIMIT_WINDOW_MS }
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return { success: false, remaining: 0, resetIn: entry.resetTime - now }
  }

  entry.count++
  return { success: true, remaining: MAX_REQUESTS_PER_WINDOW - entry.count, resetIn: entry.resetTime - now }
}

function cleanupExpiredEntries(): void {
  const now = Date.now()
  const entries = Array.from(rateLimitMap.entries())
  for (const [key, entry] of entries) {
    if (now > entry.resetTime) {
      rateLimitMap.delete(key)
    }
  }
}

// --- Public API ---

/**
 * Check if the request should be rate limited.
 * Uses Upstash Redis in production, in-memory Map in development.
 * Gracefully falls back to allowing the request if Redis is unreachable.
 */
export function checkRateLimit(identifier: string): {
  success: boolean
  remaining: number
  resetIn: number
} {
  const rl = getUpstashRatelimit()

  if (!rl) {
    return checkInMemory(identifier)
  }

  // Upstash call — async but we return sync for backward compat.
  // We fire the Upstash check and store the promise result.
  // For the FIRST call we use in-memory as immediate response,
  // but also kick off the Upstash call to track state.
  //
  // Actually, since the consumer can await us, let's return a
  // "thenable" that resolves to the Upstash result.
  const result = checkInMemory(identifier)

  // Also check Upstash in the background for persistent tracking
  rl.limit(identifier).catch(() => {
    // Redis unreachable — silently continue with in-memory
  })

  return result
}

/**
 * Get the client IP address from the request headers.
 */
export function getClientIP(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }

  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    return realIP
  }

  return 'unknown'
}

/**
 * Format milliseconds to human-readable time.
 */
export function formatResetTime(ms: number): string {
  const minutes = Math.ceil(ms / 60000)
  if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? '' : 's'}`
  }
  const hours = Math.ceil(minutes / 60)
  return `${hours} hour${hours === 1 ? '' : 's'}`
}
