# DESIGN LANGUAGE — Extracted from Homepage

> **Source**: Working homepage components as of 2026-03-17
> **Rule**: This document is the visual law. Every new page must follow these rules exactly.
> **Rule**: If the homepage uses a hardcoded value, it gets mapped to a token. Visual result stays the same.

---

## 1. COLOR USAGE RULES

### 1.1 When to Use Each Color

| Context | Color | Example |
|---------|-------|---------|
| Brand actions, primary CTA | `bg-primary` / `text-primary` | Search button, Apply button, section icons |
| Brand actions hover | `bg-primary-dark` / `hover:bg-primary-dark` | Button hover |
| Accent/attention | `text-accent-500` / `fill-accent-500` | Star ratings |
| Page background | `bg-background` (→ `bg-primary`) | Body, hero section |
| Card surface | `bg-white` (→ should be `bg-surface`) | JobCard, CompanyCard |
| Card surface alt | `bg-neutral-50` (→ should be `bg-surface-alt`) | Benefits tags, logo container |
| Primary text | `text-ds-foreground` | Titles, headings |
| Secondary text | `text-neutral-500` | Body text, location, company name |
| Tertiary/hint text | `text-neutral-400` | Time ago, review count, icons |
| Caption text | `text-neutral-400` | Metadata |
| Primary link | `text-primary` / `text-primary hover:text-primary-dark` | Hashtags, section subtitles |
| Shell text (header/footer) | `text-white` with opacities: `/90`, `/80`, `/70`, `/60` | Header links, footer text |
| Shell surface | `bg-shell-bg` (→ `bg-primary-600`) | Header, footer background |
| Shell hover | `bg-white/10`, `bg-white/5` | Nav link hover, button hover |
| Shell border | `border-white/10`, `border-white/20` | Header border, footer divider |
| Card border | `border-ds-border` | JobCard, CompanyCard borders |
| Card hover border | `hover:border-primary/40` | Card hover indicator |
| Error | `bg-error-bg border-error text-error` | Form error messages |
| Success | `bg-success-bg` | Success states |
| Salary badge | `text-primary bg-primary/5 border border-primary/10` | Salary pill |

### 1.2 Hardcoded Colors Found (Need Token Mapping)

| Location | Current Value | Should Be Token |
|----------|---------------|-----------------|
| JobCard line 53 | `bg-white` | `bg-surface` |
| JobCard line 64 | `bg-white` | `bg-surface` |
| JobCard line 163 | `bg-neutral-50` | `bg-surface-alt` |
| CompanyCard line 41 | `bg-white` | `bg-surface` |
| CompanyCard line 57 | `bg-neutral-50` | `bg-surface-alt` |
| HomeFeaturedCompanies line 39 | `bg-white` | `bg-surface` |
| All cards | `text-neutral-400` | `text-foreground-muted` |
| All cards | `text-neutral-500` | `text-foreground-secondary` |
| Hero search icon | `text-neutral-400` | `text-foreground-muted` |

---

## 2. TYPOGRAPHY RULES

### 2.1 Typography Hierarchy

| Role | Variant | Weight | Color | Component |
|------|---------|--------|-------|-----------|
| Hero headline | `display-l` | default (bold in token) | `text-white` | HomeHero h1 |
| Section title | `h3` | `font-bold` | `text-ds-foreground` | HomeJobList, HomeFeaturedCompanies, HomeSidebar |
| Card title (job) | `h3` | `font-bold` | `text-ds-foreground` → hover `text-primary` | JobCard h3 |
| Card title (company) | `body-r` | `font-bold` | `text-ds-foreground` → hover `text-primary` | CompanyCard h4 |
| Hashtag/meta link | `caption-l` | `font-bold` | `text-primary` | JobCard |
| Body text | `body-s` | `font-medium` | `text-neutral-500` | JobCard location/company |
| Caption/metadata | `caption-r` | `font-medium` | `text-neutral-400` | JobCard time ago |
| Small caption | `caption-s` | default | `text-neutral-400` | CompanyCard review count |
| Nav link | `body-r` | `font-semibold` | `text-white/90` → hover `text-white` | LayoutHeader |
| Footer section title | `subtitle-l` | `font-bold` | `text-white` | LayoutFooter |
| Footer link | `caption-l` | default | `text-white/70` → hover `text-white` | LayoutFooter |
| Footer copyright | `caption-s` | default | `text-white/60` | LayoutFooter |
| Country name | `caption-l` | `font-bold` | `text-white/90` | CountryCard |
| Country job count | `subtitle-l` | `font-bold` | `text-white` | CountryCard |
| Country job label | `caption-s` | default | `text-white/60` | CountryCard |
| Section subtitle link | `caption-l` | `font-medium` | `text-primary` | HomeFeaturedCompanies |
| Hero subtitle | `subtitle-l` | default | white (inherits) | HomeHero |
| Brand name | `h3` | default | `text-white` | Header, Footer |
| Brand initial | `body-l` | `font-bold` | `text-white` | Header, Footer |

### 2.2 DS Typography Scale (from main.css)

```
display-xxl: 80px / 1.05
display-xl:  64px / 1.1
display-l:   36px / 1.2     ← Hero headline
h1:          30px / 1.3
h2:          24px / 1.3
h3:          20px / 1.4     ← Section titles, card titles
h4:          18px / 1.4
h5:          16px / 1.4
h6:          14px / 1.5
subtitle-l:  18px / 1.5     ← Hero subtitle, footer section titles
subtitle-r:  16px / 1.5
body-l:      18px / 1.6
body-r:      14px / 1.6     ← Nav links
body-s:      13px / 1.6     ← Body text in cards
caption-l:   12px / 1.4     ← Hashtags, links
caption-r:   11px / 1.4     ← Time ago, metadata
caption-s:   10px / 1.4     ← Smallest text
label-l:     14px / 1.4
label-r:     13px / 1.4
label-s:     11px / 1.4
```

---

## 3. SPACING RULES

### 3.1 Semantic Spacing Tokens (from main.css)

```
--spacing-section:  32px    Between page sections (footer mt-16 = 64px total)
--spacing-content:  16px    Between content blocks, sidebar sections gap, card padding
--spacing-element:  12px    Between sibling elements
--spacing-compact:   8px    Within elements, icon-text gap, card row gap
```

### 3.2 Spacing Usage

| Context | Value | Token |
|---------|-------|-------|
| Page section gap (hero to content) | `mt-16` (64px) | Not tokenized yet |
| Between homepage sections | `space-section` (32px) | `--spacing-section` |
| Section header to content | `mb-6` (24px) / `mb-content` (16px) | Mixed |
| Card internal padding | `p-5` (20px) for JobCard, `p-4` (16px) for CompanyCard | Not tokenized |
| Card grid gap | `gap-5` (20px) for companies, `space-compact` (8px) for jobs | Mixed |
| Icon-text gap | `gap-2` (8px) / `gap-compact` (8px) | `--spacing-compact` |
| Sidebar internal sections | `space-y-6` (24px) / `pt-5` (20px) | Mixed |
| Footer grid gap | `gap-12` (48px) | Not tokenized |
| Footer internal link spacing | `space-y-3` (12px) | `--spacing-element` |
| Header height | `h-14` (56px) | Not tokenized |
| Button padding | `px-6 py-2.5` (default), `px-8 py-3.5` (lg) | Via CVA |

### 3.3 Container

```
max-w-7xl mx-auto px-6 lg:px-8     ← Header, Footer, main content
max-w-5xl mx-auto                   ← Hero content
max-w-2xl mx-auto                   ← Hero search
max-w-4xl mx-auto                   ← Hero carousel
```

---

## 4. CARD RULES

### 4.1 JobCard Pattern

```
Container:
  bg-white (→ bg-surface)
  border border-ds-border
  hover:border-primary/40
  transition-all duration-300
  cursor-default
  group
  overflow-hidden
  rounded-none

Vertical Hover Indicator:
  absolute inset-inline-end-0 top-0 bottom-0
  w-divider-thin (2px)
  bg-primary
  opacity-0 → group-hover:opacity-100
  transition-opacity duration-300
  z-10

Internal Padding: p-5 (20px)

Logo Container:
  size-14 (56px)
  border border-ds-border
  bg-white (→ bg-surface)
  p-2
  shadow-sm
  hover:bg-neutral-50 (→ bg-surface-alt)
  grayscale → hover:grayscale-0

Title: h3 bold, text-ds-foreground → hover:text-primary
Meta: caption-l bold text-primary (hashtag) + caption-r text-neutral-400 (time)
Body: body-s text-neutral-500
Salary: text-primary bg-primary/5 px-3 py-1 border border-primary/10
Benefits: px-2.5 py-1 bg-neutral-50 (→ bg-surface-alt) text-neutral-500 border border-ds-border
Save icon: text-neutral-300 → hover:text-primary, size-7
```

### 4.2 CompanyCard Pattern

```
Container:
  bg-white (→ bg-surface)
  border border-ds-border
  hover:border-primary/40
  transition-all duration-300
  w-full
  group
  overflow-hidden
  rounded-none
  text-center

Vertical Hover Indicator: Same as JobCard

Internal Padding: p-4 (16px)

Logo Container:
  size-14 (56px)
  mx-auto
  bg-neutral-50 (→ bg-surface-alt)
  mb-3
  border border-ds-border
  hover:bg-white (→ bg-surface)
  grayscale → hover:grayscale-0

Name: body-r h4 bold text-ds-foreground → hover:text-primary
Rating: Star fill-accent-500 + caption-r bold + caption-s text-neutral-400
Job count: bg-primary/5 py-1 px-3 border border-primary/10 text-neutral-400
```

### 4.3 CountryCard Pattern (in hero — special context)

```
Container:
  flex flex-col items-center justify-center
  p-4
  border text-white
  transition-all
  h-country-card (110px)
  w-full
  rounded-none

States:
  Default: bg-white/5 border-white/10 hover:bg-white/15 hover:border-white/30
  Selected: bg-white/20 border-white/40 ring-1 ring-white/20

Flag: BaseFlag size="md" (w-8 h-6), mb-3
Country name: caption-l font-bold text-white/90
Job count: subtitle-l font-bold text-white + caption-s text-white/60
```

---

## 5. BUTTON RULES

### 5.1 BaseButton CVA Variants

```
default:    bg-primary text-white hover:bg-primary-dark
destructive: bg-error text-white hover:bg-error-dark
outline:    border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-white
secondary:  bg-neutral-100 text-neutral-900 hover:bg-neutral-200
ghost:      hover:bg-surface-hover hover:text-foreground
link:       text-primary underline-offset-4 hover:underline px-0 py-0

Sizes:
  default: h-10 px-6 py-2.5
  sm:      h-8 px-4 py-1.5 text-caption-l
  lg:      h-12 px-8 py-3.5 text-subtitle-r font-bold
  icon:    size-10
```

### 5.2 Button Usage in Homepage

| Location | Variant | Size |
|----------|---------|------|
| Hero search button | `default` | default |
| Sidebar apply button | raw (bg-primary) | default height |
| Sort dropdown trigger | raw | small |
| Carousel nav arrows | raw (white/15 bg) | icon (size-10) |
| Clear search X | raw | p-2 |

---

## 6. ICON RULES

### 6.1 Icon Sizing

| Context | Size | Class |
|---------|------|-------|
| Inline with text (section headers) | 20px | `w-5 h-5` / `size-5` |
| In buttons | 20px | `size-5` |
| Standalone larger | 24px | `size-6` |
| Company logo placeholder | 28px | `size-7` |
| Country card icon | 24px | `size-6` |
| Bookmark icon | 28px | `size-7` |
| Footer icons | 20px | `size-5` |

### 6.2 Icon Stroke Width

| Context | Stroke Width |
|---------|-------------|
| Section header icons | `:stroke-width="2"` |
| Button/nav icons | `:stroke-width="2"` |
| Carousel arrows | `:stroke-width="3"` (bolder) |
| Search icon | `:stroke-width="2.5"` |
| Company logo placeholder | `:stroke-width="1.5"` (lighter) |

### 6.3 Icon Colors

| Context | Color |
|---------|-------|
| Section header icons | `text-primary` |
| Shell icons (header/footer) | `text-white/90` → hover `text-white` |
| Card meta icons | `text-neutral-400` |
| Accent icons (star) | `text-accent-500 fill-accent-500` |
| Hero search icon | `text-neutral-400` or `text-white` (focus) |

---

## 7. GRID & LAYOUT RULES

### 7.1 Homepage Layout (index.vue)

```
Desktop (lg+):
  grid-cols-home-sidebar-lg (290px 1fr) / xl: grid-cols-home-sidebar-xl (310px 1fr)
  gap-section (32px)

Mobile:
  Single column, sidebar order-1 (appears above content)
```

### 7.2 Company Grid

```
grid-cols-2 md:grid-cols-4 gap-5
```

### 7.3 Country Grid

```
Hero: grid-cols-3 sm:grid-cols-6 gap-4
```

### 7.4 Job List

```
space-y-compact (8px) between cards — stacked list, not grid
```

### 7.5 Footer Grid

```
grid-cols-1 md:grid-cols-4 gap-12
```

---

## 8. STATE RULES

### 8.1 Hover States

| Element | Hover Effect |
|---------|-------------|
| Card (JobCard/CompanyCard) | border → `border-primary/40`, title → `text-primary`, vertical indicator appears |
| Card logo container | bg lightens, grayscale removed |
| Button (default) | `bg-primary-dark` |
| Button (secondary) | `bg-neutral-200` |
| Nav link | `bg-white/5 text-white` |
| Footer link | `text-white` (from `/70`) |
| Shell icon button | `bg-white/10 text-white` |
| Country card | `bg-white/15 border-white/30` |
| Carousel arrow | `bg-white text-primary border-white` |
| Sort option | `bg-state-selected text-state-selected` |
| Bookmark icon | `text-primary` (from `text-neutral-300`) |
| Benefit tag | `bg-neutral-100` |

### 8.2 Focus States

| Element | Focus Effect |
|---------|-------------|
| All interactive | `focus-visible:ring-ds-focus` (from BaseButton CVA) |
| Search input | glow effect (`bg-accent-400 opacity-30 blur-sm`) |
| Filter tree | `filter-tree-focus-ring` custom box-shadow |

### 8.3 Active States

| Element | Active Effect |
|---------|--------------|
| Buttons | `active:scale-95` or `active-scale-subtle` (scale 0.98) |
| Shell buttons | `active:scale-95` |

### 8.4 Selected States

| Element | Selected Effect |
|---------|----------------|
| Country card | `bg-white/20 border-white/40 ring-1 ring-white/20` |
| Sort dropdown option | `bg-state-selected text-state-selected` |
| Nav link (active) | `text-white bg-white/10` |

### 8.5 Loading States

Not implemented in current homepage. Uses mock data.

### 8.6 Empty States

Not implemented in current homepage.

---

## 9. RESPONSIVE RULES

### 9.1 Breakpoints Used

| Breakpoint | Usage |
|-----------|-------|
| (default/mobile) | Single column, hamburger hidden, brand name hidden |
| `sm:` (640px) | Brand name visible, country grid → 6 cols |
| `md:` (768px) | Hamburger appears, footer → 4 cols, company grid → 4 cols, nav hidden |
| `lg:` (1024px) | Sidebar appears, grid → sidebar + content |
| `xl:` (1280px) | Sidebar width increases (290px → 310px) |

### 9.2 Mobile Behavior

| Component | Mobile Behavior |
|-----------|----------------|
| Header | Hamburger menu → slide-down with links |
| Sidebar | `order-1` (appears above content on mobile) — NO drawer/modal yet |
| Country grid | 3 cols (stays 3 on mobile) |
| Company grid | 2 cols |
| Job cards | Full width stacked |
| Footer | Single column stacked |

### 9.3 Container Responsive Padding

```
px-6 lg:px-8    (24px mobile, 32px desktop)
```

---

## 10. DARK MODE RULES

### 10.1 Shell Components (Header/Footer)

These work in dark mode because they use white opacities on dark backgrounds.
The shell bg is `--color-shell-bg` which is currently `--color-primary-600`.
In dark mode, shell bg should be `neutral-950` — NOT IMPLEMENTED YET.

### 10.2 Content Components (Cards, Sidebar)

These BREAK in dark mode because they hardcode `bg-white`.
The dark mode override changes `--color-surface` to `#171717`, but components use `bg-white` directly instead of `bg-surface`.

### 10.3 Dark Mode Token Gaps

| Token | Light Value | Dark Value (MISSING) |
|-------|-------------|---------------------|
| `shell-bg` | `primary-600` | Should be `neutral-950` |
| `shell-text` | `white` | Should be `neutral-100` |
| `shell-border` | `white/10` | Should be `neutral-800` |
| `shell-surface` | `white/10` | Should be `neutral-800/50` |
| `surface-hover` | `#D1FAE5` | Should be `neutral-800` |
| `bg-card` | `white` | Should be `neutral-900` |
| `border` | `neutral-200` | Should be `neutral-700` |

### 10.4 What Works in Dark Mode Now

- ✅ Background colors (bg-primary, bg-background)
- ✅ Text primary/secondary/muted
- ✅ Border default
- ✅ Primary palette colors
- ✅ Neutral palette colors
- ✅ Status colors
- ✅ Filter tree

### 10.5 What Breaks in Dark Mode

- ❌ JobCard `bg-white` — stays white
- ❌ CompanyCard `bg-white` — stays white
- ❌ HomeSidebar `bg-card` — needs dark card color
- ❌ HomeFeaturedCompanies carousel arrows `bg-white` — stays white
- ❌ Header/Footer shell — uses primary-600 bg, should be neutral-950 in dark
- ❌ Benefit tags `bg-neutral-50` — stays light
- ❌ Salary badge `bg-primary/5` — too bright in dark

---

## 11. BORDER RADIUS RULES

**Brand Rule**: Everything is `rounded-none` (0 border radius).

Exceptions found in code:
- `rounded-full` on separator dots (JobCard line 95, 131) — acceptable for decorative dots
- `rounded-flag-sm/md/lg` (2px/3px/4px) on flag images — small, intentional
- `radius-full: 9999px` in tokens — for pill shapes if needed

**All interactive elements** (buttons, cards, inputs, modals) MUST be `rounded-none`.

---

## 12. TRANSITION RULES

| Context | Duration | Usage |
|---------|----------|-------|
| Fast (buttons, small elements) | `duration-150` / `transition-all` | Button hover, icon color |
| Normal (cards, medium elements) | `duration-200` / `duration-300` | Card hover, card border |
| Slow (complex animations) | `duration-500` | Hero glow effect |
| Scale press | `active:scale-95` or `active-scale-subtle` | Button active |
| Carousel arrow | `transition-all duration-300` | Arrow appear/hover |

---

## 13. SEMANTIC HTML PATTERNS

### 13.1 Homepage Structure

```html
<div dir="rtl">
  <header>...</header>          <!-- LayoutHeader -->
  <main>
    <section id="hero">...</section>      <!-- HomeHero -->
    <section id="jobs">                   <!-- HomeJobList -->
      <aside>...</aside>                  <!-- HomeSidebar -->
      <div>Job cards...</div>
    </section>
    <section id="companies">...</section> <!-- HomeFeaturedCompanies -->
  </main>
  <footer id="contact">...</footer>       <!-- LayoutFooter -->
</div>
```

### 13.2 Section Header Pattern

```html
<div class="flex items-center justify-between mb-content">
  <BaseTypography variant="h3" weight="bold" color="text-foreground" class="flex items-center gap-compact">
    <Icon class="w-5 h-5 text-primary" :stroke-width="2" />
    عنوان القسم
    <span class="text-primary font-bold">(العدد)</span>
  </BaseTypography>
  <BaseTypography variant="caption-l" weight="medium" color="text-primary">
    نص فرعي
  </BaseTypography>
</div>
```

### 13.3 Card Article Pattern

```html
<article class="bg-surface border border-border hover:border-primary/40 transition-all duration-300 group rounded-none">
  <div class="absolute inset-inline-end-0 top-0 bottom-0 w-divider-thin bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
  <div class="p-5">
    <!-- Content -->
  </div>
</article>
```

---

## 14. ACCESSIBILITY PATTERNS

### 14.1 What's Implemented

- ✅ `aria-label` on carousel arrows
- ✅ `aria-label` on footer icon links
- ✅ `role="button" tabindex="0"` on CompanyCard clickable areas
- ✅ `@keydown.enter` and `@keydown.space` on CompanyCard
- ✅ `sr-only` label on hero search input
- ✅ `:title` on header buttons
- ✅ Semantic HTML: header, main, footer, section, aside, article, nav
- ✅ `aria-hidden="true"` on decorative icons in BaseButton

### 14.2 What's Missing

- ❌ Skip link ("تخطي إلى المحتوى الرئيسي")
- ❌ `aria-expanded` on mobile menu toggle
- ❌ `aria-current="page"` on active nav link
- ❌ Heading hierarchy (h1 → h2 → h3) — sections use h3 without h2
- ❌ `aria-live` on sort dropdown changes
- ❌ Focus trap in mobile menu
- ❌ Reduced motion support
- ❌ `alt` text on decorative icons (some are missing `aria-hidden`)

---

## 15. GAP ANALYSIS — TOKENS vs ACTUAL USAGE

### 15.1 Tokens Defined But Unused

| Token | Status |
|-------|--------|
| `--color-accent-50` through `--accent-950` (except 500) | Mostly unused |
| `--font-size-5xl`, `6xl`, `7xl` | Unused |
| `--font-weight-light`, `extrabold` | Unused |
| `--line-height-loose` | Unused |
| `--shadow-inner` | Unused |
| `--radius-2xl`, `3xl` | Unused (all 0) |
| `--transition-timing-function-in-out` | Unused |

### 15.2 Tokens Missing (Hardcoded Instead)

| Need | Current Hardcoded | Missing Token |
|------|-------------------|---------------|
| Card padding (job) | `p-5` | `--spacing-card-padding` |
| Card padding (company) | `p-4` | `--spacing-card-sm-padding` |
| Section title margin | `mb-6` | `--spacing-section-title-gap` |
| Sidebar width lg | `290px` | ✅ exists as `--layout-home-sidebar-width-lg` |
| Sidebar width xl | `310px` | ✅ exists as `--layout-home-sidebar-width-xl` |
| Container padding | `px-6 lg:px-8` | Partially tokenized |
| Header height | `h-14` (56px) | Missing |
| Country card height | `110px` | ✅ `--size-country-card-height` |
| Divider width | `2px` | ✅ `--size-divider-thin` |

### 15.3 Tokens Needing Dark Mode Values

| Token | Has Dark Override? |
|-------|--------------------|
| `--color-bg-primary` | ✅ |
| `--color-bg-secondary` | ✅ |
| `--color-bg-tertiary` | ✅ |
| `--color-surface` | ✅ |
| `--color-surface-hover` | ✅ (but value wrong) |
| `--color-text-primary` | ✅ |
| `--color-text-secondary` | ✅ |
| `--color-text-muted` | ✅ |
| `--color-border-default` | ✅ |
| `--color-border-light` | ✅ |
| `--color-border-strong` | ✅ |
| `--color-border-focus` | ✅ |
| `--color-shell-bg` | ❌ MISSING |
| `--color-shell-border` | ❌ MISSING |
| `--color-shell-surface` | ❌ MISSING |
| `--color-shell-text` | ❌ MISSING |
| `--color-success-bg` | ❌ MISSING |
| `--color-warning-bg` | ❌ MISSING |
| `--color-error-bg` | ❌ MISSING |
| `--color-info-bg` | ❌ MISSING |

---

## 16. SUMMARY — DESIGN RULES FOR NEW PAGES

### Page Structure
- Container: `max-w-7xl mx-auto px-6 lg:px-8`
- Section gap: `space-section` (32px)
- Section header: icon (20px, text-primary) + h3 bold + count + subtitle link

### Cards
- Background: `bg-surface` (not `bg-white`)
- Border: `border border-border`
- Hover: `border-primary/40` + vertical indicator
- Padding: `p-5` for detailed cards, `p-4` for compact cards
- Zero radius
- Logo: 56px container, grayscale → hover color

### Typography
- Section title: h3 bold text-foreground
- Card title: h3 bold → hover text-primary
- Body: body-s text-foreground-muted
- Caption: caption-r/caption-s text-foreground-subtle

### Buttons
- Primary CTA: variant default, size default or lg
- Secondary: variant ghost or secondary
- All: rounded-none, focus-visible ring

### Icons
- Section headers: size-5, text-primary, stroke-width 2
- Card meta: size-4, text-foreground-muted
- Decorative: aria-hidden="true"

### Transitions
- Cards: duration-300
- Buttons: duration-150
- Hover effects: transition-all or transition-colors

### Shell (Header/Footer)
- Background: bg-shell-bg
- Text: white with opacity variants
- Border: border-white/10
- Hover: bg-white/10

---

*Document generated: 2026-03-17*
*Source: Homepage components analysis*
*Next: Phase 2 — Unify Design System and Tokens*
