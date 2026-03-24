# SOURCE OF TRUTH MAP — Rizqak2

> **هذا الملف هو المرجع النهائي لمعرفة مين بيملك إيه في المشروع.**
> **أي AI model لازم يقرأ الملف ده قبل أي شغل.**

**Last Updated**: 2026-03-17

---

## 1. Design Tokens

| البند | المصدر | المسار |
|-------|--------|--------|
| ALL tokens (colors, spacing, typography, shadows, z-index, transitions) | **CANONICAL** | `app/assets/css/main.css` |
| @theme block (Tailwind v4) | **CANONICAL** | `app/assets/css/main.css` (lines 1-280) |
| Semantic colors (:root) | **CANONICAL** | `app/assets/css/main.css` (lines 285-400) |
| Dark mode overrides (html.dark) | **CANONICAL** | `app/assets/css/main.css` (lines 400-500) |
| Utility classes | **CANONICAL** | `app/assets/css/main.css` (lines 1400+) |

**لا توجد مصدر آخر للـ tokens.** أي hardcoded value في component = خطأ.

---

## 2. Base UI Components

| البند | المصدر | المسار |
|-------|--------|--------|
| ALL 36 base components | **CANONICAL** | `app/shared/components/base/` |
| BaseButton | **CANONICAL** | `app/shared/components/base/BaseButton.vue` |
| BaseCard | **CANONICAL** | `app/shared/components/base/BaseCard.vue` |
| BaseInput | **CANONICAL** | `app/shared/components/base/BaseInput.vue` |
| BaseTypography | **CANONICAL** | `app/shared/components/base/BaseTypography.vue` |
| BaseDialog | **CANONICAL** | `app/shared/components/base/BaseDialog.vue` |
| BaseBadge | **CANONICAL** | `app/shared/components/base/BaseBadge.vue` |
| BaseBreadcrumb | **CANONICAL** | `app/shared/components/base/BaseBreadcrumb.vue` |
| BaseAlert | **CANONICAL** | `app/shared/components/base/BaseAlert.vue` |
| BaseSpinner | **CANONICAL** | `app/shared/components/base/BaseSpinner.vue` |
| BaseEmptyState | **CANONICAL** | `app/shared/components/base/BaseEmptyState.vue` |
| BaseErrorState | **CANONICAL** | `app/shared/components/base/BaseErrorState.vue` |
| BaseSkeleton | **CANONICAL** | `app/shared/components/base/BaseSkeleton.vue` |
| BaseModal | **DELETED** | ~~`app/shared/components/base/BaseModal.vue`~~ — استخدم BaseDialog |

**لا يوجد مصدر آخر للـ base components.** ~~`app/components/base/`~~ محذوف.

---

## 3. App/Section Components

| البند | المصدر | المسار |
|-------|--------|--------|
| Layout (Header/Footer) | **CANONICAL** | `app/components/layout/` |
| Homepage sections | **CANONICAL** | `app/components/home/` |
| Job card | **CANONICAL** | `app/components/jobs/JobCard.vue` |
| Company card | **CANONICAL** | `app/components/companies/CompanyCard.vue` |
| Filter components | **CANONICAL** | `app/components/filters/` |

---

## 4. Shared Composables

| البند | المصدر | المسار |
|-------|--------|--------|
| SEO | **CANONICAL** | `app/shared/composables/useSEO.ts` |
| Structured Data | **CANONICAL** | `app/shared/composables/useStructuredData.ts` |
| Homepage data | **CANONICAL** | `app/shared/composables/useHomepage.ts` |
| Filter data | **CANONICAL** | `app/shared/composables/useFilterData.ts` |

---

## 5. Feature Composables

| البند | المصدر | المسار |
|-------|--------|--------|
| Auth API | **CANONICAL** | `app/features/auth/composables/useAuthApi.ts` |
| Jobs API | **CANONICAL** | `app/features/jobs/composables/useJobsApi.ts` |
| Companies API | **CANONICAL** | `app/features/companies/composables/useCompaniesApi.ts` |
| Users API | **CANONICAL** | `app/features/users/composables/useUsersApi.ts` |

---

## 6. Validation Schemas (Zod v4)

| البند | المصدر | المسار |
|-------|--------|--------|
| ALL schemas | **CANONICAL** | `app/features/auth/schemas/` |
| Login schema | **CANONICAL** | `app/features/auth/schemas/loginSchema.ts` |
| Register schema | **CANONICAL** | `app/features/auth/schemas/registerSchema.ts` |
| Forgot password schema | **CANONICAL** | `app/features/auth/schemas/forgotPasswordSchema.ts` |
| Reset password schema | **CANONICAL** | `app/features/auth/schemas/resetPasswordSchema.ts` |

---

## 7. Types

| البند | المصدر | المسار |
|-------|--------|--------|
| Domain types | **CANONICAL** | `app/shared/types/domain.ts` |
| Filter types | **CANONICAL** | `app/shared/types/filters.ts` |
| Type re-exports | **CANONICAL** | `app/shared/types/index.ts` |

---

## 8. Utilities

| البند | المصدر | المسار |
|-------|--------|--------|
| cn() class merger | **CANONICAL** | `app/shared/utils/tailwind.ts` |
| toTypedSchema (Zod v4 → vee-validate) | **CANONICAL** | `app/shared/utils/toTypedSchema.ts` |
| Mock data | **CANONICAL** | `app/shared/utils/mockData.ts` |
| String utilities | **CANONICAL** | `app/shared/utils/string.ts` |

---

## 9. State Management

| البند | المصدر | المسار |
|-------|--------|--------|
| Auth store | **CANONICAL** | `app/stores/auth.ts` |
| UI store | **CANONICAL** | `app/stores/ui.ts` |

---

## 10. API Client

| البند | المصدر | المسار |
|-------|--------|--------|
| API client ($fetch) | **CANONICAL** | `app/core/api/client.ts` |

---

## 11. Plugins

| البند | المصدر | المسار |
|-------|--------|--------|
| Vue Query | **CANONICAL** | `app/plugins/vue-query.ts` |
| Vue Sonner (toasts) | **CANONICAL** | `app/plugins/vue-sonner.ts` |
| Auto-animate | **CANONICAL** | `app/plugins/auto-animate.client.ts` |
| Error handler | **CANONICAL** | `app/plugins/error-handler.client.ts` |

---

## 12. Server

| البند | المصدر | المسار |
|-------|--------|--------|
| Security headers | **CANONICAL** | `app/server/plugins/security-headers.ts` |
| Robots.txt | **CANONICAL** | `app/server/routes/robots.txt.ts` |
| Sitemap.xml | **CANONICAL** | `app/server/routes/sitemap.xml.ts` |
| SEO utility | **CANONICAL** | `app/server/utils/seo.ts` |

---

## 13. Public Assets

| البند | المصدر | المسار |
|-------|--------|--------|
| ALL static files | **CANONICAL** | `public/` |
| Flag SVGs (271) | **CANONICAL** | `public/images/flags/` |
| Favicon | **CANONICAL** | `public/favicon.svg` |

**لا يوجد مصدر آخر.** ~~`app/public/`~~ غير مستخدم فعلياً (Nuxt يخدم من `public/`).

---

## 14. Locale Files

| البند | المصدر | المسار |
|-------|--------|--------|
| Arabic locale | **CANONICAL** | `locales/ar.json` + `i18n/locales/ar.json` (متطابقتين) |
| English locale | **CANONICAL** | `locales/en.json` + `i18n/locales/en.json` (متطابقتين) |
| i18n config | **CANONICAL** | `i18n/i18n.config.ts` |

**ملاحظة**: الـ i18n module بيدور في `i18n/locales/` بشكل افتراضي. الملفات في `locales/` هي النسخة الاحتياطية.

---

## 15. Layout & Pages

| البند | المصدر | المسار |
|-------|--------|--------|
| Default layout | **CANONICAL** | `app/layouts/default.vue` |
| Homepage | **CANONICAL** | `app/pages/index.vue` |
| Auth pages | **CANONICAL** | `app/pages/auth/` |

---

## 16. Configuration

| البند | المصدر | المسار |
|-------|--------|--------|
| Nuxt config | **CANONICAL** | `nuxt.config.ts` |
| TypeScript config | **CANONICAL** | `tsconfig.json` |
| ESLint config | **CANONICAL** | `eslint.config.mjs` |
| Package manifest | **CANONICAL** | `package.json` |

---

## 17. Documentation

| البند | المصدر | المسار |
|-------|--------|--------|
| AI Instructions | **CANONICAL** | `AGENTS.md` |
| Task tracker | **CANONICAL** | `task.md` |
| Design language | **CANONICAL** | `docs/DESIGN_LANGUAGE.md` |
| Source of truth | **CANONICAL** | `docs/SOURCE_OF_TRUTH_MAP.md` (هذا الملف) |
| Canonical rules | **CANONICAL** | `docs/CANONICAL_RULES.md` |
| Standards | **CANONICAL** | `docs/STANDARDS.md` |
| Checkpoint | **CANONICAL** | `docs/CHECKPOINT.md` |
| Phase completion log | **CANONICAL** | `docs/PHASE_COMPLETION_LOG.md` |
| Supreme execution plan | **CANONICAL** | `docs/SUPREME_EXECUTION_PLAN_V4.md` |
| Archived docs | **ARCHIVE** | `docs/archive/` (45+ ملف قديم) |

---

## 18. Things That Were DELETED

| الشيء | السبب |
|-------|-------|
| `app/components/base/` | كان فيه BaseTypography + BaseFlag — تم نقلهم لـ shared |
| `app/public/` | كان duplicate — تم نقل المحتوى لـ root `public/` |
| `i18n/locales/` (القديم) | كان duplicate — تم استعادته |
| `CountryCarousel.vue` | dead code — غير مستورد في أي مكان |
| `BaseModal.vue` | غير مستخدم — BaseDialog هو البديل |
| `BaseChip.vue` | dead code + violations (material-symbols, style block) |
| Root clutter files | fix.cjs, fix.js, patch_css.cjs, icon_sizes.txt, spacing_plan.md |
| Empty feature dirs | dashboard/, notifications/, search/ + subdirs فاضية |
| Empty core dirs | auth/, config/, types/ |
| Empty shared dirs | common/, data-display/, feedback/, forms/, layout/, navigation/ |

---

*هذا الملف يجب أن يبقى محدث. أي تغيير في الملكية يجب توثيقه هنا.*
