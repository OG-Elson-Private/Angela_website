import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

const PAGES: Record<string, { title: string; subtitle: string }> = {
  home: {
    title: 'Authentic Kenyan Cuisine',
    subtitle: 'Private Chef · Food Delivery · Vacation Apartment — Diani Beach, Kenya',
  },
  cuisine: {
    title: 'Private Chef & Food Delivery',
    subtitle: 'Biryani Friday · Pilau Tuesday · Catering · Diani Beach',
  },
  stay: {
    title: 'Vacation Apartment',
    subtitle: 'Holiday Rental with Pool & AC — From 3,500 KES/night · Diani Beach',
  },
  about: {
    title: 'Meet Chef Angie',
    subtitle: 'Passionate Cook · 4+ Years Experience · Diani Beach, Kenya',
  },
  'ask-angela': {
    title: 'Your Diani Insider',
    subtitle: 'We Find You the Best Deal Possible in Diani Beach, Kenya',
  },
  contact: {
    title: 'Get in Touch',
    subtitle: 'WhatsApp · Phone · Instagram — Diani Beach, Kenya',
  },
  testimonials: {
    title: 'Customer Reviews',
    subtitle: 'Real Experiences from Our Guests — Diani Beach, Kenya',
  },
  privacy: {
    title: 'Privacy Policy',
    subtitle: 'How We Protect Your Data — Chef Angie, Diani Beach',
  },
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page')

  if (!page || !PAGES[page]) {
    return new Response(`Missing or invalid "page" parameter. Valid: ${Object.keys(PAGES).join(', ')}`, {
      status: 400,
    })
  }

  const { title, subtitle } = PAGES[page]

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #134E4A 0%, #0D9488 50%, #0F766E 100%)',
          padding: '60px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Decorative accent */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(249,115,22,0.3) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Brand name */}
        <div
          style={{
            fontSize: '32px',
            color: '#F97316',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            marginBottom: '20px',
            display: 'flex',
          }}
        >
          Chef Angie
        </div>

        {/* Page title */}
        <div
          style={{
            fontSize: '64px',
            fontWeight: 700,
            color: 'white',
            textAlign: 'center',
            lineHeight: 1.1,
            marginBottom: '24px',
            maxWidth: '900px',
            display: 'flex',
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '24px',
            color: 'rgba(255,255,255,0.8)',
            textAlign: 'center',
            maxWidth: '800px',
            display: 'flex',
          }}
        >
          {subtitle}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              fontSize: '18px',
              color: 'rgba(255,255,255,0.6)',
              display: 'flex',
            }}
          >
            www.chefangela.co.ke
          </div>
          <div
            style={{
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: '#F97316',
              display: 'flex',
            }}
          />
          <div
            style={{
              fontSize: '18px',
              color: 'rgba(255,255,255,0.6)',
              display: 'flex',
            }}
          >
            Diani Beach, Kenya
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=86400',
      },
    }
  )
}
