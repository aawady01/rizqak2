# LAYOUT FOUNDATION — Rizqak2

> **هذا الملف يوثق كل قواعد الـ layout في المشروع.**
> **أي صفحة جديدة لازم تتبع القواعد دي بالظبط.**

**Last Updated**: 2026-03-17

---

## 1. DEFAULT LAYOUT

**File**: `app/layouts/default.vue`

**الهيكل**:
```
<div dir="rtl" min-h-screen flex flex-col>
  <a> Skip link </a>        ← sr-only, يظهر بالـ focus
  <header>                  ← sticky, z-sticky
    <nav> Navigation </nav>
  </header>
  <main id="main-content">  ← flex-1, يأخذ كل المساحة المتبقية
    <slot />                ← محتوى الصفحة
  </main>
  <footer>                  ← في الأسفل دائماً
    <div> Footer content </div>
  </footer>
</div>
```

**الخصائص**:
- `dir="rtl"` — RTL دائماً
- `min-h-screen` — Footer في الأسفل حتى لو المحتوى قصير
- `flex flex-col` — ترتيب عمودي
- `flex-1` على main — يأخذ المساحة المتبقية

---

## 2. HEADER

**File**: `app/components/layout/LayoutHeader.vue`

**الخصائص**:
```
bg-primary sticky top-0 z-sticky w-full border-b border-white/10 shadow-sm
```

**الهيكل الداخلي**:
```
<header>
  <div class="max-w-7xl mx-auto px-6 lg:px-8">     ← Container
    <div class="flex justify-between h-14">          ← Header bar
      <NuxtLink> Brand logo + name </NuxtLink>       ← يسار (RTL)
      <div class="hidden md:flex"> Nav links </div>  ← وسط (مخفي على mobile)
      <div class="flex gap-compact"> Actions </div>  ← يمين (RTL)
    </div>
    <div v-show="mobileMenuOpen" class="md:hidden">  ← Mobile menu
      Nav links (vertical)
    </div>
  </div>
</header>
```

**العناصر**:
- Brand: logo (40×40) + name (مخفي على sm-) — `gap-element`
- Nav links: `hidden md:flex` — مخفي على mobile
- Actions: notifications + login + theme toggle + hamburger (md:hidden)
- Mobile menu: `v-show` + `md:hidden` — يظهر/يخفى

**ارتفاع**: `h-14` (56px)

**الألوان**: كلها shell colors (`bg-primary`, `text-white/90`, `border-white/10`)

---

## 3. FOOTER

**File**: `app/components/layout/LayoutFooter.vue`

**الخصائص**:
```
bg-primary border-t border-white/10 mt-section py-section
```

**الهيكل**:
```
<footer id="contact">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">     ← Container
    <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
      <div> Brand </div>                              ← عمود 1
      <div> Job Seekers links </div>                  ← عمود 2
      <div> Employers links </div>                    ← عمود 3
      <div> Contact icons </div>                      ← عمود 4
    </div>
    <div class="border-t mt-section pt-section">      ← Copyright
      Copyright text
    </div>
  </div>
</footer>
```

**العناصر**:
- Grid: 1 col (mobile) → 4 cols (md+)
- Section titles: `variant="subtitle-l" font-bold text-white mb-content`
- Links: `variant="caption-l" text-white/70 hover:text-white`
- Icons: 40×40, `border-white/20`, hover `bg-white/10`
- Copyright: divider + centered text

**الألوان**: كلها shell colors

---

## 4. CONTAINER RULES

| الاستخدام | الـ Class | العرض الأقصى |
|----------|----------|-------------|
| Header, Footer, Main content | `max-w-7xl mx-auto px-6 lg:px-8` | 1280px |
| Hero content | `max-w-5xl mx-auto` | 1024px |
| Hero search | `max-w-2xl mx-auto` | 672px |
| Hero carousel | `max-w-4xl mx-auto` | 896px |
| Auth pages | `max-w-md mx-auto px-4` | 448px |

**الـ padding**:
- Mobile: `px-6` (24px)
- Desktop (lg+): `px-8` (32px)

---

## 5. PAGE LAYOUT PATTERNS

### Pattern A: Homepage (sidebar + content)
```
<div class="max-w-7xl mx-auto px-6 lg:px-8 py-section">
  <div class="grid grid-cols-1 lg:grid-cols-home-sidebar-lg xl:grid-cols-home-sidebar-xl gap-section">
    <HomeSidebar />                    ← order-1 (يظهر فوق على mobile)
    <div class="space-y-section order-2">
      Sections...
    </div>
  </div>
</div>
```
- Sidebar: 290px (lg) / 310px (xl)
- Mobile: sidebar يظهر فوق content (order-1)
- Gap: `gap-section` (32px)

### Pattern B: Auth pages (centered narrow)
```
<div class="min-h-screen flex items-center justify-center bg-surface">
  <div class="max-w-md mx-auto px-4 w-full">
    Auth form...
  </div>
</div>
```
- Centered vertically + horizontally
- Narrow width (448px max)
- Full height

### Pattern C: List pages (when built)
```
<div class="max-w-7xl mx-auto px-6 lg:px-8 py-section">
  <BaseBreadcrumb />
  <div class="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-section">
    <aside> Filters </aside>
    <section> Content list </section>
  </div>
</div>
```
- Same as homepage pattern
- Filters sidebar on desktop
- Filters drawer on mobile

### Pattern C: Detail pages (when built)
```
<div class="max-w-7xl mx-auto px-6 lg:px-8 py-section">
  <BaseBreadcrumb />
  <div class="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-section">
    <article> Main content </article>
    <aside> Sidebar (apply, related) </aside>
  </div>
</div>
```
- Content + sidebar
- Sidebar sticky on desktop

---

## 6. RESPONSIVE BREAKPOINTS

| Breakpoint | Prefix | الاستخدام |
|-----------|--------|----------|
| 0px+ | (none) | Mobile — كل شيء |
| 640px | `sm:` | Brand name يظهر |
| 768px | `md:` | Nav links تختفي, hamburger يظهر, footer 4 cols |
| 1024px | `lg:` | Sidebar يظهر, grid 2 cols |
| 1280px | `xl:` | Sidebar يتوسع (310px) |
| 1536px | `2xl:` | (غير مستخدم حالياً) |

---

## 7. SPACING RULES للـ LAYOUT

| العنصر | الـ Token | القيمة |
|--------|----------|--------|
| بين أقسام الصفحة | `py-section` | 32px |
| بينSectionsIn grid | `gap-section` | 32px |
| Container padding (mobile) | `px-6` | 24px |
| Container padding (desktop) | `px-8` | 32px |
| Header ارتفاع | `h-14` | 56px |
| Footer section gap | `gap-12` | 48px |
| Footer margin-top | `mt-section` | 32px |
| Footer padding | `py-section` | 32px |
| Hero padding | `hero__section` | 32px / 48px (lg) |

---

## 8. Z-INDEX للـ LAYOUT

| العنصر | الـ Token | القيمة |
|--------|----------|--------|
| Header | `z-sticky` | 50 |
| Carousel arrows | `z-carousel` | 20 |
| Hover indicators | `z-hover` | 10 |
| Dropdown menus | `z-dropdown` | 100 |

---

## 9. MOBILE MENU

**السلوك**:
- Hamburger button: `md:hidden` — يظهر على mobile فقط
- Menu content: `v-show="mobileMenuOpen"` + `md:hidden`
- Links: vertical list, `py-element px-content`
- Close: click on link → `mobileMenuOpen = false`
- Toggle: `useToggle(false)` from VueUse

**الألوان**: shell colors (text-white/80, hover:bg-white/10)

---

## 10. DARK MODE للـ LAYOUT

| العنصر | Light | Dark |
|--------|-------|------|
| Header bg | `bg-primary` | `bg-primary` (نفس اللون) |
| Footer bg | `bg-primary` | `bg-primary` (نفس اللون) |
| Hero bg | `bg-primary` | `bg-primary` (نفس اللون) |
| Content bg | `bg-background` | `bg-background` (بيتغير أوتوماتيك) |

**ملاحظة**: الـ shell areas (header/footer/hero) بتستخدم نفس اللون الأخضر في الوضعين. المحتوى بيتحول أوتوماتيك عبر semantic tokens.

---

## 11. ACCESSIBILITY للـ LAYOUT

| العنصر | الحالة |
|--------|--------|
| Skip link | ✅ موجود في default.vue |
| `<main id="main-content">` | ✅ موجود |
| `<header>` semantic | ✅ |
| `<footer>` semantic | ✅ |
| `<nav>` semantic | ✅ (في header) |
| `aria-label` على actions | ✅ (notifications, login) |
| `aria-hidden` على decorative icons | ✅ |
| focus-visible على أزرار | ✅ |

---

*هذا الملف يجب أن يبقى محدث. أي تغيير في layout يجب توثيقه هنا.*

*لا تنشئ layout جديد بدون مراجعة هذا الملف أولاً.*
