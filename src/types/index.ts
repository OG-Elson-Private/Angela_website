// Service types
export type ServiceType = 'biryani-friday' | 'pilau-tuesday' | 'private-chef' | 'catering' | 'accommodation'

// Testimonial
export interface Testimonial {
  id: string
  name: string
  location?: string
  service: ServiceType
  rating: 1 | 2 | 3 | 4 | 5
  text: string
  date: string
  photoUrl?: string
}

// Food item
export interface FoodItem {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  category: 'biryani' | 'pilau' | 'other'
  includes?: string[]
}

// Accommodation
export interface Accommodation {
  id: string
  name: string
  description: string
  pricePerNight: number
  amenities: string[]
  images: string[]
  videoUrl?: string
  location: string
}

// Contact form data
export interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  service?: ServiceType
}

// Testimonial form data
export interface TestimonialFormData {
  name: string
  email: string
  location?: string
  service: ServiceType
  rating: 1 | 2 | 3 | 4 | 5
  text: string
  photoUrl?: string
}

// Navigation link
export interface NavLink {
  label: string
  href: string
  children?: NavLink[]
}

// Social link
export interface SocialLink {
  platform: 'instagram' | 'whatsapp' | 'phone' | 'email'
  url: string
  label: string
}
