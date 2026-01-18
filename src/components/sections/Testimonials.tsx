import Link from 'next/link'
import { Button } from '@/components/ui'

export function Testimonials() {
  return (
    <section className="section-padding bg-white">
      <div className="container-standard">
        {/* Section Header */}
        <div className="text-center mb-8">
          <p className="font-script text-2xl md:text-3xl text-coral mb-2">Real Experiences</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-ocean-dark mb-4">
            What Our Guests Say
          </h2>
          <p className="font-body text-lg text-gray-warm max-w-2xl mx-auto">
            Be the first to share your experience with Chef Angie!
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="outline" size="md" asChild>
            <Link href="/contact">Leave a Review</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
