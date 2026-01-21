# SEO Optimization Checklist

Use this checklist for a complete SEO audit. Mark items as you verify/implement them.

---

## 1. Technical SEO

### Crawlability & Indexing
- [ ] `robots.txt` exists and is correctly configured
- [ ] `sitemap.xml` exists and includes all public pages
- [ ] Sitemap submitted to Google Search Console
- [ ] No important pages blocked by robots.txt
- [ ] No `noindex` tags on pages that should be indexed
- [ ] Canonical URLs set correctly (avoid duplicate content)
- [ ] 301 redirects for old/moved pages (no 404 errors)
- [ ] HTTPS enabled site-wide (no mixed content)
- [ ] www vs non-www consistent (redirect one to the other)

### Favicon & Icons
- [ ] `favicon.ico` (48x48) exists
- [ ] `favicon-16x16.png` exists
- [ ] `favicon-32x32.png` exists
- [ ] `icon-96.png` exists (Google Search recommended)
- [ ] `apple-touch-icon.png` (180x180) exists
- [ ] `icon-192.png` exists (PWA)
- [ ] `icon-512.png` exists (PWA)
- [ ] All icons properly linked in HTML `<head>`
- [ ] `manifest.json` / `manifest.webmanifest` configured
- [ ] Icons are actual logo (not placeholder)

### Site Structure
- [ ] Clean URL structure (readable, no special characters)
- [ ] Logical hierarchy (max 3 clicks to any page)
- [ ] Breadcrumbs implemented (if applicable)
- [ ] Internal linking between related pages
- [ ] No orphan pages (pages with no internal links)
- [ ] 404 page exists and is helpful

---

## 2. On-Page SEO (Per Page)

### Meta Tags
- [ ] `<title>` tag present (50-60 characters)
- [ ] `<title>` includes primary keyword
- [ ] `<title>` is unique across site
- [ ] `<meta name="description">` present (150-160 characters)
- [ ] Description includes primary keyword
- [ ] Description has call-to-action
- [ ] Description is unique across site
- [ ] `<meta name="viewport">` set for mobile
- [ ] `<link rel="canonical">` set correctly

### Open Graph (Social)
- [ ] `og:title` set
- [ ] `og:description` set
- [ ] `og:image` set (1200x630 recommended)
- [ ] `og:url` set
- [ ] `og:type` set
- [ ] `og:site_name` set

### Twitter Cards
- [ ] `twitter:card` set
- [ ] `twitter:title` set
- [ ] `twitter:description` set
- [ ] `twitter:image` set

### Content Structure
- [ ] ONE `<h1>` per page
- [ ] H1 includes primary keyword
- [ ] Heading hierarchy logical (H1 > H2 > H3, no skipping)
- [ ] Primary keyword in first 100 words
- [ ] Content is unique (not copied)
- [ ] Content length adequate (300+ words for main pages)
- [ ] Keyword density natural (not stuffed)

### Images
- [ ] All images have `alt` attribute
- [ ] Alt text is descriptive (not "image1.jpg")
- [ ] Alt text includes keywords (naturally)
- [ ] Images have `width` and `height` attributes
- [ ] Images are compressed/optimized
- [ ] Lazy loading for below-fold images
- [ ] WebP format used where possible

### Links
- [ ] Internal links to related pages
- [ ] External links to authoritative sources (if applicable)
- [ ] No broken links (404s)
- [ ] Links have descriptive anchor text (not "click here")
- [ ] Important links are `dofollow`
- [ ] Untrusted external links are `nofollow`

---

## 3. Schema.org Structured Data

### Homepage
- [ ] Organization/LocalBusiness schema present
- [ ] `name`, `description`, `url` set
- [ ] `telephone`, `email` set
- [ ] `address` with full PostalAddress
- [ ] `geo` with latitude/longitude
- [ ] `image` set (logo or main image)
- [ ] `sameAs` with social media links
- [ ] `openingHoursSpecification` (if applicable)

### Service Pages
- [ ] Service/FoodService schema present
- [ ] Services listed with descriptions
- [ ] Prices included (if applicable)
- [ ] Service area defined

### Product/Menu Pages
- [ ] Product/Menu/MenuItem schema present
- [ ] Prices included
- [ ] Availability status
- [ ] Images included

### Accommodation Pages
- [ ] LodgingBusiness schema present
- [ ] `checkinTime`, `checkoutTime` set
- [ ] `amenityFeature` listed
- [ ] `priceRange` or specific `offers`
- [ ] `numberOfRooms`, `occupancy` (if applicable)

### Blog/Article Pages
- [ ] Article/BlogPosting schema present
- [ ] `author` specified
- [ ] `datePublished`, `dateModified` set
- [ ] `image` set

### Validation
- [ ] Schema tested with Google Rich Results Test
- [ ] No errors in schema validation
- [ ] Schema renders correctly in search results

---

## 4. Local SEO

### NAP Consistency
- [ ] Business name identical everywhere
- [ ] Address identical everywhere
- [ ] Phone number identical everywhere
- [ ] Format matches Google Business Profile

### Google Business Profile
- [ ] Profile created and claimed
- [ ] Profile verified
- [ ] Correct primary category selected
- [ ] Secondary categories added
- [ ] Complete business information
- [ ] Website URL linked (exact match, https://)
- [ ] Business hours set
- [ ] Services/products added
- [ ] Photos uploaded (logo, cover, products)
- [ ] Posts published regularly
- [ ] Reviews responded to

### Google Search Console
- [ ] Property added and verified
- [ ] Sitemap submitted
- [ ] All pages indexed (no coverage errors)
- [ ] Mobile usability: no issues
- [ ] Core Web Vitals: all green
- [ ] No security issues
- [ ] Index requests submitted for new/updated pages

### Local Keywords
- [ ] City/region in page titles
- [ ] City/region in meta descriptions
- [ ] City/region in H1/H2 headings
- [ ] City/region in content body
- [ ] City/region in image alt text

### Local Directories
- [ ] Listed on relevant local directories
- [ ] Listed on industry-specific directories
- [ ] NAP consistent across all listings
- [ ] Backlinks from local sources

---

## 5. Performance (Core Web Vitals)

### LCP (Largest Contentful Paint) - Target: < 2.5s
- [ ] Hero/main image optimized
- [ ] Critical CSS inlined or preloaded
- [ ] Fonts preloaded
- [ ] Server response time < 200ms (TTFB)
- [ ] CDN used for static assets

### FID/INP (First Input Delay) - Target: < 100ms
- [ ] JavaScript minimized and deferred
- [ ] Third-party scripts loaded async
- [ ] No long-running JavaScript tasks
- [ ] Event handlers optimized

### CLS (Cumulative Layout Shift) - Target: < 0.1
- [ ] All images have dimensions set
- [ ] Fonts use `font-display: swap`
- [ ] Ads/embeds have reserved space
- [ ] No content inserted above existing content

### General Performance
- [ ] PageSpeed Insights score > 90
- [ ] Total page size < 3MB
- [ ] Requests < 100 per page
- [ ] GZIP/Brotli compression enabled
- [ ] Browser caching configured
- [ ] Images lazy loaded

---

## 6. Accessibility (SEO Impact)

- [ ] All images have `alt` text
- [ ] Form inputs have `<label>` elements
- [ ] Color contrast ≥ 4.5:1 (text) / 3:1 (large text)
- [ ] Focus states visible on all interactive elements
- [ ] Semantic HTML used (`<header>`, `<main>`, `<nav>`, etc.)
- [ ] Skip-to-content link present
- [ ] ARIA labels on icon buttons
- [ ] Logical tab order
- [ ] No keyboard traps
- [ ] No auto-playing audio/video

---

## 7. Mobile SEO

- [ ] Responsive design (works on all screen sizes)
- [ ] Mobile viewport configured
- [ ] Touch targets ≥ 48x48 pixels
- [ ] Text readable without zooming (≥ 16px)
- [ ] No horizontal scrolling required
- [ ] Mobile-friendly test passes
- [ ] Same content on mobile and desktop

---

## 8. Content Quality

- [ ] Unique, original content
- [ ] Valuable to users (answers questions)
- [ ] Well-written (grammar, spelling)
- [ ] Regularly updated
- [ ] Comprehensive coverage of topic
- [ ] Includes relevant multimedia (images, videos)
- [ ] Clear call-to-action
- [ ] Easy to read (short paragraphs, bullet points)

---

## 9. Security

- [ ] HTTPS enabled (SSL certificate valid)
- [ ] No mixed content warnings
- [ ] Security headers configured
- [ ] No malware or suspicious scripts
- [ ] Contact forms protected (CAPTCHA, validation)
- [ ] Regular backups

---

## 10. Analytics & Monitoring

- [ ] Google Analytics (or alternative) installed
- [ ] Google Search Console connected
- [ ] Conversion tracking set up
- [ ] 404 error monitoring
- [ ] Uptime monitoring
- [ ] Regular SEO audits scheduled

---

## Priority Guide

**HIGH IMPACT (Do First)**:
- Title tags & meta descriptions
- H1 headings with keywords
- Schema.org structured data
- Google Business Profile
- Core Web Vitals
- Mobile optimization

**MEDIUM IMPACT**:
- Open Graph tags
- Image optimization
- Internal linking
- Content quality
- Local keywords

**LOWER IMPACT (But Still Important)**:
- Twitter cards
- Accessibility details
- Secondary schema types
- Directory listings
