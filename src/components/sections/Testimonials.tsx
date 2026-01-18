'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui'
import { StarRatingDisplay } from '@/components/ui'
import type { Testimonial } from '@/types'

// Mock testimonials data - in production, this would come from an API or CMS
const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    location: 'London, UK',
    rating: 5,
    text: "The Biryani Friday was absolutely incredible! The flavors were authentic and the portions were generous. Chef Angie's cooking reminded me of the best meals I had during my travels in East Africa.",
    service: 'biryani-friday',
    date: '2026-01-10',
  },
  {
    id: '2',
    name: 'David Omondi',
    location: 'Nairobi, Kenya',
    rating: 5,
    text: 'We hired Chef Angie for our anniversary dinner and it was magical. The attention to detail, the presentation, and most importantly the taste - everything was perfect.',
    service: 'private-chef',
    date: '2025-12-20',
  },
  {
    id: '3',
    name: 'Emma & Tom',
    location: 'Amsterdam, NL',
    rating: 5,
    text: 'The apartment was spotless with an amazing pool. Combined with the chef service, it was the best vacation experience we\'ve ever had. We\'re already planning our return!',
    service: 'accommodation',
    date: '2025-11-15',
  },
]

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const serviceLabels: Record<string, string> = {
    'biryani-friday': 'Biryani Friday',
    'pilau-tuesday': 'Pilau Tuesday',
    'private-chef': 'Private Chef',
    'catering': 'Catering',
    'accommodation': 'Accommodation',
  }

  return (
    <div className="bg-seafoam rounded-2xl p-6 md:p-8 relative border-l-4 border-coral">
      {/* Quote Icon */}
      <svg
        className="absolute top-4 right-4 w-10 h-10 text-coral/20"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>

      {/* Rating */}
      <div className="mb-4">
        <StarRatingDisplay rating={testimonial.rating} size="md" />
      </div>

      {/* Text */}
      <p className="font-body text-charcoal italic mb-6 leading-relaxed">
        &ldquo;{testimonial.text}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-4">
        {/* Avatar with initials */}
        <div className="w-12 h-12 rounded-full bg-teal flex items-center justify-center text-white font-ui font-semibold border-2 border-coral">
          {testimonial.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)}
        </div>
        <div>
          <p className="font-ui font-semibold text-ocean-dark">{testimonial.name}</p>
          <p className="font-body text-sm text-gray-warm">
            {testimonial.location} | {serviceLabels[testimonial.service] || testimonial.service}
          </p>
        </div>
      </div>
    </div>
  )
}

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="section-padding bg-white">
      <div className="container-standard">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="font-script text-2xl md:text-3xl text-coral mb-2">Real Experiences</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-ocean-dark mb-4">
            What Our Guests Say
          </h2>
          <p className="font-body text-lg text-gray-warm max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our clients have to say about their experience with Chef Angie.
          </p>
        </div>

        {/* Mobile: Carousel */}
        <div className="lg:hidden">
          <div className="relative">
            <TestimonialCard testimonial={testimonials[currentIndex]} />

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-teal/10 hover:bg-teal/20 text-teal transition-colors"
                aria-label="Previous testimonial"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      'w-2.5 h-2.5 rounded-full transition-colors',
                      index === currentIndex ? 'bg-coral' : 'bg-gray-light'
                    )}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-teal/10 hover:bg-teal/20 text-teal transition-colors"
                aria-label="Next testimonial"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Button variant="outline" size="md" asChild>
            <Link href="/cuisine#testimonials">Leave a Review</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
