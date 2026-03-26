# Vue/Nuxt Technology Stack Audit

- **Audit date**: 2026-03-26
- **Project root**: `C:\Users\USER\Desktop\rizqak2`
- **Project name**: Rizqak — Arabic-first job portal
- **Scope audited**: Single Nuxt 4 SPA app — Vue/Nuxt ecosystem only
- **Internet/GitHub access**: Enabled
- **Confidence level**: High

---

## 1. Executive Summary

Rizqak is an Arabic-first job portal (Egypt & Gulf) built as a **Nuxt 4.4.2 SPA** (ssr: false) with Vue 3.5.31, TailwindCSS v4.2.2, Pinia 3.0.4, TanStack Vue Query 5.95.2, Reka UI headless components, and a comprehensive custom design system with 36 base components.

### Key Findings
- **Core stack is fully up to date**: Nuxt 4.4.2, Vue 3.5.31, TailwindCSS 4.2.2, TypeScript 5.9.3 — all at latest stable
- **Only 1 outdated**: Vite 7.3.1 vs 8.0.3 — controlled by Nuxt, cannot manually upgrade
- **Architecture is strong**: Feature-based folder structure, typed API client, CVA + cn() design system
- **i18n is complete**: All user-facing text uses `$t()` keys, 25+ keys added
- **Types consolidated**: No more duplicate type definitions
- **Security improved**: XSS vector in error-handler fixed

### Cleanup Done in This Audit
- 4 packages removed: `@vee-validate/zod`, `vite-plugin-compression`, `@nuxtjs/device`, `nuxt-schema-org`
- 1 file deleted: `app/server/plugins/security-headers.ts`
- 6 packages updated: vue, tailwindcss, @tanstack/vue-query, @sentry/nuxt, @tailwindcss/vite, nuxt-og-image
- 13 files fixed for i18n (all hardcoded Arabic → `$t()` keys)
- 1 XSS vulnerability fixed
- Types consolidated (index.ts → barrel file from domain.ts)
- `package.json` engines updated to `>=24.0.0`

---

## 2. Repository Map

```
rizqak2/
├── app/                          # Nuxt 4 srcDir
│   ├── app.vue                   # Root: RTL dir, i18n, Toaster, NuxtAnnouncer
│   ├── assets/css/main.css       # Design system: @theme tokens, dark mode, RTL
│   ├── components/
│   │   ├── companies/            # CompanyCard
│   │   ├── filters/              # TreeFilterSection, SimpleFilter, GenderFilter, BaseFilterSection, TreeBranch
│   │   ├── home/                 # HomeHero, HomeSidebar, HomeJobList, HomeFeaturedCompanies, CountryCard
│   │   ├── jobs/                 # JobCard
│   │   └── layout/               # LayoutHeader, LayoutFooter
│   ├── composables/filters/      # useFilterPagination, useFilterSearch, useTreeSelection, useFlatSelection
│   ├── core/api/client.ts        # Custom $fetch API client with Zod validation
│   ├── features/
│   │   ├── auth/                 # composables/useAuthApi.ts + schemas (login, register, forgot, reset)
│   │   ├── jobs/                 # composables/useJobsApi.ts
│   │   ├── companies/            # composables/useCompaniesApi.ts
│   │   └── users/                # composables/useUsersApi.ts
│   ├── layouts/default.vue       # Skip-link, header, footer
│   ├── pages/                    # index.vue, auth/ (login, register, forgot, reset)
│   ├── plugins/                  # vue-query, vue-sonner, auto-animate, error-handler
│   ├── server/
│   │   ├── plugins/              # (security-headers.ts deleted)
│   │   ├── routes/               # robots.txt.ts, sitemap.xml.ts
│   │   └── utils/seo.ts          # Site URL, XML helpers
│   ├── shared/
│   │   ├── components/base/      # 36 base UI components (shadcn-inspired)
│   │   ├── composables/          # useSEO, useStructuredData, useFilterData, useHomepage
│   │   ├── types/                # domain.ts (canonical), index.ts (barrel)
│   │   └── utils/                # tailwind.ts (cn), toTypedSchema, mockData, string
│   └── stores/                   # Pinia: auth.ts, ui.ts
├── content.config.ts             # @nuxt/content collections
├── docs/                         # STANDARDS.md, CHECKPOINT.md, PHASE_COMPLETION_LOG.md
├── eslint.config.mjs             # ESLint flat config + a11y plugin
├── i18n/                         # i18n module config
├── locales/                      # ar.json (~470 keys), en.json (~470 keys)
├── nuxt.config.ts                # Main config (293 lines)
├── playwright.config.ts          # E2E config (no tests yet)
├── pnpm-lock.yaml                # Lockfile
├── public/                       # favicon.svg, images/
├── scripts/                      # token-compliance-audit, visual-baseline-manifest
├── sentry.client.config.ts       # Sentry client init
├── sentry.server.config.ts       # Sentry server init
├── test/e2e/                     # Empty
├── tsconfig.json                 # Strict TypeScript
└── vitest.config.ts              # Vitest with Nuxt env
```

---

## 3. Inventory Summary

| Category | Technology | Package | Scope | Declared | Resolved | Latest Stable | Status | Risk | Rec |
|----------|-----------|---------|-------|----------|----------|--------------|--------|------|-----|
| Framework | Nuxt | nuxt | runtime | ^4.4.2 | 4.4.2 | 4.4.2 | ✅ Latest | Low | Keep |
| Framework | Vue | vue | runtime | ^3.5.30 | 3.5.31 | 3.5.31 | ✅ Latest | Low | Keep |
| Build | Vite | vite | build | ^7.3.1 | 7.3.1 | 8.0.3 | ⚠️ Outdated | Med | Wait |
| Language | TypeScript | typescript | dev | ^5.9.3 | 5.9.3 | 5.9.3 | ✅ Latest | Low | Keep |
| Styling | TailwindCSS | tailwindcss | dev | ^4.2.1 | 4.2.2 | 4.2.2 | ✅ Latest | Low | Keep |
| Styling | TW Vite Plugin | @tailwindcss/vite | dev | ^4.2.1 | 4.2.2 | 4.2.2 | ✅ Latest | Low | Keep |
| State | Pinia | pinia | runtime | ^3.0.4 | 3.0.4 | 3.0.4 | ✅ Latest | Low | Keep |
| Data | Vue Query | @tanstack/vue-query | runtime | ^5.92.9 | 5.95.2 | 5.95.2 | ✅ Latest | Low | Keep |
| Data | Vue Table | @tanstack/vue-table | runtime | ^8.21.3 | 8.21.3 | 8.21.3 | ✅ Latest | Low | Keep |
| UI | Reka UI | reka-ui | dev | 2.9.2 | 2.9.2 | 2.9.2 | ✅ Latest | Low | Keep |
| UI | Lucide | lucide-vue-next | runtime | ^0.577.0 | 0.577.0 | 0.577.0 | ✅ Latest | Low | Keep |
| Validation | VeeValidate | vee-validate | runtime | 4.15.1 | 4.15.1 | 4.15.1 | ✅ Latest | Low | Keep |
| Validation | Zod | zod | runtime | ^4.3.6 | 4.3.6 | 4.3.6 | ✅ Latest | Low | Keep |
| Utilities | VueUse | @vueuse/core | runtime | ^14.2.1 | 14.2.1 | 14.2.1 | ✅ Latest | Low | Keep |
| Utilities | CVA | class-variance-authority | runtime | ^0.7.1 | 0.7.1 | 0.7.1 | ✅ Latest | Low | Keep |
| Utilities | clsx | clsx | runtime | ^2.1.1 | 2.1.1 | 2.1.1 | ✅ Latest | Low | Keep |
| Utilities | tailwind-merge | tailwind-merge | runtime | ^3.5.0 | 3.5.0 | 3.5.0 | ✅ Latest | Low | Keep |
| Utilities | date-fns | date-fns | runtime | ^4.1.0 | 4.1.0 | 4.1.0 | ✅ Latest | Low | Keep |
| Animation | Auto Animate | @formkit/auto-animate | runtime | ^0.9.0 | 0.9.0 | 0.9.0 | ✅ Latest | Low | Keep |
| Notifications | Vue Sonner | vue-sonner | runtime | ^2.0.9 | 2.0.9 | 2.0.9 | ✅ Latest | Low | Keep |
| i18n | Nuxt i18n | @nuxtjs/i18n | dev | 10.2.3 | 10.2.3 | 10.2.3 | ✅ Latest | Low | Keep |
| Content | Nuxt Content | @nuxt/content | dev | 3.12.0 | 3.12.0 | 3.12.0 | ✅ Latest | Low | Keep |
| Images | Nuxt Image | @nuxt/image | dev | ^2.0.0 | 2.0.0 | 2.0.0 | ✅ Latest | Low | Keep |
| Fonts | Nuxt Fonts | @nuxt/fonts | dev | ^0.14.0 | 0.14.0 | 0.14.0 | ✅ Latest | Low | Keep |
| Color | Color Mode | @nuxtjs/color-mode | dev | ^4.0.0 | 4.0.0 | 4.0.0 | ✅ Latest | Low | Keep |
| PWA | Vite PWA | @vite-pwa/nuxt | dev | ^1.1.1 | 1.1.1 | 1.1.1 | ✅ Latest | Low | Keep |
| Scripts | Nuxt Scripts | @nuxt/scripts | dev | ^0.13.2 | 0.13.2 | 0.13.2 | ✅ Latest | Low | Keep |
| Monitoring | Sentry | @sentry/nuxt | runtime | ^10.43.0 | 10.46.0 | 10.46.0 | ✅ Latest | Low | Keep |
| Security | Nuxt Security | nuxt-security | dev | ^2.5.1 | 2.5.1 | 2.5.1 | ✅ Latest | Low | Keep |
| Auth | Nuxt Auth Utils | nuxt-auth-utils | dev | ^0.5.29 | 0.5.29 | 0.5.29 | ✅ Latest | Low | Keep |
| SEO | OG Image | nuxt-og-image | dev | ^6.0.3 | 6.2.3 | 6.2.3 | ✅ Latest | Low | Keep |
| SEO | Sitemap | @nuxtjs/sitemap | dev | ^7.6.0 | 7.6.0 | 7.6.0 | ✅ Latest | Low | Keep |
| SEO | Robots | @nuxtjs/robots | dev | ^5.7.1 | 5.7.1 | 5.7.1 | ✅ Latest | Low | Keep |
| SEO | Link Checker | nuxt-link-checker | dev | ^4.3.9 | 4.3.9 | 4.3.9 | ✅ Latest | Low | Keep |
| Testing | Vitest | vitest | dev | 4.1.0 | 4.1.0 | 4.1.0 | ✅ Latest | Low | Keep |
| Testing | Playwright | @playwright/test | dev | 1.58.2 | 1.58.2 | 1.58.2 | ✅ Latest | Low | Keep |
| Linting | ESLint | eslint | dev | 10.0.3 | 10.0.3 | 10.0.3 | ✅ Latest | Low | Keep |
| Linting | ESLint Vue | eslint-plugin-vue | dev | 10.8.0 | 10.8.0 | 10.8.0 | ✅ Latest | Low | Keep |
| Linting | A11y ESLint | eslint-plugin-vuejs-accessibility | dev | ^2.5.0 | 2.5.0 | 2.5.0 | ✅ Latest | Low | Keep |
| Type Check | vue-tsc | vue-tsc | dev | ^3.2.6 | 3.2.6 | 3.2.6 | ✅ Latest | Low | Keep |

---

## 4. Architecture Findings

### Nuxt App Architecture
- **Mode**: SPA (`ssr: false`) — Client-side rendering
- **srcDir**: `app/` (Nuxt 4 convention)
- **Node**: >=24.0.0
- **Compatibility**: `compatibilityVersion: 4`, `compatibilityDate: '2024-11-01'`

### Modules (20 total)
- **Always loaded** (13): pinia, vueuse, i18n, content, image, fonts, color-mode, pwa, og-image, scripts, vee-validate, eslint, test-utils
- **Production only** (7): sentry, compression, security, sitemap, robots, auth-utils, link-checker

### Server Usage
- Nitro routes: `robots.txt.ts`, `sitemap.xml.ts`
- Route rules: Cache headers for sitemap/robots
- compressPublicAssets: enabled

### Data Fetching
- **Primary**: Custom `apiClient` class wrapping `$fetch` (used in all feature composables)
- **Configured but unused**: Vue Query (plugin registered, no useQuery calls yet)
- **Available**: Nuxt `useFetch`/`useAsyncData` (not used for API calls)

### Design System
- 36 Base components (shadcn/ui-inspired)
- CVA for variants, cn() for class merging
- TailwindCSS v4 CSS-first @theme tokens
- RTL-first with logical properties
- Dark mode via `html.dark` overrides

### i18n
- Arabic (ar, RTL) default, English (en, LTR) secondary
- `prefix_except_default` strategy
- ~470 keys in each locale file
- All user-facing text uses `$t()` — zero hardcoded Arabic in components

---

## 5. Changes Made in This Audit

### Packages Removed (4)
| Package | Reason |
|---------|--------|
| `@vee-validate/zod` | Unused — custom toTypedSchema.ts replaces it |
| `vite-plugin-compression` | Unused — @nuxt-modules/compression handles it |
| `@nuxtjs/device` | Unused — VueUse useMediaQuery replaces it |
| `nuxt-schema-org` | Unused — custom useStructuredData composable handles it |

### Packages Updated (6)
| Package | Before | After |
|---------|--------|-------|
| vue | 3.5.30 | 3.5.31 |
| tailwindcss | 4.2.1 | 4.2.2 |
| @tailwindcss/vite | 4.2.1 | 4.2.2 |
| @tanstack/vue-query | 5.92.9 | 5.95.2 |
| @sentry/nuxt | 10.43.0 | 10.46.0 |
| nuxt-og-image | 6.0.3 | 6.2.3 |

### Files Deleted (1)
| File | Reason |
|------|--------|
| `app/server/plugins/security-headers.ts` | nuxt-security module provides same functionality |

### Config Changes
| File | Change |
|------|--------|
| `nuxt.config.ts` | Removed `@nuxtjs/device` module + `device: {}` config |
| `nuxt.config.ts` | Removed `nuxt-schema-org` module + `schemaOrg: {}` config |
| `package.json` | Updated `engines.node` to `>=24.0.0` |

### i18n Fixes (13 files, 25+ strings)
| File | Strings Fixed |
|------|--------------|
| `HomeFeaturedCompanies.vue` | title, subtitle, prev/next aria-labels |
| `TreeBranch.vue` | expand/collapse group labels |
| `GenderFilter.vue` | title, options (all/male/female), aria-label |
| `BaseErrorState.vue` | title, description, retry button |
| `BaseEmptyState.vue` | title, description |
| `BaseSpinner.vue` | loading label |
| `BaseAlert.vue` | close button aria-label |
| `BasePagination.vue` | nav aria-label |
| `BaseSearchInput.vue` | placeholder, ariaLabel, clear button |
| `BaseFilterHeader.vue` | search placeholder |
| `BaseFilterShowMore.vue` | show more/less text + aria-labels |
| `BaseBreadcrumb.vue` | nav aria-label |
| `BaseDisclosureButton.vue` | expand/collapse defaults |

### Security Fix
| File | Issue | Fix |
|------|-------|-----|
| `error-handler.client.ts` | `innerHTML` — XSS vector | `createElement` + `textContent` |

### Type Consolidation
| File | Change |
|------|--------|
| `shared/types/index.ts` | Removed duplicate Country/Company/Job/User types, now barrel file from domain.ts |
| `shared/composables/useHomepage.ts` | Local interfaces: HomepageCountry, HomepageCompany, HomepageJob |

---

## 6. Overlap and Rationalization

| Responsibility | Tool in Project | Status |
|----------------|----------------|--------|
| State management | Pinia 3.0.4 | ✅ Canonical — no alternatives |
| Data fetching | Custom apiClient | ✅ Canonical — Vue Query ready when needed |
| Form validation | vee-validate + custom toTypedSchema | ✅ Canonical |
| Schema validation | Zod v4 | ✅ Canonical |
| UI components | Reka UI + custom design system | ✅ Canonical |
| Icons | Lucide Vue Next | ✅ Canonical |
| Structured data | Custom useStructuredData | ✅ Canonical |
| Security | nuxt-security module | ✅ Canonical (custom plugin removed) |
| CSS styling | TailwindCSS v4 + CVA + cn() | ✅ Canonical |
| i18n | @nuxtjs/i18n | ✅ Canonical |
| Toasts | Vue Sonner | ✅ Canonical |
| Monitoring | Sentry | ✅ Canonical |

**No overlapping tools remain.**

---

## 7. Outdated Dependencies

| Package | Current | Latest | Gap | Action |
|---------|---------|--------|-----|--------|
| vite | 7.3.1 | 8.0.3 | Major | Wait for Nuxt to upgrade — do NOT manually override |

---

## 8. Packages for Future Use (Registered but No Active Usage)

| Package | Status | Purpose |
|---------|--------|---------|
| @nuxt/content | Ready | Markdown content pages (future) |
| @nuxt/image | Ready | Image optimization (migrate `<img>` to `<NuxtImg>` when needed) |
| @nuxt/scripts | Ready | External scripts (GA, tracking — future) |
| @tanstack/vue-table | Ready | Data tables (job listings, admin — future) |
| @tanstack/vue-virtual | Ready | Virtual lists (long job search results — future) |
| @tanstack/vue-query | Ready | Server state caching (integrate into composables when needed) |
| debug | Ready | Development debugging |

---

## 9. Project Status

**Node**: >=24.0.0
**pnpm**: 10.31.0
**Audit completed**: 2026-03-26
**All checks passed**: ✅
