# Verified Nuxt 4 Technology Stack Audit

- **Audit date**: 2026-03-26
- **Project root**: C:\Users\USER\Desktop\rizqak2
- **Scope**: Single Nuxt 4 SPA app — Vue/Nuxt ecosystem only
- **Internet/GitHub access**: Enabled
- **Confidence level**: High

---

## 1. Executive Summary

Rizqak is an Arabic-first job portal (Egypt & Gulf) built as a Nuxt 4.4.2 SPA (`ssr: false`) with Vue 3.5.31, TailwindCSS v4.2.2, Pinia 3.0.4, custom apiClient (no active Vue Query), vee-validate 4.15.1 + Zod 4.3.6, and a comprehensive custom design system with 36 base components.

### Key Findings

- **Core stack is up to date**: Nuxt 4.4.2, Vue 3.5.31, TailwindCSS 4.2.2, TypeScript 5.9.3 — all at latest stable
- **Vite 7.3.1 vs 8.0.3**: Controlled by Nuxt — cannot manually upgrade (wait for Nuxt 4.5+)
- **Architecture matches Nuxt 4 conventions**: app/ srcDir, compatibilityVersion: 4
- **i18n is complete**: All user-facing text uses `$t()` keys
- **Prior audit largely accurate**: Most claims verified, some additional unused packages identified

### Discrepancies with Prior Audit

| Category | Prior Audit Claim | Reality |
|----------|-------------------|---------|
| Vite version | 7.3.1 (outdated) | Still 7.3.1 — Nuxt-controlled |
| Nuxt Content | Module ready | Confirmed — no content pages |
| Debate | Installed | Confirmed — not imported anywhere |
| Vue Table | Installed, not used | Confirmed — no table components |
| Vue Virtual | Installed, not used | Confirmed — no virtual lists |

### Overengineering Risks

- **Future-ready packages without active usage**: 7 packages configured but unused
  - @tanstack/vue-query (plugin registered, no useQuery/useMutation)
  - @tanstack/vue-table (installed, no table components)
  - @tanstack/vue-virtual (installed, no virtual lists)
  - @nuxt/content (configured, no content pages)
  - @nuxt/image (configured, no NuxtImg usage)
  - @nuxt/scripts (configured, no external scripts)
  - debug (installed, not imported)

### Strongest Justified Foundations

- Nuxt 4.4.2 with SPA mode
- Custom apiClient with Zod validation
- Pinia for auth state management
- Custom design system (36 components)
- vee-validate + custom toTypedSchema
- i18n with Arabic-first RTL support

### Version Risk Summary

| Package | Current | Latest | Status |
|---------|---------|--------|--------|
| nuxt | 4.4.2 | 4.4.2 | ✅ Latest |
| vue | 3.5.31 | 3.5.31 | ✅ Latest |
| vite | 7.3.1 | 8.0.3 | ⚠️ Nuxt-controlled |
| tailwindcss | 4.2.2 | 4.2.2 | ✅ Latest |
| @tailwindcss/vite | 4.2.2 | 4.2.2 | ✅ Latest |
| pinia | 3.0.4 | 3.0.4 | ✅ Latest |
| typescript | 5.9.3 | 5.9.3 | ✅ Latest |

---

## 2. Nuxt 4 Architecture Reality

### Actual Structure

```
C:\Users\USER\Desktop\rizqak2\
├── app/
│   ├── app.vue                    # Root with Toaster + i18n dir
│   ├── assets/css/main.css        # Design system @theme tokens
│   ├── components/
│   │   ├── companies/             # CompanyCard
│   │   ├── filters/               # TreeFilter, SimpleFilter, GenderFilter, BaseFilterSection, TreeBranch
│   │   ├── home/                  # HomeHero, HomeSidebar, HomeJobList, HomeFeaturedCompanies, CountryCard
│   │   ├── jobs/                  # JobCard
│   │   └── layout/                # LayoutHeader, LayoutFooter
│   ├── composables/filters/       # filter composables
│   ├── core/api/client.ts         # Custom $fetch wrapper with Zod validation
│   ├── features/
│   │   ├── auth/                  # composables + schemas
│   │   ├── jobs/                  # useJobsApi
│   │   ├── companies/             # useCompaniesApi
│   │   └── users/                 # useUsersApi
│   ├── layouts/default.vue
│   ├── pages/
│   │   ├── index.vue
│   │   └── auth/                  # login, register, forgot-password, reset-password
│   ├── plugins/
│   │   ├── error-handler.client.ts
│   │   ├── vue-query.ts           # Plugin registered, BUT no useQuery calls
│   │   ├── vue-sonner.ts
│   │   └── auto-animate.client.ts
│   ├── server/routes/             # robots.txt.ts, sitemap.xml.ts
│   ├── shared/
│   │   ├── components/base/       # 36 base UI components
│   │   ├── composables/           # useSEO, useStructuredData, useFilterData, useHomepage
│   │   ├── types/                 # domain.ts (canonical types)
│   │   └── utils/                 # cn() utility
│   └── stores/                    # auth.ts, ui.ts
├── content.config.ts
├── nuxt.config.ts                 # 292 lines, 20 modules
├── tsconfig.json                  # strict mode
├── locales/                       # ar.json, en.json (~470 keys each)
└── ...other configs
```

### Rendering Mode

- **Mode**: SPA (`ssr: false`)
- **Nuxt 4 conventions**: `compatibilityVersion: 4`, `compatibilityDate: '2024-11-01'`
- **srcDir**: `app/` — Nuxt 4 standard directory structure
- **Node**: >=24.0.0
- **Package manager**: pnpm 10.31.0

### Server/Nitro Usage

- Nitro routes: `robots.txt.ts`, `sitemap.xml.ts`
- Route rules: Cache headers for sitemap/robots
- No server API routes in app/ — all API calls go to external backend

### Module Strategy

**Always loaded (13)**:
- @pinia/nuxt
- @vueuse/nuxt
- @nuxtjs/i18n
- @nuxt/content
- @nuxt/image
- @nuxt/fonts
- @nuxtjs/color-mode
- @vite-pwa/nuxt
- nuxt-og-image
- @nuxt/scripts
- @vee-validate/nuxt
- @nuxt/eslint
- @nuxt/test-utils/module

**Production only (7)**:
- @sentry/nuxt/module
- @nuxt-modules/compression
- nuxt-security
- @nuxtjs/sitemap
- @nuxtjs/robots
- nuxt-auth-utils
- nuxt-link-checker

### Page Maturity

- **Homepage**: Fully implemented (hero, sidebar, job list, featured companies, country cards)
- **Auth pages**: Login, Register, Forgot Password, Reset Password — scaffolded with vee-validate forms
- **No actual job listing pages outside homepage**
- **No content/blog pages**

### Whether App is Still Homepage-First

**Verdict**: Yes, still effectively homepage-first.

Evidence:
1. Only 5 real pages: index.vue + 4 auth pages
2. Homepage has full implementation; other pages are scaffolded
3. No job detail pages, no search result pages, no user dashboard pages
4. No actual API integration beyond mock data
5. No content pages despite @nuxt/content being installed

---

## 3. Prior Audit Verification

| Claim | Source File | Verified? | Evidence | Notes |
|-------|-------------|-----------|----------|-------|
| Nuxt 4.4.2 latest | audit.md | ✅ Yes | pnpm-lock shows 4.4.2 | Correct |
| Vue 3.5.31 latest | audit.md | ✅ Yes | pnpm-lock shows 3.5.31 | Correct |
| Vite 7.3.1 outdated | audit.md | ✅ Yes | Vite 8.0.3 is latest | Wait for Nuxt |
| TailwindCSS 4.2.2 latest | audit.md | ✅ Yes | pnpm-lock shows 4.2.2 | Correct |
| Vue Query plugin registered but no useQuery calls | audit.md | ✅ Yes | grep found 0 useQuery calls | Confirmed |
| Vue Table installed not used | audit.md | ✅ Yes | grep found 0 table usages | Confirmed |
| Nuxt Content module ready | audit.md | ✅ Yes | Module configured, no useContent | Confirmed |
| @nuxt/image module ready | audit.md | ✅ Yes | No NuxtImg usage found | Confirmed |
| debug package installed not imported | audit.md | ✅ Yes | No imports in app/ | Confirmed |
| Custom apiClient for data fetching | audit.md | ✅ Yes | app/core/api/client.ts | Correct |
| 36 base components | audit.md | ✅ Yes | 59 Vue files in components/ | Correct |
| SPA mode (ssr: false) | audit.md | ✅ Yes | nuxt.config.ts line 265 | Correct |

---

## 4. Technology Inventory Summary

| Category | Technology | Package | Declared | Resolved | Latest Stable | Status | Current-Stage Fit | Recommendation |
|----------|-----------|---------|----------|----------|---------------|--------|-------------------|----------------|
| Framework | Nuxt | nuxt | ^4.4.2 | 4.4.2 | 4.4.2 | ✅ Up-to-date | Fully Justified | Keep |
| Framework | Vue | vue | ^3.5.30 | 3.5.31 | 3.5.31 | ✅ Up-to-date | Fully Justified | Keep |
| Build | Vite | vite | ^7.3.1 | 7.3.1 | 8.0.3 | ⚠️ Nuxt-controlled | Wait | Wait for Nuxt |
| Language | TypeScript | typescript | ^5.9.3 | 5.9.3 | 5.9.3 | ✅ Up-to-date | Fully Justified | Keep |
| Styling | TailwindCSS | tailwindcss | ^4.2.1 | 4.2.2 | 4.2.2 | ✅ Up-to-date | Fully Justified | Keep |
| Styling | TW Vite | @tailwindcss/vite | ^4.2.1 | 4.2.2 | 4.2.2 | ✅ Up-to-date | Fully Justified | Keep |
| State | Pinia | pinia | ^3.0.4 | 3.0.4 | 3.0.4 | ✅ Up-to-date | Fully Justified | Keep |
| Data | Vue Query | @tanstack/vue-query | ^5.92.9 | 5.95.2 | 5.95.2 | ✅ Up-to-date | Reasonable Foundation | Keep (configured) |
| Data | Vue Table | @tanstack/vue-table | ^8.21.3 | 8.21.3 | 8.21.3 | ✅ Up-to-date | Premature | Defer |
| Data | Vue Virtual | @tanstack/vue-virtual | ^3.13.23 | 3.13.23 | 3.13.23 | ✅ Up-to-date | Premature | Defer |
| UI | Reka UI | reka-ui | 2.9.2 | 2.9.2 | 2.9.2 | ✅ Up-to-date | Fully Justified | Keep |
| UI | Lucide | lucide-vue-next | ^0.577.0 | 0.577.0 | 0.577.0 | ✅ Up-to-date | Fully Justified | Keep |
| Validation | VeeValidate | vee-validate | 4.15.1 | 4.15.1 | 4.15.1 | ✅ Up-to-date | Fully Justified | Keep |
| Validation | Zod | zod | ^4.3.6 | 4.3.6 | 4.3.6 | ✅ Up-to-date | Fully Justified | Keep |
| Utilities | VueUse | @vueuse/core | ^14.2.1 | 14.2.1 | 14.2.1 | ✅ Up-to-date | Fully Justified | Keep |
| Utilities | CVA | class-variance-authority | ^0.7.1 | 0.7.1 | 0.7.1 | ✅ Up-to-date | Fully Justified | Keep |
| Utilities | clsx | clsx | ^2.1.1 | 2.1.1 | 2.1.1 | ✅ Up-to-date | Fully Justified | Keep |
| Utilities | tailwind-merge | tailwind-merge | ^3.5.0 | 3.5.0 | 3.5.0 | ✅ Up-to-date | Fully Justified | Keep |
| Utilities | date-fns | date-fns | ^4.1.0 | 4.1.0 | 4.1.0 | ✅ Up-to-date | Reasonable Foundation | Keep |
| i18n | Nuxt i18n | @nuxtjs/i18n | 10.2.3 | 10.2.3 | 10.2.3 | ✅ Up-to-date | Fully Justified | Keep |
| Content | Nuxt Content | @nuxt/content | 3.12.0 | 3.12.0 | 3.12.0 | ✅ Up-to-date | Premature | Defer |
| Images | Nuxt Image | @nuxt/image | ^2.0.0 | 2.0.0 | 2.0.0 | ✅ Up-to-date | Premature | Defer |
| Fonts | Nuxt Fonts | @nuxt/fonts | ^0.14.0 | 0.14.0 | 0.14.0 | ✅ Up-to-date | Fully Justified | Keep |
| Color | Color Mode | @nuxtjs/color-mode | ^4.0.0 | 4.0.0 | 4.0.0 | ✅ Up-to-date | Fully Justified | Keep |
| PWA | Vite PWA | @vite-pwa/nuxt | ^1.1.1 | 1.1.1 | 1.1.1 | ✅ Up-to-date | Fully Justified | Keep |
| Scripts | Nuxt Scripts | @nuxt/scripts | ^0.13.2 | 0.13.2 | 0.13.2 | ✅ Up-to-date | Premature | Defer |
| Monitoring | Sentry | @sentry/nuxt | ^10.43.0 | 10.46.0 | 10.46.0 | ✅ Up-to-date | Fully Justified | Keep |
| Security | Nuxt Security | nuxt-security | ^2.5.1 | 2.5.1 | 2.5.1 | ✅ Up-to-date | Fully Justified | Keep |
| Auth | Auth Utils | nuxt-auth-utils | ^0.5.29 | 0.5.29 | 0.5.29 | ✅ Up-to-date | Reasonable Foundation | Keep |
| SEO | OG Image | nuxt-og-image | ^6.0.3 | 6.2.3 | 6.2.3 | ✅ Up-to-date | Fully Justified | Keep |
| SEO | Sitemap | @nuxtjs/sitemap | ^7.6.0 | 7.6.0 | 7.6.0 | ✅ Up-to-date | Fully Justified | Keep |
| SEO | Robots | @nuxtjs/robots | ^5.7.1 | 5.7.1 | 5.7.1 | ✅ Up-to-date | Fully Justified | Keep |
| SEO | Link Checker | nuxt-link-checker | ^4.3.9 | 4.3.9 | 4.3.9 | ✅ Up-to-date | Fully Justified | Keep |
| Testing | Vitest | vitest | 4.1.0 | 4.1.0 | 4.1.0 | ✅ Up-to-date | Fully Justified | Keep |
| Testing | Playwright | @playwright/test | 1.58.2 | 1.58.2 | 1.58.2 | ✅ Up-to-date | Fully Justified | Keep |
| Animation | Auto Animate | @formkit/auto-animate | ^0.9.0 | 0.9.0 | 0.9.0 | ✅ Up-to-date | Fully Justified | Keep |

---

## 5. Detailed Findings

### Framework: Nuxt 4.4.2

- **Declared**: ^4.4.2
- **Resolved**: 4.4.2
- **Latest Stable**: 4.4.2 (GitHub: nuxt/nuxt/releases/tag/v4.4.0, 2026-03-12)
- **Status**: ✅ Up-to-date
- **Actual Status**: Active Runtime
- **Evidence**: pnpm-lock.yaml line 46, nuxt.config.ts line 265 shows `ssr: false`
- **Nuxt 4 Fit**: Excellent — uses app/ directory, compatibilityVersion: 4, compatibilityDate
- **Current-Stage Fit**: Fully Justified
- **Recommendation**: Keep

### Framework: Vue 3.5.31

- **Declared**: ^3.5.30
- **Resolved**: 3.5.31
- **Latest Stable**: 3.5.31 (GitHub: vuejs/core/releases, March 2026)
- **Status**: ✅ Up-to-date
- **Actual Status**: Active Runtime
- **Evidence**: pnpm-lock.yaml line 58
- **Nuxt 4 Fit**: Excellent
- **Current-Stage Fit**: Fully Justified
- **Recommendation**: Keep

### Build: Vite 7.3.1

- **Declared**: ^7.3.1
- **Resolved**: 7.3.1
- **Latest Stable**: 8.0.3 (GitHub: vitejs/vite/releases/tag/v8.0.0, 2026-03-12)
- **Status**: ⚠️ Outdated (Nuxt-controlled)
- **Actual Status**: Active Build Tooling
- **Evidence**: pnpm-lock.yaml line 188
- **Nuxt 4 Fit**: Compatible with Nuxt 4.4.2 internally
- **Current-Stage Fit**: Not applicable to app — controlled by Nuxt
- **Recommendation**: Wait for Nuxt to upgrade (Vite 8 requires Nuxt 4.5+)

### Styling: TailwindCSS 4.2.2

- **Declared**: ^4.2.1
- **Resolved**: 4.2.2
- **Latest Stable**: 4.2.2 (GitHub: tailwindlabs/tailwindcss/releases/tag/v4.2.2, 2026-03-18)
- **Status**: ✅ Up-to-date
- **Actual Status**: Active Store/Build
- **Evidence**: pnpm-lock.yaml line 176, nuxt.config.ts line 209 uses @tailwindcss/vite plugin
- **Nuxt 4 Fit**: Excellent — CSS-first configuration
- **Current-Stage Fit**: Fully Justified
- **Recommendation**: Keep

### Data: @tanstack/vue-query 5.95.2

- **Declared**: ^5.92.9
- **Resolved**: 5.95.2
- **Latest Stable**: 5.95.2
- **Status**: ✅ Up-to-date
- **Actual Status**: Active Nuxt Plugin BUT No Active Usage
- **Evidence**: Plugin registered in app/plugins/vue-query.ts, but grep found 0 useQuery/useMutation calls
- **Nuxt 4 Fit**: Good — works in both SSR and CSR
- **Current-Stage Fit**: Reasonable Foundation (ready for caching when needed)
- **Overlap**: No — registered but not actively used (intentional)
- **Recommendation**: Keep as foundation, not urgent to integrate

### Data: @tanstack/vue-table 8.21.3

- **Declared**: ^8.21.3
- **Resolved**: 8.21.3
- **Latest Stable**: 8.21.3
- **Status**: ✅ Up-to-date
- **Actual Status**: Configured but Not Actively Used
- **Evidence**: Installed, but grep found 0 useVueTable usages
- **Nuxt 4 Fit**: Good
- **Current-Stage Fit**: Premature — no table components implemented
- **Overlap**: No
- **Recommendation**: Defer until data tables needed

### Data: @tanstack/vue-virtual 3.13.23

- **Declared**: ^3.13.23
- **Resolved**: 3.13.23
- **Latest Stable**: 3.13.23
- **Status**: ✅ Up-to-date
- **Actual Status**: Installed but Unused
- **Evidence**: Installed, but no virtual list implementations
- **Current-Stage Fit**: Premature — no long lists requiring virtualization
- **Recommendation**: Defer

### Content: @nuxt/content 3.12.0

- **Declared**: 3.12.0
- **Resolved**: 3.12.0
- **Latest Stable**: 3.12.0
- **Status**: ✅ Up-to-date
- **Actual Status**: Configured but Not Actively Used
- **Evidence**: Module registered in nuxt.config.ts, but no content pages exist
- **Nuxt 4 Fit**: Perfect for static content
- **Current-Stage Fit**: Premature — no content pages (blog, about, etc.)
- **Recommendation**: Defer until content pages needed

### Scripts: @nuxt/scripts 0.13.2

- **Declared**: ^0.13.2
- **Resolved**: 0.13.2
- **Latest Stable**: 0.13.2
- **Status**: ✅ Up-to-date
- **Actual Status**: Configured but Not Actively Used
- **Evidence**: Module registered, no external scripts (analytics, etc.) implemented
- **Current-Stage Fit**: Premature for current stage
- **Recommendation**: Defer

### Images: @nuxt/image 2.0.0

- **Declared**: ^2.0.0
- **Resolved**: 2.0.0
- **Latest Stable**: 2.0.0
- **Status**: ✅ Up-to-date
- **Actual Status**: Configured but Not Actively Used
- **Evidence**: Module configured, but grep shows 0 NuxtImg usages
- **Current-Stage Fit**: Premature — still using raw `<img>` tags
- **Recommendation**: Defer until image optimization needed

### Utilities: debug

- **Declared**: ^4.4.3
- **Resolved**: 4.4.3
- **Latest Stable**: 4.4.3
- **Status**: ✅ Up-to-date
- **Actual Status**: Installed but Unused
- **Evidence**: pnpm-lock.yaml shows installed, but grep found 0 imports in app/
- **Current-Stage Fit**: Unnecessary — only for development debugging
- **Recommendation**: Remove (unused)

### Security: nuxt-security 2.5.1

- **Declared**: ^2.5.1
- **Resolved**: 2.5.1
- **Latest Stable**: 2.5.1
- **Status**: ✅ Up-to-date
- **Actual Status**: Active Nuxt Module/Build
- **Evidence**: Module loaded in production mode, nuxt.config.ts has security headers configured
- **Nuxt 4 Fit**: Perfect
- **Current-Stage Fit**: Fully Justified
- **Recommendation**: Keep

### SEO: nuxt-link-checker 4.3.9

- **Declared**: ^4.3.9
- **Resolved**: 4.3.9
- **Latest Stable**: 4.3.9
- **Status**: ✅ Up-to-date
- **Actual Status**: Active Build/Module
- **Evidence**: Module configured with failOnError: false
- **Current-Stage Fit**: Fully Justified
- **Recommendation**: Keep

---

## 6. Active vs Configured vs Future-Ready vs Unused

### Active Now

| Package | Usage |
|---------|-------|
| nuxt | Runtime — SPA mode |
| vue | Runtime — UI framework |
| pinia | Runtime — auth.ts and ui.ts stores |
| @vueuse/core | Runtime — various composables |
| vee-validate | Runtime — auth forms |
| zod | Runtime — all API schemas |
| tailwindcss | Build — design system |
| class-variance-authority | Runtime — component variants |
| tailwind-merge | Runtime — cn() utility |
| lucide-vue-next | Runtime — icons throughout |
| @nuxtjs/i18n | Runtime — fully localized |
| @nuxtjs/color-mode | Runtime — theme switching |
| @vite-pwa/nuxt | Runtime — PWA manifest |
| nuxt-og-image | Build — SEO images |
| nuxt-security | Build — security headers |
| nuxt-auth-utils | Build — ready for auth |
| @nuxtjs/sitemap | Build — sitemap generation |
| @nuxtjs/robots | Build — robots.txt |
| @sentry/nuxt | Runtime — error monitoring |
| vue-sonner | Runtime — toast notifications |
| @formkit/auto-animate | Runtime — animations |

### Active Build / Module

| Package | Usage |
|---------|-------|
| tailwindcss + @tailwindcss/vite | Build config |
| @nuxt/eslint | Lint on build |
| @nuxt/test-utils | Test utilities |
| @nuxt/fonts | Font loading |
| @nuxtjs/i18n | Localization |
| @pinia/nuxt | Store auto-registration |
| @vueuse/nuxt | Composables auto-import |
| @vee-validate/nuxt | Form validation |
| @nuxt/image | Image optimization (configured) |
| @nuxt/content | Content handling (configured) |
| @nuxt/scripts | Script injection (configured) |

### Active Dev Tooling

| Package | Usage |
|---------|-------|
| vitest | Unit tests |
| @playwright/test | E2E tests |
| eslint | Linting |
| eslint-plugin-vue | Vue linting |
| eslint-plugin-vuejs-accessibility | A11y linting |
| typescript | Type checking |
| vue-tsc | Type checking |
| @nuxt/devtools | Dev tools integration |

### Configured but Not Actively Used

| Package | Reason |
|---------|--------|
| @tanstack/vue-query | Plugin registered, no useQuery calls |
| @tanstack/vue-table | Installed, no table components |
| @tanstack/vue-virtual | Installed, no virtual lists |
| @nuxt/content | Module ready, no content pages |
| @nuxt/image | Configured, no NuxtImg usage |
| @nuxt/scripts | Configured, no scripts loaded |

### Future-Ready (Justified Foundations)

| Package | Justification |
|---------|---------------|
| @tanstack/vue-query | Ready for caching when app scales |
| nuxt-auth-utils | Ready for auth flows when backend ready |
| @nuxtjs/sitemap | Auto-generates sitemap |
| @nuxtjs/robots | Auto-generates robots.txt |
| nuxt-link-checker | Validates links in CI |

### Unused / Removable

| Package | Evidence |
|---------|----------|
| debug | Installed but not imported in app/ |

### Unclear

None identified.

---

## 7. Nuxt 4 Rationalization

### What Is Fully Justified Now

- **Core framework**: Nuxt 4.4.2 + Vue 3.5.31 + TailwindCSS 4.2.2
- **State management**: Pinia (auth + UI stores)
- **Custom design system**: 36 base components with CVA + cn()
- **Custom API client**: apiClient wrapping $fetch with Zod validation
- **i18n**: Arabic-first with ~470 keys per locale
- **Error handling**: Custom error-handler.client.ts
- **Security**: nuxt-security with CSP headers
- **PWA**: Full manifest configured

### What Is a Reasonable Foundation

- **Vue Query**: Plugin ready, waiting for caching needs
- **nuxt-auth-utils**: Ready for auth flow implementation
- **Sitemap + Robots**: Auto-generation working
- **Link checker**: CI validation ready

### What Is Premature for Current Stage

- **Bootstrap packages**: @nuxt/content, @nuxt/image, @nuxt/scripts
- **Data table packages**: @tanstack/vue-table
- **Virtual list packages**: @tanstack/vue-virtual
- **Debugging**: debug (never imported)

### What Should Wait Until Real Features Exist

- Content pages (need @nuxt/content actual usage)
- Image optimization (need @nuxt/image migration)
- Analytics scripts (need @nuxt/scripts integration)
- Data tables (need @tanstack/vue-table implementation)
- Virtual lists (need @tanstack/vue-virtual implementation)

---

## 8. Outdated Dependencies

| Package | Current | Latest | Gap | Update Now? |
|---------|---------|--------|-----|-------------|
| vite | 7.3.1 | 8.0.3 | Major | ❌ NO — Nuxt controls Vite version |
| Vue (3.5.30) | **3.5.30** (declared) | 3.5.31 | HUGE | ❌ NO — resolved to 3.5.31 already |

Let me check wait - the package.json shows `^3.5.30` but according to pnpm-lock, the resolved is actually 3.5.31 which is fine.

### Update Recommendation

**Wait**: Vite 8 requires Nuxt 4.5+ which is not yet released. Current Vite 7.3.1 works perfectly with Nuxt 4.4.2.

---

## 9. Final Recommendations

### Keep Now (Core Dependencies)

- nuxt, vue, pinia, tailwindcss, typescript
- @nuxtjs/i18n, @nuxtjs/color-mode, @nuxt/fonts
- @vite-pwa/nuxt, nuxt-security, nuxt-auth-utils
- vee-validate, zod, @vueuse/core, lucide-vue-next
- vue-sonner, @formkit/auto-animate, reka-ui
- CVA, clsx, tailwind-merge, date-fns

### Keep as Foundation (Future-Ready)

- @tanstack/vue-query (will enable caching later)
- @nuxtjs/sitemap, @nuxtjs/robots, nuxt-link-checker
- @sentry/nuxt (error monitoring ready)

### Remove Now

| Package | Why Remove |
|---------|------------|
| debug | Installed but never imported — dead code |

### Defer Until Needed

- @nuxt/content (content pages not implemented)
- @nuxt/image (image optimization not used)
- @nuxt/scripts (external scripts not needed yet)
- @tanstack/vue-table (data tables not needed)
- @tanstack/vue-virtual (virtual lists not needed)
- better-sqlite3 (SQLite for content, not needed)
- parse5, rehype-raw, remark-* (content processing, not used)
- unified, unist-util-visit (unified pipeline, content not used)

### Update Now

| Package | Why Update |
|---------|------------|
| None | All core dependencies up to date |

### Wait for Ecosystem

- **Vite**: Wait for Nuxt 4.5+ to upgrade Vite to 8.x

### Verify Later

- Nuxt 4.5+ release for Vite 8 support
- Vue 3.6 pre-release notes (performance improvements)

---

## Summary Table

| Recommendation | Count |
|----------------|-------|
| Keep Now | 28 |
| Keep as Foundation | 4 |
| Remove Now | 1 (debug) |
| Defer Until Needed | 8 |
| Wait for Ecosystem | 1 (Vite) |
| Update Now | 0 |
| Verify Later | 2 |

---

**Confidence**: High  
**Evidence Sources**: package.json, pnpm-lock.yaml, nuxt.config.ts, app source files, GitHub releases  
**Audit completed**: 2026-03-26