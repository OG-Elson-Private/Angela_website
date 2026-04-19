# Story 3.3: YouTube video embed + low season price update

Status: done

## Story

As a potential guest visiting /hebergement,
I want to see a video tour of the apartment (not just photos),
so that I get a richer sense of the space before booking.

As the owner,
I want to lower the low season price to 3,000 KES to be more competitive,
so that direct bookings increase during the slow months.

## Acceptance Criteria

1. Photo gallery component replaced by a YouTube video embed on /hebergement
2. Video: https://youtube.com/shorts/ROaphUohLns (Chef Angela Studio Suites, vertical 9:16 format)
3. Embed is responsive: displays correctly on mobile (full width) and desktop (max 400px wide, centered)
4. Embed uses YouTube privacy-enhanced mode (youtube-nocookie.com) for GDPR compliance
5. Low season price changes from 4,000 KES to 3,000 KES in all locations:
   - meta description
   - openGraph description
   - priceRange in JSON-LD (3000-8000 KES)
   - Offer.price in JSON-LD (3000)
   - pricing.lowSeason.price constant
   - Hero badge display
   - Savings comparison section
6. High season price unchanged (7,000 KES)
7. Hero "View Gallery" link still works (anchor #gallery)
8. Build succeeds (npm run build)
9. All existing tests still pass

## Tasks / Subtasks

- [ ] Task 1: Create VideoSection component with YouTube embed (AC: 1,2,3,4)
  - [ ] Write test: component renders iframe with correct YouTube embed URL
  - [ ] Write test: iframe has correct attributes (allow, allowFullScreen, title)
  - [ ] Create src/components/features/hebergement/VideoSection.tsx
  - [ ] Use youtube-nocookie.com domain for privacy
  - [ ] Responsive 9:16 aspect ratio with max-width constraint
- [ ] Task 2: Replace GallerySection in hebergement page (AC: 1,7)
  - [ ] Import VideoSection instead of GallerySection
  - [ ] Keep #gallery anchor for backward compat
- [ ] Task 3: Update prices to 3,000 KES (AC: 5,6)
  - [ ] Update meta description (line 11)
  - [ ] Update openGraph description (line 14)
  - [ ] Update priceRange in JSON-LD (line 43): '3000-8000 KES'
  - [ ] Update offers.price in JSON-LD (line 63): '3000'
  - [ ] Update pricing.lowSeason.price (line 90): 3000
  - [ ] Update hero badge (line 132): "From 3,000 KES"
  - [ ] Update savings comparison (line 518): "3,000 - 7,000 KES"
- [ ] Task 4: Decide fate of GallerySection.tsx (AC: 1)
  - [ ] If no other consumers, keep the file but stop importing (may be reused later)

## Dev Notes

### YouTube Shorts URL format
- Short URL: https://youtube.com/shorts/ROaphUohLns
- Embed URL: https://www.youtube-nocookie.com/embed/ROaphUohLns
- Video ID: ROaphUohLns

### Aspect ratio for vertical video
Tailwind: `aspect-[9/16]` — container 9:16 ratio
Max-width: 400px on desktop to avoid massive vertical video

### Responsive pattern
```tsx
<div className="relative max-w-[400px] mx-auto aspect-[9/16] rounded-2xl overflow-hidden shadow-lg">
  <iframe
    src="https://www.youtube-nocookie.com/embed/ROaphUohLns"
    title="Chef Angela Studio Suites"
    className="absolute inset-0 w-full h-full"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    loading="lazy"
  />
</div>
```

### Existing anchor
Hero has `<Link href="#gallery">View Gallery</Link>` (line 156) → keep `id="gallery"` on the new video section for backward compat.

### Files to modify
- `src/app/hebergement/page.tsx` — import, prices, JSON-LD
- `src/components/features/hebergement/VideoSection.tsx` (NEW)

### Files NOT to delete
- `src/components/features/hebergement/GallerySection.tsx` — keep for potential future reuse

## Dev Agent Record

### Agent Model Used
Claude Opus 4.7

### Completion Notes List

- RED: 6 tests ecrits, tous echouent (composant n'existe pas)
- GREEN: VideoSection implementee, 6/6 pass
- Integration page hebergement + 7 modifs de prix
- CODE REVIEW iteration 1: 2 agents, 12 findings — BLOCK (2 HIGH manques + 2 MEDIUM)
  - TwoPillars homepage encore 4,000 KES
  - OG image endpoint encore 4,000 KES
  - VideoSection manque w-full + sandbox
- Patches appliques (6 items) + 4 tests supplementaires
- CODE REVIEW iteration 2: BLOCK — regression introduite (sandbox sans allow-popups casse fullscreen YouTube)
- Patch final: ajout allow-popups
- CODE REVIEW iteration 3: GO explicite
- Validation: tsc OK, lint OK, 32/32 tests, build production OK

### File List

- `src/components/features/hebergement/VideoSection.tsx` — new
- `src/components/features/hebergement/VideoSection.test.tsx` — new (10 tests)
- `src/app/hebergement/page.tsx` — modified (import, prices x7, button text)
- `src/components/sections/TwoPillars.tsx` — modified (homepage price)
- `src/app/api/og/route.tsx` — modified (stay subtitle price)
