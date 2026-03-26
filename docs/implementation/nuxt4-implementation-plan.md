# Nuxt 4 Implementation Plan

- **Date**: 2026-03-26
- **Project root**: C:\Users\USER\Desktop\rizqak2
- **Audit files used**: 
  - verified-nuxt4-tech-stack-audit.md
  - verified-nuxt4-tech-stack-audit.json
  - verified-nuxt4-rationalization.md
  - nuxt4-audit-discrepancies.md
- **Execution scope**: Remove confirmed unused dependency (debug)
- **Risk policy**: Low-risk only - automatic execution permitted

---

## Planned Batches

### Batch 1 — Confirmed Dependency Cleanup

**Objective**: Remove dead code (unused debug package)

| Package | Files Affected | Why | Risk |
|---------|---------------|-----|------|
| debug | package.json | Installed but never imported - dead code | Low |

**Evidence**: grep found 0 imports in app/, package is never used

**Validation**: pnpm install, pnpm typecheck, pnpm lint

**Rollback notes**: Can restore debug anytime if needed for future debugging

---

### Batch 2 — Configuration Issue Investigation

**Objective**: Verify and fix compression configuration error

| Issue | Files Affected | Why | Risk |
|-------|---------------|-----|------|
| compression property invalid | nuxt.config.ts line 133 | LSP error shows property not recognized in Nuxt 4 type | Medium |

**Investigation needed**: 
- Check if @nuxt-modules/compression uses different config format
- Check if module is needed or can be removed

**Validation**: pnpm build after fix

**Rollback notes**: Keep backup of working nuxt.config.ts

---

## Changes NOT in Scope (Require User Approval)

Per the execution policy, these require user approval:
- Any architectural changes
- Major dependency updates
- Security model changes
- Rendering mode changes

---

## Implementation Decision Matrix

| Item | Classification | Action |
|------|---------------|--------|
| debug package | Remove Now | EXECUTE NOW |
| compression config | Investigation needed | ASK before changing |

---

**Plan created**: 2026-03-26  
**Ready for execution**: Yes, once user confirms