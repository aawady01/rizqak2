# Rizqak Design System v1.0

> Version: 1.0.0
> Last Updated: 2026-03-08
> Project: Rizqak (رزقك) - Egyptian Job Portal

## Table of Contents

1. [Design Principles](#design-principles)
2. [Color System](#color-system)
3. [Typography System](#typography-system)
4. [Spacing System](#spacing-system)
5. [Border Radius System](#border-radius-system)
6. [Shadow System](#shadow-system)
7. [Z-Index Scale](#z-index-scale)
8. [Component Library](#component-library)
9. [RTL Implementation](#rtl-implementation)
10. [Dark Mode](#dark-mode)

---

## Design Principles

### Core Values
- **Trustworthy**: Professional appearance with green (#1B6B4A) primary color
- **Fast**: Mobile-first, performant by default
- **Culturally Appropriate**: Arabic-first design with Cairo font
- **Clean**: Minimalist aesthetic with generous whitespace

### Technical Standards
- All spacing uses logical CSS properties (padding-inline-*, margin-inline-*)
- All text uses Cairo font family
- All colors defined as CSS custom properties
- All components use Composition API with `<script setup lang="ts">`

---

## Color System

### Primary Color (Green)
The primary brand color representing trust and growth.

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `--color-primary-50` | `#f0fdf4` | - | Hover backgrounds |
| `--color-primary-100` | `#dcfce7` | - | Badge backgrounds |
| `--color-primary-200` | `#bbf7d0` | - | Selection highlight |
| `--color-primary-300` | `#86efac` | - | Accent borders |
| `--color-primary-400` | `#4ade80` | - | Success indicators |
| `--color-primary-500` | `#22c55e` | - | Interactive elements |
| `--color-primary-600` | `#16a34a` | - | Button hover |
| `--color-primary-700` | `#1b6b4a` | - | Primary buttons, links |
| `--color-primary-800` | `#145236` | - | Badge text |
| `--color-primary-900` | `#0f5329` | - | Dark mode text |
| `--color-primary-950` | `#052e16` | - | Dark backgrounds |
| `--color-primary-dark` | `#145239` | - | Dark mode primary |

### Accent Color (Gold)
Used for star ratings and premium features.

| Token | Light Mode | Usage |
|-------|------------|-------|
| `--color-accent-50` | `#fffbeb` | Subtle backgrounds |
| `--color-accent-100` | `#fef3c7` | Hover states |
| `--color-accent-200` | `#fde68a` | Active states |
| `--color-accent-300` | `#fcd34d` | Focus rings |
| `--color-accent-400` | `#fbbf24` | Default state |
| `--color-accent-500` | `#e8b931` | Star ratings |
| `--color-accent-600` | `#d97706` | Emphasis |
| `--color-gold-star` | `#e8b931` | Star icon fill |

### Neutral Color (Grays)
For text, backgrounds, and borders.

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `--color-neutral-50` | `#fafafa` | - | Page backgrounds |
| `--color-neutral-100` | `#f5f5f5` | `#1a1a1a` | Card backgrounds |
| `--color-neutral-200` | `#e5e5e5` | `#262626` | Borders |
| `--color-neutral-300` | `#d4d4d4` | `#404040` | Disabled states |
| `--color-neutral-400` | `#a3a3a3` | `#525252` | Muted text |
| `--color-neutral-500` | `#737373` | `#737373` | Secondary text |
| `--color-neutral-600` | `#525252` | `#525252` | Body text |
| `--color-neutral-700` | `#404040` | `#d4d4d4` | Headings dark |
| `--color-neutral-800` | `#262626` | `#e5e5e5` | Light mode headings |
| `--color-neutral-900` | `#171717` | `#f5f5f5` | Dark text |
| `--color-neutral-950` | `#0a0a0a` | `#fafafa` | Dark backgrounds |

### Semantic Colors

#### Backgrounds
| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `--color-bg-primary` | `#f3f4f6` | `#0a0a0a` | Page background |
| `--color-bg-secondary` | `#ffffff` | `#171717` | Card background |
| `--color-bg-tertiary` | `#e5e7eb` | `#262626` | Alternate sections |
| `--color-surface` | `#ffffff` | `#171717` | Interactive surfaces |
| `--color-surface-hover` | `#f9fafb` | `#262626` | Hover state |
| `--color-surface-overlay` | `rgba(0, 0, 0, 0.5)` | - | Modal overlays |

#### Text
| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `--color-text-primary` | `#1a1a1a` | `#f5f5f5` | Primary text |
| `--color-text-secondary` | `#666666` | `#a3a3a3` | Secondary text |
| `--color-text-tertiary` | `#999999` | `#737373` | Placeholder text |
| `--color-text-muted` | `#999999` | `#737373` | Disabled text |
| `--color-text-inverse` | `#ffffff` | `#0a0a0a` | Text on dark bg |
| `--color-text-on-primary` | `#ffffff` | `#ffffff` | Text on primary |

#### Borders
| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `--color-border-default` | `#e2e2e2` | `#404040` | Default borders |
| `--color-border-light` | `#f0f0f0` | `#262626` | Subtle borders |
| `--color-border-strong` | `#c0c0c0` | `#525252` | Emphasized borders |
| `--color-border-focus` | `#1b6b4a` | `#22c55e` | Focus rings |
| `--color-separator` | `#d1d5db` | `#404040` | Dividers |

#### Status Colors
| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `--color-success` | `#38a169` | `#22c55e` | Success states |
| `--color-success-bg` | `#f0fff4` | `#052e16` | Success backgrounds |
| `--color-success-light` | `#c6f6d5` | `#145239` | Success accents |
| `--color-warning` | `#dd6b20` | `#fb923c` | Warning states |
| `--color-warning-bg` | `#fffaf0` | `#451a03` | Warning backgrounds |
| `--color-warning-light` | `#feebc8` | `#78350f` | Warning accents |
| `--color-error` | `#e53e3e` | `#f87171` | Error states |
| `--color-error-bg` | `#fff5f5` | `#450a0a` | Error backgrounds |
| `--color-error-light` | `#fed7d7` | `#7f1d1d` | Error accents |
| `--color-info` | `#3182ce` | `#60a5fa` | Info states |
| `--color-info-bg` | `#ebf8ff` | `#1e3a5f` | Info backgrounds |
| `--color-info-light` | `#bee3f8` | `#1e40af` | Info accents |

---

## Typography System

### Font Family
Primary font: **Cairo** (Google Fonts)

```css
--font-family-sans: "Cairo", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
--font-family-display: "Cairo", system-ui, sans-serif;
```

### Typography Scale (Design System v2)

| Token | Font Size | Line Height | Weight | Usage |
|-------|-----------|-------------|--------|-------|
| `--font-size-ds-display` | 36px | 1.25 | 700 | Hero title |
| `--font-size-ds-title` | 22px | 1.4 | 700 | Job titles |
| `--font-size-ds-heading` | 17px | 1.5 | 600 | Section headings |
| `--font-size-ds-body` | 15px | 1.55 | 400 | Body text |
| `--font-size-ds-sm` | 13px | 1.55 | 400 | Small text |
| `--font-size-ds-caption` | 12px | 1.5 | 500 | Labels, badges |
| `--font-size-ds-xs` | 10px | 1.45 | 500 | Tiny text |

### Tailwind Typography Aliases
The following custom utility classes are available:

| Class | Maps To | Usage |
|-------|---------|-------|
| `.text-ds-display` | 36px, 700, 1.25 | Hero headings |
| `.text-ds-title` | 22px, 700, 1.4 | Card titles |
| `.text-ds-heading` | 17px, 600, 1.5 | Section headings |
| `.text-ds-body` | 15px, 400, 1.55 | Body text |
| `.text-ds-sm` | 13px, 400, 1.55 | Small text |
| `.text-ds-caption` | 12px, 500, 1.5 | Captions |
| `.text-ds-xs` | 10px, 500, 1.45 | Tiny text |

### Font Weights
| Token | Value | Usage |
|-------|-------|-------|
| `--font-weight-light` | 300 | Light text |
| `--font-weight-regular` | 400 | Body text |
| `--font-weight-medium` | 500 | Labels |
| `--font-weight-semibold` | 600 | Headings |
| `--font-weight-bold` | 700 | Emphasis |
| `--font-weight-extrabold` | 800 | Display |

---

## Spacing System

### Design System Spacing Tokens
These are the semantic spacing tokens used throughout the project:

| Token | Value | Usage |
|-------|-------|-------|
| `--spacing-section` | 32px | Section vertical padding |
| `--spacing-content` | 16px | Card/content padding |
| `--spacing-element` | 12px | Element gaps |
| `--spacing-compact` | 8px | Tight gaps |

### Tailwind Spacing Aliases
The following custom utility classes are available:

| Class | Maps To | Usage |
|-------|---------|-------|
| `.px-content` | 16px | Content horizontal padding |
| `.py-content` | 16px | Content vertical padding |
| `.p-content` | 16px | Content padding (all) |
| `.gap-element` | 12px | Element gaps |
| `.gap-compact` | 8px | Tight gaps |
| `.gap-section` | 32px | Section gaps |
| `.mt-section` | 32px | Section margin top |
| `.mb-section` | 32px | Section margin bottom |
| `.py-section` | 32px | Section vertical padding |
| `.px-section` | 32px | Section horizontal padding |

### Tailwind Default Spacing Scale
Available via Tailwind utilities (e.g., `p-4`, `m-2`, `gap-6`):

| Token | Value |
|-------|-------|
| `--spacing-0` | 0 |
| `--spacing-0.5` | 0.125rem (2px) |
| `--spacing-1` | 0.25rem (4px) |
| `--spacing-1.5` | 0.375rem (6px) |
| `--spacing-2` | 0.5rem (8px) |
| `--spacing-2.5` | 0.625rem (10px) |
| `--spacing-3` | 0.75rem (12px) |
| `--spacing-3.5` | 0.875rem (14px) |
| `--spacing-4` | 1rem (16px) |
| `--spacing-5` | 1.25rem (20px) |
| `--spacing-6` | 1.5rem (24px) |
| `--spacing-7` | 1.75rem (28px) |
| `--spacing-8` | 2rem (32px) |
| `--spacing-9` | 2.25rem (36px) |
| `--spacing-10` | 2.5rem (40px) |
| `--spacing-12` | 3rem (48px) |
| `--spacing-16` | 4rem (64px) |
| `--spacing-20` | 5rem (80px) |
| `--spacing-24` | 6rem (96px) |

---

## Border Radius System

### Current Implementation
The design system uses **zero border radius** (sharp corners):

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-none` | 0 | Default |
| `--radius-sm` | 0 | Small elements |
| `--radius-md` | 0 | Medium elements |
| `--radius-lg` | 0 | Large elements |
| `--radius-xl` | 0 | Extra large |
| `--radius-full` | 9999px | Pills, avatars |

### Component Usage
- **Buttons**: `0` radius (sharp)
- **Cards**: `0` radius (sharp)
- **Inputs**: `0` radius (sharp)
- **Badges**: `9999px` (pill shape)
- **Avatars**: `9999px` (circular)

---

## Shadow System

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-xs` | `0 1px 2px rgba(0, 0, 0, 0.05)` | Subtle |
| `--shadow-sm` | `0 1px 3px rgba(0, 0, 0, 0.06)` | Cards default |
| `--shadow-md` | `0 2px 8px rgba(0, 0, 0, 0.08)` | Elevated |
| `--shadow-lg` | `0 4px 16px rgba(0, 0, 0, 0.12)` | Dropdowns |
| `--shadow-xl` | `0 8px 32px rgba(0, 0, 0, 0.16)` | Modals |
| `--shadow-inner` | `inset 0 2px 4px rgba(0, 0, 0, 0.06)` | Inset |

### Usage by Component
- **Cards**: `shadow-sm` default, `shadow-md` on hover
- **Dropdowns**: `shadow-lg`
- **Modals**: `shadow-xl`
- **Navbar**: `shadow-md`

---

## Z-Index Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--z-dropdown` | 100 | Dropdown menus |
| `--z-sticky` | 200 | Sticky headers |
| `--z-fixed` | 300 | Fixed elements |
| `--z-modal-backdrop` | 400 | Modal overlay |
| `--z-modal` | 500 | Modal content |
| `--z-popover` | 600 | Popovers |
| `--z-tooltip` | 700 | Tooltips |
| `--z-toast` | 800 | Toast notifications |

---

## Component Library

### Atomic Components

#### BaseButton
- **Location**: `app/shared/components/base/BaseButton.vue`
- **Variants**: default, destructive, outline, secondary, ghost, link
- **Sizes**: sm, default, lg, icon
- **Props**:
  - `variant`: Button variant
  - `size`: Button size
  - `disabled`: Boolean
  - `type`: button | submit | reset

#### BaseInput
- **Location**: `app/shared/components/base/BaseInput.vue`
- **Features**: Label support, error states, focus rings
- **Props**:
  - `modelValue`: string | number
  - Standard input attributes

#### BaseBadge
- **Location**: `app/shared/components/base/BaseBadge.vue`
- **Variants**: default, secondary, destructive, outline
- **Props**:
  - `variant`: Badge variant

#### BaseCard
- **Location**: `app/shared/components/base/BaseCard.vue`
- **Features**: Header, content, footer slots
- **Props**:
  - `title`: string
  - `description`: string

#### BaseFlag
- **Location**: `app/components/base/BaseFlag.vue`
- **Sizes**: sm (24x18px), md (32x24px), lg (48x36px)
- **Props**:
  - `countryCode`: ISO 3166-1 alpha-2
  - `size`: sm | md | lg

### Molecular Components

#### LayoutHeader (Navbar)
- **Location**: `app/components/layout/LayoutHeader.vue`
- **Features**: Logo, nav links, mobile menu, dark mode toggle
- **Responsive**: Desktop nav hidden on mobile, hamburger menu

#### LayoutFooter
- **Location**: `app/components/layout/LayoutFooter.vue`
- **Sections**: Brand, job seeker links, employer links, contact

#### JobCard
- **Location**: `app/components/jobs/JobCard.vue`
- **Features**: Company logo, title, location, salary, benefits, save button
- **Hover**: Vertical green indicator on right edge

#### CompanyCard
- **Location**: `app/components/companies/CompanyCard.vue**
- **Features**: Logo, name, rating, job count

#### CountryCard
- **Location**: `app/components/home/CountryCard.vue**
- **Features**: Flag, country name, job count

---

## RTL Implementation

### Configuration
The entire application is RTL-first:

```html
<html lang="ar" dir="rtl">
```

### Logical Properties Used
All spacing and positioning uses logical properties:

| Physical | Logical | Usage |
|----------|---------|-------|
| `margin-left` | `margin-inline-start` | Start margin |
| `margin-right` | `margin-inline-end` | End margin |
| `padding-left` | `padding-inline-start` | Start padding |
| `padding-right` | `padding-inline-end` | End padding |
| `text-align: left` | `text-align: start` | Start text |
| `text-align: right` | `text-align: end` | End text |

### Tailwind Logical Classes
- `ms-*` = margin-inline-start
- `me-*` = margin-inline-end
- `ps-*` = padding-inline-start
- `pe-*` = padding-inline-end

### Icon Direction
All directional icons (arrows, chevrons) are positioned to work correctly in RTL:
- ChevronRight (→) indicates "forward/next"
- ChevronLeft (←) indicates "back/previous"

---

## Dark Mode

### Implementation
Dark mode is toggled via class on `<html>` element:

```javascript
document.documentElement.classList.toggle('dark')
```

### Toggle Location
Located in `LayoutHeader.vue` with sun/moon icons.

### Current Dark Mode Tokens
Dark mode support is **partially implemented**. The following tokens have dark mode values:

| Token | Light Mode | Dark Mode |
|-------|------------|-----------|
| `--color-bg-primary` | `#f3f4f6` | `#0a0a0a` |
| `--color-surface` | `#ffffff` | `#171717` |
| `--color-text-primary` | `#1a1a1a` | `#f5f5f5` |
| `--color-border-default` | `#e2e2e2` | `#404040` |

### Missing Dark Mode Tokens
The following need dark mode values to be fully implemented:
- All primary color variants
- All accent color variants
- All status colors (success, warning, error, info)
- Card shadows
- Input backgrounds
- Badge colors

---

## Container System

### Max Width
```css
--container-max-width: 1200px;
```

### Padding
```css
--container-padding: 1rem; /* 16px */
```

### Breakpoints
| Breakpoint | Width | Suffix |
|------------|-------|--------|
| sm | 640px | sm: |
| md | 768px | md: |
| lg | 1024px | lg: |
| xl | 1280px | xl: |
| 2xl | 1536px | 2xl: |

### Container Usage
```html
<div class="max-w-7xl mx-auto px-content sm:px-6 lg:px-section">
```

---

## Transitions

### Duration
| Token | Value | Usage |
|-------|-------|-------|
| `--transition-duration-fast` | 150ms | Color changes |
| `--transition-duration-normal` | 200ms | Hover states |
| `--transition-duration-base` | 250ms | Page transitions |
| `--transition-duration-slow` | 350ms | Large animations |

### Timing Functions
| Token | Value |
|-------|-------|
| `--transition-timing-function-default` | ease |
| `--transition-timing-function-in` | ease-in |
| `--transition-timing-function-out` | ease-out |
| `--transition-timing-function-in-out` | ease-in-out |

---

## Icons

### Icon Library
**Lucide Vue Next** - `lucide-vue-next`

### Common Icons Used
- `Search` - Search input
- `BellDot` - Notifications
- `SquareUser` - User account
- `Moon` / `Sun` - Dark mode toggle
- `LayoutGrid` - Mobile menu
- `X` - Close/clear
- `Building2` - Company
- `Wallet` - Salary
- `ChevronRight` / `ChevronLeft` - Navigation
- `Star` - Ratings
- `SlidersHorizontal` - Filters

### Icon Sizing
- Default icons: `w-5 h-5` (20px)
- Small icons: `w-4 h-4` (16px)
- Large icons: `w-6 h-6` (24px)
- Icon stroke: `1.75` or `2.5`

---

## File Structure

```
app/
├── assets/
│   └── css/
│       └── main.css              # Design tokens & base styles
├── components/
│   ├── base/
│   │   └── BaseFlag.vue          # Country flag component
│   ├── companies/
│   │   └── CompanyCard.vue        # Company card
│   ├── filters/
│   │   ├── TreeFilterSection.vue
│   │   ├── SimpleFilter.vue
│   │   └── GenderFilter.vue
│   ├── home/
│   │   ├── HomeHero.vue          # Hero section
│   │   ├── HomeSidebar.vue       # Filter sidebar
│   │   ├── HomeJobList.vue       # Job listings
│   │   ├── HomeFeaturedCompanies.vue
│   │   └── CountryCard.vue
│   ├── jobs/
│   │   └── JobCard.vue           # Job card
│   └── layout/
│       ├── LayoutHeader.vue      # Navbar
│       └── LayoutFooter.vue      # Footer
├── core/
│   └── api/
│       ├── client.ts             # API client
│       └── seo.ts                # SEO composables
├── shared/
│   ├── components/
│   │   └── base/
│   │       ├── BaseButton.vue
│   │       ├── BaseInput.vue
│   │       ├── BaseBadge.vue
│   │       ├── BaseCard.vue
│   │       └── ...
│   ├── composables/
│   │   └── ...
│   ├── types/
│   │   └── index.ts              # TypeScript types
│   └── utils/
│       ├── tailwind.ts           # cn() utility
│       └── mockData.ts           # Mock data & types
├── pages/
│   ├── index.vue                 # Homepage
│   └── jobs/
│       └── [id].vue              # Job detail
├── stores/
│   ├── auth.ts
│   └── ui.ts
└── app.vue                       # Root component
```

---

## Usage Guidelines

### Creating a New Component
1. Use `<script setup lang="ts">`
2. Define props with TypeScript interfaces
3. Use design tokens from CSS custom properties
4. Use Tailwind utilities for common styles
5. Add JSDoc comments for documentation

### Using Design Tokens
```vue
<script setup lang="ts">
// Use CSS custom properties
const buttonStyle = {
  color: 'var(--color-primary-700)',
  padding: 'var(--spacing-compact) var(--spacing-content)',
}
</script>

<template>
  <!-- Or use Tailwind utilities with design tokens -->
  <button class="bg-primary text-white p-compact p-content">
    Button
  </button>
</template>
```

### Adding New Pages
1. Create page in `app/pages/`
2. Use existing layout components (LayoutHeader, LayoutFooter)
3. Apply SEO metadata using `useSeoMeta()`
4. Add structured data using `useJsonLd()`
5. Follow responsive design patterns

---

## Notes

- Border radius is 0 throughout (sharp corners)
- All interactive elements have focus states with `--color-border-focus`
- Mobile-first responsive approach
- Arabic-first content (RTL)
- Touch targets minimum 44x44px on mobile
