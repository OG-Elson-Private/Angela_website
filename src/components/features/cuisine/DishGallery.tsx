'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Lightbox } from '@/components/ui/Lightbox'

export type Dish = {
  src: string
  caption: string
  alt: string
}

export function DishGallery({ dishes }: { dishes: Dish[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {dishes.map((dish, i) => (
          <button
            key={dish.src}
            type="button"
            onClick={() => setOpenIndex(i)}
            aria-label={`View ${dish.caption} full size`}
            className="group relative aspect-square rounded-xl overflow-hidden shadow-md cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2"
          >
            <Image
              src={dish.src}
              alt={dish.alt}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              quality={80}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ocean-dark/85 via-ocean-dark/30 to-transparent p-3 pt-8 text-left">
              <p className="font-ui text-sm font-semibold text-white">{dish.caption}</p>
            </div>
          </button>
        ))}
      </div>

      <Lightbox images={dishes} index={openIndex} onChange={setOpenIndex} />
    </>
  )
}
