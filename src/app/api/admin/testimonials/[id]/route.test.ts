import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'

// Mock next-auth
vi.mock('next-auth', () => ({
  getServerSession: vi.fn(),
}))

// Mock auth options
vi.mock('@/lib/auth', () => ({
  authOptions: {},
}))

// Mock prisma
const mockUpdate = vi.fn()
const mockFindUnique = vi.fn()

vi.mock('@/lib/db', () => ({
  prisma: {
    testimonial: {
      findUnique: (...args: unknown[]) => mockFindUnique(...args),
      update: (...args: unknown[]) => mockUpdate(...args),
    },
  },
}))

import { getServerSession } from 'next-auth'
const mockGetServerSession = vi.mocked(getServerSession)

// Import the PATCH handler
import { PATCH } from './route'

function createRequest(body: object): NextRequest {
  return new NextRequest('http://localhost/api/admin/testimonials/test-id', {
    method: 'PATCH',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
}

const mockParams = Promise.resolve({ id: 'test-id' })

describe('PATCH /api/admin/testimonials/[id]', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Default: authenticated admin
    mockGetServerSession.mockResolvedValue({
      user: { email: 'admin@test.com', role: 'admin' },
      expires: '',
    })
    // Default: testimonial exists
    mockFindUnique.mockResolvedValue({ id: 'test-id', status: 'PENDING' })
    // Default: update succeeds
    mockUpdate.mockResolvedValue({ id: 'test-id', status: 'APPROVED', approvedAt: new Date() })
  })

  it('should set approvedAt to current date when status changes to APPROVED', async () => {
    const now = new Date()
    vi.setSystemTime(now)

    const request = createRequest({ status: 'APPROVED' })
    await PATCH(request, { params: mockParams })

    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id: 'test-id' },
      data: {
        status: 'APPROVED',
        approvedAt: expect.any(Date),
      },
    })

    const callArgs = mockUpdate.mock.calls[0][0]
    expect(callArgs.data.approvedAt).toBeInstanceOf(Date)

    vi.useRealTimers()
  })

  it('should set approvedAt to null when status changes to REJECTED', async () => {
    const request = createRequest({ status: 'REJECTED' })
    mockUpdate.mockResolvedValue({ id: 'test-id', status: 'REJECTED', approvedAt: null })

    await PATCH(request, { params: mockParams })

    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id: 'test-id' },
      data: {
        status: 'REJECTED',
        approvedAt: null,
      },
    })
  })

  it('should set approvedAt to null when status changes to PENDING', async () => {
    const request = createRequest({ status: 'PENDING' })
    mockUpdate.mockResolvedValue({ id: 'test-id', status: 'PENDING', approvedAt: null })

    await PATCH(request, { params: mockParams })

    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id: 'test-id' },
      data: {
        status: 'PENDING',
        approvedAt: null,
      },
    })
  })
})
