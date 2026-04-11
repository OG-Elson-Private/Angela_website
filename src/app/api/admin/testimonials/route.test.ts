import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'

// Mock next-auth
vi.mock('next-auth', () => ({
  getServerSession: vi.fn(),
}))

vi.mock('@/lib/auth', () => ({
  authOptions: {},
}))

// Mock prisma
const mockFindMany = vi.fn()
const mockCount = vi.fn()
const mockGroupBy = vi.fn()

vi.mock('@/lib/db', () => ({
  prisma: {
    testimonial: {
      findMany: (...args: unknown[]) => mockFindMany(...args),
      count: (...args: unknown[]) => mockCount(...args),
      groupBy: (...args: unknown[]) => mockGroupBy(...args),
    },
  },
}))

import { getServerSession } from 'next-auth'
const mockGetServerSession = vi.mocked(getServerSession)

import { GET } from './route'

describe('GET /api/admin/testimonials', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockGetServerSession.mockResolvedValue({
      user: { email: 'admin@test.com', role: 'admin' },
      expires: '',
    })
    mockFindMany.mockResolvedValue([])
    mockCount.mockResolvedValue(0)
    mockGroupBy.mockResolvedValue([])
  })

  it('should filter by cuisine services when category=cuisine', async () => {
    const request = new NextRequest('http://localhost/api/admin/testimonials?category=cuisine')
    await GET(request)

    const where = mockFindMany.mock.calls[0][0].where
    expect(where.service).toEqual({
      in: ['PRIVATE_CHEF', 'CATERING', 'BIRYANI_FRIDAY', 'PILAU_TUESDAY'],
    })
  })

  it('should filter by ACCOMMODATION when category=accommodation', async () => {
    const request = new NextRequest('http://localhost/api/admin/testimonials?category=accommodation')
    await GET(request)

    const where = mockFindMany.mock.calls[0][0].where
    expect(where.service).toBe('ACCOMMODATION')
  })

  it('should not filter by service when no category param', async () => {
    const request = new NextRequest('http://localhost/api/admin/testimonials')
    await GET(request)

    const where = mockFindMany.mock.calls[0][0].where
    expect(where.service).toBeUndefined()
  })

  it('should combine category and status filters', async () => {
    const request = new NextRequest('http://localhost/api/admin/testimonials?category=cuisine&status=PENDING')
    await GET(request)

    const where = mockFindMany.mock.calls[0][0].where
    expect(where.service).toEqual({
      in: ['PRIVATE_CHEF', 'CATERING', 'BIRYANI_FRIDAY', 'PILAU_TUESDAY'],
    })
    expect(where.status).toBe('PENDING')
  })

  it('should apply category filter to status counts (groupBy)', async () => {
    const request = new NextRequest('http://localhost/api/admin/testimonials?category=accommodation')
    await GET(request)

    const groupByArgs = mockGroupBy.mock.calls[0][0]
    expect(groupByArgs.where).toEqual({ service: 'ACCOMMODATION' })
  })
})
