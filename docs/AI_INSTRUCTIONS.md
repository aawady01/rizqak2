# AI Instructions (Binding)

Last updated: 2026-03-09
Scope: Mandatory operating rules for any AI agent editing this repository.

## 1) Mandatory Read Order
Before any change:
1. Read `docs/PHASE0_ZERO_VISUAL_CHANGE_PROTOCOL.md`.
2. Read `docs/DESIGN_SYSTEM.md`.
3. Read `docs/ARCHITECTURE.md`.
4. Read `docs/PHASE1_AUDIT.md`.

No implementation work starts before these files are loaded.

## 2) Non-Negotiable Visual Contract
- Homepage output is the visual source of truth.
- Do not alter user-visible visuals or interactions unless the user explicitly requests it.
- Do not hardcode new colors, spacing, typography, radius, shadow, motion values.
- Use existing tokens from `app/assets/css/main.css` only.

## 3) Component Reuse Contract
- Prefer existing base components in `app/shared/components/base/**`.
- Do not create duplicate primitives when an equivalent exists.
- Feature components in `app/components/**` must compose base primitives.

## 4) RTL + Arabic Contract
- Keep `dir='rtl'`, `lang='ar'` intact.
- Prefer logical direction classes/properties (`ps`, `pe`, `inset-inline-*`, `text-start/end`).
- Avoid physical direction (`left/right`) unless explicitly justified.
- Preserve Arabic-first content patterns.

## 5) TypeScript Contract
- Strict TypeScript only. No `any` in new code.
- All props, emits, composable returns, API payloads must be typed.
- Prefer interface/type exports from shared type modules.

## 6) SEO Contract
For every new page:
- Add `useSeoMeta`/`useHead` title, description, canonical.
- Add relevant structured data where applicable.
- Keep heading hierarchy valid and semantic.
- Ensure SSR-compatible content rendering.

## 7) Security Contract
- Keep security headers active in Nitro plugin.
- Never expose secrets in client code.
- External links require `rel='noopener noreferrer'` where applicable.
- Validate and sanitize user-provided input before unsafe rendering.

## 8) Performance Contract
- Maintain mobile-first behavior.
- Prefer code-splitting and lazy loading for below-fold components.
- Preserve explicit media dimensions to reduce CLS.
- Avoid introducing heavy dependencies without necessity.

## 9) Data-Layer Contract
- API access must go through composable/service abstractions.
- Do not hardcode API origins; use runtime config.
- UI components should not directly embed backend-specific URL logic.

## 10) Change Governance
- Any user-facing logic decision requires explicit user approval.
- Any potentially risky refactor must include a rollback-friendly diff.
- After each substantial change:
  1. Run `npm run baseline:visual` if frozen UI files were touched.
  2. Run build or type checks.
  3. Report what changed and why.
  4. Confirm no visual drift if UI-affecting files were touched.

## 11) Documentation Governance
When adding/updating architecture or design rules:
- Update `docs/DESIGN_SYSTEM.md` if token/component conventions changed.
- Update `docs/ARCHITECTURE.md` if structure or data flow changed.
- Add an entry to project status/changelog docs as needed.

## 12) Known Repository Reality (Must Respect)
- Duplicate docs exist across legacy names and numbered variants.
- Duplicate static assets exist in both `app/public` and `public`.
- Some Arabic literals currently suffer encoding artifacts (mojibake).

Agents must not silently normalize or mass-rewrite content encoding without explicit approval, because it can affect content correctness across many files.
