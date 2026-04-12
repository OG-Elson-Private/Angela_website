import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock Upstash
const mockLimit = vi.fn()
vi.mock('@upstash/ratelimit', () => ({
  Ratelimit: class MockRatelimit {
    static slidingWindow() { return {} }
    limit = mockLimit
  },
}))

vi.mock('@upstash/redis', () => ({
  Redis: class MockRedis {
    static fromEnv() { return {} }
  },
}))

import { checkRateLimit } from './rate-limit'

describe('checkRateLimit', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should use Upstash when env vars are set', async () => {
    process.env.UPSTASH_REDIS_REST_URL = 'https://test.upstash.io'
    process.env.UPSTASH_REDIS_REST_TOKEN = 'test-token'

    mockLimit.mockResolvedValue({
      success: true,
      remaining: 2,
      reset: Date.now() + 3600000,
    })

    const result = checkRateLimit('127.0.0.1')
    await Promise.resolve(result)

    // Must actually call Upstash limit()
    expect(mockLimit).toHaveBeenCalledWith('127.0.0.1')

    delete process.env.UPSTASH_REDIS_REST_URL
    delete process.env.UPSTASH_REDIS_REST_TOKEN
  })

  it('should fall back to in-memory when Upstash env vars missing', () => {
    delete process.env.UPSTASH_REDIS_REST_URL
    delete process.env.UPSTASH_REDIS_REST_TOKEN

    const result = checkRateLimit('192.168.1.1')

    expect(result).toHaveProperty('success', true)
    expect(result).toHaveProperty('remaining')
    expect(result).toHaveProperty('resetIn')
  })

  it('should allow request when Redis is unreachable (graceful fallback)', async () => {
    process.env.UPSTASH_REDIS_REST_URL = 'https://test.upstash.io'
    process.env.UPSTASH_REDIS_REST_TOKEN = 'test-token'

    mockLimit.mockRejectedValue(new Error('Redis connection failed'))

    const result = checkRateLimit('10.0.0.1')
    const resolved = await Promise.resolve(result)

    expect(resolved.success).toBe(true)

    delete process.env.UPSTASH_REDIS_REST_URL
    delete process.env.UPSTASH_REDIS_REST_TOKEN
  })
})
