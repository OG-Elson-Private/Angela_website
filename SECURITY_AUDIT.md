# 🔒 Audit de Sécurité - Système de Journalisation Trading

**Date de début:** 2025-11-22
**Objectif:** Identifier et corriger toutes les vulnérabilités de sécurité de l'application

> 📚 **Pour les concepts théoriques de cybersécurité**, consulter `SECURITY_CONCEPTS.md`

---

## 📚 Sections Auditées

1. [Authentification et Autorisation](#1-authentification-et-autorisation) ✅
2. [Protection CSRF et XSS](#2-protection-csrf-et-xss) ✅
3. [Injection SQL et Validation des Données](#3-injection-sql-et-validation-des-données) ✅
4. [Gestion des Secrets et API Keys](#4-gestion-des-secrets-et-api-keys) ✅
5. [Rate Limiting et Protection DoS](#5-rate-limiting-et-protection-dos) ✅

---

## Résumé des Vulnérabilités

| # | Vulnérabilité | Sévérité | Statut | Date Fix |
|---|---------------|----------|--------|----------|
| 1 | Broken Access Control - TradeController API | 🔴 CRITIQUE | À corriger | - |
| 2 | Mass Assignment user_id - TradeController::store() | 🔴 CRITIQUE | À corriger | - |
| 3 | Validation insuffisante - Champs texte sans max length | 🟠 MOYEN | À corriger | - |
| 4 | Exposition secrets - ExchangeCredential sans $hidden | 🔴 HAUTE | À corriger | - |
| 5.1 | Absence de rate limiting sur routes API | 🔴 CRITIQUE | À corriger | - |
| 5.2 | Pas de cooldown sur scans manuels | 🟠 MOYEN | À corriger | - |
| 5.3 | upload_max_filesize PHP < validation Laravel | 🟡 BAS | À corriger | - |

---

## 1. Authentification et Autorisation

**Date d'audit:** 2025-11-22

### ✅ Points Sécurisés Identifiés

#### Authentification (Login/Register)

**Hachage des mots de passe:**
- ✅ Algorithme bcrypt via Laravel (`User.php:73` - cast `'password' => 'hashed'`)
- ✅ Salage automatique (bcrypt génère un salt unique par mot de passe)
- ✅ Pas de stockage en clair dans la base de données

**Protection contre les attaques par force brute:**
- ✅ Rate limiting sur login : 5 tentatives maximum (`LoginRequest.php:62`)
- ✅ Throttle key basé sur email + IP (`LoginRequest.php:83`)
- ✅ Événement `Lockout` déclenché lors du blocage (ligne 66)
- ✅ Temps de blocage calculé dynamiquement (ligne 68)

**Sécurité des sessions:**
- ✅ Régénération de session après login (`AuthenticatedSessionController.php:34`)
- ✅ Invalidation complète au logout (ligne 45-47)
- ✅ Nouveau CSRF token généré au logout (ligne 47)

**Protection CSRF:**
- ✅ Laravel Sanctum configuré (`sanctum.php:81`)
- ✅ Middleware `validate_csrf_token` actif pour les sessions
- ✅ Cookies chiffrés (`encrypt_cookies` middleware)

**Validation des mots de passe:**
- ✅ Règles Laravel Password::defaults() appliquées
- ✅ Confirmation de mot de passe requise à l'inscription (ligne 36)

#### Autorisation (Exemple correct)

**StrategyApiController** (implémentation sécurisée):
- ✅ `index()` filtre par `user_id` (ligne 70)
- ✅ `show()` utilise `where('user_id', $user->id)->findOrFail($id)` (ligne 227-228)
- ✅ `update()` vérifie la propriété avant modification (ligne 249-250)
- ✅ `destroy()` vérifie la propriété avant suppression (ligne 330-331)

**Contrôle d'accès admin:**
- ✅ Méthode `canAccessPanel()` dans User model (ligne 103-106)
- ✅ Vérification stricte `$this->is_admin === true`
- ✅ Middleware `admin` custom enregistré (`bootstrap/app.php:16`)

---

### 🚨 VULNÉRABILITÉ CRITIQUE #1 : Broken Access Control - TradeController API

**Fichier:** `app/Http/Controllers/Api/TradeController.php`
**Sévérité:** 🔴 CRITIQUE (OWASP A01:2021 - #1 vulnérabilité web)
**Statut:** À corriger

#### 🎓 Explication du Concept

**Différence Authentification vs Autorisation:**

| Concept | Question | Vérification |
|---------|----------|--------------|
| **Authentification** | "Qui es-tu ?" | Login/Password correct → Session créée |
| **Autorisation** | "As-tu le droit ?" | Propriété de la ressource vérifiée |

**Broken Access Control** se produit quand l'application vérifie l'identité (authentification) mais **oublie de vérifier les permissions** (autorisation).

**Exemple concret:**
```
1. User A (ID 1) crée Trade #42
2. User B (ID 2) est authentifié (a une session valide)
3. User B demande GET /api/v1/trades/42
4. ❌ Application retourne le trade car User B est "authentifié"
5. ✅ Devrait retourner 404/403 car User B ne "possède pas" ce trade
```

#### 🔍 Ce qu'on a trouvé

**4 endpoints vulnérables** permettant à n'importe quel utilisateur authentifié d'accéder aux données des autres :

**1. `index()` - Liste TOUS les trades (ligne 48)**
```php
public function index(Request $request): JsonResponse
{
    $query = Trade::query()->orderBy('created_at', 'desc');
    // ❌ Aucun filtre where('user_id', auth()->id())

    $trades = $query->get(); // Retourne TOUS les trades de TOUS les users

    return response()->json(['data' => $trades]);
}
```

**2. `show()` - Affiche N'IMPORTE QUEL trade par ID (ligne 176)**
```php
public function show(Trade $trade): JsonResponse
{
    return response()->json(['data' => $trade]);
    // ❌ Laravel route model binding charge le trade sans vérifier user_id
    // ❌ Aucune vérification de propriété
}
```

**3. `update()` - Modifie N'IMPORTE QUEL trade (ligne 213)**
```php
public function update(Request $request, Trade $trade): JsonResponse
{
    $validated = $request->validate([...]);
    $trade->update($validated); // ❌ Pas de vérification propriétaire
    return response()->json(['data' => $trade->fresh()]);
}
```

**4. `destroy()` - Supprime N'IMPORTE QUEL trade (ligne 278)**
```php
public function destroy(Trade $trade): JsonResponse
{
    $trade->delete(); // ❌ Suppression sans vérification
    return response()->json(['message' => 'Trade deleted successfully']);
}
```

#### 💥 Impact de la Vulnérabilité

**Confidentialité (CIA Triad - Confidentiality):**
- 🔴 User B peut lister **tous** les trades de tous les utilisateurs
- 🔴 Exposition des stratégies de trading (entry_reason, confidence_level)
- 🔴 Exposition des performances financières (PNL, win rate)
- 🔴 Violation RGPD : données personnelles accessibles sans consentement

**Intégrité (CIA Triad - Integrity):**
- 🔴 User B peut **modifier** les trades de User A (fausser historique)
- 🔴 User B peut **supprimer** les trades de User A (destruction données)
- 🔴 Manipulation des statistiques de performance d'autrui

**Disponibilité (CIA Triad - Availability):**
- 🟠 Suppression en masse possible (déni de service par destruction de données)

**Exemple d'attaque réelle:**
```bash
# Attaquant itère sur tous les IDs pour extraire la base complète
for i in {1..1000}; do
    curl -H "Cookie: session=attacker_token" \
         https://app.com/api/v1/trades/$i >> stolen_trades.json
done

# Résultat: Base de données complète exportée en quelques secondes
```

#### ✅ Solution Recommandée

**Principe:** Appliquer le **pattern de StrategyApiController** (qui est sécurisé).

**Modification 1: `index()` - Filtrer par user_id**
```php
// ❌ AVANT (vulnérable)
public function index(Request $request): JsonResponse
{
    $query = Trade::query()->orderBy('created_at', 'desc');
    // ...
}

// ✅ APRÈS (sécurisé)
public function index(Request $request): JsonResponse
{
    $user = Auth::user();

    $query = Trade::where('user_id', $user->id)
        ->orderBy('created_at', 'desc');
    // ...
}
```

**Modification 2: `show()` - Vérifier propriété**
```php
// ❌ AVANT (vulnérable)
public function show(Trade $trade): JsonResponse
{
    return response()->json(['data' => $trade]);
}

// ✅ APRÈS (sécurisé)
public function show(int $id): JsonResponse
{
    $user = Auth::user();

    $trade = Trade::where('user_id', $user->id)
        ->findOrFail($id);

    return response()->json(['data' => $trade]);
}
```

**Modification 3: `update()` - Même pattern**
```php
public function update(Request $request, int $id): JsonResponse
{
    $user = Auth::user();

    $trade = Trade::where('user_id', $user->id)
        ->findOrFail($id);

    $validated = $request->validate([...]);
    $trade->update($validated);

    return response()->json(['data' => $trade->fresh()]);
}
```

**Modification 4: `destroy()` - Même pattern**
```php
public function destroy(int $id): JsonResponse
{
    $user = Auth::user();

    $trade = Trade::where('user_id', $user->id)
        ->findOrFail($id);

    $trade->delete();

    return response()->json(['message' => 'Trade deleted successfully']);
}
```

#### 💡 Pourquoi cette Solution Fonctionne

**1. Filtrage au niveau SQL (couche base de données):**
```php
Trade::where('user_id', $user->id)->findOrFail($id)
```

SQL généré:
```sql
SELECT * FROM trades
WHERE user_id = 1 AND id = 42
LIMIT 1
```

**Sécurité:**
- ✅ La clause `AND` garantit que seuls les trades **possédés** sont retournés
- ✅ Si trade existe mais appartient à un autre user → 0 résultat → `ModelNotFoundException` (404)
- ✅ Impossible de contourner car `user_id` vient de `Auth::user()` (session serveur)

**2. Defense in Depth (défense en profondeur):**

| Couche | Protection |
|--------|------------|
| Frontend | UI masque les IDs d'autres users (UX) |
| API Middleware | `auth` vérifie session valide (authentification) |
| **Controller** | **`where('user_id')` vérifie propriété (autorisation)** ⭐ |
| Database | Contrainte foreign key `user_id` (intégrité) |

**3. Principe du moindre privilège:**
- User A ne peut accéder qu'à **ses** propres ressources
- Même avec session valide, pas d'accès horizontal aux données d'autrui
- Réduction de la surface d'attaque

**Comparaison visuelle:**
```
❌ Approche vulnérable:
Request → Auth Middleware ✅ → findById(42) → Return ANY trade

✅ Approche sécurisée:
Request → Auth Middleware ✅ → where(user_id=1) AND id=42 → 404 if not owner
```

**4. Pas de confiance aveugle dans le routing:**
```php
// ❌ DANGER: Laravel route model binding charge n'importe quel Trade
Route::get('/trades/{trade}', [Controller::class, 'show']);
// Framework charge automatiquement Trade::find($id) SANS vérification

// ✅ SÉCURISÉ: On prend le contrôle de la requête
Route::get('/trades/{id}', [Controller::class, 'show']);
// On force le where('user_id') dans le controller
```

#### 📋 Checklist de Correction

- [ ] Modifier `TradeController::index()` - Ajouter `where('user_id', auth()->id())`
- [ ] Modifier `TradeController::show()` - Remplacer route model binding par vérification manuelle
- [ ] Modifier `TradeController::update()` - Même pattern
- [ ] Modifier `TradeController::destroy()` - Même pattern
- [ ] Tester avec 2 users différents (User A ne doit pas accéder aux trades de User B)
- [ ] Vérifier que 404 est retourné (pas 403) pour éviter enumeration attack
- [ ] Commit avec message explicite sur la correction de sécurité

---

## 2. Protection CSRF et XSS

**Date d'audit:** 2025-11-22

### ✅ Points Sécurisés Identifiés

#### Protection CSRF (Cross-Site Request Forgery)

**Configuration Laravel Sanctum:**
- ✅ Token CSRF dans `<meta>` tag (`app.blade.php:5`)
- ✅ Axios configuré avec header `X-CSRF-TOKEN` global (`bootstrap.js:14`)
- ✅ Middleware `validate_csrf_token` actif (`sanctum.php:81`)
- ✅ Toutes routes API protégées avec middleware `web` (`routes/api.php:16`)
- ✅ Gestion des erreurs 419 (CSRF mismatch) avec reload automatique (`bootstrap.js:36-40`, `app.js:53-59`)

**Mécanisme de protection:**
```javascript
// 1. Meta tag généré par Laravel
<meta name="csrf-token" content="{{ csrf_token() }}">

// 2. Axios envoie token automatiquement dans chaque requête
axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;

// 3. Laravel vérifie token côté serveur
// Si invalide → 419 Page Expired → Reload automatique
```

**Test de fonctionnement:**
- Si cache Laravel vidé → Session détruite → Ancien token invalide
- Frontend détecte 419 → Reload page → Nouveau token récupéré
- Protection contre attaques CSRF cross-origin ✅

#### Protection XSS (Cross-Site Scripting)

**Échappement automatique Vue.js:**
- ✅ Tout contenu utilisateur affiché avec `{{ }}` (auto-escaped par Vue)
- ✅ Champs texte vulnérables correctement protégés:
  - `entry_reason` - Raison d'entrée en trade (`TradeShow.vue:633`)
  - `lessons_learned` - Leçons apprises (`TradeShow.vue:667`)
  - `what_worked` - Ce qui a fonctionné (`TradeShow.vue:657`)
  - `mistakes_made` - Erreurs commises (`TradeShow.vue:662`)
  - `entry_summary` - Résumé Claude AI (`Suggestions.vue:305`)

**Exemple de protection Vue.js:**
```vue
<!-- ✅ SÉCURISÉ: Échappement automatique -->
<p>{{ trade.entry_reason }}</p>
<!-- Si user entre: <script>alert('XSS')</script> -->
<!-- Affiché comme: &lt;script&gt;alert('XSS')&lt;/script&gt; -->
<!-- JavaScript NON exécuté ✅ -->

<!-- ❌ DANGEREUX: Pas d'échappement -->
<p v-html="trade.entry_reason"></p>
<!-- JavaScript SERAIT exécuté ❌ -->
```

**Utilisation de v-html (vérifiée sécurisée):**

1. **MobileNav.vue:125** - Icônes SVG
```vue
<svg v-html="icons[item.icon]" />
```
- `icons` = Objet hardcodé (ligne 68-74) avec paths SVG statiques
- `item.icon` = Valeur de `navItems` array (ligne 29-65), aucune entrée utilisateur
- ✅ **SAFE**: Données purement statiques

2. **TradeList.vue:588** - Labels pagination
```vue
<button v-html="link.label" />
```
- `link.label` = Généré par Laravel Eloquent paginator
- Valeurs possibles: "Previous", "Next", "1", "2", "3", etc.
- ✅ **SAFE**: Framework Laravel, pas de contrôle utilisateur

**Protection Blade (backend):**
- ✅ Aucun usage de `{!! !!}` (unescaped output) trouvé via grep
- ✅ Toutes variables Blade échappées par défaut avec `{{ }}`

---

### ⚠️ AMÉLIORATIONS RECOMMANDÉES (Sévérité: 🟠 MOYENNE - Défense en profondeur)

#### Ajouter Security Headers HTTP

**Principe:**
Les **security headers** sont des directives HTTP envoyées par le serveur qui configurent le comportement de sécurité du navigateur. Elles constituent une **couche supplémentaire de défense** même si les autres protections (échappement, CSRF) sont actives.

**Concept: Defense in Depth (Défense en profondeur)**
```
Couche 1: Échappement Vue.js     ✅ (actif)
Couche 2: Validation backend      ✅ (actif)
Couche 3: Security Headers        ⚠️ (manquant)
Couche 4: CSP                     ⚠️ (manquant)
```

**Headers manquants identifiés:**

| Header | Actuel | Recommandé | Impact si manquant |
|--------|--------|------------|-------------------|
| **Content-Security-Policy** | ❌ Absent | ✅ Ajouter | 🟠 Moyen - XSS défense ultime |
| **X-Frame-Options** | ❌ Absent | ✅ Ajouter | 🟡 Bas - Clickjacking protection |
| **X-Content-Type-Options** | ❌ Absent | ✅ Ajouter | 🟡 Bas - MIME-sniffing prevention |
| **X-XSS-Protection** | ❌ Absent | ✅ Ajouter (legacy) | 🟢 Minime - Navigateurs modernes |

#### 🎓 Explication Détaillée

**1. Content-Security-Policy (CSP)**

**Qu'est-ce que c'est ?**
Un header qui définit une "liste blanche" des sources autorisées pour scripts, styles, images, etc.

**Exemple d'attaque bloquée:**
```html
<!-- Attaquant injecte (hypothétiquement): -->
<script src="https://evil.com/steal-cookies.js"></script>

<!-- Avec CSP: script-src 'self' -->
<!-- → Navigateur REFUSE de charger evil.com (pas dans la whitelist) -->
<!-- → XSS bloqué même si échappement a échoué -->
```

**2. X-Frame-Options**

**Qu'est-ce que c'est ?**
Empêche l'application d'être chargée dans un `<iframe>` malveillant.

**Attaque: Clickjacking**
```html
<!-- evil.com charge votre app dans iframe invisible -->
<iframe src="https://votre-app.com/delete-account" style="opacity: 0">
</iframe>

<!-- Utilisateur clique sur "Gagner 1000€" (visible) -->
<!-- Mais clique RÉELLEMENT sur "Supprimer compte" (iframe invisible) -->

<!-- Avec X-Frame-Options: SAMEORIGIN -->
<!-- → Navigateur refuse de charger l'app dans iframe externe -->
```

**3. X-Content-Type-Options: nosniff**

**Qu'est-ce que c'est ?**
Force le navigateur à respecter le `Content-Type` déclaré (pas de "devinette").

**Attaque: MIME-sniffing**
```
1. Attaquant upload "image.jpg" (en réalité: JavaScript malveillant)
2. Serveur retourne: Content-Type: image/jpeg
3. SANS nosniff: Navigateur "devine" que c'est du JS → EXÉCUTE
4. AVEC nosniff: Navigateur respecte image/jpeg → PAS d'exécution
```

#### ✅ Solution Recommandée

**Étape 1: Créer middleware**

Créer `app/Http/Middleware/AddSecurityHeaders.php`:

```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AddSecurityHeaders
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        return $response->withHeaders([
            // CSP: Autoriser seulement sources de confiance
            'Content-Security-Policy' => implode('; ', [
                "default-src 'self'",
                "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net", // Vite dev + Flatpickr
                "style-src 'self' 'unsafe-inline' https://fonts.bunny.net https://cdn.jsdelivr.net",
                "font-src 'self' https://fonts.bunny.net",
                "img-src 'self' data: https:", // data: pour images base64, https: pour Binance charts
                "connect-src 'self'", // API calls limitées à notre domaine
            ]),

            // Clickjacking protection
            'X-Frame-Options' => 'SAMEORIGIN', // Autoriser iframe seulement même domaine

            // MIME-sniffing protection
            'X-Content-Type-Options' => 'nosniff',

            // XSS protection legacy (navigateurs anciens)
            'X-XSS-Protection' => '1; mode=block',
        ]);
    }
}
```

**Étape 2: Enregistrer middleware**

Dans `bootstrap/app.php`:

```php
->withMiddleware(function (Middleware $middleware): void {
    $middleware->web(append: [
        \App\Http\Middleware\HandleInertiaRequests::class,
        \App\Http\Middleware\AddSecurityHeaders::class, // ← Ajouter ici
    ]);

    // ...
})
```

#### 💡 Pourquoi ça fonctionne

**1. CSP bloque scripts externes**
```
Attaquant tente: <script src="https://malware.com/steal.js">
CSP vérifie: "malware.com" dans script-src whitelist ?
Résultat: NON → Navigateur bloque le chargement
Console: "Refused to load script... CSP directive violated"
```

**2. Protection multi-couches**
```
Scénario: Faille XSS hypothétique (échappement oublié)

Sans CSP:
  User entre: <script>alert(1)</script>
  → Échappement oublié (bug)
  → JavaScript exécuté ❌

Avec CSP (defense in depth):
  User entre: <script>alert(1)</script>
  → Échappement oublié (bug)
  → CSP bloque inline scripts
  → XSS neutralisé ✅
```

**3. Headers HTTP = Configuration navigateur**
```http
HTTP/1.1 200 OK
Content-Security-Policy: script-src 'self'
X-Frame-Options: SAMEORIGIN

← Navigateur lit ces headers
← Configure ses protections automatiquement
← Aucun JavaScript côté client requis
```

#### 📋 Checklist d'Implémentation

- [ ] Créer `app/Http/Middleware/AddSecurityHeaders.php`
- [ ] Enregistrer middleware dans `bootstrap/app.php`
- [ ] Tester que l'app fonctionne (vérifier Vite, Flatpickr, Fonts)
- [ ] Ajuster CSP si certaines ressources sont bloquées
- [ ] Vérifier headers avec DevTools (Network → Response Headers)
- [ ] Tester dans production avant déploiement

**Note:** CSP peut casser l'application si trop strict. Commencer permissif (`unsafe-inline`, `unsafe-eval`) puis durcir progressivement.

---

### ✅ CONCLUSION AUDIT CSRF/XSS

| Aspect | État | Sévérité si manquant | Action |
|--------|------|----------------------|--------|
| **CSRF Token** | ✅ Implémenté | 🔴 CRITIQUE | Aucune |
| **CSRF Middleware** | ✅ Actif | 🔴 CRITIQUE | Aucune |
| **Vue Auto-escaping** | ✅ Utilisé partout | 🔴 CRITIQUE | Aucune |
| **v-html Usage** | ✅ Seulement données statiques | 🟢 Aucun risque | Aucune |
| **Blade Escaping** | ✅ Pas de {!! !!} trouvé | 🔴 CRITIQUE | Aucune |
| **CSP Header** | ⚠️ Manquant | 🟠 MOYEN | Recommandé (non-urgent) |
| **X-Frame-Options** | ⚠️ Manquant | 🟡 BAS | Recommandé |
| **X-Content-Type** | ⚠️ Manquant | 🟡 BAS | Recommandé |

**Verdict:** ✅ **Application correctement protégée contre CSRF et XSS**

**Protections actives:**
- CSRF token + middleware Laravel Sanctum
- Échappement automatique Vue.js pour toutes entrées utilisateur
- v-html limité à données statiques/framework

**Améliorations recommandées (défense en profondeur):**
- Ajouter security headers HTTP (CSP, X-Frame-Options, X-Content-Type-Options)
- Sévérité: 🟠 Moyenne (non-urgent, mais bonne pratique)

---

## 3. Injection SQL et Validation des Données

**Date d'audit:** 2025-11-22

### ✅ Points Sécurisés Identifiés

#### Protection contre Injection SQL

**Laravel Eloquent ORM:**
- ✅ Utilisation exclusive de l'ORM Eloquent (prepared statements automatiques)
- ✅ Aucune requête brute avec concaténation de chaînes trouvée
- ✅ Usages de `DB::raw()` limités aux fonctions d'agrégation hardcodées

**Raw SQL sécurisés identifiés:**

1. **DashboardController.php:256**
```php
->selectRaw('task_type, COUNT(*) as calls, SUM(total_cost) as cost')
```
- ✅ Fonctions agrégation (COUNT, SUM) hardcodées
- ✅ Aucune variable utilisateur

2. **CostTrackingService.php:167-172**
```php
DB::raw('COUNT(*) as total_calls'),
DB::raw('SUM(total_cost) as total_cost_usd'),
DB::raw('AVG(latency_ms) as avg_latency_ms'),
DB::raw('SUM(CASE WHEN cache_status = "laravel_hit" THEN 1 ELSE 0 END) as laravel_hits')
```
- ✅ Valeurs CASE WHEN hardcodées ("laravel_hit", "claude_hit", "miss")
- ✅ Aucune interpolation d'entrée utilisateur

**Mécanisme de protection Laravel:**
```php
// ✅ SÉCURISÉ: Prepared statement automatique
Trade::where('symbol', $symbol)->first();

// SQL généré:
// SELECT * FROM trades WHERE symbol = ? [bindings: ['BTCUSDT']]
// → Impossible d'injecter du SQL

// ❌ VULNÉRABLE (non trouvé dans codebase):
// DB::select("SELECT * FROM trades WHERE symbol = '$symbol'");
// → Injection SQL possible si $symbol = "' OR '1'='1"
```

**Validation des types:**
- ✅ Types numériques validés avec `numeric|min:0`
- ✅ Énumérations validées avec `in:LONG,SHORT`
- ✅ Booléens validés avec `boolean`
- ✅ Dates validées avec `date`

---

### 🚨 VULNÉRABILITÉ CRITIQUE #2 : Mass Assignment - TradeController

**Fichier:** `app/Http/Controllers/Api/TradeController.php:145`
**Sévérité:** 🔴 CRITIQUE (permet création de trades pour autres utilisateurs)
**Statut:** À corriger

#### 🎓 Explication du Concept

**Mass Assignment** se produit quand l'application accepte TOUS les champs envoyés par l'utilisateur sans filtre explicite, permettant de modifier des champs sensibles non prévus.

**Différence avec Broken Access Control:**

| Vulnérabilité | Principe | Exemple |
|---------------|----------|---------|
| **Broken Access Control** | Lire/modifier ressource d'autrui | GET /trades/42 → Accède au trade de User B |
| **Mass Assignment** | Modifier champs non prévus | POST /trades {"user_id": 999} → Crée trade pour User 999 |

Les deux vulnérabilités sont présentes dans TradeController et doivent être corrigées séparément.

**Exemple concret:**
```
1. User A (ID=1) envoie POST /api/v1/trades avec symbol, side, etc.
2. User A ajoute aussi "user_id": 999 dans la requête JSON
3. Application crée Trade::create($validated)
4. ❌ user_id=999 est dans $fillable → Trade créé pour User 999!
5. ✅ Devrait forcer user_id = auth()->id()
```

#### 🔍 Ce qu'on a trouvé

**Code vulnérable (`TradeController.php:104-145`):**

```php
public function store(Request $request): JsonResponse
{
    $validated = $request->validate([
        'symbol' => 'required|string|max:20',
        'side' => 'required|in:LONG,SHORT',
        // ... autres champs
        'entry_reason' => 'required|string',  // ← PAS de user_id dans validation
        // ...
    ]);

    $trade = Trade::create($validated);  // ❌ VULNÉRABLE
    //                                       ↑
    //                  Attaquant peut injecter user_id ici!

    return response()->json([
        'data' => $trade,
        'message' => 'Trade created successfully',
    ], Response::HTTP_CREATED);
}
```

**Trade Model (`Trade.php:71-72`):**
```php
protected $fillable = [
    'user_id',  // ← Dans fillable mais pas validé/forcé!
    'symbol',
    'side',
    // ... (39 champs au total)
];
```

**Chaîne de la vulnérabilité:**
```
1. Validation ne liste PAS user_id → $validated n'a pas user_id
2. MAIS user_id est dans $fillable → Laravel accepte user_id si présent
3. Attaquant envoie user_id dans JSON → Laravel l'utilise
4. Trade créé avec user_id de l'attaquant ❌
```

**Attaque possible:**
```bash
curl -X POST https://app.com/api/v1/trades \
  -H "Cookie: session=attacker_session" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 999,        ← Créer trade pour victim!
    "symbol": "BTCUSDT",
    "side": "LONG",
    "entry_price": 50000,
    "quantity": 0.1,
    "stop_loss": 49000,
    "take_profit_1": 51000,
    "take_profit_final": 52000,
    "entry_reason": "Fake trade injection",
    "timeframe": "1h"
  }'

# Résultat: Trade créé avec user_id=999 au lieu de attacker_id!
```

#### 💥 Impact de la Vulnérabilité

**Manipulation de données (Integrity - CIA Triad):**
- 🔴 Créer des trades dans le compte d'autres utilisateurs
- 🔴 Polluer les statistiques de performance d'autrui
- 🔴 Créer de fausses transactions pour manipuler analyses AI
- 🔴 Fausser les métriques de win rate, PNL, risk/reward

**Déni de service (Availability):**
- 🟠 Créer des milliers de trades pour saturer compte victime
- 🟠 Rendre dashboard victime inutilisable (trop de données)

**Contournement business logic:**
- 🟠 Contourner limites de trading par utilisateur
- 🟠 Créer trades pour utilisateurs premium sans payer

**Scénario réaliste:**
```
1. Attaquant crée 10,000 trades perdants pour User Premium
2. Win rate de User Premium passe de 75% à 5%
3. AI apprend de mauvais patterns
4. Suggestions futures de User Premium deviennent inutiles
5. User Premium perd confiance dans l'app → Churn
```

#### ✅ Solution Recommandée

**Forcer user_id à l'utilisateur authentifié:**

```php
// ❌ AVANT (vulnérable)
public function store(Request $request): JsonResponse
{
    $validated = $request->validate([
        'symbol' => 'required|string|max:20',
        // ...
    ]);

    $trade = Trade::create($validated);  // user_id injectable!

    return response()->json([
        'data' => $trade,
        'message' => 'Trade created successfully',
    ], Response::HTTP_CREATED);
}

// ✅ APRÈS (sécurisé - Option 1: array_merge)
public function store(Request $request): JsonResponse
{
    $validated = $request->validate([
        'symbol' => 'required|string|max:20',
        // ... (validation inchangée)
    ]);

    $trade = Trade::create(array_merge($validated, [
        'user_id' => auth()->id()  // ← Force user authentifié
    ]));

    return response()->json([
        'data' => $trade,
        'message' => 'Trade created successfully',
    ], Response::HTTP_CREATED);
}

// ✅ APRÈS (sécurisé - Option 2: Eloquent relationship)
public function store(Request $request): JsonResponse
{
    $validated = $request->validate([...]);

    $trade = $request->user()->trades()->create($validated);
    //       ↑                  ↑
    //       User authentifié   Relation HasMany auto-définit user_id

    return response()->json([
        'data' => $trade,
        'message' => 'Trade created successfully',
    ], Response::HTTP_CREATED);
}
```

#### 💡 Pourquoi ça fonctionne

**1. array_merge() écrase user_id malveillant:**
```php
// Scénario d'attaque:
$validated = [
    'symbol' => 'BTCUSDT',
    'user_id' => 999  // ← Attaquant tente injection
];

$safe = array_merge($validated, ['user_id' => auth()->id()]);
//                                             ↑
//                                    Retourne 1 (user authentifié)

// Résultat final:
// ['symbol' => 'BTCUSDT', 'user_id' => 1]
//                                      ↑
//                         Valeur attaquant ÉCRASÉE ✅
```

**2. auth()->id() vient de la session serveur (immuable):**
```
User envoie: {"user_id": 999} dans JSON body
Laravel lit: Cookie session → Déchiffre → user_id=1 (serveur)
Code utilise: auth()->id() → 1 (PAS 999)

→ Impossible de forger user_id car session chiffrée côté serveur ✅
```

**3. Relationships Eloquent (alternative recommandée):**
```php
$request->user()->trades()->create($validated);
// ↑                   ↑
// User model         Relation HasMany
// avec id=1          définit automatiquement user_id=1

// Équivalent à:
Trade::create(array_merge($validated, ['user_id' => 1]));
```

**4. Defense in Depth:**
```
Couche 1: Validation (user_id non validé)     ⚠️
Couche 2: $fillable (user_id accepté)         ⚠️
Couche 3: array_merge() force auth()->id()    ✅ Ligne de défense
Couche 4: Database foreign key constraint     ✅ Sécurité ultime
```

---

### ⚠️ VULNÉRABILITÉ MOYENNE : Validation Insuffisante

**Sévérité:** 🟠 MOYENNE (DoS possible via champs texte illimités)
**Statut:** À corriger

#### 🔍 Ce qu'on a trouvé

**Champs texte sans max length (`TradeController.php:115, 137-139, 224, 246-248`):**

```php
// Dans store() ET update()
$request->validate([
    'entry_reason' => 'required|string',       // ❌ Pas de max!
    'what_worked' => 'nullable|string',        // ❌ Pas de max!
    'mistakes_made' => 'nullable|string',      // ❌ Pas de max!
    'lessons_learned' => 'nullable|string',    // ❌ Pas de max!
    'confluence_signals' => 'nullable|string', // ❌ Pas de max!
]);
```

**Comparaison avec champs validés correctement:**
```php
// ✅ CORRECT: Max length défini
'symbol' => 'required|string|max:20',
'timeframe' => 'required|string|max:10',
'exit_reason' => 'nullable|string|max:100',

// ❌ PROBLÈME: Pas de limite
'entry_reason' => 'required|string',  // Peut être 1 GB!
```

#### 💥 Impact

**Déni de service (Availability - CIA Triad):**
```json
POST /api/v1/trades
{
  "symbol": "BTCUSDT",
  "side": "LONG",
  "entry_reason": "A".repeat(100_000_000),  // 100 MB de texte!
  "what_worked": "B".repeat(50_000_000),    // 50 MB
  "lessons_learned": "C".repeat(50_000_000) // 50 MB
  // → Total: 200 MB dans UNE requête!
}
```

**Conséquences:**
- 🟠 **Saturation mémoire PHP** (200 MB × 10 requêtes = 2 GB)
- 🟠 **Saturation stockage DB** (SQLite TEXT illimité)
- 🟠 **Ralentissement queries** (full table scans sur colonnes TEXT énormes)
- 🟠 **Timeout API** (transfert réseau + insertion DB trop lent)

**Attaque réaliste:**
```bash
# Attaquant envoie 100 requêtes avec 100 MB chacune
for i in {1..100}; do
  curl -X POST /api/v1/trades \
    -d '{"entry_reason":"'$(python -c "print('A'*100000000)")'",...}'
done

# Résultat:
# - 10 GB stockés en DB
# - Serveur inaccessible (out of memory)
# - DoS complet ❌
```

#### ✅ Solution Recommandée

**Ajouter max length sur tous champs texte:**

```php
// ❌ AVANT (vulnérable)
$request->validate([
    'entry_reason' => 'required|string',
    'what_worked' => 'nullable|string',
    'mistakes_made' => 'nullable|string',
    'lessons_learned' => 'nullable|string',
    'confluence_signals' => 'nullable|string',
]);

// ✅ APRÈS (sécurisé)
$request->validate([
    'entry_reason' => 'required|string|max:5000',       // ✅ 5000 caractères max
    'what_worked' => 'nullable|string|max:2000',        // ✅ 2000 caractères max
    'mistakes_made' => 'nullable|string|max:2000',      // ✅
    'lessons_learned' => 'nullable|string|max:2000',    // ✅
    'confluence_signals' => 'nullable|string|max:1000', // ✅
]);
```

**Rationale longueurs choisies:**

| Champ | Max Length | Justification |
|-------|------------|---------------|
| `entry_reason` | 5000 chars | ~1000 mots - Analyse détaillée avec indicateurs multiples |
| `what_worked` | 2000 chars | ~400 mots - Notes post-trade approfondies |
| `mistakes_made` | 2000 chars | ~400 mots - Analyse erreurs |
| `lessons_learned` | 2000 chars | ~400 mots - Synthèse apprentissages |
| `confluence_signals` | 1000 chars | ~200 mots - Liste signaux techniques |

**Exemple usage normal:**
```
entry_reason (300 chars):
"RSI 1H oversold (28), RSI 4H confirmation (35), CHOPDaily < 38.2 (consolidation),
BTC structure bullish (HH/HL on 4H), Funding rate slightly negative (-0.02%),
Support level at 49,800 USDT confirmed on 15m/1H timeframes."

→ 300 chars < 5000 limit ✅
```

#### 💡 Pourquoi ça fonctionne

**1. Laravel rejette avant traitement:**
```php
'entry_reason' => 'required|string|max:5000'
//                                  ↑
// Laravel compte strlen($entry_reason)
// Si > 5000 → HTTP 422 Unprocessable Entity
// Pas d'insertion en base ✅
```

**2. Protection multi-couches:**
```
Couche 1: Validation Laravel (max:5000)      ✅ Ligne de défense
Couche 2: PHP memory_limit (512M)            ✅ Fallback
Couche 3: DB column type (TEXT vs LONGTEXT)  ✅ Ultime protection
```

**3. Réponse d'erreur utilisateur:**
```json
{
  "message": "The entry reason must not be greater than 5000 characters.",
  "errors": {
    "entry_reason": [
      "The entry reason must not be greater than 5000 characters."
    ]
  }
}
```

#### 📋 Checklist de Correction

**TradeController.php:**
- [ ] Modifier `store()` ligne 115: Ajouter `|max:5000` à `entry_reason`
- [ ] Modifier `store()` lignes 137-139: Ajouter `|max:2000` à `what_worked`, `mistakes_made`, `lessons_learned`
- [ ] Modifier `store()` ligne 135: Ajouter `|max:1000` à `confluence_signals`
- [ ] Modifier `update()` ligne 224: Ajouter `|max:5000` à `entry_reason`
- [ ] Modifier `update()` lignes 246-248: Ajouter `|max:2000` aux champs notes
- [ ] Modifier `update()` ligne 244: Ajouter `|max:1000` à `confluence_signals`
- [ ] Tester avec texte > 5000 chars → Vérifier 422 error
- [ ] Tester avec texte < 5000 chars → Vérifier success

---

### ✅ CONCLUSION AUDIT SQL/VALIDATION

| Aspect | État | Sévérité si manquant | Action |
|--------|------|----------------------|--------|
| **Eloquent ORM** | ✅ Utilisé partout | 🔴 CRITIQUE | Aucune |
| **Prepared Statements** | ✅ Automatiques | 🔴 CRITIQUE | Aucune |
| **Raw SQL** | ✅ Seulement agrégations hardcodées | 🟢 Aucun risque | Aucune |
| **Type validation** | ✅ Stricte (numeric, in, etc.) | 🔴 CRITIQUE | Aucune |
| **Mass Assignment user_id** | ❌ Vulnérable | 🔴 CRITIQUE | **À corriger** |
| **Validation max length** | ⚠️ Manquante | 🟠 MOYEN | **Recommandé** |

**Verdict:** ⚠️ **Application protégée contre SQL Injection, MAIS 2 vulnérabilités Mass Assignment + Validation**

**Protections actives:**
- Eloquent ORM avec prepared statements automatiques
- Validation de types stricte (numeric, boolean, in, date)
- Aucune requête SQL brute avec concaténation

**Vulnérabilités identifiées:**
1. 🔴 **CRITIQUE**: Mass Assignment `user_id` dans `TradeController::store()`
2. 🟠 **MOYEN**: Champs texte sans limite de longueur (DoS possible)

**Actions requises:**
1. 🔴 **URGENT**: Forcer `user_id = auth()->id()` dans `store()`
2. 🟠 **RECOMMANDÉ**: Ajouter `max:X` sur tous champs texte

---

## 4. Gestion des Secrets et API Keys

**Date d'audit:** 2025-11-22

### ✅ Points Sécurisés Identifiés

#### Configuration des Secrets

**Fichiers .env:**
- ✅ `.env` dans `.gitignore` (ligne 3)
- ✅ `.env.backup` dans `.gitignore` (ligne 4)
- ✅ `.env.production` dans `.gitignore` (ligne 5)
- ✅ `.env.example` avec placeholders (pas de vrais secrets)

**Exemple .env.example:**
```bash
# ✅ Placeholders seulement, pas de vrais secrets
ANTHROPIC_API_KEY=your_claude_api_key_here
BINANCE_API_KEY=your_binance_key_here
```

**Chargement via config():**
- ✅ Claude API key: `config('services.anthropic.api_key')` (`ClaudeService.php:85`)
- ✅ Aucun secret hardcodé dans le code source
- ✅ Validation format API key Claude (`AppServiceProvider.php:115`)

**Protection validation:**
```php
// AppServiceProvider.php:114-116
if (!str_starts_with($apiKey, 'sk-ant-')) {
    Log::error('Invalid ANTHROPIC_API_KEY format. Claude API keys should start with "sk-ant-"');
}
```

**Chiffrement en base de données:**
- ✅ ExchangeCredential utilise Laravel Crypt (lignes 80, 96, 113)
- ✅ API keys Binance/Bybit/OKX chiffrées avec `Crypt::encryptString()`
- ✅ Déchiffrement automatique via accessors
- ✅ Clé de chiffrement dans .env (`APP_KEY`)

**Exemple chiffrement:**
```php
// ExchangeCredential.php:78-80
public function setApiKeyAttribute(string $value): void
{
    $this->attributes['api_key'] = Crypt::encryptString($value);
    // Stocké en DB: "eyJpdiI6Ik..." (chiffré AES-256)
}
```

**Protection contre logging:**
- ✅ Aucun log d'API key trouvé (seulement logs d'erreur "API key not configured")
- ✅ Logs conditionnels sans exposer les valeurs

**Logs sécurisés trouvés:**
```php
// AppServiceProvider.php:110
Log::warning('Claude AI is enabled but ANTHROPIC_API_KEY is not configured.');
// ✅ Message générique, pas de valeur exposée

// ClaudeService.php:101
Log::warning('Claude API key not configured. AI features will be disabled.');
// ✅ Pas de leak de la clé
```

---

### 🚨 VULNÉRABILITÉ HAUTE #4 : Exposition Secrets - ExchangeCredential

**Fichier:** `app/Models/ExchangeCredential.php`
**Sévérité:** 🔴 HAUTE (exposition potentielle des API secrets Binance/Bybit/OKX)
**Statut:** À corriger

#### 🎓 Explication du Concept

**$hidden attribute** en Laravel cache des champs sensibles lors de la sérialisation JSON du model.

**Principe:**
```
1. Model chargé depuis DB → api_secret = "encrypted_database_value"
2. Accessor déchiffre automatiquement → api_secret = "real_binance_secret"
3. Model converti en JSON (API response, Inertia props)
4. ❌ SANS $hidden: {"api_secret": "real_binance_secret"} exposé!
5. ✅ AVEC $hidden: Champ complètement absent du JSON
```

**Pourquoi c'est critique:**
- Chiffrement DB protège seulement le **stockage**
- Accessors déchiffrent automatiquement pour usage dans code
- JSON serialization expose les valeurs déchiffrées si pas de `$hidden`

#### 🔍 Ce qu'on a trouvé

**Code vulnérable (`ExchangeCredential.php:31-124`):**

```php
class ExchangeCredential extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'exchange',
        'api_key',        // ← Pas protégé en JSON!
        'api_secret',     // ← Pas protégé en JSON!
        'api_passphrase', // ← Pas protégé en JSON!
        'is_active',
        'is_testnet',
        'last_sync_at',
        'last_sync_status',
        'last_error',
    ];

    // ❌ MANQUE: protected $hidden = ['api_key', 'api_secret', 'api_passphrase'];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'is_testnet' => 'boolean',
            'last_sync_at' => 'datetime',
        ];
    }

    // Accessors déchiffrent automatiquement
    public function getApiKeyAttribute(string $value): string
    {
        return Crypt::decryptString($value);  // ← Déchiffré à chaque accès!
    }

    public function getApiSecretAttribute(string $value): string
    {
        return Crypt::decryptString($value);  // ← Déchiffré à chaque accès!
    }

    public function getApiPassphraseAttribute(?string $value): ?string
    {
        return $value ? Crypt::decryptString($value) : null;
    }
}
```

**Flux de la vulnérabilité:**
```
1. DB stockage: api_secret = "eyJpdiI6IkJ..." (AES-256 chiffré) ✅
2. Eloquent load: ExchangeCredential::first()
3. Accessor appelé: getApiSecretAttribute() → Déchiffre
4. Attribut devient: api_secret = "real_binance_secret_here"
5. JSON serialization: $model->toJson()
6. ❌ Résultat: {"api_secret": "real_binance_secret_here"} EXPOSÉ!
```

**Scénario d'attaque hypothétique:**
```php
// Si développeur ajoute endpoint retournant le model:
Route::get('/api/v1/exchange-settings', function() {
    $credential = ExchangeCredential::where('user_id', auth()->id())->first();
    return response()->json(['credential' => $credential]);  // ❌ DANGER!
});

// JSON retourné au frontend:
{
  "credential": {
    "id": 1,
    "user_id": 1,
    "exchange": "binance",
    "api_key": "aBcDeF123456789xyz",           ← EXPOSÉ en clair!
    "api_secret": "sEcReT789xyzABCDEF",        ← EXPOSÉ en clair!
    "api_passphrase": "mySecurePassphrase123", ← EXPOSÉ en clair!
    "is_active": true,
    "is_testnet": false
  }
}
```

#### 💥 Impact de la Vulnérabilité

**Confidentialité (CIA Triad):**
- 🔴 **Exposition complète des API keys Binance/Bybit/OKX**
- 🔴 Attaquant peut trader avec le compte exchange de la victime
- 🔴 Retrait de fonds possible (selon permissions API configurées)
- 🔴 Manipulation de positions en cours

**Chaîne d'exploitation:**
```
1. Développeur ajoute endpoint retournant ExchangeCredential (innocent)
2. Secrets automatiquement exposés en JSON (pas de warning Laravel)
3. Frontend reçoit secrets en clair dans Inertia props ou API response
4. Secrets visibles dans DevTools → Network tab
5. XSS exploite la page → document.querySelector() récupère secrets
6. Ou MITM HTTP → Intercepte response → Vole secrets
7. Attaquant utilise API keys sur Binance/Bybit
```

**Impact financier:**
```
API Binance avec permissions:
- Trade: Passer des ordres → Manipuler positions
- Withdraw: Retirer fonds → Vol direct
- Read: Lire positions/wallet → Reconnaissance

→ Perte totale du capital exchange possible
```

**Note sur état actuel:**
Actuellement, `JournalExchangeSettingsController::index()` (ligne 30-32) charge ExchangeCredential mais ne retourne que `->has('binance')` (booléen). Donc secrets PAS exposés pour l'instant.

MAIS le risque existe car:
- Aucune protection au niveau du model
- Future modification peut exposer accidentellement
- Pas de warning si développeur retourne le model

#### ✅ Solution Recommandée

**Ajouter $hidden attribute:**

```php
// ❌ AVANT (vulnérable)
class ExchangeCredential extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'exchange',
        'api_key',
        'api_secret',
        'api_passphrase',
        'is_active',
        'is_testnet',
        // ...
    ];

    // Pas de $hidden → Secrets exposés en JSON!

    protected function casts(): array { /* ... */ }
}

// ✅ APRÈS (sécurisé)
class ExchangeCredential extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'exchange',
        'api_key',
        'api_secret',
        'api_passphrase',
        'is_active',
        'is_testnet',
        // ...
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * Prevents API secrets from being exposed in JSON responses,
     * Inertia props, or any other serialization context.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'api_key',
        'api_secret',
        'api_passphrase',
    ];

    protected function casts(): array { /* ... */ }

    // Accessors restent inchangés (déchiffrement fonctionne toujours en backend)
}
```

#### 💡 Pourquoi ça fonctionne

**1. Laravel sérialisation JSON automatique:**
```php
// AVANT (sans $hidden):
$credential = ExchangeCredential::first();
$json = $credential->toJson();
// {"api_key": "aBcDeF123", "api_secret": "sEcReT789", ...}
// ❌ Secrets exposés!

// APRÈS (avec $hidden):
$credential = ExchangeCredential::first();
$json = $credential->toJson();
// {"id": 1, "user_id": 1, "exchange": "binance", "is_active": true}
// ✅ api_key, api_secret, api_passphrase complètement absents!
```

**2. Protection automatique dans TOUS les contextes:**
```php
// API Response
return response()->json($credential);
// ✅ Secrets cachés

// Collection
return response()->json($credentials->all());
// ✅ Tous les credentials ont secrets cachés

// Inertia props
return Inertia::render('ExchangeSettings', ['credential' => $credential]);
// ✅ Props Vue.js ne contiendront PAS les secrets

// Eloquent relationship
$user->load('exchangeCredentials');
return response()->json($user);
// ✅ Secrets cachés dans la relation nested
```

**3. Accès backend toujours possible:**
```php
// Code backend peut toujours accéder aux secrets:
$apiKey = $credential->api_key;
// ✅ Déchiffré normalement (pour usage API Binance interne)

$apiSecret = $credential->api_secret;
// ✅ Accessible pour signer requêtes Binance

// Mais JSON ne les exposera JAMAIS:
$credential->toArray();
// ['id' => 1, 'exchange' => 'binance']
// api_key absent ✅

$credential->makeVisible(['api_key'])->toArray();
// Nécessite appel explicite makeVisible() pour exposer
// Évite exposition accidentelle ✅
```

**4. Defense in Depth:**
```
Couche 1: .env (secrets pas versionnés)          ✅
Couche 2: Chiffrement DB (AES-256)               ✅
Couche 3: Accessors (déchiffrement contrôlé)     ✅
Couche 4: $hidden (protection JSON)              ✅ Ligne de défense ajoutée
Couche 5: HTTPS (transport sécurisé)             ✅
```

#### 📋 Checklist de Correction

**ExchangeCredential.php:**
- [ ] Ajouter `protected $hidden = ['api_key', 'api_secret', 'api_passphrase'];` après `$fillable`
- [ ] Tester avec `ExchangeCredential::first()->toJson()` → Vérifier secrets absents
- [ ] Tester endpoint existant `/journal/exchange-settings` → Vérifier fonctionnement inchangé
- [ ] Tester si besoin exposer explicitement: `$credential->makeVisible(['api_key'])`
- [ ] Commit avec message clair sur protection secrets

---

### ✅ CONCLUSION AUDIT SECRETS/API KEYS

| Aspect | État | Sévérité si manquant | Action |
|--------|------|----------------------|--------|
| **.env dans .gitignore** | ✅ Configuré | 🔴 CRITIQUE | Aucune |
| **.env.example placeholders** | ✅ Correct | 🟡 BAS | Aucune |
| **API keys via config()** | ✅ Utilisé partout | 🔴 CRITIQUE | Aucune |
| **Chiffrement DB** | ✅ Crypt::encryptString() | 🔴 CRITIQUE | Aucune |
| **Accessors sécurisés** | ✅ Déchiffrement contrôlé | 🔴 CRITIQUE | Aucune |
| **ExchangeCredential $hidden** | ❌ Manquant | 🔴 HAUTE | **À corriger** |
| **Logs API keys** | ✅ Pas de logs trouvés | 🔴 CRITIQUE | Aucune |
| **Validation format** | ✅ Claude key validation | 🟡 BAS | Aucune |

**Verdict:** ✅ **Secrets bien protégés en stockage MAIS risque exposition JSON**

**Protections actives:**
- Secrets dans .env (non versionnés, .gitignore)
- Chiffrement AES-256 en base de données (Laravel Crypt)
- Chargement via config() (pas de hardcoding)
- Validation format API key (Claude)
- Pas de logging de secrets

**Vulnérabilité identifiée:**
1. 🔴 **HAUTE**: ExchangeCredential sans `$hidden` → Risque exposition JSON accidentelle

**Actions requises:**
1. 🔴 **URGENT**: Ajouter `protected $hidden = ['api_key', 'api_secret', 'api_passphrase'];` dans ExchangeCredential

**Bonne pratique supplémentaire (optionnel):**
- Ajouter `$hidden = ['password', 'remember_token']` déjà présent dans User model ✅
- Considérer rotation périodique des API keys (manuel, hors scope audit)

---

## 5. Rate Limiting et Protection DoS

**Date d'audit:** 2025-11-22

### 🎯 Concept : Qu'est-ce que le Rate Limiting ?

Le **rate limiting** (limitation de débit) est un mécanisme qui **limite le nombre de requêtes** qu'un utilisateur ou une IP peut effectuer dans un intervalle de temps donné. C'est une protection essentielle contre :

1. **Attaques DoS (Denial of Service)** : Saturation du serveur avec des milliers de requêtes
2. **Abus d'API** : Épuisement des quotas des services externes (Binance, Claude)
3. **Attaques par force brute** : Tentatives de deviner mots de passe ou API keys
4. **Coûts excessifs** : Utilisation abusive de services payants (Claude API)

**Principe OWASP :** A05:2021 - Security Misconfiguration

**Exemple d'attaque DoS sans rate limiting :**
```bash
# Attaquant envoie 10,000 requêtes en 1 minute
for i in {1..10000}; do
  curl -X POST https://app.com/api/v1/market-scan/trigger &
done

# Résultat:
# - Queue Redis saturée (millions de jobs)
# - Claude API : 10,000 scans × $0.05 = $500 en 1 minute
# - Binance API : quota épuisé → ban IP
# - Serveur : CPU 100%, Redis OOM, base de données verrouillée
```

**Protection avec rate limiting :**
```php
// Laravel throttle:60,1 = 60 requêtes par minute maximum
Route::middleware('throttle:60,1')->group(function () {
    Route::post('/api/v1/market-scan/trigger', ...);
});

// Résultat:
// - Requête 61 → HTTP 429 "Too Many Attempts"
// - Header "Retry-After: 42" (secondes restantes)
// - Protection automatique du serveur ✅
```

---

### ✅ Points Sécurisés Identifiés

#### 1. Login Rate Limiting (Authentification)

**Localisation :** `app/Http/Requests/Auth/LoginRequest.php:62`

**Protection active :**
```php
public function authenticate(): void
{
    $this->ensureIsNotRateLimited(); // ✅ Vérification avant tentative login

    if (! Auth::attempt($this->only('email', 'password'), $this->boolean('remember'))) {
        RateLimiter::hit($this->throttleKey()); // ✅ Incrémenter compteur échecs

        throw ValidationException::withMessages([
            'email' => __('auth.failed'),
        ]);
    }

    RateLimiter::clear($this->throttleKey()); // ✅ Réinitialiser après succès
}

// Limite: 5 tentatives maximum (ligne 62)
public function ensureIsNotRateLimited(): void
{
    if (! RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
        return;
    }
    // Bloquer si > 5 tentatives
}
```

**Protection :**
- ✅ **5 tentatives maximum** avant blocage
- ✅ Clé unique par email + IP (empêche bypass avec IP différente)
- ✅ Temps de blocage calculé dynamiquement
- ✅ Événement `Lockout` déclenché (pour logging/alertes)

---

#### 2. Email Verification Throttle

**Localisation :** `routes/auth.php:35`

**Protection active :**
```php
Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
    ->middleware(['signed', 'throttle:6,1'])  // ✅ 6 requêtes par minute
    ->name('verification.verify');
```

**Protection :**
- ✅ **6 requêtes/minute maximum** sur vérification email
- ✅ URL signée (empêche modification du lien)
- ✅ Empêche spam de requêtes de vérification

---

#### 3. File Upload Validation (DoS partiel)

**Localisation :** `app/Http/Controllers/Api/ChartUploadController.php:27-30`

**Protection active :**
```php
$request->validate([
    'symbol' => 'required|string|max:20',
    'charts' => 'required|array|min:6|max:11',              // ✅ Max 11 images
    'charts.*' => 'required|image|mimes:jpeg,png,jpg|max:5120', // ✅ 5MB par image
]);
```

**Protection :**
- ✅ **Quantité limitée** : Maximum 11 images par requête
- ✅ **Taille limitée** : 5 MB par image (5120 KB)
- ✅ **Types validés** : Seulement jpeg/png/jpg (empêche upload scripts malicieux)

**Limite totale par requête :** 11 × 5 MB = **55 MB maximum**

---

#### 4. Cleanup Automatique des Uploads

**Localisation :** `app/Http/Controllers/Api/ChartUploadController.php:332-378`

**Mécanisme :**
```php
public function cleanup()
{
    foreach ($sessions as $sessionDir) {
        $uploadedAt = Carbon::parse($metadata['uploaded_at']);

        // ✅ Supprimer sessions > 24 heures
        if ($uploadedAt->diffInHours(now()) > 24) {
            Storage::deleteDirectory($sessionDir);
        }
    }
}
```

**Protection :**
- ✅ Évite accumulation infinie de fichiers (DoS stockage)
- ✅ Libération automatique d'espace disque
- ✅ TTL raisonnable (24h)

---

#### 5. PHP Resource Limits

**Configuration actuelle :**
```ini
max_execution_time = 0        # ✅ Illimité (pour jobs longs MarketScanJob)
memory_limit = -1             # ✅ Illimité (pour analyses Claude complexes)
upload_max_filesize = 2M      # ⚠️ Voir vulnérabilité 5.3
post_max_size = 8M            # ✅ OK
```

**Justification limites illimitées :**
- ✅ MarketScanJob peut analyser 14 symboles → 5-10 minutes total
- ✅ Claude API parfois lent (30-60s par analyse)
- ✅ Génération charts Python (20-30s)
- ✅ Queue workers isolés (pas de risque crash serveur web)

---

### 🔴 Vulnérabilité CRITIQUE #5.1 : Absence de Rate Limiting sur Routes API

**Localisation :** `routes/api.php:16-66` + `bootstrap/app.php`

**Problème :** Toutes les routes `/api/v1/*` n'ont **AUCUN middleware throttle**. Un attaquant peut envoyer des milliers de requêtes par minute.

**Code vulnérable :**
```php
// routes/api.php - AUCUNE protection throttle !
Route::prefix('v1')->middleware(['web', 'auth'])->name('api.')->group(function () {
    Route::apiResource('trades', TradeController::class);  // ❌ Illimité
    Route::post('/market-scan/trigger', ...)               // ❌ CRITIQUE
    Route::post('/charts/upload', ...)                     // ❌ Illimité
    Route::get('/market-data/{symbol}', ...)               // ❌ Binance quota
    Route::post('/strategies/parse', ...)                  // ❌ Claude coût
});

// Pas de middleware 'throttle:60,1' ou autre limite !
```

**Impact :**

**1. Déni de Service (DoS) :**
```bash
# Attaquant envoie 1000 requêtes/seconde
while true; do
  curl -H "Cookie: session=..." \
       -X POST https://app.com/api/v1/market-scan/trigger &
done

# Résultat:
# - Queue Redis : 60,000 jobs en attente (1 min)
# - Workers surchargés → latence +10 secondes
# - Base SQLite verrouillée (trop d'écritures simultanées)
# - Serveur : CPU 100%, mémoire épuisée → crash
```

**2. Explosion Coûts Claude API :**
```bash
# Script malicieux (ou utilisateur curieux)
for i in {1..1000}; do
  curl -X POST /api/v1/market-scan/trigger
done

# Coût: 1000 scans × $0.05 = $50 en quelques secondes
# Sur 1 heure: 60 × 1000 = 60,000 scans = $3,000
```

**3. Épuisement Quota Binance :**
```bash
# Limite Binance: 2400 requêtes/minute par IP
# Application actuelle: AUCUNE limite

# Attaquant spam /market-data/{symbol}
for symbol in BTC ETH BNB XRP ...; do
  for i in {1..100}; do
    curl /api/v1/market-data/$symbol &
  done
done

# Résultat: Ban IP Binance → Application inutilisable
```

**Sévérité :** 🔴 **CRITIQUE**

**OWASP :** A05:2021 - Security Misconfiguration

**CVSS Score :** 7.5/10 (High)
- Facilité exploitation : Très facile (simple script curl)
- Impact disponibilité : Critique (DoS complet)
- Impact financier : Critique (milliers de dollars possibles)

---

#### Solution #5.1 : Implémenter Rate Limiting Global

**Étape 1 : Configurer rate limiters dans `bootstrap/app.php`**

```php
<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(...)
    ->withMiddleware(function (Middleware $middleware): void {

        // ✅ Configurer rate limiters AVANT les alias
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
            // 60 requêtes/min par utilisateur authentifié
            // Si pas authentifié: 60 requêtes/min par IP
        });

        RateLimiter::for('api_strict', function (Request $request) {
            return Limit::perMinute(10)->by($request->user()->id);
            // 10 requêtes/min pour opérations coûteuses
            // Obligatoirement par user_id (pas IP)
        });

        $middleware->alias([
            'admin' => \App\Http\Middleware\EnsureUserIsAdmin::class,
        ]);

        // ... reste du code
    })
    ->withExceptions(...)->create();
```

**Étape 2 : Appliquer throttle aux routes API dans `routes/api.php`**

```php
<?php

use App\Http\Controllers\Api\TradeController;
use App\Http\Controllers\Api\StrategyApiController;
use App\Http\Controllers\Api\MarketScanController;
use App\Http\Controllers\Api\ChartUploadController;
use App\Http\Controllers\Api\MarketDataController;
use Illuminate\Support\Facades\Route;

/**
 * Routes API Standard (60 requêtes/min)
 */
Route::prefix('v1')
    ->middleware(['web', 'auth', 'throttle:api'])  // ✅ Rate limiting ajouté
    ->name('api.')
    ->group(function () {
        // Trades CRUD (opérations standard)
        Route::apiResource('trades', TradeController::class);

        // Market Data (lecture seule, fréquent)
        Route::get('/market-data/{symbol}', [MarketDataController::class, 'show'])
            ->name('market-data.show');
        Route::get('/market-data/{symbol}/price', [MarketDataController::class, 'price'])
            ->name('market-data.price');

        // Strategies CRUD (lecture/écriture)
        Route::apiResource('strategies', StrategyApiController::class);
        Route::post('/strategies/{id}/activate', [StrategyApiController::class, 'activate'])
            ->name('strategies.activate');

        // Indicators (lecture seule)
        Route::get('/indicators/available', [StrategyApiController::class, 'availableIndicators'])
            ->name('indicators.available');

        // Market Scan - Status (lecture fréquente)
        Route::get('/market-scan/status', [MarketScanController::class, 'getScanStatus'])
            ->name('market-scan.status');
        Route::get('/market-scan/progress/{scanSessionId}', [MarketScanController::class, 'getProgress'])
            ->name('market-scan.progress');

        // Charts - Lecture
        Route::get('/charts/check/{symbol}', [ChartUploadController::class, 'checkExisting'])
            ->name('charts.check');
        Route::get('/charts/session/{symbol}', [ChartUploadController::class, 'getSession'])
            ->name('charts.session');
    });

/**
 * Routes API Coûteuses/Sensibles (10 requêtes/min)
 */
Route::prefix('v1')
    ->middleware(['web', 'auth', 'throttle:api_strict'])  // ✅ Limite stricte
    ->name('api.')
    ->group(function () {
        // Market Scan - Trigger (Claude API coûteux)
        Route::post('/market-scan/trigger', [MarketScanController::class, 'triggerScan'])
            ->name('market-scan.trigger');

        // Market Scan - Cancel (modification état)
        Route::post('/market-scan/cancel/{scanSessionId}', [MarketScanController::class, 'cancelScan'])
            ->name('market-scan.cancel');

        // Strategies - Parse (Claude API coûteux)
        Route::post('/strategies/parse', [StrategyApiController::class, 'parse'])
            ->name('strategies.parse');

        // Charts - Upload (ressources intensives)
        Route::post('/charts/upload', [ChartUploadController::class, 'upload'])
            ->name('charts.upload');
        Route::delete('/charts/clean/{symbol}', [ChartUploadController::class, 'cleanSymbol'])
            ->name('charts.clean');
        Route::delete('/charts/cleanup', [ChartUploadController::class, 'cleanup'])
            ->name('charts.cleanup');
    });
```

**Réponse HTTP 429 automatique :**

Quand limite dépassée, Laravel retourne automatiquement :
```json
HTTP/1.1 429 Too Many Requests
Retry-After: 42
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 0

{
  "message": "Too Many Attempts."
}
```

**Frontend peut gérer :**
```javascript
// Vue.js composable
async function triggerScan() {
  try {
    await axios.post('/api/v1/market-scan/trigger');
  } catch (error) {
    if (error.response?.status === 429) {
      const retryAfter = error.response.headers['retry-after'];
      toast.error(`Trop de requêtes. Réessayez dans ${retryAfter}s`);
    }
  }
}
```

---

### 🟠 Vulnérabilité MOYENNE #5.2 : Pas de Cooldown sur Scans Manuels

**Localisation :** `app/Http/Controllers/Api/MarketScanController.php:37-134`

**Problème :** La méthode `triggerScan()` ne vérifie **pas la fréquence** des scans. Même avec `throttle:api_strict` (10/min), un utilisateur peut lancer 10 scans consécutifs en 1 minute.

**Code actuel (pas de cooldown) :**
```php
public function triggerScan(Request $request)
{
    $user = $request->user();

    // ✅ Vérifications stratégie, watchlist...
    $activeStrategy = Strategy::where('user_id', $user->id)
        ->where('active', true)
        ->first();

    if (!$activeStrategy) { ... }

    // ❌ MANQUE: Vérification du dernier scan
    // ❌ MANQUE: Cooldown entre scans

    // Dispatch job immédiatement
    $scanSessionId = uniqid('scan_', true);
    MarketScanJob::dispatch($user->id, null, $scanSessionId);

    return response()->json(['success' => true, ...]);
}
```

**Impact :**

**1. Explosion Coûts Claude API :**
```javascript
// Utilisateur curieux (pas malicieux) clique 10 fois
for (let i = 0; i < 10; i++) {
  await axios.post('/api/v1/market-scan/trigger');
}

// Coût: 10 scans × $0.05 = $0.50 en 10 secondes
// Avec throttle:api_strict (10/min): $0.50/min × 60 = $30/heure max
```

**2. Saturation Queue Redis :**
```bash
# 10 scans × 6 symboles = 60 jobs AnalyzeSymbolJob
# + 10 MarketScanJob = 70 jobs total en 1 minute

# Si chaque analyse = 30s, temps traitement:
# 70 jobs ÷ 4 workers = 17.5 jobs/worker
# 17.5 × 30s = 525 secondes = 8.75 minutes
```

**3. Expérience Utilisateur Dégradée :**
- Scans simultanés créent confusion (plusieurs progressions en parallèle)
- Aucun feedback sur "scan déjà en cours"
- Pas de guideline sur fréquence raisonnable

**Sévérité :** 🟠 **MOYEN**

**OWASP :** A04:2021 - Insecure Design (absence de logique métier de limitation)

---

#### Solution #5.2 : Implémenter Cooldown de 10 Minutes

**Modification dans `MarketScanController.php:37` :**

```php
public function triggerScan(Request $request)
{
    $user = $request->user();

    // ✅ NOUVEAU: Vérifier cooldown (10 minutes)
    $cooldownKey = "scan_cooldown_{$user->id}";

    if (cache()->has($cooldownKey)) {
        $expiresAt = cache()->get($cooldownKey);
        $remainingSeconds = $expiresAt - time();
        $remainingMinutes = ceil($remainingSeconds / 60);

        Log::info('Scan blocked by cooldown', [
            'user_id' => $user->id,
            'remaining_seconds' => $remainingSeconds,
        ]);

        return response()->json([
            'success' => false,
            'message' => "Veuillez attendre {$remainingMinutes} minute(s) avant de relancer un scan.",
            'data' => [
                'retry_after' => $remainingSeconds,
                'next_scan_at' => now()->addSeconds($remainingSeconds)->toIso8601String(),
            ],
        ], 429);  // HTTP 429 Too Many Requests
    }

    // ✅ Vérifier stratégie active
    $activeStrategy = Strategy::where('user_id', $user->id)
        ->where('active', true)
        ->first();

    if (!$activeStrategy) {
        return response()->json([
            'success' => false,
            'message' => 'Aucune stratégie active trouvée.',
        ], 400);
    }

    // Vérifier scan mode, watchlist, etc. (code existant)
    // ...

    // Dispatch job
    try {
        $scanSessionId = uniqid('scan_', true);

        // Initialize progress cache...
        Cache::put("scan_progress_{$user->id}_{$scanSessionId}", [...], 600);

        MarketScanJob::dispatch($user->id, null, $scanSessionId);

        // ✅ NOUVEAU: Activer cooldown (10 minutes = 600 secondes)
        cache()->put($cooldownKey, time() + 600, 600);

        Log::info('Manual market scan triggered', [
            'user_id' => $user->id,
            'scan_session_id' => $scanSessionId,
            'cooldown_expires_at' => now()->addMinutes(10)->toIso8601String(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Scan lancé avec succès !',
            'data' => [
                'scan_session_id' => $scanSessionId,
                'next_scan_available_at' => now()->addMinutes(10)->toIso8601String(),
            ],
        ]);

    } catch (\Exception $e) {
        // Erreur handler (code existant)
    }
}
```

**Frontend peut afficher countdown :**
```vue
<template>
  <button @click="triggerScan" :disabled="cooldownRemaining > 0">
    <span v-if="cooldownRemaining > 0">
      Prochain scan dans {{ formatTime(cooldownRemaining) }}
    </span>
    <span v-else>Lancer un Scan</span>
  </button>
</template>

<script setup>
const cooldownRemaining = ref(0);

async function triggerScan() {
  try {
    const response = await axios.post('/api/v1/market-scan/trigger');
    // Démarrer countdown 10 minutes
    startCooldown(600);
  } catch (error) {
    if (error.response?.status === 429) {
      const retryAfter = error.response.data.data?.retry_after;
      startCooldown(retryAfter);
    }
  }
}
</script>
```

**Avantages :**
- ✅ **Protection coût** : Maximum $0.05/10min = $0.30/heure (au lieu de $30/heure)
- ✅ **Réduction 98%** des scans inutiles
- ✅ **Meilleure UX** : Feedback clair sur temps d'attente
- ✅ **Réduction charge** : Queue Redis plus gérable

**Cooldown stocké dans Redis :**
```bash
redis-cli GET laravel_cache:scan_cooldown_1
# Retourne: timestamp expiration (ex: 1732275600)
```

---

### 🟡 Vulnérabilité BASSE #5.3 : Incohérence upload_max_filesize PHP

**Localisation :** Configuration PHP vs `ChartUploadController.php:30`

**Problème :**
- **Validation Laravel** : `max:5120` (5 MB par image)
- **Configuration PHP** : `upload_max_filesize: 2M`

**Code validation Laravel :**
```php
// ChartUploadController.php:30
$request->validate([
    'charts.*' => 'required|image|mimes:jpeg,png,jpg|max:5120', // 5MB
    //                                                    ^^^^^
    //                                          PHP bloquera à 2MB !
]);
```

**Configuration PHP actuelle (WSL2) :**
```bash
php -r "echo ini_get('upload_max_filesize');"
# Output: 2M   ← ❌ Incohérent avec validation 5MB

php -r "echo ini_get('post_max_size');"
# Output: 8M   ← ✅ OK mais insuffisant pour 11 × 5MB
```

**Impact :**

**Upload 3 MB (entre 2MB et 5MB) :**
```javascript
// Frontend envoie image 3.2 MB
const formData = new FormData();
formData.append('charts[]', file); // 3.2 MB

await axios.post('/api/v1/charts/upload', formData);
```

**Résultat :**
1. ❌ **PHP rejette silencieusement** (avant même Laravel)
2. ❌ `$_FILES['charts']` vide
3. ❌ Validation Laravel : "The charts field is required"
4. ❌ Utilisateur confus : "J'ai uploadé un fichier !"

**Logs montrent :**
```
[2025-11-22 10:30:15] local.ERROR: Validation échouée {"errors":{"charts":["The charts field is required."]}}
```

**Aucune mention de dépassement taille PHP** → Debugging difficile

**Sévérité :** 🟡 **BAS**

**Justification :**
- Impact limité : Uniquement uploads 2-5 MB (minorité)
- Pas de risque sécurité direct
- Contournement : Réduire qualité image à < 2 MB
- Facilement détectable lors de tests

---

#### Solution #5.3 : Augmenter upload_max_filesize et post_max_size PHP

**Option A : Modification permanente (Recommandé)**

**Fichier :** `/etc/php/8.3/cli/php.ini` (WSL2)

```bash
# Trouver le fichier de config PHP CLI
php --ini | grep "Loaded Configuration File"
# Output: /etc/php/8.3/cli/php.ini

# Éditer le fichier
sudo nano /etc/php/8.3/cli/php.ini
```

**Modifications :**
```ini
; ❌ AVANT
upload_max_filesize = 2M
post_max_size = 8M

; ✅ APRÈS
upload_max_filesize = 6M        ; Support 5MB + 1MB marge
post_max_size = 70M             ; 11 images × 6MB = 66MB + marge
max_file_uploads = 20           ; Par défaut 20 (OK pour 11 images)
```

**Redémarrer serveur :**
```bash
# Si PHP-FPM utilisé
sudo systemctl restart php8.3-fpm

# Si artisan serve (CLI), juste relancer
php artisan serve --host=0.0.0.0
```

**Vérification :**
```bash
php -r "echo 'upload_max_filesize: ' . ini_get('upload_max_filesize') . PHP_EOL;"
# Output attendu: upload_max_filesize: 6M ✅

php -r "echo 'post_max_size: ' . ini_get('post_max_size') . PHP_EOL;"
# Output attendu: post_max_size: 70M ✅
```

---

**Option B : Configuration locale (Alternative)**

**Fichier :** `public/.user.ini` (créer si inexistant)

```ini
upload_max_filesize = 6M
post_max_size = 70M
```

**Note :** `.user.ini` fonctionne uniquement avec PHP-FPM, **PAS avec `artisan serve`**.

Pour `artisan serve`, utiliser **Option A** (modification `/etc/php/8.3/cli/php.ini`).

---

**Validation après correction :**

**Test upload 5 MB :**
```bash
# Créer fichier test 5 MB
dd if=/dev/zero of=/tmp/test_5mb.jpg bs=1M count=5

# Upload via curl
curl -X POST http://localhost:8000/api/v1/charts/upload \
  -H "Cookie: laravel_session=..." \
  -F "symbol=BTCUSDT" \
  -F "charts[]=@/tmp/test_5mb.jpg" \
  -F "charts[]=@/tmp/test_5mb.jpg" \
  -F "charts[]=@/tmp/test_5mb.jpg" \
  -F "charts[]=@/tmp/test_5mb.jpg" \
  -F "charts[]=@/tmp/test_5mb.jpg" \
  -F "charts[]=@/tmp/test_5mb.jpg"

# Résultat attendu: {"success": true, "message": "Screenshots uploadés avec succès"}
```

**Calcul taille totale :**
```
6 images × 5 MB = 30 MB total
30 MB < 70 MB (post_max_size) ✅
```

---

### 📋 Checklist de Correction Audit 5

**Vulnérabilité #5.1 - Rate Limiting API :**
- [ ] Ajouter `RateLimiter::for('api', ...)` dans `bootstrap/app.php`
- [ ] Ajouter `RateLimiter::for('api_strict', ...)` dans `bootstrap/app.php`
- [ ] Séparer routes API en 2 groupes (standard vs strict) dans `routes/api.php`
- [ ] Appliquer `throttle:api` aux routes standard (trades, market-data, strategies)
- [ ] Appliquer `throttle:api_strict` aux routes coûteuses (scan, parse, upload)
- [ ] Tester dépassement limite : 11ème requête → HTTP 429
- [ ] Vérifier headers `X-RateLimit-Limit` et `Retry-After`
- [ ] Tester avec utilisateur authentifié (limite par user_id)
- [ ] Tester avec utilisateur non-auth (limite par IP)

**Vulnérabilité #5.2 - Cooldown Scans :**
- [ ] Ajouter vérification `cache()->has("scan_cooldown_{$user->id}")` au début de `triggerScan()`
- [ ] Retourner HTTP 429 avec `retry_after` si cooldown actif
- [ ] Activer cooldown 10 minutes après dispatch job : `cache()->put($cooldownKey, time() + 600, 600)`
- [ ] Ajouter champ `next_scan_available_at` dans réponse success
- [ ] Logger tentatives bloquées (monitoring abus)
- [ ] Tester 2 scans consécutifs : 2ème → HTTP 429
- [ ] Vérifier expiration après 10 minutes : scan autorisé
- [ ] (Optionnel) Mettre à jour frontend pour afficher countdown

**Vulnérabilité #5.3 - PHP Upload Limits :**
- [ ] Identifier fichier `php.ini` actif : `php --ini`
- [ ] Éditer `/etc/php/8.3/cli/php.ini`
- [ ] Modifier `upload_max_filesize = 6M`
- [ ] Modifier `post_max_size = 70M`
- [ ] Redémarrer serveur (`artisan serve` ou `php-fpm`)
- [ ] Vérifier config : `php -r "echo ini_get('upload_max_filesize');"`
- [ ] Tester upload 5 MB : doit réussir
- [ ] Tester upload 11 images × 5 MB = 55 MB : doit réussir
- [ ] Tester upload 7 MB : doit échouer (validation Laravel `max:5120`)

**Tests d'Intégration :**
- [ ] Scan rate limiting : 10 scans en 1 min → 10ème bloqué par `throttle:api_strict`
- [ ] Scan cooldown : 2 scans espacés 5 min → 2ème bloqué par cooldown
- [ ] Upload 11 images 5 MB simultanément : succès
- [ ] Spam trades API : 61ème requête → HTTP 429
- [ ] Vérifier logs : tentatives rate limit enregistrées

---

### ✅ CONCLUSION AUDIT RATE LIMITING / DoS

| Aspect | État | Sévérité si manquant | Action |
|--------|------|----------------------|--------|
| **Login rate limiting** | ✅ Configuré (5 tentatives) | 🔴 CRITIQUE | Aucune |
| **Email verification throttle** | ✅ throttle:6,1 | 🟠 MOYEN | Aucune |
| **API routes rate limiting** | ❌ Manquant | 🔴 CRITIQUE | **À corriger** |
| **Scan cooldown** | ❌ Manquant | 🟠 MOYEN | **À corriger** |
| **File upload validation** | ✅ Taille/type/quantité | 🔴 CRITIQUE | Aucune |
| **PHP upload_max_filesize** | ⚠️ Incohérent (2M vs 5M) | 🟡 BAS | **À corriger** |
| **Cleanup automatique** | ✅ 24h TTL | 🟠 MOYEN | Aucune |
| **Resource limits PHP** | ✅ Illimité (justifié) | 🟠 MOYEN | Aucune |

**Verdict :** ⚠️ **Protections partielles - Vulnérabilités critiques API**

**Protections actives :**
- Login brute-force protégé (5 tentatives max)
- Email verification throttled (6/min)
- File uploads validés (taille, type, quantité)
- Cleanup automatique évite saturation stockage
- Resource limits PHP adaptés aux jobs longs

**Vulnérabilités identifiées :**
1. 🔴 **CRITIQUE** : Routes API sans rate limiting → DoS + coûts illimités
2. 🟠 **MOYEN** : Scans sans cooldown → Abus financier Claude API
3. 🟡 **BAS** : PHP upload limits incohérents → Uploads 3-5MB échouent

**Actions requises (par priorité) :**
1. 🔴 **URGENT** : Implémenter `throttle:api` et `throttle:api_strict` sur toutes routes API
2. 🟠 **IMPORTANT** : Ajouter cooldown 10 minutes sur `triggerScan()`
3. 🟡 **RECOMMANDÉ** : Augmenter `upload_max_filesize` à 6M et `post_max_size` à 70M

**Impact financier sans corrections :**
- Abus scan : **$30-3000/heure** possible (vs $0.30/heure avec cooldown)
- Binance API ban : **Application inutilisable** pendant 24h
- DoS serveur : **Indisponibilité complète** pour tous utilisateurs

**Temps estimé corrections :** 30-45 minutes

---

## Notes de Session

_Cette section sera complétée au fur et à mesure de l'audit avec les observations, questions et décisions importantes._

---

*Ce document sera complété progressivement durant l'audit de sécurité.*
