import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { TestimonialCard } from '@/components/ui/TestimonialCard'
import { prisma } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Ask Angela | Diani Insider — Best Deals in Diani Beach',
  description:
    'Need something in Diani? Angela finds you the best deal on car rentals, restaurants, activities, shopping and more. Born and raised in Diani.',
  openGraph: {
    title: 'Ask Angela | Your Diani Insider',
    description: 'We find you the best deal possible in Diani.',
    type: 'website',
    url: 'https://www.chefangela.co.ke/ask-angela',
    images: [{ url: '/api/og?page=ask-angela', width: 1200, height: 630 }],
  },
}

// Re-check for approved Diani Insider reviews periodically
export const revalidate: number = 60

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://www.chefangela.co.ke/ask-angela',
  name: "Chef Angie's Diani Insider",
  description:
    'Local insider service in Diani Beach — best deals on car rentals, restaurants, activities, shopping, and more.',
  serviceType: 'Local concierge and information service',
  areaServed: {
    '@type': 'Place',
    name: 'Diani Beach, Kwale County, Kenya',
  },
  provider: {
    '@type': 'LocalBusiness',
    name: 'Chef Angela',
    url: 'https://www.chefangela.co.ke',
    telephone: '+254706310918',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Diani Beach',
      addressRegion: 'Kwale County',
      addressCountry: 'KE',
    },
  },
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceUrl: 'https://wa.me/254706310918',
    name: 'WhatsApp',
  },
}

const steps = [
  {
    number: '1️⃣',
    title: 'Tell Angela what you need',
    description:
      'Send a WhatsApp with your request — anything from transport to a specific dish, a service, or an experience.',
  },
  {
    number: '2️⃣',
    title: 'She finds the best option',
    description:
      'From her trusted network of local partners, Angela comes back with the best match — quality first, fair price always.',
  },
  {
    number: '3️⃣',
    title: 'You confirm — she handles the rest',
    description:
      'Just say yes. Angela coordinates everything so you can enjoy your stay stress-free.',
  },
]

const services = [
  {
    icon: '🚗',
    title: 'Transport & Rentals',
    description: 'Car rentals, tuk-tuks, taxis, airport transfers, day trips.',
  },
  {
    icon: '🍽️',
    title: 'Restaurants & Food',
    description:
      'Best local spots for the cuisine you crave, reservations, fresh fish & produce addresses.',
  },
  {
    icon: '🌊',
    title: 'Activities & Experiences',
    description: 'Safari, dhow trips, snorkeling, kitesurf, spa & massage.',
  },
  {
    icon: '🛍️',
    title: 'Shopping & Errands',
    description: 'Groceries, pharmacy, local markets, specific products you need to find.',
  },
  {
    icon: '🏠',
    title: 'Home Services',
    description: 'Cleaning, laundry, fresh flowers, bottled water delivery.',
  },
  {
    icon: '💆',
    title: 'Wellness & Health',
    description: 'Massage, yoga, doctor referrals, wellness products.',
  },
  {
    icon: '🎉',
    title: 'Special Occasions',
    description: 'Anniversary, birthday, romantic setup, surprise planning.',
  },
  {
    icon: '➕',
    title: 'Anything Else?',
    description: "If it's available in Diani, Angela can find it for you.",
  },
]

const advantages = [
  {
    icon: '🏝️',
    title: 'Born and raised in Diani',
    description:
      "Angela didn't move here — she grew up in Diani. She knows the area well and has built genuine relationships with the right people over the years.",
  },
  {
    icon: '🛡️',
    title: 'Hand-picked local network',
    description:
      'Every partner is personally vetted by Angela. No tourist traps, no overpricing, no surprises.',
  },
  {
    icon: '⚡',
    title: 'Fast WhatsApp response',
    description: 'Messages answered within minutes during Diani business hours.',
  },
  {
    icon: '🇰🇪',
    title: 'The real Diani',
    description:
      'You get the local experience — the side of Diani only locals usually access.',
  },
]

const WHATSAPP_HERO =
  'https://wa.me/254706310918?text=Hi%20Angela!%20Can%20you%20help%20me%20find%20something%20in%20Diani%3F'
const WHATSAPP_CTA =
  'https://wa.me/254706310918?text=Hi%20Angela!%20Can%20you%20help%20me%20find%20what%20I%27m%20looking%20for%20in%20Diani%3F'

/**
 * Fetch approved Diani Insider testimonials (Server Component).
 * Wrapped in try/catch so the build never fails when the database is
 * unreachable (e.g. local build without DATABASE_URL).
 */
async function getConciergeTestimonials() {
  try {
    return await prisma.testimonial.findMany({
      where: {
        service: 'CONCIERGE',
        status: 'APPROVED',
      },
      orderBy: { approvedAt: 'desc' },
      take: 3,
    })
  } catch {
    return []
  }
}

export default async function AskAngelaPage() {
  const conciergeTestimonials = await getConciergeTestimonials()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Section 1 — Hero */}
      <section className="relative py-24 md:py-32 bg-ocean-dark">
        <div className="container-standard px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <p className="font-script text-3xl text-coral mb-4">Need something in Diani?</p>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Just Ask Angela
              </h1>
              <p className="font-body text-lg text-white/80 mb-8">
                From car rentals and the best places to eat the cuisine you crave, to where to
                find the products you need — Angela connects you to the real Diani.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="gradient" size="lg" asChild>
                  <a href={WHATSAPP_HERO} target="_blank" rel="noopener noreferrer">
                    💬 Chat with Angela on WhatsApp
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-ocean-dark"
                  asChild
                >
                  <Link href="#services">Browse services ↓</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/chef/profile.jpg"
                  alt="Chef Angela — your Diani insider"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-coral text-white p-6 rounded-xl shadow-lg hidden md:block">
                <p className="font-heading text-2xl font-bold">Diani Insider</p>
                <p className="font-ui text-sm uppercase tracking-wide">Born &amp; raised here</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — How it works */}
      <section className="section-padding bg-sand-light">
        <div className="container-standard px-4">
          <div className="text-center mb-12">
            <p className="font-script text-2xl text-coral mb-2">How it works</p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-ocean-dark">
              Three simple steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.title} className="bg-white rounded-2xl p-8 text-center shadow-sm">
                <div className="text-4xl mb-4">{step.number}</div>
                <h3 className="font-heading text-xl font-semibold text-ocean-dark mb-3">
                  {step.title}
                </h3>
                <p className="font-body text-sm text-gray-warm">{step.description}</p>
              </div>
            ))}
          </div>

          <p className="font-body text-sm text-gray-warm italic text-center mt-8 max-w-2xl mx-auto">
            Service finding is free. A small service fee may apply for complex or time-sensitive
            requests.
          </p>
        </div>
      </section>

      {/* Section 3 — What can Angela find for you? */}
      <section id="services" className="section-padding bg-white">
        <div className="container-standard px-4">
          <div className="text-center mb-12">
            <p className="font-script text-2xl text-coral mb-2">Services</p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-ocean-dark">
              What can Angela find for you?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div key={service.title} className="bg-sand-light rounded-2xl p-6">
                <div className="text-4xl mb-3">{service.icon}</div>
                <h3 className="font-heading text-xl font-semibold text-ocean-dark mb-2">
                  {service.title}
                </h3>
                <p className="font-body text-sm text-gray-warm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — Why Angela? */}
      <section className="section-padding bg-ocean-dark">
        <div className="container-standard px-4">
          <div className="text-center mb-12">
            <p className="font-script text-2xl text-coral mb-2">Why Angela</p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white">
              The local advantage
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage) => (
              <div key={advantage.title} className="text-center">
                <div className="text-5xl mb-4">{advantage.icon}</div>
                <h3 className="font-heading text-xl font-semibold text-white mb-3">
                  {advantage.title}
                </h3>
                <p className="font-body text-sm text-white/80">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 — Testimonials (only renders if approved Diani Insider reviews exist) */}
      {conciergeTestimonials.length > 0 && (
        <section className="section-padding bg-sand-light">
          <div className="container-standard px-4">
            <div className="text-center mb-12">
              <p className="font-script text-2xl text-coral mb-2">What guests say</p>
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-ocean-dark">
                Trusted by visitors and locals
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {conciergeTestimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  name={testimonial.name}
                  location={testimonial.location}
                  service={testimonial.service}
                  rating={testimonial.rating as 1 | 2 | 3 | 4 | 5}
                  text={testimonial.text}
                  createdAt={testimonial.createdAt}
                />
              ))}
            </div>

            <div className="text-center">
              <Button variant="outline" size="lg" asChild>
                <Link href="/testimonials?service=CONCIERGE">Read all reviews</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Section 6 — Final CTA */}
      <section className="section-padding bg-gradient-to-br from-coral to-ocean-dark">
        <div className="container-standard px-4 text-center">
          <p className="font-script text-2xl md:text-3xl text-white/90 mb-2">
            Ready to enjoy Diani like a local?
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-8">
            Angela is one WhatsApp message away.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-coral"
              asChild
            >
              <a href={WHATSAPP_CTA} target="_blank" rel="noopener noreferrer">
                💬 Message Angela on WhatsApp
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/60 text-white/80 hover:bg-white hover:text-coral"
              asChild
            >
              <a href="tel:+254706310918">📞 Call +254 706 310 918</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
