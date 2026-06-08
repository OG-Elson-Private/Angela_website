import { cn } from '@/lib/utils'
import { StarRatingDisplay } from './StarRating'
import { serviceLabels, type ServiceType } from '@/lib/validations/testimonial'

export interface TestimonialCardProps {
  name: string
  location?: string | null
  service: ServiceType
  rating: 1 | 2 | 3 | 4 | 5
  text: string
  createdAt: Date | string
  className?: string
}

// Service badge colors matching the design system
const serviceBadgeColors: Record<ServiceType, string> = {
  BIRYANI_FRIDAY: 'bg-coral/10 text-coral border-coral/20',
  PILAU_TUESDAY: 'bg-sunset/10 text-sunset border-sunset/20',
  PRIVATE_CHEF: 'bg-teal/10 text-teal border-teal/20',
  CATERING: 'bg-ocean-dark/10 text-ocean-dark border-ocean-dark/20',
  ACCOMMODATION: 'bg-seafoam text-teal border-teal/20',
  CONCIERGE: 'bg-teal/10 text-teal border-teal/20',
}

/**
 * Generate initials from a name
 */
function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

/**
 * Format date to relative time (e.g., "2 weeks ago")
 */
function formatRelativeDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 14) return '1 week ago'
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  if (diffDays < 60) return '1 month ago'
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
  if (diffDays < 730) return '1 year ago'
  return `${Math.floor(diffDays / 365)} years ago`
}

/**
 * Testimonial Card Component (Server Component)
 * Displays a single customer testimonial with:
 * - Avatar with initials
 * - Name and location
 * - Star rating
 * - Service badge
 * - Review text
 * - Relative date
 */
export function TestimonialCard({
  name,
  location,
  service,
  rating,
  text,
  createdAt,
  className,
}: TestimonialCardProps) {
  const initials = getInitials(name)
  const relativeDate = formatRelativeDate(createdAt)
  const serviceLabel = serviceLabels[service]
  const badgeColor = serviceBadgeColors[service]

  return (
    <article
      className={cn(
        'bg-white rounded-2xl border border-gray-light/50 p-6',
        'shadow-sm hover:shadow-md transition-shadow duration-300',
        className
      )}
    >
      {/* Header: Avatar, Name, Location */}
      <div className="flex items-start gap-4 mb-4">
        {/* Avatar with initials */}
        <div
          className="w-12 h-12 rounded-full bg-gradient-to-br from-teal to-seafoam flex items-center justify-center flex-shrink-0"
          aria-hidden="true"
        >
          <span className="text-white font-heading font-semibold text-lg">
            {initials}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          {/* Name */}
          <h3 className="font-heading font-semibold text-charcoal text-lg truncate">
            {name}
          </h3>
          {/* Location */}
          {location && (
            <p className="text-sm text-gray-warm font-body truncate">{location}</p>
          )}
        </div>
      </div>

      {/* Rating and Service Badge */}
      <div className="flex items-center justify-between mb-4">
        <StarRatingDisplay rating={rating} size="sm" />
        <span
          className={cn(
            'px-3 py-1 text-xs font-ui font-medium rounded-full border',
            badgeColor
          )}
        >
          {serviceLabel}
        </span>
      </div>

      {/* Review Text */}
      <p className="text-charcoal font-body text-base leading-relaxed mb-4 line-clamp-4">
        {text}
      </p>

      {/* Date */}
      <time
        dateTime={
          typeof createdAt === 'string'
            ? createdAt
            : createdAt.toISOString()
        }
        className="text-sm text-gray-warm font-body"
      >
        {relativeDate}
      </time>
    </article>
  )
}

export default TestimonialCard
