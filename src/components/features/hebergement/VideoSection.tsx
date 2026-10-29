interface VideoSectionProps {
  /** YouTube video id. Defaults to the studio tour. */
  videoId?: string
  /** Accessible iframe title. */
  title?: string
  heading?: string
  intro?: string
  id?: string
  headingId?: string
  /** Wrapper classes. Defaults to a full-width sand section. */
  className?: string
}

export function VideoSection({
  videoId = 'aUJrxqSxJQo',
  title = "Angie's Cozy Studio Diani Beach — Studio Upgrade 2026",
  heading = 'Video Tour',
  intro = 'Take a virtual tour of our newly upgraded Studio — air conditioning installed 2026.',
  id = 'gallery',
  headingId = 'video-tour-heading',
  className = 'section-padding bg-sand-light',
}: VideoSectionProps) {
  return (
    <section id={id} aria-labelledby={headingId} className={className}>
      <div className="container-standard">
        <div className="text-center mb-12">
          <p className="font-script text-2xl text-coral mb-2">See It Yourself</p>
          <h2 id={headingId} className="font-heading text-3xl md:text-4xl font-semibold text-ocean-dark">
            {heading}
          </h2>
          <p className="font-body text-gray-warm mt-3 max-w-xl mx-auto">{intro}</p>
        </div>

        <div className="relative w-full max-w-[400px] mx-auto aspect-[9/16] rounded-2xl overflow-hidden shadow-lg">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}`}
            title={title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>
    </section>
  )
}
