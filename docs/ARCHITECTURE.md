# Rizqak Architecture (Canonical)

Last updated: 2026-03-09
Stack baseline: Nuxt 4.3.1, Vue 3.5.29, Tailwind CSS 4.2.1, TypeScript strict.

## 1) System Overview
Rizqak is an Arabic RTL job platform with SSR-first rendering and a componentized UI architecture.

Primary goals:
- Zero visual drift from approved homepage baseline.
- Strong separation of concerns between UI, state, and integration layers.
- Mobile-first, SEO-ready, security-conscious delivery.

## 2) Active Runtime Architecture

### 2.1 Framework and rendering
- Nuxt SSR enabled (`ssr: true`).
- Nitro preset: `node-server`.
- Route rules:
  - `/` prerendered.
  - `/jobs/**`, `/companies/**` use SWR.
  - `/auth/**`, `/dashboard/**` set to client-side rendering.

### 2.2 App shell
- Root app: `app/app.vue`
- Main layout: `app/layouts/default.vue`
- Shell composition:
  - `LayoutHeader`
  - page content slot
  - `LayoutFooter`

### 2.3 Source root
- `srcDir` is `app`, so all Nuxt app runtime code is under `app/**`.

## 3) Directory and Layer Contracts

## 3.1 UI layer
- `app/shared/components/base/**`: reusable base primitives.
- `app/components/**`: feature composition (home/filter/jobs/layout).

Rules:
- Base components own low-level behavior and style contracts.
- Feature components compose base components; avoid duplicating primitives.

## 3.2 State and composables
- Shared composables: `app/shared/composables/**`
- Feature composables: `app/features/*/composables/**`
- Filter behavior composables: `app/composables/filters/**`

## 3.3 Integration layer
- API/SEO integration currently in:
  - `app/core/api/client.ts`
  - `app/core/api/seo.ts`

## 3.4 Security layer
- Security headers plugin:
  - `app/server/plugins/security-headers.ts`

## 3.5 Types and utils
- Shared types:
  - `app/shared/types/index.ts`
  - `app/shared/types/filters.ts`
- Shared utilities:
  - `app/shared/utils/**`

## 3.6 Routing layer
- Pages:
  - `app/pages/index.vue`
- Layouts:
  - `app/layouts/default.vue`

## 4) Data Flow

Current intended flow:
1. Page/component requests data through composables.
2. Composables call API client abstractions.
3. API responses validated (zod in feature APIs).
4. Typed data delivered to presentation components.

Current gap:
- Some UI paths still use static mock sources for homepage content.

## 5) Theming and Styling
- Global token source: `app/assets/css/main.css` (`@theme`).
- Dark mode: `html.dark` token override strategy.
- Theme state: `app/shared/composables/useTheme.ts`.
- RTL baseline: `lang='ar'`, `dir='rtl'` applied globally.

## 6) SEO Architecture
- Head/meta configured at app and page/layout levels.
- Structured data helper utilities exist in `app/core/api/seo.ts`.
- Canonical and OG helpers exist but are not uniformly applied across all routes yet.

## 7) Security Architecture
- Active headers: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy, Permissions-Policy, HSTS.
- CSP currently configured as head meta in Nuxt config; recommended to centralize/enforce at header layer for consistency.

## 8) Performance Architecture
- SSR active.
- Payload extraction enabled (`experimental.payloadExtraction`).
- Route-level rendering strategy configured via `routeRules`.
- Further optimization opportunities remain for image strategy and lazy boundaries.

## 9) Technical Debt Register (Current)
1. Duplicate docs and non-canonical architecture narratives.
2. Duplicate static asset trees (`app/public` and `public`).
3. Mixed tokenized vs literal style values in key shell components.
4. Encoding artifacts in Arabic literals.
5. Sparse page coverage beyond homepage route.

## 10) Target Architecture Direction (Non-Visual)
1. Consolidate canonical docs and deprecate duplicates.
2. Raise token compliance to remove literal color/style usage from feature components.
3. Standardize SEO entry points for all page types (home/list/detail/company).
4. Strengthen typed domain contracts and API error model.
5. Keep frontend fully backend-agnostic through service composables.

## 11) Verification References
- `docs/PHASE1_AUDIT.md`
- `docs/PHASE1_FILE_CATALOG.csv`
- `docs/PHASE1_TOKEN_INVENTORY.csv`
- `docs/PHASE1_DIRECTIONAL_USAGE.csv`
