import Link from 'next/link'
import { Button } from '@/components/ui'

export function CombinedExperience() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal via-teal-dark to-ocean-dark" />

      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-coral rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-sunset rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Content */}
      <div className="relative container-standard text-center text-white px-4">
        <p className="font-script text-2xl md:text-3xl text-coral mb-4">
          The Ultimate Package
        </p>
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
          The Complete Diani Experience
        </h2>
        <p className="font-body text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8">
          Combine your stay with our chef services for an unforgettable vacation.
          Wake up to a private chef breakfast, enjoy sunset dinners by the pool,
          or have authentic Kenyan cuisine delivered to your door.
        </p>

        {/* Features */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-10">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-body">Private Pool</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-body">Personal Chef</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-body">Beach Access</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-body">Authentic Cuisine</span>
          </div>
        </div>

        {/* CTA */}
        <Button variant="gradient" size="lg" asChild>
          <Link href="/hebergement#package">Discover Our Package</Link>
        </Button>
      </div>
    </section>
  )
}
