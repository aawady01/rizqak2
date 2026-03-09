# Phase 0 Zero-Visual-Change Protocol

Last updated: 2026-03-09
Status: Active and mandatory

## Purpose
Freeze the approved homepage and layout presentation so architectural, SEO, security, typing, and documentation work can continue without changing any user-visible output.

## Frozen Visual Baseline
The following paths are treated as visual-contract files:
- `app/assets/css/main.css`
- `app/app.vue`
- `app/layouts/default.vue`
- `app/pages/index.vue`
- `app/components/**`
- `app/shared/components/base/**`

Hash manifest for the current approved baseline:
- `docs/PHASE0_VISUAL_BASELINE.json`
- `docs/PHASE0_VISUAL_BASELINE.md`

Generation command:
- `npm run baseline:visual`

## Allowed Change Zones
Unless explicitly approved by the user, work should start in these areas first:
- `app/shared/composables/**`
- `app/core/api/**`
- `app/server/**`
- `app/shared/types/**`
- `docs/**`
- `scripts/**`

## Visual-Risk Rules
1. A change inside any frozen visual-contract file is considered high risk by default.
2. No visual-contract file may be edited unless the change is provably output-equivalent or explicitly requested by the user.
3. Build success does not prove visual safety.
4. Token cleanup inside visible components is deferred until there is a direct equivalence proof path.
5. Any change to spacing, position, color, typography, borders, shadows, dimensions, visibility, transitions, or responsive behavior is forbidden without explicit user approval.

## Required Verification Gates
For every substantial phase:
1. Regenerate the visual baseline manifest if frozen files were touched.
2. Run `npm run typecheck`.
3. Run `npm run build`.
4. Run `npm run audit:tokens`.
5. Review whether any frozen-file hash changed and classify the risk before continuing.

## Canonical Project Documents
Use these as the active source of truth:
- `docs/PHASE0_ZERO_VISUAL_CHANGE_PROTOCOL.md`
- `docs/CURRENT-STATUS.md`
- `docs/MASTER_EXECUTION_PLAN.md`
- `docs/PHASE1_AUDIT.md`
- `docs/DESIGN_SYSTEM.md`
- `docs/AI_INSTRUCTIONS.md`
- `docs/ARCHITECTURE.md`

Legacy/duplicate docs may remain in the repository temporarily, but they are not authoritative unless linked from the list above.
