# Phase 2 Exception Governance Register

Generated from 'scripts/token-compliance-audit.mjs' at 2026-03-09T22:20:54.760Z.
Visual impact: None

## Purpose
- Provide a stable execution reference for the governed findings that remain after generic token cleanup is finished.
- Separate intentional exceptions from real backlog so future sessions can continue safely without re-triaging the full audit JSON.

## Snapshot
- Raw findings: 109
- Files affected: 19
- Token-covered Inventory: 19
- Geometry Exceptions: 45
- Selector and State Syntax: 39
- Behavior and Layout Expressions: 6
- Review Needed: 0

## Token-covered Inventory
- Count: 19
- Policy: Keep these values as tracked inventory unless an output-equivalent replacement is intentionally performed.
- Guidance: For future pages, reuse the existing token or alias instead of introducing new literals for the same metric.
- Files:
  - app/components/base/BaseFlag.vue: 6
  - app/components/home/CountryCarousel.vue: 5
  - app/components/home/HomeFeaturedCompanies.vue: 2
  - app/pages/index.vue: 2
  - app/components/companies/CompanyCard.vue: 1
  - app/components/filters/GenderFilter.vue: 1
  - app/components/home/CountryCard.vue: 1
  - app/components/jobs/JobCard.vue: 1
- Representative findings:
  - app/components/base/BaseFlag.vue:20 -> h-[18px]
  - app/components/base/BaseFlag.vue:22 -> rounded-[4px]
  - app/components/base/BaseFlag.vue:25 -> rounded-[3px]
  - app/components/base/BaseFlag.vue:38 -> rounded-[2px]
  - app/components/base/BaseFlag.vue:38 -> rounded-[3px]

## Geometry Exceptions
- Count: 45
- Policy: Do not treat runtime geometry, filter-tree connector math, or Radix variable-driven layout as generic token debt.
- Guidance: Change only through dedicated variable systems or focused component-level geometry work with visual verification.
- Files:
  - app/shared/components/base/BaseTreeConnector.vue: 37
  - app/shared/components/base/BaseSelect.vue: 4
  - app/shared/components/base/BaseFilterShowMore.vue: 2
  - app/components/filters/SimpleFilter.vue: 1
  - app/components/filters/TreeBranch.vue: 1
- Representative findings:
  - app/components/filters/SimpleFilter.vue:111 -> ps-[var(--filter-tree-root-branch-length)]
  - app/components/filters/TreeBranch.vue:117 -> ps-[var(--filter-tree-root-branch-length)]
  - app/shared/components/base/BaseFilterShowMore.vue:15 -> pe-[var(--filter-tree-root-branch-length)]
  - app/shared/components/base/BaseFilterShowMore.vue:18 -> shadow-[var(--filter-tree-focus-ring)]
  - app/shared/components/base/BaseSelect.vue:57 -> max-h-[var(--radix-select-content-available-height)]

## Selector and State Syntax
- Count: 39
- Policy: Do not rewrite data-* or has-data-* state syntax as part of token cleanup.
- Guidance: Touch these only when the component state model or primitive API actually changes.
- Files:
  - app/shared/components/base/BaseSelect.vue: 22
  - app/shared/components/base/BaseDialog.vue: 10
  - app/shared/components/base/BaseTabs.vue: 3
  - app/shared/components/base/BaseLabel.vue: 2
  - app/shared/components/base/BaseCard.vue: 1
  - app/shared/components/base/BaseTableRow.vue: 1
- Representative findings:
  - app/shared/components/base/BaseCard.vue:33 -> has-data-[slot=card-action]
  - app/shared/components/base/BaseDialog.vue:29 -> data-[state=open]
  - app/shared/components/base/BaseDialog.vue:29 -> data-[state=closed]
  - app/shared/components/base/BaseDialog.vue:29 -> data-[state=closed]
  - app/shared/components/base/BaseDialog.vue:29 -> data-[state=open]

## Behavior and Layout Expressions
- Count: 6
- Policy: Do not treat structural transition expressions as missing token coverage.
- Guidance: Change these only when interaction behavior or layout semantics are intentionally redesigned.
- Files:
  - app/components/filters/BaseFilterSection.vue: 2
  - app/components/filters/TreeBranch.vue: 2
  - app/shared/components/base/BaseCard.vue: 2
- Representative findings:
  - app/components/filters/BaseFilterSection.vue:108 -> grid-rows-[1fr]
  - app/components/filters/BaseFilterSection.vue:109 -> grid-rows-[0fr]
  - app/components/filters/TreeBranch.vue:152 -> grid-rows-[1fr]
  - app/components/filters/TreeBranch.vue:152 -> grid-rows-[0fr]
  - app/shared/components/base/BaseCard.vue:33 -> grid-rows-[auto_auto]

## Review Needed
- Count: 0
- Policy: Any finding in this bucket is not yet covered by current governance and needs explicit review.
- Guidance: This bucket should stay at zero; if it rises, classify or address the findings before doing broad cleanup.
- Files: None

## Targeted Geometry Hotspots
### Filter-tree Geometry System
- Count: 41
- Contract: docs/PHASE2_GEOMETRY_CONTRACTS.md
- Guidance: Keep connector math and root-branch alignment centralized in the filter-tree variable system; do not fork local spacing rules in new filters.
- Files:
  - app/shared/components/base/BaseTreeConnector.vue: 37
  - app/shared/components/base/BaseFilterShowMore.vue: 2
  - app/components/filters/SimpleFilter.vue: 1
  - app/components/filters/TreeBranch.vue: 1
- Rule profile:
  - arbitrary-tailwind-value: 30
  - vue-bound-style-attribute: 7
  - static-inline-style-attribute: 4
- Representative findings:
  - app/components/filters/SimpleFilter.vue:111 -> ps-[var(--filter-tree-root-branch-length)]
  - app/components/filters/TreeBranch.vue:117 -> ps-[var(--filter-tree-root-branch-length)]
  - app/shared/components/base/BaseFilterShowMore.vue:15 -> pe-[var(--filter-tree-root-branch-length)]
  - app/shared/components/base/BaseFilterShowMore.vue:18 -> shadow-[var(--filter-tree-focus-ring)]
  - app/shared/components/base/BaseTreeConnector.vue:33 -> w-[var(--filter-tree-line-width)]
  - app/shared/components/base/BaseTreeConnector.vue:33 -> bg-[var(--tree-line-color)]

### Radix Select Geometry
- Count: 4
- Contract: docs/PHASE2_GEOMETRY_CONTRACTS.md
- Guidance: Preserve runtime width, height, and transform-origin variables as a placement contract rather than converting them into fixed tokens.
- Files:
  - app/shared/components/base/BaseSelect.vue: 4
- Rule profile:
  - arbitrary-tailwind-value: 4
- Representative findings:
  - app/shared/components/base/BaseSelect.vue:57 -> max-h-[var(--radix-select-content-available-height)]
  - app/shared/components/base/BaseSelect.vue:57 -> origin-[var(--radix-select-content-transform-origin)]
  - app/shared/components/base/BaseSelect.vue:68 -> h-[var(--radix-select-trigger-height)]
  - app/shared/components/base/BaseSelect.vue:68 -> min-w-[var(--radix-select-trigger-width)]

## Operational Rules
- Do not use the raw audit count alone to decide whether token cleanup is incomplete.
- Treat `Geometry Exceptions` as component-system work, not utility-class cleanup.
- Treat `Selector and State Syntax` as primitive-state logic, not token debt.
- Treat `Behavior and Layout Expressions` as interaction/layout semantics, not missing aliases.
- Treat `Review Needed` as the only bucket that should reopen generalized cleanup discussions.