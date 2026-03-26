# Nuxt 4 Audit Discrepancies

## Summary

This document lists meaningful mismatches between:
- package.json
- pnpm-lock.yaml
- current codebase
- vue-nuxt-tech-stack-audit.md
- vue-nuxt-tech-stack-audit.json
- vue-nuxt-rationalization.md

---

## Discrepancies Found

### 1. Vite Version Status

| Source | Claim | Status |
|--------|-------|--------|
| Prior audit | 7.3.1 outdated vs 8.0.3 | ✅ Accurate |
| package.json | ^7.3.1 | Still 7.3.1 |
| pnpm-lock.yaml | 7.3.1 | Still 7.3.1 |
| Latest GitHub | 8.0.3 released | ⚠️ Nuxt-controlled, cannot update |

**Analysis**: Prior audit correctly identified outdated Vite. However, the claim that this is "outdated" is technically accurate but practically irrelevant since Vite is controlled by Nuxt ecosystem. Wait for Nuxt 4.5+.

---

### 2. Vue Query Plugin vs Actual Usage

| Source | Claim | Status |
|--------|-------|--------|
| Prior audit | "Plugin registered, no useQuery calls yet" | ✅ Accurate |
| pnpm-lock.yaml | 5.95.2 resolved | ✅ Verified |
| app/plugins/vue-query.ts | Plugin registered | ✅ Verified |
| grep in app/ | 0 useQuery or useMutation calls | ✅ Verified |

**Analysis**: Prior audit was 100% accurate. Vue Query is configured as a foundation but not actively used. This is intentional - no issue.

---

### 3. Vue Table - Not Used

| Source | Claim | Status |
|--------|-------|--------|
| Prior audit | "Installed, not used" | ✅ Accurate |
| pnpm-lock.yaml | 8.21.3 resolved | ✅ Verified |
| grep in app/ | 0 useVueTable usages | ✅ Verified |

**Analysis**: Prior audit correctly identified unused package. This is a "Premature for Current Stage" item - should defer until data tables needed.

---

### 4. Nuxt Content - No Content Pages

| Source | Claim | Status |
|--------|-------|--------|
| Prior audit | "Module ready, no content pages" | ✅ Accurate |
| nuxt.config.ts | Module registered | ✅ Verified |
| content.config.ts | Configuration exists | ✅ Verified |
| app/pages/ | No markdown content pages | ✅ Verified |

**Analysis**: Prior audit was accurate. No blog, about, or content pages exist despite module being configured.

---

### 5. Nuxt Image - No NuxtImg Usage

| Source | Claim | Status |
|--------|-------|--------|
| Prior audit | "Module ready, raw img used" | ✅ Accurate |
| nuxt.config.ts | image: {} configured | ✅ Verified |
| grep in Vue files | 0 NuxtImg usages | ✅ Verified |

**Analysis**: Prior audit correctly identified that image optimization is not actively used. Project still uses raw `<img>` tags.

---

### 6. Debug Package - Confirmed Unused

| Source | Claim | Status |
|--------|-------|--------|
| Prior audit | "Installed, not imported" | ✅ Accurate |
| pnpm-log.yaml | 4.4.3 resolved | ✅ Verified |
| grep in app/ | 0 imports of debug | ✅ Verified |

**Analysis**: Previously marked as "Ready" but actually completely unused. Should be **removed** — this is a discrepancy in recommendations.

---

### 7. Declared vs Resolved Version Mismatch

| Package | Declared | Resolved | Note |
|---------|----------|----------|------|
| vue | ^3.5.30 | 3.5.31 | Resolved to higher patch |
| @sentry/nuxt | ^10.43.0 | 10.46.0 | Resolved to higher patch |
| nuxt-og-image | ^6.0.3 | 6.2.3 | Resolved to higher version |

**Analysis**: These are normal semver resolutions - package manager resolves to compatible versions. No issue.

---

### 8. Security Headers File - Prior Audit vs Reality

| Source | Claim | Status |
|--------|-------|--------|
| Prior audit | "app/server/plugins/security-headers.ts deleted" | ✅ Verified |
| File system | File does NOT exist | ✅ Deleted |
| nuxt-security | Module provides same functionality | ✅ Running |

**Analysis**: Prior audit accurately documented the removal of custom security headers file. nuxt-security module handles this now.

---

### 9. SSR Mode

| Source | Claim | Status |
|--------|-------|--------|
| Prior audit | "SPA (ssr: false)" | ✅ Accurate |
| nuxt.config.ts | ssr: false (line 265) | ✅ Verified |
| app/ directory | Nuxt 4 structure | ✅ Verified |

**Analysis**: App is correctly configured as SPA mode - no server-side rendering.

---

## Summary of Discrepancies

| # | Item | Type | Prior Audit Accurate? |
|---|------|------|----------------------|
| 1 | Vite version | Version gap | ✅ Yes - but wait for Nuxt |
| 2 | Vue Query not used | Usage status | ✅ Yes - foundation ready |
| 3 | Vue Table not used | Usage status | ✅ Yes - premature |
| 4 | Nuxt Content not used | Usage status | ✅ Yes - no content pages |
| 5 | Nuxt Image not used | Usage status | ✅ Yes - still using img tags |
| 6 | debug package | Recommendation | ❌ No - should REMOVE, not defer |
| 7 | Security headers deleted | File status | ✅ Yes - nuxt-security handles it |
| 8 | SSR mode | Config | ✅ Yes - SPA mode confirmed |

---

## Key Finding: debug Package

The prior audit listed `debug` as "Ready - during development debugging" but this is incorrect:

- **Package is installed**: Yes (debug ^4.4.3)
- **Is it ever imported**: No (grep shows 0 imports)
- **Is there any debug configuration**: No
- **Evidence**: Package.json includes it, but app/ has 0 references

**Should be**: REMOVED - dead code

**Recommendation**: Remove `debug` dependency from package.json

---

**Audit Date**: 2026-03-26  
**Confidence**: High  
**Evidence**: package.json, pnpm-lock.yaml, nuxt.config.ts, grep searches in app/ directory, file system verification