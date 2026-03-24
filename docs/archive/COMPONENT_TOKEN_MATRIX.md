# Component Token Matrix (Phase 2A Canonical)

Last updated: 2026-03-09
Mode: Audit and mapping only
Visual impact: None

## Scope
This document maps the current homepage/shell components to the active token system in `app/assets/css/main.css`.

It does not authorize refactors by itself.
Any future token replacement inside visible components remains blocked unless the output is proven equivalent under the zero-visual-change protocol.

## Status Legend
- `Aligned`: already token-backed or semantically mapped well enough for now.
- `Mixed`: mostly token-backed but still contains arbitrary or literal values.
- `Literal Risk`: contains hardcoded visual values that should eventually map to tokens.
- `Geometry Exception`: uses inline/arbitrary values for connector/layout geometry and is not safe for blind cleanup.
- `Direction Risk`: contains physical directional classes that need RTL review before refactor.
- `Deferred`: not to be touched until a visual-equivalence path exists.

## Layout Shell

### `app/components/layout/LayoutHeader.vue`
- Status: `Literal Risk`, `Deferred`
- Current token alignment:
  - Layout shell colors mostly match the primary-700 family visually.
  - Text/icon tones use white alpha utility classes consistently.
  - Z-layer and motion align with the established shell behavior.
- Known mismatches:
  - `bg-[#145239]` should map to the primary-700 token family.
  - `active:scale-[0.98]` is an arbitrary value.
  - White alpha surfaces (`bg-white/10`, `border-white/20`, `text-white/90`) are visually consistent but not normalized as semantic shell tokens yet.
- Phase 2B readiness:
  - Not safe yet for replacement.
  - Needs exact token equivalents for shell background, shell text-alpha, shell border-alpha, and active scale before any edit.

### `app/components/layout/LayoutFooter.vue`
- Status: `Literal Risk`, `Deferred`
- Current token alignment:
  - Footer color system visually matches the header shell.
  - Uses typography primitives consistently through `BaseTypography`.
- Known mismatches:
  - `bg-[#145239]` literal background.
  - White alpha utilities reused directly instead of semantic footer tokens.
- Phase 2B readiness:
  - Same gating as `LayoutHeader`.
  - Header/footer should be migrated together or not at all.

## Homepage Sections

### `app/components/home/HomeHero.vue`
- Status: `Mixed`, `Direction Risk`, `Deferred`
- Current token alignment:
  - Section background uses `bg-primary`.
  - Search container and typography rely heavily on utility classes backed by `main.css`.
  - Button primitive comes from `BaseButton`.
- Known mismatches:
  - Carousel controls use `left-0` and `right-0` physical direction classes.
  - White alpha overlay classes remain direct utility usage.
  - Motion values are consistent but not fully semantic.
- Phase 2B readiness:
  - Only safe after the carousel directional mapping is normalized without moving controls by even one pixel.

### `app/components/home/HomeSidebar.vue`
- Status: `Aligned`
- Current token alignment:
  - Section spacing uses semantic aliases (`space-y-content`, `p-content`, `pt-5`, `gap-compact`).
  - Card surface uses `bg-card`, `border`, and `divide-separator`.
  - CTA button uses semantic classes (`bg-primary`, `hover:bg-primary-dark`, `text-white`).
- Known mismatches:
  - No high-severity literal color findings in this file itself.
- Phase 2B readiness:
  - Low priority.
  - Most risk lives in nested filter primitives rather than the shell component.

### `app/components/home/HomeFeaturedCompanies.vue`
- Status: `Mixed`, `Direction Risk`, `Deferred`
- Current token alignment:
  - Uses semantic typography and semantic primary interactions.
  - Card/list content is mostly token-friendly.
- Known mismatches:
  - Carousel navigation uses negative arbitrary logical offsets (`inset-inline-end-[-16px]`, `inset-inline-start-[-16px]`).
  - Shadow/white surface states are still utility-driven rather than semantic-token driven.
- Phase 2B readiness:
  - Not safe for blind cleanup because the arrow positions are visually sensitive.

### `app/components/home/HomeJobList.vue`
- Status: `Literal Risk`, `Direction Risk`, `Deferred`
- Current token alignment:
  - Section heading and pagination rely on base primitives.
  - Base dropdown trigger surface uses semantic `bg-card`, `border-border`, `text-foreground`.
- Known mismatches:
  - `bg-[#1B6B4A]` and `text-[#FFFFFF]` in selected/hovered sort items.
  - `w-[140px]` arbitrary width.
  - `z-[100]` arbitrary z-index.
  - `left-0` physical directional placement on dropdown.
- Phase 2B readiness:
  - High-priority mapping target.
  - Still blocked until exact token equivalents for selected dropdown state and z-layer are documented.

### `app/components/jobs/JobCard.vue`
- Status: `Mixed`, `Deferred`
- Current token alignment:
  - Borders, hover accent, typography, and salary badge are mostly built from semantic palette usage.
  - Uses `BaseTypography` and shared primitives well.
- Known mismatches:
  - `bg-white` and `border-ds-border` remain hybrid rather than fully semantic-token driven.
  - `w-[2px]` arbitrary hover indicator width.
  - Several neutral tones are utility literals through Tailwind palette classes.
- Phase 2B readiness:
  - Medium priority.
  - Safe only after the vertical indicator and white surface semantics are standardized without changing hover feel.

## Base Primitives

### `app/shared/components/base/BaseButton.vue`
- Status: `Aligned`, `Geometry Exception`
- Current token alignment:
  - This is the strongest tokenized action primitive in the project.
  - Variants map well to primary/neutral/error/surface behavior.
  - Typography and focus behavior are centralized.
- Known mismatches:
  - `active:scale-[0.98]` remains arbitrary.
  - Some size values are still directly expressed in class strings.
- Phase 2B readiness:
  - Good candidate for later internal cleanup, but only after every consumer baseline hash is protected.

### `app/shared/components/base/BaseFilterItemRow.vue`
- Status: `Literal Risk`, `Deferred`
- Current token alignment:
  - Structure, label typography, and primary checked states are token-backed.
  - Uses shared filter-row utilities from `main.css`.
- Known mismatches:
  - Dark-state literal background `dark:bg-[#2a2a2a]`.
  - Indeterminate mark height uses `h-[2px]`.
- Phase 2B readiness:
  - High priority among base primitives.
  - Requires dark-surface token equivalence before any change.

### `app/shared/components/base/BaseTreeConnector.vue`
- Status: `Geometry Exception`, `Deferred`
- Current token alignment:
  - Color and opacity are token-driven through `--filter-tree-*`.
  - Logical positioning is already strongly RTL-aware.
- Known mismatches:
  - Audit flags are mostly inline-style bindings and arbitrary geometry classes.
  - These values control connector continuity and are visually fragile.
- Phase 2B readiness:
  - Do not treat audit findings here as normal cleanup candidates.
  - This file requires dedicated geometry validation, not generic token replacement.

## Priority Queue for Future Refactor
1. `app/components/home/HomeJobList.vue`
2. `app/components/layout/LayoutHeader.vue`
3. `app/components/layout/LayoutFooter.vue`
4. `app/shared/components/base/BaseFilterItemRow.vue`
5. `app/components/home/HomeHero.vue`
6. `app/components/home/HomeFeaturedCompanies.vue`
7. `app/components/jobs/JobCard.vue`
8. `app/shared/components/base/BaseButton.vue`
9. `app/shared/components/base/BaseTreeConnector.vue`

## Phase 2A Outcome
- Semantic alias tokens have now been added to `app/assets/css/main.css` for:
  - shell background/borders/text alpha family
  - selected interactive state colors
  - dark filter control background
  - press-scale and elevated dropdown z-index semantics
- Static reusable measurements now also have token coverage for:
  - 2px thin dividers/indicators
  - 18px flag height
  - 110px country-card height
  - 40px compact filter-option minimum height
  - 140px sort/dropdown trigger width
  - 160px compact search max width
  - 8rem select-panel minimum width
  - 16px / 20px / 24px standardized UI icon sizes (Lucide: size-4/5/6)
  - 2px / 3px / 4px flag radii
  - 290px / 310px homepage sidebar layout widths
  - 16px / 20px carousel arrow overhang offsets
- These aliases preserve existing literal values exactly and do not change rendered output by themselves.
- We now have a component-by-component token-risk map for the homepage shell.
- The current token audit should be treated as an inventory, not as permission to refactor visible files.
- The safest next non-visual work remains SEO/server/docs hardening.
- Phase 2B must only start after exact equivalence mappings are defined for every candidate replacement.

## Remaining Intentional Exceptions
- `data-*`, `group-data-*`, and `has-data-*` selectors are state/selectors, not design tokens.
- `var(--radix-*)` dimensions are runtime integration variables from Radix and should stay integration-driven.
- `var(--filter-tree-*)` geometry is already tokenized and should be treated as a dedicated connector system, not generic utility debt.
- Inline geometry in `BaseTreeConnector.vue` remains a controlled exception until a connector-specific equivalence refactor is planned.
