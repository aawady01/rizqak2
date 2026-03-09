# Phase 2 Geometry Contracts

Last updated: 2026-03-10
Scope: Canonical non-visual contract for the geometry-driven exceptions that remain after generic token cleanup.
Visual impact: None

## Purpose
- Freeze the reasoning behind geometry exceptions so future work can build on the current system without re-litigating every arbitrary value or inline geometry rule.
- Provide safe-change rules for the two highest-risk geometry surfaces: `BaseTreeConnector` and `BaseSelect`.
- Distinguish runtime Vue style bindings from literal inline style attributes so the audit stays precise and actionable.

## Related References
- `docs/PHASE2_EXCEPTION_GOVERNANCE.md`
- `docs/PHASE2_FILTER_TREE_GEOMETRY_MAP.md`
- `docs/PHASE2_TOKEN_COMPLIANCE_AUDIT.md`

## Geometry Ownership
- `app/shared/components/base/BaseTreeConnector.vue`
  - Owns filter-tree connector drawing, branch length, stem placement, bridge offsets, root-branch width, and active/inactive line opacity.
- `app/shared/components/base/BaseSelect.vue`
  - Owns Radix popper geometry, trigger-linked viewport sizing, content transform origin, and side-based placement behavior.
- `app/components/filters/SimpleFilter.vue`
- `app/components/filters/TreeBranch.vue`
- `app/shared/components/base/BaseFilterShowMore.vue`
  - Consume filter-tree geometry tokens and should stay aligned with the connector system rather than inventing local spacing rules.

## Audit Interpretation
### Vue style bindings versus static inline styles
- `vue-bound-style-attribute`
  - Examples: `:style="lineStyle"`
  - Meaning: runtime-governed geometry or state styling that still belongs to the component contract.
  - Risk level: medium within the audit because it is governed by Vue logic, not a raw literal stuck in markup.
- `static-inline-style-attribute`
  - Examples: `style="width: var(--filter-tree-branch-length)"`
  - Meaning: literal inline CSS that bypasses utility/token class governance.
  - Risk level: high within the audit and should stay exceptional until there is a deliberate output-equivalent refactor.

### Current hotspot split
- Filter-tree geometry system: `41`
  - `30` arbitrary Tailwind geometry matches
  - `7` Vue style bindings
  - `4` static inline styles
- Radix select geometry: `4`
  - all `arbitrary-tailwind-value`, but each is runtime-variable-driven rather than missing-token debt

## BaseTreeConnector Contract
### Why it stays governed as geometry
- It renders connector lines using runtime style objects and CSS variables.
- Several offsets are relational, not standalone visual tokens.
- Blind utility replacement here can shift connector alignment by a few pixels and break the visual tree structure.

### Inputs that define the system
- `--filter-tree-line-width`
- `--filter-tree-stem-offset`
- `--filter-tree-bridge-offset`
- `--filter-tree-child-stem-offset`
- `--filter-tree-node-center`
- `--filter-tree-bridge-height`
- `--filter-tree-branch-length`
- `--filter-tree-root-branch-length`
- `--filter-tree-line-opacity-active`
- `--filter-tree-line-opacity-muted`
- `--filter-tree-control-center-offset`
- `--filter-tree-focus-ring`

### Safe changes
- Adjust a connector metric only through the `--filter-tree-*` variable system when the whole connector geometry is intentionally re-tuned.
- Refactor duplicated classes or styles only if the resulting DOM and computed geometry remain pixel-equivalent.
- Expand documentation or audit annotations freely; these are non-visual.

### Unsafe changes without visual proof
- Replacing runtime `:style` geometry with generic spacing utilities.
- Converting branch-length logic into hardcoded width utilities.
- Changing offsets independently without checking the full tree structure in expanded and collapsed states.
- Moving root-branch spacing into consumer-local literals instead of keeping it in the shared system.

## BaseSelect Contract
### Why it stays governed as geometry
- It depends on Radix runtime variables for available height, trigger width, trigger height, and transform origin.
- These values are computed at runtime from the popper/viewport relationship, not just from the design token layer.
- The visual result is stable, but the implementation is geometry-driven rather than token-debt.

### Geometry-driven values to preserve
- `max-h-[var(--radix-select-content-available-height)]`
- `origin-[var(--radix-select-content-transform-origin)]`
- `h-[var(--radix-select-trigger-height)]`
- `min-w-[var(--radix-select-trigger-width)]`

### State syntax that is not geometry debt
- `data-[state=open]`
- `data-[state=closed]`
- `data-[side=bottom|left|right|top]`
- `data-[placeholder]`
- `data-[disabled]`
- `data-[slot=select-value]`

### Safe changes
- Keep selector/state expressions if only state behavior is being maintained.
- Adjust semantic aliases around the component only when they do not affect Radix placement math.
- Document or regroup state expressions in the audit without changing the rendered class behavior.

### Unsafe changes without targeted review
- Replacing Radix variable-driven dimensions with fixed lengths.
- Removing side-specific placement rules because they may appear redundant in a single viewport.
- Treating all arbitrary values in the component as generic token debt.

## Operational Review Order
1. Classify selector syntax before geometry when the exact match is `data-*`, `group-data-*`, or `has-data-*`.
2. Distinguish `:style` and `v-bind:style` from literal `style=` in the audit.
3. Keep Radix variable-driven dimensions in geometry exceptions.
4. Keep filter-tree runtime offsets in geometry exceptions.
5. Use `docs/PHASE2_FILTER_TREE_GEOMETRY_MAP.md` whenever the task touches filter-tree consumers, not only `BaseTreeConnector` itself.
6. Only reopen generic cleanup if a finding lands in `Review Needed`.
