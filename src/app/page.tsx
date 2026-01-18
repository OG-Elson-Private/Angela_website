import {
  Hero,
  TwoPillars,
  WeeklySpecials,
  CombinedExperience,
  AboutPreview,
  Testimonials,
  CTASection,
} from '@/components/sections'

export default function HomePage() {
  return (
    <>
      {/* Hero Section - Full screen with background image */}
      <Hero />

      {/* Two Pillars - Cuisine & Stay cards */}
      <TwoPillars />

      {/* Weekly Specials - Biryani Friday & Pilau Tuesday */}
      <WeeklySpecials />

      {/* Combined Experience Banner */}
      <CombinedExperience />

      {/* Meet Chef Angie Preview */}
      <AboutPreview />

      {/* Client Testimonials */}
      <Testimonials />

      {/* Final CTA Section */}
      <CTASection />
    </>
  )
}
