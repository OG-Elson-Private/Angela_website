// Simple in-memory rate limiter for testimonial submissions
// For production, consider using Upstash Redis or similar

interface RateLimitEntry {
  count: number
  resetTime: number
}

const rateLimitMap = new Map<string, RateLimitEntry>()

// Configuration
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour in milliseconds
const MAX_REQUESTS_PER_WINDOW = 3 // Max 3 submissions per hour per IP

/**
 * Check if the request should be rate limited
 * @param identifier - Usually the IP address or a unique identifier
 * @returns Object with success status and remaining attempts
 */
export function checkRateLimit(identifier: string): {
  success: boolean
  remaining: number
  resetIn: number
} {
  const now = Date.now()
  const entry = rateLimitMap.get(identifier)

  // Clean up expired entries periodically
  if (rateLimitMap.size > 10000) {
    cleanupExpiredEntries()
  }

  // No existing entry - allow request
  if (!entry) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    })
    return {
      success: true,
      remaining: MAX_REQUESTS_PER_WINDOW - 1,
      resetIn: RATE_LIMIT_WINDOW,
    }
  }

  // Entry expired - reset and allow
  if (now > entry.resetTime) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    })
    return {
      success: true,
      remaining: MAX_REQUESTS_PER_WINDOW - 1,
      resetIn: RATE_LIMIT_WINDOW,
    }
  }

  // Check if limit exceeded
  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return {
      success: false,
      remaining: 0,
      resetIn: entry.resetTime - now,
    }
  }

  // Increment count and allow
  entry.count++
  return {
    success: true,
    remaining: MAX_REQUESTS_PER_WINDOW - entry.count,
    resetIn: entry.resetTime - now,
  }
}

/**
 * Get the client IP address from the request headers
 */
export function getClientIP(request: Request): string {
  // Check various headers that might contain the real IP
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(',')[0].trim()
  }

  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    return realIP
  }

  // Fallback - this won't work in production behind a proxy
  return 'unknown'
}

/**
 * Clean up expired entries to prevent memory leaks
 */
function cleanupExpiredEntries(): void {
  const now = Date.now()
  const entries = Array.from(rateLimitMap.entries())
  for (const [key, entry] of entries) {
    if (now > entry.resetTime) {
      rateLimitMap.delete(key)
    }
  }
}

/**
 * Format milliseconds to human-readable time
 */
export function formatResetTime(ms: number): string {
  const minutes = Math.ceil(ms / 60000)
  if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? '' : 's'}`
  }
  const hours = Math.ceil(minutes / 60)
  return `${hours} hour${hours === 1 ? '' : 's'}`
}
