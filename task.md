# Rizqak2 Comprehensive Refactoring — Task Tracker

## 🔒 Current Status: PLANNING — Awaiting User Approval of v3 Plan
> This file is the **single source of truth** for progress. Update `[/]` when starting, `[x]` when done.
> After each Phase completion → write checkpoint in `docs/PHASE_COMPLETION_LOG.md`

---

## Pre-Execution Setup
- [x] Initial project discovery and structure analysis
- [x] Read Master UI Constitution (2562 lines)
- [x] Read nuxt.config.ts, main.css, package.json
- [x] Read existing Phase 0 and Phase 1 audit artifacts
- [x] Inventory all components, pages, composables, stores
- [x] Create Master Execution Plan v1 (implementation_plan.md)
- [x] User answers to 3 planning questions (work in order, full migration, i18n infra only)
- [x] Expand plan to v3: state persistence + unified standards + 9 new issues + conflict greps
- [x] Restore v2 original details that were accidentally removed + merge with v3 additions
- [/] User review and approval of v3 execution plan
- [ ] Create `docs/PHASE_COMPLETION_LOG.md` (checkpoint file)
- [ ] Create `docs/STANDARDS.md` (unified standards registry)
- [ ] Run pre-flight baseline: `pnpm typecheck`, `pnpm lint`, `pnpm build`

---

## BLOCK A — Foundation Cleanup

### Phase 1: Auto-Import Cleanup & Dead Import Elimination
**Standard**: Nuxt auto-imports | **DELETE**: all explicit `from 'vue'` + explicit component imports

- [ ] Pre-flight check: `pnpm typecheck` + `pnpm build` pass
- [ ] Remove `import { ref } from 'vue'` from [LayoutHeader.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/layout/LayoutHeader.vue)
- [ ] Remove `import { ref } from 'vue'` + explicit component imports from [HomeHero.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/home/HomeHero.vue)
- [ ] Remove `import { ref } from 'vue'` + explicit component imports from [HomeSidebar.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/home/HomeSidebar.vue)
- [ ] Remove `import { ref, onMounted, onUnmounted } from 'vue'` + explicit component imports from [HomeJobList.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/home/HomeJobList.vue)
- [ ] Remove `import { ref, computed } from 'vue'` + explicit component imports from [JobCard.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/jobs/JobCard.vue)
- [ ] Remove `import { computed } from 'vue'` + explicit component imports from [CompanyCard.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/companies/CompanyCard.vue)
- [ ] Remove `import { computed } from 'vue'` from [BaseButton.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/shared/components/base/BaseButton.vue)
- [ ] Remove `import { ref, watch, onMounted } from 'vue'` from [useTheme.ts](file:///c:/Users/USER/Desktop/Rizqak2/app/shared/composables/useTheme.ts)
- [ ] Remove `import { computed } from 'vue'` from [useSEO.ts](file:///c:/Users/USER/Desktop/Rizqak2/app/shared/composables/useSEO.ts)
- [ ] Delete [core/api/seo.ts](file:///c:/Users/USER/Desktop/Rizqak2/app/core/api/seo.ts) — dead barrel re-export
- [ ] Update any files importing from `core/api/seo` → import from `shared/composables`
- [ ] 🔍 Conflict grep: `import.*from ['"]vue['"]` in app code → must be ZERO
- [ ] Post-flight: `pnpm build` + `pnpm typecheck` pass
- [ ] Document standard in `docs/STANDARDS.md`
- [ ] Write checkpoint in `docs/PHASE_COMPLETION_LOG.md`

---

### Phase 2: Theme System Unification
**Standard**: `@nuxtjs/color-mode` → `useColorMode()` | **DELETE**: `useTheme.ts` + `ui.ts` theme/toast state

- [ ] Pre-flight check
- [ ] **DELETE** [useTheme.ts](file:///c:/Users/USER/Desktop/Rizqak2/app/shared/composables/useTheme.ts) entirely (80 lines — uses `localStorage('rizqak-theme')` + manual classList)
- [ ] **MODIFY** [ui.ts](file:///c:/Users/USER/Desktop/Rizqak2/app/stores/ui.ts):
    - [ ] Remove `Toast` interface (lines 3-9)
    - [ ] Remove `toasts` and `theme` from UIState (lines 14-15)
    - [ ] Remove `theme: 'light'` from state (line 23)
    - [ ] Remove `toasts: []` from state (line 22)
    - [ ] Remove `currentTheme` getter (line 29)
    - [ ] Remove `hasToasts` getter (line 30)
    - [ ] Remove `showToast()` action (lines 50-64)
    - [ ] Remove `dismissToast()` action (lines 66-72)
    - [ ] Remove `clearToasts()` action (lines 74-76)
    - [ ] Remove `setTheme()` action (lines 78-84)
    - [ ] Remove `toggleTheme()` action (lines 86-88)
    - [ ] Remove `initTheme()` action (lines 90-99)
    - [ ] Keep ONLY: `sidebarOpen`, `mobileMenuOpen` + their toggles/setters
- [ ] **MODIFY** [LayoutHeader.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/layout/LayoutHeader.vue):
    - [ ] Replace `const { isDark, toggleTheme } = useTheme()` with `const colorMode = useColorMode()`
    - [ ] Replace `isDark` → `colorMode.value === 'dark'`
    - [ ] Replace `toggleTheme()` → `colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'`
- [ ] Find and update ALL other files using `useUIStore().toggleTheme` or `useUIStore().initTheme`
- [ ] Verify `colorMode` config in [nuxt.config.ts](file:///c:/Users/USER/Desktop/Rizqak2/nuxt.config.ts): `classSuffix: ''`, `preference: 'system'`, `fallback: 'light'`
- [ ] 🔍 Conflict grep: `useTheme` → ZERO results
- [ ] 🔍 Conflict grep: `initTheme` → ZERO results
- [ ] 🔍 Conflict grep: `localStorage.*theme` → ZERO (only `rizqak-color-mode` from module)
- [ ] 🔍 Conflict grep: `classList.*dark` → ZERO results
- [ ] Post-flight: toggle dark mode works, single localStorage key, `pnpm build` passes
- [ ] Document standard in `docs/STANDARDS.md`
- [ ] Write checkpoint in `docs/PHASE_COMPLETION_LOG.md`

---

### Phase 3: VueUse Integration & Manual Pattern Replacement
**Standard**: `@vueuse/core` for all browser APIs | **DELETE**: manual addEventListener, localStorage, matchMedia

- [ ] Pre-flight check
- [ ] **MODIFY** [HomeJobList.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/home/HomeJobList.vue):
    - [ ] Replace manual `document.addEventListener('click', closeDropdown)` + `removeEventListener` with `onClickOutside(dropdownRef, () => isDropdownOpen.value = false)`
    - [ ] Remove `onMounted`/`onUnmounted` lifecycle hooks for click listener
- [ ] **MODIFY** [LayoutHeader.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/layout/LayoutHeader.vue):
    - [ ] Replace `const mobileMenuOpen = ref(false)` + manual toggle with `useToggle(false)`
- [ ] Audit ALL files for manual `localStorage.getItem` / `.setItem` → replace with `useLocalStorage()` / `useStorage()`
- [ ] Audit ALL files for manual `window.matchMedia` → replace with `useMediaQuery()` / `usePreferredDark()`
- [ ] Audit ALL files for manual `addEventListener('resize')` → replace with `useWindowSize()`
- [ ] Audit ALL files for manual `addEventListener('scroll')` → replace with `useScroll()`
- [ ] Audit ALL files for manual `addEventListener('keydown')` → replace with `onKeyStroke()`
- [ ] 🔍 Conflict grep: `document.addEventListener` in app code → ZERO
- [ ] 🔍 Conflict grep: `localStorage\.(get|set)Item` → ZERO
- [ ] 🔍 Conflict grep: `window.matchMedia` → ZERO
- [ ] Post-flight: identical behavior, zero console errors, `pnpm build` passes
- [ ] Document standard in `docs/STANDARDS.md`
- [ ] Write checkpoint in `docs/PHASE_COMPLETION_LOG.md`

---

### Phase 4: Font Delivery Migration
**Standard**: `@nuxt/fonts` sole provider for Cairo | **DELETE**: manual dns-prefetch, preconnect

- [ ] Pre-flight check
- [ ] **MODIFY** [nuxt.config.ts](file:///c:/Users/USER/Desktop/Rizqak2/nuxt.config.ts):
    - [ ] Remove `dns-prefetch` for `fonts.googleapis.com` (line ~236)
    - [ ] Remove `dns-prefetch` for `fonts.gstatic.com` (line ~237)
    - [ ] Remove `preconnect` for `fonts.googleapis.com` (line ~238)
    - [ ] Remove `preconnect` for `fonts.gstatic.com` (line ~239)
    - [ ] **Keep** Material Symbols external link (line ~240) — Phase 7 evaluates
- [ ] Verify `@nuxt/fonts` config (lines 83-94): `display: 'swap'`, Cairo weights 300-800, subsets arabic+latin
- [ ] 🔍 Conflict grep: `fonts.googleapis.com` → ONLY Material Symbols link remains
- [ ] Post-flight: Cairo loads identically, no external font requests for Cairo in Network tab
- [ ] Document standard in `docs/STANDARDS.md`
- [ ] Write checkpoint in `docs/PHASE_COMPLETION_LOG.md`

---

### Phase 5: Hardcoded Visual Value Elimination
**Standard**: Semantic design tokens only | **DELETE**: all literal color classes, hex values

- [ ] Pre-flight check
- [ ] Search + replace `bg-white` → `bg-surface` (est. ~8 occurrences, NOT in shell context)
- [ ] Search + replace `text-neutral-400` → `text-muted-foreground` (est. ~12)
- [ ] Search + replace `text-neutral-500` → `text-secondary` or `text-muted-foreground` (est. ~6)
- [ ] Search + replace `bg-neutral-50` → `bg-muted` (est. ~3)
- [ ] Search + replace `border-neutral-*` → `border-border` (est. ~2)
- [ ] Verify `bg-white/5`, `bg-white/10` in shell context — already tokenized as `--color-shell-surface`?
- [ ] Audit ALL hardcoded `#hex` values in `.vue` files → map to closest token or create new
- [ ] Create new semantic tokens if un-tokenized patterns remain
- [ ] Verify `border-ds-border` maps correctly to `--color-border` via `@theme` alias
- [ ] Verify `text-ds-foreground` maps correctly to `--color-foreground` via `@theme` alias
- [ ] Post-flight: `pnpm audit:tokens` passes, visual comparison light+dark mode, `pnpm build`
- [ ] Document standard in `docs/STANDARDS.md`
- [ ] Write checkpoint in `docs/PHASE_COMPLETION_LOG.md`

---

## BLOCK B — Architecture Standardization

### Phase 6: Component Architecture Enforcement
**Standard**: Base components for all interactive elements | **DELETE**: raw HTML buttons/inputs

- [ ] Pre-flight check
- [ ] Audit: raw `<button>` in [HomeSidebar.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/home/HomeSidebar.vue) (line 105) → `BaseButton`
- [ ] Audit: raw `<button>` in [HomeHero.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/home/HomeHero.vue) (clear button) → `BaseButton`
- [ ] Audit: raw `<button>` in [HomeJobList.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/home/HomeJobList.vue) → `BaseButton`
- [ ] Audit: raw `<button>` in [LayoutHeader.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/layout/LayoutHeader.vue) (action buttons) → `BaseButton`
- [ ] Audit ALL files: raw `<input>` → `BaseInput`
- [ ] Audit ALL files: raw `<span>` for semantic text → `BaseTypography` where applicable
- [ ] Verify ALL components accepting `class` prop use [cn()](file:///c:/Users/USER/Desktop/Rizqak2/app/shared/utils/tailwind.ts#4-11) merge pattern
- [ ] Verify ALL multi-variant components use CVA pattern
- [ ] Fix [HomeHero.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/home/HomeHero.vue) carousel arrows (`@click="null"` lines 111-132) — implement scroll or remove
- [ ] 🔍 Conflict grep: raw `<button` outside `Base*.vue` → ZERO
- [ ] 🔍 Conflict grep: raw `<input` outside `Base*.vue` → ZERO
- [ ] Post-flight: visual identical, `pnpm build` passes
- [ ] Write checkpoint in `docs/PHASE_COMPLETION_LOG.md`

---

### Phase 7: Icon System Rationalization

- [ ] Pre-flight check
- [ ] Create complete icon inventory: every Lucide icon used + every Material Symbol used
- [ ] Evaluate Material Symbols elimination → Lucide-only (pros/cons)
- [ ] If eliminating: remove external stylesheet from [nuxt.config.ts](file:///c:/Users/USER/Desktop/Rizqak2/nuxt.config.ts) line 240
- [ ] Standardize ALL icon sizes: `size-4` (16px), `size-5` (20px), `size-6` (24px)
- [ ] Add `aria-hidden="true"` to ALL decorative icons
- [ ] Post-flight: zero broken icons, same visual, `pnpm build`
- [ ] Write checkpoint in `docs/PHASE_COMPLETION_LOG.md`

---

### Phase 8: Data Fetching & State Architecture

- [ ] Pre-flight check
- [ ] **MODIFY** [vue-query.ts](file:///c:/Users/USER/Desktop/Rizqak2/app/plugins/vue-query.ts) — add production defaults:
    - [ ] `staleTime: 1000 * 60 * 5` (5 minutes)
    - [ ] `gcTime: 1000 * 60 * 30` (30 minutes)
    - [ ] `retry: 1`
    - [ ] `refetchOnWindowFocus: false`
- [ ] **FULL REWRITE** [client.ts](file:///c:/Users/USER/Desktop/Rizqak2/app/core/api/client.ts) (188 lines):
    - [ ] Replace ALL raw `fetch()` calls with `$fetch()` (ofetch/H3)
    - [ ] Preserve all existing API method signatures (backward compatible)
    - [ ] Update error handling to ofetch error format
    - [ ] Remove manual JSON parsing
    - [ ] Remove manual header construction where Nuxt handles it
    - [ ] Auto SSR/CSR handling gained
    - [ ] Auto JSON parsing gained
    - [ ] Interceptor support gained
- [ ] Move types from [mockData.ts](file:///c:/Users/USER/Desktop/Rizqak2/app/shared/utils/mockData.ts) → `shared/types/domain.ts`
- [ ] 🔍 Conflict grep: raw `fetch(` (not `$fetch`) in app code → ZERO
- [ ] 🔍 Conflict grep: `new Request(` in app code → ZERO
- [ ] Post-flight: API calls work, no hydration mismatches, `pnpm build`
- [ ] Document standard in `docs/STANDARDS.md`
- [ ] Write checkpoint in `docs/PHASE_COMPLETION_LOG.md`

---

### Phase 9: Animation & Motion Standardization

- [ ] Pre-flight check
- [ ] Verify all transitions use motion tokens: `duration-fast` (150ms), `duration-normal` (200ms), `duration-base` (250ms), `duration-slow` (350ms)
- [ ] Verify `@formkit/auto-animate` (`v-auto-animate`) used for dynamic lists
- [ ] Add `prefers-reduced-motion` media query support in CSS
- [ ] Verify `transition-*` classes match token definitions
- [ ] Post-flight: enable `prefers-reduced-motion` → animations stop; disable → unchanged
- [ ] Write checkpoint in `docs/PHASE_COMPLETION_LOG.md`

---

## BLOCK C — i18n & Accessibility

### Phase 10: i18n Foundation
**Standard**: `@nuxtjs/i18n` → `$t()` / `useI18n()` | **DELETE**: all hardcoded Arabic strings

> Infrastructure only — NO actual English translation

- [ ] Pre-flight check
- [ ] Build comprehensive `locales/ar.json` — all hardcoded Arabic → keyed by component namespace
- [ ] Build `locales/en.json` — identical key structure, placeholder values (NOT actual translation)
- [ ] Replace ALL hardcoded text in templates with `$t('component.key')` — every component:
    - [ ] [LayoutHeader.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/layout/LayoutHeader.vue)
    - [ ] [LayoutFooter.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/layout/LayoutFooter.vue)
    - [ ] [HomeHero.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/home/HomeHero.vue)
    - [ ] [HomeSidebar.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/home/HomeSidebar.vue)
    - [ ] [HomeJobList.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/home/HomeJobList.vue)
    - [ ] [HomeFeaturedCompanies.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/home/HomeFeaturedCompanies.vue)
    - [ ] [JobCard.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/jobs/JobCard.vue)
    - [ ] [CompanyCard.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/companies/CompanyCard.vue)
    - [ ] All filter components
    - [ ] All base components with text
    - [ ] All page components
    - [ ] All remaining components
- [ ] Replace ALL hardcoded text in `<script>` with `t('key')` from `useI18n()`
- [ ] **MODIFY** [app.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/app.vue): make `lang` and `dir` reactive to i18n locale (currently hardcoded lines 14-15)
- [ ] **MODIFY** [nuxt.config.ts](file:///c:/Users/USER/Desktop/Rizqak2/nuxt.config.ts): remove hardcoded `lang: 'ar'`, `dir: 'rtl'` from `htmlAttrs` (lines 221-222) — i18n module handles
- [ ] Fix PWA manifest: hardcoded English `description` (nuxt.config.ts lines 107-116)
- [ ] Replace label strings in [mockData.ts](file:///c:/Users/USER/Desktop/Rizqak2/app/shared/utils/mockData.ts) with i18n keys
- [ ] 🔍 Conflict grep: Arabic text in `.vue` templates → ZERO (all via `$t()`)
- [ ] Post-flight: build succeeds, all text renders via i18n keys, `pnpm build`
- [ ] Document standard in `docs/STANDARDS.md`
- [ ] Write checkpoint in `docs/PHASE_COMPLETION_LOG.md`

---

### Phase 11: Accessibility (WCAG 2.1 AA)

- [ ] Pre-flight check
- [ ] Color contrast audit: ≥ 4.5:1 (normal text), ≥ 3:1 (large text)
- [ ] Focus indicators on ALL interactive elements using `--shadow-focus`
- [ ] Skip navigation link at top of page
- [ ] ARIA landmarks: `<header>`, `<main>`, `<footer>`, `<nav>`, `<aside>`
- [ ] All images: `alt` text or `aria-hidden="true"`
- [ ] All form controls: associated `<label>` or `aria-label`
- [ ] Keyboard navigation: Tab order, Enter/Space activation, Escape to close
- [ ] `aria-expanded` on disclosure triggers (mobile menu, dropdowns, filter expand)
- [ ] Post-flight: `eslint-plugin-vuejs-accessibility` lint passes
- [ ] Write checkpoint in `docs/PHASE_COMPLETION_LOG.md`

---

### Phase 12: Form Handling Standardization

- [ ] Pre-flight check
- [ ] Verify `vee-validate` + `@vee-validate/zod` for ALL forms (auth, search, filters)
- [ ] Verify Zod schemas for validation rules
- [ ] Error messages via i18n keys
- [ ] Loading/success/error state handling on all submissions
- [ ] Post-flight: forms validate correctly
- [ ] Write checkpoint in `docs/PHASE_COMPLETION_LOG.md`

---

## BLOCK D — SEO, Security, Performance

### Phase 13: SEO Maximization

- [ ] Pre-flight check
- [ ] Verify robots.txt generation
- [ ] Verify sitemap.xml includes all public routes
- [ ] Verify schema.org: `WebSite`, `Organization`, `JobPosting`
- [ ] Verify OG images generate at 1200×630
- [ ] Verify every page: unique `<title>`, meta description, canonical, OG tags
- [ ] Verify `lang` reflects active i18n locale
- [ ] Fix [useSEO.ts](file:///c:/Users/USER/Desktop/Rizqak2/app/shared/composables/useSEO.ts) hardcoded English defaults
- [ ] Post-flight: sitemap.xml, robots.txt correct, structured data validator passes
- [ ] Write checkpoint in `docs/PHASE_COMPLETION_LOG.md`

---

### Phase 14: Security Hardening

- [ ] Pre-flight check
- [ ] **MODIFY** [security-headers.ts](file:///c:/Users/USER/Desktop/Rizqak2/app/server/plugins/security-headers.ts):
    - [ ] Remove `'unsafe-eval'` from `script-src` (evaluate necessity)
    - [ ] Tighten `'unsafe-inline'` with nonce-based CSP where possible
    - [ ] Move CSP from Report-Only to enforcing (after testing)
- [ ] **MODIFY** Sentry configs: `process.env.NUXT_PUBLIC_SENTRY_DSN` → `useRuntimeConfig().public.sentryDsn`
- [ ] **MODIFY** [auth.ts](file:///c:/Users/USER/Desktop/Rizqak2/app/stores/auth.ts):
    - [ ] Evaluate migration from `localStorage` token → HTTP-only cookies via `nuxt-auth-utils`
    - [ ] Remove mock fallback auth (`console.warn('API Login failed, using mock data')`)
- [ ] Post-flight: response headers correct, no `process.env` in client bundle
- [ ] Write checkpoint in `docs/PHASE_COMPLETION_LOG.md`

---

### Phase 15: Performance Optimization

- [ ] Pre-flight check
- [ ] `@nuxt/image`: alt, width, height, format on ALL `<img>` tags
- [ ] `@nuxt/scripts`: loading strategies for third-party scripts
- [ ] Lazy imports: tiptap, chart.js, leaflet, vue-pdf-embed, qrcode, swiper
- [ ] PWA manifest completeness
- [ ] Vite chunk splitting analysis
- [ ] Verify CSS purging effectiveness
- [ ] Post-flight: `pnpm build`, bundle size analysis, Lighthouse score
- [ ] Write checkpoint in `docs/PHASE_COMPLETION_LOG.md`

---

### Phase 16: Responsive Design Audit

- [ ] Pre-flight check
- [ ] Test at 320px — no overflow, touch targets
- [ ] Test at 375px — no overflow, touch targets
- [ ] Test at 768px — navigation adaptation
- [ ] Test at 1024px — layout correctness
- [ ] Test at 1280px — full desktop
- [ ] Verify touch targets ≥ 44×44px on all interactive elements
- [ ] Verify filter sidebar collapse/expand on mobile
- [ ] Verify RTL layout at all breakpoints
- [ ] Post-flight: screenshots/browser tests at each viewport
- [ ] Write checkpoint in `docs/PHASE_COMPLETION_LOG.md`

---

## BLOCK E — Code Quality

### Phase 17: TypeScript Strict Enforcement

- [ ] Pre-flight check
- [ ] Remove ALL `any` types (found: `class?: any` in [CompanyCard.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/components/companies/CompanyCard.vue), [mockData.ts](file:///c:/Users/USER/Desktop/Rizqak2/app/shared/utils/mockData.ts#14-23))
- [ ] Type all component props and emits
- [ ] Type all API response shapes
- [ ] Post-flight: `pnpm typecheck` passes with zero errors
- [ ] Write checkpoint in `docs/PHASE_COMPLETION_LOG.md`

---

### Phase 18: Dead Code & Dependency Cleanup

- [ ] Pre-flight check
- [ ] Remove unused components and composables
- [ ] Remove duplicate asset trees: `app/public/**` vs `public/**` (256 overlapping paths)
- [ ] Remove `app/public/images/flags_backup/**`
- [ ] Remove duplicate docs:
    - [ ] Consolidate [DESIGN-SYSTEM.md](file:///c:/Users/USER/Desktop/Rizqak2/docs/DESIGN-SYSTEM.md) vs [DESIGN_SYSTEM.md](file:///c:/Users/USER/Desktop/Rizqak2/docs/DESIGN_SYSTEM.md) vs [16-DESIGN-SYSTEM.md](file:///c:/Users/USER/Desktop/Rizqak2/docs/16-DESIGN-SYSTEM.md) → single canonical
    - [ ] Consolidate duplicate CHANGELOG files
    - [ ] Consolidate duplicate CURRENT-STATUS files
- [ ] Audit [package.json](file:///c:/Users/USER/Desktop/Rizqak2/package.json) — identify and remove unused dependencies
- [ ] Handle empty `app/middleware/` — implement auth guards or remove directory
- [ ] Fix `tailwindcss() as any` in [nuxt.config.ts](file:///c:/Users/USER/Desktop/Rizqak2/nuxt.config.ts) line 207 — proper typing
- [ ] Fix explicit `Toaster` import in [app.vue](file:///c:/Users/USER/Desktop/Rizqak2/app/app.vue) line 10 — auto-import or plugin
- [ ] Post-flight: `pnpm build` passes, no unused imports
- [ ] Write checkpoint in `docs/PHASE_COMPLETION_LOG.md`

---

### Phase 19: File Structure & Naming Conventions

- [ ] Pre-flight check
- [ ] Verify PascalCase for all component files
- [ ] Verify camelCase for all composable and utility files
- [ ] Verify consistent `~/` import aliasing throughout
- [ ] Document naming conventions
- [ ] Write checkpoint in `docs/PHASE_COMPLETION_LOG.md`

---

### Phase 20: Error Handling & Monitoring

- [ ] Pre-flight check
- [ ] Verify Sentry integration captures errors correctly (after Phase 14 runtimeConfig fix)
- [ ] Add Vue error boundaries where needed
- [ ] User-facing error messages via i18n keys
- [ ] API error type narrowing
- [ ] Write checkpoint in `docs/PHASE_COMPLETION_LOG.md`

---

## BLOCK F — Documentation & AI Readiness

### Phase 21: Design System Documentation

- [ ] Create `docs/DESIGN_SYSTEM_ARCHITECTURE.md`:
    - [ ] Complete token reference with all 223+ tokens
    - [ ] Token naming conventions and when to use each
    - [ ] Component → Token mapping matrix
    - [ ] Dark mode token override guide
    - [ ] Adding new tokens protocol
- [ ] Create `docs/COMPONENT_LIBRARY.md`:
    - [ ] Every base component: CVA variants, props, usage examples
    - [ ] "If you need X, use BaseY with variant Z" patterns
- [ ] Write checkpoint in `docs/PHASE_COMPLETION_LOG.md`

---

### Phase 22: AI-Agent Integration Manifest

- [ ] Create `docs/AI_AGENT_GUIDE.md`:
    - [ ] Token lookup table: "For this visual need → use this token"
    - [ ] Component decision tree: "For this UI pattern → use this component"
    - [ ] New component protocol: CVA + cn() + reka-ui pattern
    - [ ] New token protocol: how to add to `@theme` block
    - [ ] Tool responsibility matrix
    - [ ] File placement guide
- [ ] Finalize `docs/STANDARDS.md` — all accumulated standards from all phases
- [ ] Final cleanup of `docs/` directory — remove all outdated/duplicate files
- [ ] Write final checkpoint in `docs/PHASE_COMPLETION_LOG.md`
- [ ] 🎉 **PROJECT COMPLETE**
