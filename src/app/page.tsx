import {
  Hero,
  TwoPillars,
  WeeklySpecials,
  CombinedExperience,
  AboutPreview,
  Testimonials,
  CTASection,
} from '@/components/sections'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://www.chefangela.co.ke',
  name: 'Chef Angela',
  description: 'Authentic Kenyan cuisine and vacation rental in Diani Beach. Weekly food delivery (Biryani Friday, Pilau Tuesday), private chef services, and apartment with pool.',
  url: 'https://www.chefangela.co.ke',
  telephone: '+254719635944',
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
  hasMenu: 'https://www.chefangela.co.ke/cuisine/livraisons',
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
    'https://wa.me/254719635944',
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section - Full screen with background image */}
      <Hero />

      {/* Two Pillars - Cuisine & Stay cards */}
      <TwoPillars />

      {/* Weekly Specials - Biryani Friday & Pilau Tuesday */}
      <WeeklySpecials />

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
