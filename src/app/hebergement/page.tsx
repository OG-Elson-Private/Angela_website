import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { GallerySection } from '@/components/features/hebergement/GallerySection'
import { TestimonialsCarousel } from '@/components/sections/TestimonialsCarousel'
import { fetchAggregateRating } from '@/lib/schema-helpers'

export const metadata: Metadata = {
  title: 'Vacation Apartment Diani Beach | Holiday Rental with Pool',
  description: 'Book a vacation apartment in Diani Beach with pool. Holiday rental near the beach from 4,000 KES/night. Direct booking saves you money!',
  openGraph: {
    title: 'Vacation Apartment Diani Beach | Chef Angie',
    description: 'Vacation apartment in Diani Beach - Holiday rental with pool from 4,000 KES/night',
    type: 'website',
    url: 'https://www.chefangela.co.ke/hebergement',
    images: [{ url: '/api/og?page=stay', width: 1200, height: 630 }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  '@id': 'https://www.chefangela.co.ke/hebergement',
  name: 'Chef Angie Vacation Apartment',
  description: 'Cozy vacation apartment in Diani Beach with pool access. Perfect holiday rental for couples and solo travelers, just 10 minutes walk from the beach.',
  url: 'https://www.chefangela.co.ke/hebergement',
  telephone: '+254719635944',
  email: 'liyayiangela20@gmail.com',
  image: 'https://www.chefangela.co.ke/images/apartment/pool.jpg',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Near Kenya Power Office, Diani Beach',
    addressLocality: 'Diani Beach',
    addressRegion: 'Kwale County',
    addressCountry: 'KE',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -4.2868396,
    longitude: 39.5756094,
  },
  priceRange: '4000-8000 KES',
  checkinTime: '12:00',
  checkoutTime: '09:00',
  petsAllowed: false,
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Swimming Pool', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Free WiFi', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Free Parking', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Kitchenette', value: true },
    { '@type': 'LocationFeatureSpecification', name: '24/7 Security', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Beach Access', value: true },
  ],
  numberOfRooms: 1,
  occupancy: {
    '@type': 'QuantitativeValue',
    maxValue: 2,
  },
  offers: {
    '@type': 'Offer',
    name: 'Low Season Rate',
    price: '4000',
    priceCurrency: 'KES',
    availability: 'https://schema.org/InStock',
    validFrom: '2026-01-15',
    validThrough: '2026-10-31',
  },
}

const amenities = [
  { icon: '🏊', name: 'Swimming Pool', description: 'Private pool access' },
  { icon: '🛏️', name: '1 Bedroom', description: 'Comfortable queen size bed' },
  { icon: '🍳', name: 'Kitchenette', description: 'Basic cooking essentials' },
  { icon: '📶', name: 'Free WiFi', description: 'Stay connected' },
  { icon: '🌀', name: 'Stand Fan', description: 'Stay cool' },
  { icon: '🚗', name: 'Free Parking', description: 'Safe parking space' },
  { icon: '🏖️', name: 'Beach Access', description: '10 min walk to beach' },
  { icon: '🔒', name: '24/7 Security', description: 'Gated compound' },
]

const whyBookDirect = [
  { title: 'Best Price Guarantee', description: 'No middleman fees - save up to 20%' },
  { title: 'Flexible Booking', description: 'Easy changes and cancellations' },
  { title: 'Personal Service', description: 'Direct communication with your host' },
  { title: 'Chef Service Available', description: 'Add private chef to your stay' },
]

const pricing = {
  lowSeason: { price: 4000, period: 'Mid-January - October' },
  highSeason: { price: 7000, period: 'November - Mid-January' },
}

export default async function StayPage() {
  const aggregateRating = await fetchAggregateRating('accommodation')
  const pageJsonLd = aggregateRating
    ? { ...jsonLd, aggregateRating }
    : jsonLd

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/apartment/pool.jpg"
            alt="Apartment pool in Diani Beach"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ocean-dark/90 to-ocean-dark/50" />
        </div>

        <div className="relative container-standard px-4">
          <div className="max-w-2xl">
            <p className="font-script text-3xl text-coral mb-4">Your Coastal Retreat</p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Vacation Apartment in Diani Beach
            </h1>
            <p className="font-body text-lg text-white/80 mb-8">
              Book a holiday rental with pool, just minutes from the pristine beaches of Diani.
              Perfect for couples, solo travelers, or small families seeking a vacation apartment.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-white">
                <span className="font-ui font-semibold">From 4,000 KES</span>
                <span className="text-white/70 text-sm"> / night</span>
              </div>
              <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-white">
                <span className="font-ui">📍 Diani Beach, Kenya</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="gradient" size="lg" asChild>
                <a
                  href="https://wa.me/254719635944?text=Hello%20Chef%20Angie!%20I'm%20interested%20in%20booking%20your%20apartment.%0A%0ACheck-in:%20____%0ACheck-out:%20____%0ANumber%20of%20guests:%20____"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book Direct & Save
                </a>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-ocean-dark" asChild>
                <a href="https://www.airbnb.com/rooms/1553536656876088045" target="_blank" rel="noopener noreferrer">
                  Book on Airbnb
                </a>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-ocean-dark" asChild>
                <Link href="#gallery">View Gallery</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Features */}
      <section className="py-8 bg-teal">
        <div className="container-standard px-4">
          <div className="flex flex-wrap justify-center gap-8 text-white">
            {[
              { icon: '🏊', text: 'Pool' },
              { icon: '🛏️', text: '1 Bedroom' },
              { icon: '👥', text: '2 Guests' },
              { icon: '🏖️', text: 'Near Beach' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2">
                <span className="text-2xl">{item.icon}</span>
                <span className="font-ui font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <GallerySection />

      {/* Amenities */}
      <section className="section-padding bg-white">
        <div className="container-standard">
          <div className="text-center mb-12">
            <p className="font-script text-2xl text-coral mb-2">Everything You Need</p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-ocean-dark">
              Vacation Apartment Amenities
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {amenities.map((amenity) => (
              <div key={amenity.name} className="bg-sand-light rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">{amenity.icon}</div>
                <h3 className="font-ui font-semibold text-ocean-dark mb-1">{amenity.name}</h3>
                <p className="font-body text-sm text-gray-warm">{amenity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Book Direct */}
      <section className="section-padding bg-seafoam">
        <div className="container-standard">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-script text-2xl text-coral mb-2">Save More</p>
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-ocean-dark mb-8">
                Why Book This Holiday Rental Direct?
              </h2>

              <div className="space-y-6">
                {whyBookDirect.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 bg-teal rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-ui font-semibold text-ocean-dark mb-1">{item.title}</h3>
                      <p className="font-body text-gray-warm text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="font-heading text-2xl font-semibold text-ocean-dark mb-6 text-center">
                Pricing
              </h3>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center p-4 bg-sand-light rounded-xl">
                  <div>
                    <p className="font-ui font-semibold text-ocean-dark">Low Season</p>
                    <p className="text-sm text-gray-warm">{pricing.lowSeason.period}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-heading text-2xl font-bold text-teal">{pricing.lowSeason.price.toLocaleString()} KES</p>
                    <p className="text-sm text-gray-warm">per night</p>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-coral/10 rounded-xl border-2 border-coral">
                  <div>
                    <p className="font-ui font-semibold text-ocean-dark">High Season</p>
                    <p className="text-sm text-gray-warm">{pricing.highSeason.period}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-heading text-2xl font-bold text-coral">{pricing.highSeason.price.toLocaleString()} KES</p>
                    <p className="text-sm text-gray-warm">per night</p>
                  </div>
                </div>
              </div>

              <Button variant="gradient" size="lg" className="w-full" asChild>
                <a
                  href="https://wa.me/254719635944?text=Hello%20Chef%20Angie!%20I'm%20interested%20in%20booking%20your%20apartment.%0A%0ACheck-in:%20____%0ACheck-out:%20____%0ANumber%20of%20guests:%20____"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book Now on WhatsApp
                </a>
              </Button>

              <p className="text-center text-sm text-gray-warm mt-4">
                Or call: <a href="tel:+254719635944" className="text-teal hover:underline">+254 719 635 944</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Platforms */}
      <section id="booking-platforms" className="section-padding bg-white">
        <div className="container-standard">
          <div className="text-center mb-10">
            <p className="font-script text-2xl text-coral mb-2">Multiple Ways to Book</p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-ocean-dark">
              Choose Your Booking Method
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Direct Booking */}
            <div className="bg-teal/5 border-2 border-teal rounded-2xl p-6 text-center relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal text-white text-xs font-ui font-bold px-3 py-1 rounded-full">
                Best Price
              </div>
              <div className="text-3xl mb-3">💬</div>
              <h3 className="font-heading text-xl font-semibold text-ocean-dark mb-2">WhatsApp Direct</h3>
              <p className="font-body text-sm text-gray-warm mb-4">No fees, best rate, instant confirmation</p>
              <Button variant="primary" size="sm" className="w-full" asChild>
                <a
                  href="https://wa.me/254719635944?text=Hello%20Chef%20Angie!%20I'm%20interested%20in%20booking%20your%20apartment."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book Direct
                </a>
              </Button>
            </div>

            {/* Airbnb */}
            <div className="bg-sand-light border border-gray-light rounded-2xl p-6 text-center">
              <div className="text-3xl mb-3">🏠</div>
              <h3 className="font-heading text-xl font-semibold text-ocean-dark mb-2">Airbnb</h3>
              <p className="font-body text-sm text-gray-warm mb-4">Book with Airbnb protection & reviews</p>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <a
                  href="https://www.airbnb.com/rooms/1553536656876088045"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book on Airbnb
                </a>
              </Button>
            </div>

            {/* Phone */}
            <div className="bg-sand-light border border-gray-light rounded-2xl p-6 text-center">
              <div className="text-3xl mb-3">📞</div>
              <h3 className="font-heading text-xl font-semibold text-ocean-dark mb-2">Call Us</h3>
              <p className="font-body text-sm text-gray-warm mb-4">Speak directly for custom stays</p>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <a href="tel:+254719635944">
                  +254 719 635 944
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="section-padding bg-white">
        <div className="container-standard">
          <div className="text-center mb-12">
            <p className="font-script text-2xl text-coral mb-2">Prime Location</p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-ocean-dark">
              Vacation Apartment Location in Diani
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="rounded-2xl overflow-hidden aspect-video">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d994.9!2d39.5756094!3d-4.2868396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x184047d6ec8f8b53%3A0xdeb39114145c126a!2sBstan%20Homes%20Diani%20at%20Blueswallow!5e0!3m2!1sen!2ske!4v1705600000000!5m2!1sen!2ske"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Apartment location - Bstan Homes Diani at Blueswallow"
              />
            </div>

            <div>
              <h3 className="font-heading text-xl font-semibold text-ocean-dark mb-4">Nearby Attractions</h3>
              <p className="font-body text-gray-warm mb-4">
                Located near Kenya Power office, Diani Beach.
              </p>
              <ul className="space-y-3">
                {[
                  { name: 'Diani Beach', distance: '10 min walk' },
                  { name: 'Restaurants & Bars', distance: '5-10 min walk' },
                  { name: 'Carrefour Supermarket', distance: '10 min walk' },
                  { name: 'Ukunda Airstrip', distance: '15 min drive' },
                  { name: 'Mombasa Airport', distance: '45 min drive' },
                ].map((place) => (
                  <li key={place.name} className="flex justify-between items-center py-2 border-b border-gray-light">
                    <span className="font-body text-charcoal">{place.name}</span>
                    <span className="font-ui text-sm text-gray-warm">{place.distance}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* All-Inclusive Package */}
      <section id="package" className="py-16 md:py-20 bg-gradient-to-br from-ocean-dark via-ocean-dark to-teal-dark relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-coral/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal/10 rounded-full blur-3xl" />

        <div className="container-standard px-4 relative">
          {/* Best Value Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 bg-coral px-4 py-2 rounded-full">
              <span className="text-white text-sm font-ui font-bold uppercase tracking-wider">
                🎁 Best Value
              </span>
            </div>
          </div>

          <div className="text-center mb-12">
            <p className="font-script text-2xl md:text-3xl text-coral mb-3">All-Inclusive</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              The Complete Diani Package
            </h2>
            <p className="font-body text-lg text-white/80 max-w-2xl mx-auto">
              Stay, eat, and relax — everything included in one simple price.
              The perfect hassle-free vacation experience in Diani Beach.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left - What's Included */}
            <div className="space-y-6">
              {/* Package Includes Header */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="font-ui font-semibold text-white mb-6 text-center text-lg">
                  Your Package Includes
                </h3>

                {/* Accommodation */}
                <div className="mb-6 pb-6 border-b border-white/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-teal rounded-full flex items-center justify-center">
                      <span className="text-xl">🏠</span>
                    </div>
                    <h4 className="font-ui font-semibold text-white text-lg">Accommodation</h4>
                  </div>
                  <ul className="space-y-2 pl-13">
                    {[
                      'Cozy 1-bedroom apartment',
                      'Private pool access',
                      'Free WiFi & parking',
                      '10 min walk to beach',
                      '24/7 security',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-white/80 text-sm">
                        <svg className="w-4 h-4 text-coral flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Chef Service */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-coral rounded-full flex items-center justify-center">
                      <span className="text-xl">👨‍🍳</span>
                    </div>
                    <h4 className="font-ui font-semibold text-white text-lg">Personal Chef Service</h4>
                  </div>
                  <ul className="space-y-2 pl-13">
                    {[
                      '3 home-cooked meals daily',
                      'Custom menu planning',
                      'Delivered to your door',
                      'Flexible timing',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-white/80 text-sm">
                        <svg className="w-4 h-4 text-coral flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 3 Meals Visual */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h3 className="font-ui font-semibold text-white mb-4 text-center">Daily Meals Included</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { icon: '🌅', meal: 'Breakfast', time: 'Morning' },
                    { icon: '☀️', meal: 'Lunch', time: 'Midday' },
                    { icon: '🌙', meal: 'Dinner', time: 'Evening' },
                  ].map((item) => (
                    <div key={item.meal} className="text-center">
                      <div className="text-4xl mb-2">{item.icon}</div>
                      <p className="font-ui font-semibold text-white text-sm">{item.meal}</p>
                      <p className="text-white/60 text-xs">{item.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - Pricing Card */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-coral to-sunset p-6 text-center">
                <p className="text-white/90 text-sm font-ui uppercase tracking-wide mb-1">All-Inclusive Package</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-heading text-5xl font-bold text-white">8,000</span>
                  <span className="text-white/80 font-ui">KES/day</span>
                </div>
                <p className="text-white/80 text-sm mt-2">Stay + Chef Service</p>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Savings Comparison */}
                <div className="bg-teal/10 rounded-xl p-4 mb-6">
                  <h4 className="font-ui font-semibold text-teal-dark mb-3 text-center">You Save with the Package!</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-warm">
                      <span>Apartment alone</span>
                      <span>4,000 - 7,000 KES</span>
                    </div>
                    <div className="flex justify-between text-gray-warm">
                      <span>Chef service alone</span>
                      <span>3,500 KES</span>
                    </div>
                    <div className="border-t border-teal/20 pt-2 mt-2 flex justify-between font-semibold text-gray-warm">
                      <span>If booked separately</span>
                      <span className="line-through">7,500 - 10,500 KES</span>
                    </div>
                    <div className="flex justify-between font-bold text-teal text-base">
                      <span>Package price</span>
                      <span>8,000 KES</span>
                    </div>
                  </div>
                </div>

                {/* Note about ingredients */}
                <div className="mb-6 bg-sand-light rounded-xl p-4">
                  <h4 className="font-ui font-semibold text-ocean-dark mb-2 text-sm flex items-center gap-2">
                    <span>ℹ️</span> Good to Know
                  </h4>
                  <p className="text-sm text-gray-warm">
                    Food ingredients are at your charge. You choose the menu, we provide
                    the shopping list, and you cover the ingredients cost.
                  </p>
                </div>

                {/* Perfect For */}
                <div className="mb-6">
                  <h4 className="font-ui font-semibold text-ocean-dark mb-3">Perfect For</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Couples', 'Solo travelers', 'Honeymooners', 'Remote workers'].map((tag) => (
                      <span key={tag} className="bg-coral/10 text-coral px-3 py-1 rounded-full text-sm font-ui">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Button variant="gradient" size="lg" className="w-full" asChild>
                  <a
                    href="https://wa.me/254719635944?text=Hello%20Chef%20Angie!%20I'm%20interested%20in%20the%20ALL-INCLUSIVE%20PACKAGE%20(8,000%20KES/day).%0A%0ACheck-in:%20____%0ACheck-out:%20____%0ANumber%20of%20guests:%20____%0ADietary%20preferences:%20____"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book the Package
                  </a>
                </Button>
                <p className="text-center text-xs text-gray-warm mt-3">
                  Instant confirmation via WhatsApp
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* House Rules */}
      <section className="section-padding bg-sand-light">
        <div className="container-standard">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-heading text-2xl font-semibold text-ocean-dark mb-6 text-center">
              House Rules
            </h2>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: 'Check-in', value: 'From 12:00 PM' },
                  { label: 'Check-out', value: 'By 9:00 AM' },
                  { label: 'Smoking', value: 'Not allowed indoors' },
                  { label: 'Pets', value: 'Not allowed' },
                  { label: 'Parties', value: 'Not allowed' },
                  { label: 'Max Guests', value: '2 adults' },
                ].map((rule) => (
                  <div key={rule.label} className="flex justify-between py-2 border-b border-gray-light">
                    <span className="font-ui text-gray-warm">{rule.label}</span>
                    <span className="font-ui font-medium text-ocean-dark">{rule.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel - Accommodation */}
      <TestimonialsCarousel
        category="accommodation"
        title="What Our Guests Say"
        subtitle="Guest Reviews"
      />

      {/* Final CTA */}
      <section className="py-16 bg-ocean-dark text-white">
        <div className="container-standard text-center px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-4">
            Ready to Book Your Vacation Apartment?
          </h2>
          <p className="font-body text-lg text-white/80 max-w-xl mx-auto mb-8">
            Book your holiday rental in Diani Beach directly and save. Contact us for availability!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="gradient" size="lg" asChild>
              <a
                href="https://wa.me/254719635944?text=Hello%20Chef%20Angie!%20I'm%20interested%20in%20booking%20your%20apartment."
                target="_blank"
                rel="noopener noreferrer"
              >
                Book on WhatsApp
              </a>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-ocean-dark" asChild>
              <a href="tel:+254719635944">Call +254 719 635 944</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
