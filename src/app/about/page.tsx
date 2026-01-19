import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui'

export const metadata: Metadata = {
  title: 'About Chef Angie | Your Host in Diani Beach',
  description: 'Meet Chef Angie - passionate cook, gracious host, and your guide to authentic Kenyan coastal cuisine in Diani Beach. Discover her story and what makes her cooking special.',
  openGraph: {
    title: 'About Chef Angie | Diani Beach',
    description: 'Meet the chef behind the flavors - authentic Kenyan cuisine with love',
    images: ['/images/og/og-about.jpg'],
  },
}

const values = [
  {
    icon: '⭐',
    title: '4+ Years Experience',
    description: 'Trusted by hundreds of satisfied customers in Diani Beach and beyond.',
  },
  {
    icon: '❤️',
    title: 'Made with Love',
    description: 'Every dish is prepared with passion and care, using recipes passed down through generations.',
  },
  {
    icon: '🌿',
    title: 'Fresh & Local',
    description: 'I source the freshest ingredients from local markets and trusted suppliers.',
  },
  {
    icon: '🤝',
    title: 'Personal Touch',
    description: 'Direct communication and personalized service for every guest.',
  },
]

const journey = [
  {
    year: 'Early Years',
    title: 'A Kitchen Full of Aromas',
    description: 'Growing up on the Kenyan coast, I spent countless hours in my grandmother\'s kitchen, learning the secrets of traditional Swahili cuisine.',
  },
  {
    year: 'The Passion',
    title: 'From Hobby to Calling',
    description: 'What started as cooking for family and friends grew into a passion for sharing authentic flavors with visitors from around the world.',
  },
  {
    year: 'Training',
    title: 'Baking & Pastry Skills',
    description: 'I completed baking training, adding delicious pastries, cakes, and sweet treats to my culinary repertoire.',
  },
  {
    year: 'Today',
    title: 'Chef Angie\'s Kitchen',
    description: 'Now I combine my love for cooking with hospitality, offering savory dishes, fresh pastries, and a beautiful apartment for guests to experience Diani Beach.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-ocean-dark">
        <div className="container-standard px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <p className="font-script text-3xl text-coral mb-4">Nice to Meet You</p>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                I&apos;m Chef Angie
              </h1>
              <p className="font-body text-lg text-white/80 mb-8">
                Welcome! I&apos;m Angela, but everyone calls me Chef Angie. I&apos;m a passionate cook
                trained in baking, a proud Kenyan, and your host here in beautiful Diani Beach.
                From savory traditional dishes to delicious pastries, I&apos;m here to make your
                culinary experience unforgettable.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="gradient" size="lg" asChild>
                  <Link href="/cuisine">Explore My Cuisine</Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-ocean-dark" asChild>
                  <Link href="/hebergement">See the Apartment</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/chef/profile.jpg"
                  alt="Chef Angie"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-coral text-white p-6 rounded-xl shadow-lg hidden md:block">
                <p className="font-heading text-4xl font-bold">4+</p>
                <p className="font-ui text-sm uppercase tracking-wide">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Story Section */}
      <section className="section-padding bg-sand-light">
        <div className="container-standard">
          <div className="text-center mb-12">
            <p className="font-script text-2xl text-coral mb-2">My Journey</p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-ocean-dark">
              From My Grandmother&apos;s Kitchen to Yours
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {journey.map((item, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-24 text-right">
                    <span className="font-ui font-semibold text-coral text-sm uppercase tracking-wide">
                      {item.year}
                    </span>
                  </div>
                  <div className="relative pb-8">
                    <div className="absolute left-0 top-2 w-3 h-3 bg-teal rounded-full" />
                    {index < journey.length - 1 && (
                      <div className="absolute left-[5px] top-5 w-0.5 h-full bg-teal/30" />
                    )}
                    <div className="pl-8">
                      <h3 className="font-heading text-xl font-semibold text-ocean-dark mb-2">
                        {item.title}
                      </h3>
                      <p className="font-body text-gray-warm">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-white">
        <div className="container-standard">
          <div className="text-center mb-12">
            <p className="font-script text-2xl text-coral mb-2">What I Believe In</p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-ocean-dark">
              My Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-sand-light rounded-2xl p-8 text-center">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="font-heading text-xl font-semibold text-ocean-dark mb-3">
                  {value.title}
                </h3>
                <p className="font-body text-gray-warm text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 bg-seafoam">
        <div className="container-standard text-center px-4">
          <blockquote className="max-w-3xl mx-auto">
            <p className="font-script text-3xl md:text-4xl text-ocean-dark mb-6">
              &ldquo;Food is not just about taste - it&apos;s about memories, connection, and
              bringing people together. That&apos;s what I strive to create with every meal.&rdquo;
            </p>
            <footer className="font-ui text-teal font-semibold">— Chef Angie</footer>
          </blockquote>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-16 bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737]">
        <div className="container-standard text-center px-4">
          <div className="max-w-2xl mx-auto text-white">
            <p className="font-script text-2xl text-white/90 mb-3">See My Creations</p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-4">
              4 Years of Delicious Moments
            </h2>
            <p className="font-body text-lg text-white/80 mb-8">
              Want to see what I&apos;ve been cooking? Follow me on Instagram for daily inspiration,
              behind-the-scenes moments, and all my latest dishes!
            </p>
            <a
              href="https://instagram.com/chef.angie002"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-full font-ui font-semibold hover:scale-105 transition-transform shadow-lg"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              @chef.angie002
            </a>
          </div>
        </div>
      </section>

      {/* What I Offer Section */}
      <section className="section-padding bg-white">
        <div className="container-standard">
          <div className="text-center mb-12">
            <p className="font-script text-2xl text-coral mb-2">What I Offer</p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-ocean-dark">
              Two Ways to Experience Diani
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Cuisine Card */}
            <div className="group relative rounded-2xl overflow-hidden shadow-lg">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/dishes/chicken-biryani.jpg"
                  alt="Chef Angie's Cuisine"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-dark/90 via-ocean-dark/40 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <p className="font-script text-xl text-coral mb-2">Taste</p>
                <h3 className="font-heading text-2xl font-bold mb-3">My Cuisine</h3>
                <p className="font-body text-white/80 mb-4">
                  From weekly Biryani and Pilau deliveries to private chef services -
                  experience authentic Kenyan coastal flavors.
                </p>
                <Button variant="gradient" asChild>
                  <Link href="/cuisine">Explore Menu</Link>
                </Button>
              </div>
            </div>

            {/* Stay Card */}
            <div className="group relative rounded-2xl overflow-hidden shadow-lg">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/apartment/pool.jpg"
                  alt="Chef Angie's Apartment"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-dark/90 via-ocean-dark/40 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <p className="font-script text-xl text-coral mb-2">Stay</p>
                <h3 className="font-heading text-2xl font-bold mb-3">My Apartment</h3>
                <p className="font-body text-white/80 mb-4">
                  A beautiful apartment with pool, just minutes from Diani Beach.
                  Your perfect coastal retreat.
                </p>
                <Button variant="gradient" asChild>
                  <Link href="/hebergement">View Apartment</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 bg-ocean-dark text-white">
        <div className="container-standard text-center px-4">
          <p className="font-script text-2xl text-coral mb-2">Let&apos;s Connect</p>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-4">
            Ready to Experience Chef Angie&apos;s Hospitality?
          </h2>
          <p className="font-body text-lg text-white/80 max-w-xl mx-auto mb-8">
            Whether you want to order delicious food or book a stay, I&apos;m here to help.
            Reach out and let&apos;s make your Diani Beach experience special!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="gradient" size="lg" asChild>
              <a
                href="https://wa.me/254719635944?text=Hello%20Chef%20Angie!%20I%20would%20like%20to%20know%20more%20about%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on WhatsApp
              </a>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-ocean-dark" asChild>
              <Link href="/contact">Contact Page</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
