# Actions manuelles restantes — PRD Ameliorations

**Date :** 2026-04-12
**Contexte :** Ce document liste toutes les actions qui ne peuvent pas etre effectuees par le dev agent et necessitent une intervention manuelle (comptes, cles API, configuration externe).

---

## 1. Resend — Notifications email (Story 3.1)

**Statut :** Code deploye, en attente de configuration

**Actions requises :**
1. Creer un compte sur [resend.com](https://resend.com) avec l'email `liyayiangela20@gmail.com`
2. Generer une API key dans le dashboard Resend
3. Ajouter les variables d'env dans Vercel Dashboard :
   - `RESEND_API_KEY` = la cle generee
   - `NOTIFICATION_EMAIL` = `liyayiangela20@gmail.com`
4. Tester en soumettant un avis sur le site live

**Limitation free tier :** Avec le domaine par defaut `onboarding@resend.dev`, Resend ne peut envoyer qu'a l'email du proprietaire du compte. Pour envoyer a d'autres destinataires, il faudra verifier un domaine custom (ex: `chefangela.co.ke`) dans Resend.

**Upgrade eventuel :** Pour un domaine d'envoi custom (`notifications@chefangela.co.ke`), ajouter les records DNS (MX, SPF, DKIM) fournis par Resend dans le DNS de `chefangela.co.ke`.

---

## 2. Airbnb — Lien listing (Story 3.2)

**Statut :** Placeholder "Coming Soon" deploye sur `/hebergement`

**Actions requises :**
1. Recuperer l'URL du listing Airbnb une fois publie
2. Remplacer les 2 placeholders dans `src/app/hebergement/page.tsx` :
   - Ligne hero : `href="#booking-platforms"` → `href="https://www.airbnb.com/rooms/XXXXXX"`
   - Section booking-platforms : `href="#"` + texte "Coming Soon" → `href="https://www.airbnb.com/rooms/XXXXXX"` + texte "Book on Airbnb"
3. Rechercher `TODO` dans le fichier pour localiser les 2 endroits :
   ```bash
   grep -n "TODO.*Airbnb" src/app/hebergement/page.tsx
   ```
4. Commit + push + redeploy

---

## 3. Variables d'environnement Vercel a verifier

**Liste complete des env vars attendues** (voir `.env.example`) :

| Variable | Statut | Action |
|---|---|---|
| `DATABASE_URL` | Probablement deja configure | Verifier dans Vercel |
| `NEXTAUTH_SECRET` | Probablement deja configure | Verifier dans Vercel |
| `NEXTAUTH_URL` | A verifier | Doit etre `https://www.chefangela.co.ke` |
| `ADMIN_EMAIL` | Probablement deja configure | Verifier dans Vercel |
| `ADMIN_PASSWORD` | Probablement deja configure | Verifier dans Vercel |
| `NEXT_PUBLIC_BASE_URL` | A verifier | Doit etre `https://www.chefangela.co.ke` |
| `RESEND_API_KEY` | **A ajouter** | Voir section 1 |
| `NOTIFICATION_EMAIL` | **A ajouter** | `liyayiangela20@gmail.com` |

---

## 4. Vrbo / Booking.com (futur)

**Statut :** Pas encore prevu dans le PRD actuel

Si des comptes sont crees sur d'autres plateformes, ajouter les liens dans la section "Booking Platforms" de `/hebergement` (meme pattern que Airbnb).

---

## 5. Images Open Graph — Validation externe

**Statut :** Endpoint `/api/og` deploye et fonctionnel

**Action recommandee :**
1. Tester chaque URL avec [opengraph.xyz](https://www.opengraph.xyz/) :
   - `https://www.chefangela.co.ke/` (home)
   - `https://www.chefangela.co.ke/cuisine`
   - `https://www.chefangela.co.ke/hebergement`
   - `https://www.chefangela.co.ke/about`
   - `https://www.chefangela.co.ke/contact`
2. Tester avec [Google Rich Results Test](https://search.google.com/test/rich-results) pour valider les JSON-LD
3. Purger les caches sociaux si les anciennes previews (sans image) sont encore cachees :
   - Facebook : [Sharing Debugger](https://developers.facebook.com/tools/debug/)
   - LinkedIn : ajouter `?v=2` a l'URL pour forcer le re-crawl
   - Twitter/X : [Card Validator](https://cards-dev.twitter.com/validator)

---

## 6. Rate Limiting — Upstash Redis (Story 4.2)

**Statut :** Code deploye, en attente de configuration

**Actions requises :**
1. Creer un compte sur [upstash.com](https://upstash.com) (free tier : 10 000 requetes/jour)
2. Creer une base Redis (region : EU West ou proche du serveur Vercel)
3. Copier les credentials REST depuis le dashboard Upstash
4. Ajouter les variables d'env dans Vercel Dashboard :
   - `UPSTASH_REDIS_REST_URL` = l'URL REST fournie par Upstash
   - `UPSTASH_REDIS_REST_TOKEN` = le token REST fourni par Upstash
5. Redeploy sur Vercel pour prendre en compte les nouvelles variables

**Note :** Sans ces variables, le rate limiting fonctionne toujours en mode in-memory (comme avant). La migration est transparente.

---

## 7. Ahrefs — Verification site

**Statut :** Deja configure (fichier de verification + script analytics en place)

**Rien a faire** — juste mentionner que c'est en place pour reference.

---

## 8. Google Search Console

**Action recommandee :**
1. Verifier le site dans [Google Search Console](https://search.google.com/search-console)
2. Soumettre le sitemap : `https://www.chefangela.co.ke/sitemap.xml`
3. Verifier que les pages sont indexees correctement
4. Verifier les donnees structurees (JSON-LD) dans le rapport "Ameliorations"

---

*Document genere le 2026-04-12 — A mettre a jour au fur et a mesure des actions completees.*
