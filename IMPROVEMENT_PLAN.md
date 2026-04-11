# Rizqak2 — Comprehensive Quality Improvement Plan

> **Project:** Rizqak2 — Job Marketplace Platform  
> **Repository:** https://github.com/aawady01/rizqak2  
> **Stack:** Nuxt 4, Vue 3, Tailwind CSS v4, TypeScript, Cairo font, Reka UI, Pinia, VueUse, Sentry, i18n (ar/en)  
> **Plan Version:** 1.0 — April 11, 2026  
> **Status Tracking File:** `.data/improvement-status.json`

***

## ⚡ PROGRESS TRACKING PROTOCOL

**After every completed step, update `.data/improvement-status.json` in the repository:**

```json
{
  "plan_version": "1.0",
  "last_updated": "ISO-DATE",
  "current_section": "SECTION-ID",
  "current_phase": "PHASE-ID",
  "current_step": "STEP-ID",
  "completed_steps": ["S1.P1.1", "S1.P1.2"],
  "pending_steps": ["S1.P1.3", ...],
  "notes": "any context for next AI model picking up"
}
```

This file is the **single source of truth** for resuming work. Any AI model, in any environment, can read this file and know exactly where to continue.

***

## PROJECT SNAPSHOT (Pre-Work Audit)

### Technology Stack
| Layer | Tool | Version | Notes |
|-------|------|---------|-------|
| Framework | Nuxt | 4.x (app/ dir) | SSR + SSG hybrid |
| UI Framework | Vue | 3.x | Composition API |
| CSS | Tailwind CSS | v4 (@theme syntax) | Fully migrated |
| Component Lib | Reka UI | latest | Headless + styled |
| State | Pinia | latest | Stores in app/stores/ |
| Utilities | VueUse | latest | Composables |
| Font | Cairo | Google Fonts | Arabic + Latin |
| i18n | @nuxtjs/i18n | latest | ar (RTL) + en |
| Monitoring | Sentry | latest | Client + Server |
| Testing | Vitest + Playwright | latest | Unit + E2E |
| Package Manager | pnpm | workspace | Monorepo |

### Pages Inventory
- `/` — Homepage (Hero, search, countries grid, job carousels)
- `/jobs` — Job listing page (filters, grid)
- `/jobs/[slug]` — Job detail page
- `/companies` — Companies listing
- `/companies/[slug]` — Company profile (cover, logo, tabs, reviews)
- Auth pages (login, register, etc.)
- Additional i18n routes for each

### Design System Status
- ✅ Tailwind v4 `@theme` tokens defined in `app/assets/css/main.css`
- ✅ Dark mode via `html.dark` class + theme toggle
- ✅ Full color palette (primary green, accent gold, neutrals)
- ✅ Zero-radius brand standard (`--radius-*: 0` except `--radius-full`)
- ✅ Cairo font (Arabic-first, Latin fallback)
- ✅ DS v2.0 typography scale (display-xxl → caption-s)
- ✅ Shell tokens (header, footer, hero)
- ✅ RTL support via `html[dir="rtl"]`
- ⚠️ Dark mode colors: some primary shades identical between light/dark
- ⚠️ Shadow tokens use raw `rgba()` — not tone-matched
- ⚠️ No fluid `clamp()` type scale for responsive typography
- ⚠️ No `prefers-color-scheme` auto-detection (only manual class toggle)
- ⚠️ SEO meta composition scattered — not unified composable
- ⚠️ No structured data (JSON-LD) in any page

***

## SECTION 1 — DESIGN SYSTEM & TOKENS

> **Goal:** Elevate token quality, fluid scale, dark mode accuracy, and single source of truth for all visual decisions.  
> **Target file:** `app/assets/css/main.css` (primary), `nuxt.config.ts`

### Phase 1.1 — Token Architecture Hardening

#### Step S1.P1.1 — Migrate Shadows to Tone-Matched OKLCH
- [ ] Replace all `rgba(0,0,0,...)` shadow values with OKLCH-based warm-tinted versions
- [ ] Light mode: `oklch(0.2 0.01 140 / 0.06)` (green-warm tint matching primary)
- [ ] Dark mode: `oklch(0 0 0 / 0.25)` to `oklch(0 0 0 / 0.45)` per level
- [ ] Update all 6 shadow tokens: `--shadow-xs` through `--shadow-focus`
- [ ] **Verify:** Search all `.vue` files for hardcoded `box-shadow` values not using tokens → fix each
- [ ] **Confirm:** Shadow focus ring uses brand primary tint correctly in both modes

#### Step S1.P1.2 — Add Fluid `clamp()` Typography Scale
- [ ] Add a parallel fluid scale alongside the fixed DS scale in `@theme`:
  ```css
  --font-size-fluid-xs:   clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --font-size-fluid-sm:   clamp(0.875rem, 0.8rem + 0.35vw, 1rem);
  --font-size-fluid-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  --font-size-fluid-lg:   clamp(1.125rem, 1rem + 0.75vw, 1.5rem);
  --font-size-fluid-xl:   clamp(1.5rem, 1.2rem + 1.25vw, 2.25rem);
  --font-size-fluid-2xl:  clamp(2rem, 1.2rem + 2.5vw, 3.5rem);
  ```
- [ ] Apply `fluid-base` to body text in all page components
- [ ] Apply `fluid-lg` → `fluid-xl` to hero titles and section headings
- [ ] Apply `fluid-2xl` only to hero display headline on homepage
- [ ] **Verify:** Test at 375px, 768px, 1280px, 1920px — no text overflow or shrinking below 12px
- [ ] **Confirm:** 200% browser zoom tested (WCAG 1.4.4)

#### Step S1.P1.3 — Fix Dark Mode Primary Color Accuracy
- [ ] Audit current dark mode: `--color-primary-600: #047857` is IDENTICAL in both modes — fix
- [ ] Dark mode primary should be lighter/brighter for contrast on dark surfaces: `#34d399` or `#10b981`
- [ ] Ensure `--color-primary` resolves to:
  - Light: `#047857` (sufficient contrast on `#F8FAFC`)
  - Dark: `#4ade80` or `#34d399` (sufficient contrast on `#0a0a0a`)
- [ ] Recalculate contrast ratios for all primary text-on-surface combos in dark mode
- [ ] Update interactive states in dark mode (`--color-interactive`, `--color-interactive-hover`)
- [ ] **Verify:** Run WCAG contrast check on all text-on-primary combinations (≥ 4.5:1 body, ≥ 3:1 large)
- [ ] **Confirm:** Shell header remains readable (white text on dark primary bg)

#### Step S1.P1.4 — Add `prefers-color-scheme` Auto-Detection
- [ ] In `app/app.vue` or a dedicated plugin, add:
  ```js
  const mq = window.matchMedia('(prefers-color-scheme: dark)')
  if (!localStorage.getItem('theme')) {
    document.documentElement.classList.toggle('dark', mq.matches)
  }
  mq.addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      document.documentElement.classList.toggle('dark', e.matches)
    }
  })
  ```
- [ ] Persist user preference in `localStorage` key `'theme'`
- [ ] Update theme toggle composable/component to write to `localStorage`
- [ ] Add `<meta name="color-scheme" content="light dark">` in `nuxt.config.ts` head
- [ ] **Verify:** Cycle through: no preference → system dark → toggle manual → refresh → still manual
- [ ] **Confirm:** SSR hydration does not cause flash of wrong theme (add inline script in `app.head`)

***

## SECTION 2 — RESPONSIVE DESIGN & MOBILE

> **Goal:** Pixel-perfect, delightful experience from 320px to 2560px with RTL parity.

### Phase 2.1 — Breakpoint Audit & Fix

#### Step S2.P1.1 — Systematic Mobile Audit (375px)
- [ ] Test every page at 375px (iPhone SE) in browser DevTools
- [ ] **Homepage:** Hero title overflow? Search bar width? Countries grid scroll?
- [ ] **Jobs page:** Filter sidebar — does it collapse? Does it have a mobile drawer?
- [ ] **Job detail:** Apply button placement — is it in thumb reach (bottom sticky)?
- [ ] **Company page:** Cover + logo overlap — does it render correctly at 375px?
- [ ] Document ALL issues found in `.data/mobile-audit.md`
- [ ] Fix each issue, one component at a time
- [ ] **Confirm:** Re-test at 375px after each fix, tick off from audit list

#### Step S2.P1.2 — Touch Target Enforcement (44×44px minimum)
- [ ] Audit ALL interactive elements: buttons, links, nav items, filter checkboxes, carousel controls
- [ ] Current `--size-shell-action: 40px` — increase to `44px` minimum
- [ ] Filter checkboxes: ensure label + input combination has ≥ 44px height
- [ ] Carousel controls: `--size-carousel-control: 40px` → bump to `44px`
- [ ] Apply `min-height: 44px; min-width: 44px` to all `.btn` variants
- [ ] **Verify:** Use browser accessibility inspector to check touch target sizes
- [ ] **Confirm:** No interactive element below 44×44px on any page

***

## SECTION 3 — PERFORMANCE & LOADING SPEED

> **Goal:** LCP < 2.0s, INP < 150ms, CLS < 0.05, total initial bundle < 1.5MB.

### Phase 3.1 — Image & Asset Optimization

#### Step S3.P1.1 — Image Optimization Pipeline
- [ ] Add `@nuxt/image` module to `nuxt.config.ts` if not already present
- [ ] Convert all `<img>` tags in components to `<NuxtImg>` or `<NuxtPicture>`
- [ ] Set `format="webp,avif"` as default provider format
- [ ] Ensure ALL images have explicit `width` and `height` attributes to prevent CLS
- [ ] Add `loading="lazy"` to all below-fold images
- [ ] Add `priority` / `preload` prop to hero and above-fold images
- [ ] **Verify:** Run `pnpm build && pnpm preview` → inspect Network tab: all images served as WebP
- [ ] **Confirm:** CLS score 0 for images (no layout shift from unspecified dimensions)

#### Step S3.P1.2 — Font Loading Optimization
- [ ] In `nuxt.config.ts` app.head, add `preconnect` for Google Fonts
- [ ] Add `font-display: swap` to Cairo font import URL: `&display=swap` (verify already present)
- [ ] Consider self-hosting Cairo font files for zero third-party DNS lookup
- [ ] Subset Cairo to only required Unicode ranges (Arabic + Latin) to reduce file size
- [ ] **Verify:** Lighthouse shows no render-blocking font resources
- [ ] **Confirm:** FOUT (flash of unstyled text) is acceptably brief (< 100ms)

***

## SECTION 4 — SEO (Maximum Standards)

> **Goal:** Perfect SEO scores, rich snippets, structured data, search engine discoverability for every page.  
> **Single Source of Truth:** One composable `useSeoConfig()` — no duplicate meta logic anywhere.

### Phase 4.1 — Meta & Structured Data Unification

#### Step S4.P1.1 — Create `useSeoConfig` Composable
- [ ] Create `app/composables/useSeoConfig.ts`
- [ ] This is the SINGLE source of all SEO meta — no page should call `useSeoMeta` directly
- [ ] Composable accepts: `{ title, description, image, type, url, jsonLd }` + auto-fills from site config
- [ ] Auto-generates: title template `%s | رزقك` (or configured brand name)
- [ ] Handles: canonical URL (absolute), hreflang tags for ar/en, OG meta, Twitter Card meta
- [ ] **Verify:** Inspect `<head>` on each page — exactly ONE set of meta tags, no duplicates
- [ ] **Confirm:** No page has missing `og:image`, `og:type`, `twitter:card`

#### Step S4.P1.2 — Structured Data (JSON-LD) on All Pages
- [ ] **Homepage:** `WebSite` schema with `SearchAction` (enables Google Sitelinks Search)
- [ ] **Job detail page:** `JobPosting` schema (Google Jobs integration)
  - Fields: `title`, `description`, `datePosted`, `validThrough`, `employmentType`, `hiringOrganization`, `jobLocation`, `baseSalary`
- [ ] **Company page:** `Organization` schema with `logo`, `url`, `name`, `description`, `sameAs`
- [ ] **Jobs listing page:** `ItemList` schema listing first 10 jobs
- [ ] Create `app/components/SchemaOrg.vue` component using `useSchemaOrg` from `nuxt-schema-org` or manual `useHead` script injection
- [ ] **Verify:** Test with Google Rich Results Test for each page type
- [ ] **Confirm:** Zero errors in Rich Results Test; JobPosting eligible for Google Jobs

#### Step S4.P1.3 — Canonical URLs & hreflang
- [ ] Every page emits `<link rel="canonical" href="ABSOLUTE_URL">`
- [ ] Bilingual pages emit:
  ```html
  <link rel="alternate" hreflang="ar" href="https://rizqak.com/ar/...">
  <link rel="alternate" hreflang="en" href="https://rizqak.com/en/...">
  <link rel="alternate" hreflang="x-default" href="https://rizqak.com/...">
  ```
- [ ] Verify no `?` query parameters leak into canonical URLs (use route path only)
- [ ] **Verify:** Crawl all pages with Screaming Frog and check canonical tags
- [ ] **Confirm:** No duplicate content warnings in Google Search Console (after deployment)

***

## SECTION 5 — SECURITY

> **Goal:** OWASP Top 10 compliance, zero data leakage, anti-scraping, rate limiting, and CSP headers.

### Phase 5.1 — HTTP Security Headers

#### Step S5.P1.1 — Security Headers Configuration
- [ ] In `nuxt.config.ts` `nitro.routeRules` or via middleware, add headers:
  ```
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' *.googleapis.com; style-src 'self' 'unsafe-inline' fonts.googleapis.com; img-src 'self' data: *; font-src 'self' fonts.gstatic.com;
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  ```
- [ ] Use `nuxt-security` module (recommended) for declarative header management
- [ ] **Verify:** Run `https://securityheaders.com` on deployed URL → target grade A
- [ ] **Confirm:** No CSP violations in browser console for normal user flows

#### Step S5.P1.2 — Anti-Scraping & Rate Limiting
- [ ] Add rate limiting on all server API routes (Nitro middleware):
  - `/api/jobs`: 100 req/min per IP
  - `/api/companies`: 60 req/min per IP
  - Auth routes: 10 req/min per IP
- [ ] Implement `x-ratelimit-*` response headers for API transparency
- [ ] Add honeypot field to all forms (hidden input that bots fill, humans don't)
- [ ] **Verify:** Simulate 200 rapid requests to API → confirm 429 response after limit
- [ ] **Confirm:** Legitimate users never hit rate limits during normal usage

***

## SECTION 6 — ACCESSIBILITY (WCAG 2.2 AA)

> **Goal:** Full keyboard navigability, screen reader support, color contrast compliance on ALL pages and ALL components.

### Phase 6.1 — Semantic HTML & ARIA

#### Step S6.P1.1 — Semantic HTML Audit
- [ ] Audit all page components for `<div>` soup — replace with semantic elements
- [ ] Every page: exactly ONE `<h1>`, hierarchy `h1 → h2 → h3` (no skipping)
- [ ] Job listing cards: use `<article>` not `<div>`
- [ ] Navigation: use `<nav aria-label="Main navigation">` and `<nav aria-label="Breadcrumb">`
- [ ] Filter sidebar: use `<aside>` or `<section aria-labelledby>`
- [ ] Search form: use `<form role="search">` with `<label>` for input
- [ ] **Verify:** axe DevTools browser extension — 0 critical/serious violations
- [ ] **Confirm:** Screen reader (NVDA/VoiceOver) can navigate homepage meaningfully

#### Step S6.P1.2 — Keyboard Navigation
- [ ] Tab order must be logical (visual top-left to bottom-right, RTL aware)
- [ ] All dropdown menus navigable with arrow keys (Up/Down) and closeable with Escape
- [ ] Modal dialogs: focus trapped inside, closes with Escape, focus returns to trigger
- [ ] Filter tree: expandable items open with Enter/Space
- [ ] Job cards: entire card is keyboard-focusable with visible focus ring
- [ ] **Verify:** Navigate entire homepage using ONLY keyboard (no mouse)
- [ ] **Confirm:** No keyboard trap anywhere (except intentional modal traps)

***

## SECTION 7 — BROWSER COMPATIBILITY

> **Goal:** Consistent experience across all modern browsers (Chrome, Firefox, Safari, Edge); graceful degradation for older.

### Phase 7.1 — Cross-Browser Fixes

#### Step S7.P1.1 — CSS Feature Detection & Fallbacks
- [ ] Add `@supports` fallbacks for OKLCH colors (convert to `rgb()` fallback)
- [ ] Add `dvh` fallbacks for browsers that don't support it (use `vh` or `100vh`)
- [ ] Test `@layer` support (Tailwind v4 relies on it) in Safari 15+
- [ ] **Verify:** Test on Safari 15+, Firefox 120+, Chrome 120+, Edge 120+
- [ ] **Confirm:** No layout breaks or missing colors in any browser

***

## SECTION 8 — ARCHITECTURE (Single Source of Truth)

> **Goal:** One tool per task, zero duplication, unified patterns across entire codebase.

### Phase 8.1 — Consolidation

#### Step S8.P1.1 — Auth: Single Composable
- [ ] Create `app/composables/useAuth.ts` as the ONLY auth interface
- [ ] Consolidate all auth state, login, logout, user info into this composable
- [ ] Remove all scattered `useUser()`, `useSession()`, etc. — redirect to `useAuth()`
- [ ] **Verify:** Search codebase for `useUser` — should return ZERO results except in `useAuth.ts`

#### Step S8.P1.2 — API: Single Client
- [ ] Create `app/core/api/client.ts` as the ONLY HTTP client
- [ ] All API calls go through this client (no raw `$fetch` in components)
- [ ] Implement request/response interceptors for auth tokens, error handling
- [ ] **Verify:** Search for `$fetch` in `app/components/` and `app/pages/` — should be ZERO

***

## SECTION 9 — FINAL QA & VALIDATION

> **Goal:** Every metric green, every tool passing, production-ready.

### Phase 9.1 — Pre-Deployment Checklist

#### Step S9.P1.1 — Lighthouse Audit (All Pages)
- [ ] Run Lighthouse on `/` (homepage) — target: Performance ≥ 85, Accessibility = 100, Best Practices = 100, SEO = 100
- [ ] Run Lighthouse on `/jobs` — same targets
- [ ] Run Lighthouse on `/jobs/[sample-job]` — same targets
- [ ] Run Lighthouse on `/companies/[sample-company]` — same targets
- [ ] **Verify:** ALL pages meet targets
- [ ] **Confirm:** No red flags in any Lighthouse report

#### Step S9.P1.2 — Cross-Browser Final Test
- [ ] Test on Chrome (Windows + Mac)
- [ ] Test on Firefox (Windows + Linux)
- [ ] Test on Safari (Mac + iOS)
- [ ] Test on Edge (Windows)
- [ ] **Verify:** Identical visual appearance and functionality across all
- [ ] **Confirm:** No console errors in any browser

#### Step S9.P1.3 — Security Headers Final Check
- [ ] Deploy to staging/production
- [ ] Run https://securityheaders.com on deployed URL
- [ ] Target: Grade A or A+
- [ ] **Verify:** All headers present and correct
- [ ] **Confirm:** CSP does not block legitimate resources

#### Step S9.P1.4 — SEO Final Validation
- [ ] Submit sitemap to Google Search Console
- [ ] Test job posting rich snippets in Google Rich Results Test
- [ ] Verify hreflang tags with https://technicalseo.com/tools/hreflang/
- [ ] **Confirm:** Zero errors in all SEO tools

***

## COMPLETION CRITERIA

**This plan is complete when:**

1. ✅ ALL steps in ALL sections marked as `[x]` completed
2. ✅ `.data/improvement-status.json` shows `"completed_steps": ["ALL"]`
3. ✅ Lighthouse scores: Performance ≥ 85, Accessibility = 100, Best Practices = 100, SEO = 100 on ALL pages
4. ✅ SecurityHeaders.com grade: A or A+
5. ✅ Zero WCAG AA violations on axe DevTools
6. ✅ Zero console errors/warnings in Chrome, Firefox, Safari, Edge
7. ✅ Mobile audit `.data/mobile-audit.md` shows ALL issues resolved
8. ✅ All pages tested at 375px, 768px, 1024px, 1280px, 1920px — zero layout breaks
9. ✅ RTL mode tested on ALL pages — perfect mirror layout
10. ✅ Dark mode tested on ALL pages — perfect contrast and readability

**Deployment Readiness:** After all above confirmed, project is production-ready at highest industry standards.

***

## NOTES FOR AI MODELS RESUMING WORK

- **ALWAYS read `.data/improvement-status.json` FIRST** — it tells you exactly where to resume
- **Update status file AFTER EVERY STEP** — not in batches
- **Verify before moving on** — each step has explicit verification instructions
- **Document issues** — if you discover problems, add them to `.data/evidence-log.md`
- **Never skip verification** — "it should work" is not acceptable; TEST IT
- **If blocked** — update status file with `"blocked": true` and reason, then move to next independent step

**This plan is your single source of truth. Follow it systematically. Complete every step. Verify every step.**
