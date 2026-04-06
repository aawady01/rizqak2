# Phase 2 Exception Governance Register

Generated from 'scripts/token-compliance-audit.mjs' at 2026-03-29T18:50:00.490Z.
Visual impact: None

## Purpose
- Provide a stable execution reference for the governed findings that remain after generic token cleanup is finished.
- Separate intentional exceptions from real backlog so future sessions can continue safely without re-triaging the full audit JSON.

## Snapshot
- Raw findings: 10
- Files affected: 4
- Token-covered Inventory: 0
- Geometry Exceptions: 0
- Selector and State Syntax: 0
- Behavior and Layout Expressions: 1
- Review Needed: 9

## Token-covered Inventory
- Count: 0
- Policy: Keep these values as tracked inventory unless an output-equivalent replacement is intentionally performed.
- Guidance: For future pages, reuse the existing token or alias instead of introducing new literals for the same metric.
- Files: None

## Geometry Exceptions
- Count: 0
- Policy: Do not treat runtime geometry, filter-tree connector math, or Reka variable-driven layout as generic token debt.
- Guidance: Change only through dedicated variable systems or focused component-level geometry work with visual verification.
- Files: None

## Selector and State Syntax
- Count: 0
- Policy: Do not rewrite data-* or has-data-* state syntax as part of token cleanup.
- Guidance: Touch these only when the component state model or primitive API actually changes.
- Files: None

## Behavior and Layout Expressions
- Count: 1
- Policy: Do not treat structural transition expressions as missing token coverage.
- Guidance: Change these only when interaction behavior or layout semantics are intentionally redesigned.
- Files:
  - app/components/jobs/detail/JobDetailPublisherPanel.vue: 1
- Representative findings:
  - app/components/jobs/detail/JobDetailPublisherPanel.vue:89 -> grid-cols-[1fr_auto]

## Review Needed
- Count: 9
- Policy: Any finding in this bucket is not yet covered by current governance and needs explicit review.
- Guidance: This bucket should stay at zero; if it rises, classify or address the findings before doing broad cleanup.
- Files:
  - app/shared/components/base/BaseFilterItemRow.vue: 4
  - app/components/home/HomeFeaturedCompanies.vue: 2
  - app/components/jobs/detail/JobDetailPublisherPanel.vue: 2
  - app/components/jobs/detail/JobDetailFactsGrid.vue: 1
- Representative findings:
  - app/components/home/HomeFeaturedCompanies.vue:34 -> auto-cols-[calc(50%-10px)]
  - app/components/home/HomeFeaturedCompanies.vue:34 -> auto-cols-[calc(25%-15px)]
  - app/components/jobs/detail/JobDetailFactsGrid.vue:70 -> text-right
  - app/components/jobs/detail/JobDetailPublisherPanel.vue:104 -> text-right
  - app/components/jobs/detail/JobDetailPublisherPanel.vue:195 -> text-right

## Targeted Geometry Hotspots
### Filter-tree Geometry System
- Count: 0
- Contract: docs/PHASE2_GEOMETRY_CONTRACTS.md
- Guidance: Keep connector math and root-branch alignment centralized in the filter-tree variable system; do not fork local spacing rules in new filters.
- Files:
- Rule profile:
- Representative findings:

### Reka Select Geometry
- Count: 0
- Contract: docs/PHASE2_GEOMETRY_CONTRACTS.md
- Guidance: Preserve runtime width, height, and transform-origin variables as a placement contract rather than converting them into fixed tokens.
- Files:
- Rule profile:
- Representative findings:

## Operational Rules
- Do not use the raw audit count alone to decide whether token cleanup is incomplete.
- Treat `Geometry Exceptions` as component-system work, not utility-class cleanup.
- Treat `Selector and State Syntax` as primitive-state logic, not token debt.
- Treat `Behavior and Layout Expressions` as interaction/layout semantics, not missing aliases.
- Treat `Review Needed` as the only bucket that should reopen generalized cleanup discussions.