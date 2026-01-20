import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Chef Angela',
  description: 'Privacy Policy for Chef Angela - Learn how we collect, use, and protect your personal information when using our culinary services in Diani Beach, Kenya.',
  openGraph: {
    title: 'Privacy Policy | Chef Angela',
    description: 'Privacy Policy for Chef Angela culinary services',
    type: 'website',
    url: 'https://www.chefangela.co.ke/privacy',
    images: ['/images/og/og-home.jpg'],
  },
}

export default function PrivacyPage() {
  return (
    <>
      {/* Header */}
      <section className="py-16 md:py-24 bg-ocean-dark">
        <div className="container-standard text-center text-white px-4">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Privacy Policy
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
                1. Introduction
              </h2>
              <p className="font-body text-gray-warm mb-4">
                Welcome to Chef Angela (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting
                your personal information and your right to privacy. This Privacy Policy explains how we
                collect, use, disclose, and safeguard your information when you use our services,
                including our website at chefangela.co.ke, our culinary services, and accommodation services
                in Diani Beach, Kenya.
              </p>
              <p className="font-body text-gray-warm">
                By using our services, you agree to the collection and use of information in accordance
                with this policy.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="font-heading text-2xl font-semibold text-ocean-dark mb-4">
                2. Information We Collect
              </h2>
              <p className="font-body text-gray-warm mb-4">
                We may collect the following types of information:
              </p>
              <h3 className="font-ui font-semibold text-ocean-dark mb-2">Personal Information</h3>
              <ul className="list-disc pl-6 mb-4 font-body text-gray-warm space-y-2">
                <li>Name and contact information (phone number, email address)</li>
                <li>Delivery address for food orders</li>
                <li>Dietary preferences and allergies</li>
                <li>Booking details for accommodation or chef services</li>
                <li>Payment information (processed securely via M-Pesa or bank transfer)</li>
              </ul>
              <h3 className="font-ui font-semibold text-ocean-dark mb-2">Automatically Collected Information</h3>
              <ul className="list-disc pl-6 font-body text-gray-warm space-y-2">
                <li>Device and browser information</li>
                <li>IP address and location data</li>
                <li>Website usage data and cookies</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="font-heading text-2xl font-semibold text-ocean-dark mb-4">
                3. How We Use Your Information
              </h2>
              <p className="font-body text-gray-warm mb-4">
                We use your personal information for the following purposes:
              </p>
              <ul className="list-disc pl-6 font-body text-gray-warm space-y-2">
                <li>To process and fulfill your food orders and deliveries</li>
                <li>To manage accommodation bookings</li>
                <li>To arrange private chef services</li>
                <li>To communicate with you about your orders and services</li>
                <li>To send you updates about our weekly specials (Biryani Friday, Pilau Tuesday)</li>
                <li>To improve our services and website</li>
                <li>To comply with legal obligations</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="font-heading text-2xl font-semibold text-ocean-dark mb-4">
                4. Information Sharing
              </h2>
              <p className="font-body text-gray-warm mb-4">
                We do not sell, trade, or rent your personal information to third parties.
                We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 font-body text-gray-warm space-y-2">
                <li>With delivery personnel to fulfill your orders</li>
                <li>With payment processors to complete transactions</li>
                <li>When required by law or to protect our rights</li>
                <li>With your consent for any other purpose</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="font-heading text-2xl font-semibold text-ocean-dark mb-4">
                5. Data Security
              </h2>
              <p className="font-body text-gray-warm">
                We implement appropriate technical and organizational measures to protect your
                personal information against unauthorized access, alteration, disclosure, or destruction.
                However, no method of transmission over the Internet is 100% secure, and we cannot
                guarantee absolute security.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="font-heading text-2xl font-semibold text-ocean-dark mb-4">
                6. Your Rights
              </h2>
              <p className="font-body text-gray-warm mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 font-body text-gray-warm space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="font-heading text-2xl font-semibold text-ocean-dark mb-4">
                7. Cookies
              </h2>
              <p className="font-body text-gray-warm">
                Our website uses cookies to enhance your browsing experience. Cookies are small
                text files stored on your device that help us analyze website traffic and improve
                our services. You can choose to disable cookies through your browser settings,
                but this may affect some website functionality.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="font-heading text-2xl font-semibold text-ocean-dark mb-4">
                8. Third-Party Links
              </h2>
              <p className="font-body text-gray-warm">
                Our website may contain links to third-party websites (such as WhatsApp, Instagram,
                or Airbnb). We are not responsible for the privacy practices of these external sites.
                We encourage you to read their privacy policies.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="font-heading text-2xl font-semibold text-ocean-dark mb-4">
                9. Children&apos;s Privacy
              </h2>
              <p className="font-body text-gray-warm">
                Our services are not directed to individuals under the age of 18. We do not
                knowingly collect personal information from children. If you are a parent or
                guardian and believe your child has provided us with personal information,
                please contact us.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="font-heading text-2xl font-semibold text-ocean-dark mb-4">
                10. Changes to This Policy
              </h2>
              <p className="font-body text-gray-warm">
                We may update this Privacy Policy from time to time. Any changes will be posted
                on this page with an updated revision date. We encourage you to review this
                policy periodically.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="font-heading text-2xl font-semibold text-ocean-dark mb-4">
                11. Contact Us
              </h2>
              <p className="font-body text-gray-warm mb-4">
                If you have any questions about this Privacy Policy or our data practices,
                please contact us:
              </p>
              <div className="bg-sand-light rounded-xl p-6">
                <p className="font-ui text-ocean-dark mb-2">
                  <strong>Chef Angela</strong>
                </p>
                <p className="font-body text-gray-warm">
                  Diani Beach, Kwale County, Kenya<br />
                  Phone: <a href="tel:+254719635944" className="text-teal hover:underline">+254 719 635 944</a><br />
                  Email: <a href="mailto:liyayiangela20@gmail.com" className="text-teal hover:underline">liyayiangela20@gmail.com</a><br />
                  WhatsApp: <a href="https://wa.me/254719635944" className="text-teal hover:underline" target="_blank" rel="noopener noreferrer">+254 719 635 944</a>
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
