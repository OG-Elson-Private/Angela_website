import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock Resend
const mockSend = vi.fn()
vi.mock('resend', () => ({
  Resend: class MockResend {
    emails = { send: mockSend }
  },
}))

import { sendNewTestimonialNotification } from './email'

describe('sendNewTestimonialNotification', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.RESEND_API_KEY = 'test-key'
    process.env.NOTIFICATION_EMAIL = 'admin@test.com'
    process.env.NEXT_PUBLIC_BASE_URL = 'https://www.chefangela.co.ke'
    mockSend.mockResolvedValue({ id: 'email-123' })
  })

  it('should send email with correct subject and recipient', async () => {
    await sendNewTestimonialNotification({
      name: 'John Doe',
      service: 'BIRYANI_FRIDAY',
      rating: 5,
      text: 'Amazing biryani! Best I ever had in Diani Beach.',
    })

    expect(mockSend).toHaveBeenCalledOnce()
    const callArgs = mockSend.mock.calls[0][0]
    expect(callArgs.to).toBe('admin@test.com')
    expect(callArgs.subject).toContain('John Doe')
    expect(callArgs.subject).toContain('5')
  })

  it('should include review details in email body', async () => {
    await sendNewTestimonialNotification({
      name: 'Jane Smith',
      service: 'ACCOMMODATION',
      rating: 4,
      text: 'Great apartment with beautiful pool. Loved the stay!',
    })

    const callArgs = mockSend.mock.calls[0][0]
    expect(callArgs.html).toContain('Jane Smith')
    expect(callArgs.html).toContain('Accommodation')
    expect(callArgs.html).toContain('Great apartment')
    expect(callArgs.html).toContain('/admin')
  })

  it('should not throw when email sending fails', async () => {
    mockSend.mockRejectedValue(new Error('Resend API error'))

    await expect(
      sendNewTestimonialNotification({
        name: 'Test',
        service: 'PRIVATE_CHEF',
        rating: 3,
        text: 'Decent food but could be better with more spices.',
      })
    ).resolves.not.toThrow()
  })

  it('should not send when RESEND_API_KEY is missing', async () => {
    delete process.env.RESEND_API_KEY

    await sendNewTestimonialNotification({
      name: 'Test',
      service: 'CATERING',
      rating: 5,
      text: 'Perfect catering for our wedding event in Diani Beach.',
    })

    expect(mockSend).not.toHaveBeenCalled()
  })
})
