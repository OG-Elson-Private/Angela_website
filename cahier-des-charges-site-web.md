# 📋 Cahier des Charges - Site Web Chef Angie (V2)

> **Projet** : Site vitrine multi-services pour Chef Angie  
> **Version** : 2.0 (avec hébergement)  
> **Date** : Janvier 2026  
> **Type** : Site vitrine avec blog - Cuisine + Hébergement

---

## 📑 Table des matières

1. [Présentation du projet](#1-présentation-du-projet)
2. [Objectifs du site](#2-objectifs-du-site)
3. [Cibles et personas](#3-cibles-et-personas)
4. [Architecture du site](#4-architecture-du-site)
5. [Spécifications par page](#5-spécifications-par-page)
6. [Spécifications fonctionnelles](#6-spécifications-fonctionnelles)
7. [Spécifications techniques](#7-spécifications-techniques)
8. [Design et UX](#8-design-et-ux)
9. [Contenu et SEO](#9-contenu-et-seo)
10. [Hébergement et domaine](#10-hébergement-et-domaine)
11. [Planning et livrables](#11-planning-et-livrables)

---

## 1. Présentation du projet

### 1.1 Contexte

Chef Angie est une entrepreneure basée à Diani (Kenya) qui propose deux activités complémentaires :

**🍽️ Activité 1 : Chef cuisinier privé**
- Livraison de plats préparés (biryani vendredi, pilau mardi)
- Services de chef privé pour villas et appartements
- Traiteur pour événements

**🏡 Activité 2 : Hébergement**
- Appartement 1 chambre à Diani
- Piscine
- Coin cuisine équipé
- Actuellement sur Airbnb et Booking (commissions 15-20%)

### 1.2 Besoin identifié

Créer une présence web unique qui :
- Regroupe les deux activités sous une marque personnelle forte
- Génère des réservations directes (éviter les commissions)
- Convertit les visiteurs en clients (commandes/réservations via contact direct)
- Crée des synergies entre les deux activités (cross-selling)
- Améliore la visibilité sur les moteurs de recherche

### 1.3 Proposition de valeur unique

> **"Chef Angie - Votre expérience locale complète à Diani Beach"**
> 
> Séjournez dans un appartement cosy avec piscine ET savourez une cuisine Swahili authentique préparée par une vraie chef locale.

### 1.4 Périmètre du projet

| Inclus | Exclus |
|--------|--------|
| Site vitrine responsive multi-services | Système de réservation en ligne |
| Présentation appartement + galerie | Paiement en ligne |
| Section cuisine complète | Calendrier de disponibilités automatisé |
| Blog intégré | Application mobile |
| Formulaire de contact | Espace client |
| Optimisation SEO | Multi-langue (V1 en anglais) |
| Intégration WhatsApp/Téléphone | |
| Google Analytics | |

### 1.5 Modèle économique du site

```
┌─────────────────────────────────────────────────────────────┐
│                    TRAFIC ENTRANT                           │
│         (Google, Réseaux sociaux, Bouche-à-oreille)         │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                   SITE WEB CHEF ANGIE                       │
│                                                             │
│  ┌─────────────────┐          ┌─────────────────┐          │
│  │   🍽️ CUISINE    │          │  🏡 HÉBERGEMENT  │          │
│  │                 │ ◄──────► │                 │          │
│  │  • Menu/Livraison│ CROSS   │  • Appartement  │          │
│  │  • Chef privé   │ SELLING  │  • Piscine      │          │
│  │  • Traiteur     │          │  • 5K-8K/nuit   │          │
│  └────────┬────────┘          └────────┬────────┘          │
│           │                            │                    │
└───────────┼────────────────────────────┼────────────────────┘
            │                            │
            ▼                            ▼
┌─────────────────────┐      ┌─────────────────────┐
│  📞 CONTACT DIRECT  │      │  📞 CONTACT DIRECT  │
│  WhatsApp/Téléphone │      │  WhatsApp/Téléphone │
│                     │      │                     │
│  → Commande repas   │      │  → Réservation      │
│  → Devis chef privé │      │    directe          │
│  → Devis traiteur   │      │  → 0% commission    │
└─────────────────────┘      └─────────────────────┘
```

---

## 2. Objectifs du site

### 2.1 Objectifs business

| Objectif | Indicateur | Cible 6 mois |
|----------|------------|--------------|
| Réservations hébergement directes | Appels/messages reçus | 5-10 réservations/mois |
| Économies commissions | KES économisés | 30,000+ KES/mois |
| Commandes cuisine | Commandes/semaine | +50% vs actuel |
| Cross-selling | Clients qui utilisent les 2 services | 20% des clients |
| Visibilité Google | Positions mots-clés | Top 5 local |

### 2.2 Objectifs par service

#### Hébergement

| Objectif | Métrique | Cible |
|----------|----------|-------|
| Réduire dépendance Airbnb/Booking | % réservations directes | 30%+ |
| Attirer trafic organique | Visites page appartement | 200+/mois |
| Générer des demandes | Appels/WhatsApp | 15+/mois |

#### Cuisine

| Objectif | Métrique | Cible |
|----------|----------|-------|
| Augmenter commandes | Commandes/semaine | +50% |
| Visibilité locale | Position "food delivery diani" | Top 3 |
| Notoriété | Followers réseaux | +2000 |

### 2.3 Objectifs SEO

**Mots-clés Hébergement (nouveaux)** :
- "apartment diani beach"
- "diani accommodation with pool"
- "holiday apartment diani"
- "where to stay diani beach"
- "diani beach rental"
- "self catering diani"

**Mots-clés Cuisine (existants)** :
- "private chef diani"
- "food delivery diani"
- "biryani delivery mombasa"
- "catering diani beach"

**Mots-clés combinés (opportunité unique)** :
- "diani apartment with private chef"
- "accommodation with chef diani"
- "villa with cook kenya coast"

---

## 3. Cibles et personas

### 3.1 Persona 1 : Le touriste/vacancier

| Attribut | Détail |
|----------|--------|
| **Nom** | James & Family |
| **Âge** | 35-55 ans |
| **Situation** | Touriste européen/américain en vacances |
| **Besoin** | Hébergement authentique + expérience culinaire locale |
| **Budget** | Moyen-élevé |
| **Comportement** | Recherche Google, compare Airbnb, lit les avis |
| **Motivation** | Vivre comme un local, éviter les hôtels impersonnels |
| **Opportunité** | Réserver appartement ET commander des repas |

### 3.2 Persona 2 : L'expatrié/résident

| Attribut | Détail |
|----------|--------|
| **Nom** | Sarah |
| **Âge** | 30-50 ans |
| **Situation** | Expatriée à Nairobi, week-end à la côte |
| **Besoin** | Hébergement pour escapade + bonne nourriture |
| **Budget** | Moyen |
| **Comportement** | Recommandations, réseaux sociaux |
| **Motivation** | Détente, plage, ne pas cuisiner |
| **Opportunité** | Package séjour + chef privé |

### 3.3 Persona 3 : Le résident local

| Attribut | Détail |
|----------|--------|
| **Nom** | Mary |
| **Âge** | 25-45 ans |
| **Situation** | Vit à Ukunda/Diani |
| **Besoin** | Plats traditionnels de qualité |
| **Budget** | 400-600 KES/repas |
| **Comportement** | WhatsApp, bouche-à-oreille |
| **Motivation** | Gagner du temps, manger bien |
| **Opportunité** | Cliente régulière cuisine |

### 3.4 Persona 4 : L'organisateur d'événement

| Attribut | Détail |
|----------|--------|
| **Nom** | Peter |
| **Âge** | 25-50 ans |
| **Situation** | Organise événement à Diani |
| **Besoin** | Traiteur + potentiellement hébergement invités |
| **Budget** | Variable |
| **Motivation** | Qualité, fiabilité |
| **Opportunité** | Traiteur + recommander l'appartement aux invités |

---

## 4. Architecture du site

### 4.1 Arborescence complète

```
🏠 ACCUEIL (/)
│   └── Présentation Chef Angie + aperçu des 2 activités
│
├── 🍽️ CUISINE (/cuisine)
│   │   └── Page hub cuisine
│   │
│   ├── 📋 Menu (/cuisine/menu)
│   │   └── Plats, prix, commande
│   │
│   ├── 👩🏾‍🍳 Chef Privé (/cuisine/private-chef)
│   │   └── Service chef à domicile
│   │
│   └── 🎉 Traiteur (/cuisine/catering)
│       └── Événements
│
├── 🏡 HÉBERGEMENT (/stay)
│   │   └── Page hub hébergement
│   │
│   ├── 🛏️ L'Appartement (/stay/apartment)
│   │   └── Description, équipements, galerie
│   │
│   └── 📸 Galerie (/stay/gallery)
│       └── Photos et vidéos
│
├── ✨ EXPÉRIENCES (/experiences)
│   └── Packages combinés (Stay + Chef)
│
├── 👤 À PROPOS (/about)
│   └── Histoire de Chef Angie
│
├── 📝 BLOG (/blog)
│   ├── Liste articles
│   └── Article individuel (/blog/[slug])
│
└── 📞 CONTACT (/contact)
    └── Formulaire + coordonnées
```

### 4.2 Navigation principale

**Desktop** :
```
[Logo Chef Angie]   Cuisine ▼    Stay ▼    Experiences    About    Blog    [Contact]
                    │            │
                    │            ├── The Apartment
                    │            └── Gallery
                    │
                    ├── Menu & Order
                    ├── Private Chef
                    └── Catering
```

**Mobile** :
```
[Logo]                                    [☰ Menu]
                                              │
                                              ├── Home
                                              ├── Cuisine
                                              │   ├── Menu & Order
                                              │   ├── Private Chef
                                              │   └── Catering
                                              ├── Stay
                                              │   ├── The Apartment
                                              │   └── Gallery
                                              ├── Experiences
                                              ├── About
                                              ├── Blog
                                              └── Contact
```

---

## 5. Spécifications par page

### 5.1 Page Accueil (/)

**Objectif** : Présenter Chef Angie et ses deux activités, orienter vers le bon service.

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER                                                      │
│ [Logo]  Cuisine ▼  Stay ▼  Experiences  About  Blog  [Contact]
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ HERO SECTION                                                │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                                                         │ │
│ │  Background: Image Diani Beach ou Chef Angie            │ │
│ │                                                         │ │
│ │         "Your Complete Diani Experience"                │ │
│ │                                                         │ │
│ │    Authentic cuisine & cozy accommodation               │ │
│ │         by a passionate local host                      │ │
│ │                                                         │ │
│ │    [Explore Cuisine]    [Book Your Stay]                │ │
│ │                                                         │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ TWO PILLARS SECTION                                         │
│                                                             │
│ ┌──────────────────────┐  ┌──────────────────────┐         │
│ │                      │  │                      │         │
│ │   🍽️ TASTE            │  │   🏡 STAY             │         │
│ │   [Image cuisine]    │  │   [Image appart]     │         │
│ │                      │  │                      │         │
│ │   Authentic Swahili  │  │   Cozy apartment     │         │
│ │   cuisine delivered  │  │   with pool in       │         │
│ │   to your door or    │  │   the heart of       │         │
│ │   prepared in your   │  │   Diani Beach        │         │
│ │   villa              │  │                      │         │
│ │                      │  │   From 5,000 KES     │         │
│ │   From 450 KES       │  │   per night          │         │
│ │                      │  │                      │         │
│ │   [Explore Menu]     │  │   [View Apartment]   │         │
│ │                      │  │                      │         │
│ └──────────────────────┘  └──────────────────────┘         │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ WEEKLY SPECIALS (Mini section)                              │
│                                                             │
│ "This Week's Menu"                                          │
│ ┌────────────┐ ┌────────────┐                              │
│ │ Biryani    │ │ Pilau      │                              │
│ │ Friday     │ │ Tuesday    │                              │
│ │ 550 KES    │ │ 450 KES    │                              │
│ │ [Order]    │ │ [Order]    │                              │
│ └────────────┘ └────────────┘                              │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ COMBINED EXPERIENCE BANNER                                  │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │  ✨ THE COMPLETE EXPERIENCE                             │ │
│ │                                                         │ │
│ │  Book your stay AND enjoy a private chef dinner         │ │
│ │  Wake up, swim, and have fresh breakfast prepared       │ │
│ │                                                         │ │
│ │  [Discover Our Packages]                                │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ABOUT PREVIEW                                               │
│                                                             │
│ ┌────────────┐                                             │
│ │            │  "Hi, I'm Chef Angie!"                      │
│ │   [Photo   │                                             │
│ │    Chef]   │  Your local host in Diani Beach.           │
│ │            │  I offer authentic Swahili cuisine         │
│ │            │  and a cozy home away from home.           │
│ └────────────┘                                             │
│                          [Learn My Story]                   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ TESTIMONIALS                                                │
│                                                             │
│ "The biryani was     "Best stay in      "Chef Angie made   │
│  incredible!"         Diani! Pool was    our anniversary   │
│                       perfect."          unforgettable."   │
│  - John, UK          - Lisa, Germany    - Mike & Sue       │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ CTA SECTION                                                 │
│                                                             │
│        "Ready to experience the best of Diani?"            │
│                                                             │
│        [Order Food]          [Book Stay]                   │
│              or call: +254 719 635 944                     │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ FOOTER                                                      │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 Page Hub Cuisine (/cuisine)

**Objectif** : Présenter tous les services cuisine et orienter.

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER                                                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ HERO                                                        │
│                                                             │
│ "Authentic Swahili Cuisine"                                 │
│ by Chef Angie                                               │
│                                                             │
│ From weekly food delivery to private chef experiences       │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ THREE SERVICES                                              │
│                                                             │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐            │
│ │ 🚚 DELIVERY │ │ 👩🏾‍🍳 PRIVATE │ │ 🎉 CATERING │            │
│ │             │ │    CHEF     │ │             │            │
│ │ [Image]     │ │ [Image]     │ │ [Image]     │            │
│ │             │ │             │ │             │            │
│ │ Biryani     │ │ Chef at     │ │ Events &    │            │
│ │ Fridays &   │ │ your villa  │ │ parties     │            │
│ │ Pilau       │ │             │ │             │            │
│ │ Tuesdays    │ │ Custom menu │ │ Beach       │            │
│ │             │ │ & service   │ │ weddings,   │            │
│ │ From 450KES │ │             │ │ birthdays   │            │
│ │             │ │ Get quote   │ │             │            │
│ │ [See Menu]  │ │ [Learn More]│ │ [Learn More]│            │
│ └─────────────┘ └─────────────┘ └─────────────┘            │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ WHY CHOOSE CHEF ANGIE                                       │
│                                                             │
│ ✓ Authentic recipes    ✓ Fresh ingredients                 │
│ ✓ 4 years experience   ✓ Affordable prices                 │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ CTA: "Hungry? Let's talk!"                                  │
│ [WhatsApp] [Call]                                           │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ FOOTER                                                      │
└─────────────────────────────────────────────────────────────┘
```

### 5.3 Page Menu (/cuisine/menu)

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER                                                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ PAGE TITLE                                                  │
│ "Menu & Prices"                                             │
│ Order before the deadline, enjoy fresh homemade food        │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ BIRYANI FRIDAY                                              │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ [Grande image Biryani]                                  │ │
│ │                                                         │ │
│ │ Order by: Thursday 6pm                                  │ │
│ │ Delivery: Friday                                        │ │
│ │                                                         │ │
│ │ ┌─────────────────┐ ┌─────────────────┐                │ │
│ │ │ Chicken Biryani │ │ Beef Biryani    │                │ │
│ │ │                 │ │                 │                │ │
│ │ │ Tender chicken  │ │ Marinated beef  │                │ │
│ │ │ + basmati rice  │ │ + fragrant rice │                │ │
│ │ │ + spices        │ │ + secret blend  │                │ │
│ │ │                 │ │                 │                │ │
│ │ │ 550 KES         │ │ 500 KES         │                │ │
│ │ │                 │ │                 │                │ │
│ │ │ Includes:       │ │ Includes:       │                │ │
│ │ │ Kachumbari +    │ │ Kachumbari +    │                │ │
│ │ │ Banana          │ │ Banana          │                │ │
│ │ │                 │ │                 │                │ │
│ │ │ [Order Now]     │ │ [Order Now]     │                │ │
│ │ └─────────────────┘ └─────────────────┘                │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ PILAU TUESDAY                                               │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ [Grande image Pilau]                                    │ │
│ │                                                         │ │
│ │ Order by: Monday 6pm                                    │ │
│ │ Delivery: Tuesday                                       │ │
│ │                                                         │ │
│ │ ┌─────────────────────────────────────────┐            │ │
│ │ │ Beef Pilau                              │            │ │
│ │ │                                         │            │ │
│ │ │ Traditional Swahili pilau with tender   │            │ │
│ │ │ beef and aromatic spices                │            │ │
│ │ │                                         │            │ │
│ │ │ 450 KES                                 │            │ │
│ │ │                                         │            │ │
│ │ │ Includes: Kachumbari + Banana           │            │ │
│ │ │                                         │            │ │
│ │ │ [Order Now]                             │            │ │
│ │ └─────────────────────────────────────────┘            │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ HOW TO ORDER                                                │
│                                                             │
│ 1️⃣ Choose your dish(es)                                    │
│ 2️⃣ Send WhatsApp with: Dish, Quantity, Location, Time      │
│ 3️⃣ I confirm your order                                    │
│ 4️⃣ Enjoy fresh homemade food!                              │
│                                                             │
│ Delivery areas: Diani, Ukunda, Galu, Tiwi                   │
│ Delivery fee: 50-150 KES                                    │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [WhatsApp Order Button]                                     │
│ or call +254 719 635 944                                    │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ FOOTER                                                      │
└─────────────────────────────────────────────────────────────┘
```

### 5.4 Page Hub Hébergement (/stay)

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER                                                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ HERO                                                        │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                                                         │ │
│ │  [Background: Belle photo appartement/piscine]          │ │
│ │                                                         │ │
│ │         "Your Home in Diani Beach"                      │ │
│ │                                                         │ │
│ │    Cozy 1-bedroom apartment with pool                   │ │
│ │                                                         │ │
│ │    From 5,000 KES / night                               │ │
│ │                                                         │ │
│ │    [Book Direct & Save]    [View Gallery]               │ │
│ │                                                         │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ KEY FEATURES (icons)                                        │
│                                                             │
│    🏊 Pool    🛏️ 1 Bedroom    🍳 Kitchen    📍 Diani       │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ APARTMENT PREVIEW                                           │
│                                                             │
│ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐               │
│ │ Photo  │ │ Photo  │ │ Photo  │ │ Photo  │               │
│ │   1    │ │   2    │ │   3    │ │   4    │               │
│ └────────┘ └────────┘ └────────┘ └────────┘               │
│                                                             │
│ [View All Photos]                                           │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ WHY BOOK DIRECT?                                            │
│                                                             │
│ ✓ Best price guaranteed (no platform fees)                 │
│ ✓ Direct communication with your host                      │
│ ✓ Flexible arrangements                                    │
│ ✓ Add private chef service easily                          │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ BONUS: CHEF SERVICE                                         │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │  🍽️ Staying with us? Add a private chef experience!     │ │
│ │                                                         │ │
│ │  As your host, I can prepare authentic meals            │ │
│ │  right in your apartment kitchen.                       │ │
│ │                                                         │ │
│ │  [Explore Chef Services]                                │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ PRICING                                                     │
│                                                             │
│ Low season:  5,000 KES / night                             │
│ High season: 8,000 KES / night                             │
│                                                             │
│ Minimum stay: 2 nights (flexible)                          │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ HOW TO BOOK                                                 │
│                                                             │
│ 1️⃣ Call or WhatsApp me with your dates                     │
│ 2️⃣ I confirm availability                                  │
│ 3️⃣ Small deposit to secure your booking                    │
│ 4️⃣ Enjoy your stay!                                        │
│                                                             │
│ [WhatsApp]  [Call Now]                                      │
│ +254 719 635 944                                            │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ FOOTER                                                      │
└─────────────────────────────────────────────────────────────┘
```

### 5.5 Page Appartement (/stay/apartment)

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER                                                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ BREADCRUMB: Stay > The Apartment                            │
│                                                             │
│ TITLE: "The Apartment"                                      │
│        Diani Beach, Kenya                                   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ MAIN GALLERY                                                │
│ ┌─────────────────────────────────┐ ┌──────┐ ┌──────┐      │
│ │                                 │ │      │ │      │      │
│ │       [Main Photo]              │ │ Img2 │ │ Img3 │      │
│ │                                 │ │      │ │      │      │
│ │                                 │ ├──────┤ ├──────┤      │
│ │                                 │ │      │ │      │      │
│ │                                 │ │ Img4 │ │ +5   │      │
│ │                                 │ │      │ │      │      │
│ └─────────────────────────────────┘ └──────┘ └──────┘      │
│                                                             │
│ [View All Photos]                                           │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ QUICK INFO BAR                                              │
│                                                             │
│ 🛏️ 1 Bedroom  │  👥 2 Guests  │  🏊 Pool  │  📍 Diani     │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ DESCRIPTION                                    │ BOOK BOX   │
│                                                │            │
│ Welcome to your home away from home in         │ ┌────────┐ │
│ beautiful Diani Beach!                         │ │        │ │
│                                                │ │ From   │ │
│ This cozy 1-bedroom apartment offers           │ │ 5,000  │ │
│ everything you need for a perfect              │ │ KES    │ │
│ beach getaway...                               │ │ /night │ │
│                                                │ │        │ │
│ [Full description text]                        │ │[Book]  │ │
│                                                │ │        │ │
│                                                │ │ or     │ │
│                                                │ │ Call   │ │
│                                                │ │+254... │ │
│                                                │ └────────┘ │
│                                                │            │
├────────────────────────────────────────────────┴────────────┤
│                                                             │
│ AMENITIES                                                   │
│                                                             │
│ 🏊 Swimming pool          🛏️ Comfortable bed               │
│ 🍳 Fully equipped kitchen 📺 TV/Entertainment              │
│ 🌡️ Air conditioning       🚿 Hot water                     │
│ 🔒 Secure parking         📶 WiFi (if available)           │
│ 🌴 Garden                 🧹 Cleaning service               │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ LOCATION                                                    │
│                                                             │
│ [Google Maps embed - zone approximative]                    │
│                                                             │
│ • 5 min walk to Diani Beach                                │
│ • 10 min to restaurants and shops                          │
│ • 15 min to Ukunda Airport                                 │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ HOUSE RULES                                                 │
│                                                             │
│ • Check-in: 2:00 PM                                        │
│ • Check-out: 11:00 AM                                      │
│ • No smoking inside                                        │
│ • Pets: Ask                                                │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ PRICING DETAILS                                             │
│                                                             │
│ Low season (dates):    5,000 KES / night                   │
│ High season (dates):   8,000 KES / night                   │
│ Cleaning fee:          [if applicable]                     │
│                                                             │
│ Special rates for longer stays - ask!                      │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ COMBINE WITH CHEF SERVICE                                   │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │  🍽️ Make your stay extra special!                       │ │
│ │                                                         │ │
│ │  I can prepare breakfast, lunch or dinner               │ │
│ │  right in your apartment kitchen.                       │ │
│ │                                                         │ │
│ │  Popular: Welcome dinner on arrival day                 │ │
│ │                                                         │ │
│ │  [Add Chef Service]                                     │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ REVIEWS (if available)                                      │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ CONTACT TO BOOK                                             │
│                                                             │
│ Ready to book? Contact me directly:                        │
│                                                             │
│ [WhatsApp]  [Call]  [Email]                                │
│                                                             │
│ I'll respond within a few hours!                           │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ FOOTER                                                      │
└─────────────────────────────────────────────────────────────┘
```

### 5.6 Page Galerie (/stay/gallery)

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER                                                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ TITLE: "Gallery"                                            │
│        Take a virtual tour of the apartment                 │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ PHOTO GRID (Masonry ou Grid)                                │
│                                                             │
│ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐               │
│ │        │ │        │ │        │ │        │               │
│ │ Photo  │ │ Photo  │ │ Photo  │ │ Photo  │               │
│ │   1    │ │   2    │ │   3    │ │   4    │               │
│ └────────┘ └────────┘ └────────┘ └────────┘               │
│ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐               │
│ │        │ │        │ │        │ │        │               │
│ │ Photo  │ │ Photo  │ │ Photo  │ │ Photo  │               │
│ │   5    │ │   6    │ │   7    │ │   8    │               │
│ └────────┘ └────────┘ └────────┘ └────────┘               │
│                                                             │
│ [Load More] (si beaucoup de photos)                        │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ VIDEO SECTION (si vidéos disponibles)                       │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                                                         │ │
│ │              [Video Player / Embed]                     │ │
│ │                                                         │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ CTA                                                         │
│ "Like what you see?"                                        │
│ [Book Now]                                                  │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ FOOTER                                                      │
└─────────────────────────────────────────────────────────────┘
```

### 5.7 Page Expériences (/experiences)

**Objectif** : Présenter les packages combinés hébergement + cuisine.

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER                                                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ HERO                                                        │
│                                                             │
│ "The Complete Diani Experience"                             │
│ Combine your stay with authentic culinary moments           │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ EXPERIENCE 1: WELCOME DINNER                                │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                                                         │ │
│ │ [Image: Dîner servi]                                    │ │
│ │                                                         │ │
│ │ 🍽️ Welcome Dinner Package                               │ │
│ │                                                         │ │
│ │ Arrive to a fully prepared dinner waiting for you.      │ │
│ │ No cooking, no shopping, just relax.                    │ │
│ │                                                         │ │
│ │ Includes:                                               │ │
│ │ • 3-course meal (starter, main, dessert)               │ │
│ │ • Table setting                                         │ │
│ │ • Kitchen cleanup                                       │ │
│ │                                                         │ │
│ │ Add to your stay: From 3,000 KES                        │ │
│ │                                                         │ │
│ │ [Inquire]                                               │ │
│ │                                                         │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ EXPERIENCE 2: DAILY MEALS                                   │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                                                         │ │
│ │ 🍳 Daily Chef Service                                   │ │
│ │                                                         │ │
│ │ Have breakfast and/or dinner prepared daily             │ │
│ │ during your stay. Perfect for families.                 │ │
│ │                                                         │ │
│ │ Options:                                                │ │
│ │ • Breakfast only                                        │ │
│ │ • Dinner only                                           │ │
│ │ • Full board (breakfast + dinner)                       │ │
│ │                                                         │ │
│ │ Custom pricing based on duration                        │ │
│ │                                                         │ │
│ │ [Get Custom Quote]                                      │ │
│ │                                                         │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ EXPERIENCE 3: COOKING CLASS                                 │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                                                         │ │
│ │ 👩🏾‍🍳 Learn to Cook Swahili                               │ │
│ │                                                         │ │
│ │ Learn to prepare authentic Kenyan dishes                │ │
│ │ during a hands-on cooking session.                      │ │
│ │                                                         │ │
│ │ You'll learn:                                           │ │
│ │ • Traditional biryani or pilau                          │ │
│ │ • Swahili spice blends                                  │ │
│ │ • Local cooking techniques                              │ │
│ │                                                         │ │
│ │ Duration: 2-3 hours                                     │ │
│ │ Includes: All ingredients + recipes to take home        │ │
│ │                                                         │ │
│ │ [Book a Class]                                          │ │
│ │                                                         │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ CUSTOM EXPERIENCE                                           │
│                                                             │
│ "Have something specific in mind?"                          │
│                                                             │
│ I'm happy to create a custom experience for you.           │
│ Birthday dinner, romantic evening, family celebration...   │
│                                                             │
│ [Contact Me]                                                │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ FOOTER                                                      │
└─────────────────────────────────────────────────────────────┘
```

### 5.8 Page Contact (/contact)

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER                                                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ TITLE: "Get in Touch"                                       │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ TWO COLUMNS                                                 │
│                                                             │
│ DIRECT CONTACT              │  CONTACT FORM                 │
│                             │                               │
│ The fastest way to reach    │  Name *                       │
│ me is via WhatsApp or       │  [________________]           │
│ phone call.                 │                               │
│                             │  Email *                      │
│ 📱 WhatsApp                 │  [________________]           │
│ +254 719 635 944            │                               │
│ [WhatsApp Button]           │  Phone                        │
│                             │  [________________]           │
│ 📞 Phone                    │                               │
│ +254 719 635 944            │  I'm interested in: *         │
│ [Call Button]               │  [▼ Select service    ]       │
│                             │  • Food Delivery              │
│ 📧 Email                    │  • Private Chef               │
│ chef@angie.co.ke            │  • Event Catering             │
│                             │  • Apartment Booking          │
│ 📍 Location                 │  • Combined Experience        │
│ Diani Beach, Kenya          │  • Other                      │
│                             │                               │
│ Response time:              │  Dates (if applicable)        │
│ Usually within 2-3 hours    │  [________________]           │
│                             │                               │
│                             │  Message *                    │
│                             │  [                   ]        │
│                             │  [                   ]        │
│                             │  [                   ]        │
│                             │                               │
│                             │  [Send Message]               │
│                             │                               │
├─────────────────────────────┴───────────────────────────────┤
│                                                             │
│ MAP                                                         │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                                                         │ │
│ │              [Google Maps - Diani area]                 │ │
│ │                                                         │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ FAQ                                                         │
│                                                             │
│ [+] How do I place a food order?                           │
│ [+] What's included in the apartment?                      │
│ [+] Do you deliver outside Diani?                          │
│ [+] Can I book the apartment AND chef service together?    │
│ [+] What's your cancellation policy?                       │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ FOOTER                                                      │
└─────────────────────────────────────────────────────────────┘
```

---

## 6. Spécifications fonctionnelles

### 6.1 Fonctionnalités essentielles

| Fonctionnalité | Description | Priorité |
|----------------|-------------|----------|
| Navigation responsive | Menu burger mobile, dropdown desktop | Haute |
| Bouton WhatsApp flottant | Visible sur toutes les pages | Haute |
| Bouton Call flottant | Option appel direct | Haute |
| Formulaire contact | Multi-service avec envoi email | Haute |
| Galerie photos | Lightbox, navigation | Haute |
| Blog | Articles MDX, liste, pagination | Haute |
| SEO complet | Meta tags, schema, sitemap | Haute |
| Analytics | Google Analytics 4 | Haute |
| Lazy loading images | Performance | Moyenne |
| FAQ accordéon | Questions dépliables | Moyenne |

### 6.2 Boutons de contact flottants

**Position** : Fixe en bas à droite

**Design** :
```
┌─────────┐
│ 💬      │  ← WhatsApp (principal)
├─────────┤
│ 📞      │  ← Appel téléphonique
└─────────┘
```

**Comportement mobile** :
- Boutons empilés verticalement
- Taille tactile suffisante (44x44px min)
- Animation subtile

**Messages pré-remplis WhatsApp** :

Pour cuisine :
```
Hi Chef Angie! 👋
I'd like to order food.

📍 Location: 
🍽️ Dish: 
📦 Quantity: 
⏰ Delivery time: 

Thank you!
```

Pour hébergement :
```
Hi Chef Angie! 👋
I'm interested in booking your apartment.

📅 Check-in: 
📅 Check-out: 
👥 Guests: 

Thank you!
```

### 6.3 Formulaire de contact

**Champs** :
| Champ | Type | Requis | Options |
|-------|------|--------|---------|
| Nom | text | Oui | - |
| Email | email | Oui | - |
| Téléphone | tel | Non | Format +254 |
| Service | select | Oui | Voir ci-dessous |
| Dates | text | Non | Pour hébergement |
| Message | textarea | Oui | - |

**Options Service** :
- Food Delivery Order
- Private Chef Inquiry
- Event Catering Quote
- Apartment Booking
- Stay + Chef Package
- Other

**Action** : Envoi email à Chef Angie

### 6.4 Galerie photos

**Fonctionnalités** :
- Grille responsive (2 col mobile, 3-4 col desktop)
- Lightbox au clic
- Navigation prev/next dans lightbox
- Lazy loading
- Support images optimisées (WebP)

**Organisation** :
```
/public/images/
├── apartment/
│   ├── bedroom-1.jpg
│   ├── pool-1.jpg
│   ├── kitchen-1.jpg
│   └── ...
├── dishes/
│   ├── chicken-biryani.jpg
│   ├── beef-biryani.jpg
│   ├── beef-pilau.jpg
│   └── ...
├── chef/
│   └── chef-angie-profile.jpg
└── blog/
    └── ...
```

---

## 7. Spécifications techniques

### 7.1 Stack technologique

| Technologie | Usage |
|-------------|-------|
| **Next.js 14+** | Framework (App Router) |
| **React 18** | UI Components |
| **TypeScript** | Typage |
| **Tailwind CSS** | Styling |
| **MDX** | Blog content |
| **Vercel** | Hébergement |

### 7.2 Structure des fichiers

```
chef-angie-website/
├── public/
│   ├── images/
│   │   ├── apartment/
│   │   ├── dishes/
│   │   ├── chef/
│   │   └── blog/
│   ├── videos/ (si applicable)
│   ├── favicon.ico
│   └── robots.txt
│
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                    # Accueil
│   │   │
│   │   ├── cuisine/
│   │   │   ├── page.tsx                # Hub cuisine
│   │   │   ├── menu/
│   │   │   │   └── page.tsx
│   │   │   ├── private-chef/
│   │   │   │   └── page.tsx
│   │   │   └── catering/
│   │   │       └── page.tsx
│   │   │
│   │   ├── stay/
│   │   │   ├── page.tsx                # Hub hébergement
│   │   │   ├── apartment/
│   │   │   │   └── page.tsx
│   │   │   └── gallery/
│   │   │       └── page.tsx
│   │   │
│   │   ├── experiences/
│   │   │   └── page.tsx
│   │   │
│   │   ├── about/
│   │   │   └── page.tsx
│   │   │
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   │
│   │   └── contact/
│   │       └── page.tsx
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   └── FloatingButtons.tsx     # WhatsApp + Call
│   │   │
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Accordion.tsx           # FAQ
│   │   │   └── Lightbox.tsx            # Galerie
│   │   │
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── TwoPillars.tsx          # Cuisine + Stay
│   │   │   ├── WeeklySpecials.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── AboutPreview.tsx
│   │   │   └── CTASection.tsx
│   │   │
│   │   ├── cuisine/
│   │   │   ├── DishCard.tsx
│   │   │   ├── ServiceCard.tsx
│   │   │   └── OrderButton.tsx
│   │   │
│   │   ├── stay/
│   │   │   ├── ApartmentFeatures.tsx
│   │   │   ├── PricingBox.tsx
│   │   │   ├── PhotoGallery.tsx
│   │   │   └── AmenitiesList.tsx
│   │   │
│   │   └── blog/
│   │       ├── ArticleCard.tsx
│   │       ├── ArticleContent.tsx
│   │       └── RelatedPosts.tsx
│   │
│   ├── content/
│   │   └── blog/
│   │       ├── kenyan-biryani-guide.mdx
│   │       └── ...
│   │
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── blog.ts
│   │   └── constants.ts                # Infos contact, prix, etc.
│   │
│   ├── styles/
│   │   └── globals.css
│   │
│   └── types/
│       └── index.ts
│
├── .env.local
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

### 7.3 Configuration Tailwind

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#DC2626', // Rouge épice
          dark: '#B91C1C',
        },
        secondary: {
          DEFAULT: '#F59E0B', // Or
          dark: '#D97706',
        },
        accent: {
          DEFAULT: '#059669', // Vert frais
        },
        brown: {
          DEFAULT: '#7C3D1F',
          light: '#A0522D',
        },
        cream: '#FFF9F0',
      },
      fontFamily: {
        heading: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

---

## 8. Design et UX

### 8.1 Identité visuelle

#### Palette de couleurs

| Nom | Hex | Usage |
|-----|-----|-------|
| **Primary** (Rouge épice) | `#DC2626` | CTAs cuisine, accents |
| **Secondary** (Or) | `#F59E0B` | Badges, highlights |
| **Accent** (Vert) | `#059669` | Succès, WhatsApp |
| **Brown** | `#7C3D1F` | Texte accent, hébergement |
| **Cream** | `#FFF9F0` | Backgrounds chaleureux |
| **Dark** | `#1F2937` | Texte principal |
| **Light** | `#F9FAFB` | Backgrounds |

#### Typographie

| Usage | Police | Fallback |
|-------|--------|----------|
| **Titres** | Playfair Display | Georgia, serif |
| **Corps** | Inter | system-ui, sans-serif |

### 8.2 Principes UX

1. **Clarté immédiate** : Le visiteur comprend les 2 activités en 5 secondes
2. **Chemin clair vers conversion** : WhatsApp/téléphone toujours accessible
3. **Cross-selling naturel** : Chaque section mentionne l'autre service
4. **Mobile-first** : Majorité du trafic sera mobile
5. **Temps de chargement** : Images optimisées, lazy loading

---

## 9. Contenu et SEO

### 9.1 Métadonnées par page

| Page | Title | Meta Description |
|------|-------|------------------|
| Accueil | Chef Angie \| Private Chef & Holiday Apartment in Diani Beach | Experience Diani Beach with Chef Angie. Authentic Swahili cuisine delivery, private chef services & cozy 1-bedroom apartment with pool. Book direct & save! |
| Cuisine Hub | Authentic Swahili Cuisine \| Chef Angie Diani | Order biryani, pilau & authentic Kenyan food in Diani Beach. Private chef for villas & event catering. Fresh, homemade by Chef Angie. |
| Menu | Menu & Prices \| Biryani Friday & Pilau Tuesday \| Chef Angie | Chicken Biryani 550 KES, Beef Biryani 500 KES (Fridays). Beef Pilau 450 KES (Tuesdays). Order via WhatsApp for delivery in Diani. |
| Stay Hub | Holiday Apartment in Diani Beach \| Pool \| Chef Angie | Book a cozy 1-bedroom apartment with pool in Diani Beach. From 5,000 KES/night. Direct booking = best price. Optional private chef! |
| Apartment | The Apartment \| 1 Bedroom with Pool \| Diani Beach | Self-catering 1-bedroom apartment in Diani Beach with swimming pool. Fully equipped kitchen. From 5,000 KES/night. Book direct with your host. |
| Experiences | Stay & Dine Packages \| Chef Angie Diani | Combine your Diani stay with private chef experiences. Welcome dinner, daily meals, cooking classes. The complete local experience. |
| About | About Chef Angie \| Your Local Host in Diani | Meet Angela, your private chef and host in Diani Beach. 4 years experience in Swahili cuisine. Passionate about sharing coastal Kenya. |
| Contact | Contact Chef Angie \| Book & Order in Diani | Contact Chef Angie for food delivery, apartment booking or private chef services. WhatsApp +254 719 635 944. Quick response! |

### 9.2 Schema Markup

```json
// Accueil - Organization + LocalBusiness
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Chef Angie",
  "description": "Private chef services, food delivery and holiday accommodation in Diani Beach, Kenya",
  "url": "https://chefangie.co.ke",
  "telephone": "+254719635944",
  "email": "hello@chefangie.co.ke",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Diani Beach",
    "addressRegion": "Kwale County",
    "addressCountry": "KE"
  },
  "areaServed": ["Diani Beach", "Ukunda", "Mombasa"],
  "priceRange": "$$",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "FoodService",
          "name": "Food Delivery"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Private Chef"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "LodgingBusiness",
          "name": "Holiday Apartment"
        }
      }
    ]
  }
}

// Page Appartement - LodgingBusiness
{
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "name": "Chef Angie's Apartment",
  "description": "Cozy 1-bedroom apartment with pool in Diani Beach",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Diani Beach",
    "addressCountry": "KE"
  },
  "amenityFeature": [
    {"@type": "LocationFeatureSpecification", "name": "Swimming Pool"},
    {"@type": "LocationFeatureSpecification", "name": "Kitchen"},
    {"@type": "LocationFeatureSpecification", "name": "Air Conditioning"}
  ],
  "priceRange": "5000-8000 KES per night"
}
```

### 9.3 Stratégie blog mise à jour

**Articles prioritaires** :

| # | Titre | Mots-clés | Service lié |
|---|-------|-----------|-------------|
| 1 | "Complete Guide to Visiting Diani Beach" | diani beach guide, things to do diani | Les deux |
| 2 | "The Ultimate Guide to Kenyan Biryani" | kenyan biryani, biryani recipe | Cuisine |
| 3 | "Where to Stay in Diani: Local's Guide" | where to stay diani, diani accommodation | Hébergement |
| 4 | "Why Book Direct vs Airbnb in Diani" | book direct diani, airbnb alternative | Hébergement |
| 5 | "5 Swahili Dishes to Try on Kenya's Coast" | swahili food, coastal kenya cuisine | Cuisine |
| 6 | "Planning a Beach Wedding in Diani" | diani beach wedding, wedding catering | Cuisine |

---

## 10. Hébergement et domaine

### 10.1 Domaine recommandé

**Choix principal** : `chefangie.co.ke`

| Option | Prix/an | Avantage |
|--------|---------|----------|
| chefangie.co.ke | ~1,500 KES | SEO local Kenya |
| chefangie.com | ~1,200 KES | International |
| chefangiediani.com | ~1,200 KES | SEO "diani" |

### 10.2 Hébergement recommandé

**Vercel** (gratuit pour commencer) :
- Optimisé Next.js
- CDN global
- HTTPS automatique
- Déploiement Git automatique

### 10.3 Coût total estimé

| Élément | Coût annuel |
|---------|-------------|
| Domaine .co.ke | ~1,500 KES |
| Hébergement Vercel | Gratuit |
| Email (Zoho gratuit) | Gratuit |
| **Total** | **~1,500 KES/an** |

---

## 11. Planning et livrables

### 11.1 Planning révisé (3 semaines)

#### Semaine 1 : Setup + Pages principales
- Jour 1-2 : Setup projet, structure, layout
- Jour 3 : Page Accueil
- Jour 4 : Pages Cuisine (hub + menu)
- Jour 5 : Pages Cuisine (chef privé + traiteur)

#### Semaine 2 : Hébergement + Fonctionnalités
- Jour 6 : Pages Stay (hub + appartement)
- Jour 7 : Page Galerie (avec lightbox)
- Jour 8 : Page Expériences
- Jour 9 : Page About + Contact
- Jour 10 : Blog (structure + 1 article)

#### Semaine 3 : SEO + Tests + Lancement
- Jour 11 : SEO (meta, schema, sitemap)
- Jour 12 : Tests responsive + cross-browser
- Jour 13 : Optimisation performance
- Jour 14 : Corrections bugs
- Jour 15 : Déploiement + configuration domaine

### 11.2 Livrables

| Livrable | Description |
|----------|-------------|
| Code source | Repository Git complet |
| Site en ligne | URL production |
| Documentation | README, guide contenu |
| Accès | Vercel, Analytics, Search Console |
| Formation | Guide pour ajouter articles blog |

### 11.3 Checklist de validation

- [ ] Toutes les pages fonctionnelles
- [ ] Responsive mobile/tablet/desktop
- [ ] Boutons WhatsApp et Call fonctionnels
- [ ] Formulaire contact envoyant emails
- [ ] Galerie photos avec lightbox
- [ ] Blog avec 1+ article
- [ ] Score Lighthouse > 90
- [ ] Schema markup valide
- [ ] Google Analytics configuré
- [ ] Sitemap soumis à Google

---

## 📎 Annexes

### A. Contenu de la page appartement (à compléter)

```markdown
## Description (à rédiger avec les vraies infos)

Welcome to your home away from home in beautiful Diani Beach!

This cozy 1-bedroom apartment is perfect for couples or solo travelers 
looking for a peaceful retreat. Located in [zone], you're just minutes 
from the pristine white sand beaches and turquoise waters of the Indian Ocean.

**What makes this place special:**
- Private access to a sparkling swimming pool
- Fully equipped kitchen to prepare your own meals
- [Autres caractéristiques à ajouter]

**The space:**
The apartment features a comfortable bedroom with [détails], 
a modern bathroom, and a well-equipped kitchen with everything 
you need to cook meals.

**Your host:**
I'm Angela (Chef Angie), and I live nearby. As a private chef, 
I can also prepare delicious meals for you during your stay - 
just ask!
```

### B. Questions pour compléter le contenu

1. **Appartement** :
   - Adresse exacte ou zone ?
   - Équipements détaillés (AC, TV, WiFi, etc.) ?
   - Taille de la piscine (partagée ou privée) ?
   - Places de parking ?
   - Distance exacte de la plage ?

2. **Règles** :
   - Dépôt de garantie ?
   - Politique annulation ?
   - Animaux acceptés ?

3. **Saisons** :
   - Dates exactes haute/basse saison ?
   - Prix pour séjours longs ?

---

*Cahier des charges V2.0 - Janvier 2026*
*Intégrant Cuisine + Hébergement*
