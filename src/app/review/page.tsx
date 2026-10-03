import type { Metadata } from 'next'
import Link from 'next/link'
import { TestimonialForm } from '@/components/forms/TestimonialForm'
import { ServiceType } from '@/lib/validations/testimonial'

export const metadata: Metadata = {
  title: 'Leave a Review | Chef Angie',
  description:
    'Share your experience with Chef Angie. Leave a review about our Kenyan cuisine, private chef services, catering, or accommodation in Diani Beach.',
  robots: {
    index: false,
    follow: true,
  },
}

// Friendly URL slugs mapped to ServiceType values
const serviceSlugMap: Record<string, ServiceType> = {
  accommodation: 'ACCOMMODATION',
  stay: 'ACCOMMODATION',
  'private-chef': 'PRIVATE_CHEF',
  cuisine: 'PRIVATE_CHEF',
  cooking: 'PRIVATE_CHEF',
  chef: 'PRIVATE_CHEF',
  catering: 'CATERING',
  biryani: 'BIRYANI_FRIDAY',
  pilau: 'PILAU_TUESDAY',
}

/**
 * Resolve the optional ?service= query param to a ServiceType.
 * Accepts friendly slugs (e.g. "biryani") or exact ServiceType
 * values (case-insensitive). Returns undefined for anything else.
 */
function resolveServiceParam(
  value: string | string[] | undefined
): ServiceType | undefined {
  if (typeof value !== 'string') return undefined

  const slugMatch = serviceSlugMap[value.toLowerCase()]
  if (slugMatch) return slugMatch

  const upper = value.toUpperCase()
  return ServiceType.options.find((option) => option === upper)
}

interface ReviewPageProps {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default function ReviewPage({ searchParams }: ReviewPageProps) {
  const defaultService = resolveServiceParam(searchParams?.service)

  return (
    <main className="min-h-screen bg-cream/30">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-seafoam/30 to-cream/50">
        <div className="container-standard text-center">
          <p className="font-script text-2xl md:text-3xl text-coral mb-2">
            We&apos;d Love Your Feedback
          </p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-ocean-dark mb-6">
            Share Your Experience
          </h1>
          <p className="font-body text-lg text-gray-warm max-w-2xl mx-auto">
            Enjoyed a meal or a stay with Chef Angie? Leave a quick review
            below - it only takes a minute and helps other guests discover us.
          </p>
        </div>
      </section>

      {/* Review Form Section */}
      <section className="section-padding">
        <div className="container-standard">
          <div className="relative max-w-2xl mx-auto bg-white rounded-2xl border border-gray-light/50 shadow-sm p-6 md:p-10">
            <TestimonialForm defaultService={defaultService} />
          </div>

          {/* Back link */}
          <div className="max-w-2xl mx-auto mt-8 text-center">
            <Link
              href="/"
              className="font-ui text-sm font-medium text-teal hover:text-coral transition-colors inline-flex items-center gap-1"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Chef Angie
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
