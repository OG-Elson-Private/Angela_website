'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Lightbox } from '@/components/ui/Lightbox'
import { cn } from '@/lib/utils'
import type { StayImage } from '@/data/stays'

interface StayGalleryProps {
  images: StayImage[]
  stayName: string
}

const PREVIEW_COUNT = 5

/**
 * Photo grid for one stay: a large lead photo plus four thumbnails on
 * desktop, lead photo plus three on mobile. Every tile opens the lightbox.
 */
export function StayGallery({ images, stayName }: StayGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const preview = images.slice(0, PREVIEW_COUNT)
  const total = images.length

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 rounded-2xl overflow-hidden shadow-lg">
        {preview.map((image, i) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setOpenIndex(i)}
            aria-label={`Open photo ${i + 1} of ${total}: ${image.alt}`}
            className={cn(
              'group relative overflow-hidden bg-sand-light focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-coral',
              i === 0 ? 'col-span-2 row-span-2 aspect-[4/3]' : 'aspect-[4/3]',
              i === PREVIEW_COUNT - 1 && 'hidden md:block'
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={i === 0 ? '(max-width: 768px) 100vw, 40vw' : '(max-width: 768px) 50vw, 20vw'}
              quality={80}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setOpenIndex(0)}
        className="mt-3 inline-flex min-h-11 items-center gap-2 font-ui text-sm font-semibold text-teal hover:text-teal-dark hover:underline"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
        View all {total} photos of {stayName}
      </button>

      <Lightbox images={images} index={openIndex} onChange={setOpenIndex} />
    </div>
  )
}
