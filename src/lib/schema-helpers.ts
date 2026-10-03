import { CUISINE_SERVICES, ACCOMMODATION_SERVICES, type ServiceType } from '@/lib/validations/testimonial'
import { prisma } from '@/lib/db'
import type { Prisma } from '@prisma/client'

type Category = 'cuisine' | 'accommodation'

const CATEGORY_SERVICES: Record<Category, ServiceType[]> = {
  cuisine: CUISINE_SERVICES,
  accommodation: ACCOMMODATION_SERVICES,
}

interface AggregateRatingSchema {
  '@type': 'AggregateRating'
  ratingValue: string
  reviewCount: string
  bestRating: string
  worstRating: string
}

/**
 * Fetch aggregate rating for a category directly from the database.
 * Returns structured data object or null if no reviews.
 */
export async function fetchAggregateRating(
  category: Category
): Promise<AggregateRatingSchema | null> {
  try {
    const services = CATEGORY_SERVICES[category]

    const where: Prisma.TestimonialWhereInput = {
      status: 'APPROVED' as const,
      service: { in: services },
    }

    const agg = await prisma.testimonial.aggregate({
      where,
      _avg: { rating: true },
      _count: { rating: true },
    })

    const totalCount = agg._count.rating
    if (totalCount === 0 || agg._avg.rating === null) return null

    const avgRating = Math.round(agg._avg.rating * 10) / 10

    return {
      '@type': 'AggregateRating',
      ratingValue: String(avgRating),
      reviewCount: String(totalCount),
      bestRating: '5',
      worstRating: '1',
    }
  } catch (error) {
    console.error('[schema-helpers] aggregateRating DB query failed:', error)
    return null
  }
}
