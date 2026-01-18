import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui'

interface DishCardProps {
  name: string
  description: string
  price: number
  day: string
  includes: string[]
  image: string
  imageAlt: string
  orderMessage: string
}

function DishCard({
  name,
  description,
  price,
  day,
  includes,
  image,
  imageAlt,
  orderMessage,
}: DishCardProps) {
  const whatsappUrl = `https://wa.me/254706310918?text=${encodeURIComponent(orderMessage)}`

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Day Badge */}
        <div className="absolute top-4 left-4 bg-teal text-white px-3 py-1 rounded-full font-ui text-xs font-semibold uppercase tracking-wide">
          Every {day}
        </div>
        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-coral text-white px-4 py-2 rounded-full font-ui font-bold">
          {price} KES
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-heading text-xl md:text-2xl font-semibold text-ocean-dark mb-2">
          {name}
        </h3>
        <p className="font-body text-gray-warm text-sm mb-4">{description}</p>

        {/* Includes */}
        <div className="flex flex-wrap gap-2 mb-4">
          {includes.map((item) => (
            <span
              key={item}
              className="bg-seafoam text-teal-dark text-xs font-ui px-2 py-1 rounded"
            >
              + {item}
            </span>
          ))}
        </div>

        <Button variant="gradient" size="md" className="w-full" asChild>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            Order on WhatsApp
          </a>
        </Button>
      </div>
    </div>
  )
}

export function WeeklySpecials() {
  const dishes: DishCardProps[] = [
    {
      name: 'Chicken Biryani',
      description: 'Fragrant basmati rice layered with tender chicken, aromatic spices, and slow-cooked to perfection.',
      price: 550,
      day: 'Friday',
      includes: ['Banana', 'Fresh Salad'],
      image: '/images/dishes/chicken-biryani.jpg',
      imageAlt: 'Authentic Chicken Biryani by Chef Angie',
      orderMessage: 'Hello Chef Angie! I would like to order Chicken Biryani for Friday delivery. My details: Name: ___ Location: ___ Quantity: ___',
    },
    {
      name: 'Beef Biryani',
      description: 'Rich and savory beef biryani with perfectly spiced rice and melt-in-your-mouth meat.',
      price: 500,
      day: 'Friday',
      includes: ['Banana', 'Fresh Salad'],
      image: '/images/dishes/beef-biryani.jpg',
      imageAlt: 'Delicious Beef Biryani by Chef Angie',
      orderMessage: 'Hello Chef Angie! I would like to order Beef Biryani for Friday delivery. My details: Name: ___ Location: ___ Quantity: ___',
    },
    {
      name: 'Beef Pilau',
      description: 'Traditional Swahili pilau with fragrant spices, tender beef, and fluffy pilau rice.',
      price: 450,
      day: 'Tuesday',
      includes: ['Kachumbari'],
      image: '/images/dishes/beef-pilau.jpg',
      imageAlt: 'Traditional Beef Pilau by Chef Angie',
      orderMessage: 'Hello Chef Angie! I would like to order Beef Pilau for Tuesday delivery. My details: Name: ___ Location: ___ Quantity: ___',
    },
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container-standard">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="font-script text-2xl md:text-3xl text-coral mb-2">Fresh & Delicious</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-ocean-dark mb-4">
            This Week&apos;s Menu
          </h2>
          <p className="font-body text-lg text-gray-warm max-w-2xl mx-auto">
            Order before Thursday for Friday delivery. Order before Monday for Tuesday delivery.
            Delivery available in Diani, Ukunda, Galu, and Tiwi.
          </p>
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {dishes.map((dish) => (
            <DishCard key={dish.name} {...dish} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Button variant="outline" size="lg" asChild>
            <Link href="/cuisine/livraisons">View Full Menu</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
