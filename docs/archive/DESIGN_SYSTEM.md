# Rizqak Design System (Canonical)

Last updated: 2026-03-09
Canonical source: Homepage implementation in `app/components/home/**` + global tokens in `app/assets/css/main.css`.

Visual freeze protocol: `docs/PHASE0_ZERO_VISUAL_CHANGE_PROTOCOL.md`

## 1) System Principles
- Arabic-first and RTL-first across all pages.
- Mobile-first layout decisions by default.
- Zero-rounded visual language (`radius = 0`) except circular primitives (`radius-full`).
- Token-first styling; avoid literal values in UI components.
- No visual drift from approved homepage baseline.

## 2) Token Architecture

Primary token source: `app/assets/css/main.css` under `@theme`.

### 2.1 Color Tokens
- Brand primary scale: `--color-primary-50..950`
- Accent scale: `--color-accent-50..950`
- Neutral scale: `--color-neutral-50..950`
- Semantic:
  - Background: `--color-bg-primary`, `--color-bg-secondary`, `--color-bg-tertiary`, `--color-surface`, `--color-surface-hover`
  - Text: `--color-text-primary`, `--color-text-secondary`, `--color-text-muted`, `--color-text-inverse`
  - Border: `--color-border-default`, `--color-border-light`, `--color-border-strong`, `--color-border-focus`
  - Status: success/warning/error/info groups

Full inventory (light/dark + values): `docs/PHASE1_TOKEN_INVENTORY.csv`.
Coverage verification for repeatable static values: `docs/PHASE2_TOKEN_COVERAGE_VERIFICATION.md`.

### 2.2 Typography Tokens
- Families: `--font-family-sans`, `--font-family-display` (Cairo)
- Scale available in two groups:
  - Generic: `--font-size-xs..7xl`
  - DS scale: `--font-size-ds-*` + associated line-height tokens
- Weight scale: `--font-weight-light..extrabold`

### 2.3 Spacing Tokens
- Base spacing: `--spacing-0..32`
- Semantic spacing aliases:
  - `--spacing-section`
  - `--spacing-content`
  - `--spacing-element`
  - `--spacing-compact`
- Fixed measurement aliases for reusable UI geometry now also exist for stable future page composition:
  - dropdown widths
  - sidebar widths
  - compact control heights
  - carousel overhang offsets
  - thin indicator/divider sizes
  - icon micro/material sizes
  - flag radii/heights
- Coverage status:
  - repeatable static measurements discovered by the audit now have a token home
  - remaining measurement findings are mostly behavioral layout expressions or runtime geometry variables rather than missing token definitions

### 2.4 Radius Tokens
- `--radius-none/sm/md/lg/xl/2xl/3xl` all map to zero.
- `--radius-full` used for fully circular elements only.

### 2.5 Shadow Tokens
- `--shadow-xs`, `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`, `--shadow-inner`, `--shadow-focus`

### 2.6 Transition Tokens
- `--transition-duration-fast/normal/base/slow`
- `--transition-timing-function-default/in/out/in-out`

### 2.7 Z-Index Tokens
- `--z-dropdown`, `--z-sticky`, `--z-fixed`, `--z-modal-backdrop`, `--z-modal`, `--z-popover`, `--z-tooltip`, `--z-toast`

### 2.8 Filter Tree Tokens
Dedicated connector geometry tokens:
- `--filter-tree-*`

## 3) Dark Mode Contract
- Mechanism: class-based (`html.dark`).
- Runtime toggling: `app/shared/composables/useTheme.ts`.
- Dark overrides are token-level, not component-local overrides.

## 4) RTL Contract
- Global `dir='rtl'` at app level.
- Preferred direction strategy:
  - Use logical properties/classes: `ps-*`, `pe-*`, `inset-inline-*`, `text-start`, `text-end`.
  - Avoid physical direction classes (`left`, `right`) unless functionally required and explicitly reviewed.

RTL risk scan output: `docs/PHASE1_DIRECTIONAL_USAGE.csv`.

## 5) Component Library Map

### 5.1 Base primitives
Path: `app/shared/components/base/**`
- `BaseButton`, `BaseInput`, `BaseSelect`, `BaseTextarea`, `BaseCheckbox`
- `BaseCard`, `BaseBadge`, `BaseChip`, `BaseAvatar`, `BaseSkeleton`
- `BaseDialog`, `BaseModal`, `BaseTabs`, `BasePagination`, `BaseTable*`
- Filter primitives: `BaseFilterHeader`, `BaseFilterItemRow`, `BaseFilterShowMore`, `BaseTreeConnector`, `BaseDisclosureButton`

### 5.2 Feature-level composition
Path: `app/components/**`
- Home: `HomeHero`, `HomeSidebar`, `HomeFeaturedCompanies`, `HomeJobList`
- Filters: `TreeFilterSection`, `TreeBranch`, `SimpleFilter`, `GenderFilter`, `BaseFilterSection`
- Jobs: `JobCard`
- Layout shell: `LayoutHeader`, `LayoutFooter`

## 6) Responsive System
Observed breakpoints in use:
- `sm`, `md`, `lg`, `xl`

Responsive class extraction: `docs/PHASE1_BREAKPOINT_CLASSES.txt`.

## 7) State Patterns
Transition usage extraction: `docs/PHASE1_TRANSITION_USAGE.txt`.
Z-index usage extraction: `docs/PHASE1_ZINDEX_USAGE.txt`.

## 8) SEO + Semantic Baseline
- Layout/page use `useHead` and `useSeoMeta`.
- Structured data helpers exist in `app/core/api/seo.ts`.
- SEO usage map: `docs/PHASE1_SEO_USAGE.csv`.

## 9) Known Gaps to Resolve (Non-Visual)
1. Token compliance is partial; some components still use literal colors.
2. Documentation is duplicated and partially outdated.
3. Arabic text encoding issues (mojibake) exist in multiple source files.
4. Public assets duplicated across `app/public` and `public`.
5. shadcn CLI configuration (`components.json`) is not explicitly represented.

Clarification:
- Token replacement inside visible components is still partial.
- Token coverage for reusable static values is materially stronger and is tracked in `docs/PHASE2_TOKEN_COVERAGE_VERIFICATION.md`.

## 10) Rules for Any New Page
1. Extract structure intent from reference input.
2. Implement appearance only from this design system.
3. Reuse existing components first; extend only when unavoidable.
4. New visual values are forbidden unless user-approved.
5. Any user-visible behavioral decision requires explicit user confirmation.

## 11) Verification Artifacts
- `docs/PHASE0_VISUAL_BASELINE.md`
- `docs/PHASE1_AUDIT.md`
- `docs/PHASE1_FILE_LIST.txt`
- `docs/PHASE1_FILE_CATALOG.csv`
- `docs/PHASE1_TOKEN_INVENTORY.csv`
- `docs/PHASE1_BREAKPOINT_CLASSES.txt`
- `docs/PHASE1_DIRECTIONAL_USAGE.csv`
- `docs/PHASE1_INLINE_STYLE_USAGE.csv`
- `docs/PHASE1_SEO_USAGE.csv`
