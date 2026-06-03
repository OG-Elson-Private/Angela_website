import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service | Chef Angela',
  description: 'Terms of Service for Chef Angela - Read our terms and conditions for culinary services, food delivery, private chef, and accommodation in Diani Beach, Kenya.',
  openGraph: {
    title: 'Terms of Service | Chef Angela',
    description: 'Terms of Service for Chef Angela culinary and accommodation services',
    type: 'website',
    url: 'https://www.chefangela.co.ke/terms',
    images: ['/images/og/og-home.jpg'],
  },
}

export default function TermsPage() {
  return (
    <>
      {/* Header */}
      <section className="py-16 md:py-24 bg-ocean-dark">
        <div className="container-standard text-center text-white px-4">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Terms of Service
          </h1>
          <p className="font-body text-lg text-white/80">
            Last updated: January 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-standard max-w-4xl">
          <div className="prose prose-lg max-w-none">

            <div className="mb-12">
              <h2 className="font-heading text-2xl font-semibold text-ocean-dark mb-4">
                1. Agreement to Terms
              </h2>
              <p className="font-body text-gray-warm">
                By accessing or using the services provided by Chef Angela, including our website
                (chefangela.co.ke), food delivery services, private chef services, catering, and
                accommodation in Diani Beach, Kenya, you agree to be bound by these Terms of Service.
                If you do not agree with any part of these terms, you may not use our services.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="font-heading text-2xl font-semibold text-ocean-dark mb-4">
                2. Services Offered
              </h2>
              <p className="font-body text-gray-warm mb-4">
                Chef Angela provides the following services in and around Diani Beach, Kenya:
              </p>
              <ul className="list-disc pl-6 font-body text-gray-warm space-y-2">
                <li><strong>Weekly Food Delivery:</strong> Biryani Friday and Pilau Tuesday deliveries to Diani and Ukunda areas</li>
                <li><strong>Private Chef Services:</strong> In-home cooking experiences for individuals and groups</li>
                <li><strong>Event Catering:</strong> Catering services for events, parties, and celebrations</li>
                <li><strong>Accommodation:</strong> Vacation apartment rental with pool in Diani Beach</li>
                <li><strong>All-Inclusive Package:</strong> Combined accommodation and chef service packages</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="font-heading text-2xl font-semibold text-ocean-dark mb-4">
                3. Orders and Bookings
              </h2>

              <h3 className="font-ui font-semibold text-ocean-dark mb-2 mt-6">Food Orders</h3>
              <ul className="list-disc pl-6 font-body text-gray-warm space-y-2 mb-4">
                <li>Orders for Biryani Friday must be placed by Thursday</li>
                <li>Orders for Pilau Tuesday must be placed by Monday</li>
                <li>All orders are subject to availability</li>
                <li>Delivery times are estimates and may vary</li>
                <li>Minimum order quantities may apply for certain areas</li>
              </ul>

              <h3 className="font-ui font-semibold text-ocean-dark mb-2 mt-6">Private Chef & Catering</h3>
              <ul className="list-disc pl-6 font-body text-gray-warm space-y-2 mb-4">
                <li>Bookings should be made at least 24-48 hours in advance</li>
                <li>Menu planning will be discussed prior to the service</li>
                <li>Food ingredients are charged separately unless otherwise agreed</li>
                <li>Cancellations must be made at least 24 hours before the scheduled service</li>
              </ul>

              <h3 className="font-ui font-semibold text-ocean-dark mb-2 mt-6">Accommodation</h3>
              <ul className="list-disc pl-6 font-body text-gray-warm space-y-2">
                <li>Check-in time: From 12:00 PM</li>
                <li>Check-out time: By 9:00 AM</li>
                <li>Maximum occupancy: 2 adults</li>
                <li>Booking confirmation requires advance payment</li>
                <li>House rules must be followed during your stay</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="font-heading text-2xl font-semibold text-ocean-dark mb-4">
                4. Pricing and Payment
              </h2>
              <ul className="list-disc pl-6 font-body text-gray-warm space-y-2">
                <li>All prices are quoted in Kenyan Shillings (KES)</li>
                <li>Prices are subject to change without prior notice</li>
                <li>Payment methods accepted: M-Pesa, Cash, Bank Transfer</li>
                <li>For food delivery, payment is required upon delivery or in advance via M-Pesa</li>
                <li>For accommodation, a deposit may be required to confirm booking</li>
                <li>Private chef service fees do not include food ingredients unless specified</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="font-heading text-2xl font-semibold text-ocean-dark mb-4">
                5. Cancellation and Refund Policy
              </h2>

              <h3 className="font-ui font-semibold text-ocean-dark mb-2 mt-6">Food Orders</h3>
              <p className="font-body text-gray-warm mb-4">
                Orders can be cancelled free of charge up to 24 hours before the scheduled delivery.
                Late cancellations may be subject to a cancellation fee.
              </p>

              <h3 className="font-ui font-semibold text-ocean-dark mb-2 mt-6">Private Chef Services</h3>
              <p className="font-body text-gray-warm mb-4">
                Cancellations made less than 24 hours before the scheduled service may incur
                a cancellation fee of up to 50% of the service cost.
              </p>

              <h3 className="font-ui font-semibold text-ocean-dark mb-2 mt-6">Accommodation</h3>
              <p className="font-body text-gray-warm">
                Cancellation policies for accommodation bookings will be communicated at the
                time of booking. Generally, cancellations made 7+ days before check-in receive
                a full refund. Late cancellations may forfeit the deposit.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="font-heading text-2xl font-semibold text-ocean-dark mb-4">
                6. Food Safety and Allergies
              </h2>
              <ul className="list-disc pl-6 font-body text-gray-warm space-y-2">
                <li>We prepare our food with fresh, quality ingredients</li>
                <li>Please inform us of any food allergies or dietary restrictions when ordering</li>
                <li>While we take precautions, we cannot guarantee a completely allergen-free environment</li>
                <li>Food should be consumed within the recommended timeframe</li>
                <li>Customers with severe allergies should exercise caution and consult with us before ordering</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="font-heading text-2xl font-semibold text-ocean-dark mb-4">
                7. Delivery Terms
              </h2>
              <ul className="list-disc pl-6 font-body text-gray-warm space-y-2">
                <li>Delivery is available within Diani and Ukunda areas</li>
                <li>Delivery times are estimates and may be affected by traffic or weather</li>
                <li>Customer must provide accurate delivery address and contact information</li>
                <li>If delivery cannot be completed due to incorrect information, redelivery fees may apply</li>
                <li>Delivery charges may vary based on location</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="font-heading text-2xl font-semibold text-ocean-dark mb-4">
                8. Accommodation Rules
              </h2>
              <p className="font-body text-gray-warm mb-4">
                Guests staying at our accommodation agree to the following house rules:
              </p>
              <ul className="list-disc pl-6 font-body text-gray-warm space-y-2">
                <li>No smoking indoors</li>
                <li>No pets allowed</li>
                <li>No parties or events without prior approval</li>
                <li>Respect quiet hours (10 PM - 7 AM)</li>
                <li>Keep the property clean and tidy</li>
                <li>Report any damages immediately</li>
                <li>Maximum 2 guests unless otherwise arranged</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="font-heading text-2xl font-semibold text-ocean-dark mb-4">
                9. Limitation of Liability
              </h2>
              <p className="font-body text-gray-warm">
                Chef Angela shall not be liable for any indirect, incidental, special, or
                consequential damages arising from the use of our services. Our total liability
                shall not exceed the amount paid for the specific service in question.
                We are not responsible for any loss or damage to personal belongings during
                accommodation stays or chef service visits.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="font-heading text-2xl font-semibold text-ocean-dark mb-4">
                10. Intellectual Property
              </h2>
              <p className="font-body text-gray-warm">
                All content on our website, including text, images, logos, and recipes, is the
                property of Chef Angela and is protected by copyright laws. You may not reproduce,
                distribute, or use our content without prior written permission.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="font-heading text-2xl font-semibold text-ocean-dark mb-4">
                11. Governing Law
              </h2>
              <p className="font-body text-gray-warm">
                These Terms of Service shall be governed by and construed in accordance with
                the laws of Kenya. Any disputes arising from these terms or our services shall
                be resolved through negotiation or, if necessary, through the courts of Kenya.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="font-heading text-2xl font-semibold text-ocean-dark mb-4">
                12. Changes to Terms
              </h2>
              <p className="font-body text-gray-warm">
                We reserve the right to modify these Terms of Service at any time. Changes will
                be effective immediately upon posting on our website. Your continued use of our
                services after any changes indicates your acceptance of the modified terms.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="font-heading text-2xl font-semibold text-ocean-dark mb-4">
                13. Contact Information
              </h2>
              <p className="font-body text-gray-warm mb-4">
                For any questions regarding these Terms of Service, please contact us:
              </p>
              <div className="bg-sand-light rounded-xl p-6">
                <p className="font-ui text-ocean-dark mb-2">
                  <strong>Chef Angela</strong>
                </p>
                <p className="font-body text-gray-warm">
                  Diani Beach, Kwale County, Kenya<br />
                  Phone: <a href="tel:+254706310918" className="text-teal hover:underline">+254 706 310 918</a><br />
                  Email: <a href="mailto:liyayiangela20@gmail.com" className="text-teal hover:underline">liyayiangela20@gmail.com</a><br />
                  WhatsApp: <a href="https://wa.me/254706310918" className="text-teal hover:underline" target="_blank" rel="noopener noreferrer">+254 706 310 918</a>
                </p>
              </div>
            </div>

          </div>

          {/* Back Link */}
          <div className="mt-12 pt-8 border-t border-gray-light">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-ui text-teal hover:text-teal-dark transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
