# Todo List - Chef Angie Website

## A faire

- [ ] Creer une adresse email dediee : `contact@chefangie.com` (ou similaire comme `chef@angie.co.ke`)
  - Cette adresse est actuellement affichee sur le site (footer, page contact)
  - A configurer une fois le domaine choisi

- [ ] Ajouter la page Blog (apres mise en ligne et bon referencement du site)
  - Page retiree temporairement de la navigation
  - Les fichiers existent toujours dans `/app/blog/`

## En cours

### E12 - Systeme de Temoignages (PRD: `docs/PRD-testimonials-system.md`)

**Phase 1 - Infrastructure** ✅
- [x] E12-S1: Configuration Prisma + PostgreSQL (Neon)
- [x] E12-S2: API POST soumission temoignage
- [x] E12-S3: API GET temoignages approuves

**Phase 2 - UI Components** ✅
- [x] E12-S4: Composant Modal
- [x] E12-S5: Composant StarRatingInput
- [x] E12-S6: Composant TestimonialForm
- [x] E12-S6b: Composant LeaveReviewButton
- [x] E12-S7: Composant TestimonialCard

**Phase 3 - Integration & SEO** ✅
- [x] E12-S8: Section Testimonials (Homepage)
- [x] E12-S12: Bouton Review sur page Hebergement
- [x] E12-S12b: Bouton Review sur page Cuisine
- [x] E12-S13: Page dediee `/testimonials` (SEO)

**Phase 4 - Administration**
- [x] E12-S9b: Configuration NextAuth
- [x] E12-S9: Page Admin moderation
- [x] E12-S10: API Admin (GET, PATCH, DELETE)
- [ ] E12-S11: Notifications email (optionnel - phase future)

## Termine

