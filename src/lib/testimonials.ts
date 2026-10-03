import type { TestimonialPublic } from '@/lib/validations/testimonial'

/**
 * Clamp an arbitrary (possibly null) rating value into the valid 1..5 star range.
 * Null defaults to 5. Values are rounded to the nearest integer first.
 */
export function clampRating(n: number | null): 1 | 2 | 3 | 4 | 5 {
  return Math.min(5, Math.max(1, Math.round(n ?? 5))) as 1 | 2 | 3 | 4 | 5
}

export interface TestimonialAggregate {
  averageRating: number | null
  totalReviews: number
}

export interface TestimonialsGroup {
  testimonials: TestimonialPublic[]
  aggregate: TestimonialAggregate
}

/**
 * Pure helper: merge per-service API responses into a single group.
 * - Skips null responses (failed fetches are tolerated)
 * - Sorts merged testimonials by createdAt descending (newest first)
 * - Caps the displayed testimonials at `maxItems`
 * - Computes a weighted average rating across all responses
 *   (aggregate counts reflect ALL approved reviews, not only displayed ones)
 */
export function combineTestimonialResponses(
  responses: Array<TestimonialsGroup | null>,
  maxItems = 6
): TestimonialsGroup {
  const merged: TestimonialPublic[] = []
  let weightedRatingSum = 0
  let totalCount = 0

  for (const response of responses) {
    if (!response) continue
    merged.push(...response.testimonials)
    if (response.aggregate) {
      totalCount += response.aggregate.totalReviews
      if (response.aggregate.averageRating !== null) {
        weightedRatingSum += response.aggregate.averageRating * response.aggregate.totalReviews
      }
    }
  }

  merged.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return {
    testimonials: merged.slice(0, maxItems),
    aggregate: {
      averageRating: totalCount > 0 ? Math.round((weightedRatingSum / totalCount) * 10) / 10 : null,
      totalReviews: totalCount,
    },
  }
}
