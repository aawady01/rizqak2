# Complete Folder Structure — Annotated

Every folder and file in this project is listed here with its purpose.

## Root Level

```
/rizqak/
├── Cargo.toml              → Workspace root: defines all crate members + shared dependency versions
├── Cargo.lock              → Pinned dependency versions (auto-generated, committed)
├── docker-compose.yml      → Local dev services: PostgreSQL 16, Redis 7
├── Makefile                → Shortcut commands: make dev, make check, make migrate, make test
├── .env.example            → Documents ALL environment variables with defaults
├── .gitignore              → Git ignore rules for Rust + Node.js monorepo
└── README.md               → Quick start guide [TODO: create]
```

## `/docs/` — Project Documentation

```
docs/
├── 00-PROJECT-OVERVIEW.md     → What the project is, target users, design principles
├── 01-ARCHITECTURE.md         → Hexagonal architecture, layer rules, data flow
├── 02-TECH-STACK.md           → Every dependency with version and reasoning
├── 03-FOLDER-STRUCTURE.md     → THIS FILE — every folder and file explained
├── 04-DATABASE-SCHEMA.md      → Every table, column, index, relationship
├── 05-API-REFERENCE.md        → Every endpoint with request/response format
├── 06-FRONTEND-GUIDE.md       → Components, design system, routing
├── 07-FEATURES.md             → Feature tracker with status per layer
├── 08-ENVIRONMENT-SETUP.md    → How to run the project from zero
├── 09-SECURITY.md             → Auth, hashing, input validation, rate limiting
├── 10-SEO.md                  → SEO architecture, power pages, structured data
├── 11-DEPLOYMENT.md           → Production deployment guide
├── 12-DECISIONS-LOG.md        → WHY every technical decision was made
├── 13-CURRENT-STATUS.md       → ⚠️ READ FIRST — project state snapshot
├── 14-KNOWN-ISSUES.md         → Bugs, limitations, technical debt
├── 15-CHANGELOG.md            → Every change, when, and why
└── module-docs/               → Per-feature deep documentation
    ├── auth.md
    ├── jobs.md
    ├── companies.md
    ├── users.md
    ├── reviews.md
    ├── search-filters.md
    ├── admin.md
    └── seo-pages.md
```

## `/apps/api-server/` — API Server Binary

```
apps/api-server/
├── Cargo.toml              → Dependencies: all internal crates + tokio, axum, tower, tracing, sqlx, dotenvy, anyhow
└── src/
    ├── main.rs             → Entry point: loads .env, inits tracing, creates DB pool, starts Axum server on HOST:PORT
    ├── config.rs           → RizqakConfig struct: parses all env vars with defaults and validation
    ├── app_state.rs        → AppState struct: PgPool + RizqakConfig, shared via Extension(Arc)
    ├── router.rs           → build_router(): composes all feature routers under /api/v1/*, adds CORS + tracing
    ├── middleware/
    │   └── mod.rs          → Middleware module (rate limiting, security headers) [TODO: implement]
    └── extractors/
        ├── mod.rs          → Extractor module index
        └── auth_user.rs    → AuthUser extractor: validates JWT from Authorization header, extracts user_id + role
```

## `/rizqak2/` — Main Frontend (Nuxt 4)

This is the **ACTIVE** frontend project.

```
rizqak2/
├── assets/                 → CSS (design-tokens.css), images, fonts
├── components/             → Vue components
│   ├── base/               → Atomic components (BaseTypography.vue, etc.)
│   ├── companies/          → Company directory components (CompanyCard, CompanyProfileHeader, CompanyProfileTabs, etc.)
│   ├── home/               → Homepage sections (HomeHero, CountryCarousel, etc.)
│   ├── jobs/               → Job-related components (JobCard)
│   ├── ui/                 → Reusable UI primitives (BaseSelect, HierarchicalFilter)
│   ├── filters/            → Sidebar filter implementations (BaseFilterSection, TreeFilterSection, SimpleFilter)
│   └── layout/             → Layout-specific components
├── composables/            → Business logic and state hooks
│   ├── useHomepage.ts      → Main homepage state management
│   └── useHierarchicalFilter.ts → Logic for tree-based filters
├── layouts/                → Page layouts (default.vue)
├── pages/                  → Route-matching views
│   ├── companies/          → Company pages (index.vue, [slug].vue)
│   └── index.vue           → Homepage
├── public/                 → Static assets
├── types/                  → TypeScript interfaces (index.ts)
└── nuxt.config.ts          → Framework configuration
```

## `/crates/core/` — Shared Utilities

```
crates/core/
├── Cargo.toml              → deps: serde, serde_json, uuid, chrono, thiserror, axum, ts-rs, slug
└── src/
    ├── lib.rs              → Re-exports all modules: error, result, pagination, id, datetime, slug
    ├── error.rs            → AppError enum (#[non_exhaustive]): NotFound, Unauthorized, Forbidden, Validation,
    │                         Conflict, Internal. IntoResponse maps to JSON {code, message, details}.
    ├── result.rs           → Type alias: AppResult<T> = Result<T, AppError>
    ├── pagination.rs       → PaginationParams (page, per_page with defaults), PaginationMeta (total, has_next),
    │                         PaginatedResponse<T> (data + meta). TS export for PaginationParams + PaginationMeta.
    ├── id.rs               → typed_id! macro generates UUID wrappers: UserId, JobId, CompanyId, ReviewId,
    │                         CategoryId, OccupationId, CountryId, RegionId, SkillId, ReportId, NotificationId,
    │                         PageId, FaqId, CommentId, ApplicationId. All use UUIDv7 (time-ordered).
    ├── datetime.rs         → Timestamps struct { created_at, updated_at, Option<deleted_at> }, now() helper
    └── slug.rs             → generate_slug(text) and generate_unique_slug(text) with collision suffix
```

## `/crates/domain/` — Business Domain

```
crates/domain/
├── Cargo.toml              → deps: core, serde, uuid, chrono, async-trait
└── src/
    ├── lib.rs              → Re-exports: entities, repositories, value_objects
    ├── entities/
    │   ├── mod.rs          → Module index (15 entity modules)
    │   ├── user.rs         → User (auth: id, email, password_hash, role, status) + UserProfile (name, phone, bio, avatar, gender, nationality, experience)
    │   ├── company.rs      → Company (name, slug, description, license, verification, stats, source_url)
    │   ├── job.rs          → Job (title, slug, company, country, occupation, salary, requirements, benefits, tags, status, source tracking)
    │   ├── review.rs       → Review (company, user, rating, category_ratings, comment, traveled_through, response, votes)
    │   ├── job_comment.rs  → JobComment (job, user, content, parent_id for threading)
    │   ├── occupation.rs   → Occupation (name, category, slug, icon) + OccupationSynonym + OccupationSeoContent
    │   ├── category.rs     → Category (name, slug, icon, description, display_order)
    │   ├── region.rs       → Region (name, slug) — groups countries (e.g., "Gulf", "North Africa")
    │   ├── country.rs      → Country (name, slug, code, flag_emoji, region) + CountrySeoContent (visa info, cost, labor laws)
    │   ├── skill.rs        → Skill (name, slug, category)
    │   ├── report.rs       → Report (polymorphic: target_type + target_id, reporter, reason, status)
    │   ├── notification.rs → Notification (user, kind, title, body, read_at)
    │   ├── saved_job.rs    → SavedJob + JobApplication (user, job, status tracking)
    │   ├── page.rs         → Page (CMS: slug, title, content, meta, published)
    │   └── faq.rs          → Faq (question, answer, category, display_order)
    ├── repositories/
    │   ├── mod.rs          → Module index (9 repository traits)
    │   ├── user_repo.rs    → UserRepo trait: CRUD, find_by_email, list (paginated)
    │   ├── company_repo.rs → CompanyRepo trait: CRUD, find_by_slug, list with filters + sorting
    │   ├── job_repo.rs     → JobRepo trait: CRUD, list with comprehensive JobFilter, search, benefits/requirements/tags, saved jobs, stats
    │   ├── review_repo.rs  → ReviewRepo trait: CRUD, list by company/user, votes, rating distribution, averages
    │   ├── occupation_repo.rs → OccupationRepo trait: list, search by synonym, SEO content CRUD
    │   ├── country_repo.rs → CountryRepo trait: list, by region, SEO content CRUD
    │   ├── report_repo.rs  → ReportRepo trait: create, list pending, resolve
    │   ├── notification_repo.rs → NotificationRepo trait: create, list, mark read, count unread
    │   └── page_repo.rs    → PageRepo trait: CRUD for pages + FAQs
    └── value_objects/
        ├── mod.rs          → Module index
        ├── email.rs        → Email value object with validation
        ├── phone.rs        → Phone value object with Egyptian format validation
        └── money.rs        → Money value object (amount_minor as i64 + currency code, avoids floating point)
```

## `/crates/infrastructure/` — External Service Adapters

```
crates/infrastructure/
├── Cargo.toml              → deps: core, domain, sqlx, lettre, tracing, async-trait, anyhow
└── src/
    ├── lib.rs              → Re-exports: database, cache, storage, email
    ├── database/
    │   ├── mod.rs          → Re-exports connection + repositories
    │   ├── connection.rs   → create_pool(url, max_conn): creates PgPool + runs migrations automatically
    │   └── repositories/
    │       ├── mod.rs      → Re-exports PgUserRepo, PgCompanyRepo, PgJobRepo
    │       ├── pg_user_repo.rs    → PgUserRepo struct: implements UserRepo with todo!() stubs
    │       ├── pg_company_repo.rs → PgCompanyRepo struct: implements CompanyRepo with todo!() stubs
    │       └── pg_job_repo.rs     → PgJobRepo struct: implements JobRepo with todo!() stubs
    ├── cache/
    │   └── mod.rs          → RedisCache stub: get/set/delete with todo!() placeholders
    ├── storage/
    │   └── mod.rs          → FileStorage stub: upload/download/delete with todo!() placeholders
    └── email/
        └── mod.rs          → EmailSender stub: send_email with todo!() placeholder
```

## `/crates/app/` — Application Layer (DTOs + Use Cases)

```
crates/app/
├── Cargo.toml              → deps: core, domain, infrastructure, serde, validator, chrono, uuid, async-trait, ts-rs
└── src/
    ├── lib.rs              → Re-exports: dto, commands, queries
    ├── dto/
    │   ├── mod.rs          → Module index (5 DTO modules)
    │   ├── auth_dto.rs     → RegisterRequest, LoginRequest, AuthResponse, RefreshRequest, TokenPair
    │   ├── job_dto.rs      → CreateJobRequest, UpdateJobRequest, JobResponse, JobListResponse, JobFiltersQuery
    │   ├── company_dto.rs  → CreateCompanyRequest, UpdateCompanyRequest, CompanyResponse, CompanyListResponse
    │   ├── review_dto.rs   → CreateReviewRequest, ReviewResponse, ReviewListResponse, CategoryRatingInput
    │   └── user_dto.rs     → UpdateProfileRequest, UserResponse, UserProfileResponse, ChangePasswordRequest
    ├── commands/
    │   └── mod.rs          → Command handler stubs: create_user, create_job (todo!() placeholders)
    └── queries/
        └── mod.rs          → Query handler stubs: list_jobs, get_job, search_jobs, list_companies (todo!() placeholders)
```

## `/crates/features/` — Feature Crates

```
crates/features/
├── auth/                   → Authentication & authorization
│   ├── Cargo.toml          → deps: core, domain, app, axum, jsonwebtoken, argon2, chrono, uuid, serde, async-trait, tracing, anyhow
│   └── src/
│       ├── lib.rs          → Re-exports: jwt, password, handlers, routes
│       ├── jwt.rs          → create_access_token(), create_refresh_token(), validate_token() using HS256
│       ├── password.rs     → hash_password(), verify_password() using Argon2id
│       ├── handlers.rs     → register(), login(), refresh_token(), me() handlers
│       └── routes.rs       → router(AuthState) → Router: POST /register, /login, /refresh, GET /me
│
├── jobs/                   → Job listings
│   ├── Cargo.toml
│   └── src/
│       ├── lib.rs
│       ├── handlers.rs     → list_jobs, get_job, create_job, update_job, delete_job stubs
│       └── routes.rs       → router() → Router: GET /, /:id, POST /, PUT /:id, DELETE /:id
│
├── companies/              → Company profiles
│   ├── Cargo.toml
│   └── src/
│       ├── lib.rs
│       ├── handlers.rs     → list_companies, get_company, create_company, update_company stubs
│       └── routes.rs       → router() → Router: GET /, /:slug, POST /, PUT /:id
│
├── users/                  → User profiles & accounts
│   ├── Cargo.toml
│   └── src/
│       ├── lib.rs
│       ├── handlers.rs     → get_profile, update_profile, change_password, delete_account stubs
│       └── routes.rs       → router() → Router: GET /profile, PUT /profile, PUT /password, DELETE /account
│
├── admin/                  → Admin dashboard
│   ├── Cargo.toml
│   └── src/
│       ├── lib.rs
│       ├── handlers.rs     → Admin handlers for jobs, companies, users, reports, content management
│       └── routes.rs       → router() → Router: nested routes for /jobs, /companies, /users, /reports, /content
│
├── seo/                    → SEO endpoints
│   ├── Cargo.toml
│   └── src/
│       ├── lib.rs
│       ├── handlers.rs     → sitemap_xml(), robots_txt() handlers
│       └── routes.rs       → router() → Router: GET /sitemap.xml, /robots.txt
│
└── content/                → Static content
    ├── Cargo.toml
    └── src/
        ├── lib.rs
        ├── handlers.rs     → list_occupations, list_countries, get_page, list_faqs stubs
        └── routes.rs       → router() → Router: GET /occupations, /countries, /pages/:slug, /faqs
```

## `/migrations/` — SQL Migration Files

```
migrations/
├── 00001_create_extensions.sql         → Enable uuid-ossp, pgcrypto, pg_trgm, unaccent
├── 00002_create_trigger_function.sql   → shared trigger_set_updated_at() function
├── 00003_create_users.sql              → users + user_profiles tables, enums, triggers
├── 00004_create_regions_countries.sql   → regions + countries tables
├── 00005_create_categories_occupations.sql → categories + occupations + occupation_synonyms tables
├── 00006_create_companies.sql          → companies table with verification + stats
├── 00007_create_jobs.sql               → jobs + job_benefits + job_requirements + job_tags tables
├── 00008_create_reviews.sql            → company_reviews + review_category_ratings + review_votes tables
├── 00009_create_job_comments.sql       → job_comments table (threaded)
├── 00010_create_reports.sql            → reports table (polymorphic target)
├── 00011_create_user_actions.sql       → saved_jobs + job_applications + notifications tables
├── 00012_create_admin_content.sql      → admin_audit_log + pages + faqs tables
├── 00013_create_fulltext_indexes.sql   → Full-text search + trigram indexes for Arabic content
└── 00014_seed_data.sql                 → Initial regions, countries (Gulf+MENA), categories
```

## File Naming Conventions

- **Rust files**: `snake_case.rs`
- **SQL migrations**: `NNNNN_description.sql` (5-digit number prefix)
- **Vue components**: `PascalCase.vue`
- **TypeScript utilities**: `camelCase.ts` (planned)
- **Documentation**: `NN-TITLE.md` (numbered for order)

## Adding New Files

When creating a new file:

1. Add it to this document with purpose and details
2. Add it to the appropriate module doc in `/docs/module-docs/`
3. Update `13-CURRENT-STATUS.md`
4. Update `15-CHANGELOG.md`

## Last Updated

2026-02-14 — Initial creation with complete backend file inventory.
