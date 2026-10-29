/**
 * Stay listings promoted on /hebergement.
 *
 * Every holiday rental Chef Angie offers or recommends lives here. The page,
 * the homepage card, and the JSON-LD are all derived from this single list,
 * so adding a stay means adding one entry (plus its photos under
 * /public/images/stays/<slug>/).
 */

export const STAY_WHATSAPP_NUMBER = '254706310918'
export const STAY_PHONE_TEL = '+254706310918'
export const STAY_PHONE_DISPLAY = '+254 706 310 918'
export const STAY_CONTACT_EMAIL = 'liyayiangela20@gmail.com'

export interface StayImage {
  src: string
  alt: string
}

export interface StaySeasonRate {
  label: string
  period: string
  price: number
  highlighted?: boolean
}

export interface StayAmenity {
  icon: string
  name: string
  description: string
}

export interface StayListing {
  slug: string
  name: string
  type: string
  tagline: string
  description: string
  badge?: string
  area: string
  beachDistance: string
  maxGuests: number
  bedrooms: number
  /** Short chips shown on the card and in the detail header. */
  highlights: string[]
  amenities: StayAmenity[]
  pricing: {
    seasons: StaySeasonRate[]
    note?: string
  }
  cover: StayImage
  images: StayImage[]
  video?: {
    youtubeId: string
    title: string
    intro: string
  }
  booking: {
    bookingComUrl?: string
    airbnbUrl?: string
  }
  map?: {
    embedUrl: string
    title: string
  }
  nearby: { name: string; distance: string }[]
  houseRules: { label: string; value: string }[]
  breakfastAddon: boolean
  schema: {
    streetAddress: string
    geo?: { latitude: number; longitude: number }
    priceRange?: string
    checkinTime?: string
    checkoutTime?: string
  }
}

/** Angie's compound near Kenya Power Office: shared by every stay located there. */
const COMPOUND_AREA = 'Near Kenya Power Office, Diani Beach'
const COMPOUND_MAP = {
  embedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d994.9!2d39.5756094!3d-4.2868396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x184047d6ec8f8b53%3A0xdeb39114145c126a!2sBstan%20Homes%20Diani%20at%20Blueswallow!5e0!3m2!1sen!2ske!4v1705600000000!5m2!1sen!2ske',
  title: 'Compound location - Bstan Homes Diani at Blueswallow',
}
const COMPOUND_GEO = { latitude: -4.2868396, longitude: 39.5756094 }
const COMPOUND_NEARBY = [
  { name: 'Diani Beach', distance: '10 min walk' },
  { name: 'Restaurants & Bars', distance: '5-10 min walk' },
  { name: 'Carrefour Supermarket', distance: '10 min walk' },
  { name: 'Ukunda Airstrip', distance: '15 min drive' },
  { name: 'Mombasa Airport', distance: '45 min drive' },
]

const studioGallery: StayImage[] = [
  { src: '/images/apartment/gallery/img1_pool.jpg', alt: 'Swimming pool at the studio compound in Diani Beach' },
  { src: '/images/apartment/gallery/IMG-20260117-WA0006.jpg', alt: 'Living space of the studio' },
  { src: '/images/apartment/gallery/IMG-20260117-WA0007.jpg', alt: 'Queen bed in the studio' },
  { src: '/images/apartment/gallery/IMG-20260117-WA0008.jpg', alt: 'Kitchenette with cooking essentials' },
  { src: '/images/apartment/gallery/IMG-20260117-WA0009.jpg', alt: 'Bathroom of the studio' },
  { src: '/images/apartment/gallery/img2_pool.jpg', alt: 'Pool area with sun loungers' },
  { src: '/images/apartment/gallery/img3_pool.jpg', alt: 'Pool and garden of the compound' },
  { src: '/images/apartment/gallery/IMG-20260117-WA0010.jpg', alt: 'View from the studio' },
  { src: '/images/apartment/gallery/IMG-20260117-WA0011.jpg', alt: 'Outdoor space of the studio' },
  { src: '/images/apartment/gallery/IMG-20260117-WA0012.jpg', alt: 'Interior detail of the studio' },
  { src: '/images/apartment/gallery/IMG-20260117-WA0013.jpg', alt: 'Room view inside the studio' },
  { src: '/images/apartment/gallery/IMG-20260117-WA0014.jpg', alt: 'Interior design of the studio' },
  { src: '/images/apartment/gallery/IMG-20260117-WA0015.jpg', alt: 'Comfortable corner of the studio' },
  { src: '/images/apartment/gallery/IMG-20260117-WA0016.jpg', alt: 'Amenity inside the studio' },
  { src: '/images/apartment/gallery/IMG-20260117-WA0017.jpg', alt: 'Living area of the studio' },
  { src: '/images/apartment/gallery/IMG-20260117-WA0018.jpg', alt: 'Relaxation spot at the studio' },
  { src: '/images/apartment/gallery/IMG-20260117-WA0019.jpg', alt: 'Exterior view of the studio property' },
]

const airportRoadGallery: StayImage[] = [
  { src: '/images/stays/airport-road-apartment/01-exterior.jpg', alt: 'White bungalow exterior of the one-bedroom apartment on Airport Road, Diani' },
  { src: '/images/stays/airport-road-apartment/02-living-room.jpg', alt: 'Living room with mustard sofa, dining table and wall-mounted TV' },
  { src: '/images/stays/airport-road-apartment/05-bedroom.jpg', alt: 'Bedroom with double bed, fresh linen and doors to the veranda' },
  { src: '/images/stays/airport-road-apartment/07-kitchen.jpg', alt: 'Fully equipped kitchen with sink, fridge, gas cooker and microwave' },
  { src: '/images/stays/airport-road-apartment/12-terrace.jpg', alt: 'Private terrace with two chairs and a glass sliding door' },
  { src: '/images/stays/airport-road-apartment/03-tv-lounge.jpg', alt: 'TV lounge with white media unit, plants and a soft rug' },
  { src: '/images/stays/airport-road-apartment/04-dining-corner.jpg', alt: 'Dining corner for two by the window' },
  { src: '/images/stays/airport-road-apartment/11-veranda.jpg', alt: 'Enclosed veranda with table, chairs and garden view' },
  { src: '/images/stays/airport-road-apartment/08-kitchen-cooker.jpg', alt: 'Gas cooker, microwave and kettle in the kitchen' },
  { src: '/images/stays/airport-road-apartment/09-sink-area.jpg', alt: 'Pedestal sink area next to the kitchen' },
  { src: '/images/stays/airport-road-apartment/10-bathroom.jpg', alt: 'Tiled bathroom with hot shower and toilet' },
  { src: '/images/stays/airport-road-apartment/06-wardrobe.jpg', alt: 'Open wardrobe with hanging rail and shelf' },
]

const gardenStudioGallery: StayImage[] = [
  { src: '/images/stays/garden-studio/01-studio-overview.jpg', alt: 'Garden Studio overview: double bed with mosquito net, kitchenette and TV' },
  { src: '/images/stays/garden-studio/02-bed-and-kitchenette.jpg', alt: 'Bed with fresh towels, rug, desk and stand fan in the Garden Studio' },
  { src: '/images/stays/garden-studio/03-pool.jpg', alt: 'Swimming pool with sun loungers in the compound' },
  { src: '/images/stays/garden-studio/04-veranda.jpg', alt: 'Private veranda with two armchairs and a side table' },
  { src: '/images/stays/garden-studio/05-sofa-corner.jpg', alt: 'Sofa corner with wooden wardrobe and artwork' },
  { src: '/images/stays/garden-studio/06-tv-desk.jpg', alt: 'Wall-mounted TV, writing desk and water dispenser' },
  { src: '/images/stays/garden-studio/07-kitchenette.jpg', alt: 'Kitchenette with fridge, gas hob, microwave and kettle' },
  { src: '/images/stays/garden-studio/08-kitchenette-detail.jpg', alt: 'Kitchenette cupboards, sink and utensils' },
  { src: '/images/stays/garden-studio/09-bathroom.jpg', alt: 'Bathroom with shower, toilet and sink' },
  { src: '/images/stays/garden-studio/10-exterior.jpg', alt: 'Exterior of the Garden Studio with balustrade veranda and lawn' },
  { src: '/images/stays/garden-studio/11-garden-path.jpg', alt: 'Garden path through palms leading to the pool' },
]

const dianiEastGallery: StayImage[] = [
  { src: '/images/stays/diani-east-apartment/01-living-room.jpg', alt: 'Open-plan living room with corner sofa, smart TV and breakfast bar at Diani East Apartments' },
  { src: '/images/stays/diani-east-apartment/02-open-plan-kitchen.jpg', alt: 'Kitchen with gas cooker, double sink and breakfast bar opening onto the lounge' },
  { src: '/images/stays/diani-east-apartment/03-bedroom-ensuite.jpg', alt: 'Main bedroom with double bed and en-suite bathroom' },
  { src: '/images/stays/diani-east-apartment/04-bedroom-two.jpg', alt: 'Second bedroom with double bed and ceiling fan' },
  { src: '/images/stays/diani-east-apartment/05-kitchen.jpg', alt: 'Fully equipped kitchen with four-burner gas cooker and shelving' },
  { src: '/images/stays/diani-east-apartment/06-lounge-accent-wall.jpg', alt: 'Lounge with terracotta accent wall, sofa and wall-mounted TV' },
  { src: '/images/stays/diani-east-apartment/07-breakfast-bar.jpg', alt: 'Granite breakfast bar with bar stools and water dispenser' },
  { src: '/images/stays/diani-east-apartment/08-lounge-and-bar.jpg', alt: 'Lounge seating area with ceiling fan and dining stools at the bar' },
  { src: '/images/stays/diani-east-apartment/09-hallway-bathroom.jpg', alt: 'Hallway leading to the bedrooms and the shower room' },
]

export const stays: StayListing[] = [
  {
    slug: 'angies-cozy-studio',
    name: "Angie's Cozy Studio",
    type: 'Studio with pool',
    tagline: 'Air-conditioned studio in a gated compound with pool, 10 minutes from the beach.',
    description:
      'Cozy vacation studio in Diani Beach with pool access and air conditioning year-round. Perfect for couples and solo travelers, just a 10-minute walk from the beach, with Chef Angie next door for breakfast and private chef service.',
    badge: 'Pool & AC',
    area: COMPOUND_AREA,
    beachDistance: '10 min walk',
    maxGuests: 2,
    bedrooms: 1,
    highlights: ['Swimming pool', 'Air conditioning', 'Free Wi-Fi', 'Gated compound'],
    amenities: [
      { icon: '🏊', name: 'Swimming Pool', description: 'Shared pool in the compound' },
      { icon: '🛏️', name: '1 Bedroom', description: 'Comfortable queen size bed' },
      { icon: '🍳', name: 'Kitchenette', description: 'Basic cooking essentials' },
      { icon: '📶', name: 'Free WiFi', description: 'Stay connected' },
      { icon: '❄️', name: 'Air Conditioning', description: 'Cool year-round, installed 2026' },
      { icon: '🌀', name: 'Stand Fan', description: 'Extra airflow' },
      { icon: '🚗', name: 'Free Parking', description: 'Safe parking space' },
      { icon: '🔒', name: '24/7 Security', description: 'Gated compound' },
    ],
    pricing: {
      seasons: [
        { label: 'Low Season', period: 'Mid-January - October', price: 3500 },
        { label: 'High Season', period: 'November - Mid-January', price: 5000, highlighted: true },
      ],
      note: 'Air conditioning included year-round.',
    },
    cover: { src: '/images/apartment/pool.jpg', alt: 'Swimming pool at Angie\'s Cozy Studio in Diani Beach' },
    images: studioGallery,
    video: {
      youtubeId: 'aUJrxqSxJQo',
      title: "Angie's Cozy Studio Diani Beach — Studio Upgrade 2026",
      intro: 'Take a virtual tour of the newly upgraded studio — air conditioning installed 2026.',
    },
    booking: {
      bookingComUrl: 'https://www.booking.com/hotel/ke/karean-studio-suites.html',
    },
    map: COMPOUND_MAP,
    nearby: COMPOUND_NEARBY,
    houseRules: [
      { label: 'Check-in', value: 'From 12:00 PM' },
      { label: 'Check-out', value: 'By 9:00 AM' },
      { label: 'Smoking', value: 'Not allowed indoors' },
      { label: 'Pets', value: 'Not allowed' },
      { label: 'Parties', value: 'Not allowed' },
      { label: 'Max Guests', value: '2 adults' },
    ],
    breakfastAddon: true,
    schema: {
      streetAddress: 'Near Kenya Power Office, Diani Beach',
      geo: COMPOUND_GEO,
      priceRange: '3500-8000 KES',
      checkinTime: '12:00',
      checkoutTime: '09:00',
    },
  },
  {
    slug: 'garden-studio',
    name: 'The Garden Studio',
    type: 'Studio with pool',
    tagline: "Fan-cooled studio in the same pool compound as Angie's, 10 minutes from the beach.",
    description:
      "A bright studio in the same gated compound as Angie's Cozy Studio, with the same pool and garden. Double bed with mosquito net, sofa corner, kitchenette with fridge, gas hob, microwave and kettle, smart TV, writing desk and a private veranda. Cooled by fans rather than air conditioning, which keeps the rate friendly.",
    badge: 'Pool',
    area: COMPOUND_AREA,
    beachDistance: '10 min walk',
    maxGuests: 2,
    bedrooms: 1,
    highlights: ['Swimming pool', 'Fan-cooled', 'Kitchenette', 'Private veranda'],
    amenities: [
      { icon: '🏊', name: 'Swimming Pool', description: 'Shared pool in the compound' },
      { icon: '🛏️', name: 'Double Bed', description: 'With mosquito net and fresh linen' },
      { icon: '🍳', name: 'Kitchenette', description: 'Fridge, gas hob, microwave, kettle' },
      { icon: '📺', name: 'Smart TV', description: 'Wall-mounted flat screen' },
      { icon: '🌀', name: 'Stand Fan', description: 'Fan-cooled, no air conditioning' },
      { icon: '🌿', name: 'Private Veranda', description: 'Two armchairs facing the garden' },
      { icon: '🚗', name: 'Free Parking', description: 'Inside the compound' },
      { icon: '🔒', name: '24/7 Security', description: 'Gated compound' },
    ],
    pricing: {
      seasons: [],
      note: 'Nightly rates and availability on request.',
    },
    cover: { src: '/images/stays/garden-studio/01-studio-overview.jpg', alt: 'The Garden Studio in Diani Beach with double bed, mosquito net and kitchenette' },
    images: gardenStudioGallery,
    booking: {},
    map: COMPOUND_MAP,
    nearby: COMPOUND_NEARBY,
    houseRules: [
      { label: 'Check-in', value: 'From 12:00 PM' },
      { label: 'Check-out', value: 'By 9:00 AM' },
      { label: 'Smoking', value: 'Not allowed indoors' },
      { label: 'Pets', value: 'Not allowed' },
      { label: 'Parties', value: 'Not allowed' },
      { label: 'Max Guests', value: '2 adults' },
    ],
    breakfastAddon: true,
    schema: {
      streetAddress: COMPOUND_AREA,
      geo: COMPOUND_GEO,
      checkinTime: '12:00',
      checkoutTime: '09:00',
    },
  },
  {
    slug: 'airport-road-apartment',
    name: 'One-Bedroom Apartment on Airport Road',
    type: 'One-bedroom apartment',
    tagline: 'Bright one-bedroom apartment with a full kitchen and private terrace, close to Trade Winds and 4 minutes from the beach.',
    description:
      'A freshly finished one-bedroom apartment on Airport Road, Diani, close to Trade Winds. Separate living room with sofa and smart TV, a full kitchen with gas cooker, fridge and microwave, a hot shower, and two outdoor spaces: an enclosed veranda and a private terrace. The beach is 4 minutes away.',
    badge: 'New',
    area: 'Airport Road, near Trade Winds, Diani',
    beachDistance: '4 min',
    maxGuests: 2,
    bedrooms: 1,
    highlights: ['Full kitchen', 'Private terrace', 'Fan-cooled', 'Smart TV'],
    amenities: [
      { icon: '🛏️', name: '1 Bedroom', description: 'Double bed with fresh linen' },
      { icon: '🛋️', name: 'Living Room', description: 'Sofa, dining table and lounge' },
      { icon: '🍳', name: 'Full Kitchen', description: 'Gas cooker, fridge, microwave, kettle' },
      { icon: '📺', name: 'Smart TV', description: 'Wall-mounted flat screen' },
      { icon: '📶', name: 'WiFi', description: 'Router on site' },
      { icon: '🌀', name: 'Fans', description: 'Fan-cooled, no air conditioning' },
      { icon: '🚿', name: 'Hot Shower', description: 'Instant water heater' },
      { icon: '🌿', name: 'Private Terrace', description: 'Veranda plus a second terrace' },
      { icon: '👔', name: 'Wardrobe', description: 'Hanging rail and shelves' },
    ],
    pricing: {
      seasons: [],
      note: 'Nightly rates and availability on request.',
    },
    cover: { src: '/images/stays/airport-road-apartment/02-living-room.jpg', alt: 'Living room of the one-bedroom apartment on Airport Road, Diani' },
    images: airportRoadGallery,
    booking: {},
    nearby: [
      { name: 'Diani Beach', distance: '4 min' },
      { name: 'Trade Winds', distance: 'Close by' },
      { name: 'Ukunda Airstrip', distance: 'On Airport Road' },
    ],
    houseRules: [
      { label: 'Check-in', value: 'Arranged with Angie' },
      { label: 'Check-out', value: 'Arranged with Angie' },
      { label: 'Smoking', value: 'Not allowed indoors' },
      { label: 'Pets', value: 'Not allowed' },
      { label: 'Parties', value: 'Not allowed' },
      { label: 'Max Guests', value: '2 adults' },
    ],
    breakfastAddon: false,
    schema: {
      streetAddress: 'Airport Road, near Trade Winds, Diani',
    },
  },
  {
    slug: 'diani-east-apartment',
    name: 'Two-Bedroom Apartment at Diani East',
    type: 'Two-bedroom apartment',
    tagline: 'Spacious two-bedroom apartment in the Diani East complex, 3 minutes from Diani Link Road and Rockstarz restaurant.',
    description:
      'A roomy two-bedroom apartment in the Diani East Apartments complex, ideal for families and friends travelling together. Open-plan lounge with a corner sofa and smart TV, granite breakfast bar, full kitchen with a four-burner gas cooker and double sink, two double bedrooms (one en suite) and a second shower room. Ceiling fans throughout. Diani Link Road and Rockstarz restaurant are 3 minutes away.',
    badge: 'Sleeps 4',
    area: 'Diani East Apartments, off Diani Link Road',
    beachDistance: 'Short drive',
    maxGuests: 4,
    bedrooms: 2,
    highlights: ['2 bathrooms', 'Full kitchen', 'Smart TV', 'Ceiling fans'],
    amenities: [
      { icon: '🛏️', name: '2 Bedrooms', description: 'Two double beds, one en suite' },
      { icon: '🚿', name: '2 Bathrooms', description: 'En-suite plus a second shower room' },
      { icon: '🛋️', name: 'Open-plan Lounge', description: 'Corner sofa, coffee table, TV wall' },
      { icon: '🍳', name: 'Full Kitchen', description: '4-burner gas cooker, double sink, kettle' },
      { icon: '🍽️', name: 'Breakfast Bar', description: 'Granite counter with bar stools' },
      { icon: '📺', name: 'Smart TV', description: 'Streaming-ready flat screen' },
      { icon: '🌀', name: 'Ceiling Fans', description: 'Fan-cooled, no air conditioning' },
      { icon: '💧', name: 'Water Dispenser', description: 'Drinking water on site' },
    ],
    pricing: {
      seasons: [],
      note: 'Nightly rates and availability on request.',
    },
    cover: { src: '/images/stays/diani-east-apartment/01-living-room.jpg', alt: 'Open-plan living room of the two-bedroom apartment at Diani East, Diani Beach' },
    images: dianiEastGallery,
    booking: {},
    nearby: [
      { name: 'Diani Link Road', distance: '3 min' },
      { name: 'Rockstarz Restaurant', distance: '3 min' },
      { name: 'Diani Beach', distance: 'Short drive' },
    ],
    houseRules: [
      { label: 'Check-in', value: 'Arranged with Angie' },
      { label: 'Check-out', value: 'Arranged with Angie' },
      { label: 'Smoking', value: 'Not allowed indoors' },
      { label: 'Pets', value: 'Not allowed' },
      { label: 'Parties', value: 'Not allowed' },
      { label: 'Max Guests', value: '4 adults' },
    ],
    breakfastAddon: false,
    schema: {
      streetAddress: 'Diani East Apartments, off Diani Link Road, Diani Beach',
    },
  },
]

export function getStay(slug: string): StayListing | undefined {
  return stays.find((stay) => stay.slug === slug)
}

export function formatKes(amount: number): string {
  return `${amount.toLocaleString('en-US')} KES`
}

/** Lowest nightly rate of a stay, or null when rates are on request. */
export function lowestRate(stay: StayListing): number | null {
  if (stay.pricing.seasons.length === 0) return null
  return Math.min(...stay.pricing.seasons.map((season) => season.price))
}

/** Lowest nightly rate across every stay that publishes rates. */
export function lowestRateAcrossStays(list: StayListing[] = stays): number | null {
  const rates = list.map(lowestRate).filter((rate): rate is number => rate !== null)
  return rates.length > 0 ? Math.min(...rates) : null
}

export function whatsappUrl(message: string): string {
  return `https://wa.me/${STAY_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function stayBookingMessage(stay: StayListing): string {
  return `Hello Chef Angie! I'm interested in booking ${stay.name}.\n\nCheck-in: ____\nCheck-out: ____\nNumber of guests: ____`
}

export function stayBookingUrl(stay: StayListing): string {
  return whatsappUrl(stayBookingMessage(stay))
}

export const GENERIC_BOOKING_URL = whatsappUrl(
  "Hello Chef Angie! I'm interested in booking one of your stays in Diani.\n\nCheck-in: ____\nCheck-out: ____\nNumber of guests: ____"
)
