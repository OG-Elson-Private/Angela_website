import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui'

interface PillarCardProps {
  title: string
  subtitle: string
  description: string
  price: string
  priceLabel: string
  image: string
  imageAlt: string
  href: string
  ctaText: string
}

function PillarCard({
  title,
  subtitle,
  description,
  price,
  priceLabel,
  image,
  imageAlt,
  href,
  ctaText,
}: PillarCardProps) {
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-2">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-dark/60 to-transparent" />

        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-coral text-white px-4 py-2 rounded-full font-ui text-sm font-semibold shadow-lg">
          {price}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        <p className="font-body text-sm text-teal uppercase tracking-wider mb-2">{subtitle}</p>
        <h3 className="font-heading text-2xl md:text-3xl font-semibold text-ocean-dark mb-3">
          {title}
        </h3>
        <p className="font-body text-gray-warm mb-2">{description}</p>
        <p className="font-body text-sm text-gray-warm mb-6">{priceLabel}</p>

        <Button variant="primary" size="md" className="w-full" asChild>
          <Link href={href}>{ctaText}</Link>
        </Button>
      </div>
    </div>
  )
}

export function TwoPillars() {
  return (
    <section className="section-padding bg-sand-light">
      <div className="container-standard">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-ocean-dark mb-4">
            Two Ways to Experience Diani
          </h2>
          <p className="font-body text-lg text-gray-warm max-w-2xl mx-auto">
            Whether you&apos;re craving authentic flavors or seeking the perfect coastal retreat,
            Chef Angie has you covered.
          </p>
        </div>

        {/* Two Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <PillarCard
            title="Taste"
            subtitle="Cuisine Services"
            description="Experience the rich flavors of Kenya with our weekly food delivery, private chef services, and event catering."
            price="From 450 KES"
            priceLabel="Weekly delivery starting price"
            image="/images/dishes/chicken-biryani.jpg"
            imageAlt="Delicious Chicken Biryani prepared by Chef Angie"
            href="/cuisine"
            ctaText="Explore Menu"
          />

          <PillarCard
            title="Stay"
            subtitle="Accommodation"
            description="Your home away from home in Diani Beach. A beautiful apartment with pool, just steps from the ocean."
            price="From 5,000 KES"
            priceLabel="Per night, direct booking"
            image="/images/apartment/pool.jpg"
            imageAlt="Apartment pool area in Diani Beach"
            href="/hebergement"
            ctaText="View Apartment"
          />
        </div>
      </div>
    </section>
  )
}
