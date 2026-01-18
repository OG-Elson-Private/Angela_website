import type { Metadata } from 'next'
import { Cormorant_Garamond, Cormorant, Sacramento, Lato, Raleway } from 'next/font/google'
import { Header, Footer, FloatingButtons } from '@/components/layout'
import './globals.css'

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant-garamond',
  display: 'swap',
})

const cormorant = Cormorant({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const sacramento = Sacramento({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-sacramento',
  display: 'swap',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-lato',
  display: 'swap',
})

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-raleway',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Chef Angie | Authentic Kenyan Cuisine in Diani Beach',
    template: '%s | Chef Angie',
  },
  description: 'Experience authentic Kenyan cuisine with Chef Angie in Diani Beach. Weekly food delivery (Biryani Friday, Pilau Tuesday), private chef services, and vacation apartment rental with pool.',
  keywords: ['chef', 'diani beach', 'kenya', 'cuisine', 'biryani', 'pilau', 'vacation rental', 'apartment', 'catering'],
  authors: [{ name: 'Chef Angie' }],
  creator: 'Chef Angie',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://chefangie.co.ke',
    siteName: 'Chef Angie',
    title: 'Chef Angie | Authentic Kenyan Cuisine in Diani Beach',
    description: 'Experience authentic Kenyan cuisine and coastal hospitality in Diani Beach, Kenya.',
    images: [
      {
        url: '/images/og/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Chef Angie - Authentic Kenyan Cuisine',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chef Angie | Authentic Kenyan Cuisine in Diani Beach',
    description: 'Experience authentic Kenyan cuisine and coastal hospitality in Diani Beach, Kenya.',
    images: ['/images/og/og-home.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${cormorant.variable} ${sacramento.variable} ${lato.variable} ${raleway.variable}`}
    >
      <body className="font-body bg-sand-light text-charcoal antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  )
}
