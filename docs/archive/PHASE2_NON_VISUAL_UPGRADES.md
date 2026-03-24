# Phase 2/3/6 Non-Visual Upgrades

Date: 2026-03-09
Goal: strengthen architecture, SEO, typing, and security with zero visual drift.

## Completed (No UI changes)

### 1) Typed API client hardening
File: `app/core/api/client.ts`

Improvements:
- Added typed query param model (`QueryParamValue`).
- Added typed request body handling for both JSON and `FormData`.
- Added safer endpoint normalization and URL construction.
- Added response parser based on content-type (JSON/text).
- Added typed error payload forwarding via `createError(...data)`.
- Preserved auth-token behavior and 401 redirect behavior.

Impact:
- Better runtime resilience and stronger type contracts.
- No template/style/visual output changes.

### 2) Security header strategy hardening
File: `app/server/plugins/security-headers.ts`

Improvements:
- Added modern hardening headers:
  - `Cross-Origin-Opener-Policy`
  - `Cross-Origin-Resource-Policy`
  - `X-DNS-Prefetch-Control`
  - `Origin-Agent-Cluster`
- Kept existing base headers (`nosniff`, frame protection, referrer policy, permissions policy).
- Added `Content-Security-Policy-Report-Only` in non-dev environments to avoid runtime breakage while gaining policy observability.
- HSTS is only set for HTTPS requests.

Impact:
- Better security posture without breaking current rendering.
- No visual changes.

### 3) SEO infrastructure (prepared layer)
Files:
- `app/shared/composables/useSEO.ts`
- `app/shared/composables/useStructuredData.ts`
- `nuxt.config.ts` (`runtimeConfig.public.siteUrl`)

Improvements:
- Added reusable SEO composable for canonical/robots/OG/Twitter metadata.
- Added reusable structured-data composable set for Website/Organization/JobPosting/Breadcrumb/ItemList.
- Added `NUXT_PUBLIC_SITE_URL` support for canonical URL generation.

Impact:
- Foundation ready for SEO rollout on new pages.
- Current page visuals unchanged.

### 4) Domain typing foundation
Files:
- `app/shared/types/domain.ts`
- `app/shared/types/index.ts`

Improvements:
- Added normalized domain entities and supporting contracts:
  - Job, Company, Location, Salary, Filters, Pagination, API envelope/problem.
- Exported domain types from shared type index.

Impact:
- Stronger separation of concerns for future feature work.
- No visual changes.

## Validation
- `nuxt typecheck`: passed.
- `nuxt build`: passed.
- Homepage UI restored and kept intact.

## Next Non-Visual Step
1. Wire SEO composables per route (home/list/detail) only in head metadata layer.
2. Add route-level structured data in pages once routes exist.
3. Incrementally migrate feature API composables to shared domain models.