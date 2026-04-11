'use client'

import { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { cn } from '@/lib/utils'
import { TestimonialCard } from '@/components/ui/TestimonialCard'
import { LeaveReviewButton } from '@/components/ui/LeaveReviewButton'
import { StarRatingDisplay } from '@/components/ui/StarRating'
import { CUISINE_SERVICES, ACCOMMODATION_SERVICES, type ServiceType } from '@/lib/validations/testimonial'

export type Category = 'cuisine' | 'accommodation'

export const CATEGORY_SERVICE_MAP: Record<Category, ServiceType[]> = {
  cuisine: CUISINE_SERVICES,
  accommodation: ACCOMMODATION_SERVICES,
}

const CATEGORY_DEFAULT_SERVICE: Record<Category, ServiceType> = {
  cuisine: 'PRIVATE_CHEF',
  accommodation: 'ACCOMMODATION',
}

interface TestimonialData {
  id: string
  name: string
  location: string | null
  service: ServiceType
  rating: number
  text: string
  createdAt: string
}

interface TestimonialsCarouselProps {
  category: Category
  title?: string
  subtitle?: string
  className?: string
}

export function TestimonialsCarousel({
  category,
  title = 'What Our Guests Say',
  subtitle = 'Real Experiences',
  className,
}: TestimonialsCarouselProps) {
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([])
  const [aggregate, setAggregate] = useState<{ averageRating: number | null; totalReviews: number } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
    loop: false,
  })

  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const services = CATEGORY_SERVICE_MAP[category]
        const results: TestimonialData[] = []
        let totalRating = 0
        let totalCount = 0

        const responses = await Promise.all(
          services.map(async (service) => {
            try {
              const response = await fetch(`/api/testimonials?service=${service}&limit=20`)
              if (response.ok) return response.json()
            } catch {
              // Skip failed individual fetch
            }
            return null
          })
        )

        for (const data of responses) {
          if (!data) continue
          results.push(...data.testimonials)
          if (data.aggregate) {
            totalCount += data.aggregate.totalReviews
            if (data.aggregate.averageRating !== null) {
              totalRating += data.aggregate.averageRating * data.aggregate.totalReviews
            }
          }
        }

        results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        setTestimonials(results)
        setAggregate({
          averageRating: totalCount > 0 ? Math.round((totalRating / totalCount) * 10) / 10 : null,
          totalReviews: totalCount,
        })
      } catch {
        // Silently fail — empty state will show
      } finally {
        setIsLoading(false)
      }
    }

    fetchTestimonials()
  }, [category])

  if (isLoading) {
    return (
      <section className={cn('section-padding bg-cream/50', className)}>
        <div className="container-standard">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal mx-auto" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={cn('section-padding bg-cream/50', className)}>
      <div className="container-standard">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <p className="font-script text-2xl md:text-3xl text-coral mb-2">{subtitle}</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-ocean-dark mb-4">
            {title}
          </h2>

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
        </div>

        {/* Carousel */}
        {testimonials.length > 0 ? (
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex -ml-4">
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4 min-w-0"
                  >
                    <TestimonialCard
                      name={testimonial.name}
                      location={testimonial.location}
                      service={testimonial.service as ServiceType}
                      rating={testimonial.rating as 1 | 2 | 3 | 4 | 5}
                      text={testimonial.text}
                      createdAt={testimonial.createdAt}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows — show when more cards than smallest viewport (1 on mobile) */}
            {testimonials.length > 1 && (
              <>
                <button
                  onClick={() => emblaApi?.scrollPrev()}
                  disabled={!canScrollPrev}
                  className={cn(
                    'absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center transition-all z-10',
                    canScrollPrev ? 'opacity-100 hover:shadow-xl' : 'opacity-30 cursor-default'
                  )}
                  aria-label="Previous testimonials"
                >
                  <svg className="w-5 h-5 text-ocean-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => emblaApi?.scrollNext()}
                  disabled={!canScrollNext}
                  className={cn(
                    'absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center transition-all z-10',
                    canScrollNext ? 'opacity-100 hover:shadow-xl' : 'opacity-30 cursor-default'
                  )}
                  aria-label="Next testimonials"
                >
                  <svg className="w-5 h-5 text-ocean-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-light/50 p-8 md:p-12 text-center">
            <h3 className="font-heading text-xl font-semibold text-charcoal mb-2">
              No Reviews Yet
            </h3>
            <p className="font-body text-gray-warm mb-6 max-w-md mx-auto">
              Be the first to share your experience!
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-8">
          <LeaveReviewButton
            variant="primary"
            size="lg"
            defaultService={CATEGORY_DEFAULT_SERVICE[category]}
          >
            Leave a Review
          </LeaveReviewButton>
        </div>
      </div>
    </section>
  )
}
