# Story 1.2: Create Open Graph images for social sharing

Status: ready-for-dev

## Story

As a visitor sharing the site on social media,
I want to see a professional preview image,
so that shares on Facebook/WhatsApp/LinkedIn display a branded card instead of nothing.

## Acceptance Criteria

1. OG image generated for homepage at `/api/og?page=home` (1200x630px)
2. OG image generated for cuisine at `/api/og?page=cuisine`
3. OG image generated for hebergement at `/api/og?page=stay`
4. OG image generated for about at `/api/og?page=about`
5. OG image generated for contact at `/api/og?page=contact`
6. All page metadata updated to point to `/api/og?page=<name>` instead of static paths
7. Images render with Chef Angie branding (name, tagline, page-specific title)
8. Response includes correct Content-Type and cache headers

## Tasks / Subtasks

- [ ] Task 1: Create OG image generation endpoint (AC: 1-5,7,8)
  - [ ] Write test: /api/og?page=home returns 200 with image/png content-type
  - [ ] Write test: /api/og without page param returns 400
  - [ ] Create `src/app/api/og/route.tsx` using next/og ImageResponse
  - [ ] Design branded template: gradient background, logo text, page title, tagline
  - [ ] Support pages: home, cuisine, stay, about, contact
  - [ ] Add cache headers (Cache-Control: public, max-age=86400)
- [ ] Task 2: Update metadata in all pages (AC: 6)
  - [ ] Update src/app/layout.tsx default OG image
  - [ ] Update src/app/cuisine/page.tsx OG image
  - [ ] Update src/app/hebergement/page.tsx OG image
  - [ ] Update src/app/about/page.tsx OG image
  - [ ] Update src/app/contact/page.tsx OG image

## Dev Notes

### Technical approach
- Use `next/og` (ImageResponse) — built into Next.js 14, no extra dependency
- Endpoint at `src/app/api/og/route.tsx`
- Returns PNG 1200x630px with JSX-based layout
- Supports Google Fonts via fetch in the route

### Current broken references
All pages reference static files that don't exist:
- `/images/og/og-home.jpg` → 404
- `/images/og/og-cuisine.jpg` → 404
- `/images/og/og-stay.jpg` → 404
- `/images/og/og-about.jpg` → 404
- `/images/og/og-contact.jpg` → 404

### Design system colors (from tailwind.config.ts)
- teal: #0D9488 (primary)
- ocean-dark: #134E4A (dark bg)
- coral: #F97316 (accent)
- sand-light: #FEF7EC (light bg)

### Files to create
- `src/app/api/og/route.tsx`

### Files to modify
- `src/app/layout.tsx` — default OG images
- `src/app/about/page.tsx` — OG image path
- `src/app/cuisine/page.tsx` — OG image path
- `src/app/hebergement/page.tsx` — OG image path
- `src/app/contact/page.tsx` — OG image path

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6

### Completion Notes List

### File List
