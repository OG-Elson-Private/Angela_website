import { CUISINE_SERVICES, ACCOMMODATION_SERVICES, type ServiceType } from '@/lib/validations/testimonial'

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
 * Fetch aggregate rating for a category from the public API.
 * Returns structured data object or null if no reviews.
 */
export async function fetchAggregateRating(
  category: Category
): Promise<AggregateRatingSchema | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const services = CATEGORY_SERVICES[category]

    let totalRating = 0
    let totalCount = 0

    const responses = await Promise.all(
      services.map(async (service) => {
        try {
          const res = await fetch(`${baseUrl}/api/testimonials?service=${service}&limit=1`, {
            next: { revalidate: 300 },
          })
          if (res.ok) return res.json()
        } catch {
          // Skip
        }
        return null
      })
    )

    for (const data of responses) {
      if (!data?.aggregate) continue
      totalCount += data.aggregate.totalReviews
      if (data.aggregate.averageRating !== null) {
        totalRating += data.aggregate.averageRating * data.aggregate.totalReviews
      }
    }

    if (totalCount === 0) return null

    const avgRating = Math.round((totalRating / totalCount) * 10) / 10

    return {
      '@type': 'AggregateRating',
      ratingValue: String(avgRating),
      reviewCount: String(totalCount),
      bestRating: '5',
      worstRating: '1',
    }
  } catch {
    return null
  }
}
