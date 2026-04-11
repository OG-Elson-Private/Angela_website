import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { CUISINE_SERVICES } from '@/lib/validations/testimonial'
import type { Prisma } from '@prisma/client'

/**
 * GET /api/admin/testimonials
 * Fetch all testimonials for admin moderation
 * Protected route - requires authentication
 */
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)

    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Parse query parameters
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const category = searchParams.get('category')
    const limit = parseInt(searchParams.get('limit') || '50', 10)
    const offset = parseInt(searchParams.get('offset') || '0', 10)

    // Build where clause
    const where: Prisma.TestimonialWhereInput = {}
    if (status && ['PENDING', 'APPROVED', 'REJECTED'].includes(status)) {
      where.status = status as 'PENDING' | 'APPROVED' | 'REJECTED'
    }
    if (category === 'cuisine') {
      where.service = { in: [...CUISINE_SERVICES] }
    } else if (category === 'accommodation') {
      where.service = 'ACCOMMODATION'
    }

    // Fetch testimonials with count
    const [testimonials, total] = await Promise.all([
      prisma.testimonial.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      prisma.testimonial.count({ where }),
    ])

    // Get counts by status (respecting category filter)
    const categoryWhere: Prisma.TestimonialWhereInput = {}
    if (category === 'cuisine') {
      categoryWhere.service = { in: [...CUISINE_SERVICES] }
    } else if (category === 'accommodation') {
      categoryWhere.service = 'ACCOMMODATION'
    }
    const counts = await prisma.testimonial.groupBy({
      by: ['status'],
      where: categoryWhere,
      _count: { status: true },
    })

    const statusCounts = {
      PENDING: 0,
      APPROVED: 0,
      REJECTED: 0,
    }

    counts.forEach((item) => {
      statusCounts[item.status] = item._count.status
    })

    return NextResponse.json({
      testimonials,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + testimonials.length < total,
      },
      counts: statusCounts,
    })
  } catch (error) {
    console.error('Admin testimonials fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    )
  }
}
