# CLEANUP DECISIONS — Rizqak2

> **هذا الملف يوثق كل قرار تنظيف تمتخذه.**
> **أي AI model لازم يقرأ ده عشان يفهم إيه تم حذفه وإيه تم الاحتفاظ بيه.**

**Last Updated**: 2026-03-17
**Session**: Supreme Constitution v4.0 Execution

---

## DECISION 1 — Duplicate Base Component Locations

**المشكلة**: `app/components/base/` كان فيه BaseTypography.vue و BaseFlag.vue، و `app/shared/components/base/` فيه 31 component.

**القرار**: نقل BaseTypography و BaseFlag إلى `app/shared/components/base/` + حذف `app/components/base/`.

**السبب**: مصدر واحد للحقيقة. كل الـ base components في مكان واحد.

**الملفات المتأثرة**: 6 import paths تم تحديثها.

**النتيجة**: ✅ 0 مرجع لـ `~/components/base/` باقي.

---

## DECISION 2 — Duplicate Public Folders

**المشكلة**: `app/public/` (255 علم) و `public/` (271 علم) — مجلدين مختلفين.

**القرار**: دمج كل المحتوى في `public/` (root) + حذف `app/public/images/`.

**السبب**: Nuxt يخدم من `public/` بشكل افتراضي.

**النتيجة**: ✅ 271 علم في `public/images/flags/`.

---

## DECISION 3 — Duplicate Locale Files

**المشكلة**: `locales/ar.json` و `i18n/locales/ar.json` — نفس المحتوى.

**القرار**: الاحتفاظ بكلاهما (متطابقتين). الـ i18n module بيدور في `i18n/locales/` بشكل افتراضي.

**السبب**: الـ i18n module بحاجة الملفات في `i18n/locales/`. `locales/` هو النسخة الاحتياطية.

**النتيجة**: ✅ كلا الموقعين موجودين ومتطابقين.

---

## DECISION 4 — BaseDialog vs BaseModal

**المشكلة**: كلاهما موجود — BaseDialog (reka-ui, accessible) و BaseModal (legacy, scoped styles).

**القرار**: BaseDialog هو الـ canonical. حذف BaseModal.

**السبب**: BaseModal يستخدم scoped styles و material-symbols (violations). BaseDialog يستخدم reka-ui و cn() و semantic tokens.

**النتيجة**: ✅ BaseModal محذوف. BaseDialog هو الطريقة الرسمية.

---

## DECISION 5 — BaseChip Dead Code

**المشكلة**: BaseChip.vue كان موجود لكن 0 import في أي مكان + يستخدم material-symbols و scoped styles.

**القرار**: حذف BaseChip.

**السبب**: dead code + violations.

**النتيجة**: ✅ محذوف.

---

## DECISION 6 — CountryCarousel Dead Code

**المشكلة**: CountryCarousel.vue كان موجود لكن 0 import في أي مكان + يستخدم material-symbols.

**القرار**: حذف CountryCarousel.

**السبب**: dead code. HomeHero عنده carousel خاص بيه.

**النتيجة**: ✅ محذوف.

---

## DECISION 7 — Broken Z-Index Tokens

**المشكلة**: الـ z-index tokens في CSS كانت بأرقام عالية (100, 200, 300) لكن الكود بيستخدم أرقام أقل (50, 20, 10).

**القرار**: تحديث الـ tokens في CSS لتطابق الاستخدام الفعلي + إضافة tokens ناقصة.

**التغييرات**:
- `--z-sticky`: 200 → 50
- `--z-fixed`: 300 → 200
- أضافة: `--z-base`, `--z-hover`, `--z-carousel`

**النتيجة**: ✅ كل الـ components بتستخدم semantic tokens.

---

## DECISION 8 — Broken Text Color Tokens

**المشكلة**: `text-muted-foreground` (Tailwind default) و `text-ds-foreground` (غير معرف) كانوا مستخدمين بجانب `text-foreground-muted` و `text-foreground`.

**القرار**: استبدالهم بـ `text-foreground-muted` و `text-foreground`.

**النتيجة**: ✅ 0 instance من الـ tokens المكسورة.

---

## DECISION 9 — Broken Border Token

**المشكلة**: `border-ds-border` كان مستخدم في 7 أماكن لكنه غير معرف في CSS.

**القرار**: استبداله بـ `border-border`.

**النتيجة**: ✅ 0 instance من `border-ds-border`.

---

## DECISION 10 — Duplicate Background Token

**المشكلة**: `bg-card` و `bg-surface` كانوا بيعملوا نفس الحاجة.

**القرار**: `bg-surface` هو الـ canonical. حذف استخدام `bg-card`.

**النتيجة**: ✅ 0 instance من `bg-card`.

---

## DECISION 11 — Root Clutter

**المشكلة**: ملفات قديمة في الجذر: fix.cjs, fix.js, patch_css.cjs, icon_sizes.txt, spacing_plan.md, إلخ.

**القرار**: حذف الملفات المؤقتة + أرشفة الملفات القديمة في `docs/archive/`.

**المحذوف**: fix.cjs, fix.js, patch_css.cjs, icon_sizes.txt, spacing_plan.md, FULL_UPDATE_PLAN.md, PACKAGE_VERSION_REPORT.md, PROJECT_AUDIT_REPORT.md, stitch_home_jobs_listing/.

**المؤرشف**: implementation_plan.md, MASTER_UI_CONSTITUTION.txt.

**النتيجة**: ✅ الجذر نظيف.

---

## DECISION 12 — Empty Directories

**المشكلة**: 12+ مجلد فاضي في app/ كان بيوحي بوجود معمارية نشطة.

**المحذوف**:
- `app/assets/fonts/`, `app/assets/icons/`, `app/assets/images/`
- `app/features/dashboard/`, `app/features/notifications/`, `app/features/search/`
- `app/features/jobs/components/`, `app/features/jobs/types/`
- `app/features/companies/components/`, `app/features/companies/types/`
- `app/features/auth/components/`, `app/features/auth/types/`
- `app/middleware/`
- `app/pages/companies/`, `app/pages/dashboard/`, `app/pages/jobs/`
- `app/server/api/`
- `app/shared/constants/`, `app/shared/styles/`
- `app/core/auth/`, `app/core/config/`, `app/core/types/`
- `app/shared/components/common/`, `data-display/`, `feedback/`, `forms/`, `layout/`, `navigation/`

**النتيجة**: ✅ 0 مجلد فاضي في app/.

---

## DECISION 13 — Duplicate Docs

**المشكلة**: 49 ملف في docs/ — معظمهم مكرر أو قديم.

**القرار**: أرشفة 45 ملف في `docs/archive/`. الاحتفاظ بـ 5 ملفات أساسية.

**النتيجة**: ✅ 10 ملفات في docs/ (5 أساسية + archive + LAYOUT_FOUNDATION + 3 جديدة).

---

## DECISION 14 — Manual Vue Imports

**المشكلة**: 25+ ملف كانوا بيستوردوا `{ ref, computed } from 'vue'` يدوياً.

**القرار**: حذف كل الـ imports اليدوية — Nuxt auto-imports بتعمل ده تلقائياً.

**النتيجة**: ✅ 0 import يدوي من 'vue'.

---

## DECISION 15 — Inline SVG Icons

**المشكلة**: JobCard كان فيه `<svg bookmark>` inline.

**القرار**: استبداله بـ lucide `Bookmark` / `BookmarkCheck`.

**النتيجة**: ✅ 0 inline SVG في components.

---

## DECISION 16 — Scoped Style Blocks

**المشكلة**: BaseTypography و BaseChip كانوا عندهم `<style scoped>`.

**القرار**: حذفهم. BaseTypography أصلحته بـ cn(). BaseChip محذوف (dead code).

**النتيجة**: ✅ 0 `<style>` block في components.

---

## DECISION 17 — Heading Hierarchy

**المشكلة**: Section headers كانوا بيستخدموا h3 بدون h1 أو h2 قبلهم.

**القرار**: Hero عنده h1 (عبر `tag="h1"`). Section headers تستخدم `variant="h3" tag="h2"` (نفس الحجم البصري + semantic tag صحيح).

**النتيجة**: ✅ Heading hierarchy: h1 → h2 → h3.

---

## DECISION 18 — SEO Consistency

**المشكلة**: Auth pages كانت بتستخدم `useSeoMeta` مباشرة بدل `useSEO`.

**القرار**: استبدال كل `useSeoMeta` بـ `useSEO` في كل الصفحات.

**النتيجة**: ✅ كل 5 صفحات بتستخدم `useSEO`.

---

## القواعد المستخلصة

1. **لا تغير حاجة شغالة** بدون سبب مبرر
2. **لا تستخدم tokens غير معرفة** — تحقق من CSS أولاً
3. **لا تترك dead code** — احذفه فوراً
4. **لا تترك مجلدات فاضية** — تسبب confusion
5. **لا تستخدم import يدوي** من 'vue' — Nuxt auto-imports
6. **لا تستخدم inline SVG** — lucide بس
7. **لا تستخدم scoped styles** — cn() + tokens
8. **وثق كل قرار** في هذا الملف

---

*هذا الملف يجب أن يبقى محدث. أي قرار تنظيف جديد يجب توثيقه هنا.*
