# Product Backlog - Chef Angie Website

> **Scrum Master BMAD** | Date: Janvier 2026
> **Version**: 1.0
> **Source PRD**: cahier-des-charges-site-web.md + plan-strategie-marketing-chef-angie.md

---

## Vue d'ensemble des EPICs

| ID | EPIC | Description | Priorite | Stories |
|----|------|-------------|----------|---------|
| E1 | Foundation & Setup | Configuration projet, stack technique | Critique | 5 |
| E2 | Layout & Navigation | Header, Footer, Navigation, Boutons flottants | Critique | 6 |
| E3 | Homepage | Page d'accueil multi-sections | Haute | 7 |
| E4 | Section Cuisine | Hub cuisine + 3 sous-pages | Haute | 8 |
| E5 | Section Hebergement | Hub stay + appartement + galerie | Haute | 7 |
| E6 | Page Experiences | Packages combines | Moyenne | 3 |
| E7 | Page About | Histoire de Chef Angie | Moyenne | 2 |
| E8 | Systeme Blog | Blog MDX avec listing et articles | Haute | 5 |
| E9 | Page Contact | Formulaire, FAQ, carte | Haute | 5 |
| E10 | SEO & Analytics | Meta, schema, sitemap, GA4 | Haute | 6 |
| E11 | Integration Contact | WhatsApp, telephone, formulaire email | Critique | 4 |

**Total Stories**: 58

---

## EPIC 1: Foundation & Setup

### E1-S1: Initialisation du projet Next.js

**Titre**: Creer le projet Next.js avec App Router

**Description**:
En tant que developpeur, je dois initialiser le projet Next.js 14+ avec TypeScript, Tailwind CSS et la structure de dossiers definie dans le cahier des charges.

**Criteres d'acceptation**:
- [ ] Projet Next.js 14+ cree avec `create-next-app`
- [ ] TypeScript configure
- [ ] Tailwind CSS installe et configure
- [ ] ESLint et Prettier configures
- [ ] Structure de dossiers `/src/app`, `/src/components`, `/src/lib` creee
- [ ] Le projet compile sans erreur (`npm run build`)

**Dependances**: Aucune

**Complexite**: S

**Fichiers/Composants**:
- `package.json`
- `tsconfig.json`
- `next.config.js`
- `tailwind.config.js`
- `.eslintrc.json`

---

### E1-S2: Configuration Tailwind avec theme personnalise

**Titre**: Configurer le theme Tailwind selon la charte graphique

**Description**:
En tant que developpeur, je dois configurer Tailwind avec les couleurs, polices et espacements definis pour Chef Angie.

**Criteres d'acceptation**:
- [ ] Couleurs personnalisees configurees (primary rouge #DC2626, secondary or #F59E0B, accent vert #059669, brown #7C3D1F, cream #FFF9F0)
- [ ] Polices Playfair Display (titres) et Inter (corps) configurees
- [ ] Google Fonts importees
- [ ] Classes utilitaires testees sur un composant

**Dependances**: E1-S1

**Complexite**: S

**Fichiers/Composants**:
- `tailwind.config.js`
- `src/styles/globals.css`
- `src/app/layout.tsx`

---

### E1-S3: Structure des dossiers et fichiers de base

**Titre**: Creer l'arborescence complete des fichiers

**Description**:
En tant que developpeur, je dois creer tous les dossiers et fichiers vides selon l'architecture definie.

**Criteres d'acceptation**:
- [ ] Dossier `/src/app` avec toutes les routes (cuisine, stay, experiences, about, blog, contact)
- [ ] Dossier `/src/components` avec sous-dossiers (layout, ui, sections, cuisine, stay, blog)
- [ ] Dossier `/src/lib` avec utils.ts, constants.ts
- [ ] Dossier `/src/types` avec index.ts
- [ ] Dossier `/public/images` avec sous-dossiers (apartment, dishes, chef, blog)

**Dependances**: E1-S1

**Complexite**: S

**Fichiers/Composants**:
- Structure complete selon cahier des charges section 7.2

---

### E1-S4: Configuration des constantes globales

**Titre**: Creer le fichier de constantes avec les donnees metier

**Description**:
En tant que developpeur, je dois centraliser toutes les informations de contact, prix, et donnees metier dans un fichier de constantes.

**Criteres d'acceptation**:
- [ ] Informations de contact (telephone, WhatsApp, email, adresse)
- [ ] Prix des plats (Chicken Biryani 550, Beef Biryani 500, Beef Pilau 450)
- [ ] Prix hebergement (5,000 - 8,000 KES/nuit)
- [ ] Zones de livraison (Diani, Ukunda, Galu, Tiwi)
- [ ] Liens reseaux sociaux
- [ ] Types exportes pour TypeScript

**Dependances**: E1-S1, E1-S3

**Complexite**: S

**Fichiers/Composants**:
- `src/lib/constants.ts`
- `src/types/index.ts`

---

### E1-S5: Configuration MDX pour le blog

**Titre**: Installer et configurer MDX pour les articles de blog

**Description**:
En tant que developpeur, je dois configurer le support MDX pour permettre la redaction d'articles de blog en Markdown.

**Criteres d'acceptation**:
- [ ] Package `@next/mdx` installe
- [ ] next.config.js configure pour MDX
- [ ] Dossier `/src/content/blog` cree
- [ ] Un article de test MDX fonctionne
- [ ] Frontmatter supporte (titre, date, description, image)

**Dependances**: E1-S1

**Complexite**: M

**Fichiers/Composants**:
- `next.config.js`
- `src/content/blog/`
- `src/lib/blog.ts`

---

## EPIC 2: Layout & Navigation

### E2-S1: Composant Header Desktop

**Titre**: Creer le header avec navigation desktop

**Description**:
En tant que visiteur, je veux voir un header clair avec le logo et la navigation pour acceder facilement aux differentes sections.

**Criteres d'acceptation**:
- [ ] Logo Chef Angie a gauche (lien vers accueil)
- [ ] Navigation avec menus deroulants pour "Cuisine" et "Stay"
- [ ] Liens directs pour "Experiences", "About", "Blog"
- [ ] Bouton CTA "Contact" a droite
- [ ] Header sticky au scroll
- [ ] Dropdowns animes au hover

**Dependances**: E1-S2

**Complexite**: M

**Fichiers/Composants**:
- `src/components/layout/Header.tsx`
- `src/components/layout/Navigation.tsx`

---

### E2-S2: Composant Header Mobile

**Titre**: Creer le menu mobile hamburger

**Description**:
En tant que visiteur mobile, je veux un menu hamburger accessible pour naviguer sur le site.

**Criteres d'acceptation**:
- [ ] Icone hamburger visible sur mobile/tablet
- [ ] Menu plein ecran ou sidebar a l'ouverture
- [ ] Sous-menus expansibles pour Cuisine et Stay
- [ ] Animation d'ouverture/fermeture fluide
- [ ] Fermeture au clic sur un lien ou en dehors
- [ ] Focus trap pour accessibilite

**Dependances**: E2-S1

**Complexite**: M

**Fichiers/Composants**:
- `src/components/layout/MobileMenu.tsx`
- `src/components/layout/Header.tsx`

---

### E2-S3: Composant Footer

**Titre**: Creer le footer avec informations et liens

**Description**:
En tant que visiteur, je veux un footer complet avec les informations de contact et liens utiles.

**Criteres d'acceptation**:
- [ ] Section contact (telephone, WhatsApp, email, adresse)
- [ ] Liens de navigation rapide
- [ ] Liens reseaux sociaux (Instagram, TikTok si applicable)
- [ ] Copyright avec annee dynamique
- [ ] Design responsive (colonnes sur desktop, empile sur mobile)

**Dependances**: E1-S2

**Complexite**: S

**Fichiers/Composants**:
- `src/components/layout/Footer.tsx`

---

### E2-S4: Boutons flottants WhatsApp et Call

**Titre**: Creer les boutons de contact flottants

**Description**:
En tant que visiteur, je veux des boutons WhatsApp et telephone toujours visibles pour contacter Chef Angie rapidement.

**Criteres d'acceptation**:
- [ ] Boutons fixes en bas a droite
- [ ] Bouton WhatsApp vert avec icone
- [ ] Bouton telephone avec icone
- [ ] Animation au hover
- [ ] Taille tactile minimum 44x44px
- [ ] Visibles sur toutes les pages
- [ ] Z-index superieur au reste du contenu

**Dependances**: E1-S2

**Complexite**: S

**Fichiers/Composants**:
- `src/components/layout/FloatingButtons.tsx`

---

### E2-S5: Layout principal de l'application

**Titre**: Creer le layout racine avec Header et Footer

**Description**:
En tant que developpeur, je dois creer le layout global qui encapsule toutes les pages.

**Criteres d'acceptation**:
- [ ] Layout avec Header, main content, Footer
- [ ] Metadata de base configurees
- [ ] Polices Google chargees
- [ ] FloatingButtons inclus
- [ ] Structure HTML semantique

**Dependances**: E2-S1, E2-S3, E2-S4

**Complexite**: S

**Fichiers/Composants**:
- `src/app/layout.tsx`

---

### E2-S6: Composant Breadcrumb

**Titre**: Creer le fil d'Ariane pour la navigation

**Description**:
En tant que visiteur, je veux voir un fil d'Ariane sur les pages profondes pour savoir ou je suis.

**Criteres d'acceptation**:
- [ ] Affichage du chemin de navigation (ex: Stay > The Apartment)
- [ ] Liens cliquables sauf page courante
- [ ] Style coherent avec la charte
- [ ] Masque sur mobile si necessaire

**Dependances**: E1-S2

**Complexite**: S

**Fichiers/Composants**:
- `src/components/ui/Breadcrumb.tsx`

---

## EPIC 3: Homepage

### E3-S1: Section Hero Homepage

**Titre**: Creer la section Hero avec image et CTAs

**Description**:
En tant que visiteur, je veux voir immediatement ce que propose Chef Angie des mon arrivee sur le site.

**Criteres d'acceptation**:
- [ ] Image de fond pleine largeur (Diani Beach ou Chef Angie)
- [ ] Titre principal "Your Complete Diani Experience"
- [ ] Sous-titre descriptif
- [ ] Deux boutons CTA: "Explore Cuisine" et "Book Your Stay"
- [ ] Responsive (texte adapte sur mobile)
- [ ] Image optimisee avec next/image

**Dependances**: E2-S5

**Complexite**: M

**Fichiers/Composants**:
- `src/components/sections/Hero.tsx`
- `src/app/page.tsx`

---

### E3-S2: Section Two Pillars (Cuisine + Stay)

**Titre**: Creer la section presentant les deux activites

**Description**:
En tant que visiteur, je veux voir clairement les deux services proposes cote a cote.

**Criteres d'acceptation**:
- [ ] Deux cartes cote a cote (responsive: empilees sur mobile)
- [ ] Carte Cuisine: image, titre "Taste", description, prix "From 450 KES", CTA "Explore Menu"
- [ ] Carte Stay: image appartement, titre "Stay", description, prix "From 5,000 KES", CTA "View Apartment"
- [ ] Hover effects sur les cartes
- [ ] Images optimisees

**Dependances**: E2-S5

**Complexite**: M

**Fichiers/Composants**:
- `src/components/sections/TwoPillars.tsx`

---

### E3-S3: Section Weekly Specials

**Titre**: Creer la mini-section des plats de la semaine

**Description**:
En tant que visiteur, je veux voir rapidement les plats disponibles cette semaine.

**Criteres d'acceptation**:
- [ ] Titre "This Week's Menu"
- [ ] Cartes pour Biryani Friday et Pilau Tuesday
- [ ] Affichage du prix et jour de livraison
- [ ] Bouton "Order" liant vers WhatsApp avec message pre-rempli
- [ ] Design compact et attractif

**Dependances**: E2-S5

**Complexite**: S

**Fichiers/Composants**:
- `src/components/sections/WeeklySpecials.tsx`
- `src/components/cuisine/DishCard.tsx`

---

### E3-S4: Banniere Combined Experience

**Titre**: Creer la banniere promotionnelle Stay + Chef

**Description**:
En tant que visiteur, je veux comprendre l'avantage de combiner sejour et service chef.

**Criteres d'acceptation**:
- [ ] Banniere visuellement distincte (fond colore ou image)
- [ ] Titre "The Complete Experience"
- [ ] Texte explicatif court
- [ ] CTA "Discover Our Packages" vers /experiences
- [ ] Design attractif et cross-selling evident

**Dependances**: E2-S5

**Complexite**: S

**Fichiers/Composants**:
- `src/components/sections/CombinedExperienceBanner.tsx`

---

### E3-S5: Section About Preview

**Titre**: Creer l'apercu "Meet Chef Angie"

**Description**:
En tant que visiteur, je veux decouvrir qui est Chef Angie pour creer de la confiance.

**Criteres d'acceptation**:
- [ ] Photo de Chef Angie
- [ ] Citation ou texte de presentation court
- [ ] CTA "Learn My Story" vers /about
- [ ] Layout avec image a gauche, texte a droite (inverse sur mobile)

**Dependances**: E2-S5

**Complexite**: S

**Fichiers/Composants**:
- `src/components/sections/AboutPreview.tsx`

---

### E3-S6: Section Testimonials (Affichage)

**Titre**: Creer le carousel de temoignages clients

**Description**:
En tant que visiteur, je veux voir des avis de clients precedents pour me rassurer sur la qualite des services.

**Criteres d'acceptation**:
- [ ] Affichage de 3 temoignages minimum
- [ ] Nom du client et provenance (ville/pays)
- [ ] Texte du temoignage
- [ ] Note en etoiles (1-5)
- [ ] Service utilise (Biryani Friday, Pilau Tuesday, Chef Prive, Traiteur)
- [ ] Date du temoignage
- [ ] Photo du client (optionnel, initiales si absent)
- [ ] Design en cartes style "Seafoam" avec bordure Coral
- [ ] Carousel sur mobile, grille 3 colonnes sur desktop
- [ ] Bouton "Laisser un avis" visible

**Dependances**: E2-S5

**Complexite**: M

**Fichiers/Composants**:
- `src/components/sections/Testimonials.tsx`
- `src/components/ui/TestimonialCard.tsx`
- `src/components/ui/StarRating.tsx`

---

### E3-S6b: Formulaire de Temoignage (Soumission)

**Titre**: Permettre aux clients de laisser un temoignage

**Description**:
En tant que client ayant utilise les services de Chef Angie, je veux pouvoir laisser un avis pour partager mon experience avec d'autres visiteurs.

**Criteres d'acceptation**:
- [ ] Bouton "Laisser un avis" ouvre un modal/formulaire
- [ ] Champs du formulaire:
  - Nom complet (requis)
  - Email (requis, non affiche publiquement)
  - Ville/Pays (optionnel)
  - Service utilise (dropdown: Biryani Friday, Pilau Tuesday, Chef Prive, Traiteur, Hebergement)
  - Note en etoiles cliquables (1-5, requis)
  - Temoignage texte (requis, 50-500 caracteres)
  - Photo (optionnel, upload)
- [ ] Validation cote client (Zod)
- [ ] Validation cote serveur (API Route)
- [ ] Message de confirmation apres soumission
- [ ] Note: "Votre avis sera publie apres moderation"
- [ ] Stockage des temoignages (JSON file ou DB simple)
- [ ] Protection anti-spam (rate limiting, honeypot)

**Dependances**: E3-S6, E6-S1 (API Contact)

**Complexite**: L

**Fichiers/Composants**:
- `src/components/forms/TestimonialForm.tsx`
- `src/components/ui/StarRatingInput.tsx`
- `src/components/ui/Modal.tsx`
- `app/api/testimonials/route.ts`
- `src/lib/validations/testimonial.ts`
- `data/testimonials.json` (ou DB)

---

### E3-S7: Section CTA finale

**Titre**: Creer la section d'appel a l'action en bas de page

**Description**:
En tant que visiteur, je veux un dernier rappel pour passer a l'action.

**Criteres d'acceptation**:
- [ ] Titre engageant "Ready to experience the best of Diani?"
- [ ] Deux boutons: "Order Food" et "Book Stay"
- [ ] Numero de telephone affiche
- [ ] Background distinctif

**Dependances**: E2-S5

**Complexite**: S

**Fichiers/Composants**:
- `src/components/sections/CTASection.tsx`

---

## EPIC 4: Section Cuisine

### E4-S1: Page Hub Cuisine

**Titre**: Creer la page principale /cuisine

**Description**:
En tant que visiteur interesse par la cuisine, je veux voir tous les services culinaires proposes.

**Criteres d'acceptation**:
- [ ] Hero avec titre "Authentic Swahili Cuisine"
- [ ] Trois cartes services: Delivery, Private Chef, Catering
- [ ] Section "Why Choose Chef Angie" avec checkmarks
- [ ] CTA WhatsApp et Call
- [ ] Liens vers sous-pages

**Dependances**: E2-S5

**Complexite**: M

**Fichiers/Composants**:
- `src/app/cuisine/page.tsx`
- `src/components/cuisine/ServiceCard.tsx`

---

### E4-S2: Page Livraisons (Approche Hybride Flyers)

**Titre**: Creer la page /cuisine/menu en recréant les flyers en HTML/CSS

**Description**:
En tant que client potentiel, je veux voir les offres de livraison dans un format attractif et fidele aux flyers existants, avec des boutons de commande fonctionnels.

**IMPORTANT** : Cette page doit recreer fidelement le design des flyers existants (`img/Livraisons/`) en HTML/CSS responsive, sans reinventer le design.

**Design de reference** :
- `img/Livraisons/Flyer_biriyani_pics.jpg` - Style dark avec accents rouges
- `img/Livraisons/Flyer_pilau_pics.jpg` - Style light avec accents orange/marron

**Criteres d'acceptation**:
- [ ] **Section Biryani Friday** (style dark background) :
  - [ ] Badge "EVERY FRIDAY" en haut a droite
  - [ ] Photo profil Chef Angie + titre "Authentic Biryani"
  - [ ] Bandeau "Limited Slots - Order Before Thursday!"
  - [ ] 2 cartes plats avec badge "FRESH DAILY" :
    - Chicken Biryani (550 KSH) + description + includes
    - Beef Biryani (500 KSH) + description + includes
  - [ ] Section "Why Choose Chef Angie?" avec 4 icones
  - [ ] Footer avec tel, CTA "ORDER TODAY!", Instagram
- [ ] **Section Pilau Tuesday** (style light/cream background) :
  - [ ] Badge "EVERY TUESDAY" en haut a droite
  - [ ] Titre "BEEF PILAU" avec photo plat et prix 450 KSH
  - [ ] Section "WHY YOU'LL LOVE IT" avec 4 icones
  - [ ] Section "MEET THE CHEF" avec photo et bio courte
  - [ ] CTA "ORDER NOW - 450 KSH"
  - [ ] Footer contact
- [ ] Boutons "Order Now" fonctionnels (lien WhatsApp pre-rempli)
- [ ] Design 100% responsive (mobile-first)
- [ ] Respect des couleurs et typographies des flyers originaux

**Palette de couleurs a respecter** :
| Element | Biryani (Dark) | Pilau (Light) |
|---------|----------------|---------------|
| Background | #1a1a2e / dark | #FFF9F0 / cream |
| Accent | #DC2626 / rouge | #F59E0B / orange |
| CTA | Rouge | Orange |
| Texte | Blanc | Marron/Dark |

**Dependances**: E4-S1, E1-S2

**Complexite**: L

**Fichiers/Composants**:
- `src/app/cuisine/menu/page.tsx`
- `src/components/cuisine/BiryaniSection.tsx`
- `src/components/cuisine/PilauSection.tsx`
- `src/components/cuisine/DishCard.tsx`
- `src/components/cuisine/WhyChooseSection.tsx`
- `src/components/cuisine/OrderButton.tsx`

---

### E4-S3: Page Chef Prive

**Titre**: Creer la page /cuisine/private-chef

**Description**:
En tant que locataire de villa, je veux comprendre le service de chef a domicile.

**Criteres d'acceptation**:
- [ ] Description du service chef prive
- [ ] Liste des occasions (diner romantique, famille, fete)
- [ ] Processus de reservation
- [ ] Galerie photos si disponible
- [ ] CTA pour demander un devis

**Dependances**: E4-S1

**Complexite**: M

**Fichiers/Composants**:
- `src/app/cuisine/private-chef/page.tsx`

---

### E4-S4: Page Traiteur

**Titre**: Creer la page /cuisine/catering

**Description**:
En tant qu'organisateur d'evenement, je veux voir les services traiteur proposes.

**Criteres d'acceptation**:
- [ ] Description du service traiteur
- [ ] Types d'evenements (mariages, anniversaires, corporate)
- [ ] Capacite (nombre de personnes)
- [ ] Processus de demande de devis
- [ ] Galerie d'evenements passes si disponible
- [ ] CTA contact

**Dependances**: E4-S1

**Complexite**: M

**Fichiers/Composants**:
- `src/app/cuisine/catering/page.tsx`

---

### E4-S5: Composant DishCard reutilisable

**Titre**: Creer le composant carte de plat

**Description**:
En tant que developpeur, je veux un composant reutilisable pour afficher les plats.

**Criteres d'acceptation**:
- [ ] Props: image, nom, description, prix, includes, orderLink
- [ ] Image optimisee
- [ ] Affichage du prix formate en KES
- [ ] Bouton de commande WhatsApp
- [ ] Hover effect

**Dependances**: E1-S2

**Complexite**: S

**Fichiers/Composants**:
- `src/components/cuisine/DishCard.tsx`

---

### E4-S6: Composant ServiceCard reutilisable

**Titre**: Creer le composant carte de service cuisine

**Description**:
En tant que developpeur, je veux un composant pour les cartes Delivery/Private Chef/Catering.

**Criteres d'acceptation**:
- [ ] Props: icon, title, description, features, link, cta
- [ ] Icone ou image en haut
- [ ] Liste de features
- [ ] Bouton CTA
- [ ] Hover effect

**Dependances**: E1-S2

**Complexite**: S

**Fichiers/Composants**:
- `src/components/cuisine/ServiceCard.tsx`

---

### E4-S7: Composant OrderButton WhatsApp

**Titre**: Creer le bouton de commande avec message pre-rempli

**Description**:
En tant que client, je veux cliquer sur "Order" et avoir un message WhatsApp pre-rempli.

**Criteres d'acceptation**:
- [ ] Genere URL WhatsApp avec message encode
- [ ] Message inclut: plat, placeholder quantite/location
- [ ] Ouvre WhatsApp (web ou app selon device)
- [ ] Style bouton coherent

**Dependances**: E1-S4

**Complexite**: S

**Fichiers/Composants**:
- `src/components/cuisine/OrderButton.tsx`
- `src/lib/utils.ts` (fonction generateWhatsAppUrl)

---

### E4-S8: Messages WhatsApp pre-remplis

**Titre**: Implementer les messages contextualises par page

**Description**:
En tant que client, je veux que le message WhatsApp soit adapte selon la page ou je suis.

**Criteres d'acceptation**:
- [ ] Message pour commande cuisine (plat, quantite, location, heure)
- [ ] Message pour reservation appartement (dates, nombre guests)
- [ ] Message pour chef prive (dates, nombre personnes, occasion)
- [ ] Message pour traiteur (type evenement, date, nombre invites)

**Dependances**: E4-S7

**Complexite**: S

**Fichiers/Composants**:
- `src/lib/constants.ts`
- `src/lib/utils.ts`

---

## EPIC 5: Section Hebergement

### E5-S1: Page Hub Stay

**Titre**: Creer la page principale /stay

**Description**:
En tant que touriste cherchant un logement, je veux voir l'offre d'hebergement.

**Criteres d'acceptation**:
- [ ] Hero avec image piscine/appartement
- [ ] Titre "Your Home in Diani Beach"
- [ ] Prix affiche (From 5,000 KES/night)
- [ ] CTAs: "Book Direct & Save" et "View Gallery"
- [ ] Key features avec icones (Pool, 1 Bedroom, Kitchen, Diani)
- [ ] Apercu photos
- [ ] Section "Why Book Direct"
- [ ] Bonus Chef Service mention

**Dependances**: E2-S5

**Complexite**: M

**Fichiers/Composants**:
- `src/app/stay/page.tsx`

---

### E5-S2: Page Appartement detaillee

**Titre**: Creer la page /stay/apartment avec tous les details

**Description**:
En tant que locataire potentiel, je veux voir toutes les informations de l'appartement.

**Criteres d'acceptation**:
- [ ] Breadcrumb "Stay > The Apartment"
- [ ] Galerie principale (grande image + thumbnails)
- [ ] Quick info bar (chambres, guests, pool, location)
- [ ] Description complete
- [ ] Box de reservation sticky (prix, CTA)
- [ ] Liste amenities avec icones
- [ ] Section localisation avec carte Google Maps embed
- [ ] House rules (check-in, check-out, smoking, pets)
- [ ] Pricing details (basse/haute saison)
- [ ] Cross-sell chef service
- [ ] CTA contact

**Dependances**: E5-S1

**Complexite**: L

**Fichiers/Composants**:
- `src/app/stay/apartment/page.tsx`
- `src/components/stay/ApartmentFeatures.tsx`
- `src/components/stay/PricingBox.tsx`
- `src/components/stay/AmenitiesList.tsx`

---

### E5-S3: Page Galerie Photos & Video

**Titre**: Creer la page /stay/gallery avec lightbox et video tour

**Description**:
En tant que visiteur, je veux voir toutes les photos et la video de presentation de l'appartement.

**Criteres d'acceptation**:
- [ ] Grille responsive de photos (2 col mobile, 4 col desktop)
- [ ] Lightbox au clic sur une photo
- [ ] Navigation prev/next dans lightbox
- [ ] Fermeture au clic exterieur ou touche Escape
- [ ] Lazy loading des images
- [ ] **Section Video Tour en haut de page** (avant la grille photos)
- [ ] CTA "Book Now" en bas

**Dependances**: E5-S1, E5-S3b

**Complexite**: M

**Fichiers/Composants**:
- `src/app/stay/gallery/page.tsx`
- `src/components/stay/PhotoGallery.tsx`
- `src/components/ui/Lightbox.tsx`

---

### E5-S3b: Video Tour de l'Appartement (Embed)

**Titre**: Integrer la video de presentation de l'appartement

**Description**:
En tant que visiteur interesse par la location, je veux voir une video tour de l'appartement pour mieux visualiser les espaces avant de reserver.

**Video disponible**: `img/hebergement/VID-20260117-WA0020.mp4`

**Criteres d'acceptation**:
- [ ] Player video responsive (16:9 aspect ratio)
- [ ] Controles natifs visibles (play/pause, volume, fullscreen)
- [ ] Poster image (thumbnail) avant lecture
- [ ] Lazy loading de la video (preload="metadata")
- [ ] Autoplay desactive (respect utilisateur)
- [ ] Sous-titres/captions si disponibles
- [ ] Fallback message si video non supportee
- [ ] Design integre au style du site (bordure arrondie, shadow)
- [ ] Titre section: "Take a Virtual Tour"
- [ ] Placement: Hero de la page Gallery OU section dediee sur page Appartement
- [ ] Mobile: video full-width avec controles tactiles

**Options d'hebergement video**:
1. **Self-hosted** (fichier local dans /public/videos/)
   - Avantage: Pas de dependance externe
   - Inconvenient: Bande passante serveur

2. **YouTube/Vimeo embed** (si uploade)
   - Avantage: CDN, streaming optimise
   - Inconvenient: Branding externe, dependance

3. **Cloudinary/Vercel Blob** (recommande)
   - Avantage: Optimisation automatique, CDN
   - Inconvenient: Cout potentiel

**Dependances**: E1-S2, E5-S1

**Complexite**: M

**Fichiers/Composants**:
- `src/components/stay/VideoTour.tsx`
- `src/components/ui/VideoPlayer.tsx`
- `public/videos/apartment-tour.mp4` (ou URL externe)
- `public/images/apartment/video-poster.jpg`

**Notes techniques**:
```tsx
// Exemple d'implementation
<video
  className="w-full aspect-video rounded-2xl shadow-lg"
  controls
  preload="metadata"
  poster="/images/apartment/video-poster.jpg"
>
  <source src="/videos/apartment-tour.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>
```

---

### E5-S4: Composant Lightbox

**Titre**: Creer le composant lightbox pour la galerie

**Description**:
En tant que developpeur, je veux un composant lightbox reutilisable.

**Criteres d'acceptation**:
- [ ] Overlay sombre avec image centree
- [ ] Boutons prev/next
- [ ] Bouton fermer
- [ ] Navigation clavier (fleches, Escape)
- [ ] Animation d'ouverture/fermeture
- [ ] Gestion du scroll body (bloque quand ouvert)

**Dependances**: E1-S2

**Complexite**: M

**Fichiers/Composants**:
- `src/components/ui/Lightbox.tsx`

---

### E5-S5: Composant AmenitiesList

**Titre**: Creer la liste des equipements avec icones

**Description**:
En tant que developpeur, je veux un composant pour afficher les amenities.

**Criteres d'acceptation**:
- [ ] Props: liste d'amenities (nom, icone)
- [ ] Grille responsive
- [ ] Icones coherentes (Lucide ou Heroicons)
- [ ] Affichage clair et lisible

**Dependances**: E1-S2

**Complexite**: S

**Fichiers/Composants**:
- `src/components/stay/AmenitiesList.tsx`

---

### E5-S6: Composant PricingBox sticky

**Titre**: Creer la box de prix avec CTA reservation

**Description**:
En tant que visiteur, je veux voir le prix et pouvoir reserver facilement.

**Criteres d'acceptation**:
- [ ] Affichage du prix "From X KES/night"
- [ ] Bouton CTA principal "Book Now" (WhatsApp)
- [ ] Numero de telephone affiche
- [ ] Position sticky sur desktop
- [ ] Fixed bottom sur mobile

**Dependances**: E1-S2

**Complexite**: M

**Fichiers/Composants**:
- `src/components/stay/PricingBox.tsx`

---

### E5-S7: Integration Google Maps

**Titre**: Integrer une carte Google Maps pour la localisation

**Description**:
En tant que visiteur, je veux voir ou se situe l'appartement sur une carte.

**Criteres d'acceptation**:
- [ ] Embed Google Maps (zone approximative, pas adresse exacte)
- [ ] Points d'interet proches (plage, commerces, aeroport)
- [ ] Responsive
- [ ] Lazy loading de l'iframe

**Dependances**: E5-S2

**Complexite**: S

**Fichiers/Composants**:
- `src/components/stay/LocationMap.tsx`

---

## EPIC 6: Page Experiences

### E6-S1: Page Experiences principale

**Titre**: Creer la page /experiences avec les packages

**Description**:
En tant que visiteur, je veux voir les packages combines sejour + cuisine.

**Criteres d'acceptation**:
- [ ] Hero "The Complete Diani Experience"
- [ ] Experience 1: Welcome Dinner Package (description, includes, prix)
- [ ] Experience 2: Daily Chef Service (options, custom pricing)
- [ ] Experience 3: Cooking Class (duree, includes)
- [ ] Section Custom Experience
- [ ] CTAs pour chaque experience

**Dependances**: E2-S5

**Complexite**: M

**Fichiers/Composants**:
- `src/app/experiences/page.tsx`

---

### E6-S2: Composant ExperienceCard

**Titre**: Creer le composant carte d'experience

**Description**:
En tant que developpeur, je veux un composant reutilisable pour les packages.

**Criteres d'acceptation**:
- [ ] Props: title, description, includes (liste), price, image, cta
- [ ] Image attractive
- [ ] Liste "Includes" avec checkmarks
- [ ] Prix ou "Custom pricing"
- [ ] Bouton CTA

**Dependances**: E1-S2

**Complexite**: S

**Fichiers/Composants**:
- `src/components/sections/ExperienceCard.tsx`

---

### E6-S3: Section Custom Experience

**Titre**: Creer la section demande personnalisee

**Description**:
En tant que visiteur avec un besoin specifique, je veux pouvoir demander une experience sur mesure.

**Criteres d'acceptation**:
- [ ] Texte engageant
- [ ] Exemples d'occasions (anniversaire, diner romantique, celebration)
- [ ] CTA "Contact Me"

**Dependances**: E6-S1

**Complexite**: S

**Fichiers/Composants**:
- `src/app/experiences/page.tsx`

---

## EPIC 7: Page About

### E7-S1: Page About principale

**Titre**: Creer la page /about avec l'histoire de Chef Angie

**Description**:
En tant que visiteur, je veux connaitre l'histoire de Chef Angie pour creer un lien.

**Criteres d'acceptation**:
- [ ] Photo portrait de Chef Angie
- [ ] Histoire personnelle (parcours, passion, experience 4 ans)
- [ ] Valeurs et philosophie
- [ ] Section "Why I Do This"
- [ ] Mention des deux activites
- [ ] CTA vers cuisine et hebergement

**Dependances**: E2-S5

**Complexite**: M

**Fichiers/Composants**:
- `src/app/about/page.tsx`

---

### E7-S2: Section Timeline ou Milestones

**Titre**: Ajouter une timeline du parcours (optionnel)

**Description**:
En tant que visiteur, je veux voir les etapes cles du parcours de Chef Angie.

**Criteres d'acceptation**:
- [ ] Timeline verticale ou horizontale
- [ ] 3-5 milestones cles
- [ ] Dates et descriptions courtes
- [ ] Design coherent

**Dependances**: E7-S1

**Complexite**: S

**Fichiers/Composants**:
- `src/app/about/page.tsx`

---

## EPIC 8: Systeme Blog

### E8-S1: Page listing blog

**Titre**: Creer la page /blog avec liste des articles

**Description**:
En tant que visiteur, je veux voir tous les articles de blog disponibles.

**Criteres d'acceptation**:
- [ ] Titre "Blog" ou "Stories from Diani"
- [ ] Grille d'articles (image, titre, excerpt, date)
- [ ] Pagination si plus de 6-9 articles
- [ ] Design responsive

**Dependances**: E1-S5

**Complexite**: M

**Fichiers/Composants**:
- `src/app/blog/page.tsx`
- `src/lib/blog.ts`

---

### E8-S2: Composant ArticleCard

**Titre**: Creer la carte d'article pour le listing

**Description**:
En tant que developpeur, je veux un composant pour afficher les apericus d'articles.

**Criteres d'acceptation**:
- [ ] Props: title, excerpt, date, image, slug
- [ ] Image cover optimisee
- [ ] Date formatee
- [ ] Lien vers article complet
- [ ] Hover effect

**Dependances**: E1-S2

**Complexite**: S

**Fichiers/Composants**:
- `src/components/blog/ArticleCard.tsx`

---

### E8-S3: Page article individuel

**Titre**: Creer la page /blog/[slug] pour les articles

**Description**:
En tant que lecteur, je veux lire un article complet avec mise en forme.

**Criteres d'acceptation**:
- [ ] Routing dynamique [slug]
- [ ] Affichage titre, date, auteur
- [ ] Image hero
- [ ] Contenu MDX rendu
- [ ] Styles typographiques pour prose (titres, paragraphes, listes, images)
- [ ] CTA en fin d'article
- [ ] Related posts (optionnel)

**Dependances**: E1-S5

**Complexite**: M

**Fichiers/Composants**:
- `src/app/blog/[slug]/page.tsx`
- `src/components/blog/ArticleContent.tsx`

---

### E8-S4: Fonction de lecture des articles MDX

**Titre**: Creer les fonctions utilitaires pour le blog

**Description**:
En tant que developpeur, je veux des fonctions pour lire et parser les fichiers MDX.

**Criteres d'acceptation**:
- [ ] getAllPosts() - retourne tous les articles tries par date
- [ ] getPostBySlug(slug) - retourne un article specifique
- [ ] Parsing du frontmatter (title, date, description, image, tags)
- [ ] Generation des slugs

**Dependances**: E1-S5

**Complexite**: M

**Fichiers/Composants**:
- `src/lib/blog.ts`

---

### E8-S5: Premier article de blog

**Titre**: Creer un article initial pour le lancement

**Description**:
En tant que visiteur, je veux voir du contenu des le lancement.

**Criteres d'acceptation**:
- [ ] Article "Complete Guide to Visiting Diani Beach" ou similaire
- [ ] Contenu SEO-friendly (1000+ mots)
- [ ] Images pertinentes
- [ ] Liens internes vers pages cuisine et stay
- [ ] Call to action en fin d'article

**Dependances**: E8-S3

**Complexite**: M

**Fichiers/Composants**:
- `src/content/blog/guide-diani-beach.mdx`

---

## EPIC 9: Page Contact

### E9-S1: Page Contact principale

**Titre**: Creer la page /contact avec formulaire et infos

**Description**:
En tant que visiteur, je veux pouvoir contacter Chef Angie facilement.

**Criteres d'acceptation**:
- [ ] Titre "Get in Touch"
- [ ] Colonne gauche: coordonnees directes (WhatsApp, tel, email, adresse)
- [ ] Colonne droite: formulaire de contact
- [ ] Section carte Google Maps
- [ ] Section FAQ

**Dependances**: E2-S5

**Complexite**: M

**Fichiers/Composants**:
- `src/app/contact/page.tsx`

---

### E9-S2: Formulaire de contact

**Titre**: Creer le formulaire de contact fonctionnel

**Description**:
En tant que visiteur, je veux envoyer un message via le formulaire.

**Criteres d'acceptation**:
- [ ] Champs: Nom*, Email*, Telephone, Service* (select), Dates, Message*
- [ ] Validation cote client (champs requis, format email)
- [ ] Options service: Food Delivery, Private Chef, Event Catering, Apartment Booking, Stay + Chef Package, Other
- [ ] Envoi par email (API route ou service externe)
- [ ] Message de confirmation apres envoi
- [ ] Gestion erreurs

**Dependances**: E9-S1

**Complexite**: M

**Fichiers/Composants**:
- `src/components/sections/ContactForm.tsx`
- `src/app/api/contact/route.ts`

---

### E9-S3: Composant FAQ Accordion

**Titre**: Creer la section FAQ avec accordeon

**Description**:
En tant que visiteur, je veux trouver des reponses aux questions frequentes.

**Criteres d'acceptation**:
- [ ] 5+ questions/reponses
- [ ] Format accordeon (clic pour deplier)
- [ ] Animation d'ouverture/fermeture
- [ ] Une seule question ouverte a la fois (ou plusieurs, a definir)

**Dependances**: E1-S2

**Complexite**: M

**Fichiers/Composants**:
- `src/components/ui/Accordion.tsx`
- `src/app/contact/page.tsx`

---

### E9-S4: Contenu FAQ

**Titre**: Rediger les questions/reponses FAQ

**Description**:
En tant que visiteur, je veux des reponses claires a mes questions.

**Criteres d'acceptation**:
- [ ] "How do I place a food order?"
- [ ] "What's included in the apartment?"
- [ ] "Do you deliver outside Diani?"
- [ ] "Can I book the apartment AND chef service together?"
- [ ] "What's your cancellation policy?"
- [ ] Reponses completes et utiles

**Dependances**: E9-S3

**Complexite**: S

**Fichiers/Composants**:
- `src/lib/constants.ts` ou `src/data/faq.ts`

---

### E9-S5: API Route pour envoi email

**Titre**: Creer l'endpoint API pour le formulaire de contact

**Description**:
En tant que developpeur, je dois implementer l'envoi d'email.

**Criteres d'acceptation**:
- [ ] API Route /api/contact
- [ ] Validation des donnees cote serveur
- [ ] Envoi email via service (Resend, SendGrid, ou autre)
- [ ] Reponse JSON success/error
- [ ] Protection spam basique (honeypot ou rate limiting)

**Dependances**: E9-S2

**Complexite**: M

**Fichiers/Composants**:
- `src/app/api/contact/route.ts`

---

## EPIC 10: SEO & Analytics

### E10-S1: Metadata et Open Graph par page

**Titre**: Implementer les meta tags pour chaque page

**Description**:
En tant que moteur de recherche, je veux des meta tags optimisees pour indexer le site.

**Criteres d'acceptation**:
- [ ] Title et description uniques par page (voir section 9.1 du CDC)
- [ ] Open Graph tags (og:title, og:description, og:image)
- [ ] Twitter Card tags
- [ ] Canonical URLs
- [ ] Utilisation de generateMetadata() Next.js

**Dependances**: E2-S5

**Complexite**: M

**Fichiers/Composants**:
- Toutes les pages dans `src/app/`

---

### E10-S2: Schema Markup JSON-LD

**Titre**: Implementer les donnees structurees

**Description**:
En tant que moteur de recherche, je veux des donnees structurees pour rich snippets.

**Criteres d'acceptation**:
- [ ] LocalBusiness schema sur page accueil
- [ ] LodgingBusiness schema sur page appartement
- [ ] FoodService schema sur pages cuisine
- [ ] Article schema sur pages blog
- [ ] BreadcrumbList schema
- [ ] Validation avec Google Rich Results Test

**Dependances**: E10-S1

**Complexite**: M

**Fichiers/Composants**:
- `src/components/seo/JsonLd.tsx`
- Pages concernees

---

### E10-S3: Sitemap XML automatique

**Titre**: Generer le sitemap.xml automatiquement

**Description**:
En tant que moteur de recherche, je veux un sitemap pour decouvrir toutes les pages.

**Criteres d'acceptation**:
- [ ] Sitemap genere automatiquement avec Next.js
- [ ] Toutes les pages statiques incluses
- [ ] Articles de blog inclus dynamiquement
- [ ] Priorites et lastmod configures
- [ ] Accessible a /sitemap.xml

**Dependances**: E8-S4

**Complexite**: S

**Fichiers/Composants**:
- `src/app/sitemap.ts`

---

### E10-S4: Robots.txt

**Titre**: Creer le fichier robots.txt

**Description**:
En tant que moteur de recherche, je veux savoir quelles pages indexer.

**Criteres d'acceptation**:
- [ ] Allow toutes les pages publiques
- [ ] Reference au sitemap
- [ ] Disallow pages admin/api si applicable

**Dependances**: Aucune

**Complexite**: S

**Fichiers/Composants**:
- `public/robots.txt` ou `src/app/robots.ts`

---

### E10-S5: Integration Google Analytics 4

**Titre**: Configurer Google Analytics 4

**Description**:
En tant que proprietaire, je veux suivre le trafic et les conversions.

**Criteres d'acceptation**:
- [ ] Script GA4 integre dans layout
- [ ] Tracking pageviews automatique
- [ ] Events personnalises pour CTAs (click WhatsApp, click Call, form submit)
- [ ] Configuration via variable d'environnement
- [ ] Respect GDPR (consentement si necessaire)

**Dependances**: E2-S5

**Complexite**: M

**Fichiers/Composants**:
- `src/app/layout.tsx`
- `src/components/analytics/GoogleAnalytics.tsx`

---

### E10-S6: Optimisation Performance

**Titre**: Optimiser les performances (Core Web Vitals)

**Description**:
En tant que visiteur, je veux un site rapide.

**Criteres d'acceptation**:
- [ ] Score Lighthouse > 90 (Performance, Accessibility, Best Practices, SEO)
- [ ] Images optimisees avec next/image
- [ ] Lazy loading des images below the fold
- [ ] Fonts optimisees (preload, subset)
- [ ] Code splitting automatique Next.js
- [ ] Compression des assets

**Dependances**: Toutes les pages

**Complexite**: M

**Fichiers/Composants**:
- Configuration globale
- `next.config.js`

---

## EPIC 11: Integration Contact

### E11-S1: Fonction generation URL WhatsApp

**Titre**: Creer la fonction utilitaire pour les liens WhatsApp

**Description**:
En tant que developpeur, je veux generer facilement des liens WhatsApp avec messages pre-remplis.

**Criteres d'acceptation**:
- [ ] Fonction generateWhatsAppUrl(message, phone?)
- [ ] Encodage correct du message
- [ ] Numero par defaut depuis constants
- [ ] Support emojis dans le message

**Dependances**: E1-S4

**Complexite**: S

**Fichiers/Composants**:
- `src/lib/utils.ts`

---

### E11-S2: Fonction generation URL telephone

**Titre**: Creer la fonction utilitaire pour les liens tel:

**Description**:
En tant que developpeur, je veux generer facilement des liens d'appel.

**Criteres d'acceptation**:
- [ ] Fonction generateCallUrl(phone?)
- [ ] Format tel: correct
- [ ] Numero par defaut depuis constants

**Dependances**: E1-S4

**Complexite**: S

**Fichiers/Composants**:
- `src/lib/utils.ts`

---

### E11-S3: Configuration envoi email

**Titre**: Configurer le service d'envoi d'email

**Description**:
En tant que developpeur, je dois choisir et configurer un service email.

**Criteres d'acceptation**:
- [ ] Service choisi (Resend recommande, gratuit 100 emails/jour)
- [ ] API key configuree en variable d'environnement
- [ ] Template email pour les messages de contact
- [ ] Email de destination configure

**Dependances**: E9-S5

**Complexite**: M

**Fichiers/Composants**:
- `.env.local`
- `src/app/api/contact/route.ts`

---

### E11-S4: Tests integration contact

**Titre**: Tester tous les points de contact

**Description**:
En tant que QA, je veux verifier que tous les moyens de contact fonctionnent.

**Criteres d'acceptation**:
- [ ] Boutons WhatsApp ouvrent WhatsApp avec bon message
- [ ] Boutons Call ouvrent le dialer avec bon numero
- [ ] Formulaire envoie bien l'email
- [ ] Messages de confirmation affiches
- [ ] Tests sur mobile et desktop

**Dependances**: E11-S1, E11-S2, E11-S3

**Complexite**: S

**Fichiers/Composants**:
- Tests manuels

---

## Resume du Backlog

### Par Priorite

| Priorite | EPICs | Stories |
|----------|-------|---------|
| Critique | E1, E2, E11 | 15 |
| Haute | E3, E4, E5, E8, E9, E10 | 38 |
| Moyenne | E6, E7 | 5 |

### Estimation totale

| Complexite | Nombre | Points (estimation) |
|------------|--------|---------------------|
| S (Small) | 24 | 24 |
| M (Medium) | 30 | 60 |
| L (Large) | 4 | 20 |
| **Total** | **58** | **~104 points** |

### Ordre de sprint suggere

**Sprint 1 - Foundation**:
- E1 complet (5 stories)
- E2-S1 a E2-S5 (5 stories)
- E11-S1, E11-S2 (2 stories)

**Sprint 2 - Core Pages**:
- E3 complet (7 stories)
- E2-S6 (1 story)

**Sprint 3 - Cuisine**:
- E4 complet (8 stories)

**Sprint 4 - Stay**:
- E5 complet (7 stories)

**Sprint 5 - Secondary Pages**:
- E6 complet (3 stories)
- E7 complet (2 stories)

**Sprint 6 - Blog & Contact**:
- E8 complet (5 stories)
- E9 complet (5 stories)
- E11-S3, E11-S4 (2 stories)

**Sprint 7 - SEO & Polish**:
- E10 complet (6 stories)
- Tests finaux et corrections

---

*Backlog genere selon la methodologie BMAD - Janvier 2026*
