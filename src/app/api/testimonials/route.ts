import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { testimonialSchema, type TestimonialPublic } from '@/lib/validations/testimonial'
import { checkRateLimit, getClientIP, formatResetTime } from '@/lib/rate-limit'
import { ZodError } from 'zod'
import type { Prisma } from '@prisma/client'

/**
 * POST /api/testimonials
 * Submit a new testimonial for review
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const clientIP = getClientIP(request)
    const rateLimit = checkRateLimit(clientIP)

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error: 'Too many submissions',
          message: `You have reached the submission limit. Please try again in ${formatResetTime(rateLimit.resetIn)}.`,
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(Math.ceil(rateLimit.resetIn / 1000)),
          },
        }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validatedData = testimonialSchema.parse(body)

    // Check honeypot field (should be empty)
    if (validatedData.website && validatedData.website.length > 0) {
      // Silently reject spam without giving feedback
      return NextResponse.json(
        { success: true, message: 'Thank you for your review!' },
        { status: 200 }
      )
    }

    // Create testimonial in database
    const testimonial = await prisma.testimonial.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        location: validatedData.location || null,
        service: validatedData.service,
        rating: validatedData.rating,
        text: validatedData.text,
        status: 'PENDING',
      },
    })

    // TODO: Send email notification to admin (E12-S11)

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your review! It will be published after moderation.',
        id: testimonial.id,
      },
      {
        status: 201,
        headers: {
          'X-RateLimit-Remaining': String(rateLimit.remaining),
        },
      }
    )
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof ZodError) {
      const firstError = error.errors[0]
      return NextResponse.json(
        {
          error: 'Validation failed',
          message: firstError.message,
          field: firstError.path.join('.'),
        },
        { status: 400 }
      )
    }

    // Log unexpected errors
    console.error('Error creating testimonial:', error)

    return NextResponse.json(
      {
        error: 'Server error',
        message: 'An unexpected error occurred. Please try again later.',
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/testimonials
 * Fetch approved testimonials for public display
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Optional query parameters
    const service = searchParams.get('service')
    const limit = parseInt(searchParams.get('limit') || '10', 10)
    const offset = parseInt(searchParams.get('offset') || '0', 10)

    // Build where clause
    const where: Prisma.TestimonialWhereInput = {
      status: 'APPROVED',
    }

    // Filter by service if provided and valid
    const validServices = ['BIRYANI_FRIDAY', 'PILAU_TUESDAY', 'PRIVATE_CHEF', 'CATERING', 'ACCOMMODATION'] as const
    if (service && validServices.includes(service as typeof validServices[number])) {
      where.service = service as typeof validServices[number]
    }

    // Fetch testimonials with pagination
    const [testimonials, total] = await Promise.all([
      prisma.testimonial.findMany({
        where,
        select: {
          id: true,
          name: true,
          location: true,
          service: true,
          rating: true,
          text: true,
          createdAt: true,
        },
        orderBy: [
          { approvedAt: 'desc' },
          { createdAt: 'desc' },
        ],
        take: Math.min(limit, 50), // Max 50 per request
        skip: offset,
      }),
      prisma.testimonial.count({ where }),
    ])

    // Calculate aggregate rating
    const aggregateResult = await prisma.testimonial.aggregate({
      where: { status: 'APPROVED' },
      _avg: {
        rating: true,
      },
      _count: {
        rating: true,
      },
    })

    // Transform to public schema (ensures no sensitive data leaks)
    const publicTestimonials: TestimonialPublic[] = testimonials.map((t) => ({
      id: t.id,
      name: t.name,
      location: t.location,
      service: t.service,
      rating: t.rating,
      text: t.text,
      createdAt: t.createdAt,
    }))

    return NextResponse.json(
      {
        testimonials: publicTestimonials,
        pagination: {
          total,
          limit,
          offset,
          hasMore: offset + testimonials.length < total,
        },
        aggregate: {
          averageRating: aggregateResult._avg.rating ? Math.round(aggregateResult._avg.rating * 10) / 10 : null,
          totalReviews: aggregateResult._count.rating,
        },
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      }
    )
  } catch (error) {
    console.error('Error fetching testimonials:', error)

    return NextResponse.json(
      {
        error: 'Server error',
        message: 'Failed to fetch testimonials.',
      },
      { status: 500 }
    )
  }
}
