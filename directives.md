# Directives de Developpement - Chef Angie Website

Ce fichier contient les directives et bonnes pratiques pour le developpement du site vitrine Chef Angie.

**Ce projet est un SITE VITRINE professionnel avec approche CSS mobile-first et experience EGALEMENT optimisee pour TOUS les ecrans (mobile, tablet, desktop)**

---

## Deploiement Git

### Configuration du Depot

**Repository distant :** git@github.com:OG-Elson-Private/Angela_website.git

**Cle SSH :** `~/.ssh/id_ed25519_angela`

Pour push avec cette cle specifique :
```bash
GIT_SSH_COMMAND="ssh -i ~/.ssh/id_ed25519_angela" git push origin main
```

### Serveur de Developpement

**Un serveur de developpement tourne en permanence** dans un terminal separe.
- Pas besoin de lancer `npm run build` manuellement pour verifier les changements
- Le hot-reload est actif : les modifications sont visibles instantanement
- Le build automatique detecte les erreurs TypeScript/ESLint en temps reel

### Workflow Git

**Apres CHAQUE modification :**

```bash
# Commit atomique apres chaque changement
git add .
git commit -m "type: description"

# Push vers le depot distant
git push origin main
```

**IMPORTANT - Format des messages de commit :**
- Messages en anglais uniquement
- Format : `type: description concise`
- **JAMAIS** inclure de lignes d'attribution ou signature (Co-Authored-By, Generated with Claude, etc.)
- **JAMAIS** mentionner l'implication de Claude ou d'une IA dans le commit
- Le message doit etre simple, direct et uniquement descriptif du changement

### Quand commiter

- **Apres CHAQUE modification** (meme mineure)
- Apres implementation d'une section complete (hero, pricing, contact)
- Apres fix de bug visuel/fonctionnel
- Apres optimisation de performance
- Avant tout changement majeur (backup safety)
- Apres ajout d'une nouvelle page

### Quand NE PAS commiter

- Code non fonctionnel (WIP)
- Modifications temporaires de test
- Fichiers temporaires (.DS_Store, node_modules, .next, etc.)

---

## Structure du Projet

```
chef-angie-website/
├── app/                        # Next.js App Router
│   ├── page.tsx               # Homepage
│   ├── layout.tsx             # Root layout
│   ├── globals.css            # Global styles
│   ├── about/
│   │   └── page.tsx           # About page
│   ├── cuisine/
│   │   ├── page.tsx           # Cuisine overview
│   │   └── livraisons/
│   │       └── page.tsx       # Delivery service (Biryani/Pilau)
│   ├── hebergement/
│   │   └── page.tsx           # Accommodation page
│   ├── contact/
│   │   └── page.tsx           # Contact form
│   ├── blog/
│   │   ├── page.tsx           # Blog listing
│   │   └── [slug]/
│   │       └── page.tsx       # Blog article
│   └── api/
│       └── contact/
│           └── route.ts       # Contact API endpoint
├── components/
│   ├── ui/                    # Reusable UI (Button, Card, Input)
│   ├── sections/              # Page sections (Hero, About, Services)
│   ├── layout/                # Header, Footer, Navigation
│   └── features/              # Feature components
│       ├── cuisine/           # BiryaniSection, PilauSection
│       └── hebergement/       # GalleryGrid, ApartmentCard
├── lib/
│   ├── utils.ts               # Utility functions (cn, formatDate)
│   └── validations.ts         # Zod schemas
├── types/
│   └── index.ts               # TypeScript types/interfaces
├── public/
│   ├── images/
│   │   ├── apartment/         # Accommodation photos
│   │   ├── dishes/            # Food photos
│   │   ├── chef/              # Chef Angie photos
│   │   └── hero/              # Hero images
│   └── videos/
│       └── apartment-tour.mp4
├── content/
│   └── blog/                  # MDX blog articles
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## Design Guidelines avec Tailwind CSS

### Palette de Couleurs (tailwind.config.ts)

```typescript
const config: Config = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#DC2626',  // red-600
          light: '#EF4444',    // red-500
          dark: '#B91C1C',     // red-700
        },
        secondary: {
          DEFAULT: '#F59E0B',  // amber-500 (gold)
          light: '#FCD34D',    // amber-300
          dark: '#D97706',     // amber-600
        },
        accent: {
          DEFAULT: '#059669',  // emerald-600
        },
        brown: {
          DEFAULT: '#7C3D1F',  // warm brown
        },
        cream: {
          DEFAULT: '#FFF9F0',  // warm cream
        },
      },
      fontFamily: {
        heading: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
}
```

### Typographie

**Fonts (next/font/google) :**
- Headings: Playfair Display (elegant, serif)
- Body: Inter (modern, readable)

**Utilisation :**
```tsx
<h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold">
  Chef Angie
</h1>
<p className="font-body text-base md:text-lg text-gray-600">
  Authentic Kenyan cuisine...
</p>
```

### Espacement (Mobile-First)

```tsx
// Mobile d'abord, puis adapte pour ecrans plus grands
<section className="py-12 md:py-16 lg:py-24 px-4 md:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto">
    {/* Content */}
  </div>
</section>
```

---

## Responsive Design (Mobile-First CSS, All-Screens Excellence)

### Clarification Importante

**Mobile-first = Methodologie CSS, PAS priorite de design**

- On ECRIT le CSS en partant du mobile (styles de base)
- On AJOUTE des breakpoints pour les ecrans plus grands
- Le RESULTAT FINAL doit etre EXCELLENT sur TOUS les ecrans

**Aucun compromis :** L'experience desktop doit etre aussi soignee que l'experience mobile.

### Approche

1. **Ecrire les styles de base** pour mobile (sans breakpoint)
2. **Ajouter md:** pour adapter aux tablettes
3. **Ajouter lg:, xl:** pour optimiser desktop et grands ecrans
4. **Verifier** que CHAQUE taille d'ecran offre une experience excellente

### Tailwind Breakpoints

| Breakpoint | Min-width | Usage |
|------------|-----------|-------|
| (base) | 0px | Mobile phones |
| sm: | 640px | Large phones |
| md: | 768px | Tablets |
| lg: | 1024px | Laptops |
| xl: | 1280px | Desktops |
| 2xl: | 1536px | Large screens |

### Patterns Responsifs

```tsx
// Grid responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>

// Text responsive
<h2 className="text-2xl md:text-3xl lg:text-4xl font-heading">
  Titre
</h2>

// Spacing responsive
<div className="p-4 md:p-6 lg:p-8 xl:p-12">
  {/* Content avec espacement progressif */}
</div>

// Hide/show elements
<div className="hidden md:block">{/* Desktop only */}</div>
<div className="block md:hidden">{/* Mobile only */}</div>
```

### Tests Obligatoires

Avant chaque commit, tester sur TOUTES ces tailles (AUCUNE n'est optionnelle) :

| Taille | Resolution | Exigence |
|--------|------------|----------|
| Mobile | 375px | EXCELLENT - Navigation facile, texte lisible, touch-friendly |
| Tablet | 768px | EXCELLENT - Bon usage de l'espace, layout equilibre |
| Desktop | 1280px | EXCELLENT - Layout riche, apparence professionnelle |
| Large | 1920px | EXCELLENT - Pas d'espace perdu, contraintes max-width appropriees |

**Rappel :** Les 4 tailles sont EGALEMENT importantes. Pas de compromis.

---

## Images & Assets

### Optimisation Images

**Utiliser next/image OBLIGATOIREMENT :**

```tsx
import Image from 'next/image'

<Image
  src="/images/dishes/chicken-biryani.jpg"
  alt="Chicken Biryani - Riz parfume aux epices avec poulet tendre"
  width={800}
  height={600}
  priority={isAboveFold}
  placeholder="blur"
  blurDataURL={blurData}
  className="rounded-lg object-cover"
/>
```

### Organisation Images

```
public/images/
├── apartment/          # Photos hebergement (18 images)
│   ├── bedroom-1.jpg
│   ├── pool.jpg
│   └── ...
├── dishes/             # Photos plats
│   ├── chicken-biryani.jpg
│   ├── beef-biryani.jpg
│   └── beef-pilau.jpg
├── chef/               # Photos Chef Angie
│   └── profile.jpg
├── hero/               # Images hero sections
│   └── diani-beach.jpg
└── og/                 # Images Open Graph
    ├── og-home.jpg
    └── og-about.jpg
```

### Specifications Images

| Type | Dimensions | Format | Max Size |
|------|------------|--------|----------|
| Hero | 1920x1080 | WebP/JPEG | 200KB |
| Cards | 800x600 | WebP/JPEG | 100KB |
| Thumbnails | 400x300 | WebP/JPEG | 50KB |
| OG Images | 1200x630 | JPEG | 100KB |
| Profile | 500x500 | WebP/JPEG | 80KB |

---

## Informations Commerciales

### Services Cuisine

**Livraisons Hebdomadaires :**
- **Biryani Friday** (Vendredi)
  - Chicken Biryani: 550 Ksh
  - Beef Biryani: 500 Ksh
  - Inclus: Banana & Salad

- **Pilau Tuesday** (Mardi)
  - Beef Pilau: Prix TBD
  - Inclus: Kachumbari

**Autres Services :**
- Chef prive a domicile
- Traiteur pour evenements

### Hebergement

- Appartement avec piscine
- Localisation: Diani Beach, Kenya
- Capacite: A confirmer
- Tarifs: A confirmer

### Contact

- **Telephone:** +254 719635944
- **Instagram:** @chef.angie002
- **Email:** A confirmer (chef@angie.co.ke suggere)

---

## SEO & Metadata

### Chaque Page DOIT avoir :

```tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Title | Chef Angie - Diani Beach',
  description: 'Description unique de 150-160 caracteres...',
  keywords: ['mot-cle-1', 'mot-cle-2'],
  openGraph: {
    title: 'Page Title',
    description: 'Description pour reseaux sociaux',
    images: ['/images/og/og-page.jpg'],
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Chef Angie',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Page Title',
    description: 'Description',
    images: ['/images/og/og-page.jpg'],
  },
}
```

### Schema.org (Structured Data)

```tsx
// Pour les pages appropriees
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Chef Angie',
  description: 'Authentic Kenyan cuisine in Diani Beach',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Diani Beach',
    addressCountry: 'KE',
  },
  telephone: '+254719635944',
  servesCuisine: 'Kenyan',
}
```

---

## Accessibilite (WCAG 2.1 AA)

### Checklist Obligatoire

- [ ] **Alt text** descriptif pour toutes les images
- [ ] **Labels** associes a tous les inputs
- [ ] **Contraste** minimum 4.5:1 (texte normal)
- [ ] **Focus visible** sur elements interactifs
- [ ] **Hierarchie headings** (h1 > h2 > h3)
- [ ] **Liens descriptifs** (pas de "cliquez ici")
- [ ] **Skip to content** link
- [ ] **ARIA labels** si necessaire

### Exemples

```tsx
// Images
<Image
  src="/chef.jpg"
  alt="Chef Angie preparant un biryani traditionnel"
/>

// Formulaires
<label htmlFor="email">Adresse email</label>
<input
  id="email"
  type="email"
  aria-describedby="email-help"
  required
/>
<span id="email-help">Nous ne partagerons jamais votre email</span>

// Boutons icon-only
<button aria-label="Ouvrir le menu de navigation">
  <MenuIcon />
</button>
```

---

## Performance

### Core Web Vitals Cibles

| Metrique | Cible | Description |
|----------|-------|-------------|
| LCP | < 2.5s | Largest Contentful Paint |
| FID | < 100ms | First Input Delay |
| CLS | < 0.1 | Cumulative Layout Shift |

### Optimisations Obligatoires

1. **Images:** next/image avec lazy loading
2. **Fonts:** next/font avec display: swap
3. **Components:** Lazy load pour composants lourds
4. **Imports:** Imports specifiques (pas d'imports globaux)

```tsx
// Lazy loading components
import dynamic from 'next/dynamic'

const Gallery = dynamic(() => import('@/components/Gallery'), {
  loading: () => <GallerySkeleton />,
})
```

---

## Regles d'Or

### 1. TypeScript Strict

- Pas de `any`
- Tous les props types
- Tous les event handlers types

### 2. Server Components par Defaut

- Client Components seulement si necessaire (hooks, events, browser APIs)

### 3. Semantic HTML

- `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`, `<article>`
- Pas de `<div>` soup

### 4. Tailwind Only

- Pas de CSS custom sauf absolument necessaire
- Utiliser `cn()` pour classes conditionnelles

### 5. Validation

- Zod pour validation formulaires (client + server)
- Rate limiting sur API routes

---

## Validation Pre-Commit

```bash
# TypeScript
npx tsc --noEmit

# Linting
npm run lint

# Build test
npm run build
```

### Checklist Visuelle

```
[ ] TypeScript: Aucune erreur
[ ] ESLint: Aucune erreur
[ ] Responsive: Teste sur 375px, 768px, 1280px
[ ] Accessibilite: Alt, labels, contraste
[ ] SEO: Metadata presente
[ ] Performance: next/image, next/font utilises
[ ] Security: Pas de secrets exposes
```

---

## Langue et Communication

- **Communication avec utilisateur:** Francais
- **Code (composants, variables):** Anglais
- **Commit messages:** Anglais
- **Contenu UI:** Francais (structure i18n pour futur multilingue)

---

## Documents de Reference

| Document | Contenu |
|----------|---------|
| `backlog-chef-angie.md` | Backlog produit complet (EPICs, Stories) |
| `content-inventory.md` | Inventaire du contenu disponible |
| `Prompt_system_Agent_Reviewer.md` | Criteres de code review |
| `CLAUDE.md` | Instructions systeme pour Claude |

---

**Derniere mise a jour :** 2026-01-18
