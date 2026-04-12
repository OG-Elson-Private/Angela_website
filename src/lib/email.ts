import { Resend } from 'resend'
import { serviceLabels, type ServiceType } from '@/lib/validations/testimonial'

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

interface NewTestimonialData {
  name: string
  service: ServiceType | string
  rating: number
  text: string
}

/**
 * Send email notification to admin when a new testimonial is submitted.
 * Fails silently — never throws, never blocks the caller.
 */
export async function sendNewTestimonialNotification(data: NewTestimonialData): Promise<void> {
  try {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.warn('[email] RESEND_API_KEY not configured — skipping notification')
      return
    }

    const to = process.env.NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL
    if (!to) {
      console.warn('[email] No notification email configured — skipping')
      return
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.chefangela.co.ke'
    const serviceLabel = serviceLabels[data.service as ServiceType] || data.service
    const rating = Math.max(1, Math.min(5, data.rating))
    const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating)
    const textExcerpt = data.text.length > 200 ? data.text.slice(0, 200) + '...' : data.text

    // Escape user-provided content to prevent XSS in email HTML
    const safeName = escapeHtml(data.name)
    const safeText = escapeHtml(textExcerpt)

    const resend = new Resend(apiKey)

    await resend.emails.send({
      from: 'Chef Angie Website <onboarding@resend.dev>',
      to,
      subject: `New Review: ${data.name} — ${serviceLabel} (${rating}★)`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #134E4A; padding: 24px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #F97316; margin: 0; font-size: 18px;">Chef Angie</h1>
            <h2 style="color: white; margin: 8px 0 0; font-size: 22px;">New Testimonial Received</h2>
          </div>
          <div style="background: #f9f9f9; padding: 24px; border: 1px solid #e5e5e5;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666; width: 100px;">Name</td>
                <td style="padding: 8px 0; font-weight: bold;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Service</td>
                <td style="padding: 8px 0;">${serviceLabel}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Rating</td>
                <td style="padding: 8px 0; font-size: 18px; color: #F97316;">${stars}</td>
              </tr>
            </table>
            <div style="margin-top: 16px; padding: 16px; background: white; border-radius: 8px; border-left: 4px solid #0D9488;">
              <p style="margin: 0; color: #333; line-height: 1.6;">"${safeText}"</p>
            </div>
          </div>
          <div style="padding: 16px; text-align: center; background: #134E4A; border-radius: 0 0 12px 12px;">
            <a href="${baseUrl}/admin" style="display: inline-block; padding: 10px 24px; background: #F97316; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Review in Dashboard
            </a>
          </div>
        </div>
      `,
    })
  } catch (error) {
    console.error('[email] Failed to send notification:', error)
  }
}
