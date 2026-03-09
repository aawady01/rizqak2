# Phase 2 Filter-tree Geometry Map

Last updated: 2026-03-10
Scope: Canonical geometry map for the shared filter-tree system and its current consumers.
Visual impact: None

## Purpose
- Turn the remaining filter-tree geometry findings into a stable architectural reference instead of leaving them as scattered audit entries.
- Make future filter and sidebar work reuse the same connector system, offsets, and alignment rules without inventing local geometry.

## System Ownership
- `app/assets/css/main.css`
  - Owns the shared `--filter-tree-*` variable system and the scope color bridge through `.filter-tree-scope`.
- `app/shared/components/base/BaseTreeConnector.vue`
  - Owns connector drawing for `stem`, `bridge`, `branch`, and `root-branch`.
- `app/components/filters/BaseFilterSection.vue`
  - Owns section-level expansion behavior and the optional top-level stem for select-all groups.
- `app/components/filters/SimpleFilter.vue`
  - Consumes the root-branch pattern for flat item lists.
- `app/components/filters/TreeBranch.vue`
  - Consumes the full branch system for grouped tree filters and child expansion.
- `app/shared/components/base/BaseFilterShowMore.vue`
  - Aligns the trailing action with the same root-branch geometry instead of introducing its own offset.

## Variable Source Of Truth
The current geometry contract is driven from `app/assets/css/main.css`.

- `--filter-tree-line-width`
- `--filter-tree-control-size`
- `--filter-tree-control-gap`
- `--filter-tree-control-center-offset`
- `--filter-tree-stem-offset`
- `--filter-tree-child-stem-offset`
- `--filter-tree-root-branch-length`
- `--filter-tree-branch-length`
- `--filter-tree-child-indent`
- `--filter-tree-node-center`
- `--filter-tree-bridge-offset`
- `--filter-tree-bridge-height`
- `--filter-tree-row-min-height`
- `--filter-tree-row-min-height-child`
- `--filter-tree-line-opacity-muted`
- `--filter-tree-line-opacity-active`
- `--filter-tree-focus-ring`
- `--color-filter-tree-line`

## Geometry Flow
1. `BaseFilterSection` creates the scoped container and optional top-level stem for select-all groups.
2. `SimpleFilter` and `TreeBranch` shift row content with `ps-[var(--filter-tree-root-branch-length)]` so the control column stays aligned with the connector origin.
3. `BaseTreeConnector` draws the horizontal and vertical segments using the shared variable system.
4. `BaseFilterShowMore` reserves matching trailing space with `pe-[var(--filter-tree-root-branch-length)]` so the action lines up with the same tree rhythm.
5. `BaseFilterItemRow` consumes the same control size, gap, row height, and child indent through the shared filter-tree classes in `main.css`.

## Stable Invariants
- Root-branch alignment is a system rule, not a local spacing choice.
- The disclosure/control center and the connector origin are intentionally coupled through the current `16px` branch metrics.
- Child branches depend on `--filter-tree-child-stem-offset`, `--filter-tree-node-center`, and `--filter-tree-branch-length` moving together.
- The show-more action is part of the same geometry system and should not drift away from the branch rhythm.
- Connector opacity is state-driven, but still belongs to geometry governance because it is part of the rendered line system.

## Audit Snapshot
Generated hotspot data from `docs/PHASE2_TOKEN_COMPLIANCE_AUDIT.json` currently shows:

- Total filter-tree geometry findings: `41`
- `app/shared/components/base/BaseTreeConnector.vue`: `37`
- `app/shared/components/base/BaseFilterShowMore.vue`: `2`
- `app/components/filters/SimpleFilter.vue`: `1`
- `app/components/filters/TreeBranch.vue`: `1`

Rule profile inside this hotspot:
- `arbitrary-tailwind-value`: `30`
- `vue-bound-style-attribute`: `7`
- `static-inline-style-attribute`: `4`

## What The Rule Split Means
- `vue-bound-style-attribute`
  - Covers runtime bindings such as `:style="lineStyle"`.
  - These are governed expressions, not the same kind of risk as literal inline CSS.
- `static-inline-style-attribute`
  - Covers literal geometry such as fixed `style="width: var(...)"` or `style="inset-inline-start: ..."`.
  - These stay higher-risk because they bypass class-based governance entirely.

## Safe Extension Rules For Future Pages
- Build any new tree-like filter from the existing chain: `BaseFilterSection` -> `BaseTreeConnector` -> `BaseFilterItemRow` -> `BaseFilterShowMore`.
- Reuse the current `--filter-tree-*` variables before introducing any new branch offset, indent, or line metric.
- If a new filter needs different geometry, add or revise shared variables in `main.css` first, then verify all current consumers together.
- Do not copy connector widths, offsets, or focus-ring geometry into page-local classes.
- Do not treat the remaining 41 findings as a generic cleanup list; they are an owned system.

## Verification Checklist
- Re-run `node scripts/token-compliance-audit.mjs` after any filter-tree geometry touch.
- Confirm hotspot counts still map cleanly to the filter-tree system and do not leak into `review-needed`.
- Re-run `typecheck` and `build` before accepting any follow-up change in this area.
- If visual geometry changes intentionally, verify expanded, collapsed, searched, and show-more states together.
