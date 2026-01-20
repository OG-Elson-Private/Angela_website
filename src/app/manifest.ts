import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Chef Angela - Authentic Kenyan Cuisine',
    short_name: 'Chef Angela',
    description: 'Authentic Kenyan cuisine in Diani Beach. Weekly delivery, private chef & vacation apartment.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFF9F0',
    theme_color: '#0D7377',
    icons: [
      {
        src: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
    ],
  }
}
