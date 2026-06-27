import {
  Hero,
  TwoPillars,
  CombinedExperience,
  AboutPreview,
  Testimonials,
  CTASection,
} from '@/components/sections'
import { fetchAggregateRating } from '@/lib/schema-helpers'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  '@id': 'https://www.chefangela.co.ke',
  name: 'Chef Angela',
  description: 'Authentic Kenyan cuisine and vacation rental in Diani Beach. Weekly food delivery (Biryani Friday, Pilau Tuesday), private chef services, and apartment with pool.',
  url: 'https://www.chefangela.co.ke',
  telephone: '+254706310918',
  email: 'liyayiangela20@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Diani Beach',
    addressRegion: 'Kwale County',
    addressCountry: 'KE',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -4.2868396,
    longitude: 39.5756094,
  },
  image: 'https://www.chefangela.co.ke/images/og/og-home.jpg',
  priceRange: '$$',
  servesCuisine: ['Kenyan', 'Swahili', 'African'],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00',
      closes: '20:00',
    },
  ],
  sameAs: [
    'https://instagram.com/chef.angie002',
    'https://wa.me/254706310918',
  ],
}

export default async function HomePage() {
  const aggregateRating = await fetchAggregateRating('cuisine')
  const pageJsonLd = aggregateRating
    ? { ...jsonLd, aggregateRating }
    : jsonLd

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      {/* Hero Section - Full screen with background image */}
      <Hero />

      {/* Two Pillars - Cuisine & Stay cards */}
      <TwoPillars />

      {/* Combined Experience Banner */}
      <CombinedExperience />

      {/* Meet Chef Angie Preview */}
      <AboutPreview />

      {/* Client Testimonials */}
      <Testimonials />

      {/* Final CTA Section */}
      <CTASection />
    </>
  )
}
