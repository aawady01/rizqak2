# Current Project Status (Canonical)

Last updated: 2026-03-10
Scope: Active source of truth for the current repository state.

## Current Reality
- Frontend stack is aligned with the required baseline: Vue 3.5.29, Nuxt 4.3.1, Tailwind CSS 4.2.1, TypeScript 5.9.3.
- `npm run typecheck` passes.
- `npm run build` passes.
- The homepage and shared shell are treated as frozen visual baseline files under the active zero-visual-change protocol.
- The token audit now emits governance buckets automatically, so the remaining count is no longer read as generic token debt.
- The token audit now also distinguishes literal `style=` from Vue-bound `:style` / `v-bind:style`, which makes geometry review more precise without changing the UI.
- A generated exception register tracks which remaining findings belong to geometry, selector/state, behavior/layout, or token-covered inventory.
- Geometry contracts now exist for the highest-risk remaining systems, and a dedicated filter-tree geometry map documents how connector metrics flow through current consumers.

## Active Canonical Documents
- `docs/PHASE0_ZERO_VISUAL_CHANGE_PROTOCOL.md`
- `docs/MASTER_EXECUTION_PLAN.md`
- `docs/PHASE1_AUDIT.md`
- `docs/PHASE2_TOKEN_COMPLIANCE_AUDIT.md`
- `docs/PHASE2_EXCEPTION_GOVERNANCE.md`
- `docs/PHASE2_GEOMETRY_CONTRACTS.md`
- `docs/PHASE2_FILTER_TREE_GEOMETRY_MAP.md`
- `docs/PHASE2_TOKEN_COVERAGE_VERIFICATION.md`
- `docs/DESIGN_SYSTEM.md`
- `docs/AI_INSTRUCTIONS.md`
- `docs/ARCHITECTURE.md`
- `docs/CURRENT-STATUS.md`

## Visual Baseline Status
- Visual-contract files are frozen unless output-equivalent changes are proven or explicitly approved by the user.
- Baseline hashes are tracked in:
  - `docs/PHASE0_VISUAL_BASELINE.json`
  - `docs/PHASE0_VISUAL_BASELINE.md`

## What Is Already Implemented (Non-Visual or Safe Foundation)
- Semantic alias token layer in `app/assets/css/main.css` includes exact-value mappings for:
  - shell background/text/border alpha family
  - selected interactive state colors
  - dark filter control background
  - press-scale/z-index semantics
  - fixed component measurements used by the current UI such as sidebar widths, dropdown width, compact control heights, icon sizes, carousel offsets, flag radii/heights, and thin indicator widths
- Safe output-equivalent replacement batches have landed in shared primitives and shell-safe locations, including:
  - `BaseFilterHeader`
  - `BaseFilterItemRow`
  - `BaseCheckbox`
  - `BaseDialog`
  - `BaseSelect`
  - `BaseTextarea`
  - `BaseTableCell`
  - `BaseTableHead`
  - root `default` layout font wrapper
  - `BaseSearchInput`
  - `HomeHero` logical inline positioning
  - `HomeJobList` logical dropdown anchoring
- The token audit itself is now smarter and no longer counts `Radix` side-state expressions as true RTL-risk findings.
- The token audit now classifies findings into canonical governance buckets:
  - `19` token-covered inventory
  - `45` geometry exceptions
  - `39` selector/state cases
  - `6` behavior/layout cases
  - `0` review-needed findings
- Current raw audit count: `109`
  - This is governed inventory, not a generic backlog of missing tokens.
- Rule split for the remaining non-token inventory is now more precise:
  - `98` arbitrary-tailwind values
  - `7` Vue-bound style attributes
  - `4` static inline style attributes
- Current targeted geometry hotspots:
  - `Filter-tree Geometry System`: `41`
  - `Radix Select Geometry`: `4`
- Generated exception register:
  - `docs/PHASE2_EXCEPTION_GOVERNANCE.md`
- Geometry contracts:
  - `docs/PHASE2_GEOMETRY_CONTRACTS.md`
- Filter-tree geometry map:
  - `docs/PHASE2_FILTER_TREE_GEOMETRY_MAP.md`
- Shared SEO composables:
  - `app/shared/composables/useSEO.ts`
  - `app/shared/composables/useStructuredData.ts`
- SEO compatibility bridge:
  - `app/core/api/seo.ts`
- Centralized server-side SEO helpers:
  - `app/server/utils/seo.ts`
- Dynamic SEO endpoints:
  - `app/server/routes/robots.txt.ts`
  - `app/server/routes/sitemap.xml.ts`
- Security header plugin:
  - `app/server/plugins/security-headers.ts`
- Typed API client:
  - `app/core/api/client.ts`
- Shared domain contracts:
  - `app/shared/types/domain.ts`
- Token audit script:
  - `scripts/token-compliance-audit.mjs`

## What Is Explicitly Deferred
- Any token refactor inside visible shell/home components that could shift pixels.
- Any typography, spacing, color, border, motion, or layout normalization that is not proven output-equivalent.
- Any mass Arabic text normalization, because encoding/content accuracy requires focused review.

## Current Execution Focus
1. Keep all follow-up work in non-visual layers first.
2. Use `docs/COMPONENT_TOKEN_MATRIX.md` as the active Phase 2A mapping layer for token compliance.
3. Treat `docs/PHASE2_TOKEN_COMPLIANCE_AUDIT.md`, `.json`, and `docs/PHASE2_EXCEPTION_GOVERNANCE.md` as the canonical generated inventory layer.
4. Use governance buckets and hotspot summaries, not the raw count, to decide what is backlog versus intentional exception.
5. Use `docs/PHASE2_GEOMETRY_CONTRACTS.md` and `docs/PHASE2_FILTER_TREE_GEOMETRY_MAP.md` to guide any future work in `BaseTreeConnector`, `BaseSelect`, and filter-tree consumers.
6. Complete SEO/security/documentation hardening before any visible-component refactor.

## Known Repository Conditions
- Duplicate docs exist across numbered and non-numbered filenames.
- Duplicate asset trees still exist across `app/public` and `public`.
- Some source files contain mojibake Arabic literals and must not be mass-rewritten casually.
- Working tree already contains in-progress SEO/doc/script changes; they are part of the active non-visual rollout.
