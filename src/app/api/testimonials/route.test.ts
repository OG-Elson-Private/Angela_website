import { describe, it, expect, vi } from 'vitest'

// Mock prisma
const mockFindMany = vi.fn()
const mockCount = vi.fn()
const mockAggregate = vi.fn()

vi.mock('@/lib/db', () => ({
  prisma: {
    testimonial: {
      findMany: (...args: unknown[]) => mockFindMany(...args),
      count: (...args: unknown[]) => mockCount(...args),
      aggregate: (...args: unknown[]) => mockAggregate(...args),
    },
  },
}))

vi.mock('@/lib/rate-limit', () => ({
  checkRateLimit: vi.fn(() => ({ success: true, remaining: 2, resetIn: 3600000 })),
  getClientIP: vi.fn(() => '127.0.0.1'),
  formatResetTime: vi.fn(() => '60 minutes'),
}))

import { GET } from './route'
import { NextRequest } from 'next/server'

describe('GET /api/testimonials', () => {
  it('should sort by approvedAt desc with createdAt desc fallback', async () => {
    mockFindMany.mockResolvedValue([])
    mockCount.mockResolvedValue(0)
    mockAggregate.mockResolvedValue({ _avg: { rating: null }, _count: { rating: 0 } })

    const request = new NextRequest('http://localhost/api/testimonials')
    await GET(request)

    const findManyArgs = mockFindMany.mock.calls[0][0]
    expect(findManyArgs.orderBy).toEqual([
      { approvedAt: 'desc' },
      { createdAt: 'desc' },
    ])
  })
})
