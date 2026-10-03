import { describe, it, expect } from 'vitest'
import { clampRating, combineTestimonialResponses, type TestimonialsGroup } from '@/lib/testimonials'
import type { TestimonialPublic } from '@/lib/validations/testimonial'

function makeTestimonial(overrides: Partial<TestimonialPublic> & { id: string }): TestimonialPublic {
  return {
    name: 'Guest',
    location: null,
    service: 'PRIVATE_CHEF',
    rating: 5,
    text: 'A wonderful experience with Chef Angie from start to finish!',
    createdAt: new Date('2026-01-01T00:00:00Z'),
    ...overrides,
  }
}

function makeGroup(
  testimonials: TestimonialPublic[],
  averageRating: number | null,
  totalReviews: number
): TestimonialsGroup {
  return { testimonials, aggregate: { averageRating, totalReviews } }
}

describe('clampRating', () => {
  it('rounds to the nearest integer star', () => {
    expect(clampRating(4.4)).toBe(4)
    expect(clampRating(4.5)).toBe(5)
    expect(clampRating(2.6)).toBe(3)
  })

  it('clamps out-of-range values into 1..5', () => {
    expect(clampRating(0)).toBe(1)
    expect(clampRating(-3)).toBe(1)
    expect(clampRating(7)).toBe(5)
  })

  it('defaults null to 5', () => {
    expect(clampRating(null)).toBe(5)
  })
})

describe('combineTestimonialResponses', () => {
  it('merges responses and sorts testimonials by createdAt descending', () => {
    const older = makeTestimonial({ id: 'a', createdAt: new Date('2026-01-01T00:00:00Z') })
    const newest = makeTestimonial({ id: 'b', createdAt: new Date('2026-03-01T00:00:00Z') })
    const middle = makeTestimonial({ id: 'c', createdAt: new Date('2026-02-01T00:00:00Z') })

    const result = combineTestimonialResponses([
      makeGroup([older, newest], 5, 2),
      makeGroup([middle], 4, 1),
    ])

    expect(result.testimonials.map((t) => t.id)).toEqual(['b', 'c', 'a'])
  })

  it('caps the merged list at maxItems (default 6)', () => {
    const many = Array.from({ length: 10 }, (_, i) =>
      makeTestimonial({ id: `t${i}`, createdAt: new Date(2026, 0, i + 1) })
    )

    const result = combineTestimonialResponses([makeGroup(many, 5, 10)])

    expect(result.testimonials).toHaveLength(6)
    // Newest 6 are kept
    expect(result.testimonials.map((t) => t.id)).toEqual(['t9', 't8', 't7', 't6', 't5', 't4'])
  })

  it('respects a custom maxItems cap', () => {
    const many = Array.from({ length: 5 }, (_, i) =>
      makeTestimonial({ id: `t${i}`, createdAt: new Date(2026, 0, i + 1) })
    )

    const result = combineTestimonialResponses([makeGroup(many, 5, 5)], 3)

    expect(result.testimonials).toHaveLength(3)
  })

  it('computes a weighted average rating across responses, rounded to 1 decimal', () => {
    // 2 reviews at 5.0 and 1 review at 4.0 -> (5*2 + 4*1) / 3 = 4.666... -> 4.7
    const result = combineTestimonialResponses([
      makeGroup([makeTestimonial({ id: 'a' })], 5, 2),
      makeGroup([makeTestimonial({ id: 'b' })], 4, 1),
    ])

    expect(result.aggregate).toEqual({ averageRating: 4.7, totalReviews: 3 })
  })

  it('skips null responses (failed per-service fetches)', () => {
    const only = makeTestimonial({ id: 'a' })

    const result = combineTestimonialResponses([null, makeGroup([only], 5, 1), null])

    expect(result.testimonials.map((t) => t.id)).toEqual(['a'])
    expect(result.aggregate).toEqual({ averageRating: 5, totalReviews: 1 })
  })

  it('returns an empty group with null average when there is no data', () => {
    const result = combineTestimonialResponses([null, makeGroup([], null, 0)])

    expect(result.testimonials).toEqual([])
    expect(result.aggregate).toEqual({ averageRating: null, totalReviews: 0 })
  })
})
