import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui'

export function AboutPreview() {
  return (
    <section className="section-padding bg-sand-light">
      <div className="container-standard">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/chef/profile.jpg"
                alt="Chef Angie in her kitchen"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-coral/20 rounded-2xl -z-10" />
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-teal/20 rounded-2xl -z-10" />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <p className="font-script text-2xl md:text-3xl text-coral mb-4">
              Meet the Chef
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-ocean-dark mb-6">
              Chef Angie
            </h2>

            <blockquote className="font-body text-lg md:text-xl text-gray-warm italic border-l-4 border-coral pl-6 mb-6">
              &ldquo;Every dish I prepare carries the warmth of Kenyan hospitality and the stories of our rich culinary heritage.&rdquo;
            </blockquote>

            <p className="font-body text-gray-warm mb-4">
              Born and raised on the Kenyan coast, I&apos;ve spent over 4 years perfecting the art of Swahili cuisine.
              From the aromatic spices of biryani to the comfort of traditional pilau,
              each recipe is a journey through our vibrant culture.
            </p>

            <p className="font-body text-gray-warm mb-8">
              Beyond the kitchen, I welcome guests to my home in Diani Beach,
              where the same care and attention to detail goes into every stay.
            </p>

            <Button variant="outline" size="md" asChild>
              <Link href="/about">Learn My Story</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
