import { STAY_CONTACT_EMAIL, STAY_PHONE_TEL, type StayListing } from '@/data/stays'

const SITE_URL = 'https://www.chefangela.co.ke'
const STAY_PAGE_URL = `${SITE_URL}/hebergement`

interface AggregateRatingSchema {
  '@type': 'AggregateRating'
  ratingValue: string
  reviewCount: string
  bestRating: string
  worstRating: string
}

const WELCOME_BREAKFAST_OFFER = {
  '@type': 'Offer',
  name: 'Welcome Breakfast Add-on',
  description:
    'Breakfast served at your stay between 7am and 11am — mahamri or chapati, sausage and omelette, African tea. Time arranged the evening before.',
  price: '500',
  priceCurrency: 'KES',
  availability: 'https://schema.org/InStock',
  eligibleQuantity: { '@type': 'QuantitativeValue', unitText: 'per person' },
}

/** Schema.org LodgingBusiness node for one stay. */
export function lodgingJsonLd(stay: StayListing, aggregateRating?: AggregateRatingSchema | null) {
  const url = `${STAY_PAGE_URL}#${stay.slug}`

  const offers: Record<string, unknown>[] = stay.pricing.seasons.map((season) => ({
    '@type': 'Offer',
    name: `${season.label} Rate`,
    price: String(season.price),
    priceCurrency: 'KES',
    availability: 'https://schema.org/InStock',
  }))
  if (stay.breakfastAddon) offers.push(WELCOME_BREAKFAST_OFFER)

  return {
    '@type': 'LodgingBusiness',
    '@id': url,
    name: stay.name,
    description: stay.description,
    url,
    telephone: STAY_PHONE_TEL,
    email: STAY_CONTACT_EMAIL,
    image: `${SITE_URL}${stay.cover.src}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: stay.schema.streetAddress,
      addressLocality: 'Diani Beach',
      addressRegion: 'Kwale County',
      addressCountry: 'KE',
    },
    ...(stay.schema.geo && {
      geo: { '@type': 'GeoCoordinates', ...stay.schema.geo },
    }),
    ...(stay.schema.priceRange && { priceRange: stay.schema.priceRange }),
    ...(stay.schema.checkinTime && { checkinTime: stay.schema.checkinTime }),
    ...(stay.schema.checkoutTime && { checkoutTime: stay.schema.checkoutTime }),
    petsAllowed: false,
    amenityFeature: stay.amenities.map((amenity) => ({
      '@type': 'LocationFeatureSpecification',
      name: amenity.name,
      value: true,
    })),
    numberOfRooms: stay.bedrooms,
    occupancy: { '@type': 'QuantitativeValue', maxValue: stay.maxGuests },
    ...(offers.length > 0 && { offers }),
    ...(aggregateRating && { aggregateRating }),
  }
}

/** Page-level graph: every stay as a LodgingBusiness, listed in an ItemList. */
export function staysPageJsonLd(
  list: StayListing[],
  aggregateRatingBySlug: Partial<Record<string, AggregateRatingSchema | null>> = {}
) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ItemList',
        '@id': `${STAY_PAGE_URL}#stays`,
        name: 'Places to Stay in Diani Beach by Chef Angie',
        itemListElement: list.map((stay, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${STAY_PAGE_URL}#${stay.slug}`,
          name: stay.name,
        })),
      },
      ...list.map((stay) => lodgingJsonLd(stay, aggregateRatingBySlug[stay.slug])),
    ],
  }
}

/** VideoObject node for a stay that has a YouTube tour. */
export function stayVideoJsonLd(stay: StayListing) {
  if (!stay.video) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: stay.video.title,
    description: `Virtual tour of ${stay.name} in Diani Beach, Kenya. Book direct at chefangela.co.ke.`,
    thumbnailUrl: [`https://img.youtube.com/vi/${stay.video.youtubeId}/maxresdefault.jpg`],
    uploadDate: '2026-07-05T18:00:00+03:00',
    duration: 'PT1M30S',
    contentUrl: `https://www.youtube.com/watch?v=${stay.video.youtubeId}`,
    embedUrl: `https://www.youtube.com/embed/${stay.video.youtubeId}`,
    publisher: {
      '@type': 'Organization',
      name: 'Chef Angela Diani Beach',
      url: SITE_URL,
    },
  }
}
