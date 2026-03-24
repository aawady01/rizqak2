# CANONICAL RULES — Rizqak2

> **هذا الملف يحدد الطريقة الرسمية الوحيدة لكل حاجة في المشروع.**
> **أي AI model لازم يمشي على القواعد دي. مفيش استثناءات.**

**Last Updated**: 2026-03-17

---

## 1. STYLING — THE ONE WAY

| الحاجة | الطريقة الرسمية | ممنوع |
|--------|----------------|-------|
| Colors | Semantic tokens (`bg-surface`, `text-foreground`) | `bg-white`, `text-neutral-400`, hex colors |
| Spacing | Tokens (`p-content`, `gap-compact`, `mb-element`) | `p-5`, `gap-3`, `mb-6` (غير مبررة) |
| Typography | DS tokens (`text-ds-body-r`, `text-ds-h3`) أو `text-foreground` | `text-sm`, `text-lg` (إلا إذا مفيش token) |
| Borders | `border-border` | `border-gray-200`, `border-neutral-300` |
| Shadows | `shadow-sm`, `shadow-md`, `shadow-lg` | raw `box-shadow:` values |
| Z-index | Semantic tokens (`z-sticky`, `z-carousel`, `z-hover`) | `z-50`, `z-20` (raw values) |
| Transitions | `transition-all`, `transition-colors` + `duration-300` | raw `transition:` in CSS |
| Border radius | `rounded-none` (brand rule) | `rounded-md`, `rounded-lg` |
| Class merging | `cn()` from `app/shared/utils/tailwind.ts` | string concatenation |
| Component variants | CVA from `class-variance-authority` | if/else class blocks |

---

## 2. COLORS — THE ONE WAY

### Shell areas (header, footer, hero)
```
Header:  bg-primary
Footer:  bg-primary
Hero:    bg-primary
```
**كلهم نفس اللون الأخضر.** لو عايزهم مختلفين، لازم يكون في قرار موثق.

### Content areas
```
Background:    bg-surface
Card surface:  bg-surface
Alt surface:   bg-surface-alt
Text:          text-foreground
Secondary text: text-foreground-muted
Tertiary text: text-foreground-subtle
Border:        border-border
Interactive:   text-primary / bg-primary
```

### Section header icon
```
text-primary (الأخضر الأساسي)
```

---

## 3. SPACING — THE ONE WAY

### Z-index hierarchy
```
z-hover     (10)  ← Hover indicators على الكروت
z-carousel  (20)  ← أزرار Carousel
z-sticky    (50)  ← الهيدر اللاصق
z-dropdown  (100) ← قوائم منسدلة
z-fixed     (200) ← عناصر ثابتة
z-modal     (500) ← مودالات
z-toast     (800) ← إشعارات
```

### Spacing hierarchy
```
compact   (8px)  ← داخل العناصر (icon-text gap, card row gap)
element   (12px) ← بين عناصر متجاورة (card meta gap, section inner gap)
content   (16px) ← بين كتل محتوى (section header → content, card padding)
section   (32px) ← بين أقسام الصفحة (footer sections, sidebar sections)
```

### Icon-text gap
```
gap-compact (8px) — في كل مكان فيه icon + text
```

### Section header → content
```
mb-content (16px) — في كل مكان فيه section header + content تحته
```

---

## 4. ICONS — THE ONE WAY

| الحاجة | الطريقة الرسمية | ممنوع |
|--------|----------------|-------|
| Icon library | `lucide-vue-next` | material-symbols, font-awesome, heroicons |
| Icon sizing | `size-5` (20px) للعناوين, `size-4` (16px) للـ meta | `w-5 h-5` (استخدم `size-5`) |
| Decorative icons | `aria-hidden="true"` | بدون accessibility |
| Interactive icons | `aria-label` أو جوه button مع نص | أيقونة بدون label |

---

## 5. COMPONENTS — THE ONE WAY

### Base components (shared)
```
المسار: app/shared/components/base/
العدد: 36 component
النمط: <script setup lang="ts"> + defineProps + cn() + semantic tokens
```

### Section components (app-level)
```
المسار: app/components/
الفئات: layout/, home/, jobs/, companies/, filters/
```

### Feature components
```
المسار: app/features/*/components/
الحالة: فاضي حالياً — أنشئ لما تحتاج
```

---

## 6. FORMS — THE ONE WAY

| الحاجة | الطريقة الرسمية | ممنوع |
|--------|----------------|-------|
| Validation | `vee-validate` + `zod` v4 | custom validation, raw checks |
| Schema location | `app/features/*/schemas/` | inline في components |
| Typed schema | `toTypedSchema()` from `app/shared/utils/toTypedSchema.ts` | manual typing |
| Error display | `BaseFormField` wrapper | inline error messages |

---

## 7. DATA FETCHING — THE ONE WAY

| الحاجة | الطريقة الرسمية | ممنوع |
|--------|----------------|-------|
| API client | `$fetch` via `app/core/api/client.ts` | raw `fetch()` |
| Caching | `@tanstack/vue-query` | manual cache |
| Mock data | `app/shared/utils/mockData.ts` | inline mock data |
| Feature data | `app/features/*/composables/use*Api.ts` | data في components |

---

## 8. STATE — THE ONE WAY

| الحاجة | الطريقة الرسمية | ممنوع |
|--------|----------------|-------|
| Global state | Pinia stores في `app/stores/` | provide/inject global |
| Local state | `ref()` / `computed()` في component | |
| Browser APIs | VueUse (`onClickOutside`, `useToggle`, etc.) | manual `addEventListener` |

---

## 9. IMAGES — THE ONE WAY

| الحاجة | الطريقة الرسمية | ممنوع |
|--------|----------------|-------|
| Content images | `NuxtImage` | raw `<img>` |
| Flag SVGs | raw `<img>` (استثناء مقبول) | |
| Fallback | `BaseImageWithFallback` | inline fallback logic |

---

## 10. NOTIFICATIONS — THE ONE WAY

| الحاجة | الطريقة الرسمية | ممنوع |
|--------|----------------|-------|
| Toasts | `vue-sonner` → `toast.success()` / `toast.error()` | `window.alert`, custom toast |

---

## 11. ANIMATIONS — THE ONE WAY

| الحاجة | الطريقة الرسمية | ممنوع |
|--------|----------------|-------|
| Simple hover/focus | Tailwind transition classes | CSS `transition:` inline |
| List animations | `@formkit/auto-animate` → `v-auto-animate` | GSAP, custom JS |
| Complex animations | `@keyframes` في `main.css` فقط | inline keyframes |

---

## 12. RTL — THE ONE WAY

| الحاجة | الطريقة الرسمية | ممنوع |
|--------|----------------|-------|
| Logical properties | `ps-`, `pe-`, `ms-`, `me-`, `inset-inline-start` | `pl-`, `pr-`, `ml-`, `mr-`, `left`, `right` |
| Text alignment | `text-start`, `text-end` | `text-left`, `text-right` |
| Direction | `dir="rtl"` في layout | hardcoded `direction: rtl` |

---

## 13. ACCESSIBILITY — THE ONE WAY

| الحاجة | الطريقة الرسمية |
|--------|----------------|
| Focus | `focus-visible:ring-2 focus-visible:ring-primary-500` |
| Decorative icons | `aria-hidden="true"` |
| Interactive icons | `aria-label` أو نص مرئي |
| Form errors | `aria-invalid` + `aria-describedby` |
| Sections | `aria-labelledby` على section مع h2 id |
| Buttons vs links | `<button>` للإجراءات, `<a>` للتنقل |

---

## 14. DARK MODE — THE ONE WAY

| الحاجة | الطريقة الرسمية |
|--------|----------------|
| Implementation | `@nuxtjs/color-mode` → `html.dark` class |
| Token strategy | Semantic tokens في `:root` + overrides في `html.dark` |
| Component usage | `bg-surface` (بيتحول أوتوماتيك) — لا `dark:bg-` |

---

## 15. SEO — THE ONE WAY

| الحاجة | الطريقة الرسمية | المسار |
|--------|----------------|-------|
| Meta tags | `useSEO()` composable | `app/shared/composables/useSEO.ts` |
| Structured data | `useStructuredData()` composable | `app/shared/composables/useStructuredData.ts` |
| Breadcrumbs | `useBreadcrumbStructuredData()` | نفس الملف |

---

## 16. FOLDER OWNERSHIP

```
app/
├── assets/css/main.css          ← كل الـ tokens
├── shared/components/base/      ← كل الـ base components (36)
├── shared/composables/          ← composables مشتركة
├── shared/utils/                ← utilities مشتركة
├── shared/types/                ← types مشتركة
├── components/layout/           ← Header, Footer
├── components/home/             ← Homepage sections
├── components/jobs/             ← Job components
├── components/companies/        ← Company components
├── components/filters/          ← Filter components
├── features/auth/schemas/       ← Zod v4 schemas
├── features/auth/composables/   ← Auth API
├── features/jobs/composables/   ← Jobs API
├── features/companies/composables/ ← Companies API
├── features/users/composables/  ← Users API
├── stores/                      ← Pinia stores
├── core/api/                    ← API client
├── plugins/                     ← Nuxt plugins
├── server/                      ← Server routes + plugins
├── pages/                       ← Route pages
└── layouts/                     ← Layout wrappers
```

---

## 17. FILE NAMING

| النوع | الـ Convention | مثال |
|-------|---------------|------|
| Pages | kebab-case | `forgot-password.vue` |
| Components | PascalCase | `JobCard.vue` |
| Composables | camelCase + `use` | `useJobsApi.ts` |
| Types | PascalCase في domain.ts | `export interface Job` |
| Schemas | camelCase + Schema | `loginSchema.ts` |
| Stores | camelCase | `auth.ts` |
| Utils | camelCase | `tailwind.ts` |

---

## 18. IMPORT PATHS

| الحاجة | المسار الرسمي |
|--------|-------------|
| Base components | `~/shared/components/base/ComponentName.vue` |
| App components | `~/components/category/ComponentName.vue` |
| Composables | `~/shared/composables/useName.ts` أو `~/features/*/composables/useName.ts` |
| Types | `~/shared/types/domain.ts` |
| Utils | `~/shared/utils/name.ts` |
| Mock data | `~/shared/utils/mockData` |

---

*هذا الملف يجب أن يبقى محدث. أي قرار جديد يجب توثيقه هنا.*

*لا توجد طريقة ثانية لأي حاجة. الطريقة الوحيدة موجودة هنا.*
