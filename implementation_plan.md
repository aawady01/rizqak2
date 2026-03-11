# Master Execution Plan — Rizqak2 Comprehensive Refactoring (v3 Final)

## Vision Statement

Transform Rizqak2 into a **fully standardized, AI-agent-friendly codebase** where:
1. **Any AI agent** given a screenshot or design suggestion can instantly identify the correct tokens, components, and patterns to use
2. **Zero hardcoded values** exist anywhere — every visual property traces to a named design token
3. Every tool has a **single, clear responsibility** — no duplicate systems competing for the same job
4. The project follows the **latest standards** as of March 2026 and enforces them for all future work
5. The codebase is **self-documenting** — file structure, naming, and architecture make the intent obvious

> [!CAUTION]
> **Supreme constraint**: Pixel-for-pixel visual preservation throughout all phases. The rendered UI must remain identical to the current state.

---

## 🔒 State Persistence Protocol (NEW in v3)

> [!IMPORTANT]
> This protocol ensures that if the internet disconnects, the laptop shuts down, or any other interruption occurs, we can resume exactly where we left off.

### Rules
1. **Before starting any sub-task**: Update `task.md` with `[/]` (in-progress) marker
2. **After completing any sub-task**: Update `task.md` with `[x]` (completed) marker
3. **After completing each Phase**: Write a completion summary in `docs/PHASE_COMPLETION_LOG.md`
4. **Every Phase produces a checkpoint**: Files modified, what was done, what was verified
5. **task.md is the single source of truth** for current progress — any agent (or human) can read it and know exactly where we stopped

### Checkpoint Format (in `docs/PHASE_COMPLETION_LOG.md`)
```
## Phase N — [Name] ✅
- **Date**: YYYY-MM-DD
- **Files Modified**: [list]
- **Files Deleted**: [list]
- **Files Created**: [list]
- **What Was Done**: [summary]
- **Verification Results**: [pass/fail + details]
- **Rollback Command**: git diff HEAD~1 (if needed)
```

---

## 🏛️ Unified Standards Mandate (NEW in v3)

> [!CAUTION]
> **CRITICAL RULE**: When implementing ANY standard or pattern:
> 1. **Apply it at the HIGHEST possible standard** using the best and most modern approach
> 2. **Apply it EVERYWHERE** across the entire project — no exceptions
> 3. **DELETE ALL competing/conflicting approaches** immediately
> 4. **Document the standard** in `docs/STANDARDS.md` so future agents follow it
> 5. **Verify zero conflicts** — grep the entire codebase for remnants of old approaches

### Standards Registry (to be built during execution)

| Concern | Unified Standard | Competing Systems to DELETE |
|---------|-----------------|---------------------------|
| Dark Mode | `@nuxtjs/color-mode` → `useColorMode()` | `useTheme.ts` composable, `ui.ts` store theme state |
| Toast/Notifications | `vue-sonner` → `toast()` | `ui.ts` store toast state/actions |
| Font Loading | `@nuxt/fonts` module | Manual `dns-prefetch`, `preconnect`, external stylesheet links (except Material Symbols) |
| State Management | `pinia` stores (clean, single-purpose) | Redundant state in composables |
| Click Outside | `@vueuse/core` → `onClickOutside()` | Manual `document.addEventListener` |
| Toggle State | `@vueuse/core` → `useToggle()` | Manual `ref` + toggle function |
| localStorage | `@vueuse/core` → `useLocalStorage()` | Raw `localStorage.getItem/setItem` |
| Media Queries | `@vueuse/core` → `useMediaQuery()` | Raw `window.matchMedia()` |
| Imports (Vue) | Nuxt auto-imports (implicit) | `import { ref, computed, ... } from 'vue'` |
| Imports (Components) | Nuxt auto-resolution | `import ComponentName from '~/components/...'` |
| API Client | Nuxt `$fetch` (ofetch/H3) | Raw `fetch()` in `core/api/client.ts` |
| CSS Values | Semantic design tokens | `bg-white`, `text-neutral-400`, `#hex` values |
| Buttons | `<BaseButton>` component | Raw `<button>` elements |
| Inputs | `<BaseInput>` component | Raw `<input>` elements |
| Class Merging | `cn()` (clsx + tailwind-merge) | Manual class concatenation |
| Component Variants | CVA (class-variance-authority) | Inline conditional classes |
| i18n | `@nuxtjs/i18n` → `$t()` / `useI18n()` | Hardcoded Arabic strings |
| Auth Tokens | `nuxt-auth-utils` (HTTP-only cookies) | Raw `localStorage` token storage |
| Error Monitoring | `@sentry/nuxt` via `runtimeConfig` | `process.env.SENTRY_DSN` |

---

## Exhaustive Gap Analysis (from reading EVERY source file)

### 🔴 Critical Issues Found

| # | Issue | Files Affected | Impact |
|---|-------|---------------|--------|
| 1 | **THREE competing theme systems** | [useTheme.ts](file:///c:/Users/USER/Desktop/Rizqak2/app/shared/composables/useTheme.ts), [ui.ts](file:///c:/Users/USER/Desktop/Rizqak2/app/stores/ui.ts) store, `@nuxtjs/color-mode` | Race conditions, inconsistent state, triple localStorage writes |
| 2 | **Zero i18n usage** — ALL user-facing text hardcoded Arabic | All 47 components, [mockData.ts](file:///c:/Users/USER/Desktop/Rizqak2/app/shared/utils/mockData.ts), pages | Cannot localize, agents can't add translatable content |
| 3 | **`bg-white` hardcoded** in cards/components | [JobCard.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/jobs/JobCard.vue), [CompanyCard.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/companies/CompanyCard.vue), [HomeFeaturedCompanies.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/home/HomeFeaturedCompanies.vue) | **Breaks dark mode** — shows white blocks on dark background |
| 4 | **API client uses raw `fetch()`** instead of Nuxt `useFetch`/`$fetch` | [client.ts](file:///c:/Users/USER/Desktop/Rizqak2/app/core/api/client.ts) (188 lines) | Misses SSR hydration, caching, auto error handling |
| 5 | **Sentry uses `process.env`** instead of `runtimeConfig` | [sentry.client.config.ts](file:///c:/Users/USER/Desktop/Rizqak2/sentry.client.config.ts), [sentry.server.config.ts](file:///c:/Users/USER/Desktop/Rizqak2/sentry.server.config.ts) | Build-time only, no runtime flexibility |
| 6 | **CSP has `'unsafe-inline' 'unsafe-eval'`** and is report-only | [security-headers.ts](file:///c:/Users/USER/Desktop/Rizqak2/app/server/plugins/security-headers.ts) | No real XSS protection |
| 7 | **Manual `document.addEventListener`** for click-outside | [HomeJobList.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/home/HomeJobList.vue) lines 35-36 | Memory leak risk, not SSR-safe |
| 8 | **Explicit Vue imports** bypassing Nuxt auto-imports | [LayoutHeader.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/layout/LayoutHeader.vue), [HomeHero.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/home/HomeHero.vue), [HomeSidebar.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/home/HomeSidebar.vue), [HomeJobList.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/home/HomeJobList.vue), [JobCard.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/jobs/JobCard.vue), [CompanyCard.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/companies/CompanyCard.vue) | Unnecessary boilerplate, inconsistent |
| 9 | **Explicit component imports** bypassing Nuxt auto-imports | [HomeHero.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/home/HomeHero.vue), [HomeSidebar.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/home/HomeSidebar.vue), [HomeFeaturedCompanies.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/home/HomeFeaturedCompanies.vue), [HomeJobList.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/home/HomeJobList.vue), [index.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/pages/index.vue) | Unnecessary — Nuxt auto-resolves these |
| 10 | **[core/api/seo.ts](file:///c:/Users/USER/Desktop/Rizqak2/app/core/api/seo.ts) is a pure re-export barrel** | [seo.ts](file:///c:/Users/USER/Desktop/Rizqak2/app/core/api/seo.ts) | Dead indirection, confuses agents |
| 11 | **Toast system in UI store** duplicates `vue-sonner` | [ui.ts](file:///c:/Users/USER/Desktop/Rizqak2/app/stores/ui.ts) store | Two separate toast mechanisms |
| 12 | **Types in [mockData.ts](file:///c:/Users/USER/Desktop/Rizqak2/app/shared/utils/mockData.ts)** instead of dedicated type files | [mockData.ts](file:///c:/Users/USER/Desktop/Rizqak2/app/shared/utils/mockData.ts) | Tight coupling data ↔ types |
| 13 | **Vue Query plugin has no stale/gc config** | [vue-query.ts](file:///c:/Users/USER/Desktop/Rizqak2/app/plugins/vue-query.ts) | Default 0ms staleTime = refetch every mount |
| 14 | **Auth store uses raw `localStorage`** instead of `nuxt-auth-utils` | [auth.ts](file:///c:/Users/USER/Desktop/Rizqak2/app/stores/auth.ts) | Not SSR-safe, no HTTP-only cookie support |
| 15 | **Carousel arrows are non-functional** (`@click="null"`) | [HomeHero.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/home/HomeHero.vue) lines 111-132 | Dead UI elements |
| 16 | **app.vue hardcodes `lang='ar'` and `dir='rtl'`** | [app.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/app.vue) lines 14-15 | Blocks i18n locale switching — lang/dir should be reactive |
| 17 | **nuxt.config.ts head also hardcodes `lang: 'ar'`, `dir: 'rtl'`** | [nuxt.config.ts](file:///c:/Users/USER/Desktop/Rizqak2/nuxt.config.ts) lines 221-222 | Duplicates app.vue + blocks i18n |
| 18 | **Locale files near-empty** (~89 bytes each) | [ar.json](file:///c:/Users/USER/Desktop/Rizqak2/app/locales/ar.json), [en.json](file:///c:/Users/USER/Desktop/Rizqak2/app/locales/en.json) | i18n module configured but completely non-functional |
| 19 | **41 docs files with major duplication** | `docs/` — 3× DESIGN-SYSTEM (`DESIGN-SYSTEM.md`, `DESIGN_SYSTEM.md`, `16-DESIGN-SYSTEM.md`), 2× CHANGELOG, 2× CURRENT-STATUS | Confusing, contradictory documentation |
| 20 | **Empty middleware directory** | `app/middleware/` | No auth guards despite auth store existence |
| 21 | **No unit or e2e tests exist** | `test/e2e/` empty, zero `.test.*` or `.spec.*` files | Zero test coverage |
| 22 | **PWA manifest hardcodes English description** | [nuxt.config.ts](file:///c:/Users/USER/Desktop/Rizqak2/nuxt.config.ts) lines 107-116 — `description: 'Rizqak helps job seekers...'` | English description in Arabic-first app |
| 23 | **Toaster import in app.vue is explicit** | [app.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/app.vue) line 10 — `import { Toaster } from 'vue-sonner'` | Should auto-import or be a plugin |
| 24 | **`tailwindcss() as any`** in vite config | [nuxt.config.ts](file:///c:/Users/USER/Desktop/Rizqak2/nuxt.config.ts) line 207 | TypeScript escape hatch — should be properly typed |

### 🟡 Design System Token Gaps

| Token Class Used | Actual Token Exists? | Resolution |
|-----------------|---------------------|------------|
| `bg-white` (literal) | N/A — should be `bg-surface` | Replace with token |
| `border-ds-border` | No `ds-border` token | Maps to `--color-border` via `@theme` alias — verify |
| `text-ds-foreground` | No `ds-foreground` token | Maps to `--color-foreground` via `@theme` alias — verify |
| `text-ds-caption` | Custom font token | Maps to `--font-size-ds-caption-*` — tokenized correctly |
| `bg-neutral-50` (literal) | Yes but not semantic | Should be a semantic alias |
| `text-neutral-400/500` (literal) | Yes but not semantic | Should map to `text-muted-foreground` or `text-secondary` |
| `#145239` (header/footer) | **No matching token** | Already uses `bg-shell-bg`; confirmed `--color-shell-bg` resolves to `var(--color-primary-600)` = `#047857`. The `#145239` is GONE — replaced in a prior conversation |

---

## Phase Execution Plan

### BLOCK A — Foundation Cleanup (Phases 1–5)
*Goal: Eliminate all competing systems, fix imports, remove dead code, establish single source of truth*

---

#### Phase 1 — Auto-Import Cleanup & Dead Import Elimination

**Standard Being Unified**: Nuxt auto-imports for Vue APIs + auto-resolution for components
**Competing approach to DELETE**: All explicit `import { ... } from 'vue'` and explicit component imports

**Changes per file**:

| File | Remove | Reason |
|------|--------|--------|
| [LayoutHeader.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/layout/LayoutHeader.vue) | `import { ref } from 'vue'` | Nuxt auto-imports |
| [HomeHero.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/home/HomeHero.vue) | `import { ref } from 'vue'`, explicit component imports | Auto-import + auto-resolve |
| [HomeSidebar.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/home/HomeSidebar.vue) | `import { ref } from 'vue'`, explicit component imports | Auto-import + auto-resolve |
| [HomeJobList.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/home/HomeJobList.vue) | `import { ref, onMounted, onUnmounted } from 'vue'`, explicit component imports | Auto-import + auto-resolve |
| [JobCard.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/jobs/JobCard.vue) | `import { ref, computed } from 'vue'`, explicit component imports | Auto-import + auto-resolve |
| [CompanyCard.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/companies/CompanyCard.vue) | `import { computed } from 'vue'`, explicit component imports | Auto-import + auto-resolve |
| [BaseButton.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/shared/components/base/BaseButton.vue) | `import { computed } from 'vue'` | Auto-import |
| [useTheme.ts](file:///c:/Users/USER/Desktop/Rizqak2/app/shared/composables/useTheme.ts) | `import { ref, watch, onMounted } from 'vue'` | Auto-import |
| [useSEO.ts](file:///c:/Users/USER/Desktop/Rizqak2/app/shared/composables/useSEO.ts) | `import { computed } from 'vue'` | Auto-import |

Also:
- **Delete** [core/api/seo.ts](file:///c:/Users/USER/Desktop/Rizqak2/app/core/api/seo.ts) — pure re-export barrel, adds no value
- Update any files importing from `core/api/seo` to import directly from `shared/composables`

**Conflict cleanup** (NEW v3): After phase, grep for `import.*from ['"]vue['"]` — must return ZERO results in app code

**Verification**: `pnpm build` + `pnpm typecheck`

---

#### Phase 2 — Theme System Unification

**Standard Being Unified**: `@nuxtjs/color-mode` → `useColorMode()` as the SINGLE dark mode system
**Competing approaches to DELETE**:
1. [useTheme()](file:///c:/Users/USER/Desktop/Rizqak2/app/shared/composables/useTheme.ts#7-80) composable — `localStorage('rizqak-theme')`, manual `classList.add/remove('dark')`
2. `useUIStore()` Pinia store — `localStorage('theme')`, manual `classList.toggle('dark')`
3. `@nuxtjs/color-mode` module — installed, configured, but being IGNORED

**Problem detail**: THREE separate systems manage dark mode:
1. [useTheme()](file:///c:/Users/USER/Desktop/Rizqak2/app/shared/composables/useTheme.ts#7-80) composable — `localStorage('rizqak-theme')`, manual `classList.add/remove('dark')`
2. `useUIStore()` Pinia store — `localStorage('theme')`, manual `classList.toggle('dark')`
3. `@nuxtjs/color-mode` module — installed, configured, but being IGNORED

**Changes**:

##### [DELETE] [useTheme.ts](file:///c:/Users/USER/Desktop/Rizqak2/app/shared/composables/useTheme.ts)
- Delete entirely — replaced by `useColorMode()` from `@nuxtjs/color-mode`

##### [MODIFY] [ui.ts](file:///c:/Users/USER/Desktop/Rizqak2/app/stores/ui.ts)
- Remove ALL theme-related state, getters, and actions (lines 15-16, 29, 78-99)
- Remove `localStorage('theme')` manipulation
- Keep only sidebar + mobileMenu state
- Remove toast state/actions (vue-sonner handles this) — lines 3-9, 14, 22, 30, 50-76

##### [MODIFY] [LayoutHeader.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/layout/LayoutHeader.vue)
- Replace `import { useTheme }` and `const { isDark, toggleTheme } = useTheme()` with `const colorMode = useColorMode()`
- Replace `isDark` references with `colorMode.value === 'dark'`
- Replace [toggleTheme()](file:///c:/Users/USER/Desktop/Rizqak2/app/shared/composables/useTheme.ts#46-53) with `colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'`

##### [MODIFY] [nuxt.config.ts](file:///c:/Users/USER/Desktop/Rizqak2/nuxt.config.ts)
- Verify `colorMode` config: `classSuffix: ''`, `preference: 'system'`, `fallback: 'light'`

**Conflict cleanup** (NEW v3): After phase:
- Grep for `useTheme` → must return ZERO results
- Grep for `initTheme` → must return ZERO results
- Grep for `localStorage.*theme` → must return ZERO results (only `rizqak-color-mode` key from color-mode module)
- Grep for `classList.*dark` → must return ZERO results

**Verification**: Toggle dark mode, verify both modes render correctly, check only ONE `localStorage` key is used

---

#### Phase 3 — VueUse Integration & Manual Pattern Replacement

**Standard Being Unified**: `@vueuse/core` composables for all browser APIs
**Competing approaches to DELETE**: Manual `addEventListener`, `localStorage`, `matchMedia`

**Changes**:

##### [MODIFY] [HomeJobList.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/home/HomeJobList.vue)
- Replace manual `document.addEventListener('click', closeDropdown)` / `removeEventListener` with `onClickOutside(dropdownRef, () => isDropdownOpen.value = false)`
- Remove `onMounted`/`onUnmounted` lifecycle hooks for this

##### [MODIFY] [LayoutHeader.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/layout/LayoutHeader.vue)
- Replace `const mobileMenuOpen = ref(false)` + [toggleMobileMenu](file:///c:/Users/USER/Desktop/Rizqak2/app/stores/ui.ts#42-45) with `const [mobileMenuOpen, toggleMobileMenu] = useToggle(false)`

##### Audit all composables for:
- Manual `localStorage` → `useLocalStorage()` / `useStorage()`
- Manual `matchMedia` → `useMediaQuery()` / `usePreferredDark()`
- Manual `resize` listeners → `useWindowSize()`
- Manual `scroll` listeners → `useScroll()`

**Conflict cleanup** (NEW v3): After phase:
- Grep for `document.addEventListener` → must return ZERO results in app code
- Grep for `localStorage\.(get|set)Item` → must return ZERO results
- Grep for `window.matchMedia` → must return ZERO results

**Verification**: Identical interactive behavior, no console errors

---

#### Phase 4 — Font Delivery Migration

**Standard Being Unified**: `@nuxt/fonts` module as sole font provider for Cairo
**Competing approaches to DELETE**: Manual `dns-prefetch`, `preconnect`, external Google Fonts stylesheet for Cairo

##### [MODIFY] [nuxt.config.ts](file:///c:/Users/USER/Desktop/Rizqak2/nuxt.config.ts)
- Remove `dns-prefetch` and `preconnect` for `fonts.googleapis.com` / `fonts.gstatic.com` (lines ~236-239)
- Verify `@nuxt/fonts` config (lines 83-94) has `display: 'swap'` and correct Cairo weights
- **Keep** Material Symbols external link for now (Phase 7 evaluates removal)

**Conflict cleanup** (NEW v3): Grep for `fonts.googleapis.com` → must return ONLY Material Symbols link

**Verification**: Cairo font loads identically, FOUT/FOIT check, no external Google Fonts network requests for Cairo

---

#### Phase 5 — Hardcoded Visual Value Elimination

**Standard Being Unified**: Semantic design tokens for ALL visual values
**Competing approaches to DELETE**: All literal color classes, hex values in templates

**Systematic search and replace**:

| Pattern | Count (est.) | Replace With |
|---------|-------------|--------------|
| `bg-white` (not in shell) | ~8 occurrences | `bg-surface` |
| `text-neutral-400` | ~12 | `text-muted-foreground` |
| `text-neutral-500` | ~6 | `text-secondary` (or `text-muted-foreground`) |
| `bg-neutral-50` | ~3 | `bg-muted` |
| `border-neutral-*` | ~2 | `border-border` |
| `bg-white/5`, `bg-white/10`, etc. | Shell context | Already tokenized as `--color-shell-surface` — verify usage |
| Hardcoded `#` hex values in [.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/app.vue) | Audit each | Map to closest token or create new |

**New tokens to create** (if needed after audit):
- Semantic aliases for any remaining un-tokenized patterns

**Verification**: `pnpm audit:tokens` passes, visual pixel comparison, dark mode still works

---

### BLOCK B — Architecture Standardization (Phases 6–9)
*Goal: Every component uses base components, every pattern uses the right tool*

---

#### Phase 6 — Component Architecture Enforcement

**Standard Being Unified**: Base component library for ALL interactive/display elements
**Competing approach to DELETE**: Raw HTML elements outside base components

**Audit every component for**:
- Raw `<button>` → Must use `BaseButton` (found in [HomeSidebar.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/home/HomeSidebar.vue) line 105, [HomeHero.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/home/HomeHero.vue) clear button, [HomeJobList.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/home/HomeJobList.vue), [LayoutHeader.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/layout/LayoutHeader.vue) action buttons)
- Raw `<input>` → Must use `BaseInput`
- Raw `<span>` for text → Should use `BaseTypography` where semantic
- All components accepting `class` prop → Must use [cn()](file:///c:/Users/USER/Desktop/Rizqak2/app/shared/utils/tailwind.ts#4-11) merge pattern
- All multi-variant components → Must use CVA pattern

**Non-functional UI fix**:
- [HomeHero.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/home/HomeHero.vue) carousel arrows (`@click="null"`) — either implement scroll functionality or remove the buttons entirely

**Conflict cleanup** (NEW v3): Grep for raw `<button`, `<input>`, `<select>` outside base components → must return ZERO

**Verification**: Grep for raw `<button>`, `<input>`, `<select>` outside base components

---

#### Phase 7 — Icon System Rationalization

- Create complete icon inventory (Lucide vs Material Symbols usage)
- Evaluate Material Symbols elimination in favor of Lucide-only
- Standardize all icon sizes: `size-4` (16px), `size-5` (20px), `size-6` (24px)
- Add `aria-hidden="true"` to ALL decorative icons
- If eliminating Material Symbols: remove external stylesheet link from [nuxt.config.ts](file:///c:/Users/USER/Desktop/Rizqak2/nuxt.config.ts) line 240

**Verification**: Zero broken icons, same visual appearance

---

#### Phase 8 — Data Fetching & State Architecture

##### [MODIFY] [vue-query.ts](file:///c:/Users/USER/Desktop/Rizqak2/app/plugins/vue-query.ts)
- Add production-ready defaults:
  ```ts
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 30,   // 30 minutes
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  })
  ```

##### [MODIFY → FULL REWRITE] [client.ts](file:///c:/Users/USER/Desktop/Rizqak2/app/core/api/client.ts)
**Full migration from raw `fetch` to Nuxt `$fetch` (ofetch/H3)**:
- Replace ALL raw `fetch()` calls with `$fetch()` from H3/ofetch
- Benefits gained:
  - Auto SSR/CSR handling
  - Auto JSON parsing
  - Auto error creation
  - Interceptor support
- Preserve all existing API methods and their signatures (backward compatible interface)
- Update error handling to use ofetch error format
- Remove manual JSON parsing
- Remove manual header construction where Nuxt handles it

**Conflict cleanup** (NEW v3): Grep for `new Request(` or raw `fetch(` in app code — must return ZERO (only `$fetch`)

##### Type separation:
- Move types from [mockData.ts](file:///c:/Users/USER/Desktop/Rizqak2/app/shared/utils/mockData.ts) to `shared/types/domain.ts` (which already exists)

**Verification**: API calls still work, no hydration mismatches

---

#### Phase 9 — Animation & Motion Standardization

- Verify all transitions use motion tokens: `duration-fast` (150ms), `duration-normal` (200ms), `duration-base` (250ms), `duration-slow` (350ms)
- Verify `@formkit/auto-animate` (`v-auto-animate`) for dynamic lists
- Add `prefers-reduced-motion` media query support
- Verify `transition-*` classes match token definitions

**Verification**: Enable `prefers-reduced-motion` → animations stop; disable → unchanged

---

### BLOCK C — Internationalization & Accessibility (Phases 10–12)
*Goal: Every string is translatable, every element is accessible*

---

#### Phase 10 — i18n Foundation

> [!IMPORTANT]
> This is one of the LARGEST phases. Currently **ZERO** i18n usage exists. Every single user-facing string is hardcoded Arabic across all 47 components, all pages, and [mockData.ts](file:///c:/Users/USER/Desktop/Rizqak2/app/shared/utils/mockData.ts).
> We set up the full infrastructure and keys, but do NOT do actual English translation — values in en.json will be placeholder/same Arabic.

**Changes**:
1. Create/verify `locales/ar.json` with all Arabic strings keyed by component namespace
2. Create `locales/en.json` with identical key structure (placeholder values — NO actual translation)
3. Replace ALL hardcoded text in templates with `$t('key')` calls
4. Replace ALL hardcoded text in `<script>` with [t('key')](file:///c:/Users/USER/Desktop/Rizqak2/app/core/api/client.ts#171-174) from `useI18n()`
5. Make `dir` attribute reactive to locale ([ar](file:///c:/Users/USER/Desktop/Rizqak2/app/components/home/HomeHero.vue#23-26) = RTL, [en](file:///c:/Users/USER/Desktop/Rizqak2/app/stores/auth.ts#48-60) = LTR)
6. Update [app.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/app.vue) to use dynamic `lang` and `dir` from i18n (currently hardcoded lines 14-15)
7. Remove hardcoded `lang: 'ar'` and `dir: 'rtl'` from [nuxt.config.ts](file:///c:/Users/USER/Desktop/Rizqak2/nuxt.config.ts) `htmlAttrs` (lines 221-222) — i18n module handles this
8. Fix PWA manifest hardcoded English description

**Affected files**: ALL 47 components + pages + [mockData.ts](file:///c:/Users/USER/Desktop/Rizqak2/app/shared/utils/mockData.ts) labels

**Conflict cleanup** (NEW v3): Grep for Arabic text in `.vue` templates — must return ZERO (all via `$t()`)

**Verification**: Build succeeds, Switch locale from [ar](file:///c:/Users/USER/Desktop/Rizqak2/app/components/home/HomeHero.vue#23-26) to [en](file:///c:/Users/USER/Desktop/Rizqak2/app/stores/auth.ts#48-60) — all text changes, layout flips LTR

---

#### Phase 11 — Accessibility Audit (WCAG 2.1 AA)

- Color contrast ratios ≥ 4.5:1 (normal text), ≥ 3:1 (large text)
- Focus indicators on all interactive elements using `--shadow-focus`
- Skip navigation link at top of page
- ARIA landmarks: `<header>`, `<main>`, `<footer>`, `<nav>`, `<aside>`
- All images: `alt` text or `aria-hidden="true"`
- All form controls: associated `<label>` or `aria-label`
- Keyboard navigation: Tab order, Enter/Space activation, Escape to close
- `aria-expanded` on disclosure triggers (mobile menu, dropdowns, filter expand)

**Verification**: `pnpm lint` with `eslint-plugin-vuejs-accessibility` passes

---

#### Phase 12 — Form Handling Standardization

- Verify `vee-validate` + `@vee-validate/zod` for ALL forms (auth, search, filters)
- Verify Zod schemas for validation
- Error messages via i18n
- Loading/success/error state handling on submissions

**Verification**: Form validation works in both locales

---

### BLOCK D — SEO, Security & Performance (Phases 13–16)
*Goal: Production-grade security, maximal SEO, optimal performance*

---

#### Phase 13 — SEO Maximization

- Verify robots.txt generation
- Verify sitemap.xml includes all public routes
- Verify schema.org: `WebSite`, `Organization`, [JobPosting](file:///c:/Users/USER/Desktop/Rizqak2/app/core/api/seo.ts#22-23)
- Verify OG images generate at 1200×630
- Verify every page: unique `<title>`, meta description, canonical, OG tags
- Verify `lang` reflects active i18n locale
- Fix [useSEO.ts](file:///c:/Users/USER/Desktop/Rizqak2/app/shared/composables/useSEO.ts) hardcoded English defaults

**Verification**: Build → check sitemap.xml, robots.txt, structured data validator

---

#### Phase 14 — Security Hardening

##### [MODIFY] [security-headers.ts](file:///c:/Users/USER/Desktop/Rizqak2/app/server/plugins/security-headers.ts)
- Remove `'unsafe-eval'` from `script-src` (evaluate necessity)
- Tighten `'unsafe-inline'` with nonce-based CSP where possible
- Move CSP from `Report-Only` to enforcing (after testing)

##### [MODIFY] Sentry configs
- Replace `process.env.NUXT_PUBLIC_SENTRY_DSN` with `useRuntimeConfig().public.sentry.dsn`

##### [MODIFY] [auth.ts](file:///c:/Users/USER/Desktop/Rizqak2/app/stores/auth.ts)
- Evaluate migration from `localStorage` token storage to HTTP-only cookies via `nuxt-auth-utils`
- Remove mock fallback auth (`console.warn('API Login failed, using mock data')`)

**Verification**: Response headers check, no `process.env` in client bundle

---

#### Phase 15 — Performance Optimization

- `@nuxt/image`: alt, width, height, format negotiation on ALL `<img>` tags
- `@nuxt/scripts`: loading strategies for third-party scripts
- Lazy imports for heavy libraries: tiptap, chart.js, leaflet, vue-pdf-embed, qrcode, swiper
- PWA manifest completeness
- Vite chunk splitting analysis
- Verify CSS purging effectiveness

**Verification**: `pnpm build`, bundle size analysis, Lighthouse score

---

#### Phase 16 — Responsive Design Audit

- Test at 320px, 375px, 768px, 1024px, 1280px
- Verify no horizontal overflow
- Verify touch targets ≥ 44×44px
- Verify [md](file:///c:/Users/USER/Desktop/Rizqak2/README.md) breakpoint navigation adaptation
- Verify filter sidebar collapse/expand on mobile
- RTL layout at all breakpoints

**Verification**: Browser testing at each viewport, user review of screenshots

---

### BLOCK E — Code Quality & Cleanup (Phases 17–20)
*Goal: TypeScript strict, zero dead code, clean dependency tree*

---

#### Phase 17 — TypeScript Strict Enforcement

- Remove ALL [any](file:///c:/Users/USER/Desktop/Rizqak2/app/shared/utils/mockData.ts#14-23) types (found `class?: any` in [CompanyCard.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/companies/CompanyCard.vue))
- Type all component props and emits
- Type all API response shapes
- Verify `pnpm typecheck` passes with zero errors

---

#### Phase 18 — Dead Code & Dependency Cleanup

- Remove unused components, composables, import paths
- Remove duplicate asset trees: `app/public/**` vs `public/**` (256 overlapping paths)
- Remove `app/public/images/flags_backup/**`
- Remove duplicate docs: [DESIGN-SYSTEM.md](file:///c:/Users/USER/Desktop/Rizqak2/docs/DESIGN-SYSTEM.md) vs [DESIGN_SYSTEM.md](file:///c:/Users/USER/Desktop/Rizqak2/docs/DESIGN_SYSTEM.md) vs [16-DESIGN-SYSTEM.md](file:///c:/Users/USER/Desktop/Rizqak2/docs/16-DESIGN-SYSTEM.md)
- Audit [package.json](file:///c:/Users/USER/Desktop/Rizqak2/package.json) — remove unused dependencies
- Remove [core/api/seo.ts](file:///c:/Users/USER/Desktop/Rizqak2/app/core/api/seo.ts) barrel file (Phase 1)
- Handle empty `app/middleware/` — implement auth guards or remove

---

#### Phase 19 — File Structure & Naming Conventions

- Verify PascalCase for all components
- Verify camelCase for composables and utilities
- Verify consistent import aliasing (`~/` prefix)
- Document naming conventions

---

#### Phase 20 — Error Handling & Monitoring

- Verify Sentry integration captures errors correctly
- Add Vue error boundaries where needed
- User-facing error messages via i18n
- API error type narrowing

---

### BLOCK F — Documentation & AI-Agent Readiness (Phases 21–22)
*Goal: Any AI agent can confidently work on this codebase*

---

#### Phase 21 — Design System Documentation

##### [NEW] docs/DESIGN_SYSTEM_ARCHITECTURE.md
- Complete token reference with all 223+ tokens
- Token naming conventions and when to use each
- Component → Token mapping matrix
- Dark mode token override guide
- Adding new tokens protocol

##### [NEW] docs/COMPONENT_LIBRARY.md
- Every base component with its CVA variants, props, and usage examples
- When to use each component and when to create new ones
- Pattern: "if you need X, use BaseY with variant Z"

---

#### Phase 22 — AI-Agent Integration Manifest

##### [NEW] docs/AI_AGENT_GUIDE.md
A dedicated guide for any AI agent working on this project:
- **Token lookup table**: "For this visual need → use this token"
- **Component decision tree**: "For this UI pattern → use this component"
- **New component protocol**: If no matching component exists, how to create one following the established CVA + cn() + reka-ui pattern
- **New token protocol**: If no matching token exists, how to add one to `@theme` block
- **Tool responsibility matrix**: Which installed tool handles which concern
- **File placement guide**: Where each type of file goes

##### [NEW] docs/STANDARDS.md
- Every unified standard documented (accumulated from all phases)
- What is the standard, what was deleted, how to use it
- Strict enforcement rules for all future work
- This is the **single source of truth** for "how things are done" in this project

---

## Tool Responsibility Matrix

| Concern | Tool | Config Location | Status |
|---------|------|----------------|--------|
| Dark mode | `@nuxtjs/color-mode` | [nuxt.config.ts](file:///c:/Users/USER/Desktop/Rizqak2/nuxt.config.ts) | Fix: eliminate [useTheme.ts](file:///c:/Users/USER/Desktop/Rizqak2/app/shared/composables/useTheme.ts) + store theme |
| Font loading | `@nuxt/fonts` | [nuxt.config.ts](file:///c:/Users/USER/Desktop/Rizqak2/nuxt.config.ts) | Fix: remove manual preconnect |
| Icons | `lucide-vue-next` | Component imports | Fix: audit Material Symbols |
| Toasts | `vue-sonner` | [app.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/app.vue) | Fix: remove store toast system |
| Forms | `vee-validate` + `zod` | Per-form setup | Verify |
| Data fetching | `@tanstack/vue-query` | [vue-query.ts](file:///c:/Users/USER/Desktop/Rizqak2/app/plugins/vue-query.ts) plugin | Fix: add defaults |
| API client | `$fetch` (ofetch) — **FULL migration** | [core/api/client.ts](file:///c:/Users/USER/Desktop/Rizqak2/app/core/api/client.ts) (raw fetch) | **Rewrite** |
| State | `pinia` | Per-store | Fix: remove competing state |
| CSS utilities | `tailwind-merge` + `clsx` via [cn()](file:///c:/Users/USER/Desktop/Rizqak2/app/shared/utils/tailwind.ts#4-11) | [tailwind.ts](file:///c:/Users/USER/Desktop/Rizqak2/app/shared/utils/tailwind.ts) | ✅ Correct |
| Component variants | `class-variance-authority` (CVA) | Per-component | ✅ Correct |
| Headless primitives | `reka-ui` | Per-component | Verify |
| Images | `@nuxt/image` | [nuxt.config.ts](file:///c:/Users/USER/Desktop/Rizqak2/nuxt.config.ts) | Verify |
| SEO | `@nuxtjs/robots`, `@nuxtjs/sitemap`, `nuxt-schema-org`, `nuxt-og-image` | [nuxt.config.ts](file:///c:/Users/USER/Desktop/Rizqak2/nuxt.config.ts) | Verify |
| Security | `nuxt-security` + custom plugin | [nuxt.config.ts](file:///c:/Users/USER/Desktop/Rizqak2/nuxt.config.ts) + [security-headers.ts](file:///c:/Users/USER/Desktop/Rizqak2/app/server/plugins/security-headers.ts) | Fix: strengthen CSP |
| Monitoring | `@sentry/nuxt` | `sentry.*.config.ts` | Fix: use runtimeConfig |
| i18n | `@nuxtjs/i18n` | [nuxt.config.ts](file:///c:/Users/USER/Desktop/Rizqak2/nuxt.config.ts) | Fix: actually implement |
| PWA | `@vite-pwa/nuxt` | [nuxt.config.ts](file:///c:/Users/USER/Desktop/Rizqak2/nuxt.config.ts) | Verify |
| Testing | `vitest` + `@playwright/test` | [vitest.config.ts](file:///c:/Users/USER/Desktop/Rizqak2/vitest.config.ts) | Note: no tests exist yet |

---

## Verification Protocol (Per Phase)

### Pre-Flight Checks
1. `pnpm typecheck` — must pass before starting
2. `pnpm lint` — must pass before starting
3. `pnpm build` — must pass before starting
4. Note current visual state (screenshots if UI-adjacent)

### Post-Flight Checks
1. `pnpm typecheck` — zero new errors
2. `pnpm lint` — zero new warnings
3. `pnpm build` — completes successfully
4. `pnpm audit:tokens` — passes (if token-related)
5. `pnpm baseline:visual` — compare against Phase 0 baseline
6. Visual diff: light mode + dark mode
7. RTL layout verification
8. **Phase-specific conflict cleanup greps** (documented per phase above) (NEW v3)

### Phase Completion Gate
- ALL post-flight checks pass
- Phase completion summary written to `docs/PHASE_COMPLETION_LOG.md` (NEW v3)
- task.md updated with `[x]` marks
- Standards documented in `docs/STANDARDS.md` (NEW v3)

---

## Execution Order

```
BLOCK A: Foundation (1→2→3→4→5)
BLOCK B: Architecture (6→7→8→9)
BLOCK C: i18n & a11y (10→11→12)
BLOCK D: SEO/Security/Perf (13→14→15→16)
BLOCK E: Code Quality (17→18→19→20)
BLOCK F: Docs & AI-readiness (21→22)
```

Each phase: **Analyze → Document → Plan → Present → Implement → Verify → Cleanup Conflicts → Report**

> [!NOTE]
> User approval is required before starting each phase's implementation.
