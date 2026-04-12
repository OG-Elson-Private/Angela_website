# Story 4.2: Migrate rate limiting to Upstash Redis

Status: ready-for-dev

## Story

As the system,
I need persistent rate limiting across serverless function invocations,
so that spam protection actually works on Vercel (in-memory Map resets on cold start).

## Acceptance Criteria

1. Rate limiting persists between serverless invocations (Redis-backed)
2. Compatible with Vercel serverless (no local state)
3. Graceful fallback: if Redis is unreachable, allow the request (don't block users)
4. Configurable via env vars (UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN)
5. Existing rate limit behavior preserved: 3 submissions per hour per IP
6. Backward compatible: if Upstash env vars not set, falls back to in-memory (dev mode)

## Tasks / Subtasks

- [ ] Task 1: Install Upstash dependencies
  - [ ] npm install @upstash/ratelimit @upstash/redis
  - [ ] Update .env.example with Upstash vars
- [ ] Task 2: Rewrite rate-limit.ts with Upstash (AC: 1,2,4,5,6)
  - [ ] Write test: uses Upstash when env vars are set
  - [ ] Write test: falls back to in-memory when env vars missing
  - [ ] Write test: allows request when Redis is unreachable (AC: 3)
  - [ ] Implement dual-mode rate limiter
- [ ] Task 3: Verify integration with POST /api/testimonials (AC: 5)
  - [ ] Ensure existing checkRateLimit/getClientIP/formatResetTime API unchanged

## Dev Notes

### Current implementation
`src/lib/rate-limit.ts` — in-memory Map with 3 requests/hour per IP.
Exports: checkRateLimit, getClientIP, formatResetTime

### Consumer
`src/app/api/testimonials/route.ts` — calls checkRateLimit(clientIP)

### Keep the same interface
```ts
checkRateLimit(identifier: string): { success: boolean; remaining: number; resetIn: number }
```

### Upstash Ratelimit SDK
```ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, '1 h'),
})
```

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6

### Completion Notes List

### File List
