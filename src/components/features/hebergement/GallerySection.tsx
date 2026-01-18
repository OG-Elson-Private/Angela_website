'use client'

import { ImageCarousel } from '@/components/ui'

const galleryImages = [
  { src: '/images/apartment/gallery/img1_pool.jpg', alt: 'Swimming pool view' },
  { src: '/images/apartment/gallery/img2_pool.jpg', alt: 'Pool area' },
  { src: '/images/apartment/gallery/img3_pool.jpg', alt: 'Pool and garden' },
  { src: '/images/apartment/gallery/IMG-20260117-WA0003.jpg', alt: 'Apartment interior' },
  { src: '/images/apartment/gallery/IMG-20260117-WA0006.jpg', alt: 'Living space' },
  { src: '/images/apartment/gallery/IMG-20260117-WA0007.jpg', alt: 'Bedroom' },
  { src: '/images/apartment/gallery/IMG-20260117-WA0008.jpg', alt: 'Kitchen area' },
  { src: '/images/apartment/gallery/IMG-20260117-WA0009.jpg', alt: 'Bathroom' },
  { src: '/images/apartment/gallery/IMG-20260117-WA0010.jpg', alt: 'Apartment view' },
  { src: '/images/apartment/gallery/IMG-20260117-WA0011.jpg', alt: 'Outdoor space' },
  { src: '/images/apartment/gallery/IMG-20260117-WA0012.jpg', alt: 'Apartment detail' },
  { src: '/images/apartment/gallery/IMG-20260117-WA0013.jpg', alt: 'Room view' },
  { src: '/images/apartment/gallery/IMG-20260117-WA0014.jpg', alt: 'Interior design' },
  { src: '/images/apartment/gallery/IMG-20260117-WA0015.jpg', alt: 'Comfort space' },
  { src: '/images/apartment/gallery/IMG-20260117-WA0016.jpg', alt: 'Apartment amenity' },
  { src: '/images/apartment/gallery/IMG-20260117-WA0017.jpg', alt: 'Living area' },
  { src: '/images/apartment/gallery/IMG-20260117-WA0018.jpg', alt: 'Relaxation spot' },
  { src: '/images/apartment/gallery/IMG-20260117-WA0019.jpg', alt: 'Property view' },
]

export function GallerySection() {
  return (
    <section id="gallery" className="section-padding bg-sand-light">
      <div className="container-standard">
        <div className="text-center mb-12">
          <p className="font-script text-2xl text-coral mb-2">See It Yourself</p>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-ocean-dark">
            Photo Gallery
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <ImageCarousel images={galleryImages} />
        </div>
      </div>
    </section>
  )
}
