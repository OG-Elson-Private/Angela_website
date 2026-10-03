import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock the Prisma client (direct DB access, no HTTP self-fetch)
vi.mock('@/lib/db', () => ({
  prisma: { testimonial: { aggregate: vi.fn() } },
}))

import { fetchAggregateRating } from './schema-helpers'
import { prisma } from '@/lib/db'

const mockAggregate = vi.mocked(prisma.testimonial.aggregate)

describe('fetchAggregateRating', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return an AggregateRating object for cuisine when reviews exist', async () => {
    mockAggregate.mockResolvedValue({
      _avg: { rating: 4.8 },
      _count: { rating: 20 },
    } as never)

    const result = await fetchAggregateRating('cuisine')

    expect(result).toEqual({
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '20',
      bestRating: '5',
      worstRating: '1',
    })
    expect(mockAggregate).toHaveBeenCalledTimes(1)
    expect(mockAggregate).toHaveBeenCalledWith({
      where: {
        status: 'APPROVED',
        service: { in: ['PRIVATE_CHEF', 'CATERING', 'BIRYANI_FRIDAY', 'PILAU_TUESDAY'] },
      },
      _avg: { rating: true },
      _count: { rating: true },
    })
  })

  it('should return null when no reviews exist', async () => {
    mockAggregate.mockResolvedValue({
      _avg: { rating: null },
      _count: { rating: 0 },
    } as never)

    const result = await fetchAggregateRating('cuisine')
    expect(result).toBeNull()
  })

  it('should return null when the DB query fails', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined)
    mockAggregate.mockRejectedValue(new Error('DB connection error'))

    const result = await fetchAggregateRating('cuisine')
    expect(result).toBeNull()
    expect(consoleErrorSpy).toHaveBeenCalled()

    consoleErrorSpy.mockRestore()
  })
})
