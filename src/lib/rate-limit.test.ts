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

  it('should use Upstash when env vars are set and enforce its decision', async () => {
    process.env.UPSTASH_REDIS_REST_URL = 'https://test.upstash.io'
    process.env.UPSTASH_REDIS_REST_TOKEN = 'test-token'

    mockLimit.mockResolvedValue({
      success: false,
      remaining: 0,
      reset: Date.now() + 3600000,
    })

    const result = await checkRateLimit('127.0.0.1')

    expect(mockLimit).toHaveBeenCalledWith('127.0.0.1')
    expect(result.success).toBe(false) // Upstash says blocked → blocked

    delete process.env.UPSTASH_REDIS_REST_URL
    delete process.env.UPSTASH_REDIS_REST_TOKEN
  })

  it('should fall back to in-memory when Upstash env vars missing', async () => {
    delete process.env.UPSTASH_REDIS_REST_URL
    delete process.env.UPSTASH_REDIS_REST_TOKEN

    const result = await checkRateLimit('192.168.1.1')

    expect(result.success).toBe(true)
    expect(result).toHaveProperty('remaining')
    expect(result).toHaveProperty('resetIn')
    expect(mockLimit).not.toHaveBeenCalled()
  })

  it('should allow request when Redis is unreachable (graceful fallback)', async () => {
    process.env.UPSTASH_REDIS_REST_URL = 'https://test.upstash.io'
    process.env.UPSTASH_REDIS_REST_TOKEN = 'test-token'

    mockLimit.mockRejectedValue(new Error('Redis connection failed'))

    const result = await checkRateLimit('10.0.0.1')

    expect(result.success).toBe(true) // Graceful: allow on error

    delete process.env.UPSTASH_REDIS_REST_URL
    delete process.env.UPSTASH_REDIS_REST_TOKEN
  })
})
