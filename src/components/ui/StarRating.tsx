'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface StarRatingDisplayProps {
  rating: 1 | 2 | 3 | 4 | 5
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

// Display-only star rating (Server Component compatible)
export function StarRatingDisplay({ rating, size = 'md', className }: StarRatingDisplayProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  return (
    <div className={cn('flex items-center gap-0.5', className)} aria-label={`Rating: ${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={cn(
            sizes[size],
            star <= rating ? 'text-sunset fill-sunset' : 'text-gray-light fill-gray-light'
          )}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

interface StarRatingInputProps {
  value: number
  onChange: (rating: 1 | 2 | 3 | 4 | 5) => void
  size?: 'sm' | 'md' | 'lg'
  label?: string
  error?: string
  className?: string
}

// Interactive star rating input (Client Component)
export function StarRatingInput({
  value,
  onChange,
  size = 'md',
  label,
  error,
  className,
}: StarRatingInputProps) {
  const [hoverRating, setHoverRating] = useState<number>(0)

  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  }

  const handleClick = (rating: number) => {
    if (rating >= 1 && rating <= 5) {
      onChange(rating as 1 | 2 | 3 | 4 | 5)
    }
  }

  const displayRating = hoverRating || value

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <span className="block font-ui text-sm font-medium text-charcoal mb-2">
          {label}
        </span>
      )}
      <div
        className="flex items-center gap-1"
        role="radiogroup"
        aria-label={label || 'Rating'}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleClick(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className={cn(
              sizes[size],
              'transition-transform duration-150 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 rounded'
            )}
            aria-label={`${star} star${star > 1 ? 's' : ''}`}
            aria-checked={value === star}
            role="radio"
          >
            <svg
              className={cn(
                'w-full h-full transition-colors duration-150',
                star <= displayRating
                  ? 'text-sunset fill-sunset'
                  : 'text-gray-light fill-gray-light hover:text-sunset/50 hover:fill-sunset/50'
              )}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </button>
        ))}
      </div>
      {error && (
        <p className="mt-2 text-sm text-coral font-body" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
