import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Cuisine Services | Chef Angie',
  description: 'Discover Chef Angie\'s culinary services in Diani Beach: weekly food delivery (Biryani Friday, Pilau Tuesday), private chef experiences, and event catering.',
  openGraph: {
    title: 'Cuisine Services | Chef Angie',
    description: 'Authentic Kenyan cuisine in Diani Beach - Delivery, Private Chef, Catering',
    images: ['/images/og/og-cuisine.jpg'],
  },
}

const services = [
  {
    id: 'delivery',
    title: 'Weekly Delivery',
    subtitle: 'Biryani Friday & Pilau Tuesday',
    description: 'Fresh, authentic meals delivered to your door every week. Order before Thursday for Friday, before Monday for Tuesday.',
    price: 'From 450 KES',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
      </svg>
    ),
    href: '/cuisine/livraisons',
    cta: 'View Menu',
    features: ['Fresh ingredients', 'Home delivery', 'Diani, Ukunda, Galu, Tiwi'],
  },
  {
    id: 'private-chef',
    title: 'Private Chef',
    subtitle: 'In-Home Dining Experience',
    description: 'Have Chef Angie cook in your villa or apartment. Perfect for romantic dinners, family gatherings, or special celebrations.',
    price: 'From 3,500 KES/day',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    href: '#chef-prive',
    cta: 'Learn More',
    features: ['1-33 guests', 'Personalized menu', 'Full service'],
  },
  {
    id: 'catering',
    title: 'Event Catering',
    subtitle: 'For Groups & Celebrations',
    description: 'From intimate gatherings to large events. Weddings, birthdays, corporate events - we bring the feast to you.',
    price: 'Quote on request',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    href: '#traiteur',
    cta: 'Get Quote',
    features: ['10-200+ guests', 'Custom menus', 'Full setup'],
  },
]

const whyChoose = [
  { title: 'Authentic Recipes', description: 'Traditional Swahili flavors passed down through generations' },
  { title: 'Fresh Ingredients', description: 'Locally sourced, high-quality produce and spices' },
  { title: '4+ Years Experience', description: 'Trusted by hundreds of satisfied customers in Diani' },
  { title: 'Flexible Options', description: 'From single meals to full catering services' },
]

export default function CuisinePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-ocean-dark overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/dishes/chicken-biryani.jpg"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-dark/80 to-ocean-dark" />

        <div className="relative container-standard text-center text-white px-4">
          <p className="font-script text-3xl md:text-4xl text-coral mb-4">
            Taste the Tradition
          </p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Authentic Swahili Cuisine
          </h1>
          <p className="font-body text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8">
            From weekly food delivery to private chef experiences,
            discover the rich flavors of Kenya with Chef Angie.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="gradient" size="lg" asChild>
              <Link href="/cuisine/livraisons">Order This Week</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-ocean-dark" asChild>
              <a href="https://wa.me/254706310918" target="_blank" rel="noopener noreferrer">
                Contact on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-sand-light">
        <div className="container-standard">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-ocean-dark mb-4">
              Our Culinary Services
            </h2>
            <p className="font-body text-lg text-gray-warm max-w-2xl mx-auto">
              Choose the service that fits your needs - from convenient weekly delivery to full-service catering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-teal"
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-teal/10 rounded-xl flex items-center justify-center text-teal mb-6">
                  {service.icon}
                </div>

                {/* Content */}
                <p className="font-ui text-sm text-coral uppercase tracking-wide mb-2">
                  {service.subtitle}
                </p>
                <h3 className="font-heading text-2xl font-semibold text-ocean-dark mb-3">
                  {service.title}
                </h3>
                <p className="font-body text-gray-warm mb-4">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-warm">
                      <svg className="w-4 h-4 text-teal flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-light">
                  <span className="font-ui font-semibold text-coral">{service.price}</span>
                  <Button variant="primary" size="sm" asChild>
                    <Link href={service.href}>{service.cta}</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="section-padding bg-white">
        <div className="container-standard">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/chef/profile.jpg"
                alt="Chef Angie preparing traditional cuisine"
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div>
              <p className="font-script text-2xl text-coral mb-2">Why Choose</p>
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-ocean-dark mb-8">
                Chef Angie?
              </h2>

              <div className="space-y-6">
                {whyChoose.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-teal" fill="currentColor" viewBox="0 0 20 20">
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

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button variant="primary" size="lg" asChild>
                  <a href="tel:+254706310918">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call Now
                  </a>
                </Button>
                <Button variant="secondary" size="lg" asChild>
                  <a href="https://wa.me/254706310918" target="_blank" rel="noopener noreferrer">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Private Chef Section */}
      <section id="chef-prive" className="section-padding bg-seafoam">
        <div className="container-standard">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="font-script text-2xl text-coral mb-2">Private Chef Service</p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-ocean-dark mb-6">
              Your Personal Chef Experience
            </h2>
            <p className="font-body text-lg text-gray-warm">
              Transform your villa or apartment into a private restaurant.
              Chef Angie will prepare a customized menu just for you and your guests,
              handling everything from shopping to cooking to cleanup.
            </p>
          </div>

          {/* Pricing Table */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-teal text-white p-6 text-center">
                <h3 className="font-heading text-2xl font-semibold">Daily Rates</h3>
                <p className="text-white/80 text-sm mt-1">Price per day based on number of guests</p>
              </div>
              <div className="divide-y divide-gray-light">
                {[
                  { guests: '1-9 guests', price: '3,500 KES' },
                  { guests: '10-15 guests', price: '5,000 KES' },
                  { guests: '16-21 guests', price: '6,000 KES' },
                  { guests: '22-27 guests', price: '7,000 KES' },
                  { guests: '28-33 guests', price: '8,000 KES' },
                  { guests: '35+ guests', price: 'Contact us' },
                ].map((tier) => (
                  <div key={tier.guests} className="flex justify-between items-center p-4 hover:bg-sand-light transition-colors">
                    <span className="font-ui text-ocean-dark">{tier.guests}</span>
                    <span className="font-ui font-semibold text-coral">{tier.price}</span>
                  </div>
                ))}
              </div>
              <div className="bg-sand-light p-4 text-center">
                <p className="text-sm text-gray-warm">
                  Prices include shopping, cooking, and cleanup. Food ingredients not included.
                </p>
              </div>
            </div>
          </div>

          {/* Occasions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-10">
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="text-3xl mb-2">🍽️</div>
              <h3 className="font-ui font-semibold text-ocean-dark mb-1">Romantic Dinners</h3>
              <p className="text-sm text-gray-warm">Intimate meals for two</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="text-3xl mb-2">👨‍👩‍👧‍👦</div>
              <h3 className="font-ui font-semibold text-ocean-dark mb-1">Family Gatherings</h3>
              <p className="text-sm text-gray-warm">Meals for the whole family</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="text-3xl mb-2">🎉</div>
              <h3 className="font-ui font-semibold text-ocean-dark mb-1">Special Events</h3>
              <p className="text-sm text-gray-warm">Birthdays, anniversaries</p>
            </div>
          </div>

          <div className="text-center">
            <Button variant="gradient" size="lg" asChild>
              <a href="https://wa.me/254706310918?text=Hello%20Chef%20Angie!%20I'm%20interested%20in%20your%20private%20chef%20service.%20Date:%20____%20Number%20of%20guests:%20____%20Occasion:%20____" target="_blank" rel="noopener noreferrer">
                Book Private Chef
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Catering Section */}
      <section id="traiteur" className="section-padding bg-white">
        <div className="container-standard">
          <div className="text-center max-w-3xl mx-auto">
            <p className="font-script text-2xl text-coral mb-2">Event Catering</p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-ocean-dark mb-6">
              Catering for Every Occasion
            </h2>
            <p className="font-body text-lg text-gray-warm mb-8">
              From corporate lunches to wedding receptions, we bring authentic Kenyan flavors
              to your event. Full service including setup, serving staff, and cleanup available.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {['Weddings', 'Corporate Events', 'Birthday Parties', 'Beach Events', 'Holiday Celebrations'].map((event) => (
                <span key={event} className="bg-coral/10 text-coral px-4 py-2 rounded-full font-ui text-sm">
                  {event}
                </span>
              ))}
            </div>

            <Button variant="gradient" size="lg" asChild>
              <a href="https://wa.me/254706310918?text=Hello%20Chef%20Angie!%20I'm%20interested%20in%20catering%20for%20an%20event.%20Event%20type:%20____%20Date:%20____%20Number%20of%20guests:%20____" target="_blank" rel="noopener noreferrer">
                Request a Quote
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-teal to-ocean-dark text-white">
        <div className="container-standard text-center px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-4">
            Ready to Taste the Difference?
          </h2>
          <p className="font-body text-lg text-white/80 max-w-xl mx-auto mb-8">
            Order your first meal or book a consultation today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="gradient" size="lg" asChild>
              <Link href="/cuisine/livraisons">Order Now</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-ocean-dark" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
