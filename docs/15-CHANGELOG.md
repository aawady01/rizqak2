### 2026-03-09

- **Aligned Filter Hierarchy Checkboxes**: Standardized hierarchical indentation to 16px steps. Aligned each level's right edge with the parent's left edge for a perfect vertical "staircase" effect. Optimized connection line tokens to preserve visual continuity.
- **Fixed BaseTreeConnector Syntax**: Quoted the `inset-inline-end` property in `:style` object binding to resolve Vue compiler error and restore route navigation.
- **Fixed Filter Hierarchy Lines**: Unified the green Connection lines in filter sidebars. Aligned vertical rail to checkbox edges (10px offset) and adjusted branch lengths (22px) for a solid, continuous visual flow across all levels.
- **Refined Tree Tokens**: Updated `--filter-tree-*` design tokens in `main.css` to ensure perfect overlap and visibility.
- **RTL Compliance**: Switched `BaseTreeConnector` to use `inset-inline-start/end` for robust RTL support.

All notable changes documented with WHAT, WHERE, WHY.

## 2026-03-08 — Session 17: Visual Restoration & Fidelity Correction (rizqak2)

### Changed/Restored

- **Header Navigation**: Increased navigation link spacing (`px-8` and `gap-2`) to restore the original "relaxed" design.
- **Sidebar Filters**: Reverted unintended decorative backgrounds and borders in `TreeBranch` and `BaseFilterSection` to match original vertical rhythm.
- **Auth Pages Fidelity**:
  - Restored visible borders (`border-neutral-300`) to `BaseInput`.
  - Migrated legacy Material Symbols to modern **Lucide** icons in `login.vue` and `register.vue`.
  - Corrected Role Selector card visual weight.
- **General Compliance**: Forced `rounded-none` on `BaseSearchInput` components to complete the zero-radius architecture.

## 2026-03-08 — Session 16: Zero-Radius & RTL Compliance Refactor (rizqak2)

### Changed/Refactored

- **Universal Zero-Radius Architecture**: Enforced `rounded-none` on all interactive cards, buttons, inputs, and modals globally.
- **Auth Pages Rewrite**:
  - Refactored `login.vue` and `register.vue` to strictly use atomic `Base` components.
  - Replaced all legacy `input`, `button`, and `label` tags with `BaseInput`, `BaseButton`, and `BaseTypography`.
  - Switched to logical RTL properties: `inset-inline-end` for password toggles and spacing.
- **Base Components Polish**:
  - `BaseDialog.vue`: Switched to logical positioning (`inset-inline-start-1/2`) and `rounded-none`.
  - `BaseSelect.vue`: Standardized border radius and spacing.
- **Home & Job Components**:
  - `JobCard.vue` & `CompanyCard.vue`: Implemented hover lift effect (`-translate-y-1`) with `rounded-none` and logical border indicators.
  - `CountryCarousel.vue`: Standardized arrow positioning via logical properties.
  - `HomeFeaturedCompanies.vue`: Refactored grid cards for 100% compliance.
- **Filter Engine Optimization**:
  - `FilterItemRow.vue`, `TreeBranch.vue`, `TreeConnector.vue`: Refactored to use `pe-`, `ps-`, `ms-`, and `inset-inline-` logical utilities.
  - `BaseTableCell.vue` & `BaseTableHead.vue`: Updated to use `text-start` and `pe-` for structural RTL accuracy.

## 2026-03-08 — Session 15: Design System Refactor (rizqak2)

### Changed

- **Typography System**: Implemented the comprehensive 2026 Design System typography scale in `main.css`.
- **Atomic Components**: Created `BaseTypography.vue`, a polymorphic component that enforces design tokens for all text elements.
- **Home Page Refactor**:
  - `HomeHero.vue`, `HomeFeaturedCompanies.vue`, `HomeJobList.vue`: Refactored to use `BaseTypography` and unified tokens.
  - `JobCard.vue` & `CompanyCard.vue`: Standardized typography and hover states to match the design system exactly.
  - `HomeSidebar.vue`: Refactored filter headers and action buttons with precise tokens.
  - `BasePagination.vue`: Updated to use standardized typography tokens.
- **Design Alignment**: Ensured 100% parity between the implemented UI components and the `docs/16-DESIGN-SYSTEM.md` specifications.

## 2026-03-08 — Session 14: Technology Stack Modernization

### Changed

- **Core Upgrade**: Upgraded the entire frontend technology stack to the absolute latest stable versions as of March 8, 2026.
  - upgraded `typescript` to `5.9.3`.
  - upgraded `pinia` to `3.0.4` and `@pinia/nuxt` to `0.11.3`.
  - upgraded `vite` to `7.3.1`.
  - upgraded `vue-tsc` to `3.2.5`.
  - upgraded `@tailwindcss/forms` to `0.5.11`.
  - upgraded `@types/node` to `25.3.5`.
  - added `lucide-vue-next` (`0.577.0`) as an explicit dependency for version locking.
- **Documentation**: Synchronized `TECH-STACK.md`, `CURRENT-STATUS.md`, and `CHANGELOG.md` with the new versions and 2026 best practices.

## 2026-03-08 — Session 13: IDE Configuration

### Fixed

- **Tailwind v4 IDE Warnings**: Configured VS Code (`.vscode/settings.json`) to ignore unknown CSS at-rules (`"css.lint.unknownAtRules": "ignore"`), resolving persistent warnings about the `@theme` directive in `main.css`.

## 2026-03-07 — Session 12: Advanced Base Components & Filter System Architecture

### Added

- **Atomic Base Components**: Extracted hardcore atomic components to the Design System (`app/shared/components/base/`):
  - `BaseSearchInput.vue` (unified debounce, `defineModel`).
  - `BaseFilterHeader.vue` (unified title & search layouts).
  - `BaseFilterShowMore.vue` (standardized strict RTL margins).
  - `BaseFilterItemRow.vue` (unified accessible checkboxes/radios via `<label>` + `sr-only`).
  - `BaseTreeConnector.vue` (RTL logical property structural CSS lines).
- **High-Performance Filter Engine**: Created `BaseHierarchicalFilter.vue` using a flattened 1D array state from `useVirtualizedTree.ts` to support >10,000 deep-nested nodes smoothly at 60fps, complete with Zero-CLS exact-height Skeleton Loaders.
- **URL Synchronization & SEO**: Intercepted the state in `useTreeSelection.ts` and synced it to `useRoute().query` automatically to allow deep link sharing and crawler indexability.
- **Extreme Reactivity**: Switched deep `ref` to `shallowRef` across massive array sets targeted for extreme JS execution speed.

### Changed

- **Filter Wrappers**: Transformed `HierarchicalFilter.vue` and `TreeFilterSection` legacy components into thin wrapper facades that silently delegate to the new `Base` architecture, preserving backward compatibility across the app without breaking data chains.
- **RTL Logical CSS Enforcement**: Scrubbed all `ml-`, `pr-`, `right-*` directional utility classes from filter components and replaced them with standard Tailwind RTL logical properties (`ms-`, `pe-`, `inset-inline-start`).
- **Semantic DOM Structure**: Removed deeply nested `div` clicks in favor of pure semantic `<label>` elements anchoring hidden native inputs, solving multiple ARIA accessibility gaps.

---

## 2026-02-27 — Session 11: Shadcn UI Port to Vue (rizqak2)

### Added

- **UI Architecture**: Implemented `cn` utility in `app/shared/utils/tailwind.ts` combining `clsx` and `tailwind-merge` for robust tailwind class manipulation.
- **Data Mocking**: Extracted React static payloads into `app/shared/utils/mockData.ts`.
- **Atomic Components**:
  - `BaseButton.vue` using CVA for variants and sizes.
  - `BaseCard.vue` implementing compound component patterns via Vue Slots.
  - `BaseCheckbox.vue` with native array binding.
  - `BasePagination.vue` identical to Radix-ui/Shadcn pattern.
  - Phase 6 Primitives: `BaseBadge.vue`, `BaseLabel.vue`, `BaseInput.vue`, `BaseTextarea.vue`, `BaseSkeleton.vue`, `BaseAvatar.vue`, `BaseTable.vue` (with slots).
  - Radix-vue accessible components: `BaseSelect.vue`, `BaseDialog.vue`, `BaseTabs.vue`.
- **Business Components**:
  - `CountryCard.vue`, `HomeHero.vue`, `CompanyCard.vue`, `HomeFeaturedCompanies.vue`, `JobCard.vue`, `HomeJobList.vue`.
- **Filter Systems**:
  - `BaseFilterSection.vue` serving as the unified architectural standard encompassing Titles, Search, and Select-All wrappers.
  - Added global expand/collapse toggle (`+`/`-`) to `BaseFilterSection` and `TreeFilterSection` allowing users to recursively open all nesting levels at once.
  - `TreeCheckbox.vue` and `TreeBranch.vue` for hierarchical categories.
  - `TreeFilterSection.vue` and `SimpleFilter.vue` mapping complex React state logic to Vue composables and slotting into `BaseFilterSection`.
  - `GenderFilter.vue` using `BaseFilterSection`.
  - `HomeSidebar.vue` integrating all filters.
- **Layouts**:
  - `LayoutHeader.vue` and `LayoutFooter.vue`.
- **Pages**:
  - Assembled `pages/index.vue` and wrapped `layouts/default.vue` to mirror React `App.tsx` structure exactly.

- **Cleanup**: Consolidated redundant components to resolve Nuxt name collision warnings. Deleted legacy `Header.vue`, `Footer.vue`, and `FeaturedCompanies.vue` in favor of and `LayoutHeader.vue`, `LayoutFooter.vue`, and `HomeFeaturedCompanies.vue`.
- **System Launch**: Successfully initialized Nuxt 4 development environment on `localhost:3000` with clean module resolution.

### Fixed

- **UI Spacing**:
  - Increased bottom padding in `BaseFilterSection.vue` (`pb-3`) to improve breathing room above filter grouping separators.
  - Reduced vertical spacing between individual filter items in `TreeBranch.vue`, `BaseFilterSection`, and `SimpleFilter.vue` (from `py-[6px]` and `py-[5px]` to `py-1` and `py-0.5` for sub-items) and shifted vertical connecting stems to `12px` and `10px` to ensure the list feels tighter and more cohesive.
  - Fixed an issue where the main vertical stem connection remained visible when the master category group was collapsed.
  - Aligned the global expand/collapse icon in `BaseFilterSection` to match the vertical positioning of sub-category icons.
  - Set default filter state to "Select All" checked and "Collapsed" for better initial UX.
  - Implemented "Instant Search": Searching now automatically expands the "All Categories" section and any matching sub-categories to show results immediately, even if they were previously collapsed.
  - Added Arabic text normalization to filter search (`normalizeArabic`) to robustly match common character variants (e.g., ة/ه, ي/ى, أ/ا).
  - Reduced the width of the filter search input (`max-w-[130px]`) for a more balanced layout.
  - Implemented smooth accordion transitions (`grid-template-rows: 0fr/1fr`) for all filter expand/collapse actions, replacing jarring `v-show`/`v-if` snaps with a solid, premium sliding animation.
  - Aligned job count numbers to sit immediately next to category labels instead of floating to the far left, while keeping expand/collapse icons anchored to the left edge.
  - Fixed an issue where clicking directly on the filter checkboxes (the square itself) for sub-categories did not select them due to stopped event propagation.
  - Added `select-none` class to all filter items to prevent annoying text highlighting when users double-click or click rapidly.
  - Added a smooth drop shadow and border effect (`shadow-sm border`) to parent categories when they are expanded to give a clear visual indication of depth and hierarchy.
  - Fixed a visual glitch where the green hierarchical tree lines appeared disconnected when expanded, by moving the line elements outside the padded row container to prevent background overlap.
  - Corrected the exact height and starting coordinates of the vertical connecting lines (`TreeBranch` and `BaseFilterSection`) so they connect perfectly starting from the checkbox bottom and properly stop correctly exactly at the very last child without overdrawing.
  - Updated the internal child branch connecting lines to `z-30` so they are not hidden by the expanded parent's shadow background.
  - Added "المزيد/أقل" (Show More/Less) feature to filter trees: root categories and children inside each category are limited to 4 visible items initially, with a "المزيد (+N)" link to reveal the rest and "أقل" to collapse back. Search bypasses the limit to show all matching results.
- **Module Resolution**: Fixed `nuxt.config.ts` alias configuration which caused `~/components/` resolution failures in Nuxt 4.
- **Component Conflicts**: Resolved "Two component files resolving to the same name" warnings by eliminating duplicate component definitions.

## 2026-02-24 — Session 10: Page Migration & Auth Infrastructure

### Added

- **Auth Store**: Created `stores/auth.ts` with Pinia for session management.
- **Route Middleware**: Implemented `auth` (protected) and `guest` (redirect) guards.
- **Dashboard Layout**: Created `layouts/dashboard.vue` with responsive sidebar and mobile nav.
- **Dashboard Page**: Created `pages/dashboard/index.vue` with stats and quick actions.

### Changed

- **Login Page**: Updated `pages/auth/login.vue` with password toggle, remember me, and enhanced design.
- **Register Page**: Updated `pages/auth/register.vue` with role selection and validation.
- **Task Tracking**: Initialized and completed `task.md` for page migration.

## 2026-02-14 — Session 1: Backend Scaffolding

### Added

- **Workspace root configuration**
  - Files: `Cargo.toml`, `.gitignore`, `.env.example`, `Makefile`, `docker-compose.yml`
  - 12 workspace members defined
  - Shared dependency versions in `[workspace.dependencies]`

- **Core crate** (`crates/core`)
  - Files: `error.rs`, `result.rs`, `pagination.rs`, `id.rs`, `datetime.rs`, `slug.rs`, `lib.rs`
  - AppError enum with 6 variants + IntoResponse for Axum
  - PaginatedResponse<T> generic pagination wrapper
  - typed_id! macro generating 15 typed UUID wrappers
  - Reason: Foundation types shared across all layers

- **Domain crate** (`crates/domain`)
  - Files: 15 entity files, 9 repository trait files, 3 value object files
  - Entities: User, Company, Job, Review, Comment, Occupation, Category, Region, Country, Skill, Report, Notification, SavedJob, Page, Faq
  - Repository traits: UserRepo, CompanyRepo, JobRepo, ReviewRepo, OccupationRepo, CountryRepo, ReportRepo, NotificationRepo, PageRepo
  - Value objects: Email, Phone, Money
  - Reason: Pure business domain, hexagonal architecture inner layer

- **Infrastructure crate** (`crates/infrastructure`)
  - Files: connection.rs, pg_user_repo.rs, pg_company_repo.rs, pg_job_repo.rs, cache/mod.rs, storage/mod.rs, email/mod.rs
  - Database pool creation with auto-migration
  - Stub implementations for 3 PG repositories
  - Stub implementations for Redis, S3, SMTP
  - Reason: Hexagonal adapter layer for external services

- **Application crate** (`crates/app`)
  - Files: auth_dto.rs, job_dto.rs, company_dto.rs, review_dto.rs, user_dto.rs, commands/mod.rs, queries/mod.rs
  - DTOs for API input/output with validation derives
  - Command/query handler stubs
  - Reason: Application layer with DTOs and use cases

- **Feature crates** (7 crates)
  - `rizqak-auth`: JWT, Argon2, register/login/refresh/me handlers
  - `rizqak-jobs`: CRUD handlers for job listings
  - `rizqak-companies`: CRUD handlers for company profiles
  - `rizqak-users`: Profile management handlers
  - `rizqak-admin`: Admin dashboard handlers
  - `rizqak-seo`: sitemap.xml, robots.txt handlers
  - `rizqak-content`: Occupations, countries, pages, FAQs handlers
  - Reason: Feature modules per hexagonal architecture

- **API server** (`apps/api-server`)
  - Files: main.rs, config.rs, app_state.rs, router.rs, extractors/auth_user.rs, middleware/mod.rs
  - Axum server with config loading, DB pool, tracing
  - Router composing all feature crates under /api/v1
  - JWT auth extractor
  - Reason: HTTP entry point composing all features

- **Database migrations** (14 files)
  - Extensions, triggers, users, regions, countries, categories, occupations, companies, jobs, reviews, comments, reports, user actions, admin/CMS, full-text indexes, seed data
  - Seed data: 5 regions, 9 countries, 10 categories
  - Reason: Complete schema for MVP

- **Documentation system** (16 files + module docs)
  - All files in `/docs/` following documentation-first methodology
  - Reason: Single source of truth for AI model switching

### Fixed

- Edition 2024 → 2021 for stable Rust compatibility (DEC-006)
- `PaginatedResponse<T: TS>` → removed TS bound (domain entities don't implement TS)
- `JobComment` import path: `entities::job` → `entities::job_comment`
- `lettre` native-tls conflict: added `default-features = false` (DEC-007)
- Missing `anyhow` dependency in auth + api-server Cargo.toml
- `with_state(state)` type mismatch → replaced with `Extension(Arc::new(state))` (DEC-008)

### Dependencies Added

All workspace-level dependencies:

- tokio 1, axum 0.8, axum-extra 0.10, tower 0.5, tower-http 0.6
- sqlx 0.8, serde 1, serde_json 1, uuid 1, chrono 0.4
- thiserror 2, anyhow 1, async-trait 0.1
- jsonwebtoken 9, argon2 0.5, validator 0.19
- tracing 0.1, tracing-subscriber 0.3, dotenvy 0.15
- tower-governor 0.5, ts-rs 10, lettre 0.11, slug 0.1

## 2026-02-14 — Session 2: Frontend Scaffolding + Rust 2024

### Added

- **SolidStart project** (`apps/web-client/`)
  - `package.json`, `tsconfig.json`, `app.config.ts` — SSR + TypeScript
  - `entry-server.tsx` — Arabic RTL HTML shell + Cairo font
  - `entry-client.tsx` — Client hydration
  - `app.tsx` — Root with Router, FileRoutes, MetaProvider

- **Design system** (4 CSS files)
  - `tokens.css` — 60+ CSS custom properties (colors, typography, spacing, shadows, z-index)
  - `reset.css` — Modern CSS reset + RTL defaults + accessibility
  - `global.css` — Container, headings, utilities, responsive grid
  - `components.css` — Styles for all 12 UI components

- **12 UI components** (`src/components/ui/`)
  - Button (4 variants, 3 sizes, loading), Input, Card, Badge (5 variants)
  - Avatar (4 sizes, initials fallback), Rating (interactive/display)
  - Skeleton, Pagination (smart windowing), Modal (dialog/drawer)
  - Toast (global state), Select, Tabs — all with Arabic ARIA labels

- **5 Layout components** (`src/components/layout/`)
  - Header (sticky, responsive), Footer (3-column, responsive)
  - PageLayout, AuthLayout (centered card), DashboardLayout (sticky sidebar)

- **3 Feature components**
  - JobCard, CompanyCard, ReviewCard — typed with backend DTOs

- **10 Page routes** (file-based routing)
  - Home (hero + stats + CTA), Jobs listing, Job detail
  - Companies listing, Company detail, Login, Register
  - Dashboard, Saved jobs, Profile

- **Lib layer** (`src/lib/`)
  - `types.ts` — 20+ TypeScript interfaces matching backend DTOs
  - `api-client.ts` — Typed fetch wrapper + auto-refresh tokens
  - `auth.ts` — AuthProvider context + useAuth hook
  - `utils.ts` — Arabic formatters, date utils, className merger

### Changed

- Rust edition: 2021 → 2024 (stable since Rust 1.85, Feb 2025)
- Updated all AI rule files with Rule #6 (Technology Versions)

## 2026-02-14 — Session 3: Frontend Redesign & Polish

### Changed

- **Frontend CSS System**:
  - Rewrote `components.css` (~700 lines) to match high-fidelity mockups.
  - Implemented "Dark Green" primary theme and unified spacing tokens.
  - Optimized for RTL (Right-to-Left) layouts.

- **Page Rewrites (Visuals)**:
  - **Home/Jobs**: Added Hero search, Country Carousel, Featured Companies grid, detailed Job Cards with benefits.
  - **Job Details**: Added breadcrumbs, sidebar with company summary, requirements table, threaded comments.
  - **Company Profile**: Added tabbed interface (Info/Reviews/Jobs), rating charts, statistics.

- **Component Updates**:
  - New components: `JobFilters` (sidebar), `ReviewCard` (with replies), `CompanyHeader`, `BenefitTag`.
  - Updated `Header` and `Footer` to match specific branding mockups.

### Fixed

- **TypeScript Configuration**:
  - Fixed `vinxi/types/client` resolution in `tsconfig.json`.
  - Resolved "Cannot find module" errors for `solid-js` packages.

- **Nuxt 3 Transition**: Finalized decision to use Nuxt 3 instead of SolidStart due to better RTL support and ecosystem maturity for Vue (DEC-004 updated).

## 2026-02-15 — Session 4: UI Polish & Standardization

### Added

- **UI/UX Consistency Standards (DEC-011)**:
  - Formalized Primary Green (`#1B6B4A`) as the brand standard.
  - Set `space-y-2` as the standard for job card lists for higher density.
  - Set `gray-300`/`gray-600` as the standard contrast for sidebar dividers.
  - Standardized interactive focus effects for search inputs and smooth `max-height` animations.
  - Reason: Ensure a premium, uniform feel across all current and future components.

### Changed

- Updated `docs/06-FRONTEND-GUIDE.md` and `docs/03-FOLDER-STRUCTURE.md` to reflect Nuxt 3 architecture.

# Changelog

All notable changes documented with WHAT, WHERE, WHY.

---

## 2026-02-14 — Session 1: Backend Scaffolding

### Added

- **Workspace root configuration**
  - Files: `Cargo.toml`, `.gitignore`, `.env.example`, `Makefile`, `docker-compose.yml`
  - 12 workspace members defined
  - Shared dependency versions in `[workspace.dependencies]`

- **Core crate** (`crates/core`)
  - Files: `error.rs`, `result.rs`, `pagination.rs`, `id.rs`, `datetime.rs`, `slug.rs`, `lib.rs`
  - AppError enum with 6 variants + IntoResponse for Axum
  - PaginatedResponse<T> generic pagination wrapper
  - typed_id! macro generating 15 typed UUID wrappers
  - Reason: Foundation types shared across all layers

- **Domain crate** (`crates/domain`)
  - Files: 15 entity files, 9 repository trait files, 3 value object files
  - Entities: User, Company, Job, Review, Comment, Occupation, Category, Region, Country, Skill, Report, Notification, SavedJob, Page, Faq
  - Repository traits: UserRepo, CompanyRepo, JobRepo, ReviewRepo, OccupationRepo, CountryRepo, ReportRepo, NotificationRepo, PageRepo
  - Value objects: Email, Phone, Money
  - Reason: Pure business domain, hexagonal architecture inner layer

- **Infrastructure crate** (`crates/infrastructure`)
  - Files: connection.rs, pg_user_repo.rs, pg_company_repo.rs, pg_job_repo.rs, cache/mod.rs, storage/mod.rs, email/mod.rs
  - Database pool creation with auto-migration
  - Stub implementations for 3 PG repositories
  - Stub implementations for Redis, S3, SMTP
  - Reason: Hexagonal adapter layer for external services

- **Application crate** (`crates/app`)
  - Files: auth_dto.rs, job_dto.rs, company_dto.rs, review_dto.rs, user_dto.rs, commands/mod.rs, queries/mod.rs
  - DTOs for API input/output with validation derives
  - Command/query handler stubs
  - Reason: Application layer with DTOs and use cases

- **Feature crates** (7 crates)
  - `rizqak-auth`: JWT, Argon2, register/login/refresh/me handlers
  - `rizqak-jobs`: CRUD handlers for job listings
  - `rizqak-companies`: CRUD handlers for company profiles
  - `rizqak-users`: Profile management handlers
  - `rizqak-admin`: Admin dashboard handlers
  - `rizqak-seo`: sitemap.xml, robots.txt handlers
  - `rizqak-content`: Occupations, countries, pages, FAQs handlers
  - Reason: Feature modules per hexagonal architecture

- **API server** (`apps/api-server`)
  - Files: main.rs, config.rs, app_state.rs, router.rs, extractors/auth_user.rs, middleware/mod.rs
  - Axum server with config loading, DB pool, tracing
  - Router composing all feature crates under /api/v1
  - JWT auth extractor
  - Reason: HTTP entry point composing all features

- **Database migrations** (14 files)
  - Extensions, triggers, users, regions, countries, categories, occupations, companies, jobs, reviews, comments, reports, user actions, admin/CMS, full-text indexes, seed data
  - Seed data: 5 regions, 9 countries, 10 categories
  - Reason: Complete schema for MVP

- **Documentation system** (16 files + module docs)
  - All files in `/docs/` following documentation-first methodology
  - Reason: Single source of truth for AI model switching

### Fixed

- Edition 2024 → 2021 for stable Rust compatibility (DEC-006)
- `PaginatedResponse<T: TS>` → removed TS bound (domain entities don't implement TS)
- `JobComment` import path: `entities::job` → `entities::job_comment`
- `lettre` native-tls conflict: added `default-features = false` (DEC-007)
- Missing `anyhow` dependency in auth + api-server Cargo.toml
- `with_state(state)` type mismatch → replaced with `Extension(Arc::new(state))` (DEC-008)

### Dependencies Added

All workspace-level dependencies:

- tokio 1, axum 0.8, axum-extra 0.10, tower 0.5, tower-http 0.6
- sqlx 0.8, serde 1, serde_json 1, uuid 1, chrono 0.4
- thiserror 2, anyhow 1, async-trait 0.1
- jsonwebtoken 9, argon2 0.5, validator 0.19
- tracing 0.1, tracing-subscriber 0.3, dotenvy 0.15
- tower-governor 0.5, ts-rs 10, lettre 0.11, slug 0.1

## 2026-02-14 — Session 2: Frontend Scaffolding + Rust 2024

### Added

- **SolidStart project** (`apps/web-client/`)
  - `package.json`, `tsconfig.json`, `app.config.ts` — SSR + TypeScript
  - `entry-server.tsx` — Arabic RTL HTML shell + Cairo font
  - `entry-client.tsx` — Client hydration
  - `app.tsx` — Root with Router, FileRoutes, MetaProvider

- **Design system** (4 CSS files)
  - `tokens.css` — 60+ CSS custom properties (colors, typography, spacing, shadows, z-index)
  - `reset.css` — Modern CSS reset + RTL defaults + accessibility
  - `global.css` — Container, headings, utilities, responsive grid
  - `components.css` — Styles for all 12 UI components

- **12 UI components** (`src/components/ui/`)
  - Button (4 variants, 3 sizes, loading), Input, Card, Badge (5 variants)
  - Avatar (4 sizes, initials fallback), Rating (interactive/display)
  - Skeleton, Pagination (smart windowing), Modal (dialog/drawer)
  - Toast (global state), Select, Tabs — all with Arabic ARIA labels

- **5 Layout components** (`src/components/layout/`)
  - Header (sticky, responsive), Footer (3-column, responsive)
  - PageLayout, AuthLayout (centered card), DashboardLayout (sticky sidebar)

- **3 Feature components**
  - JobCard, CompanyCard, ReviewCard — typed with backend DTOs

- **10 Page routes** (file-based routing)
  - Home (hero + stats + CTA), Jobs listing, Job detail
  - Companies listing, Company detail, Login, Register
  - Dashboard, Saved jobs, Profile

- **Lib layer** (`src/lib/`)
  - `types.ts` — 20+ TypeScript interfaces matching backend DTOs
  - `api-client.ts` — Typed fetch wrapper + auto-refresh tokens
  - `auth.ts` — AuthProvider context + useAuth hook
  - `utils.ts` — Arabic formatters, date utils, className merger

### Changed

- Rust edition: 2021 → 2024 (stable since Rust 1.85, Feb 2025)
- Updated all AI rule files with Rule #6 (Technology Versions)

## 2026-02-14 — Session 3: Frontend Redesign & Polish

### Changed

- **Frontend CSS System**:
  - Rewrote `components.css` (~700 lines) to match high-fidelity mockups.
  - Implemented "Dark Green" primary theme and unified spacing tokens.
  - Optimized for RTL (Right-to-Left) layouts.

- **Page Rewrites (Visuals)**:
  - **Home/Jobs**: Added Hero search, Country Carousel, Featured Companies grid, detailed Job Cards with benefits.
  - **Job Details**: Added breadcrumbs, sidebar with company summary, requirements table, threaded comments.
  - **Company Profile**: Added tabbed interface (Info/Reviews/Jobs), rating charts, statistics.

- **Component Updates**:
  - New components: `JobFilters` (sidebar), `ReviewCard` (with replies), `CompanyHeader`, `BenefitTag`.
  - Updated `Header` and `Footer` to match specific branding mockups.

### Fixed

- **TypeScript Configuration**:
  - Fixed `vinxi/types/client` resolution in `tsconfig.json`.
  - Resolved "Cannot find module" errors for `solid-js` packages.

- **Nuxt 3 Transition**: Finalized decision to use Nuxt 3 instead of SolidStart due to better RTL support and ecosystem maturity for Vue (DEC-004 updated).

## 2026-02-15 — Session 4: UI Polish & Standardization

### Added

- **UI/UX Consistency Standards (DEC-011)**:
  - Formalized Primary Green (`#1B6B4A`) as the brand standard.
  - Set `space-y-2` as the standard for job card lists for higher density.
  - Set `gray-300`/`gray-600` as the standard contrast for sidebar dividers.
  - Standardized interactive focus effects for search inputs and smooth `max-height` animations.
  - Reason: Ensure a premium, uniform feel across all current and future components.

### Changed

- Updated `docs/06-FRONTEND-GUIDE.md` and `docs/03-FOLDER-STRUCTURE.md` to reflect Nuxt 3 architecture.
- Reverted expand/collapse icons to original plus/minus symbols based on user preference.

## Last Updated

2026-02-15 — Session 4.

## 2026-02-15 — Session 5: Homepage Refactor & Modernization

### Added

- **Core Types**: Created `types/index.ts` with centralized interfaces for Jobs, Companies, and Countries.
- **Homepage Composable**: Extracted state management and data formatting logic into `useHomepage.ts`.
- **Hierarchical Filter Composable**: Extracted complex tree management logic into `useHierarchicalFilter.ts`.
- **Modular Homepage Components**:
  - `components/home/HomeHero.vue` — Hero section and search bar.
  - `components/home/CountryCarousel.vue` — Interactive flags carousel.
  - `components/home/FeaturedCompanies.vue` — Lazy-loaded company grid.
  - `components/home/HomeSidebar.vue` — Sidebar containing all filters.
  - `components/jobs/JobCard.vue` — Optimized job listing article.
- **SEO Enhancements**:
  - Implemented `useSeoMeta` for optimized meta tags.
  - Added JSON-LD structured data for `WebSite` and `Organization` schemas.
- **Documentation**: Comprehensive updates to `FOLDER-STRUCTURE.md`, `FRONTEND-GUIDE.md`, and `SEO.md`.

### Changed

- **Refactored index.vue**: Reduced from ~800 lines to ~170 lines by adopting a modular architecture.
- **Vue 3.5 Upgrade**: Refactored `BaseSelect.vue` and `HierarchicalFilter.vue` to use modern standards (`useTemplateRef`, Reactive Props Destructuring).
- **Accessibility**: Standardized `aria-label` across all interactive elements (carousel arrows, filter buttons).
- **Performance**: Integrated Nuxt automatic component lazy loading (`Lazy` prefix).

### Fixed

- Fixed recursive tree expansion logic in `HierarchicalFilter.vue`.
- Corrected heading hierarchy to follow semantic `h1` -> `h2` -> `h3` nesting.

## 2026-02-23 — Session 6: Companies Directory & Stitch Integration

### Added

- **Company Profile Pages (`/companies/[slug].vue`)**:
  - Implemented the layout derived from external Stitch UI structures.
  - Incorporated Company Header, About section, Ratings breakdown, and threaded Review cards.
  - Strictly enforced project global design tokens (`0px` box radii, `.design-subtitle` typography) overriding initial Stitch specific generic values.
- **Companies Directory (`/companies/index.vue`)**:
  - Grid layout matching the style of the Home page's `FeaturedCompanies` section.
  - Added static filter placeholders mimicking Stitch sidebar structure.
- **Company Components**:
  - Created `components/Companies/CompanyCard.vue` based on the unified design system.

### Changed

- Refactored `HomeFeaturedCompanies.vue` internal looping div to be a fully interactive `NuxtLink` pointing to the new dynamic `[slug].vue` route.
- Updated documentation (`03-FOLDER-STRUCTURE.md` and `13-CURRENT-STATUS.md`) to index the new feature.

## Last Updated

2026-02-23 — Session 6.

## 2026-02-23 — Session 7: Company Profile Implementation

### Changed

- **Company Profile (`/companies/[slug].vue`)**:
  - Completely rewrote the page to strictly follow high-fidelity mockups.
  - Replaced the temporary `LayoutAppHeader` with the global `LayoutHeader`.
  - Implemented the 2-column grid layout for the "Information" tab (About, Stats, License Data).
  - Implemented the threaded UI setup and star tracking components for the "Reviews" tab.
  - Inserted fully-styled mock job cards within the "Jobs" tab.
  - Fixed various CSS inline styling issues.

### Added

- **Company Components (`components/companies/`)**:
  - Extracted logic from `[slug].vue` into modular components to manage file size and complexity.
  - Added `CompanyProfileHeader.vue` for the top banner and base info.
  - Added `CompanyProfileSidebar.vue` for the Info tab right-side static links and maps.
  - Added `CompanyProfileReviewsSidebar.vue` for the Reviews tab right-side rating charts.
  - Added `CompanyProfileInfoTab.vue`, `CompanyProfileReviewsTab.vue`, and `CompanyProfileJobsTab.vue` to encapsulate tab-specific content.

## 2026-02-23 — Session 8: Company Profile Reviews Tab Refinement

### Changed

- **Reviews Tab & Sidebar**:
  - Rewrote `CompanyProfileReviewsTab.vue` and `CompanyProfileReviewsSidebar.vue` to perfectly match an external custom HTML structure provided.
  - Replaced the generic card approach with a bespoke thread system featuring vertical green connector drops (`w-[3px] bg-[#2D8A4E]`), dropdown arrows, and uniquely colored official reply boxes.
  - Brought custom color codes into alignment with standard dark mode utilities via Tailwind to preserve the site's dark mode capabilities across newly integrated components.

## Last Updated

2026-02-23 — Session 8.
