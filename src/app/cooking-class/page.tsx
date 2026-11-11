import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { TestimonialsCarousel } from '@/components/sections/TestimonialsCarousel'
import { fetchAggregateRating } from '@/lib/schema-helpers'
import {
  COOKING_CLASS_BOOKING_URL,
  COOKING_CLASS_MAX_GUESTS,
  COOKING_CLASS_MAX_HOURS,
  COOKING_CLASS_NAME,
  COOKING_CLASS_PRICE_KES,
  COOKING_CLASS_SPICES,
  COOKING_CLASS_URL,
  classFacts,
  classFaq,
  howItWorks,
  whatYouDo,
} from '@/data/cooking-class'

export const revalidate = 300

const priceLabel = `${COOKING_CLASS_PRICE_KES.toLocaleString('en-US')} KES`

export const metadata: Metadata = {
  alternates: {
    canonical: '/cooking-class',
  },
  title: 'Cooking Class in Diani Beach | Swahili Coast Cooking with Chef Angela',
  description: `Private, hands-on Swahili cooking class in Diani Beach. Cook a full menu from starter to dessert with Chef Angela at your villa, from ${priceLabel} per person. Up to ${COOKING_CLASS_MAX_GUESTS} guests, beginners welcome.`,
  keywords: ['cooking class diani', 'swahili cooking class', 'cooking lesson diani beach', 'kenyan cooking class', 'chef angela cooking class'],
  openGraph: {
    title: 'Swahili Coast Cooking Class in Diani Beach',
    description: `Cook a full Swahili menu with Chef Angela at your villa. Private class, up to ${COOKING_CLASS_MAX_GUESTS} guests, from ${priceLabel} per person.`,
    type: 'website',
    url: COOKING_CLASS_URL,
    images: [{ url: '/api/og?page=cooking-class', width: 1200, height: 630 }],
  },
}

const serviceJsonLd = {
  '@type': 'Service',
  '@id': COOKING_CLASS_URL,
  name: COOKING_CLASS_NAME,
  serviceType: 'Cooking class',
  description:
    'Private, hands-on cooking class in Diani Beach. Chef Angela designs a full Swahili coast menu from starter to dessert and you cook every dish together, wherever you are staying. Ingredients paid separately on a cost breakdown.',
  url: COOKING_CLASS_URL,
  image: 'https://www.chefangela.co.ke/images/cuisine/cooking-class-angela.jpg',
  availableLanguage: ['en', 'sw'],
  areaServed: {
    '@type': 'Place',
    name: 'Diani Beach, Kwale County, Kenya',
  },
  provider: {
    '@type': 'Person',
    name: 'Chef Angie',
    jobTitle: 'Private Chef',
    url: 'https://www.chefangela.co.ke/about',
    telephone: '+254706310918',
  },
  offers: {
    '@type': 'Offer',
    price: String(COOKING_CLASS_PRICE_KES),
    priceCurrency: 'KES',
    availability: 'https://schema.org/InStock',
    url: COOKING_CLASS_URL,
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: String(COOKING_CLASS_PRICE_KES),
      priceCurrency: 'KES',
      unitText: 'per person (ingredients not included)',
    },
  },
}

const faqJsonLd = {
  '@type': 'FAQPage',
  '@id': `${COOKING_CLASS_URL}#faq`,
  mainEntity: classFaq.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
}

function CheckIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  )
}

function WhatsAppIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export default async function CookingClassPage() {
  const aggregateRating = await fetchAggregateRating('cooking-class')
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [aggregateRating ? { ...serviceJsonLd, aggregateRating } : serviceJsonLd, faqJsonLd],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative py-24 md:py-32 bg-ocean-dark overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <Image
            src="/images/cuisine/cooking-class-angela.jpg"
            alt="Chef Angela cooking Swahili coast dishes in a Diani Beach kitchen"
            fill
            className="object-cover object-[center_35%]"
            sizes="100vw"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-dark/80 to-ocean-dark" />

        <div className="relative container-standard text-center text-white px-4">
          <p className="font-script text-3xl md:text-4xl text-coral mb-4">Cook with Chef Angela</p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Swahili Coast Cooking Class in Diani Beach
          </h1>
          <p className="font-body text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8">
            A private, hands-on class at your villa or holiday home. Cook a full Swahili menu,
            from starter to dessert, with Chef Angela, then sit down and enjoy it together.
          </p>

          <ul className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10" aria-label="Class at a glance">
            {[
              `${priceLabel} per person`,
              `Up to ${COOKING_CLASS_MAX_GUESTS} guests`,
              `Up to ${COOKING_CLASS_MAX_HOURS} hours`,
              'Beginners welcome',
            ].map((chip) => (
              <li
                key={chip}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 font-ui text-sm"
              >
                {chip}
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="gradient" size="lg" className="w-full sm:w-auto" asChild>
              <a href={COOKING_CLASS_BOOKING_URL} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="w-5 h-5 mr-2" />
                Book Your Class on WhatsApp
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-ocean-dark"
              asChild
            >
              <Link href="#how-it-works">How It Works</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What you'll do */}
      <section className="section-padding bg-white" aria-labelledby="what-you-do-heading">
        <div className="container-standard">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/chef/profile.jpg"
                alt="Chef Angela, private chef and cooking class host in Diani Beach"
                fill
                className="object-cover object-[center_25%]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div>
              <p className="font-script text-2xl text-coral mb-2">The Experience</p>
              <h2 id="what-you-do-heading" className="font-heading text-3xl md:text-4xl font-semibold text-ocean-dark mb-6">
                What You Will Cook and Learn
              </h2>
              <p className="font-body text-lg text-gray-warm mb-8">
                Chef Angela has been sharing the flavours of the Swahili coast for five years, cooking
                in villas and holiday homes across Diani. In this class she designs a full menu for
                your group and you cook every dish together.
              </p>

              <ul className="space-y-4">
                {whatYouDo.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="w-8 h-8 rounded-full bg-teal/10 text-teal flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckIcon className="w-4 h-4" />
                    </span>
                    <span className="font-body text-gray-warm">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <p className="font-ui text-sm font-semibold text-ocean-dark uppercase tracking-wide mb-3">
                  Spices you will get to know
                </p>
                <ul className="flex flex-wrap gap-2" aria-label="Key spices">
                  {COOKING_CLASS_SPICES.map((spice) => (
                    <li key={spice} className="bg-coral/10 text-coral px-4 py-2 rounded-full font-ui text-sm">
                      {spice}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Class details */}
      <section className="section-padding bg-sand-light" aria-labelledby="details-heading">
        <div className="container-standard">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="font-script text-2xl text-coral mb-2">Good to Know</p>
            <h2 id="details-heading" className="font-heading text-3xl md:text-4xl font-semibold text-ocean-dark mb-4">
              Class Details
            </h2>
            <p className="font-body text-gray-warm">
              Everything is arranged around your group and where you are staying.
            </p>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {classFacts.map((fact) => (
              <div key={fact.label} className="bg-white rounded-2xl p-6 shadow-card">
                <dt className="font-ui text-xs font-semibold uppercase tracking-wider text-teal mb-2">{fact.label}</dt>
                <dd>
                  <p className="font-heading text-xl font-semibold text-ocean-dark">{fact.value}</p>
                  {fact.detail && <p className="font-body text-sm text-gray-warm mt-1">{fact.detail}</p>}
                </dd>
              </div>
            ))}
          </dl>

          <div className="max-w-3xl mx-auto mt-10 bg-white rounded-2xl p-6 md:p-8 shadow-card border-l-4 border-coral">
            <h3 className="font-heading text-xl font-semibold text-ocean-dark mb-3">About the ingredients</h3>
            <p className="font-body text-gray-warm">
              The class fee covers Angela&apos;s time, the menu, the teaching and the recipes. Ingredients
              are not included: after you book, Angela sends a cost breakdown for the menu, you pay it in
              advance, she does the shopping and shares the receipts. Any difference is settled on the day.
              Drinks are not included, and special Swahili spices can be added on request.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="section-padding bg-white scroll-mt-20" aria-labelledby="how-heading">
        <div className="container-standard">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="font-script text-2xl text-coral mb-2">Simple Booking</p>
            <h2 id="how-heading" className="font-heading text-3xl md:text-4xl font-semibold text-ocean-dark mb-4">
              How It Works
            </h2>
            <p className="font-body text-gray-warm">
              Four steps from your first message to the meal on the table.
            </p>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step, index) => (
              <li key={step.title} className="relative bg-seafoam rounded-2xl p-6 md:p-8">
                <span className="w-12 h-12 rounded-full bg-teal text-white font-heading text-xl font-semibold flex items-center justify-center mb-4">
                  {index + 1}
                </span>
                <h3 className="font-ui text-lg font-semibold text-ocean-dark mb-2">{step.title}</h3>
                <p className="font-body text-sm text-gray-warm">{step.description}</p>
              </li>
            ))}
          </ol>

          <div className="text-center mt-12">
            <Button variant="gradient" size="lg" className="w-full sm:w-auto" asChild>
              <a href={COOKING_CLASS_BOOKING_URL} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="w-5 h-5 mr-2" />
                Send Angela Your Dates
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-sand-light" aria-labelledby="faq-heading">
        <div className="container-standard">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="font-script text-2xl text-coral mb-2">Questions</p>
            <h2 id="faq-heading" className="font-heading text-3xl md:text-4xl font-semibold text-ocean-dark">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {classFaq.map((faq) => (
              <details key={faq.question} className="group bg-white rounded-xl shadow-sm open:shadow-card">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-5 font-ui font-semibold text-ocean-dark min-h-[56px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded-xl">
                  <span>{faq.question}</span>
                  <svg
                    className="w-5 h-5 text-teal flex-shrink-0 transition-transform duration-200 group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="font-body text-gray-warm px-5 pb-5">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <TestimonialsCarousel
        category="cooking-class"
        title="What Class Guests Say"
        subtitle="Cooking Class Reviews"
        hideWhenEmpty
      />

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-teal to-ocean-dark text-white">
        <div className="container-standard text-center px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-4">
            Ready to Cook the Swahili Coast?
          </h2>
          <p className="font-body text-lg text-white/80 max-w-xl mx-auto mb-8">
            Tell Angela your dates, your group size and where you are staying. She takes care of the rest.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="gradient" size="lg" className="w-full sm:w-auto" asChild>
              <a href={COOKING_CLASS_BOOKING_URL} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="w-5 h-5 mr-2" />
                Book on WhatsApp
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-ocean-dark"
              asChild
            >
              <Link href="/cuisine">See Private Chef Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
