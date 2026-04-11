import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock global fetch
const mockFetch = vi.fn()
vi.stubGlobal('fetch', mockFetch)

import { fetchAggregateRating } from './schema-helpers'

describe('fetchAggregateRating', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.NEXT_PUBLIC_BASE_URL = 'http://localhost:3000'
  })

  it('should return aggregate for cuisine category (sums across 4 services)', async () => {
    // Each of the 4 cuisine services returns 5 reviews at 4.8 avg
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        aggregate: { averageRating: 4.8, totalReviews: 5 },
      }),
    })

    const result = await fetchAggregateRating('cuisine')

    // 4 services * 5 reviews = 20 total, weighted avg stays 4.8
    expect(result).toEqual({
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '20',
      bestRating: '5',
      worstRating: '1',
    })
    expect(mockFetch).toHaveBeenCalledTimes(4) // 4 cuisine services
  })

  it('should return null when no reviews exist', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        aggregate: { averageRating: null, totalReviews: 0 },
      }),
    })

    const result = await fetchAggregateRating('cuisine')
    expect(result).toBeNull()
  })

  it('should return null when fetch fails', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'))

    const result = await fetchAggregateRating('cuisine')
    expect(result).toBeNull()
  })
})
