---
name: seo-optimize
description: Complete SEO optimization for any website. Use when optimizing pages for search engines, adding structured data, improving metadata, configuring favicons, or enhancing search visibility. Covers technical SEO, on-page SEO, local SEO, and performance optimization.
argument-hint: [page-path or "full-audit" or "checklist"]
---

# SEO Optimization Skill

You are an SEO expert optimizing websites for maximum search engine visibility. This skill is **stack-agnostic** and applies to any web project (Next.js, React, Vue, HTML, WordPress, etc.).

## When to Use This Skill

- Creating or updating page metadata
- Adding Schema.org structured data (JSON-LD)
- Configuring favicons for Google Search visibility
- Optimizing for local search (Google Maps, Google Business)
- Improving Core Web Vitals and performance
- Preparing for Google Search Console submission
- Running a complete SEO audit

---

## PHASE 1: Technical SEO Foundation

### 1.1 Sitemap

**Purpose**: Helps search engines discover all pages on your site.

**Requirements**:
- XML format at `/sitemap.xml`
- Include all public pages
- Set `lastmod`, `changefreq`, `priority` for each URL
- Submit to Google Search Console

**Example Structure**:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.example.com/</loc>
    <lastmod>2026-01-21</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.example.com/about</loc>
    <lastmod>2026-01-21</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

### 1.2 Robots.txt

**Purpose**: Tells search engines what to crawl or ignore.

**Location**: `/robots.txt` at root

**Example**:
```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://www.example.com/sitemap.xml
```

### 1.3 Favicon & Icons (Critical for Google Search)

**Purpose**: Logo displayed in browser tabs, bookmarks, and Google Search results.

**Required Sizes** (all in `/public` or root):
| File | Size | Purpose |
|------|------|---------|
| `favicon.ico` | 48x48 | Legacy browsers |
| `favicon-16x16.png` | 16x16 | Browser tabs |
| `favicon-32x32.png` | 32x32 | Browser tabs |
| `icon-96.png` | 96x96 | Google Search results (recommended) |
| `apple-touch-icon.png` | 180x180 | iOS devices |
| `icon-192.png` | 192x192 | Android/PWA |
| `icon-512.png` | 512x512 | PWA splash screen |

**HTML Head Tags**:
```html
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="96x96" href="/icon-96.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.json">
```

### 1.4 Web App Manifest

**Purpose**: PWA configuration, helps with favicon indexing.

**Location**: `/manifest.json` or `/manifest.webmanifest`

```json
{
  "name": "Site Name",
  "short_name": "Site",
  "description": "Site description",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

**WARNING**: Never use `"purpose": "any maskable"` - use only `"purpose": "any"` or omit it entirely. Some frameworks fail to build with "any maskable".

---

## PHASE 2: On-Page SEO (Every Page)

### 2.1 Essential Meta Tags

```html
<head>
  <!-- Primary Meta Tags -->
  <title>Page Title (50-60 chars) | Brand Name</title>
  <meta name="description" content="Compelling description with call-to-action (150-160 chars max)">
  <meta name="keywords" content="keyword1, keyword2, location, service">
  <meta name="author" content="Author Name">

  <!-- Canonical URL (prevents duplicate content) -->
  <link rel="canonical" href="https://www.example.com/page">

  <!-- Viewport (required for mobile) -->
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- Robots -->
  <meta name="robots" content="index, follow">
</head>
```

### 2.2 Open Graph Tags (Social Sharing)

```html
<meta property="og:type" content="website">
<meta property="og:url" content="https://www.example.com/page">
<meta property="og:title" content="Page Title">
<meta property="og:description" content="Description for social sharing">
<meta property="og:image" content="https://www.example.com/images/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:site_name" content="Brand Name">
<meta property="og:locale" content="en_US">
```

**OG Image Requirements**:
- Size: 1200x630 pixels (1.91:1 ratio)
- Format: JPG or PNG
- Max size: 8MB (recommended < 1MB)

### 2.3 Twitter Card Tags

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Page Title">
<meta name="twitter:description" content="Description">
<meta name="twitter:image" content="https://www.example.com/images/og-image.jpg">
```

### 2.4 Title Tag Best Practices

| Rule | Example |
|------|---------|
| Length: 50-60 characters | "Private Chef in Diani Beach \| Chef Angie" |
| Primary keyword first | "Biryani Delivery Diani - Fresh Every Friday" |
| Brand at end | "Page Topic \| Brand Name" |
| Unique per page | No duplicate titles across site |
| Compelling & clickable | Include benefit or CTA |

### 2.5 Meta Description Best Practices

| Rule | Example |
|------|---------|
| Length: 150-160 characters | Don't exceed or Google truncates |
| Include primary keyword | Natural placement, not stuffed |
| Call-to-action | "Book now", "Learn more", "Order today" |
| Unique per page | No duplicate descriptions |
| Match page content | Accurate representation |

### 2.6 Heading Hierarchy

```html
<h1>Main Page Title (ONE per page, include primary keyword)</h1>
  <h2>Section Title</h2>
    <h3>Subsection</h3>
    <h3>Subsection</h3>
  <h2>Another Section</h2>
    <h3>Subsection</h3>
```

**Rules**:
- Only ONE `<h1>` per page
- Logical order: H1 → H2 → H3 (never skip levels)
- Include keywords naturally
- Descriptive, not generic ("Our Services" → "Private Chef Services in Diani")

### 2.7 Image Optimization

```html
<img
  src="/images/dish.jpg"
  alt="Chicken Biryani with aromatic spices and saffron rice"
  width="800"
  height="600"
  loading="lazy"
>
```

**Rules**:
- **Alt text**: Descriptive, include keywords naturally (not "image1.jpg")
- **Dimensions**: Always specify width/height (prevents layout shift)
- **Lazy loading**: Use `loading="lazy"` for below-fold images
- **Format**: Use WebP or optimized JPG/PNG
- **Size**: Compress images (target < 200KB for most)

---

## PHASE 3: Schema.org Structured Data (JSON-LD)

**Purpose**: Enables rich snippets in Google Search (ratings, prices, FAQ, etc.)

**Placement**: In `<head>` or end of `<body>`

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Business Name",
  ...
}
</script>
```

### Common Schema Types

See [schema-templates.md](templates/schema-templates.md) for complete templates:

| Page Type | Schema Type |
|-----------|-------------|
| Homepage (business) | `Organization`, `LocalBusiness`, `Restaurant` |
| Service page | `Service`, `FoodService`, `ProfessionalService` |
| Accommodation | `LodgingBusiness`, `Hotel`, `VacationRental` |
| Product page | `Product`, `Offer` |
| Menu/Food | `Menu`, `MenuItem`, `Recipe` |
| Blog post | `Article`, `BlogPosting` |
| FAQ page | `FAQPage`, `Question`, `Answer` |
| Contact page | `ContactPage`, `Organization` |
| About page | `AboutPage`, `Person`, `Organization` |
| Event | `Event` |

### Essential Schema Properties

**For any business**:
- `name`, `description`, `url`
- `telephone`, `email`
- `address` (PostalAddress)
- `geo` (GeoCoordinates - latitude/longitude)
- `image`
- `priceRange`
- `openingHoursSpecification`
- `sameAs` (social media links)

---

## PHASE 4: Local SEO

### 4.1 NAP Consistency

**NAP** = Name, Address, Phone

Must be IDENTICAL everywhere:
- Website footer
- Contact page
- Schema.org data
- Google Business Profile
- Social media profiles
- Directory listings

### 4.2 Local Keywords

Include location in:
- Page titles: "Private Chef **in Diani Beach**"
- Meta descriptions: "...services in **Diani Beach, Kenya**"
- H1 headings
- Content body (naturally)
- Image alt text

### 4.3 Google Business Profile

**Setup** (business.google.com):
1. Create/claim your business
2. Choose correct category (primary + secondary)
3. Add complete information:
   - Business name (exact match with website)
   - Address
   - Phone number
   - Website URL (exact, with https://)
   - Hours of operation
   - Services offered
   - Photos (logo, cover, products/services)
4. Verify ownership (postcard, phone, or email)
5. Respond to reviews
6. Post updates regularly

### 4.4 Google Search Console

**Setup**:
1. Go to search.google.com/search-console
2. Add property (URL prefix or Domain)
3. Verify ownership (DNS, HTML file, or meta tag)
4. Submit sitemap
5. Request indexing for each page:
   - URL Inspection → Enter URL → Request Indexing

**Monitor**:
- Coverage errors
- Mobile usability issues
- Core Web Vitals
- Search performance (queries, clicks, impressions)

---

## PHASE 5: Performance (Core Web Vitals)

**Google ranking factors since 2021**

| Metric | Target | What It Measures |
|--------|--------|------------------|
| **LCP** (Largest Contentful Paint) | < 2.5s | Loading performance |
| **FID/INP** (First Input Delay) | < 100ms | Interactivity |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Visual stability |

### Optimization Techniques

**LCP (Loading)**:
- Optimize largest image (hero image)
- Use CDN for assets
- Preload critical resources
- Server-side rendering where possible

**FID/INP (Interactivity)**:
- Minimize JavaScript
- Defer non-critical scripts
- Use web workers for heavy computation

**CLS (Stability)**:
- Always set image dimensions
- Reserve space for dynamic content
- Avoid inserting content above existing content
- Use `font-display: swap` for fonts

### Testing Tools

- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) (Chrome DevTools)
- [WebPageTest](https://www.webpagetest.org/)
- [GTmetrix](https://gtmetrix.com/)

---

## PHASE 6: Accessibility (SEO Benefit)

Google rewards accessible websites.

### Checklist

- [ ] All images have descriptive `alt` text
- [ ] Form inputs have associated `<label>` elements
- [ ] Color contrast ratio ≥ 4.5:1 (WCAG AA)
- [ ] Focus states visible on interactive elements
- [ ] Semantic HTML (`<header>`, `<main>`, `<nav>`, `<footer>`, `<article>`, `<section>`)
- [ ] Skip-to-content link for keyboard users
- [ ] ARIA labels where needed (icon buttons, etc.)
- [ ] Logical tab order
- [ ] No auto-playing media

---

## PHASE 7: Content SEO

### Quality Guidelines

- **Unique content**: No duplicate or thin content
- **Keyword placement**: Title, H1, first paragraph, naturally throughout
- **Content length**: 300+ words minimum for main pages
- **Internal linking**: Link to related pages on your site
- **External linking**: Link to authoritative sources (sparingly)
- **Fresh content**: Update regularly, add blog posts
- **User intent**: Match what users are searching for

### URL Structure

**Good**:
```
/services/private-chef
/menu/biryani-friday
/accommodation/diani-beach-apartment
```

**Bad**:
```
/page?id=123
/services/page1
/p/12345
```

---

## Quick Reference: SEO Audit Checklist

See [seo-checklist.md](seo-checklist.md) for complete audit checklist.

## Usage

When invoked with `$ARGUMENTS`:
- **[page-path]**: Optimize specific page
- **"full-audit"**: Complete site SEO audit
- **"checklist"**: Display interactive checklist
- **"schema [type]"**: Generate Schema.org template
- **"meta"**: Focus on metadata optimization
- **"local"**: Focus on local SEO
- **"performance"**: Focus on Core Web Vitals

## Output Format

Always provide:
1. **Current State**: What exists now
2. **Issues Found**: Problems ranked by impact
3. **Recommended Changes**: Specific code/content changes
4. **Priority**: High/Medium/Low
5. **Implementation**: Ready-to-use code snippets
