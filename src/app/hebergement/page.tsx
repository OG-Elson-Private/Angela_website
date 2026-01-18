import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Vacation Apartment in Diani Beach | Chef Angie',
  description: 'Book your perfect coastal getaway in Diani Beach. Beautiful apartment with pool, just steps from the ocean. Direct booking saves you money!',
  openGraph: {
    title: 'Vacation Apartment | Chef Angie - Diani Beach',
    description: 'Your home away from home in Diani Beach - Apartment with pool from 5,000 KES/night',
    images: ['/images/og/og-stay.jpg'],
  },
}

const amenities = [
  { icon: '🏊', name: 'Swimming Pool', description: 'Private pool access' },
  { icon: '🛏️', name: '1 Bedroom', description: 'Comfortable double bed' },
  { icon: '🍳', name: 'Full Kitchen', description: 'Cook your own meals' },
  { icon: '📶', name: 'Free WiFi', description: 'Stay connected' },
  { icon: '❄️', name: 'Air Conditioning', description: 'Stay cool' },
  { icon: '🚗', name: 'Free Parking', description: 'Safe parking space' },
  { icon: '🏖️', name: 'Beach Access', description: '5 min walk to beach' },
  { icon: '🔒', name: '24/7 Security', description: 'Gated compound' },
]

const whyBookDirect = [
  { title: 'Best Price Guarantee', description: 'No middleman fees - save up to 20%' },
  { title: 'Flexible Booking', description: 'Easy changes and cancellations' },
  { title: 'Personal Service', description: 'Direct communication with your host' },
  { title: 'Chef Service Available', description: 'Add private chef to your stay' },
]

const pricing = {
  lowSeason: { price: 5000, period: 'April - June' },
  highSeason: { price: 8000, period: 'July - March' },
}

export default function StayPage() {
  return (
    <>
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
              Your Home in Diani Beach
            </h1>
            <p className="font-body text-lg text-white/80 mb-8">
              A beautiful apartment with pool, just minutes from the pristine beaches of Diani.
              Perfect for couples, solo travelers, or small families.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-white">
                <span className="font-ui font-semibold">From 5,000 KES</span>
                <span className="text-white/70 text-sm"> / night</span>
              </div>
              <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-white">
                <span className="font-ui">📍 Diani Beach, Kenya</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="gradient" size="lg" asChild>
                <a
                  href="https://wa.me/254706310918?text=Hello%20Chef%20Angie!%20I'm%20interested%20in%20booking%20your%20apartment.%0A%0ACheck-in:%20____%0ACheck-out:%20____%0ANumber%20of%20guests:%20____"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book Direct & Save
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

      {/* Video Tour */}
      <section id="gallery" className="section-padding bg-sand-light">
        <div className="container-standard">
          <div className="text-center mb-12">
            <p className="font-script text-2xl text-coral mb-2">See It Yourself</p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-ocean-dark">
              Take a Virtual Tour
            </h2>
          </div>

          {/* Video Player */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg">
              <video
                className="w-full h-full object-cover"
                controls
                preload="metadata"
                poster="/images/apartment/pool.jpg"
              >
                <source src="/videos/apartment-tour.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden shadow-md">
                <Image
                  src="/images/apartment/pool.jpg"
                  alt={`Apartment view ${i}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="section-padding bg-white">
        <div className="container-standard">
          <div className="text-center mb-12">
            <p className="font-script text-2xl text-coral mb-2">Everything You Need</p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-ocean-dark">
              Amenities & Features
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
                Why Book Direct?
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
                  href="https://wa.me/254706310918?text=Hello%20Chef%20Angie!%20I'm%20interested%20in%20booking%20your%20apartment.%0A%0ACheck-in:%20____%0ACheck-out:%20____%0ANumber%20of%20guests:%20____"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book Now on WhatsApp
                </a>
              </Button>

              <p className="text-center text-sm text-gray-warm mt-4">
                Or call: <a href="tel:+254706310918" className="text-teal hover:underline">+254 706 310 918</a>
              </p>
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
              Where You&apos;ll Be
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="bg-gray-light rounded-2xl aspect-video flex items-center justify-center">
              <p className="text-gray-warm">Map - Diani Beach, Kenya</p>
            </div>

            <div>
              <h3 className="font-heading text-xl font-semibold text-ocean-dark mb-4">Nearby Attractions</h3>
              <ul className="space-y-3">
                {[
                  { name: 'Diani Beach', distance: '5 min walk' },
                  { name: 'Restaurants & Bars', distance: '5-10 min walk' },
                  { name: 'Supermarkets', distance: '10 min drive' },
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

      {/* Chef Service Add-on */}
      <section className="py-16 bg-gradient-to-r from-coral to-coral-dark text-white">
        <div className="container-standard text-center px-4">
          <p className="font-script text-2xl text-white/90 mb-2">Exclusive Add-On</p>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-4">
            Add Private Chef Service
          </h2>
          <p className="font-body text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Make your stay extra special! Have Chef Angie prepare authentic Kenyan meals
            right in your apartment. Perfect for a welcome dinner or daily meals.
          </p>
          <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-coral" asChild>
            <Link href="/cuisine#chef-prive">Learn About Chef Service</Link>
          </Button>
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
                  { label: 'Check-in', value: 'From 2:00 PM' },
                  { label: 'Check-out', value: 'By 11:00 AM' },
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

      {/* Final CTA */}
      <section className="py-16 bg-ocean-dark text-white">
        <div className="container-standard text-center px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-4">
            Ready for Your Diani Getaway?
          </h2>
          <p className="font-body text-lg text-white/80 max-w-xl mx-auto mb-8">
            Book directly and save. Contact us for availability and special rates!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="gradient" size="lg" asChild>
              <a
                href="https://wa.me/254706310918?text=Hello%20Chef%20Angie!%20I'm%20interested%20in%20booking%20your%20apartment."
                target="_blank"
                rel="noopener noreferrer"
              >
                Book on WhatsApp
              </a>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-ocean-dark" asChild>
              <a href="tel:+254706310918">Call +254 706 310 918</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
