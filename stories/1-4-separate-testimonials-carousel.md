# Story 1.4: Separate Cuisine and Accommodation testimonials with carousel

Status: ready-for-dev

## Story

As a visitor or admin,
I want testimonials separated between culinary services and accommodation,
so that mixing chef reviews with apartment reviews doesn't confuse visitors and reduce credibility.

## Acceptance Criteria

1. Page `/cuisine` shows a testimonials carousel filtering PRIVATE_CHEF, CATERING, BIRYANI_FRIDAY, PILAU_TUESDAY (APPROVED only)
2. Page `/hebergement` shows a testimonials carousel filtering ACCOMMODATION only (APPROVED only)
3. Each carousel shows aggregate rating (average + count) above the cards
4. Each carousel has a "Leave a Review" button with ServiceType pre-selected per page
5. Homepage testimonials section filters cuisine services only
6. Responsive: 1 card mobile, 2 tablet, 3 desktop, horizontal scrolling
7. Admin API GET `/api/admin/testimonials` accepts `?category=cuisine|accommodation` query param
8. Admin dashboard has category filter buttons (All Services / Cuisine / Accommodation)
9. Admin status counters update based on active category filter
10. Page `/testimonials` remains unchanged (all reviews mixed)

## Tasks / Subtasks

- [ ] Task 1: Create TestimonialsCarousel component (AC: 1,2,3,4,6)
  - [ ] Write test: component renders with category prop
  - [ ] Write test: carousel renders correct number of slides per breakpoint class
  - [ ] Implement client component with embla-carousel-react
  - [ ] Fetch testimonials client-side filtered by service types
  - [ ] Display aggregate rating + count header
  - [ ] Add navigation arrows (prev/next) when more than 3 testimonials
  - [ ] Add LeaveReviewButton with defaultService based on category
- [ ] Task 2: Integrate carousel on /cuisine page (AC: 1)
  - [ ] Replace "Share Your Experience" section with TestimonialsCarousel category="cuisine"
- [ ] Task 3: Integrate carousel on /hebergement page (AC: 2)
  - [ ] Replace "Stayed with Us?" section with TestimonialsCarousel category="accommodation"
- [ ] Task 4: Filter homepage testimonials to cuisine only (AC: 5)
  - [ ] Modify Testimonials.tsx server-side fetch to filter by cuisine services
  - [ ] Write test: fetch calls include cuisine service filter
- [ ] Task 5: Add category filter to admin API (AC: 7)
  - [ ] Write test: GET with ?category=cuisine filters correct services
  - [ ] Write test: GET with ?category=accommodation filters ACCOMMODATION
  - [ ] Write test: GET without category returns all
  - [ ] Add category query param parsing and Prisma where clause
- [ ] Task 6: Add category filter to admin dashboard (AC: 8,9)
  - [ ] Add activeCategory state and filter buttons UI
  - [ ] Wire category param into fetchTestimonials API call
- [ ] Task 7: Verify /testimonials page unchanged (AC: 10)
  - [ ] Read-only check: no modifications to testimonials/page.tsx

## Dev Notes

### Category to ServiceType mapping
```ts
const CATEGORY_SERVICE_MAP = {
  cuisine: ['PRIVATE_CHEF', 'CATERING', 'BIRYANI_FRIDAY', 'PILAU_TUESDAY'],
  accommodation: ['ACCOMMODATION'],
}
```

### Existing components to reuse
- `TestimonialCard` — `src/components/ui/TestimonialCard.tsx` (server component, renders single card)
- `LeaveReviewButton` — `src/components/ui/LeaveReviewButton.tsx` (client component, already accepts `defaultService` prop)
- `StarRatingDisplay` — `src/components/ui/StarRating.tsx`
- `embla-carousel-react` — already installed (used in `ImageCarousel.tsx`)

### Public API already supports service filter
`GET /api/testimonials?service=PRIVATE_CHEF&limit=20` — already works, no backend change needed for public side.

### Files to create
- `src/components/sections/TestimonialsCarousel.tsx` — new client component

### Files to modify
- `src/app/cuisine/page.tsx` — replace "Share Your Experience" section
- `src/app/hebergement/page.tsx` — replace "Stayed with Us?" section  
- `src/components/sections/Testimonials.tsx` — filter cuisine only for homepage
- `src/components/sections/index.ts` — export new component
- `src/app/api/admin/testimonials/route.ts` — add category filter
- `src/app/admin/page.tsx` — add category filter UI

### Embla carousel pattern for multi-slide
Use CSS flex basis for responsive slides:
- Mobile: `flex-[0_0_100%]`
- Tablet (md): `flex-[0_0_50%]`  
- Desktop (lg): `flex-[0_0_33.333%]`

### Testing approach
- Unit tests for admin API category filter (mock Prisma)
- Unit tests for TestimonialsCarousel (verify fetch calls and render)
- Integration verified via tsc + lint

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6

### Completion Notes List

### File List
