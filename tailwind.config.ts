import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Ocean & Coastal - Primary
        teal: {
          DEFAULT: '#0D9488',
          light: '#14B8A6',
          dark: '#0F766E',
        },
        turquoise: {
          DEFAULT: '#06B6D4',
        },
        // Warmth & Spices - Secondary
        coral: {
          DEFAULT: '#F97316',
          light: '#FB923C',
          dark: '#EA580C',
        },
        terracotta: {
          DEFAULT: '#C2410C',
        },
        // Accents
        sand: {
          DEFAULT: '#D4A574',
          light: '#FEF7EC',
        },
        palm: {
          DEFAULT: '#166534',
        },
        sunset: {
          DEFAULT: '#FBBF24',
        },
        // Neutrals
        ocean: {
          dark: '#134E4A',
        },
        charcoal: {
          DEFAULT: '#1F2937',
        },
        gray: {
          warm: '#57534E',
          light: '#E7E5E4',
        },
        seafoam: {
          DEFAULT: '#CCFBF1',
        },
      },
      fontFamily: {
        display: ['var(--font-cormorant-garamond)', 'Georgia', 'serif'],
        heading: ['var(--font-cormorant)', 'Georgia', 'serif'],
        script: ['var(--font-sacramento)', 'cursive'],
        body: ['var(--font-lato)', 'system-ui', 'sans-serif'],
        ui: ['var(--font-raleway)', 'sans-serif'],
      },
      fontSize: {
        'display-sm': ['2.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },
      boxShadow: {
        'card': '0 4px 20px rgba(13, 148, 136, 0.08)',
        'card-hover': '0 12px 40px rgba(13, 148, 136, 0.15)',
        'button': '0 4px 14px rgba(13, 148, 136, 0.3)',
        'button-hover': '0 6px 20px rgba(13, 148, 136, 0.4)',
        'coral': '0 4px 20px rgba(249, 115, 22, 0.4)',
      },
      backgroundImage: {
        'ocean-sunset': 'linear-gradient(135deg, #0D9488 0%, #06B6D4 50%, #F97316 100%)',
        'sandy-beach': 'linear-gradient(180deg, #FEF7EC 0%, #FFFFFF 100%)',
        'tropical-warmth': 'linear-gradient(90deg, #F97316 0%, #FBBF24 100%)',
        'ocean-depth': 'linear-gradient(180deg, #134E4A 0%, #0F766E 100%)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
}

export default config
