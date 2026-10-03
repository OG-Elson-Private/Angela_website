import Link from 'next/link'
import type { Prisma } from '@prisma/client'
import { prisma } from '@/lib/db'
import { TestimonialCard } from '@/components/ui/TestimonialCard'
import { CategoryReviewsCarousel } from '@/components/sections/CategoryReviewsCarousel'
import { LeaveReviewButton } from '@/components/ui/LeaveReviewButton'
import { StarRatingDisplay } from '@/components/ui/StarRating'
import {
  CUISINE_SERVICES,
  ACCOMMODATION_SERVICES,
  type ServiceType,
  type TestimonialPublic,
} from '@/lib/validations/testimonial'
import {
  clampRating,
  combineTestimonialResponses,
  type TestimonialAggregate,
  type TestimonialsGroup,
} from '@/lib/testimonials'

/**
 * Load approved testimonials for a group of services (e.g. cuisine or accommodation)
 * directly from the database (Server Component — no HTTP self-fetch).
 * On any DB error, degrades gracefully to an empty group.
 */
async function getTestimonialsByGroup(services: ServiceType[]): Promise<TestimonialsGroup> {
  const where: Prisma.TestimonialWhereInput = {
    status: 'APPROVED' as const,
    service: { in: services },
  }

  try {
    const [testimonials, aggregate] = await Promise.all([
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
        orderBy: [{ approvedAt: 'desc' }, { createdAt: 'desc' }],
        take: 6,
      }),
      prisma.testimonial.aggregate({
        where,
        _avg: { rating: true },
        _count: { rating: true },
      }),
    ])

    return {
      testimonials,
      aggregate: {
        averageRating: aggregate._avg.rating,
        totalReviews: aggregate._count.rating,
      },
    }
  } catch (error) {
    console.error('[Testimonials] DB query failed:', error)
    return { testimonials: [], aggregate: { averageRating: null, totalReviews: 0 } }
  }
}

interface AggregateRatingProps {
  aggregate: TestimonialAggregate
}

/**
 * Star rating + numeric summary, shared by the global header and category blocks
 */
function AggregateRating({ aggregate }: AggregateRatingProps) {
  if (aggregate.averageRating === null || aggregate.totalReviews === 0) return null

  return (
    <div className="flex items-center justify-center gap-3">
      <StarRatingDisplay rating={clampRating(aggregate.averageRating)} size="md" />
      <span className="font-body text-charcoal">
        {aggregate.averageRating.toFixed(1)} ({aggregate.totalReviews} review
        {aggregate.totalReviews !== 1 ? 's' : ''})
      </span>
    </div>
  )
}

interface CategoryBlockProps {
  title: string
  testimonials: TestimonialPublic[]
  aggregate: TestimonialAggregate
}

/**
 * One labeled category of reviews (title, per-category rating,
 * swipeable carousel on mobile / grid on md+).
 * Never renders when the category has no approved reviews.
 */
function CategoryBlock({ title, testimonials, aggregate }: CategoryBlockProps) {
  if (testimonials.length === 0) return null

  const headingId = `reviews-${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')}`

  return (
    <section aria-labelledby={headingId} className="mb-10">
      <div className="text-center mb-6">
        <h3
          id={headingId}
          className="font-heading text-2xl md:text-3xl font-semibold text-ocean-dark mb-2"
        >
          {title}
        </h3>
        <AggregateRating aggregate={aggregate} />
      </div>

      {/* Mobile: swipeable carousel */}
      <div className="md:hidden">
        <CategoryReviewsCarousel testimonials={testimonials} />
      </div>

      {/* Desktop/tablet: grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            name={testimonial.name}
            location={testimonial.location}
            service={testimonial.service}
            rating={clampRating(testimonial.rating)}
            text={testimonial.text}
            createdAt={testimonial.createdAt}
          />
        ))}
      </div>
    </section>
  )
}

interface TestimonialsSectionProps {
  showAllLink?: boolean
}

/**
 * Testimonials Section for Homepage
 * - Displays approved testimonials grouped by category:
 *   "Cooking & Catering" (cuisine services) and "Your Stay" (accommodation)
 * - A category is only rendered when it has at least one approved review
 * - Shows a global aggregate rating across both categories
 * - Button to leave a new review (opens modal)
 * - Link to full testimonials page
 */
export async function Testimonials({ showAllLink = true }: TestimonialsSectionProps) {
  const [cuisine, accommodation] = await Promise.all([
    getTestimonialsByGroup(CUISINE_SERVICES),
    getTestimonialsByGroup(ACCOMMODATION_SERVICES),
  ])

  const globalAggregate = combineTestimonialResponses([cuisine, accommodation]).aggregate
  const hasReviews = cuisine.testimonials.length + accommodation.testimonials.length > 0

  return (
    <section className="section-padding bg-cream/50">
      <div className="container-standard">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <p className="font-script text-2xl md:text-3xl text-coral mb-2">
            Real Experiences
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-ocean-dark mb-4">
            What Our Guests Say
          </h2>

          {/* Global Aggregate Rating (never shown above the empty state) */}
          {hasReviews && (
            <div className="mb-4">
              <AggregateRating aggregate={globalAggregate} />
            </div>
          )}

          <p className="font-body text-lg text-gray-warm max-w-2xl mx-auto">
            {hasReviews
              ? 'Discover what our guests are saying about their experiences with Chef Angie.'
              : 'Be the first to share your experience with Chef Angie!'}
          </p>
        </div>

        {/* Category Blocks (each self-hides when empty) */}
        <CategoryBlock
          title="Cooking & Catering"
          testimonials={cuisine.testimonials}
          aggregate={cuisine.aggregate}
        />
        <CategoryBlock
          title="Your Stay"
          testimonials={accommodation.testimonials}
          aggregate={accommodation.aggregate}
        />

        {/* Empty State */}
        {!hasReviews && (
          <div className="bg-white rounded-2xl border border-gray-light/50 p-8 md:p-12 text-center mb-10">
            <div className="w-16 h-16 mx-auto mb-4 bg-seafoam/50 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-teal"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h3 className="font-heading text-xl font-semibold text-charcoal mb-2">
              No Reviews Yet
            </h3>
            <p className="font-body text-gray-warm mb-6 max-w-md mx-auto">
              Be among the first to share your experience and help others discover
              Chef Angie&apos;s amazing services.
            </p>
          </div>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <LeaveReviewButton variant="primary" size="lg">
            Leave a Review
          </LeaveReviewButton>

          {showAllLink && hasReviews && (
            <Link
              href="/testimonials"
              className="font-ui font-medium text-teal hover:text-teal-dark underline underline-offset-4 transition-colors"
            >
              View All Reviews
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
