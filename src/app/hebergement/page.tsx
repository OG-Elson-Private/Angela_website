import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { StayCard } from '@/components/features/hebergement/StayCard'
import { StayListingSection } from '@/components/features/hebergement/StayListingSection'
import { TestimonialsCarousel } from '@/components/sections/TestimonialsCarousel'
import { fetchAggregateRating } from '@/lib/schema-helpers'
import { staysPageJsonLd, stayVideoJsonLd } from '@/lib/stay-schema'
import {
  stays,
  formatKes,
  lowestRateAcrossStays,
  whatsappUrl,
  GENERIC_BOOKING_URL,
  STAY_PHONE_DISPLAY,
  STAY_PHONE_TEL,
} from '@/data/stays'

export const revalidate = 300

export const metadata: Metadata = {
  alternates: {
    canonical: '/hebergement',
  },
  title: 'Places to Stay in Diani Beach | Holiday Rentals Near the Beach with Breakfast',
  description:
    "Choose your holiday rental in Diani Beach: Angie's air-conditioned studio with pool from 3,500 KES/night, or a bright one-bedroom apartment on Airport Road 4 minutes from the beach. Add Chef Angie's Welcome Breakfast for a 5-star morning.",
  openGraph: {
    title: 'Places to Stay in Diani Beach | Chef Angie',
    description: 'Hand-picked holiday rentals near the beach in Diani — studio with pool & AC, one-bedroom apartment near Trade Winds. From 3,500 KES/night.',
    type: 'website',
    url: 'https://www.chefangela.co.ke/hebergement',
    images: [{ url: '/api/og?page=stay', width: 1200, height: 630 }],
  },
}

const whyBookDirect = [
  { title: 'Best Price Guarantee', description: 'No middleman fees - save up to 20%' },
  { title: 'Flexible Booking', description: 'Easy changes and cancellations' },
  { title: 'Personal Service', description: 'Direct communication with Angie, your local host' },
  { title: 'Chef Service Available', description: 'Add private chef or breakfast to any stay' },
]

const BREAKFAST_ORDER_URL = whatsappUrl(
  "Hello Chef Angie! I'd like to order the Welcome Breakfast (500 KES per person) for my stay.\n\n- Which stay: ____\n- Date(s): ____\n- Delivery time (between 7am and 11am): ____\n- Number of people: ____\n\nMy choice:\n- Mahamri OR Chapati: ____\n- (Sausage and omelette + African tea included)"
)

const PACKAGE_URL = whatsappUrl(
  "Hello Chef Angie! I'm interested in the ALL-INCLUSIVE PACKAGE (8,000 KES/day).\n\nCheck-in: ____\nCheck-out: ____\nNumber of guests: ____\nDietary preferences: ____"
)

function CheckIcon({ className = 'w-4 h-4 text-coral flex-shrink-0' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  )
}

export default async function StayPage() {
  const aggregateRating = await fetchAggregateRating('accommodation')
  const featured = stays[0]
  const pageJsonLd = staysPageJsonLd(stays, { [featured.slug]: aggregateRating })
  const videoJsonLds = stays.map(stayVideoJsonLd).filter((node) => node !== null)
  const fromRate = lowestRateAcrossStays()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      {videoJsonLds.map((node, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}

      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/apartment/pool.jpg"
            alt="Swimming pool at one of Chef Angie's stays in Diani Beach"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ocean-dark/90 to-ocean-dark/50" />
        </div>

        <div className="relative container-standard px-4">
          <div className="max-w-2xl">
            <p className="font-script text-3xl text-coral mb-4">Hand-picked by Chef Angie</p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Places to Stay in Diani Beach
            </h1>
            <p className="font-body text-lg text-white/80 mb-8">
              Holiday rentals close to the beach, chosen and hosted by a local. Pick the stay that
              suits you, then add Chef Angie&apos;s breakfast or private chef service for a vacation
              that feels like home.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-white">
                <span className="font-ui font-semibold">{stays.length} stays</span>
                <span className="text-white/70 text-sm"> to choose from</span>
              </div>
              {fromRate !== null && (
                <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-white">
                  <span className="font-ui font-semibold">From {formatKes(fromRate)}</span>
                  <span className="text-white/70 text-sm"> / night</span>
                </div>
              )}
              <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-white">
                <span className="font-ui">📍 Diani Beach, Kenya</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="gradient" size="lg" asChild>
                <Link href="#stays">Browse the Stays</Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-ocean-dark" asChild>
                <a href={GENERIC_BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  Ask Angie on WhatsApp
                </a>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-ocean-dark" asChild>
                <Link href="#welcome-breakfast">+ Welcome Breakfast</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stays overview */}
      <section id="stays" aria-labelledby="stays-heading" className="section-padding bg-sand-light scroll-mt-20">
        <div className="container-standard">
          <div className="text-center mb-10 md:mb-14">
            <p className="font-script text-2xl text-coral mb-2">Choose Your Stay</p>
            <h2 id="stays-heading" className="font-heading text-3xl md:text-4xl font-semibold text-ocean-dark">
              Our Holiday Rentals in Diani
            </h2>
            <p className="font-body text-gray-warm mt-3 max-w-2xl mx-auto">
              Every stay is minutes from the beach and comes with Angie&apos;s local know-how.
              Book direct on WhatsApp for the best rate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {stays.map((stay, index) => (
              <StayCard key={stay.slug} stay={stay} priority={index === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* One detailed section per stay */}
      {stays.map((stay, index) => (
        <StayListingSection
          key={stay.slug}
          stay={stay}
          position={index + 1}
          tone={index % 2 === 0 ? 'white' : 'sand'}
        />
      ))}

      {/* Why Book Direct */}
      <section className="section-padding bg-seafoam">
        <div className="container-standard">
          <div className="text-center mb-10 md:mb-14">
            <p className="font-script text-2xl text-coral mb-2">Save More</p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-ocean-dark">
              Why Book Your Stay Direct?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyBookDirect.map((item) => (
              <div key={item.title} className="flex gap-4 bg-white rounded-2xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-teal rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-ui font-semibold text-ocean-dark mb-1">{item.title}</h3>
                  <p className="font-body text-gray-warm text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button variant="gradient" size="lg" asChild>
              <a href={GENERIC_BOOKING_URL} target="_blank" rel="noopener noreferrer">
                Book Now on WhatsApp
              </a>
            </Button>
            <p className="text-sm text-gray-warm mt-4">
              Or call: <a href={`tel:${STAY_PHONE_TEL}`} className="text-teal hover:underline">{STAY_PHONE_DISPLAY}</a>
            </p>
          </div>
        </div>
      </section>

      {/* Add-on — Welcome Breakfast */}
      <section id="welcome-breakfast" className="section-padding bg-sand-light scroll-mt-20">
        <div className="container-standard px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
              <Image
                src="/images/hebergement/angela_breakfast_hero.jpg"
                alt="Chef Angie holding a Kenyan breakfast tray with chapati, vegetable omelette, mandazi, sausages and a cup of Kenyan chai"
                width={1072}
                height={1344}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full h-auto max-w-md mx-auto md:mx-0 rounded-2xl shadow-lg object-cover"
              />
            </div>

            <div className="flex flex-col justify-center text-center md:text-left">
              <p className="font-script text-2xl text-coral mb-2">Add-on</p>
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-ocean-dark mb-4">
                Wake up to Chef Angie&apos;s Welcome Breakfast
              </h2>
              <p className="font-body text-lg text-gray-warm">
                Start your Diani morning the local way. A handmade breakfast, prepared by Chef Angie and served right at your stay between <span className="font-semibold text-ocean-dark">7am and 11am</span>. Exact time arranged the evening before.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mt-12 md:mt-16">
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="font-ui font-semibold text-ocean-dark mb-4">What&apos;s in your breakfast</h3>
              <ul className="space-y-3">
                {['Mahamri or chapati', 'Sausage and omelette', 'African tea'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-warm">
                    <CheckIcon className="w-5 h-5 text-coral flex-shrink-0" />
                    <span className="font-body">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm italic text-ocean-dark/70">
                Custom requests welcome — arrange in advance.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8">
              <div className="text-center mb-6">
                <p className="font-script text-xl text-coral mb-2">Add-on Price</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-heading text-5xl font-bold text-ocean-dark">500</span>
                  <span className="text-gray-warm font-ui">KES</span>
                </div>
                <p className="text-sm text-gray-warm mt-2">per person, on top of your room booking</p>
              </div>

              <div className="bg-sand-light rounded-xl p-4 mb-6">
                <h4 className="font-ui font-semibold text-ocean-dark mb-2 text-sm flex items-center gap-2">
                  <span aria-hidden="true">ℹ️</span> Good to Know
                </h4>
                <ul className="text-sm text-gray-warm space-y-1">
                  <li>• Order at booking or anytime before your stay</li>
                  <li>• Time arranged the evening before (7am–11am window)</li>
                  <li>• Available every day during your stay</li>
                </ul>
              </div>

              <Button variant="gradient" size="lg" className="w-full" asChild>
                <a href={BREAKFAST_ORDER_URL} target="_blank" rel="noopener noreferrer">
                  Add Welcome Breakfast
                </a>
              </Button>

              <p className="text-center text-xs text-gray-warm mt-3">
                Or call: <a href={`tel:${STAY_PHONE_TEL}`} className="text-teal hover:underline">{STAY_PHONE_DISPLAY}</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* All-Inclusive Package */}
      <section id="package" className="py-16 md:py-20 bg-gradient-to-br from-ocean-dark via-ocean-dark to-teal-dark relative overflow-hidden scroll-mt-20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-coral/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal/10 rounded-full blur-3xl" />

        <div className="container-standard px-4 relative">
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
              Based on {featured.name}; ask for a quote with any other stay.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="font-ui font-semibold text-white mb-6 text-center text-lg">
                  Your Package Includes
                </h3>

                <div className="mb-6 pb-6 border-b border-white/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-teal rounded-full flex items-center justify-center">
                      <span className="text-xl" aria-hidden="true">🏠</span>
                    </div>
                    <h4 className="font-ui font-semibold text-white text-lg">Accommodation</h4>
                  </div>
                  <ul className="space-y-2">
                    {[
                      `${featured.name} (studio with pool)`,
                      'Air conditioning year-round',
                      'Free WiFi & parking',
                      '10 min walk to beach',
                      '24/7 security',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-white/80 text-sm">
                        <CheckIcon />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-coral rounded-full flex items-center justify-center">
                      <span className="text-xl" aria-hidden="true">👨‍🍳</span>
                    </div>
                    <h4 className="font-ui font-semibold text-white text-lg">Personal Chef Service</h4>
                  </div>
                  <ul className="space-y-2">
                    {[
                      '3 home-cooked meals daily',
                      'Custom menu planning',
                      'Delivered to your door',
                      'Flexible timing',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-white/80 text-sm">
                        <CheckIcon />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h3 className="font-ui font-semibold text-white mb-4 text-center">Daily Meals Included</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { icon: '🌅', meal: 'Breakfast', time: 'Morning' },
                    { icon: '☀️', meal: 'Lunch', time: 'Midday' },
                    { icon: '🌙', meal: 'Dinner', time: 'Evening' },
                  ].map((item) => (
                    <div key={item.meal} className="text-center">
                      <div className="text-4xl mb-2" aria-hidden="true">{item.icon}</div>
                      <p className="font-ui font-semibold text-white text-sm">{item.meal}</p>
                      <p className="text-white/60 text-xs">{item.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-coral to-sunset p-6 text-center">
                <p className="text-white/90 text-sm font-ui uppercase tracking-wide mb-1">All-Inclusive Package</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-heading text-5xl font-bold text-white">8,000</span>
                  <span className="text-white/80 font-ui">KES/day</span>
                </div>
                <p className="text-white/80 text-sm mt-2">Stay + Chef Service</p>
              </div>

              <div className="p-6">
                <div className="bg-teal/10 rounded-xl p-4 mb-6">
                  <h4 className="font-ui font-semibold text-teal-dark mb-3 text-center">You Save with the Package!</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-warm">
                      <span>Studio alone</span>
                      <span>3,500 - 5,000 KES</span>
                    </div>
                    <div className="flex justify-between text-gray-warm">
                      <span>Chef service alone</span>
                      <span>3,500 KES</span>
                    </div>
                    <div className="border-t border-teal/20 pt-2 mt-2 flex justify-between font-semibold text-gray-warm">
                      <span>If booked separately</span>
                      <span className="line-through">7,000 - 8,500 KES</span>
                    </div>
                    <div className="flex justify-between font-bold text-teal text-base">
                      <span>Package price</span>
                      <span>8,000 KES</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6 bg-sand-light rounded-xl p-4">
                  <h4 className="font-ui font-semibold text-ocean-dark mb-2 text-sm flex items-center gap-2">
                    <span aria-hidden="true">ℹ️</span> Good to Know
                  </h4>
                  <p className="text-sm text-gray-warm">
                    Food ingredients are at your charge. You choose the menu, we provide
                    the shopping list, and you cover the ingredients cost.
                  </p>
                </div>

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

                <Button variant="gradient" size="lg" className="w-full" asChild>
                  <a href={PACKAGE_URL} target="_blank" rel="noopener noreferrer">
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
            Ready to Book Your Stay in Diani?
          </h2>
          <p className="font-body text-lg text-white/80 max-w-xl mx-auto mb-8">
            Tell Angie your dates and which stay you prefer. Book direct and save.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="gradient" size="lg" asChild>
              <a href={GENERIC_BOOKING_URL} target="_blank" rel="noopener noreferrer">
                Book on WhatsApp
              </a>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-ocean-dark" asChild>
              <a href={`tel:${STAY_PHONE_TEL}`}>Call {STAY_PHONE_DISPLAY}</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
