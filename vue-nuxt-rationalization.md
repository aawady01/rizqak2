# Vue/Nuxt Technology Rationalization Report

**Project**: Rizqak — Arabic-first job portal
**Date**: 2026-03-26
**Status**: All rationalization actions completed

---

## Summary

All overlapping tools, duplicate patterns, and unused packages have been identified and resolved. The project now has **one canonical tool per responsibility** with zero overlaps.

---

## Resolved (Completed)

### Packages Removed (4)
| Package | Was Overlapping With | Action |
|---------|---------------------|--------|
| `@vee-validate/zod` | Custom `toTypedSchema.ts` | ✅ Removed |
| `vite-plugin-compression` | `@nuxt-modules/compression` | ✅ Removed |
| `@nuxtjs/device` | `@vueuse/core` (useMediaQuery) | ✅ Removed |
| `nuxt-schema-org` | Custom `useStructuredData` composable | ✅ Removed |

### Files Deleted (1)
| File | Was Overlapping With | Action |
|------|---------------------|--------|
| `app/server/plugins/security-headers.ts` | `nuxt-security` module | ✅ Deleted |

### Security Fix (1)
| File | Issue | Action |
|------|-------|--------|
| `error-handler.client.ts` | innerHTML XSS | ✅ Fixed: createElement + textContent |

### i18n Hardcoded Arabic (13 files)
All hardcoded Arabic strings in components replaced with `$t()` keys:
- 10 Base components (ErrorState, EmptyState, Spinner, Alert, Pagination, SearchInput, FilterHeader, FilterShowMore, Breadcrumb, DisclosureButton)
- 3 Feature components (HomeFeaturedCompanies, TreeBranch, GenderFilter)

### Types Consolidation
| Issue | Action |
|-------|--------|
| Duplicate types in `domain.ts` and `index.ts` | ✅ `index.ts` → barrel file re-exporting from `domain.ts` |
| `useHomepage.ts` type mismatch | ✅ Local interfaces: HomepageCountry, HomepageCompany, HomepageJob |

---

## Current Canonical Tools (No Overlaps)

| Responsibility | Canonical Tool | Status |
|----------------|---------------|--------|
| **Framework** | Nuxt 4.4.2 | ✅ |
| **State management** | Pinia 3.0.4 | ✅ |
| **Data fetching** | Custom apiClient ($fetch wrapper) | ✅ |
| **Server state caching** | Vue Query 5.95.2 (configured, ready) | ✅ |
| **Form validation** | vee-validate 4.15.1 | ✅ |
| **Schema validation** | Zod 4.3.6 | ✅ |
| **Validation bridge** | Custom toTypedSchema.ts | ✅ |
| **CSS framework** | TailwindCSS 4.2.2 | ✅ |
| **Component variants** | CVA 0.7.1 | ✅ |
| **Class merging** | cn() (clsx + tailwind-merge) | ✅ |
| **UI primitives** | Reka UI 2.9.2 | ✅ |
| **Design system** | Custom 36 Base components | ✅ |
| **Icons** | Lucide Vue Next 0.577.0 | ✅ |
| **i18n** | @nuxtjs/i18n 10.2.3 | ✅ |
| **Structured data** | Custom useStructuredData | ✅ |
| **Security** | nuxt-security 2.5.1 | ✅ |
| **Auth sessions** | nuxt-auth-utils 0.5.29 | ✅ |
| **Monitoring** | @sentry/nuxt 10.46.0 | ✅ |
| **Toast notifications** | Vue Sonner 2.0.9 | ✅ |
| **Dark/light mode** | @nuxtjs/color-mode 4.0.0 | ✅ |
| **Images** | @nuxt/image 2.0.0 | ✅ |
| **Fonts** | @nuxt/fonts 0.14.0 | ✅ |
| **PWA** | @vite-pwa/nuxt 1.1.1 | ✅ |
| **SEO** | nuxt-og-image + sitemap + robots + link-checker | ✅ |
| **Content** | @nuxt/content 3.12.0 | ✅ |
| **Testing** | Vitest 4.1.0 + Playwright 1.58.2 | ✅ |
| **Linting** | ESLint 10.0.3 + Vue + a11y plugins | ✅ |
| **Animation** | @formkit/auto-animate 0.9.0 | ✅ |

---

## Packages for Future Integration

| Package | Current State | When to Integrate |
|---------|--------------|-------------------|
| @tanstack/vue-query | Plugin configured, no useQuery calls | When pages grow and caching needed |
| @nuxt/content | Module ready, no content pages | When adding blog/content pages |
| @nuxt/image | Module ready, raw `<img>` used | When adding many images |
| @nuxt/scripts | Module ready, no scripts | When adding GA/tracking |
| @tanstack/vue-table | Installed, not used | When building data tables |
| @tanstack/vue-virtual | Installed, not used | When building long lists |
| debug | Installed, not imported | During development debugging |

---

## Remaining Technical Decisions

| Decision | Question | Priority |
|----------|----------|----------|
| Vite 8 | Wait for Nuxt to upgrade Vite dependency | Low (Nuxt-controlled) |
| Auth tokens | Move from localStorage to httpOnly cookies? | Medium (security) |
| E2E tests | Write Playwright tests for critical flows | Medium (quality) |

---

**Last Updated**: 2026-03-26
**Status**: All rationalization complete. Zero overlaps.
