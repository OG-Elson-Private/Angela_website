'use client'

import { useEffect, useCallback } from 'react'
import Image from 'next/image'

export interface LightboxImage {
  src: string
  alt: string
  caption?: string
}

export interface LightboxProps {
  images: LightboxImage[]
  /** Index of the open image, or null when closed. */
  index: number | null
  onChange: (index: number | null) => void
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

/**
 * Full-screen image viewer. Controlled: the parent owns the open index.
 * Handles keyboard navigation (Esc / arrows) and locks body scroll while open.
 */
export function Lightbox({ images, index, onChange }: LightboxProps) {
  const isOpen = index !== null
  const total = images.length

  const close = useCallback(() => onChange(null), [onChange])
  const prev = useCallback(() => {
    if (index !== null && index > 0) onChange(index - 1)
  }, [index, onChange])
  const next = useCallback(() => {
    if (index !== null && index < total - 1) onChange(index + 1)
  }, [index, total, onChange])

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

  if (index === null) return null
  const current = images[index]
  if (!current) return null

  const caption = current.caption ?? current.alt
  const atStart = index === 0
  const atEnd = index === total - 1

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={caption}
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
          <p className="font-ui text-base font-semibold text-white">{caption}</p>
          <p className="mt-1 text-xs text-white/60">
            {index + 1} / {total}
          </p>
        </figcaption>
      </figure>
    </div>
  )
}
