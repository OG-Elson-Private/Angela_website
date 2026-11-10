import { describe, expect, it } from 'vitest'
import {
  COOKING_CLASS_BOOKING_URL,
  COOKING_CLASS_MAX_GUESTS,
  COOKING_CLASS_PRICE_KES,
  classFacts,
  classFaq,
  howItWorks,
  whatYouDo,
} from './cooking-class'

describe('cooking class data', () => {
  it('matches the Echo listing figures', () => {
    expect(COOKING_CLASS_PRICE_KES).toBe(8000)
    expect(COOKING_CLASS_MAX_GUESTS).toBe(6)
    const price = classFacts.find((f) => f.label === 'Price')
    expect(price?.value).toBe('8,000 KES')
  })

  it('has complete facts, steps and FAQ', () => {
    expect(classFacts.length).toBeGreaterThanOrEqual(6)
    expect(howItWorks).toHaveLength(4)
    expect(classFaq.length).toBeGreaterThanOrEqual(6)
    for (const faq of classFaq) {
      expect(faq.question.endsWith('?')).toBe(true)
      expect(faq.answer.length).toBeGreaterThan(20)
    }
    expect(whatYouDo.some((line) => /tamarind/i.test(line))).toBe(true)
  })

  it('never claims ingredients are included', () => {
    const text = [...classFacts.map((f) => `${f.value} ${f.detail ?? ''}`), ...classFaq.map((f) => f.answer)].join(' ')
    expect(text).not.toMatch(/ingredients (are )?included/i)
  })

  it('builds a WhatsApp deep link with the booking template', () => {
    expect(COOKING_CLASS_BOOKING_URL).toMatch(/^https:\/\/wa\.me\/254706310918\?text=/)
    expect(decodeURIComponent(COOKING_CLASS_BOOKING_URL)).toContain('book a cooking class')
  })
})
