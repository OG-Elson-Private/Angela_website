# Story 2.1: Enrich structured data with AggregateRating

Status: ready-for-dev

## Story

As the site owner,
I want proper AggregateRating in the JSON-LD structured data,
so that Google can display star ratings in search results for Chef Angie.

## Acceptance Criteria

1. Homepage JSON-LD (Restaurant) includes `aggregateRating` with dynamic ratingValue and reviewCount
2. Cuisine page JSON-LD (FoodService) includes `aggregateRating` for cuisine services only
3. Hebergement page JSON-LD (LodgingBusiness) includes `aggregateRating` for accommodation only
4. Rating values are fetched from the API at build/render time (not hardcoded)
5. If no reviews exist, aggregateRating is omitted (not shown with 0)

## Tasks / Subtasks

- [ ] Task 1: Create server-side utility to fetch aggregate ratings (AC: 4)
  - [ ] Write test: fetchAggregateRating('cuisine') returns { ratingValue, reviewCount }
  - [ ] Write test: fetchAggregateRating returns null when no reviews
  - [ ] Create src/lib/schema-helpers.ts with fetchAggregateRating function
- [ ] Task 2: Add aggregateRating to homepage JSON-LD (AC: 1,5)
  - [ ] Modify src/app/page.tsx to fetch and inject aggregateRating
- [ ] Task 3: Add aggregateRating to cuisine JSON-LD (AC: 2,5)
  - [ ] Modify src/app/cuisine/page.tsx jsonLd to include aggregateRating
- [ ] Task 4: Add aggregateRating to hebergement JSON-LD (AC: 3,5)
  - [ ] Modify src/app/hebergement/page.tsx jsonLd to include aggregateRating

## Dev Notes

### Approach
- Create a helper that calls the public testimonials API server-side per service
- Reuse CUISINE_SERVICES / ACCOMMODATION_SERVICES from shared constants
- Pages are Server Components — can use async data fetching directly

### Google structured data requirements
```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "4.8",
  "reviewCount": "12",
  "bestRating": "5",
  "worstRating": "1"
}
```

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6

### Completion Notes List

### File List
