# Phase 2 Token Coverage Verification (Canonical)

Last updated: 2026-03-10
Scope: Verify that every reusable visual value discovered so far has a design-token home without changing rendered output.
Visual impact: None

## Verification Goal
- Confirm that the token layer in `app/assets/css/main.css` is not just descriptive, but practically ready to support future pages with stronger consistency.
- Separate true token gaps from findings that are intentionally non-token candidates such as runtime geometry, selector state syntax, and behavior/layout expressions.
- Keep the audit trustworthy by classifying the remaining inventory automatically instead of reading a raw number as missing-token debt.
- Keep geometry review precise by distinguishing literal inline styles from Vue-bound runtime style expressions.

## Source of Verification
- Audit inventory: `docs/PHASE2_TOKEN_COMPLIANCE_AUDIT.json`
- Generated audit report: `docs/PHASE2_TOKEN_COMPLIANCE_AUDIT.md`
- Generated exception register: `docs/PHASE2_EXCEPTION_GOVERNANCE.md`
- Geometry contracts: `docs/PHASE2_GEOMETRY_CONTRACTS.md`
- Filter-tree geometry map: `docs/PHASE2_FILTER_TREE_GEOMETRY_MAP.md`
- Token source: `app/assets/css/main.css`
- Component mapping: `docs/COMPONENT_TOKEN_MATRIX.md`

## High-Level Conclusion
- Every repeatable hardcoded color literal currently flagged by the audit has a semantic token or exact-value alias.
- Every repeatable fixed measurement that appears as a stable design metric in the homepage shell has a token or exact-value alias.
- The remaining audit findings are not all missing tokens.
  They are now canonically governed as token-covered inventory, runtime geometry, selector/state syntax, or behavior/layout syntax.

## Final Non-Overlapping Classification
The raw audit count is now reclassified into final delivery buckets so we do not mistake every finding for missing token debt.

| Bucket | Count | Meaning |
| --- | ---: | --- |
| `Token-covered` | `19` | Reusable static values already have a token or exact-value alias in `main.css`, even if some are intentionally left in place as tracked inventory. |
| `RTL review` | `0` generic backlog | The previous physical-direction cleanup batch is complete; future RTL work is case-specific, not a standing generic queue. |
| `Geometry exception` | `45` | Runtime geometry or placement driven by CSS variables, filter-tree connector layout, or true Radix variable-driven mechanics. |
| `Selector/state` | `39` | `data-*`, `group-data-*`, and `has-data-*` selectors; these are state syntax, not token values. |
| `Behavior/layout` | `6` | Expand/collapse or structural expressions such as `grid-rows-[1fr]` and `grid-cols-[1fr_auto]`. |
| `Review needed` | `0` | No remaining findings are outside the current governance model. |

Total raw inventory: `109`

## What This Means Practically
- The old raw number `150` was an inventory number, not a `150 missing tokens` number.
- After the completed safe replacement batches and the governance-aware audit pass, the current raw audit count is `109`.
- The part that was truly about missing token homes is already represented by the `Token-covered` bucket.
- There is no remaining generic literal/token replacement backlog in the current governance model.
- Everything else is intentionally separated because it belongs to geometry/runtime behavior, selector syntax, or layout behavior rather than token absence.

## Canonical Audit Governance
The generated audit now classifies every finding automatically in `scripts/token-compliance-audit.mjs` and emits:
- `docs/PHASE2_TOKEN_COMPLIANCE_AUDIT.md`
- `docs/PHASE2_EXCEPTION_GOVERNANCE.md`
- `docs/PHASE2_GEOMETRY_CONTRACTS.md`

The audit also now distinguishes:
- `vue-bound-style-attribute`: runtime-governed `:style` / `v-bind:style` expressions
- `static-inline-style-attribute`: literal `style=` attributes that remain exceptional and higher-risk

This keeps geometry review more honest, especially in `BaseTreeConnector`, where a bound opacity/style object is not the same governance problem as a literal inline width or inset.

The current generated bucket counts are:
- `19` token-covered inventory
- `45` geometry exceptions
- `39` selector/state cases
- `6` behavior/layout cases
- `0` review-needed findings

Current hotspot summaries are:
- `Filter-tree Geometry System`: `41`
- `Radix Select Geometry`: `4`

## Completed Safe Replacement Batches
Output-equivalent replacement work has already landed in shared primitives and safe shell-adjacent locations:

- `app/shared/components/base/BaseFilterHeader.vue`
  - `max-w-[160px]` moved to `max-w-search-compact`
- `app/shared/components/base/BaseFilterItemRow.vue`
  - `dark:bg-[#2a2a2a]` moved to `filter-control-idle-surface`
  - `h-[2px]` moved to `h-divider-thin`
- `app/shared/components/base/BaseCheckbox.vue`
  - `stroke-[3]` moved to `:stroke-width="3"`
- `app/shared/components/base/BaseDialog.vue`
  - `max-w-[calc(100%-2rem)]` moved to `dialog-mobile-max-w`
  - `translate-x-[-50%]` and `translate-y-[-50%]` moved to standard half-translate utilities
- `app/shared/components/base/BaseSelect.vue`
  - `transition-[color,box-shadow]` moved to `transition-color-shadow`
  - `min-w-[8rem]` moved to `min-w-select-panel`
  - `focus-visible:ring-[3px]` moved to `focus-visible:ring-3`
- `app/shared/components/base/BaseTextarea.vue`
  - `transition-[color,box-shadow]` moved to `transition-color-shadow`
  - `focus-visible:ring-[3px]` moved to `focus-visible:ring-3`
- `app/shared/components/base/BaseTableCell.vue`
  - `translate-y-[2px]` moved to `checkbox-baseline-nudge`
- `app/shared/components/base/BaseTableHead.vue`
  - `translate-y-[2px]` moved to `checkbox-baseline-nudge`
- `app/layouts/default.vue`
  - `font-[Cairo]` moved to `font-app-sans`
- `app/shared/components/base/BaseSearchInput.vue`
  - `dark:focus:bg-[#1e1e1e]` moved to `bg-search-surface-focus-dark`
- `app/components/home/HomeHero.vue`
  - physical `left-0` and `right-0` moved to logical inline positioning utilities
- `app/components/home/HomeJobList.vue`
  - dropdown anchoring moved from physical `left-0` to logical inline-start utility
- `scripts/token-compliance-audit.mjs`
  - `Radix` side-state expressions no longer count as true RTL-directional findings
  - selector syntax is classified before geometry when the exact match is `data-*`, `group-data-*`, or `has-data-*`
  - findings are emitted with canonical governance buckets and an exception register
  - literal `style=` is now split from Vue-bound `:style` / `v-bind:style`
  - targeted geometry hotspots are emitted for filter-tree and Radix select systems

These replacements and governance refinements were intentionally limited to low-risk shared primitives and non-visual infrastructure, and verified without visual drift.

## Verified Coverage: Colors
The audit surfaces repeatable hardcoded color literals and arbitrary color classes such as:
- `#145239` / `bg-[#145239]`
- `#1B6B4A` / `bg-[#1B6B4A]`
- `#FFFFFF` / `text-[#FFFFFF]`
- `#2a2a2a` / `bg-[#2a2a2a]`
- `#1e1e1e` / `bg-[#1e1e1e]`

These are covered in `main.css` through semantic tokens or exact-value aliases:
- `--color-primary-700`
- `--color-primary-600`
- `--color-shell-bg`
- `--color-state-selected-bg`
- `--color-state-selected-text`
- `--color-filter-control-bg-dark`
- `--color-search-surface-focus-dark`
- `--color-shell-text`

## Verified Coverage: Fixed Reusable Measurements
The audit surfaces repeatable static measurements that are part of the current visual system and useful for future page consistency.
These are covered by tokens or exact-value aliases:

- `w-[2px]` -> `--size-divider-thin`
- `h-[18px]` -> `--size-flag-height-sm`
- `min-h-[40px]` -> `--size-filter-option-min-height`
- `h-[110px]` -> `--size-country-card-height`
- `w-[140px]` -> `--size-dropdown-trigger-width`
- `text-[20px]` -> `--size-icon-material-md`
- `text-[10px]` -> `--size-icon-micro`
- `rounded-[2px]` -> `--radius-flag-sm`
- `rounded-[3px]` -> `--radius-flag-md`
- `rounded-[4px]` -> `--radius-flag-lg`
- `grid-cols-[290px_1fr]` -> `--layout-home-sidebar-width-lg`
- `grid-cols-[310px_1fr]` -> `--layout-home-sidebar-width-xl`
- `inset-inline-end-[-16px]` and `inset-inline-start-[-16px]` -> `--offset-carousel-nav-overhang-md`
- `inset-inline-end-[-20px]` and `inset-inline-start-[-20px]` -> `--offset-carousel-nav-overhang-lg`
- `scale-[0.98]` -> `--motion-scale-press-subtle`
- `z-[100]` -> `--z-dropdown-overlay`

## Design-System Readiness for Future Pages
This work gives the project a stronger long-term foundation because:
- shared shell colors are centralized instead of being remembered as raw literals
- selected-state semantics are explicit and reusable
- compact control sizes, icon sizes, sidebar widths, and carousel offsets are now stable reusable metrics
- filter-tree geometry remains centralized in one variable system instead of being recreated ad hoc
- a dedicated filter-tree geometry map now shows exactly how future filter UIs should plug into the same contract
- future pages can inherit the same shell, spacing, and control metrics without inventing new values
- the audit is now governance-aware, so future sessions can separate true backlog from intentional exceptions quickly and consistently
- the highest-risk geometry systems now have written contracts, which makes later refactors safer and more repeatable
- style-binding governance is now more accurate, so future cleanup work will not overstate risk or understate ownership

## Final Verification Statement
- Token coverage is complete for the currently identified repeatable static design values in the homepage shell and shared primitives.
- The raw audit inventory has been normalized into governed delivery buckets with `0` uncategorized findings in the current snapshot.
- Remaining findings should be treated as controlled runtime geometry, state/selector syntax, or behavior/layout syntax rather than proof that the token system is incomplete.
