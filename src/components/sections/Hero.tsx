import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/diani-beach.jpg"
          alt="Diani Beach coastline"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-dark/70 via-ocean-dark/50 to-ocean-dark/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-standard text-center text-white px-4 py-24 md:py-32">
        <p className="font-body text-lg md:text-xl text-white/90 mb-4 tracking-wide">
          Welcome to
        </p>
        <h1 className="font-script text-5xl md:text-7xl lg:text-8xl text-coral mb-6">
          Chef Angie
        </h1>
        <p className="font-heading text-2xl md:text-3xl lg:text-4xl font-light mb-4">
          Your Complete Diani Experience
        </p>
        <p className="font-body text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10">
          Authentic Kenyan cuisine and coastal hospitality.
          From our kitchen to your table, from our apartment to your vacation.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="primary" size="lg" asChild>
            <Link href="/cuisine">Explore Cuisine</Link>
          </Button>
          <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-ocean-dark" asChild>
            <Link href="/hebergement">Book Your Stay</Link>
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-white/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}
