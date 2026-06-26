import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Family Feast Delivery Diani Beach | Biryani Friday & Pilau Tuesday',
  description: 'Family Feast delivery in Diani Beach — Biryani every Friday and Pilau every Tuesday. From 5 people, pre-order 24h in advance. Fresh Kenyan cuisine delivered to Diani Beach and Ukunda.',
  openGraph: {
    title: 'Family Feast Delivery Diani Beach | Chef Angie',
    description: 'Weekly Family Feast delivery in Diani Beach — Biryani Friday & Pilau Tuesday (from 5 people)',
    type: 'website',
    url: 'https://www.chefangela.co.ke/cuisine/livraisons',
    images: ['/images/og/og-delivery.jpg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FoodService',
  '@id': 'https://www.chefangela.co.ke/cuisine/livraisons',
  name: 'Chef Angie Food Delivery',
  description: 'Weekly food delivery in Diani Beach. Biryani every Friday and Pilau every Tuesday. Fresh authentic Kenyan cuisine delivered to your door.',
  url: 'https://www.chefangela.co.ke/cuisine/livraisons',
  telephone: '+254706310918',
  email: 'liyayiangela20@gmail.com',
  image: 'https://www.chefangela.co.ke/images/dishes/chicken-biryani.jpg',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Diani Beach',
    addressRegion: 'Kwale County',
    addressCountry: 'KE',
  },
  areaServed: ['Diani Beach', 'Ukunda'],
  serviceType: 'Food Delivery',
  hasMenu: {
    '@type': 'Menu',
    name: 'Weekly Delivery Menu',
    eligibleQuantity: { '@type': 'QuantitativeValue', minValue: 5, unitText: 'people' },
    hasMenuSection: [
      {
        '@type': 'MenuSection',
        name: 'Biryani Friday',
        description: 'Family Feast — every Friday, pre-order at least 24h in advance, minimum 5 people',
        hasMenuItem: [
          {
            '@type': 'MenuItem',
            name: 'Chicken Biryani',
            description: 'Fragrant basmati rice with tender chicken, aromatic spices, saffron. Includes banana, salad, kachumbari.',
            offers: {
              '@type': 'Offer',
              price: '550',
              priceCurrency: 'KES',
            },
          },
          {
            '@type': 'MenuItem',
            name: 'Beef Biryani',
            description: 'Rich biryani with melt-in-your-mouth beef, traditional Swahili spices. Includes banana, salad, kachumbari.',
            offers: {
              '@type': 'Offer',
              price: '500',
              priceCurrency: 'KES',
            },
          },
        ],
      },
      {
        '@type': 'MenuSection',
        name: 'Pilau Tuesday',
        description: 'Family Feast — every Tuesday, pre-order at least 24h in advance, minimum 5 people',
        hasMenuItem: [
          {
            '@type': 'MenuItem',
            name: 'Beef Pilau',
            description: 'Traditional Swahili pilau with fragrant spices, tender beef, fluffy rice. Includes kachumbari, salad.',
            offers: {
              '@type': 'Offer',
              price: '450',
              priceCurrency: 'KES',
            },
          },
        ],
      },
    ],
  },
}

const biryaniDishes = [
  {
    name: 'Chicken Biryani',
    price: 550,
    description: 'Fragrant basmati rice layered with tender chicken pieces, slow-cooked with aromatic spices, saffron, and caramelized onions.',
    includes: ['Banana', 'Fresh Salad', 'Kachumbari'],
    image: '/images/dishes/chicken-biryani.jpg',
    badge: 'Most Popular',
  },
  {
    name: 'Beef Biryani',
    price: 500,
    description: 'Rich and savory biryani with melt-in-your-mouth beef, infused with traditional Swahili spices and perfectly cooked rice.',
    includes: ['Banana', 'Fresh Salad', 'Kachumbari'],
    image: '/images/dishes/beef-biryani.jpg',
    badge: null,
  },
]

const pilauDish = {
  name: 'Beef Pilau',
  price: 450,
  description: 'Traditional Swahili pilau with fragrant spices, tender beef cubes, and fluffy pilau rice cooked to perfection in a rich, aromatic broth.',
  includes: ['Kachumbari', 'Fresh Salad'],
  image: '/images/dishes/beef-pilau.jpg',
}

const deliveryAreas = ['Diani Beach', 'Ukunda']

const orderSteps = [
  { step: 1, title: 'Choose Your Feast', description: 'Pick Biryani (Friday) or Pilau (Tuesday) — for 5 people or more' },
  { step: 2, title: 'Pre-order on WhatsApp', description: 'At least 24 hours before the delivery date' },
  { step: 3, title: 'Confirm Details', description: 'Share delivery location and time' },
  { step: 4, title: 'Enjoy Together', description: 'Fresh food delivered to your door' },
]

export default function LivraisonsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-ocean-dark">
        <div className="container-standard text-center text-white px-4">
          <p className="font-script text-3xl text-coral mb-4">Perfect for Sharing</p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Family Feast Delivery in Diani Beach
          </h1>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 bg-coral text-white px-5 py-2 rounded-full font-ui font-semibold text-base shadow-lg">
              <span className="text-xl">👥</span>
              <span>Minimum 5 people</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur border border-white/30 text-white px-5 py-2 rounded-full font-ui font-semibold text-base">
              <span className="text-xl">⏰</span>
              <span>Pre-order 24h ahead</span>
            </div>
          </div>
          <p className="font-body text-lg text-white/80 max-w-2xl mx-auto">
            Bring everyone together around Chef Angie&apos;s signature dishes. <span className="text-coral font-semibold">Biryani every Friday</span>, <span className="text-coral font-semibold">Pilau every Tuesday</span> — delivered to your villa, apartment, or accommodation in Diani Beach and Ukunda.
          </p>
        </div>
      </section>

      {/* Biryani Friday Section */}
      <section id="biryani" className="py-16 md:py-24 bg-[#1a1a2e] text-white">
        <div className="container-standard px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="font-script text-2xl text-coral mb-2">Every Friday</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold">Biryani Friday</h2>
            </div>
            <div className="bg-coral text-white px-5 py-2 rounded-full font-ui font-bold text-sm uppercase tracking-wide flex items-center gap-2">
              <span>👥</span>
              <span>Min 5 people · 24h ahead</span>
            </div>
          </div>

          {/* Dishes Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {biryaniDishes.map((dish) => (
              <div key={dish.name} className="bg-white/5 backdrop-blur rounded-2xl overflow-hidden border border-white/10">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover"
                  />
                  {dish.badge && (
                    <div className="absolute top-4 left-4 bg-coral text-white px-3 py-1 rounded-full text-xs font-ui font-semibold uppercase">
                      {dish.badge}
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white text-ocean-dark px-4 py-2 rounded-full font-ui font-bold">
                    {dish.price} KES
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-2xl font-semibold mb-3">{dish.name}</h3>
                  <p className="font-body text-white/70 mb-4">{dish.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {dish.includes.map((item) => (
                      <span key={item} className="bg-teal/20 text-teal-light px-3 py-1 rounded-full text-sm">
                        + {item}
                      </span>
                    ))}
                  </div>

                  <Button variant="gradient" size="md" className="w-full" asChild>
                    <a
                      href={`https://wa.me/254706310918?text=Hello%20Chef%20Angie!%20I%20would%20like%20to%20pre-order%20${encodeURIComponent(dish.name)}%20for%20Friday%20delivery.%0A%0ANumber%20of%20people%20(min%205):%20____%0ADelivery%20date:%20____%0ADelivery%20location:%20____%0ADelivery%20time:%20____`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Order {dish.name}
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Why You'll Love It */}
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h3 className="font-heading text-xl font-semibold mb-6 text-center">Why You&apos;ll Love Our Biryani</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: '🍚', text: 'Premium Basmati Rice' },
                { icon: '🌿', text: 'Fresh Local Spices' },
                { icon: '🍗', text: 'Quality Meat' },
                { icon: '❤️', text: 'Made with Love' },
              ].map((item) => (
                <div key={item.text} className="text-center">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <p className="font-ui text-sm text-white/80">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pilau Tuesday Section */}
      <section id="pilau" className="py-16 md:py-24 bg-sand-light">
        <div className="container-standard px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
            <div>
              <p className="font-script text-2xl text-coral mb-2">Every Tuesday</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-ocean-dark">Pilau Tuesday</h2>
            </div>
            <div className="bg-coral text-white px-5 py-2 rounded-full font-ui font-bold text-sm uppercase tracking-wide flex items-center gap-2">
              <span>👥</span>
              <span>Min 5 people · 24h ahead</span>
            </div>
          </div>

          {/* Pilau Card */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={pilauDish.image}
                alt={pilauDish.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 right-4 bg-coral text-white px-4 py-2 rounded-full font-ui font-bold text-lg">
                {pilauDish.price} KES
              </div>
            </div>

            <div>
              <h3 className="font-heading text-3xl font-semibold text-ocean-dark mb-4">{pilauDish.name}</h3>
              <p className="font-body text-lg text-gray-warm mb-6">{pilauDish.description}</p>

              <div className="flex flex-wrap gap-2 mb-8">
                {pilauDish.includes.map((item) => (
                  <span key={item} className="bg-teal/10 text-teal px-4 py-2 rounded-full font-ui">
                    + {item}
                  </span>
                ))}
              </div>

              {/* Why You'll Love It */}
              <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
                <h4 className="font-ui font-semibold text-ocean-dark mb-4">Why You&apos;ll Love It</h4>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    'Traditional Recipe',
                    'Aromatic Spices',
                    'Tender Beef',
                    'Perfect Portions',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-teal" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="font-body text-sm text-gray-warm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button variant="gradient" size="lg" className="w-full md:w-auto" asChild>
                <a
                  href={`https://wa.me/254706310918?text=Hello%20Chef%20Angie!%20I%20would%20like%20to%20pre-order%20Beef%20Pilau%20for%20Tuesday%20delivery.%0A%0ANumber%20of%20people%20(min%205):%20____%0ADelivery%20date:%20____%0ADelivery%20location:%20____%0ADelivery%20time:%20____`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Order Beef Pilau - {pilauDish.price} KES
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Couples & Solo redirect */}
      <section className="py-12 bg-white">
        <div className="container-standard px-4">
          <div className="max-w-2xl mx-auto bg-sand-light rounded-2xl p-8 text-center">
            <p className="font-script text-2xl text-coral mb-2">Travelling alone or as a couple?</p>
            <h3 className="font-heading text-xl font-semibold text-ocean-dark mb-4">
              Book a Private Chef Experience instead
            </h3>
            <p className="font-body text-gray-warm mb-6">
              For smaller parties, Chef Angie comes to your villa or apartment and cooks for you on site — the same signature flavours, served fresh at your table.
            </p>
            <Button variant="primary" size="md" asChild>
              <Link href="/cuisine">Discover Private Chef</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How to Order */}
      <section className="section-padding bg-white">
        <div className="container-standard">
          <div className="text-center mb-12">
            <p className="font-script text-2xl text-coral mb-2">Simple Process</p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-ocean-dark">
              How to Order Your Family Feast in Diani
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {orderSteps.map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-16 h-16 bg-teal text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="font-ui font-semibold text-ocean-dark mb-2">{step.title}</h3>
                <p className="font-body text-sm text-gray-warm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Areas */}
      <section className="py-12 bg-seafoam">
        <div className="container-standard text-center px-4">
          <h3 className="font-heading text-xl font-semibold text-ocean-dark mb-6">
            Food Delivery Areas
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {deliveryAreas.map((area) => (
              <span key={area} className="bg-white px-6 py-3 rounded-full font-ui text-ocean-dark shadow-sm">
                📍 {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-ocean-dark text-white">
        <div className="container-standard text-center px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-4">
            Ready to Plan Your Family Feast?
          </h2>
          <p className="font-body text-lg text-white/80 max-w-xl mx-auto mb-8">
            Pre-order at least 24h in advance, from 5 people. WhatsApp or call to lock your delivery in Diani Beach.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="gradient" size="lg" asChild>
              <a href="https://wa.me/254706310918" target="_blank" rel="noopener noreferrer">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Order on WhatsApp
              </a>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-ocean-dark" asChild>
              <a href="tel:+254706310918">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call +254 706 310 918
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
