import type { Metadata } from 'next'
import Script from 'next/script'
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
  metadataBase: new URL('https://www.chefangela.co.ke'),
  verification: {
    other: {
      'ahrefs-site-verification': '891dbc04eca9d7b3a034347d520cd51cbff47d7da1cc96a97afb42c185ebf21f',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
  title: {
    default: 'Chef Angie | Authentic Kenyan Cuisine in Diani Beach',
    template: '%s | Chef Angie',
  },
  description: 'Authentic Kenyan cuisine in Diani Beach. Weekly delivery (Biryani Friday, Pilau Tuesday), private chef & vacation apartment with pool.',
  keywords: ['chef', 'diani beach', 'kenya', 'cuisine', 'biryani', 'pilau', 'vacation rental', 'apartment', 'catering'],
  authors: [{ name: 'Chef Angie' }],
  creator: 'Chef Angie',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.chefangela.co.ke',
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

        {/* Ahrefs Web Analytics */}
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="UPk/YPj4v2tX61MD7SCZoA"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
