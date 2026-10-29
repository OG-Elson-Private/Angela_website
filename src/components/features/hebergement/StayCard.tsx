import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { formatKes, lowestRate, stayBookingUrl, type StayListing } from '@/data/stays'

interface StayCardProps {
  stay: StayListing
  priority?: boolean
}

/** Overview card for the stays grid. Links down to the full listing section. */
export function StayCard({ stay, priority = false }: StayCardProps) {
  const from = lowestRate(stay)
  const detailHref = `#${stay.slug}`

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <Link href={detailHref} className="relative block aspect-[4/3] overflow-hidden" aria-label={`See details of ${stay.name}`}>
        <Image
          src={stay.cover.src}
          alt={stay.cover.alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {stay.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-coral px-3 py-1 font-ui text-xs font-bold uppercase tracking-wider text-white shadow-lg">
            {stay.badge}
          </span>
        )}
        <span className="absolute bottom-4 right-4 rounded-full bg-white/95 px-4 py-2 font-ui text-sm font-semibold text-ocean-dark shadow-lg">
          {from !== null ? `From ${formatKes(from)} / night` : 'Rates on request'}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <p className="mb-2 font-body text-sm uppercase tracking-wider text-teal">{stay.type}</p>
        <h3 className="mb-2 font-heading text-2xl font-semibold text-ocean-dark md:text-3xl">{stay.name}</h3>
        <p className="mb-4 font-ui text-sm text-gray-warm">
          <span aria-hidden="true">📍 </span>
          {stay.area} · {stay.beachDistance} to the beach
        </p>
        <p className="mb-5 font-body text-gray-warm">{stay.tagline}</p>

        <ul className="mb-6 flex flex-wrap gap-2" aria-label="Key features">
          <li className="rounded-full bg-sand-light px-3 py-1 font-ui text-xs font-semibold text-ocean-dark">
            {stay.maxGuests} guests
          </li>
          <li className="rounded-full bg-sand-light px-3 py-1 font-ui text-xs font-semibold text-ocean-dark">
            {stay.bedrooms} bedroom
          </li>
          {stay.highlights.map((item) => (
            <li key={item} className="rounded-full bg-sand-light px-3 py-1 font-ui text-xs font-semibold text-ocean-dark">
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-3 sm:flex-row">
          <Button variant="primary" size="md" className="w-full sm:flex-1" asChild>
            <Link href={detailHref}>View Details</Link>
          </Button>
          <Button variant="outline" size="md" className="w-full sm:flex-1" asChild>
            <a href={stayBookingUrl(stay)} target="_blank" rel="noopener noreferrer">
              Book on WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </article>
  )
}
