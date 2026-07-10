'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

export type Dish = {
  src: string
  caption: string
  alt: string
}

function ChevronIcon({ dir, className = 'w-6 h-6' }: { dir: 'left' | 'right'; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {dir === 'left' ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
    </svg>
  )
}

function CloseIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

export function DishGallery({ dishes }: { dishes: Dish[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const isOpen = openIndex !== null

  const close = useCallback(() => setOpenIndex(null), [])
  const prev = useCallback(() => setOpenIndex((i) => (i !== null && i > 0 ? i - 1 : i)), [])
  const next = useCallback(
    () => setOpenIndex((i) => (i !== null && i < dishes.length - 1 ? i + 1 : i)),
    [dishes.length]
  )

  // Keyboard navigation + scroll lock while the lightbox is open
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, close, prev, next])

  const current = openIndex !== null ? dishes[openIndex] : null
  const atStart = openIndex === 0
  const atEnd = openIndex !== null && openIndex === dishes.length - 1

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

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.caption}
          onClick={close}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ocean-dark/90 backdrop-blur-sm p-4 sm:p-8"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <CloseIcon />
          </button>

          {!atStart && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              aria-label="Previous photo"
              className="absolute left-2 sm:left-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            >
              <ChevronIcon dir="left" />
            </button>
          )}

          {!atEnd && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              aria-label="Next photo"
              className="absolute right-2 sm:right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            >
              <ChevronIcon dir="right" />
            </button>
          )}

          <figure
            className="relative flex w-full max-w-4xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[68vh] w-full">
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                quality={90}
                className="object-contain"
                priority
              />
            </div>
            <figcaption className="mt-4 text-center">
              <p className="font-ui text-base font-semibold text-white">{current.caption}</p>
              <p className="mt-1 text-xs text-white/60">
                {(openIndex ?? 0) + 1} / {dishes.length}
              </p>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  )
}
