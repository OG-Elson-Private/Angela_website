import { describe, it, expect } from 'vitest'
import { renderToString } from 'react-dom/server'
import { VideoSection } from './VideoSection'

describe('VideoSection', () => {
  it('should render iframe with youtube-nocookie embed URL', () => {
    const html = renderToString(<VideoSection />)
    expect(html).toContain('youtube-nocookie.com/embed/aUJrxqSxJQo')
  })

  it('should have descriptive iframe title for accessibility', () => {
    const html = renderToString(<VideoSection />)
    expect(html).toContain('Studio Upgrade 2026')
    expect(html).toMatch(/title="[^"]*Studio Upgrade 2026[^"]*"/)
  })

  it('should include sandbox attribute for security', () => {
    const html = renderToString(<VideoSection />)
    expect(html).toMatch(/sandbox="[^"]*allow-scripts[^"]*"/)
  })

  it('should use w-full on wrapper for mobile responsiveness', () => {
    const html = renderToString(<VideoSection />)
    expect(html).toMatch(/w-full max-w-\[400px\]/)
  })

  it('should link section to heading via aria-labelledby', () => {
    const html = renderToString(<VideoSection />)
    expect(html).toMatch(/aria-labelledby="video-tour-heading"/)
    expect(html).toMatch(/id="video-tour-heading"/)
  })

  it('should use lazy loading for performance', () => {
    const html = renderToString(<VideoSection />)
    expect(html).toMatch(/loading="lazy"/)
  })

  it('should allow fullscreen', () => {
    const html = renderToString(<VideoSection />)
    // React renders allowFullScreen as allowfullscreen (HTML boolean attr)
    expect(html.toLowerCase()).toContain('allowfullscreen')
  })

  it('should keep #gallery anchor id for backward compat with hero link', () => {
    const html = renderToString(<VideoSection />)
    expect(html).toMatch(/id="gallery"/)
  })

  it('should use 9:16 aspect ratio for vertical video', () => {
    const html = renderToString(<VideoSection />)
    expect(html).toMatch(/aspect-\[9\/16\]/)
  })
})
