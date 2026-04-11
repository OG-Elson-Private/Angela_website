# Story 1.1: Fix approvedAt timestamp on testimonial approval

Status: done

## Story

As an admin,
I want the `approvedAt` timestamp to be set when I approve a testimonial,
so that the public testimonials page sorts recently approved reviews first instead of showing them at the bottom.

## Acceptance Criteria

1. When a testimonial status changes to APPROVED, `approvedAt` is set to `new Date()`
2. When a testimonial status changes to REJECTED or PENDING, `approvedAt` is reset to `null`
3. The public testimonials API sorts by `approvedAt: 'desc'` — newly approved reviews appear first
4. Unit tests cover all 3 status transitions (PENDING→APPROVED, APPROVED→REJECTED, APPROVED→PENDING)

## Tasks / Subtasks

- [x] Task 1: Write failing tests for approvedAt behavior (AC: 1,2,4)
  - [x] Test: PATCH with status=APPROVED sets approvedAt to current date
  - [x] Test: PATCH with status=REJECTED sets approvedAt to null
  - [x] Test: PATCH with status=PENDING sets approvedAt to null
- [x] Task 2: Implement approvedAt logic in PATCH handler (AC: 1,2)
  - [x] Modify `prisma.testimonial.update` data to include conditional approvedAt
- [x] Task 3: Verify public API sort order (AC: 3)
  - [x] Confirm GET /api/testimonials sorts by approvedAt desc with createdAt fallback
- [x] Task 4: Fix review finding — fallback sort for legacy data (Review)
  - [x] Add secondary sort `createdAt: desc` for pre-existing approved testimonials with null approvedAt
  - [x] Test: sort order includes both approvedAt and createdAt fallback

## Dev Notes

### File to modify
- `src/app/api/admin/testimonials/[id]/route.ts` — PATCH handler, line ~68-71

### Current code (buggy)
```ts
const updatedTestimonial = await prisma.testimonial.update({
  where: { id },
  data: { status },
})
```

### Expected fix
```ts
const updatedTestimonial = await prisma.testimonial.update({
  where: { id },
  data: {
    status,
    approvedAt: status === 'APPROVED' ? new Date() : null,
  },
})
```

### Public API sort (already correct)
`src/app/api/testimonials/route.ts` line ~139: `orderBy: { approvedAt: 'desc' }`

### Prisma schema
`approvedAt DateTime?` — nullable, no default. Index on `status` and `createdAt` exist.

### Testing approach
- Use Jest/Vitest with Prisma mock or direct unit test of the update logic
- No test framework currently configured in the project — may need to add vitest

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6

### Completion Notes List

- RED: 3 tests ecrits, tous echouent (approvedAt manquant dans prisma update)
- GREEN: 1 ligne ajoutee (ternaire approvedAt), 3/3 tests passent
- REFACTOR: aucun necessaire
- CODE REVIEW: 2 agents (Blind Hunter + Edge Case Hunter) ont identifie 6 findings
  - 1 patch applique: fallback sort createdAt pour legacy data (Finding #2 - HIGH)
  - 3 deferred (race condition, re-approval, audit trail - pre-existants)
  - 2 dismissed (validation deja presente en amont, null vs undefined)
- 4e test ajoute pour le fallback sort

### File List

- `src/app/api/admin/testimonials/[id]/route.ts` — modified (approvedAt logic)
- `src/app/api/admin/testimonials/[id]/route.test.ts` — new (3 tests PATCH)
- `src/app/api/testimonials/route.ts` — modified (fallback sort)
- `src/app/api/testimonials/route.test.ts` — new (1 test sort order)
