# Content Inventory - Chef Angie Website

> **Document de reference** pour tout le contenu du site
> **Derniere mise a jour** : Janvier 2026
> **Scope** : Dossier Angela_website uniquement

---

## 1. Textes valides

### 1.1 Page About - "Who Am I?"

**Statut** : VALIDE

```
Who Am I?

My name is Angela, a passionate chef rooted in the coastal part of Kenya, in a town called Diani. My culinary journey began in my family's kitchen, where the rich and diverse flavors of Kenyan cuisine captivated my imagination from an early age. I was deeply inspired by my father, who worked as a hotelier, and my stepmother, a talented chef. Their dedication to hospitality and food shaped my love for creating memorable dining experiences.

Each recipe is an opportunity for me to share the story, traditions, and hospitality of my country through dishes that excite the senses and celebrate the diversity of our local ingredients.

As a chef, my goal is to create unique culinary experiences that combine innovation with authenticity. From Kenyan street food to more refined dishes, I am constantly seeking ways to elevate the fresh ingredients I find in local markets. My journey has allowed me to collaborate with local producers while learning traditional techniques passed down through generations.

For me, cooking is not just a passion—it's a way of life that brings people together. I am excited to share this culinary adventure with you, where every dish tells a story, and every bite brings you closer to the soul of Kenya.

Welcome to my kitchen, where every meal is a celebration!
```

**Utilisation** : Page /about (section principale)

---

### 1.2 Textes a collecter

| Contenu | Responsable | Statut |
|---------|-------------|--------|
| Description Chicken Biryani (2-3 phrases) | Chef Angie | [ ] En attente |
| Description Beef Biryani (2-3 phrases) | Chef Angie | [ ] En attente |
| Description Beef Pilau (2-3 phrases) | Chef Angie | [ ] En attente |
| Description complete appartement | Chef Angie | [ ] En attente |
| Liste equipements appartement | Chef Angie | [ ] En attente |
| 3-5 temoignages clients | Chef Angie | [ ] En attente |
| Reponses FAQ detaillees | Chef Angie | [ ] En attente |

---

## 2. Inventaire des images

### 2.1 Images Hebergement

**Emplacement** : `img/hebergement/`
**Quantite** : 18 images

| Fichier | Description | Destination suggeree |
|---------|-------------|---------------------|
| IMG-20260117-WA0002.jpg | [ ] A decrire | Galerie appartement |
| IMG-20260117-WA0003.jpg | [ ] A decrire | Galerie appartement |
| IMG-20260117-WA0004.jpg | [ ] A decrire | Galerie appartement |
| IMG-20260117-WA0005.jpg | [ ] A decrire | Galerie appartement |
| IMG-20260117-WA0006.jpg | [ ] A decrire | Galerie appartement |
| IMG-20260117-WA0007.jpg | [ ] A decrire | Galerie appartement |
| IMG-20260117-WA0008.jpg | [ ] A decrire | Galerie appartement |
| IMG-20260117-WA0009.jpg | [ ] A decrire | Galerie appartement |
| IMG-20260117-WA0010.jpg | [ ] A decrire | Galerie appartement |
| IMG-20260117-WA0011.jpg | [ ] A decrire | Galerie appartement |
| IMG-20260117-WA0012.jpg | [ ] A decrire | Galerie appartement |
| IMG-20260117-WA0013.jpg | [ ] A decrire | Galerie appartement |
| IMG-20260117-WA0014.jpg | [ ] A decrire | Galerie appartement |
| IMG-20260117-WA0015.jpg | [ ] A decrire | Galerie appartement |
| IMG-20260117-WA0016.jpg | [ ] A decrire | Galerie appartement |
| IMG-20260117-WA0017.jpg | [ ] A decrire | Galerie appartement |
| IMG-20260117-WA0018.jpg | [ ] A decrire | Galerie appartement |
| IMG-20260117-WA0019.jpg | [ ] A decrire | Galerie appartement |

**Action requise** : Identifier quelle image montre quoi (chambre, piscine, cuisine, salon, exterieur).

---

### 2.2 Images Cuisine

**Emplacement** : `img/Cuisine/`
**Quantite** : 3 images

| Fichier | Description | Destination suggeree |
|---------|-------------|---------------------|
| Profile_img.jpg | Photo profil Chef Angie | Hero, About, Footer |
| IMG-20260118-WA0002.jpg | [ ] A decrire | Section cuisine |
| IMG-20260118-WA0006.jpg | [ ] A decrire | Section cuisine |

---

### 2.3 Flyers Livraisons (Reference Design)

**Emplacement** : `img/Livraisons/`
**Usage** : Reference pour recreer la page Menu en HTML/CSS

| Fichier | Description | Elements a extraire |
|---------|-------------|---------------------|
| Flyer_biriyani_pics.jpg | Flyer Biryani Friday | Style dark, layout 2 colonnes, palette rouge |
| Flyer_pilau_pics.jpg | Flyer Pilau Tuesday | Style light/cream, layout vertical, palette orange |

**Elements de design valides** :
- Photos des plats (a reutiliser)
- Photo profil Chef Angie
- Palette de couleurs
- Structure des sections "Why Choose" / "Why You'll Love It"
- Icones et badges

---

### 2.4 Images manquantes

| Image necessaire | Priorite | Statut |
|-----------------|----------|--------|
| Hero homepage (Diani Beach) | Haute | [ ] A obtenir |
| Photos evenements/traiteur | Moyenne | [ ] A obtenir |
| Photos chef en action | Moyenne | [ ] A obtenir |

---

## 3. Inventaire des videos

### 3.1 Video Hebergement

**Emplacement** : `img/hebergement/`

| Fichier | Description | Destination |
|---------|-------------|-------------|
| VID-20260117-WA0020.mp4 | Video tour appartement | Page Galerie (/stay/gallery) |

---

## 4. Structure de fichiers recommandee

Avant le developpement, reorganiser les images :

```
public/
├── images/
│   ├── apartment/
│   │   ├── bedroom.jpg
│   │   ├── pool.jpg
│   │   ├── kitchen.jpg
│   │   └── ...
│   ├── dishes/
│   │   ├── chicken-biryani.jpg
│   │   ├── beef-biryani.jpg
│   │   └── beef-pilau.jpg
│   ├── chef/
│   │   └── profile.jpg
│   └── hero/
│       └── homepage.jpg
└── videos/
    └── apartment-tour.mp4
```

**Actions de preparation** :
1. [ ] Renommer les images avec noms descriptifs
2. [ ] Identifier et trier les photos appartement
3. [ ] Ajouter les photos des plats
4. [ ] Optimiser les images (compression)

---

## 5. Informations a confirmer

| Information | Valeur PRD | A confirmer |
|-------------|------------|-------------|
| Email professionnel | chef@angie.co.ke | [ ] |
| Zone exacte appartement | Diani Beach | [ ] Preciser |
| Dates haute/basse saison | Non definies | [ ] |
| Politique annulation | Non definie | [ ] |
| Depot de garantie | Non defini | [ ] |

---

## 6. Checklist contenu minimum (MVP)

### Pret
- [x] Texte About "Who Am I?"
- [x] Photos appartement (18 disponibles)
- [x] Video appartement (1 disponible)
- [x] Photo profil Chef Angie

### A completer
- [ ] Photos des plats (biryani, pilau)
- [ ] Descriptions courtes des plats
- [ ] Description appartement
- [ ] Au moins 3 temoignages clients
- [ ] Image hero homepage

---

*Document a mettre a jour au fur et a mesure de la collecte du contenu*
