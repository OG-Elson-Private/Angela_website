import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Contact | Chef Angie - Diani Beach',
  description: 'Contact Chef Angie for food orders, private chef services, catering inquiries, or apartment bookings in Diani Beach, Kenya.',
  openGraph: {
    title: 'Contact Chef Angie',
    description: 'Get in touch for food orders and accommodation in Diani Beach',
    images: ['/images/og/og-contact.jpg'],
  },
}

const contactMethods = [
  {
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    title: 'WhatsApp',
    subtitle: 'Fastest response',
    value: '+254 719 635 944',
    href: 'https://wa.me/254719635944?text=Hello%20Chef%20Angie!',
    color: 'bg-[#25D366]',
    external: true,
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    title: 'Phone',
    subtitle: 'Call directly',
    value: '+254 719 635 944',
    href: 'tel:+254719635944',
    color: 'bg-teal',
    external: false,
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    title: 'Instagram',
    subtitle: 'Follow us',
    value: '@chef.angie002',
    href: 'https://instagram.com/chef.angie002',
    color: 'bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888]',
    external: true,
  },
]

const services = [
  {
    title: 'Food Orders',
    description: 'Biryani Friday & Pilau Tuesday deliveries',
    link: '/cuisine/livraisons',
    linkText: 'View Menu',
  },
  {
    title: 'Private Chef',
    description: 'In-home cooking experiences',
    link: '/cuisine#chef-prive',
    linkText: 'Learn More',
  },
  {
    title: 'Catering',
    description: 'Events & special occasions',
    link: '/cuisine#traiteur',
    linkText: 'Get Quote',
  },
  {
    title: 'Accommodation',
    description: 'Apartment with pool in Diani',
    link: '/hebergement',
    linkText: 'Book Now',
  },
]

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-ocean-dark text-white">
        <div className="container-standard text-center px-4">
          <p className="font-script text-3xl text-coral mb-4">Get in Touch</p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Contact Chef Angie
          </h1>
          <p className="font-body text-lg text-white/80 max-w-2xl mx-auto">
            Have a question about our food, want to book the apartment, or interested in
            private chef services? Reach out - I&apos;d love to hear from you!
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="section-padding bg-sand-light">
        <div className="container-standard">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((method) => (
              <a
                key={method.title}
                href={method.href}
                target={method.external ? '_blank' : undefined}
                rel={method.external ? 'noopener noreferrer' : undefined}
                className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow duration-300 group"
              >
                <div className={`w-16 h-16 ${method.color} text-white rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {method.icon}
                </div>
                <h2 className="font-heading text-xl font-semibold text-ocean-dark mb-1">
                  {method.title}
                </h2>
                <p className="font-body text-sm text-gray-warm mb-2">{method.subtitle}</p>
                <p className="font-ui font-medium text-teal">{method.value}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Services Quick Links */}
      <section className="section-padding bg-white">
        <div className="container-standard">
          <div className="text-center mb-12">
            <p className="font-script text-2xl text-coral mb-2">How Can I Help?</p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-ocean-dark">
              What Are You Looking For?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div key={service.title} className="bg-sand-light rounded-2xl p-6">
                <h3 className="font-heading text-lg font-semibold text-ocean-dark mb-2">
                  {service.title}
                </h3>
                <p className="font-body text-sm text-gray-warm mb-4">{service.description}</p>
                <Link
                  href={service.link}
                  className="font-ui text-sm font-medium text-teal hover:text-coral transition-colors inline-flex items-center gap-1"
                >
                  {service.linkText}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="section-padding bg-seafoam">
        <div className="container-standard">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-script text-2xl text-coral mb-2">Location</p>
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-ocean-dark mb-6">
                Find Us in Diani Beach
              </h2>
              <p className="font-body text-gray-warm mb-6">
                Located in the heart of Diani Beach, Kenya. Whether you&apos;re here for the
                food or staying at the apartment, you&apos;ll be close to the beautiful
                beaches and local attractions.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-teal/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-ui font-semibold text-ocean-dark">Address</p>
                    <p className="font-body text-gray-warm">Diani Beach, Kwale County, Kenya</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-teal/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-ui font-semibold text-ocean-dark">Hours</p>
                    <p className="font-body text-gray-warm">Open 7 days a week</p>
                    <p className="font-body text-gray-warm text-sm">Order deadlines: Thursday for Friday, Monday for Tuesday</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-teal/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-ui font-semibold text-ocean-dark">Delivery Areas</p>
                    <p className="font-body text-gray-warm">Diani, Ukunda, Galu, Tiwi</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-light rounded-2xl aspect-video flex items-center justify-center">
              <p className="text-gray-warm font-body">Map - Diani Beach, Kenya</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-ocean-dark text-white">
        <div className="container-standard text-center px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-4">
            Ready to Get Started?
          </h2>
          <p className="font-body text-lg text-white/80 max-w-xl mx-auto mb-8">
            The fastest way to reach me is via WhatsApp. Send a message and I&apos;ll
            get back to you as soon as possible!
          </p>
          <Button variant="gradient" size="lg" asChild>
            <a
              href="https://wa.me/254719635944?text=Hello%20Chef%20Angie!%20I%20would%20like%20to%20know%20more%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Message on WhatsApp
            </a>
          </Button>
        </div>
      </section>
    </>
  )
}
