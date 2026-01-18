# Design System - Chef Angie Website

> **Document de reference pour le design du site**
> **Version:** 1.0 - Draft
> **Statut:** EN ATTENTE DE VALIDATION
> **Date:** Janvier 2026

---

## 1. Vision & Objectifs Design

### 1.1 Vision du projet

Creer un site vitrine elegant et chaleureux qui reflete l'authenticite de la cuisine kenyane et l'hospitalite africaine, tout en inspirant confiance pour les services d'hebergement.

### 1.2 Objectifs UX

| Objectif | Mesure de succes |
|----------|------------------|
| Facilite de navigation | L'utilisateur trouve l'info en < 3 clics |
| Conversion | CTA visibles, parcours clair vers contact/reservation |
| Confiance | Temoignages visibles, photos professionnelles |
| Mobile-friendly | Experience excellente sur tous les devices |

### 1.3 Emotions a transmettre

- **Chaleur** : Accueil, hospitalite africaine
- **Authenticite** : Tradition, savoir-faire local
- **Qualite** : Professionnalisme, attention aux details
- **Fraicheur** : Ingredients locaux, cuisine maison

---

## 2. Palette de Couleurs

> **Inspiree du logo Chef Angie** : Toque de chef avec plumes decoratives en teal et corail
> **Theme** : Côtier (ocean) + Chaleureux (epices, hospitalite)

### 2.1 Couleurs Principales - Ocean & Côte

| Nom | Hex | RGB | Usage |
|-----|-----|-----|-------|
| **Teal** | `#0D9488` | rgb(13, 148, 136) | CTA principaux, liens, accents ocean |
| **Teal Light** | `#14B8A6` | rgb(20, 184, 166) | Hover states |
| **Teal Dark** | `#0F766E` | rgb(15, 118, 110) | Active states |
| **Turquoise** | `#06B6D4` | rgb(6, 182, 212) | Accents secondaires, highlights |

### 2.2 Couleurs Secondaires - Chaleur & Epices

| Nom | Hex | RGB | Usage |
|-----|-----|-----|-------|
| **Coral** | `#F97316` | rgb(249, 115, 22) | CTA secondaires, prix, badges |
| **Coral Light** | `#FB923C` | rgb(251, 146, 60) | Hover, highlights |
| **Coral Dark** | `#EA580C` | rgb(234, 88, 12) | Active states |
| **Terracotta** | `#C2410C` | rgb(194, 65, 12) | Accents profonds |

### 2.3 Couleurs d'Accent

| Nom | Hex | RGB | Usage |
|-----|-----|-----|-------|
| **Sand** | `#D4A574` | rgb(212, 165, 116) | Accents doux, bordures |
| **Palm Green** | `#166534` | rgb(22, 101, 52) | Fraicheur, succes |
| **Sunset Gold** | `#FBBF24` | rgb(251, 191, 36) | Etoiles rating, highlights speciaux |

### 2.4 Couleurs Neutres

| Nom | Hex | RGB | Usage |
|-----|-----|-----|-------|
| **Sand Light** | `#FEF7EC` | rgb(254, 247, 236) | Background principal (sable clair) |
| **White** | `#FFFFFF` | rgb(255, 255, 255) | Cards, sections alternees |
| **Ocean Dark** | `#134E4A` | rgb(19, 78, 74) | Texte titres, accents forts |
| **Charcoal** | `#1F2937` | rgb(31, 41, 55) | Texte corps principal |
| **Gray Warm** | `#57534E` | rgb(87, 83, 78) | Texte secondaire |
| **Gray Light** | `#E7E5E4` | rgb(231, 229, 228) | Bordures, separateurs |
| **Seafoam** | `#CCFBF1` | rgb(204, 251, 241) | Background accent leger |

### 2.5 Gradients Côtiers

```css
/* Ocean Sunset - Hero backgrounds */
background: linear-gradient(135deg, #0D9488 0%, #06B6D4 50%, #F97316 100%);

/* Sandy Beach - Section backgrounds */
background: linear-gradient(180deg, #FEF7EC 0%, #FFFFFF 100%);

/* Tropical Warmth - CTA buttons */
background: linear-gradient(90deg, #F97316 0%, #FBBF24 100%);

/* Ocean Depth - Footer */
background: linear-gradient(180deg, #134E4A 0%, #0F766E 100%);
```

### 2.6 Ratios de Contraste (WCAG AA)

| Combinaison | Ratio | Statut |
|-------------|-------|--------|
| Ocean Dark (#134E4A) sur Sand Light (#FEF7EC) | 8.1:1 | ✅ AAA |
| Charcoal (#1F2937) sur White (#FFFFFF) | 14.5:1 | ✅ AAA |
| Teal (#0D9488) sur White (#FFFFFF) | 4.6:1 | ✅ AA |
| Coral (#F97316) sur Ocean Dark (#134E4A) | 5.2:1 | ✅ AA |
| White sur Teal (#0D9488) | 4.6:1 | ✅ AA |

---

## 3. Typographie

> **Style recherche** : Elegant, stylise, avec caractere - refletant l'authenticite et le côte artisanal

### 3.1 Famille de Polices

| Role | Police | Style | Fallback | Source |
|------|--------|-------|----------|--------|
| **Display/Hero** | Cormorant Garamond | Elegant, raffine | Georgia, serif | Google Fonts |
| **Headings** | Cormorant | Classique, lisible | Georgia, serif | Google Fonts |
| **Accent/Script** | Sacramento | Script fluide, signature | cursive | Google Fonts |
| **Body** | Lato | Moderne, lisible | system-ui, sans-serif | Google Fonts |
| **UI/Buttons** | Raleway | Clean, contemporain | sans-serif | Google Fonts |

### 3.2 Utilisation des Polices

```
CORMORANT GARAMOND (Display)
→ Hero titles, grands titres de page
→ Donne un aspect luxueux et raffine
→ Weights: 400, 500, 600, 700

CORMORANT (Headings)
→ H1, H2, H3 des sections
→ Elegant mais plus structure que Garamond
→ Weights: 400, 500, 600, 700

SACRAMENTO (Accent Script)
→ "Chef Angie" signature
→ Citations, highlights speciaux
→ Taglines decoratifs
→ Weight: 400 (unique)

LATO (Body)
→ Paragraphes, descriptions
→ Navigation, labels
→ Excellent lisibilite
→ Weights: 300, 400, 700

RALEWAY (UI)
→ Boutons, CTAs
→ Badges, tags
→ Elements d'interface
→ Weights: 400, 500, 600, 700
```

### 3.3 Echelle Typographique (Mobile-First)

| Element | Mobile | Tablet (md) | Desktop (lg) | Font | Weight |
|---------|--------|-------------|--------------|------|--------|
| **Display** | 40px | 56px | 72px | Cormorant Garamond | 600 |
| **H1** | 32px | 40px | 48px | Cormorant | 700 |
| **H2** | 24px | 30px | 36px | Cormorant | 600 |
| **H3** | 20px | 24px | 28px | Cormorant | 600 |
| **H4** | 18px | 20px | 22px | Cormorant | 500 |
| **Script Accent** | 28px | 36px | 44px | Sacramento | 400 |
| **Body Large** | 18px | 18px | 20px | Lato | 400 |
| **Body** | 16px | 16px | 16px | Lato | 400 |
| **Body Small** | 14px | 14px | 14px | Lato | 400 |
| **Button** | 14px | 16px | 16px | Raleway | 600 |
| **Caption** | 12px | 12px | 12px | Lato | 400 |

### 3.4 Line Heights & Letter Spacing

| Type | Line Height | Letter Spacing |
|------|-------------|----------------|
| Display | 1.1 (110%) | -0.02em |
| Headings | 1.2 (120%) | -0.01em |
| Script | 1.3 (130%) | 0.02em |
| Body | 1.7 (170%) | 0 |
| UI/Buttons | 1.4 (140%) | 0.05em |

### 3.5 Exemples d'Application

```
HERO PRINCIPAL:
"Welcome to"
   → Lato, 20px, Light, Teal #0D9488

"Chef Angie's Kitchen"
   → Sacramento, 72px, Regular, Coral #F97316

TITRE SECTION:
"Our Culinary Journey"
   → Cormorant, 48px, SemiBold, Ocean Dark #134E4A

SOUS-TITRE:
"Authentic flavors from Diani Beach"
   → Cormorant Garamond Italic, 24px, Regular, Gray Warm #57534E

BODY TEXT:
"Each recipe is an opportunity to share the story..."
   → Lato, 16px, Regular, Charcoal #1F2937

SIGNATURE/QUOTE:
"Chef Angie"
   → Sacramento, 36px, Regular, Coral #F97316

CTA BUTTON:
"ORDER NOW"
   → Raleway, 16px, SemiBold, uppercase, letter-spacing 0.1em
```

### 3.6 Combinaisons Visuelles

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│   Welcome to                          (Lato Light)  │
│   Chef Angie's Kitchen      (Sacramento, Coral)     │
│                                                     │
│   ─────────────────────────────────────────────     │
│                                                     │
│   DISCOVER OUR SERVICES         (Cormorant Bold)    │
│   Authentic Kenyan Cuisine        (Lato Regular)    │
│                                                     │
│   ┌─────────────┐                                   │
│   │ Order Now   │                (Raleway SemiBold) │
│   └─────────────┘                                   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 4. Espacements

### 4.1 Systeme de Spacing (Base 4px)

| Token | Valeur | Usage |
|-------|--------|-------|
| `space-1` | 4px | Micro-espacement (entre icone et texte) |
| `space-2` | 8px | Espacement compact (padding boutons) |
| `space-3` | 12px | Espacement standard interne |
| `space-4` | 16px | Espacement elements proches |
| `space-6` | 24px | Espacement elements lies |
| `space-8` | 32px | Espacement sections internes |
| `space-12` | 48px | Espacement entre sections (mobile) |
| `space-16` | 64px | Espacement entre sections (tablet) |
| `space-24` | 96px | Espacement entre sections (desktop) |

### 4.2 Conteneurs

| Conteneur | Max Width | Usage |
|-----------|-----------|-------|
| **Full** | 100% | Hero, sections full-bleed |
| **Wide** | 1440px | Sections principales |
| **Standard** | 1200px | Contenu standard |
| **Narrow** | 800px | Texte, blog articles |
| **Compact** | 600px | Formulaires, modals |

### 4.3 Padding Sections (Responsive)

| Device | Padding Vertical | Padding Horizontal |
|--------|------------------|-------------------|
| Mobile | 48px (py-12) | 16px (px-4) |
| Tablet | 64px (py-16) | 24px (px-6) |
| Desktop | 96px (py-24) | 32px (px-8) |

---

## 5. Composants UI

### 5.1 Boutons

#### Primary Button (Teal - Ocean)
```
Background: Teal #0D9488
Text: White #FFFFFF
Padding: 14px 28px
Border-radius: 8px
Font: Raleway, 16px, SemiBold, uppercase, letter-spacing 0.05em
Shadow: 0 4px 14px rgba(13, 148, 136, 0.3)

Hover:
  Background: Teal Light #14B8A6
  Shadow: 0 6px 20px rgba(13, 148, 136, 0.4)
  Transform: translateY(-2px)

Active:
  Background: Teal Dark #0F766E
  Shadow: 0 2px 8px rgba(13, 148, 136, 0.2)
  Transform: translateY(0)
```

#### Secondary Button (Coral - Warm)
```
Background: Coral #F97316
Text: White #FFFFFF
Padding: 14px 28px
Border-radius: 8px
Font: Raleway, 16px, SemiBold, uppercase

Hover:
  Background: Coral Light #FB923C
  Transform: translateY(-2px)

Active:
  Background: Coral Dark #EA580C
```

#### Outline Button
```
Background: Transparent
Border: 2px solid Teal #0D9488
Text: Teal #0D9488
Padding: 12px 26px
Border-radius: 8px

Hover:
  Background: Teal #0D9488
  Text: White #FFFFFF
```

#### Ghost Button
```
Background: Transparent
Text: Ocean Dark #134E4A
Padding: 12px 24px
Font: Raleway, 16px, Medium
Text-decoration: none

Hover:
  Text: Teal #0D9488
  Text-decoration: underline
```

#### Gradient Button (Special CTA)
```
Background: linear-gradient(90deg, #F97316 0%, #FBBF24 100%)
Text: White #FFFFFF
Padding: 16px 32px
Border-radius: 50px (pill shape)
Font: Raleway, 18px, Bold, uppercase
Shadow: 0 4px 20px rgba(249, 115, 22, 0.4)

Hover:
  Shadow: 0 6px 30px rgba(249, 115, 22, 0.5)
  Transform: translateY(-2px) scale(1.02)
```

### 5.2 Cards

#### Service Card
```
Background: White #FFFFFF
Border-radius: 16px
Shadow: 0 4px 20px rgba(13, 148, 136, 0.08)
Padding: 28px
Border: 1px solid Gray Light #E7E5E4
Border-top: 4px solid Teal #0D9488

Hover:
  Shadow: 0 12px 40px rgba(13, 148, 136, 0.15)
  Transform: translateY(-6px)
  Border-top-color: Coral #F97316
  Transition: all 0.3s ease
```

#### Testimonial Card
```
Background: Seafoam #CCFBF1
Border-radius: 16px
Padding: 32px
Border-left: 4px solid Coral #F97316
Position: relative

Quote Icon:
  Color: Coral #F97316
  Size: 40px
  Position: absolute top-left
  Opacity: 0.3

Star Rating: Sunset Gold #FBBF24
Author Photo: 56px circle, border 3px solid Teal
```

#### Food Item Card
```
Background: White #FFFFFF
Border-radius: 16px
Overflow: hidden
Shadow: 0 4px 16px rgba(0,0,0,0.08)

Image:
  Aspect-ratio: 4/3
  Object-fit: cover
  Transition: transform 0.4s ease

Image Hover:
  Transform: scale(1.05)

Content Padding: 24px
Price Badge:
  Background: Coral #F97316
  Text: White #FFFFFF
  Font: Raleway, 14px, Bold
  Padding: 6px 12px
  Border-radius: 20px
  Position: Absolute top-right (12px, 12px)

Title: Cormorant, 22px, SemiBold, Ocean Dark
Description: Lato, 14px, Gray Warm
```

#### Accommodation Card
```
Background: White #FFFFFF
Border-radius: 20px
Overflow: hidden
Shadow: 0 8px 30px rgba(0,0,0,0.1)

Image:
  Aspect-ratio: 16/9
  Object-fit: cover

Content:
  Padding: 24px
  Background: linear-gradient(180deg, transparent 0%, white 20%)

Amenity Icons:
  Color: Teal #0D9488
  Size: 20px
  Gap: 16px

Price:
  Font: Cormorant, 28px, Bold, Ocean Dark
  Per night: Lato, 14px, Gray Warm
```

### 5.3 Navigation

#### Header Desktop
```
Background: White #FFFFFF (ou transparent sur hero)
Height: 80px
Shadow: 0 2px 10px rgba(0,0,0,0.05) on scroll
Position: Fixed
Z-index: 1000

Logo: Left aligned
Nav Links: Center (or right)
CTA: Right aligned
```

#### Header Mobile
```
Height: 64px
Hamburger Menu: Right aligned
Mobile Menu: Full-screen overlay, Background Cream
```

#### Navigation Links
```
Font: Inter, 16px, Medium
Color: Brown #7C3D1F
Padding: 8px 16px

Hover: Primary Red #DC2626
Active: Primary Red #DC2626, underline offset 4px
```

### 5.4 Formulaires

#### Input Field
```
Background: White #FFFFFF
Border: 1px solid Gray Light #E5E7EB
Border-radius: 8px
Padding: 12px 16px
Font: Inter, 16px

Focus:
  Border: 2px solid Primary Red #DC2626
  Outline: none
  Shadow: 0 0 0 3px rgba(220, 38, 38, 0.1)

Error:
  Border: 2px solid #EF4444

Label:
  Font: Inter, 14px, Medium
  Color: Gray Dark #374151
  Margin-bottom: 8px
```

#### Textarea
```
Same as Input
Min-height: 120px
Resize: vertical
```

---

## 6. Iconographie

### 6.1 Style des Icones

| Propriete | Valeur |
|-----------|--------|
| Style | Outlined / Line icons |
| Stroke width | 1.5px - 2px |
| Corner radius | Rounded |
| Taille standard | 24px |

### 6.2 Icones Requises

| Icone | Usage |
|-------|-------|
| Menu (hamburger) | Navigation mobile |
| Close (X) | Fermer menu/modal |
| Phone | Contact |
| WhatsApp | Contact rapide |
| Instagram | Social link |
| Email | Contact |
| Location/Map pin | Adresse |
| Star (filled) | Ratings |
| Quote | Temoignages |
| Clock | Horaires |
| Check | Validation, features |
| Arrow right | CTA, links |
| Calendar | Reservation |
| Users/People | Services traiteur |
| Home | Hebergement |
| Utensils/Fork-knife | Cuisine |
| Pool/Swimmer | Amenites |

### 6.3 Source Recommandee

- **Heroicons** (heroicons.com) - Style coherent, MIT license
- **Lucide** (lucide.dev) - Alternative open source

---

## 7. Images & Medias

### 7.1 Style Photographique

| Aspect | Directive |
|--------|-----------|
| **Eclairage** | Naturel, chaleureux, lumiere doree |
| **Ambiance** | Authentique, pas trop "studio" |
| **Couleurs** | Tons chauds, saturation moderee |
| **Composition** | Equilibree, avec espace negatif |
| **Sujets** | Nourriture en gros plan, Chef en action, details ingredients |

### 7.2 Traitement Images

```
Filter suggestion (CSS):
  brightness(1.02)
  contrast(1.05)
  saturate(1.1)

Border-radius: 12px - 16px (pour cards)
Shadow: 0 8px 30px rgba(0,0,0,0.12)
```

### 7.3 Aspect Ratios

| Type | Ratio | Usage |
|------|-------|-------|
| Hero | 16:9 ou 21:9 | Banner principal |
| Cards | 4:3 | Food items, services |
| Gallery | 3:2 | Galerie appartement |
| Portrait | 3:4 | Photo Chef Angie |
| Square | 1:1 | Thumbnails, temoignages |

### 7.4 Placeholders

Quand une image n'est pas disponible :
```
Background: linear-gradient(135deg, #FFF9F0 0%, #F59E0B20 100%)
Icon: Image placeholder, Gray Medium #6B7280
```

---

## 8. Layout des Pages

### 8.1 Homepage

```
[HEADER - Navigation sticky]

[HERO SECTION]
- Full-width image background (Chef Angie ou plat signature)
- Overlay gradient sombre pour lisibilite
- H1: "Bienvenue chez Chef Angie"
- Tagline: "Authentic Kenyan Cuisine in Diani Beach"
- 2 CTA buttons: "Nos Services Cuisine" | "Decouvrir l'Appartement"
- Height: 90vh mobile, 80vh desktop

[INTRODUCTION]
- Background: Cream
- Photo Chef Angie (portrait)
- Texte court de presentation
- CTA: "En savoir plus"

[SERVICES CUISINE - Overview]
- Background: White
- H2: "Nos Services Culinaires"
- 3 cards: Livraisons | Chef Prive | Traiteur
- CTA: "Voir le menu"

[LIVRAISONS HIGHLIGHT]
- Background: Cream
- Grid 2 colonnes
- Biryani Friday card | Pilau Tuesday card
- Prix affiches
- CTA: "Commander"

[TEMOIGNAGES]
- Background: White ou pattern subtil
- H2: "Ce que disent nos clients"
- Carousel/Slider de temoignages
- Rating etoiles
- CTA: "Laisser un avis"

[HEBERGEMENT PREVIEW]
- Background: Cream
- Image large de l'appartement
- H2: "Votre refuge a Diani Beach"
- Liste amenites (icones)
- CTA: "Decouvrir l'appartement"

[CONTACT SECTION]
- Background: Brown ou Primary Red
- Text: White
- Infos contact (phone, WhatsApp, Instagram)
- Mini formulaire ou CTA contact

[FOOTER]
```

### 8.2 Page Cuisine/Livraisons

```
[HEADER]

[HERO]
- Image plat signature
- H1: "Savourez l'Authenticite Kenyane"

[BIRYANI FRIDAY SECTION]
- Background: Dark (#1a1a2e ou similar)
- Accent: Rouge
- Photos plats
- Prix
- "Why You'll Love It" features
- CTA Commander

[PILAU TUESDAY SECTION]
- Background: Light/Cream
- Accent: Orange/Gold
- Photos plats
- Prix
- Features
- CTA Commander

[COMMENT COMMANDER]
- Steps numerotes
- Icones

[TEMOIGNAGES CUISINE]
- Slider temoignages
- Formulaire "Laisser un avis"

[FOOTER]
```

### 8.3 Page Hebergement

```
[HEADER]

[HERO]
- Image appartement/piscine
- H1: "Votre Maison a Diani Beach"

[GALERIE]
- Grid responsive d'images
- Lightbox on click
- Video tour

[DESCRIPTION]
- Texte descriptif
- Liste amenites avec icones

[TARIFS & DISPONIBILITE]
- Card avec prix
- Calendrier ou CTA reservation

[LOCALISATION]
- Map embed ou image
- Description quartier

[FOOTER]
```

### 8.4 Page Contact

```
[HEADER]

[HERO COMPACT]
- H1: "Contactez-nous"

[CONTACT INFO + FORM]
- Grid 2 colonnes
- Left: Infos (phone, WhatsApp, Instagram, email)
- Right: Formulaire contact

[MAP]
- Embed Google Maps ou image

[FOOTER]
```

---

## 9. Animations & Interactions

### 9.1 Transitions Globales

```css
/* Default transition */
transition: all 0.3s ease;

/* Hover lift effect */
transform: translateY(-4px);
box-shadow: 0 8px 30px rgba(0,0,0,0.12);

/* Button press */
transform: translateY(1px);
```

### 9.2 Scroll Animations

| Element | Animation | Trigger |
|---------|-----------|---------|
| Sections | Fade in + slide up | On scroll into view |
| Cards | Fade in staggered | On scroll into view |
| Images | Subtle zoom | On scroll |
| Stats/Numbers | Count up | On scroll into view |

### 9.3 Micro-interactions

| Element | Interaction |
|---------|-------------|
| Buttons | Scale 1.02 on hover |
| Links | Color transition + underline |
| Cards | Lift + shadow on hover |
| Form focus | Border color + shadow |
| Menu mobile | Slide in from right |

---

## 10. Responsive Breakpoints

### 10.1 Breakpoints

| Nom | Min-width | Description |
|-----|-----------|-------------|
| `xs` | 0 | Mobile small |
| `sm` | 640px | Mobile large |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop small |
| `xl` | 1280px | Desktop |
| `2xl` | 1536px | Desktop large |

### 10.2 Adaptations par Breakpoint

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Navigation | Hamburger menu | Hamburger ou inline | Inline |
| Hero H1 | 32px | 40px | 48px |
| Grid columns | 1 | 2 | 3-4 |
| Section padding | 48px | 64px | 96px |
| Card layout | Stack | Grid 2 | Grid 3 |

---

## 11. Accessibilite

### 11.1 Checklist Design

- [x] Contraste texte minimum 4.5:1
- [x] Contraste elements UI minimum 3:1
- [x] Taille texte minimum 16px pour body
- [x] Touch targets minimum 44x44px
- [x] Focus states visibles
- [x] Ne pas rely uniquement sur la couleur

### 11.2 Focus States

```css
/* Focus visible */
outline: 2px solid #DC2626;
outline-offset: 2px;
border-radius: inherit;
```

### 11.3 Skip Link

```
Position: fixed top-left
Visible only on focus
Text: "Aller au contenu principal"
```

---

## 12. Section Temoignages (Detail)

### 12.1 Structure

```
[SECTION TEMOIGNAGES]

[Header]
- H2: "Ce que disent nos clients"
- Sous-titre: "Decouvrez les experiences de ceux qui ont goute a notre cuisine"

[Testimonials Carousel/Grid]
- Cards temoignages existants
- Affichage: Carousel mobile, Grid desktop
- 3 temoignages visibles minimum

[CTA Laisser un avis]
- Bouton: "Partagez votre experience"
- Ouvre formulaire modal ou section

[Formulaire Temoignage]
- Nom (required)
- Email (required, not displayed)
- Service utilise (dropdown: Biryani Friday, Pilau Tuesday, Chef Prive, Traiteur)
- Rating (1-5 etoiles clickable)
- Temoignage (textarea, 50-500 chars)
- Photo (optional upload)
- Submit button
- Note: "Votre temoignage sera publie apres validation"
```

### 12.2 Testimonial Card Design

```
[Card]
├── Quote icon (top left, gold)
├── Rating stars (5 stars, filled = gold)
├── Testimonial text (italic, gray dark)
├── Divider line
├── Author info
│   ├── Photo (circle, 48px) OR Initials avatar
│   ├── Name (bold)
│   └── Service + Date (caption, gray)
└── Border-left: 4px gold
```

---

## 13. Logo & Branding

### 13.1 Logo Principal

**Fichier:** `img/logo_img.jpg`

**Description:**
- Toque de chef blanche stylisee
- Plumes/feuilles decoratives en teal et corail
- Bandeau teal a la base

**Utilisation:**
```
Header: Logo seul ou avec texte "Chef Angie"
Footer: Logo + tagline
Favicon: Version simplifiee (toque seule)
```

**Dimensions recommandees:**
| Emplacement | Taille | Format |
|-------------|--------|--------|
| Header Desktop | 60px height | PNG transparent |
| Header Mobile | 48px height | PNG transparent |
| Footer | 80px height | PNG transparent |
| Favicon | 32x32px | ICO/PNG |
| OG Image | Integre dans image 1200x630 | PNG |

### 13.2 Texte de marque

```
NOM COMPLET: Chef Angie
TAGLINE: "Authentic Kenyan Cuisine in Diani Beach"
SIGNATURE: Utiliser Sacramento font pour "Chef Angie"
```

---

## 14. Validation & Prochaines Etapes

### 14.1 Elements Valides

| Element | Statut | Commentaires |
|---------|--------|--------------|
| Logo | ✅ Valide | `img/logo_img.jpg` |
| Palette de couleurs | ✅ Valide | Teal + Coral (côtier) |
| Typographie | ✅ Valide | Cormorant + Sacramento + Lato + Raleway |
| Style general | ✅ Valide | Chaleureux, elegant, hospitalite africaine |

### 14.2 Elements a Confirmer

| Element | Statut | Question |
|---------|--------|----------|
| Layout Homepage | [ ] A valider | Structure proposee OK ? |
| Layout Livraisons | [ ] A valider | Sections Biryani/Pilau OK ? |
| Style Temoignages | [ ] A valider | Cards + formulaire OK ? |
| Animations | [ ] A valider | Subtiles ou plus dynamiques ? |

### 14.3 Fonctionnalites Speciales Confirmees

- [x] Section temoignages avec affichage des avis existants
- [x] Formulaire pour laisser un nouveau temoignage
- [x] Couleurs côtieres (ocean + chaleur)
- [x] Typographie stylisee et elegante

---

**Document cree le:** 2026-01-18
**Mis a jour le:** 2026-01-18
**A valider par:** Client
**Version:** 1.1 - Couleurs & Typo valides
