# Design System Guide - Rizqak2

## Overview

The Rizqak2 design system provides a comprehensive set of design tokens and components for building the Arabic job listing platform. All values are centralized in Tailwind CSS 4.2.1 configuration.

---

## Color Palette

### Primary Colors (Green)

Used for primary actions, brand identity, and success states.

| Token                 | Value   | Usage                   |
| --------------------- | ------- | ----------------------- |
| `--color-primary-50`  | #f0fdf4 | Light backgrounds       |
| `--color-primary-100` | #dcfce7 | Hover states, badges    |
| `--color-primary-200` | #bbf7d0 | Secondary backgrounds   |
| `--color-primary-300` | #86efac | Accent backgrounds      |
| `--color-primary-400` | #4ade80 | Success indicators      |
| `--color-primary-500` | #22c55e | Success states          |
| `--color-primary-600` | #16a34a | Primary buttons         |
| `--color-primary-700` | #1B6B4A | **Primary brand color** |
| `--color-primary-800` | #145236 | Primary button hover    |
| `--color-primary-900` | #0f5329 | Dark text on light      |
| `--color-primary-950` | #052e16 | Dark backgrounds        |

### Accent Colors (Gold)

Used for ratings, highlights, and call-to-action elements.

| Token                | Value   | Usage                        |
| -------------------- | ------- | ---------------------------- |
| `--color-accent-500` | #E8B931 | **Star ratings, highlights** |
| `--color-accent-600` | #d97706 | Accent hover                 |
| `--color-accent-700` | #b45309 | Accent dark                  |

### Neutral Colors

Used for backgrounds, text, and borders.

| Token                 | Value   | Usage            |
| --------------------- | ------- | ---------------- |
| `--color-neutral-50`  | #fafafa | Page backgrounds |
| `--color-neutral-100` | #f5f5f5 | Card backgrounds |
| `--color-neutral-200` | #e5e5e5 | Borders          |
| `--color-neutral-300` | #d4d4d3 | Disabled states  |
| `--color-neutral-400` | #a3a3a3 | Placeholder text |
| `--color-neutral-500` | #737373 | Secondary text   |
| `--color-neutral-600` | #525252 | Body text        |
| `--color-neutral-700` | #404040 | Headings         |
| `--color-neutral-800` | #262626 | Dark surfaces    |
| `--color-neutral-900` | #171717 | Dark text        |

### Semantic Colors

| Token                | Value   | Usage               |
| -------------------- | ------- | ------------------- |
| `--color-success`    | #38a169 | Success messages    |
| `--color-success-bg` | #f0fff4 | Success backgrounds |
| `--color-warning`    | #dd6b20 | Warning messages    |
| `--color-warning-bg` | #fffaf0 | Warning backgrounds |
| `--color-error`      | #e53e3e | Error messages      |
| `--color-error-bg`   | #fff5f5 | Error backgrounds   |
| `--color-info`       | #3182ce | Info messages       |
| `--color-info-bg`    | #ebf8ff | Info backgrounds    |

---

## Typography

### Font Family

- **Primary**: `'Cairo', system-ui, -apple-system, sans-serif`
- **Display**: `'Cairo', system-ui, sans-serif`

### Font Sizes

| Token              | Value            | Usage              |
| ------------------ | ---------------- | ------------------ |
| `--font-size-xs`   | 0.75rem (12px)   | Captions, badges   |
| `--font-size-sm`   | 0.875rem (14px)  | Body text, buttons |
| `--font-size-base` | 1rem (16px)      | Default text       |
| `--font-size-lg`   | 1.125rem (18px)  | Subtitles          |
| `--font-size-xl`   | 1.3125rem (21px) | Card titles        |
| `--font-size-2xl`  | 1.5rem (24px)    | Page titles        |
| `--font-size-3xl`  | 1.875rem (30px)  | Hero text          |
| `--font-size-4xl`  | 2.25rem (36px)   | Landing hero       |

### Font Weights

| Token                     | Value | Usage           |
| ------------------------- | ----- | --------------- |
| `--font-weight-light`     | 300   | Decorative      |
| `--font-weight-regular`   | 400   | Body text       |
| `--font-weight-medium`    | 500   | Medium emphasis |
| `--font-weight-semibold`  | 600   | Buttons, labels |
| `--font-weight-bold`      | 700   | Headings        |
| `--font-weight-extrabold` | 800   | Hero text       |

---

## Spacing

Based on 4px grid system.

| Token          | Value          | Usage            |
| -------------- | -------------- | ---------------- |
| `--spacing-1`  | 0.25rem (4px)  | Tight spacing    |
| `--spacing-2`  | 0.5rem (8px)   | Icon gaps        |
| `--spacing-3`  | 0.75rem (12px) | Small elements   |
| `--spacing-4`  | 1rem (16px)    | Standard spacing |
| `--spacing-5`  | 1.25rem (20px) | Card padding     |
| `--spacing-6`  | 1.5rem (24px)  | Section spacing  |
| `--spacing-8`  | 2rem (32px)    | Large gaps       |
| `--spacing-10` | 2.5rem (40px)  | Section margins  |
| `--spacing-12` | 3rem (48px)    | Hero spacing     |
| `--spacing-16` | 4rem (64px)    | Page sections    |

---

## Border Radius

**Note**: Rizqak2 uses zero border radius (0px) as the brand standard for most elements.

| Token           | Value  | Usage                        |
| --------------- | ------ | ---------------------------- |
| `--radius-none` | 0      | **Default (brand standard)** |
| `--radius-sm`   | 0      | Small elements               |
| `--radius-md`   | 0      | Standard elements            |
| `--radius-lg`   | 0      | Cards                        |
| `--radius-xl`   | 0      | Modals                       |
| `--radius-full` | 9999px | **Avatars, badges, pills**   |

---

## Shadows

| Token            | Value                            | Usage         |
| ---------------- | -------------------------------- | ------------- |
| `--shadow-xs`    | 0 1px 2px rgba(0,0,0,0.05)       | Subtle        |
| `--shadow-sm`    | 0 1px 3px rgba(0,0,0,0.06)       | Cards default |
| `--shadow-md`    | 0 2px 8px rgba(0,0,0,0.08)       | Hover states  |
| `--shadow-lg`    | 0 4px 16px rgba(0,0,0,0.12)      | Modals        |
| `--shadow-xl`    | 0 8px 32px rgba(0,0,0,0.16)      | Dropdowns     |
| `--shadow-inner` | inset 0 2px 4px rgba(0,0,0,0.06) | Inset         |

### Hierarchy & Navigation Tokens (New 2026)

| Token                     | Value          | Component     |
| ------------------------- | -------------- | ------------- |
| **Hierarchy Line Width**  | 1.1px          | Tree Filters  |
| **Hierarchy Line Color**  | #1B6B4A        | Tree Filters  |
| **Nav Tab Indicator**     | 2px (Vertical) | Layout Header |
| **Nav Active Background** | bg-white/10    | Layout Header |

---

## Z-Index Scale

| Token                | Value | Usage               |
| -------------------- | ----- | ------------------- |
| `--z-dropdown`       | 100   | Dropdown menus      |
| `--z-sticky`         | 200   | Sticky headers      |
| `--z-fixed`          | 300   | Fixed position      |
| `--z-modal-backdrop` | 400   | Modal overlay       |
| `--z-modal`          | 500   | Modal dialog        |
| `--z-popover`        | 600   | Popovers            |
| `--z-tooltip`        | 700   | Tooltips            |
| `--z-toast`          | 800   | Toast notifications |

---

## Usage Guidelines

### Colors

- **Primary-700** (`#1B6B4A`): Use for primary buttons, links, active states
- **Primary-600**: Use for button hover states
- **Primary-100**: Use for success badges, light backgrounds
- **Neutral-500**: Use for secondary text
- **Neutral-600**: Use for body text

### Typography

- **Headings**: Use `--font-weight-bold` with appropriate sizes
- **Body**: Use `--font-size-sm` with `--font-weight-regular`
- **Buttons**: Use `--font-size-sm` with `--font-weight-semibold`

### Spacing

- Use `--spacing-4` for standard card padding
- Use `--spacing-6` for section gaps
- Use `--spacing-8` for large separations

### Components

All components are defined in `app/shared/components/base/`. Use these exclusively instead of building from scratch.

---

## CSS Variables vs Tailwind Utilities

The design system provides both CSS variables (for custom CSS) and Tailwind utilities:

```css
/* Using CSS variables in custom CSS */
.card {
  background-color: var(--color-surface);
  padding: var(--spacing-6);
}

/* Using Tailwind utilities in templates */
<div class="bg-surface p-6">
```

Both approaches are valid. Choose based on context.
