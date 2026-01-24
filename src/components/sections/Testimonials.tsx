import Link from 'next/link'
import { TestimonialCard } from '@/components/ui/TestimonialCard'
import { LeaveReviewButton } from '@/components/ui/LeaveReviewButton'
import { StarRatingDisplay } from '@/components/ui/StarRating'
import type { TestimonialPublic } from '@/lib/validations/testimonial'

interface TestimonialsResponse {
  testimonials: TestimonialPublic[]
  aggregate: {
    averageRating: number | null
    totalReviews: number
  }
}

/**
 * Fetch approved testimonials from API
 * Runs on the server (Server Component)
 */
async function getTestimonials(): Promise<TestimonialsResponse | null> {
  try {
    // Use absolute URL for server-side fetch during build
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/testimonials?limit=6`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    })

    if (!response.ok) {
      return null
    }

    return response.json()
  } catch {
    // Return null if API is unavailable (e.g., during build)
    return null
  }
}

interface TestimonialsSectionProps {
  showAllLink?: boolean
}

/**
 * Testimonials Section for Homepage
 * - Displays approved testimonials in a grid
 * - Shows aggregate rating
 * - Button to leave a new review (opens modal)
 * - Link to full testimonials page
 */
export async function Testimonials({ showAllLink = true }: TestimonialsSectionProps) {
  const data = await getTestimonials()
  const testimonials = data?.testimonials || []
  const aggregate = data?.aggregate

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

          {/* Aggregate Rating */}
          {aggregate && aggregate.totalReviews > 0 && (
            <div className="flex items-center justify-center gap-3 mb-4">
              <StarRatingDisplay
                rating={Math.round(aggregate.averageRating || 5) as 1 | 2 | 3 | 4 | 5}
                size="md"
              />
              <span className="font-body text-charcoal">
                {aggregate.averageRating?.toFixed(1)} ({aggregate.totalReviews} review
                {aggregate.totalReviews !== 1 ? 's' : ''})
              </span>
            </div>
          )}

          <p className="font-body text-lg text-gray-warm max-w-2xl mx-auto">
            {testimonials.length > 0
              ? 'Discover what our guests are saying about their experiences with Chef Angie.'
              : 'Be the first to share your experience with Chef Angie!'}
          </p>
        </div>

        {/* Testimonials Grid */}
        {testimonials.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                name={testimonial.name}
                location={testimonial.location}
                service={testimonial.service}
                rating={testimonial.rating as 1 | 2 | 3 | 4 | 5}
                text={testimonial.text}
                createdAt={testimonial.createdAt}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {testimonials.length === 0 && (
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

          {showAllLink && testimonials.length > 0 && (
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
