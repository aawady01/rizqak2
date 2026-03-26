# Nuxt 4 Dependency Changes

## 2026-03-26 Audit Cycle Changes

---

## Removed Packages

| Package | Before Declared | After Declared | Before Resolved | After Resolved | Change Type | Why | Validation Result |
|---------|-----------------|----------------|-----------------|----------------|-------------|-----|-------------------|
| debug | ^4.4.3 | REMOVED | 4.4.3 | N/A | Removed | Dead code - never imported | Awaiting pnpm install |

---

## Updated Packages

| Package | Before Declared | After Declared | Before Resolved | After Resolved | Change Type | Why | Validation Result |
|---------|-----------------|----------------|-----------------|----------------|-------------|-----|-------------------|
| None | - | - | - | - | - | No version updates performed | - |

---

## Intentionally Unchanged

| Package | Reason |
|---------|--------|
| nuxt | Nuxt 4.4.2 - latest stable |
| vue | Resolved to 3.5.31 - latest |
| vite | Cannot manually upgrade - controlled by Nuxt |
| All other dependencies | Already at latest stable |

---

## Nuxt-Controlled Packages Deferred

| Package | Current | Latest | Why Deferred |
|---------|---------|--------|--------------|
| vite | 7.3.1 | 8.0.3 | Nuxt 4.4.2 uses Vite 7 internally - wait for Nuxt 4.5+ |

---

## Summary

| Category | Count |
|----------|-------|
| Removed | 1 |
| Updated | 0 |
| Deferred | 1 (Vite) |

---

**Date**: 2026-03-26