import { z } from 'zod'

// Service types matching Prisma enum
export const ServiceType = z.enum([
  'BIRYANI_FRIDAY',
  'PILAU_TUESDAY',
  'PRIVATE_CHEF',
  'CATERING',
  'ACCOMMODATION',
  'CONCIERGE',
])

export type ServiceType = z.infer<typeof ServiceType>

// Category groupings for filtering
export const CUISINE_SERVICES: ServiceType[] = [
  'PRIVATE_CHEF',
  'CATERING',
  'BIRYANI_FRIDAY',
  'PILAU_TUESDAY',
]

export const ACCOMMODATION_SERVICES: ServiceType[] = ['ACCOMMODATION']

// Service labels for display
export const serviceLabels: Record<ServiceType, string> = {
  BIRYANI_FRIDAY: 'Biryani Friday',
  PILAU_TUESDAY: 'Pilau Tuesday',
  PRIVATE_CHEF: 'Private Chef',
  CATERING: 'Catering',
  ACCOMMODATION: 'Accommodation',
  CONCIERGE: 'Diani Insider Service',
}

// Schema for testimonial submission (client-side and server-side)
export const testimonialSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .trim(),
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters')
    .toLowerCase()
    .trim(),
  location: z
    .string()
    .max(100, 'Location must be less than 100 characters')
    .trim()
    .optional()
    .or(z.literal('')),
  service: ServiceType,
  rating: z
    .number()
    .int('Rating must be a whole number')
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must be at most 5'),
  text: z
    .string()
    .min(50, 'Please share at least 50 characters about your experience')
    .max(1000, 'Review must be less than 1000 characters')
    .trim(),
  // Honeypot field for spam prevention - should be empty
  website: z
    .string()
    .max(0, 'This field should be empty')
    .optional()
    .or(z.literal('')),
})

export type TestimonialFormData = z.infer<typeof testimonialSchema>

// Schema for API response (excludes email for privacy)
export const testimonialPublicSchema = z.object({
  id: z.string(),
  name: z.string(),
  location: z.string().nullable(),
  service: ServiceType,
  rating: z.number(),
  text: z.string(),
  createdAt: z.date(),
})

export type TestimonialPublic = z.infer<typeof testimonialPublicSchema>

// Schema for admin actions
export const testimonialStatusSchema = z.object({
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED']),
})

export type TestimonialStatus = z.infer<typeof testimonialStatusSchema>
