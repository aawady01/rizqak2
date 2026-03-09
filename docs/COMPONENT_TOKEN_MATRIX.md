# Component Token Matrix (Baseline)

Source of truth:
- Tokens: `app/assets/css/main.css`
- Layout/feature composition: `app/components/**`
- Base primitives: `app/shared/components/base/**`

## Layout Shell

### LayoutHeader (`app/components/layout/LayoutHeader.vue`)
- Background: currently literal class (`bg-[#145239]`), target semantic token equivalent: primary-700 family.
- Text/icon colors: white and white alpha variants.
- Motion: transition + scale active states.
- Z-order: `z-50`.

### LayoutFooter (`app/components/layout/LayoutFooter.vue`)
- Background: currently literal class (`bg-[#145239]`), semantic equivalent in primary scale.
- Border/text tokens: white alpha variants.

## Homepage Sections

### HomeHero
- Uses primary background class + tokenized utility classes.
- Search panel uses DS utility classes for typography and surface behavior.

### HomeSidebar
- Built with base filter primitives and semantic spacing aliases (`content`, `section`, `compact`).

### HomeFeaturedCompanies / HomeJobList
- Uses base typography and base pagination primitives.
- Mix of semantic and literal classes in a few interactive states.

## Base Primitives

Core primitive set (stable):
- Inputs: `BaseInput`, `BaseSearchInput`, `BaseSelect`, `BaseTextarea`
- Actions: `BaseButton`, `BaseDisclosureButton`
- Data display: `BaseCard`, `BaseBadge`, `BaseChip`, `BaseAvatar`
- Skeleton/loading/table/dialog stack

## Non-Visual Enforcement Plan
1. Keep rendered output unchanged.
2. Replace literal values with token references only when equivalent output is guaranteed.
3. Validate with build + visual sanity checks before/after each batch.