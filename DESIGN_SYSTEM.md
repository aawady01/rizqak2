# Design System — Rizqak

> نظام التصميم الموحد لمشروع Rizqak — مبني على Vue 3 + Nuxt 4 + Tailwind CSS 4

---

## الفهرس

1. [الألوان](#الألوان)
2. [الخطوط](#الخطوط)
3. [المسافات](#المسافات)
4. [الحدود والظلال](#الحدود-والظلال)
5. [الحركات](#الحركات)
6. [نقاط الاستجابة](#نقاط-الاستجابة)
7. [Z-Index](#z-index)
8. [مكونات جاهزة](#مكونات-جاهزة)
9. [قواعد الاستخدام](#قواعد-الاستخدام)
10. [إضافة Token جديد](#إضافة-token-جديد)

---

## الألوان

### Primary (أخضر)

| Token | Light | Dark | الاستخدام |
|---|---|---|---|
| `--color-primary-50` | `#ECFDF5` | `#052e16` | خلفيات خفيفة جداً |
| `--color-primary-100` | `#c8e6d5` | `#145239` | خلفيات hover |
| `--color-primary-200` | `#a5d6b8` | `#166534` | — |
| `--color-primary-300` | `#86efac` | `#86efac` | — |
| `--color-primary-400` | `#45b080` | `#4ade80` | أيقونات خفيفة |
| `--color-primary-500` | `#239464` | `#22c55e` | — |
| `--color-primary-600` | `#047857` | `#047857` | **اللون الأساسي** (`--color-primary`) |
| `--color-primary-700` | `#065f46` | `#065f46` | Hover (`--color-primary-dark`) |
| `--color-primary-800` | `#064E3B` | `#064E3B` | Active/Selected |
| `--color-primary-900` | `#032d22` | `#032d22` | خلفيات داكنة |
| `--color-primary-950` | `#092017` | `#092017` | أغمق درجة |

### Accent (ذهبي)

| Token | Light | الاستخدام |
|---|---|---|
| `--color-accent-50` → `--color-accent-300` | `#fdfcf5` → `#eedc9a` | خلفيات دافئة |
| `--color-accent-400` | `#34d399` | ⚠️ أخضر (ليس ذهبياً) — يُستخدم كلون تمييز |
| `--color-accent-500` | `#cf9e1c` | **اللون الذهبي الأساسي** — تقييمات، شارات |
| `--color-accent-600` → `--color-accent-950` | `#a77a14` → `#2c1e04` | Hover, active |

### Neutral (رمادي)

| Token | Light | Dark |
|---|---|---|
| `--color-neutral-50` | `#f9fafb` | `#fafafa` |
| `--color-neutral-100` | `#f3f4f6` | `#1a1a1a` |
| `--color-neutral-200` | `#e5e7eb` | `#262626` |
| `--color-neutral-300` | `#d1d5db` | `#404040` |
| `--color-neutral-400` | `#9ca3af` | `#525252` |
| `--color-neutral-500` | `#6b7280` | `#737373` |
| `--color-neutral-600` | `#4b5563` | `#a3a3a3` |
| `--color-neutral-700` | `#374151` | `#d4d4d4` |
| `--color-neutral-800` | `#1f2937` | `#e5e5e5` |
| `--color-neutral-900` | `#111827` | `#f5f5f5` |
| `--color-neutral-950` | `#030712` | `#fafafa` |

### Semantic Colors

| Token | Light | Dark | الاستخدام |
|---|---|---|---|
| `--color-success` | `var(--primary-600)` | `var(--primary-600)` | نجاح |
| `--color-success-bg` | `#ECFDF5` | `#052e16` | خلفية نجاح |
| `--color-success-light` | `#D1FAE5` | `#145239` | حدود نجاح |
| `--color-warning` | `#dd6b20` | `#fb923c` | تحذير |
| `--color-warning-bg` | `#fffaf0` | `#450a03` | خلفية تحذير |
| `--color-warning-light` | `#feebc8` | `#78350f` | حدود تحذير |
| `--color-error` | `#e53e3e` | `#f87171` | خطأ |
| `--color-error-bg` | `#fff5f5` | `#450a0a` | خلفية خطأ |
| `--color-error-light` | `#fed7d7` | `#7f1d1d` | حدود خطأ |
| `--color-info` | `#3182ce` | `#60a5fa` | معلومات |
| `--color-info-bg` | `#ebf8ff` | `#1e3a5f` | خلفية معلومات |
| `--color-info-light` | `#bee3f8` | `#1e40af` | حدود معلومات |

### Surface & Background

| Token | Light | Dark | الاستخدام |
|---|---|---|---|
| `--color-bg-primary` | `#F8FAFC` | `#0a0a0a` | خلفية الصفحة |
| `--color-bg-secondary` | `#ffffff` | `#171717` | خلفية ثانوية |
| `--color-surface` | `#ffffff` | `#171717` | سطح الكروت والبطاقات |
| `--color-surface-hover` | `#D1FAE5` | `#262626` | Hover على الكروت |
| `--color-surface-alt` | `#f3f4f6` | `#262626` | سطح بديل (خلفيات متبادلة) |
| `--color-surface-elevated` | `#ffffff` | `#1f1f1f` | عناصر مرتفعة (modals, dropdowns) |

### Text Colors

| Token | Light | Dark | الاستخدام |
|---|---|---|---|
| `--color-text-primary` | `#0F172A` | `#f5f5f5` | نص أساسي |
| `--color-text-secondary` | `#475569` | `#a3a3a3` | نص ثانوي |
| `--color-text-muted` | `#999999` | `#737373` | نص خافت |
| `--color-foreground-muted` | `#4b5563` | `#a3a3a3` | نص خافت (بديل) |
| `--color-foreground-subtle` | `#9ca3af` | `#737373` | نص خفيف جداً |
| `--color-text-inverse` | `#ffffff` | `#0a0a0a` | نص على خلفية داكنة |

### Border Colors

| Token | Light | Dark | الاستخدام |
|---|---|---|---|
| `--color-border-default` | `#e2e2e2` | `#404040` | حدود افتراضية |
| `--color-border-light` | `#f0f0f0` | `#262626` | حدود خفيفة |
| `--color-border-strong` | `#c0c0c0` | `#525252` | حدود قوية |
| `--color-separator` | `#d1d5db` | `#404040` | فواصل |

### Brand Colors

| Token | Value | الاستخدام |
|---|---|---|
| `--color-brand-whatsapp` | `#25d366` | زر واتساب |
| `--color-brand-whatsapp-dark` | `#1ea952` | زر واتساب hover |
| `--color-gold-star` | `#e8b931` | نجوم التقييم |

### Tailwind Utility Classes

```
text-foreground        → --color-text-primary
text-foreground-muted  → --color-foreground-muted
text-foreground-subtle → --color-foreground-subtle
text-primary           → --color-primary
text-primary-dark      → --color-primary-dark
text-success           → --color-success
text-warning           → --color-warning
text-error             → --color-error
text-info              → --color-info

bg-surface             → --color-surface
bg-surface-alt         → --color-surface-alt
bg-surface-hover       → --color-surface-hover
bg-primary             → --color-primary
bg-primary-dark        → --color-primary-dark
bg-success-bg          → --color-success-bg
bg-warning-bg          → --color-warning-bg
bg-error-bg            → --color-error-bg
bg-info-bg             → --color-info-bg

border-border          → --color-border-default
border-primary         → --color-primary
border-primary/20      → --color-primary بشفافية 20%
border-primary/40      → --color-primary بشفافية 40%
```

---

## الخطوط

### Font Family

```css
--font-family-sans: "Cairo", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
--font-family-display: "Cairo", system-ui, sans-serif
```

### Font Sizes (Design System)

| Token | Size | Line Height | الاستخدام |
|---|---|---|---|
| `text-ds-display-xxl` | `80px` | `1.05` | عناوين رئيسية ضخمة |
| `text-ds-display-xl` | `64px` | `1.1` | عناوين كبيرة |
| `text-ds-display-l` | `36px` | `1.2` | Hero titles |
| `text-ds-h1` | `30px` | `1.3` | عنوان صفحة |
| `text-ds-h2` | `24px` | `1.3` | عنوان قسم رئيسي |
| `text-ds-h3` | `20px` | `1.4` | عنوان قسم فرعي |
| `text-ds-h4` | `18px` | `1.4` | عنوان بطاقة |
| `text-ds-h5` | `16px` | `1.4` | عنوان صغير |
| `text-ds-h6` | `14px` | `1.5` | عنوان مصغر |
| `text-ds-subtitle-l` | `18px` | `1.5` | عنوان فرعي كبير |
| `text-ds-subtitle-r` | `16px` | `1.5` | عنوان فرعي عادي |
| `text-ds-body-l` | `18px` | `1.6` | نص كبير |
| `text-ds-body-r` | `14px` | `1.6` | **النص الافتراضي** |
| `text-ds-body-s` | `13px` | `1.6` | نص صغير (labels) |
| `text-ds-caption-l` | `12px` | `1.4` | تعليق كبير |
| `text-ds-caption-r` | `11px` | `1.4` | تعليق عادي |
| `text-ds-caption-s` | `10px` | `1.4` | تعليق صغير |
| `text-ds-caption` | `12px` | `1.4` | alias لـ caption-l |
| `text-ds-label-l` | `14px` | `1.4` | عنوان label كبير |
| `text-ds-label-r` | `13px` | `1.4` | عنوان label عادي |
| `text-ds-label-s` | `11px` | `1.4` | عنوان label صغير |

### Font Weights

| Token | Value | الاستخدام |
|---|---|---|
| `font-light` | `300` | نصوص خفيفة |
| `font-normal` | `400` | نص عادي |
| `font-medium` | `500` | نص متوسط |
| `font-semibold` | `600` | نص شبه عريض |
| `font-bold` | `700` | **عناوين وأرقام مهمة** |
| `font-extrabold` | `800` | عناوين بارزة جداً |

---

## المسافات

### Semantic Spacing

| Token | Value | Class | الاستخدام |
|---|---|---|---|
| `--spacing-compact` | `8px` | `gap-compact`, `p-compact`, `m-compact` | داخل العناصر، أيقونة-نص |
| `--spacing-element` | `12px` | `gap-element`, `p-element`, `m-element` | بين عناصر متجاورة |
| `--spacing-content` | `16px` | `gap-content`, `p-content`, `m-content` | بين كتل المحتوى |
| `--spacing-section` | `32px` | `gap-section`, `p-section`, `m-section` | بين أقسام الصفحة |

### Tailwind Spacing Scale

القيم من `0` إلى `32` متاحة (4px → 128px). استخدم القيم الدلالية (`compact`, `element`, `content`, `section`) أولاً.

---

## الحدود والظلال

### Border Radius

| Token | Value | الاستخدام |
|---|---|---|
| `--radius-none` | `0` | **الافتراضي** — زوايا حادة (brand standard) |
| `--radius-sm` | `0` | — |
| `--radius-md` | `0` | — |
| `--radius-lg` | `0` | — |
| `--radius-full` | `9999px` | دوائر، badges |

### Shadows

| Token | Value | الاستخدام |
|---|---|---|
| `--shadow-xs` | `0 1px 2px rgba(0,0,0,0.05)` | ظلال خفيفة جداً |
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.06)` | كروت عادية |
| `--shadow-md` | `0 2px 8px rgba(0,0,0,0.08)` | كروت مرتفعة |
| `--shadow-lg` | `0 4px 16px rgba(0,0,0,0.12)` | dropdowns |
| `--shadow-xl` | `0 8px 32px rgba(0,0,0,0.16)` | modals |
| `--shadow-inner` | `inset 0 2px 4px rgba(0,0,0,0.06)` | داخل العناصر |
| `--shadow-focus` | `0 0 0 3px rgba(27,107,74,0.1)` | focus rings |

---

## الحركات

### Durations

| Token | Value | Class | الاستخدام |
|---|---|---|---|
| `--transition-duration-fast` | `150ms` | `duration-150` | hover سريع |
| `--transition-duration-normal` | `300ms` | `duration-300` | انتقالات عادية |
| `--transition-duration-slow` | `500ms` | `duration-500` | انتقالات بطيئة |

### Easing

```css
--transition-ease-default: cubic-bezier(0.4, 0, 0.2, 1)
```

---

## نقاط الاستجابة

| Token | Value | Class | الاستخدام |
|---|---|---|---|
| `sm` | `640px` | `sm:` | موبايل كبير |
| `md` | `768px` | `md:` | تابلت |
| `lg` | `1024px` | `lg:` | ديسكتوب |
| `xl` | `1280px` | `xl:` | شاشات كبيرة |
| `2xl` | `1536px` | `2xl:` | شاشات كبيرة جداً |

---

## Z-Index

| Token | Value | الاستخدام |
|---|---|---|
| `--z-hover` | `10` | hover indicators |
| `--z-sticky` | `20` | عناصر ثابتة |
| `--z-dropdown` | `30` | قوائم منسدلة |
| `--z-overlay` | `40` | خلفيات modals |
| `--z-modal` | `50` | نوافذ منبثقة |
| `--z-toast` | `60` | إشعارات |
| `--z-tooltip` | `70` | تلميحات |

---

## مكونات جاهزة

### Base Components

| المكون | المسار | الوصف |
|---|---|---|
| `BaseTypography` | `shared/components/base/BaseTypography.vue` | نص منسق بـ variant |
| `BaseButton` | `shared/components/base/BaseButton.vue` | أزرار (primary, secondary, outline, ghost, destructive) |
| `BaseInput` | `shared/components/base/BaseInput.vue` | حقل إدخال نص |
| `BaseCard` | `shared/components/base/BaseCard.vue` | بطاقة بـ header/content/footer |
| `BaseChip` | `shared/components/base/BaseChip.vue` | شارة صغيرة (neutral, primary) |
| `BaseBadge` | `shared/components/base/BaseBadge.vue` | شارة حالة |
| `BaseSelect` | `shared/components/base/BaseSelect.vue` | قائمة اختيار |
| `BaseTextarea` | `shared/components/base/BaseTextarea.vue` | حقل نص متعدد الأسطر |
| `BaseDialog` | `shared/components/base/BaseDialog.vue` | نافذة حوار |
| `BasePagination` | `shared/components/base/BasePagination.vue` | ترقيم الصفحات |
| `BaseTabs` | `shared/components/base/BaseTabs.vue` | تبويبات |
| `BaseAvatar` | `shared/components/base/BaseAvatar.vue` | صورة شخصية |
| `BaseFlag` | `shared/components/base/BaseFlag.vue` | علم دولة |
| `BaseSectionHeader` | `shared/components/base/BaseSectionHeader.vue` | عنوان قسم |
| `BaseEmptyState` | `shared/components/base/BaseEmptyState.vue` | حالة فارغة |
| `BaseErrorState` | `shared/components/base/BaseErrorState.vue` | حالة خطأ |

### Layout Components

| المكون | المسار | الوصف |
|---|---|---|
| `LayoutHeader` | `components/layout/LayoutHeader.vue` | الشريط العلوي |
| `LayoutFooter` | `components/layout/LayoutFooter.vue` | الشريط السفلي |

### Utility Classes

| Class | القيمة | الاستخدام |
|---|---|---|
| `.surface-panel` | `bg-surface + border` | خلفية لوحة/كارت |
| `.page-shell` | حاوية الصفحة | wrapper رئيسي |
| `.section-heading` | عنوان قسم | flex + gap + margin |
| `.carousel-control` | أزرار الكاروسيل | position + opacity |
| `.scrollbar-hide` | إخفاء شريط التمرير | utility |

---

## قواعد الاستخدام

### 1. استخدم الـ Tokens دائماً

```vue
<!-- ✅ صح -->
<span class="text-ds-body-r text-foreground">نص عادي</span>
<div class="p-content bg-surface border border-border">كارت</div>

<!-- ❌ غلط -->
<span class="text-[14px] text-[#0F172A]">نص عادي</span>
<div class="p-4 bg-white border border-[#e2e2e2]">كارت</div>
```

### 2. المسافات الدلالية أولاً

```
compact (8px)   → داخل العناصر الصغيرة (أيقونة + نص)
element (12px)  → بين عناصر متجاورة
content (16px)  → بين كتل المحتوى
section (32px)  → بين أقسام الصفحة
```

### 3. الألوان Semantic مش Literal

```vue
<!-- ✅ صح -->
<div class="bg-success-bg text-success border-success-light">نجاح</div>

<!-- ❌ غلط -->
<div class="bg-green-50 text-green-700 border-green-100">نجاح</div>
```

### 4. الزوايا حادة افتراضياً

البراند بيستخدم `rounded-none` كافتراضي. استخدم `rounded-full` للدوائر والـ badges فقط.

### 5. الخط Cairo دائماً

مش لازم تحدد `font-family` — `html` بيستخدم Cairo تلقائياً.

---

## إضافة Token جديد

### في CSS (`main.css`)

أضف الـ token في المكان المناسب داخل `@theme`:

```css
@theme {
  /* Colors */
  --color-custom-500: #xxxxxx;

  /* Font Sizes */
  --font-size-ds-custom: 15px;
  --font-size-ds-custom--line-height: 1.5;

  /* Spacing */
  --spacing-custom: 20px;
}
```

### في Tailwind Config

لو محتاج utility class مخصصة:

```ts
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        custom: 'var(--color-custom-500)',
      },
    },
  },
}
```

---

## Dark Mode

المشروع بيستخدم `html.dark` class-based toggling. كل الألوان ليها override في `html.dark {}`.

```css
html.dark {
  --color-surface: #171717;
  --color-text-primary: #f5f5f5;
  /* ... */
}
```

---

## الملفات الرئيسية

```
app/assets/css/main.css          ← كل الـ Tokens + الأنماط العامة
nuxt.config.ts                   ← إعدادات Tailwind + PWA
i18n/locales/ar.json             ← الترجمات العربية
i18n/locales/en.json             ← الترجمات الإنجليزية
app/shared/components/base/      ← المكونات الأساسية
app/components/                  ← مكونات التطبيق
```
