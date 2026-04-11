# Story 3.1: Email notification for new testimonial submission

Status: ready-for-dev

## Story

As an admin,
I want to receive an email when a new testimonial is submitted,
so that I don't have to manually check the dashboard to discover new reviews.

## Acceptance Criteria

1. Email sent to liyayiangela20@gmail.com when a new testimonial is created
2. Email contains: reviewer name, service type, rating (stars), review text (first 200 chars), direct link to admin dashboard
3. Email sending is non-blocking (doesn't slow down the API response)
4. If email sending fails, the testimonial is still created (graceful degradation)
5. Email is only sent for real submissions (not honeypot-caught spam)
6. NOTIFICATION_EMAIL configurable via env var (defaults to ADMIN_EMAIL)

## Tasks / Subtasks

- [ ] Task 1: Install Resend SDK (AC: all)
  - [ ] npm install resend
  - [ ] Add RESEND_API_KEY to .env.example
  - [ ] Add NOTIFICATION_EMAIL to .env.example
- [ ] Task 2: Create email service (AC: 1,2,4)
  - [ ] Write test: sendNewTestimonialNotification sends email with correct content
  - [ ] Write test: sendNewTestimonialNotification handles errors gracefully
  - [ ] Create src/lib/email.ts with Resend integration
- [ ] Task 3: Integrate in POST /api/testimonials (AC: 3,5)
  - [ ] Add non-blocking email call after testimonial creation
  - [ ] Skip email for honeypot-caught submissions
  - [ ] Remove existing TODO comment (E12-S11)

## Dev Notes

### Why Resend
- Free tier: 100 emails/day (more than enough for testimonial notifications)
- Works in Vercel serverless (no persistent connection needed)
- Simple SDK, no SMTP config

### Non-blocking pattern
```ts
// Fire and forget — don't await
sendNewTestimonialNotification(testimonial).catch(console.error)
```

### Existing TODO in code
`src/app/api/testimonials/route.ts` line 60:
```ts
// TODO: Send email notification to admin (E12-S11)
```

### Email template
Subject: "New Review: {name} — {service} ({rating}★)"
Body: reviewer info, rating, text excerpt, link to /admin

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6

### Completion Notes List

### File List
