import { describe, it, expect } from 'vitest'
import { existsSync } from 'fs'
import path from 'path'
import {
  stays,
  getStay,
  lowestRate,
  lowestRateAcrossStays,
  stayBookingUrl,
  formatKes,
} from './stays'

const PUBLIC_DIR = path.resolve(__dirname, '../../public')

describe('stays data', () => {
  it('has at least four listings with unique slugs', () => {
    expect(stays.length).toBeGreaterThanOrEqual(4)
    const slugs = stays.map((stay) => stay.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('uses url-safe slugs', () => {
    for (const stay of stays) {
      expect(stay.slug).toMatch(/^[a-z0-9-]+$/)
    }
  })

  it('references only images that exist in /public', () => {
    for (const stay of stays) {
      const files = [stay.cover, ...stay.images]
      for (const image of files) {
        const onDisk = path.join(PUBLIC_DIR, image.src)
        expect(existsSync(onDisk), `${stay.slug}: missing ${image.src}`).toBe(true)
        expect(image.alt.length).toBeGreaterThan(10)
      }
    }
  })

  it('gives every stay enough photos for the gallery grid', () => {
    for (const stay of stays) {
      expect(stay.images.length).toBeGreaterThanOrEqual(5)
    }
  })

  it('exposes the studio as the first, featured stay with published rates', () => {
    const studio = stays[0]
    expect(studio.slug).toBe('poolside-studio')
    expect(lowestRate(studio)).toBe(3500)
    expect(studio.booking.bookingComUrl).toContain('booking.com')
  })

  it('reports rates on request for the airport road apartment', () => {
    const apartment = getStay('airport-road-apartment')
    expect(apartment).toBeDefined()
    expect(lowestRate(apartment!)).toBeNull()
    expect(apartment!.amenities.some((a) => /air conditioning/i.test(a.name))).toBe(false)
    expect(apartment!.amenities.some((a) => /fan/i.test(a.name))).toBe(true)
  })

  it('lists the garden studio in the same compound as the featured studio, without AC', () => {
    const garden = getStay('garden-studio')
    expect(garden).toBeDefined()
    expect(garden!.area).toBe(stays[0].area)
    expect(garden!.map?.embedUrl).toBe(stays[0].map?.embedUrl)
    expect(garden!.amenities.some((a) => /air conditioning/i.test(a.name))).toBe(false)
    expect(garden!.amenities.some((a) => /fan/i.test(a.name))).toBe(true)
    expect(lowestRate(garden!)).toBeNull()
  })

  it('lists the Diani East two-bedroom apartment for four guests, fan-cooled', () => {
    const apartment = getStay('diani-east-apartment')
    expect(apartment).toBeDefined()
    expect(apartment!.bedrooms).toBe(2)
    expect(apartment!.maxGuests).toBe(4)
    expect(apartment!.amenities.some((a) => /air conditioning/i.test(a.name))).toBe(false)
    expect(apartment!.nearby.some((n) => /rockstarz/i.test(n.name))).toBe(true)
    expect(lowestRate(apartment!)).toBeNull()
  })

  it('computes the lowest rate across stays from published rates only', () => {
    expect(lowestRateAcrossStays()).toBe(3500)
    expect(lowestRateAcrossStays([getStay('airport-road-apartment')!])).toBeNull()
  })

  it('builds a WhatsApp link that names the stay', () => {
    const url = stayBookingUrl(stays[0])
    expect(url).toMatch(/^https:\/\/wa\.me\/254706310918\?text=/)
    expect(decodeURIComponent(url)).toContain(stays[0].name)
  })

  it('formats KES amounts with thousands separators', () => {
    expect(formatKes(3500)).toBe('3,500 KES')
    expect(formatKes(12000)).toBe('12,000 KES')
  })
})
