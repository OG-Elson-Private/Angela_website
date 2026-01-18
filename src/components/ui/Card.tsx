import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'service' | 'testimonial' | 'food' | 'accommodation'
  hoverable?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hoverable = false, children, ...props }, ref) => {
    const baseStyles = 'rounded-2xl overflow-hidden'

    const variants = {
      default: 'bg-white shadow-card border border-gray-light',
      service: 'bg-white shadow-card border border-gray-light border-t-4 border-t-teal',
      testimonial: 'bg-seafoam border-l-4 border-l-coral',
      food: 'bg-white shadow-card',
      accommodation: 'bg-white shadow-lg rounded-3xl',
    }

    const hoverStyles = hoverable
      ? 'transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1.5'
      : ''

    const serviceHoverStyles = variant === 'service' && hoverable
      ? 'hover:border-t-coral'
      : ''

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          hoverStyles,
          serviceHoverStyles,
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

// Card Header
type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('p-6 pb-0', className)}
      {...props}
    />
  )
)

CardHeader.displayName = 'CardHeader'

// Card Content
type CardContentProps = React.HTMLAttributes<HTMLDivElement>

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('p-6', className)}
      {...props}
    />
  )
)

CardContent.displayName = 'CardContent'

// Card Footer
type CardFooterProps = React.HTMLAttributes<HTMLDivElement>

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('p-6 pt-0', className)}
      {...props}
    />
  )
)

CardFooter.displayName = 'CardFooter'

// Card Image
interface CardImageProps extends React.HTMLAttributes<HTMLDivElement> {
  aspectRatio?: '16/9' | '4/3' | '3/2' | '1/1'
}

const CardImage = forwardRef<HTMLDivElement, CardImageProps>(
  ({ className, aspectRatio = '4/3', children, ...props }, ref) => {
    const aspectRatios = {
      '16/9': 'aspect-video',
      '4/3': 'aspect-[4/3]',
      '3/2': 'aspect-[3/2]',
      '1/1': 'aspect-square',
    }

    return (
      <div
        ref={ref}
        className={cn(
          'relative overflow-hidden',
          aspectRatios[aspectRatio],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

CardImage.displayName = 'CardImage'

export { Card, CardHeader, CardContent, CardFooter, CardImage }
