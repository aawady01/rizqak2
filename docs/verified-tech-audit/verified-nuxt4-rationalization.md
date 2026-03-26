# Verified Nuxt 4 Rationalization

## Project Stage Context

- **Project**: Rizqak — Arabic-first job portal
- **Stage**: Homepage-first / early-stage app
- **Implemented flows**: Homepage + auth scaffold (no backend integration)
- **Rendering**: SPA (`ssr: false`)

---

## Responsibility Matrix

| Responsibility | Canonical Tool | Actual Status | Future-Ready or Active | Overlap? |
|----------------|---------------|---------------|----------------------|----------|
| Framework | Nuxt 4.4.2 | Active | Active | No |
| State Management | Pinia 3.0.4 | Active | Active | No |
| Data Fetching | Custom apiClient | Active | Active | No |
| Server Caching | Vue Query 5.95.2 | Plugin registered | Future-Ready | No |
| Schema Validation | Zod 4.3.6 | Active | Active | No |
| Form Validation | vee-validate 4.15.1 | Active | Active | No |
| CSS Framework | TailwindCSS 4.2.2 | Active Build | Active | No |
| Component Variants | CVA 0.7.1 | Active | Active | No |
| Class Merging | cn() (clsx + tailwind-merge) | Active | Active | No |
| Icons | Lucide Vue Next 0.577.0 | Active | Active | No |
| Notifications | Vue Sonner 2.0.9 | Active | Active | No |
| Animation | Auto Animate 0.9.0 | Active | Active | No |
| i18n | @nuxtjs/i18n 10.2.3 | Active | Active | No |
| Content | @nuxt/content 3.12.0 | Configured | Future-Ready | No |
| Images | @nuxt/image 2.0.0 | Configured | Future-Ready | No |
| Scripts | @nuxt/scripts 0.13.2 | Configured | Future-Ready | No |
| Data Tables | Vue Table 8.21.3 | Installed | Future-Ready | No |
| Virtual Lists | Vue Virtual 3.13.23 | Installed | Future-Ready | No |
| Security | nuxt-security 2.5.1 | Active | Active | No |
| Monitoring | Sentry 10.46.0 | Active | Active | No |
| SEO - OG | nuxt-og-image 6.2.3 | Active | Active | No |
| SEO - Sitemap | @nuxtjs/sitemap 7.6.0 | Active | Active | No |
| SEO - Robots | @nuxtjs/robots 5.7.1 | Active | Active | No |
| SEO - Links | nuxt-link-checker 4.3.9 | Active | Active | No |
| Auth Utils | nuxt-auth-utils 0.5.29 | Configured | Future-Ready | No |
| PWA | @vite-pwa/nuxt 1.1.1 | Active Build | Active | No |

---

## Overlap Analysis

### Confirmed Overlaps: NONE

The prior audit correctly identified and removed overlaps:
- @vee-validate/zod → custom toTypedSchema.ts
- vite-plugin-compression → @nuxt-modules/compression  
- @nuxtjs/device → VueUse useMediaQuery
- nuxt-schema-org → custom useStructuredData composable
- security-headers.ts → nuxt-security module

### Post-Audit Overlaps: NONE

All canonical tools are unique. No tool duplication detected.

---

## Packages for Removal

| Package | Why Remove | Evidence |
|---------|------------|----------|
| debug | Dead code - installed but never imported | grep shows 0 imports in app/ |

---

## Packages to Defer

These packages are justified as future-ready foundations but should NOT be actively integrated until real needs exist:

| Package | Current Status | Why Defer |
|---------|---------------|----------|
| @nuxt/content | Module ready | No content pages (blog, about) |
| @nuxt/image | Configured, no NuxtImg | Still using raw img tags |
| @nuxt/scripts | Module ready | No external scripts (GA, etc.) |
| @tanstack/vue-table | Installed | No data tables needed |
| @tanstack/vue-virtual | Installed | No long lists to virtualize |

---

## Keep/Remove/Defer Decisions

### Keep Now (Fully Justified)

1. **Core**: nuxt, vue, pinia, typescript
2. **Styling**: tailwindcss, @tailwindcss/vite, CVA, cn()
3. **Runtime**: vee-validate, zod, @vueuse/core, lucide-vue-next, vue-sonner, @formkit/auto-animate
4. **i18n**: @nuxtjs/i18n, @nuxtjs/color-mode, @nuxt/fonts
5. **Security**: nuxt-security, @sentry/nuxt
6. **SEO**: nuxt-og-image, @nuxtjs/sitemap, @nuxtjs/robots, nuxt-link-checker
7. **PWA**: @vite-pwa/nuxt

### Keep as Foundation (Future-Ready)

1. **@tanstack/vue-query** - Ready for caching when app complexity grows
2. **nuxt-auth-utils** - Ready for auth flow when backend supports it
3. **better-sqlite3** - Required by @nuxt/content (do not remove)
4. **date-fns** - Date formatting utility (reasonable to keep)

### Remove Now

1. **debug** - Dead code, never imported

### Defer Until Needed

1. **@nuxt/content** - Content pages not part of current MVP
2. **@nuxt/image** - Image optimization not needed yet
3. **@nuxt/scripts** - Analytics/tracking code not needed yet
4. **@tanstack/vue-table** - Data tables not needed yet
5. **@tanstack/vue-virtual** - Virtual lists not needed yet
6. **Content pipeline packages**: parse5, rehype-raw, remark-*, unified, unist-util-visit (only needed when using @nuxt/content actively)

---

## Potential Configuration Issue

### nuxt.config.ts compression property

**Location**: Line 133

**Issue**: `compression: isDev ? { enabled: false } : {}`

This configuration may not be valid for `@nuxt-modules/compression` in Nuxt 4. The module expects different configuration format. This needs verification or may cause build errors.

---

## Impact Assessment

### Homepage-Stage Implications

Given the project is still effectively homepage-first:

- **Low Priority**: Heavy data tools (Vue Table, Vue Virtual)
- **Low Priority**: Content pipeline (Nuxt Content + related parsers)
- **Low Priority**: Image optimization (Nuxt Image)
- **Medium Priority**: Analytics scripts (Nuxt Scripts)

### Risk Summary

| Category | Risk Level | Notes |
|----------|------------|-------|
| Debug package | Low | Dead code, minimal resource impact |
| Configuration error | Medium | compression property may cause build issues |
| Premature dependencies | Low | Only resource overhead, no runtime impact |

---

**Audit Date**: 2026-03-26  
**Confidence**: High  
**Stage Assessment**: Homepage-first, no major architectural issues