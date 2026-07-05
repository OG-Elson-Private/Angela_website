import type { Metadata } from 'next'
import { TestimonialCard } from '@/components/ui/TestimonialCard'
import { LeaveReviewButton } from '@/components/ui/LeaveReviewButton'
import { StarRatingDisplay } from '@/components/ui/StarRating'
import type { TestimonialPublic } from '@/lib/validations/testimonial'

export const metadata: Metadata = {
  alternates: {
    canonical: '/testimonials',
  },
  title: 'Customer Reviews | Chef Angela - Diani Beach',
  description:
    'Read authentic reviews from our guests. Discover what customers say about Chef Angela\'s Kenyan cuisine, private chef services, and vacation rental in Diani Beach.',
  keywords: [
    'chef angela reviews',
    'diani beach chef reviews',
    'biryani friday reviews',
    'pilau tuesday reviews',
    'diani vacation rental reviews',
    'kenyan cuisine reviews',
  ],
  openGraph: {
    title: 'Customer Reviews | Chef Angela',
    description:
      'Authentic reviews from guests who experienced Chef Angela\'s cuisine and accommodation in Diani Beach.',
    type: 'website',
    images: [{ url: '/api/og?page=testimonials', width: 1200, height: 630 }],
  },
}

interface TestimonialsResponse {
  testimonials: TestimonialPublic[]
  pagination: {
    total: number
    limit: number
    offset: number
    hasMore: boolean
  }
  aggregate: {
    averageRating: number | null
    totalReviews: number
  }
}

/**
 * Fetch all approved testimonials
 */
async function getAllTestimonials(): Promise<TestimonialsResponse | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/testimonials?limit=50`, {
      next: { revalidate: 60 },
    })

    if (!response.ok) {
      return null
    }

    return response.json()
  } catch {
    return null
  }
}

// JSON-LD structured data for SEO
function generateJsonLd(aggregate: { averageRating: number | null; totalReviews: number } | undefined) {
  if (!aggregate || aggregate.totalReviews === 0) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.chefangela.co.ke',
    name: 'Chef Angela',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: aggregate.averageRating?.toFixed(1) || '5.0',
      reviewCount: aggregate.totalReviews,
      bestRating: '5',
      worstRating: '1',
    },
  }
}

export default async function TestimonialsPage() {
  const data = await getAllTestimonials()
  const testimonials = data?.testimonials || []
  const aggregate = data?.aggregate
  const jsonLd = generateJsonLd(aggregate)

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <main className="min-h-screen bg-cream/30">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-b from-seafoam/30 to-cream/50">
          <div className="container-standard text-center">
            <p className="font-script text-2xl md:text-3xl text-coral mb-2">
              Real Stories
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-ocean-dark mb-6">
              Customer Reviews
            </h1>

            {/* Aggregate Rating */}
            {aggregate && aggregate.totalReviews > 0 && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
                <StarRatingDisplay
                  rating={Math.round(aggregate.averageRating || 5) as 1 | 2 | 3 | 4 | 5}
                  size="lg"
                />
                <div className="font-body text-charcoal text-lg">
                  <span className="font-semibold">
                    {aggregate.averageRating?.toFixed(1)}
                  </span>{' '}
                  out of 5 based on{' '}
                  <span className="font-semibold">{aggregate.totalReviews}</span>{' '}
                  review{aggregate.totalReviews !== 1 ? 's' : ''}
                </div>
              </div>
            )}

            <p className="font-body text-lg text-gray-warm max-w-2xl mx-auto mb-8">
              Discover what our guests are saying about their experiences with
              Chef Angela&apos;s culinary services and accommodation in Diani Beach.
            </p>

            <LeaveReviewButton variant="primary" size="lg">
              Share Your Experience
            </LeaveReviewButton>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="section-padding">
          <div className="container-standard">
            {testimonials.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            ) : (
              /* Empty State */
              <div className="max-w-md mx-auto bg-white rounded-2xl border border-gray-light/50 p-8 md:p-12 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-seafoam/50 rounded-full flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-teal"
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
                <h2 className="font-heading text-2xl font-semibold text-charcoal mb-3">
                  Be the First to Review!
                </h2>
                <p className="font-body text-gray-warm mb-8">
                  We&apos;d love to hear about your experience with Chef Angela.
                  Your feedback helps others discover our services.
                </p>
                <LeaveReviewButton variant="primary" size="lg">
                  Write a Review
                </LeaveReviewButton>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        {testimonials.length > 0 && (
          <section className="section-padding bg-white">
            <div className="container-standard text-center">
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-ocean-dark mb-4">
                Had an Experience with Chef Angela?
              </h2>
              <p className="font-body text-gray-warm mb-6 max-w-lg mx-auto">
                Your review helps other guests discover authentic Kenyan cuisine
                and hospitality in Diani Beach.
              </p>
              <LeaveReviewButton variant="outline" size="lg">
                Share Your Story
              </LeaveReviewButton>
            </div>
          </section>
        )}
      </main>
    </>
  )
}
