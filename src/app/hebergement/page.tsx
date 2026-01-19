import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { GallerySection } from '@/components/features/hebergement/GallerySection'

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
                  href="https://wa.me/254719635944?text=Hello%20Chef%20Angie!%20I'm%20interested%20in%20booking%20your%20apartment.%0A%0ACheck-in:%20____%0ACheck-out:%20____%0ANumber%20of%20guests:%20____"
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

      {/* Photo Gallery */}
      <GallerySection />

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

      {/* Chef Service Add-on - Premium Offer */}
      <section id="chef-service" className="py-16 md:py-20 bg-gradient-to-br from-ocean-dark via-ocean-dark to-teal-dark relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-coral/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal/10 rounded-full blur-3xl" />

        <div className="container-standard px-4 relative">
          {/* Exclusive Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 bg-coral px-4 py-2 rounded-full animate-pulse">
              <span className="text-white text-sm font-ui font-bold uppercase tracking-wider">
                ✨ Exclusive Offer
              </span>
            </div>
          </div>

          <div className="text-center mb-12">
            <p className="font-script text-2xl md:text-3xl text-coral mb-3">Upgrade Your Stay</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Private Chef at Your Door
            </h2>
            <p className="font-body text-lg text-white/80 max-w-2xl mx-auto">
              Why worry about meals when you&apos;re on vacation? Enjoy a 5-star dining experience
              without leaving your apartment. Your personal chef, your schedule, your menu.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left - Benefits */}
            <div className="space-y-6">
              {/* 3 Meals Visual */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="font-ui font-semibold text-white mb-4 text-center">3 Meals Delivered Daily</h3>
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

              {/* Key Benefits */}
              <div className="space-y-4">
                {[
                  { icon: '👨‍🍳', title: 'Personal Chef Service', desc: 'Your own private chef at your disposal' },
                  { icon: '🚪', title: 'Delivered to Your Door', desc: 'Fresh meals at the time you choose' },
                  { icon: '📝', title: 'Custom Menu', desc: 'You decide what you want to eat' },
                  { icon: '🏖️', title: 'Stress-Free Vacation', desc: 'No cooking, no dishes, just relax' },
                ].map((benefit) => (
                  <div key={benefit.title} className="flex items-start gap-4 bg-white/5 rounded-xl p-4">
                    <span className="text-2xl">{benefit.icon}</span>
                    <div>
                      <h4 className="font-ui font-semibold text-white">{benefit.title}</h4>
                      <p className="text-white/70 text-sm">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Pricing Card */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-coral p-6 text-center">
                <p className="text-white/80 text-sm font-ui uppercase tracking-wide mb-1">Daily Chef Service</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-heading text-5xl font-bold text-white">3,000</span>
                  <span className="text-white/80 font-ui">KES/day</span>
                </div>
                <p className="text-white/70 text-sm mt-2">For 3 complete meals</p>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* What's Included */}
                <div className="mb-6">
                  <h4 className="font-ui font-semibold text-ocean-dark mb-3 flex items-center gap-2">
                    <span className="text-teal">✓</span> What&apos;s Included
                  </h4>
                  <ul className="space-y-2">
                    {[
                      'Professional chef service',
                      'Menu planning with you',
                      'Shopping for ingredients',
                      'Meal preparation',
                      'Delivery to your apartment',
                      'Flexible timing',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-gray-warm">
                        <svg className="w-4 h-4 text-teal flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What's Not Included */}
                <div className="mb-6 bg-sand-light rounded-xl p-4">
                  <h4 className="font-ui font-semibold text-ocean-dark mb-2 text-sm">Note</h4>
                  <p className="text-sm text-gray-warm">
                    Food ingredients are at your charge. You choose the menu, we provide
                    the shopping list, and you cover the ingredients cost.
                  </p>
                </div>

                {/* Value Comparison */}
                <div className="bg-teal/10 rounded-xl p-4 mb-6">
                  <p className="text-sm text-teal-dark font-ui">
                    <span className="font-semibold">💡 Same Price, Better Experience:</span> 3 restaurant meals = ~3,000 KES.
                    For the same price, enjoy personalized home-cooked meals delivered to your door!
                  </p>
                </div>

                {/* CTA */}
                <Button variant="gradient" size="lg" className="w-full" asChild>
                  <a
                    href="https://wa.me/254719635944?text=Hello%20Chef%20Angie!%20I'm%20interested%20in%20your%20apartment%20WITH%20the%20Chef%20Service%20package.%0A%0ACheck-in:%20____%0ACheck-out:%20____%0ANumber%20of%20guests:%20____%0ADietary%20preferences:%20____"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book Apartment + Chef Service
                  </a>
                </Button>
                <p className="text-center text-xs text-gray-warm mt-3">
                  Or add it anytime during your stay
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
