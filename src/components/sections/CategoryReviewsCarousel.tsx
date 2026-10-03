'use client'

import { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { cn } from '@/lib/utils'
import { TestimonialCard } from '@/components/ui/TestimonialCard'
import type { TestimonialPublic } from '@/lib/validations/testimonial'
import { clampRating } from '@/lib/testimonials'

interface CategoryReviewsCarouselProps {
  testimonials: TestimonialPublic[]
}

/**
 * Mobile carousel for one category of reviews (Client Component).
 * - Renders the testimonials it is given (no data fetching)
 * - One card per view with a peek of the next slide
 * - Dot indicators to jump to a specific review
 * - With 0 or 1 review, renders plainly without carousel chrome
 */
export function CategoryReviewsCarousel({ testimonials }: CategoryReviewsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    loop: false,
  })

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    const onInit = () => {
      setScrollSnaps(emblaApi.scrollSnapList())
      onSelect()
    }

    onInit()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onInit)

    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onInit)
    }
  }, [emblaApi, onSelect])

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  )

  if (testimonials.length === 0) return null

  // Single review: plain card, no carousel chrome
  if (testimonials.length === 1) {
    const testimonial = testimonials[0]
    return (
      <TestimonialCard
        name={testimonial.name}
        location={testimonial.location}
        service={testimonial.service}
        rating={clampRating(testimonial.rating)}
        text={testimonial.text}
        createdAt={testimonial.createdAt}
      />
    )
  }

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Customer reviews">
      {/* Viewport — slides scroll inside, never the page */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="flex-[0_0_85%] min-w-0 pl-4">
              <TestimonialCard
                name={testimonial.name}
                location={testimonial.location}
                service={testimonial.service}
                rating={clampRating(testimonial.rating)}
                text={testimonial.text}
                createdAt={testimonial.createdAt}
                className="h-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dots indicator */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => scrollTo(index)}
            aria-label={`Go to review ${index + 1}`}
            aria-current={index === selectedIndex ? 'true' : undefined}
            className={cn(
              'w-2.5 h-2.5 rounded-full transition-colors duration-300',
              index === selectedIndex ? 'bg-coral' : 'bg-gray-light'
            )}
          />
        ))}
      </div>
    </div>
  )
}

export default CategoryReviewsCarousel
