'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'
import {
  testimonialSchema,
  ServiceType,
  serviceLabels,
  type TestimonialFormData,
} from '@/lib/validations/testimonial'
import { Input, Textarea, Select } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { StarRatingInput } from '@/components/ui/StarRating'

interface TestimonialFormProps {
  defaultService?: ServiceType
  onSuccess?: () => void
  className?: string
}

// Service options for the select dropdown
const serviceOptions = Object.entries(serviceLabels).map(([value, label]) => ({
  value,
  label,
}))

/**
 * Testimonial submission form
 * - Validates with Zod schema
 * - Includes honeypot spam protection
 * - Shows character count for text field
 * - Handles loading and success states
 */
export function TestimonialForm({
  defaultService,
  onSuccess,
  className,
}: TestimonialFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TestimonialFormData>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      name: '',
      email: '',
      location: '',
      service: defaultService || 'BIRYANI_FRIDAY',
      rating: 5,
      text: '',
      website: '', // Honeypot field
    },
  })

  // Watch text field for character count
  const textValue = watch('text', '')
  const ratingValue = watch('rating', 5)
  const characterCount = textValue.length
  const minCharacters = 50
  const maxCharacters = 1000

  // Handle rating change from StarRatingInput
  const handleRatingChange = (rating: 1 | 2 | 3 | 4 | 5) => {
    setValue('rating', rating, { shouldValidate: true })
  }

  // Form submission handler
  const onSubmit = async (data: TestimonialFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit review')
      }

      // Success
      setSubmitStatus('success')
      reset()

      // Call onSuccess callback after a short delay
      if (onSuccess) {
        setTimeout(() => {
          onSuccess()
        }, 2000)
      }
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage(
        error instanceof Error ? error.message : 'An unexpected error occurred'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  // Success message display
  if (submitStatus === 'success') {
    return (
      <div className={cn('text-center py-8', className)}>
        <div className="w-16 h-16 mx-auto mb-4 bg-teal/10 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-teal"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="font-heading text-xl font-semibold text-charcoal mb-2">
          Thank you for your review!
        </h3>
        <p className="text-gray-warm font-body">
          Your feedback will be published after moderation.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('space-y-6', className)}
      noValidate
    >
      {/* Error banner */}
      {submitStatus === 'error' && (
        <div
          className="p-4 bg-coral/10 border border-coral/30 rounded-lg text-coral text-sm"
          role="alert"
        >
          {errorMessage}
        </div>
      )}

      {/* Name field */}
      <Input
        label="Your Name"
        placeholder="John Doe"
        error={errors.name?.message}
        {...register('name')}
        required
        autoComplete="name"
      />

      {/* Email field */}
      <Input
        label="Email"
        type="email"
        placeholder="john@example.com"
        helperText="Your email will not be displayed publicly"
        error={errors.email?.message}
        {...register('email')}
        required
        autoComplete="email"
      />

      {/* Location field (optional) */}
      <Input
        label="Location (optional)"
        placeholder="Nairobi, Kenya"
        error={errors.location?.message}
        {...register('location')}
        autoComplete="address-level2"
      />

      {/* Service select */}
      <Select
        label="Service Used"
        options={[
          { value: '', label: 'Select a service...' },
          ...serviceOptions,
        ]}
        error={errors.service?.message}
        {...register('service')}
        required
      />

      {/* Star rating */}
      <StarRatingInput
        value={ratingValue}
        onChange={handleRatingChange}
        label="Your Rating"
        error={errors.rating?.message}
        size="lg"
      />

      {/* Review text */}
      <div>
        <Textarea
          label="Your Experience"
          placeholder="Share your experience with Chef Angie's services..."
          error={errors.text?.message}
          {...register('text')}
          required
          rows={5}
        />
        {/* Character count */}
        <div className="mt-2 flex justify-between text-sm">
          <span
            className={cn(
              'font-body',
              characterCount < minCharacters
                ? 'text-coral'
                : characterCount > maxCharacters
                ? 'text-coral'
                : 'text-gray-warm'
            )}
          >
            {characterCount < minCharacters
              ? `${minCharacters - characterCount} more characters needed`
              : characterCount > maxCharacters
              ? `${characterCount - maxCharacters} characters over limit`
              : 'Looking good!'}
          </span>
          <span
            className={cn(
              'font-body',
              characterCount > maxCharacters ? 'text-coral' : 'text-gray-warm'
            )}
          >
            {characterCount}/{maxCharacters}
          </span>
        </div>
      </div>

      {/* Honeypot field - hidden from users, visible to bots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          tabIndex={-1}
          autoComplete="off"
          {...register('website')}
        />
      </div>

      {/* Submit button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isSubmitting}
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </Button>

      {/* Privacy note */}
      <p className="text-xs text-gray-warm text-center font-body">
        By submitting this review, you agree that your name, location, and review
        text may be published on our website after moderation.
      </p>
    </form>
  )
}

export default TestimonialForm
