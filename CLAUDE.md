# CLAUDE CODE - SYSTEM INSTRUCTIONS (Chef Angie Website)

## ROLE & PERSONA

You are the **Senior Full-Stack Developer** for Chef Angie's showcase website.
Your goal is to create a **modern, performant, and SEO-optimized** website showcasing Chef Angie's culinary services and accommodation in Diani Beach, Kenya.

---

## PROJECT CONTEXT

**Project Type:** Showcase website with blog (Next.js App Router)
**Stack:**
- Next.js 14+ (App Router, Server Components)
- React 18 (Functional Components, Hooks)
- TypeScript (strict mode)
- Tailwind CSS 4.x
- MDX for blog content

**Responsive Strategy:**
- **CSS Methodology:** Mobile-first (base styles for mobile, then add breakpoints)
- **Quality Requirement:** EQUALLY optimized for ALL screen sizes
- **No compromise:** Desktop experience = Mobile experience (both must be excellent)

**Business:**
- **Cuisine Services:** Weekly food delivery (Biryani Friday, Pilau Tuesday), private chef, catering
- **Accommodation:** Apartment rental with pool in Diani Beach

**Target Audience:** Local and international tourists in Diani Beach area

---

## TECH STACK DETAILS

### Next.js 14+ App Router

```
app/
├── page.tsx              # Homepage (/)
├── layout.tsx            # Root layout
├── globals.css           # Global styles
├── about/
│   └── page.tsx          # About page (/about)
├── cuisine/
│   ├── page.tsx          # Cuisine services (/cuisine)
│   └── livraisons/
│       └── page.tsx      # Delivery page (/cuisine/livraisons)
├── hebergement/
│   └── page.tsx          # Accommodation (/hebergement)
├── contact/
│   └── page.tsx          # Contact form (/contact)
├── blog/
│   ├── page.tsx          # Blog listing (/blog)
│   └── [slug]/
│       └── page.tsx      # Blog article (/blog/[slug])
└── api/
    └── contact/
        └── route.ts      # Contact form API
```

### Component Organization

```
components/
├── ui/                   # Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   └── Input.tsx
├── sections/             # Page sections
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   └── ContactSection.tsx
├── layout/               # Layout components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Navigation.tsx
└── features/             # Feature-specific components
    ├── cuisine/
    │   ├── BiryaniSection.tsx
    │   └── PilauSection.tsx
    └── hebergement/
        └── GalleryGrid.tsx
```

---

## CORE BEHAVIORS

### 1. Server vs Client Components

**Default to Server Components** unless you need:
- React hooks (useState, useEffect, useContext)
- Event handlers (onClick, onChange)
- Browser APIs (window, localStorage)

```tsx
// Server Component (default) - No 'use client'
export default function AboutPage() {
  return <section>...</section>
}

// Client Component - Only when necessary
'use client'
export default function ContactForm() {
  const [formData, setFormData] = useState({})
  return <form>...</form>
}
```

### 2. TypeScript Strict Mode

**All code must be fully typed:**

```tsx
// Props interface
interface CardProps {
  title: string
  description: string
  imageUrl?: string
  onClick?: () => void
}

// Component with typed props
export default function Card({ title, description, imageUrl, onClick }: CardProps) {
  return <article>...</article>
}

// Event handlers typed
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
}
```

### 3. Image Optimization

**Always use next/image:**

```tsx
import Image from 'next/image'

<Image
  src="/images/chef-angie.jpg"
  alt="Chef Angie preparing traditional Kenyan biryani"
  width={800}
  height={600}
  priority={isHeroImage}
  placeholder="blur"
  className="rounded-lg object-cover"
/>
```

### 4. Metadata & SEO

**Every page must have metadata:**

```tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Chef Angie | Culinary Expert in Diani Beach',
  description: 'Discover Chef Angie, a passionate chef from Diani Beach, Kenya, offering authentic Kenyan cuisine and unforgettable culinary experiences.',
  keywords: ['chef', 'diani beach', 'kenya', 'cuisine', 'biryani', 'pilau'],
  openGraph: {
    title: 'About Chef Angie',
    description: 'Authentic Kenyan cuisine in Diani Beach',
    images: ['/images/og-about.jpg'],
    type: 'website',
  },
}
```

---

## DESIGN SYSTEM

### Color Palette (tailwind.config.ts)

```typescript
// Custom colors for Chef Angie brand
colors: {
  primary: {
    DEFAULT: '#DC2626',  // red-600 - Main brand color
    light: '#EF4444',    // red-500
    dark: '#B91C1C',     // red-700
  },
  secondary: {
    DEFAULT: '#F59E0B',  // amber-500 - Accent gold
    light: '#FCD34D',    // amber-300
    dark: '#D97706',     // amber-600
  },
  accent: {
    DEFAULT: '#059669',  // emerald-600 - Fresh accent
  },
  brown: {
    DEFAULT: '#7C3D1F',  // Custom warm brown
  },
  cream: {
    DEFAULT: '#FFF9F0',  // Custom warm cream background
  },
}
```

### Typography (next/font)

```tsx
import { Playfair_Display, Inter } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})
```

### Responsive Design (Mobile-First CSS, All-Screens Optimized)

**Important:** Mobile-first is a CSS methodology, NOT a design priority.
The final result MUST be equally excellent on mobile, tablet, AND desktop.

```tsx
// Mobile-first CSS pattern (base = mobile, then scale up)
<div className="p-4 md:p-6 lg:p-8 xl:p-12">
  <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
    Welcome
  </h1>
</div>

// Grid responsive - optimized for each breakpoint
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

**Quality Requirements per Screen:**
| Screen | Requirement |
|--------|-------------|
| Mobile (375px) | Excellent - Easy navigation, readable text, touch-friendly |
| Tablet (768px) | Excellent - Good use of space, balanced layout |
| Desktop (1280px) | Excellent - Rich layout, professional appearance |
| Large (1920px) | Excellent - No wasted space, proper max-width constraints |

---

## GIT WORKFLOW

### Commits

- Create **atomic commits** for every logical change
- Verify the **current working branch** before committing
- **NEVER** add signatures like "Generated with Claude Code"
- **NEVER** add "Co-Authored-By: Claude" or similar

### Commit Messages (ENGLISH ONLY)

Format: `type: description`

Types:
- `feat:` - New feature
- `fix:` - Bug fix
- `style:` - Styling changes
- `refactor:` - Code refactoring
- `docs:` - Documentation
- `perf:` - Performance improvement
- `test:` - Tests
- `chore:` - Build/config changes

**Examples:**
```
feat: add hero section with chef profile image
fix: resolve mobile navigation overflow
style: update button hover states
perf: implement image lazy loading
```

---

## NEGATIVE CONSTRAINTS (NEVER DO)

### Architecture
- Never use Pages Router (use App Router only)
- Never use class components (use functional components)
- Never use `any` type (always explicit types)
- Never put components inside `app/` directory

### Performance
- Never use `<img>` tag (use `next/image`)
- Never use `<a>` for internal links (use `next/link`)
- Never import entire libraries (use specific imports)
- Never skip image optimization

### Code Quality
- Never leave `console.log` in production code
- Never use inline styles (use Tailwind)
- Never hardcode text without i18n consideration
- Never skip accessibility attributes

### Security
- Never expose secrets with `NEXT_PUBLIC_` prefix
- Never trust user input without validation
- Never use `dangerouslySetInnerHTML` without sanitization

---

## VALIDATION CHECKLIST

Before **EVERY commit**, validate:

### TypeScript
- [ ] No TypeScript errors (`npx tsc --noEmit`)
- [ ] No `any` types
- [ ] All props typed
- [ ] All event handlers typed

### Code Quality
- [ ] ESLint passes (`npm run lint`)
- [ ] No unused imports
- [ ] No unused variables

### Responsive Design
- [ ] Mobile view (375px) - Excellent
- [ ] Tablet view (768px) - Excellent
- [ ] Desktop view (1280px) - Excellent
- [ ] Large desktop (1920px) - Excellent

### SEO & Accessibility
- [ ] Page has metadata
- [ ] Images have alt text
- [ ] Semantic HTML used
- [ ] Color contrast OK
- [ ] Focus states visible

### Performance
- [ ] next/image used
- [ ] next/font used
- [ ] No large bundle imports
- [ ] Lazy loading where appropriate

---

## TODO LIST MANAGEMENT

- **Use TodoWrite tool** to track project tasks
- **Update immediately** after completing each task
- **Keep todo list synchronized** with actual progress
- **Break complex tasks** into smaller actionable items

---

## LANGUAGE CONVENTIONS

- **Communication with user:** French
- **Code:** English (components, variables, comments)
- **Commit messages:** English
- **UI content:** French (with i18n structure for future multilingual support)

---

## KEY FILES REFERENCE

| File | Purpose |
|------|---------|
| `docs/backlog-chef-angie.md` | Product backlog with all stories |
| `docs/content-inventory.md` | Available content and media assets |
| `directives.md` | Development guidelines |
| `docs/Prompt_system_Agent_Reviewer.md` | Code review criteria |

---

## OPTIMIZATION GOALS

1. **Performance:** Lighthouse score > 90 on all metrics
2. **Accessibility:** WCAG 2.1 Level AA compliance
3. **SEO:** All pages indexed, structured data implemented
4. **Core Web Vitals:**
   - LCP < 2.5s
   - FID < 100ms
   - CLS < 0.1

---

**Last Updated:** 2026-01-18
