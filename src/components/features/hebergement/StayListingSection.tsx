import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'
import {
  formatKes,
  stayBookingUrl,
  STAY_PHONE_DISPLAY,
  STAY_PHONE_TEL,
  type StayListing,
} from '@/data/stays'
import { StayGallery } from './StayGallery'
import { VideoSection } from './VideoSection'

interface StayListingSectionProps {
  stay: StayListing
  position: number
  tone: 'white' | 'sand'
}

function CheckIcon({ className = 'w-5 h-5 text-coral flex-shrink-0' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  )
}

/** Full detail block for one stay: gallery, rates, amenities, location, rules. */
export function StayListingSection({ stay, position, tone }: StayListingSectionProps) {
  const headingId = `${stay.slug}-heading`
  const hasRates = stay.pricing.seasons.length > 0
  const cardTone = tone === 'sand' ? 'bg-white' : 'bg-sand-light'

  return (
    <section
      id={stay.slug}
      aria-labelledby={headingId}
      className={cn('section-padding scroll-mt-20', tone === 'sand' ? 'bg-sand-light' : 'bg-white')}
    >
      <div className="container-standard">
        {/* Header */}
        <div className="mb-8 max-w-3xl md:mb-10">
          <p className="mb-2 font-script text-2xl text-coral">
            Stay {position} · {stay.type}
          </p>
          <h2 id={headingId} className="mb-4 font-heading text-3xl font-semibold text-ocean-dark md:text-4xl">
            {stay.name}
          </h2>
          <p className="mb-5 font-body text-lg text-gray-warm">{stay.description}</p>
          <ul className="flex flex-wrap gap-2" aria-label="Quick facts">
            {[
              `👥 ${stay.maxGuests} guests`,
              `🛏️ ${stay.bedrooms} bedroom`,
              `🏖️ ${stay.beachDistance} to the beach`,
              ...stay.highlights.map((item) => `✓ ${item}`),
            ].map((fact) => (
              <li key={fact} className="rounded-full border border-gray-light bg-white px-3 py-1.5 font-ui text-sm text-ocean-dark">
                {fact}
              </li>
            ))}
          </ul>
        </div>

        {/* Gallery + booking card */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-3">
            <StayGallery images={stay.images} stayName={stay.name} />
          </div>

          <aside className="lg:col-span-2 lg:sticky lg:top-24" aria-label={`Rates and booking for ${stay.name}`}>
            <div className="rounded-2xl border border-gray-light bg-white p-6 shadow-lg md:p-8">
              <h3 className="mb-6 text-center font-heading text-2xl font-semibold text-ocean-dark">
                Rates & Booking
              </h3>

              <div className="mb-6 space-y-4">
                {hasRates ? (
                  stay.pricing.seasons.map((season) => (
                    <div
                      key={season.label}
                      className={cn(
                        'flex items-center justify-between rounded-xl p-4',
                        season.highlighted ? 'border-2 border-coral bg-coral/10' : 'bg-sand-light'
                      )}
                    >
                      <div>
                        <p className="font-ui font-semibold text-ocean-dark">{season.label}</p>
                        <p className="text-sm text-gray-warm">{season.period}</p>
                      </div>
                      <div className="text-right">
                        <p className={cn('font-heading text-2xl font-bold', season.highlighted ? 'text-coral' : 'text-teal')}>
                          {formatKes(season.price)}
                        </p>
                        <p className="text-sm text-gray-warm">per night</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-xl bg-sand-light p-4">
                    <p className="font-ui font-semibold text-ocean-dark">Rates on request</p>
                    <p className="text-sm text-gray-warm">
                      Send Angie your dates and she will confirm the nightly rate and availability.
                    </p>
                  </div>
                )}
                {stay.pricing.note && (
                  <p className="text-center text-xs text-gray-warm">{stay.pricing.note}</p>
                )}
              </div>

              <div className="space-y-3">
                <Button variant="gradient" size="lg" className="w-full" asChild>
                  <a href={stayBookingUrl(stay)} target="_blank" rel="noopener noreferrer">
                    Book on WhatsApp
                  </a>
                </Button>
                {stay.booking.bookingComUrl && (
                  <Button variant="outline" size="md" className="w-full" asChild>
                    <a href={stay.booking.bookingComUrl} target="_blank" rel="noopener noreferrer">
                      Book on Booking.com
                    </a>
                  </Button>
                )}
                {stay.booking.airbnbUrl && (
                  <Button variant="outline" size="md" className="w-full" asChild>
                    <a href={stay.booking.airbnbUrl} target="_blank" rel="noopener noreferrer">
                      Book on Airbnb
                    </a>
                  </Button>
                )}
              </div>

              <p className="mt-4 text-center text-sm text-gray-warm">
                Or call:{' '}
                <a href={`tel:${STAY_PHONE_TEL}`} className="text-teal hover:underline">
                  {STAY_PHONE_DISPLAY}
                </a>
              </p>
            </div>
          </aside>
        </div>

        {/* Amenities */}
        <div className="mt-12 md:mt-16">
          <h3 className="mb-6 font-heading text-2xl font-semibold text-ocean-dark md:text-3xl">
            Amenities
          </h3>
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {stay.amenities.map((amenity) => (
              <li key={amenity.name} className={cn('rounded-xl p-5 text-center', cardTone)}>
                <div className="mb-2 text-3xl" aria-hidden="true">{amenity.icon}</div>
                <p className="mb-1 font-ui font-semibold text-ocean-dark">{amenity.name}</p>
                <p className="font-body text-sm text-gray-warm">{amenity.description}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Location + house rules */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:mt-16 lg:grid-cols-2 lg:gap-12">
          <div>
            <h3 className="mb-6 font-heading text-2xl font-semibold text-ocean-dark md:text-3xl">
              Location
            </h3>
            {stay.map && (
              <div className="mb-6 aspect-video overflow-hidden rounded-2xl">
                <iframe
                  src={stay.map.embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={stay.map.title}
                />
              </div>
            )}
            <p className="mb-4 font-body text-gray-warm">
              <span aria-hidden="true">📍 </span>
              {stay.area}
            </p>
            <ul className="space-y-1">
              {stay.nearby.map((place) => (
                <li key={place.name} className="flex items-center justify-between border-b border-gray-light py-2">
                  <span className="font-body text-charcoal">{place.name}</span>
                  <span className="font-ui text-sm text-gray-warm">{place.distance}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 font-heading text-2xl font-semibold text-ocean-dark md:text-3xl">
              House Rules
            </h3>
            <div className={cn('rounded-2xl p-6 md:p-8', cardTone)}>
              <ul className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
                {stay.houseRules.map((rule) => (
                  <li key={rule.label} className="flex justify-between gap-4 border-b border-gray-light py-2">
                    <span className="font-ui text-gray-warm">{rule.label}</span>
                    <span className="text-right font-ui font-medium text-ocean-dark">{rule.value}</span>
                  </li>
                ))}
              </ul>
              {stay.breakfastAddon && (
                <p className="mt-4 flex items-start gap-2 font-body text-sm text-gray-warm">
                  <CheckIcon />
                  <span>
                    Chef Angie&apos;s Welcome Breakfast can be added to this stay.{' '}
                    <a href="#welcome-breakfast" className="text-teal hover:underline">See the add-on</a>
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Video tour (optional) */}
        {stay.video && (
          <VideoSection
            id={`${stay.slug}-video`}
            headingId={`${stay.slug}-video-heading`}
            videoId={stay.video.youtubeId}
            title={stay.video.title}
            intro={stay.video.intro}
            className="mt-12 md:mt-16"
          />
        )}
      </div>
    </section>
  )
}
