import { describe, it, expect } from 'vitest'
import { GET } from './route'
import { NextRequest } from 'next/server'

describe('GET /api/og', () => {
  it('should return 200 with image content-type for valid page', async () => {
    const request = new NextRequest('http://localhost/api/og?page=home')
    const response = await GET(request)

    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toContain('image/png')
  })

  it('should return cache headers', async () => {
    const request = new NextRequest('http://localhost/api/og?page=cuisine')
    const response = await GET(request)

    expect(response.headers.get('cache-control')).toContain('public')
  })

  it('should return 400 for missing page param', async () => {
    const request = new NextRequest('http://localhost/api/og')
    const response = await GET(request)

    expect(response.status).toBe(400)
  })

  it('should return 400 for invalid page param', async () => {
    const request = new NextRequest('http://localhost/api/og?page=nonexistent')
    const response = await GET(request)

    expect(response.status).toBe(400)
  })
})
