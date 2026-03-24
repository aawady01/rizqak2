# Technology Stack — Complete Reference

## Quick Summary Table

| Layer            | Technology     | Version               | Status            |
| ---------------- | -------------- | --------------------- | ----------------- |
| Backend Runtime  | Rust           | Edition 2024 (stable) | ✅ Scaffolded     |
| Web Framework    | Axum           | 0.8                   | ✅ Scaffolded     |
| Database         | PostgreSQL     | 16 (Alpine)           | ✅ Schema written |
| ORM/Query        | SQLx           | 0.8                   | ✅ Scaffolded     |
| Cache            | Redis          | 7 (Alpine)            | ⚪ Stub only      |
| Frontend         | Nuxt 4         | 4.3.1                 | ✅ Scaffolded     |
| Containerization | Docker Compose | -                     | ✅ Configured     |

---

## Backend Stack (Detailed)

### Rust

- **Edition**: 2021
- **Toolchain**: stable
- **Why Rust**: Type safety eliminates entire classes of bugs. Zero-cost abstractions for performance. Strong async ecosystem. Rust's ownership model prevents data races in concurrent HTTP handling. The ecosystem has mature web frameworks (Axum) and database libraries (SQLx).

### Axum (`axum = "0.8"`)

- **Features enabled**: `macros`
- **Why chosen over Actix-web**: Axum is built on Tower and Hyper (the Rust HTTP standard). It has better composability via Tower middleware, more ergonomic extractors, and is maintained by the Tokio team. Actix-web has its own runtime and ecosystem which adds fragmentation.
- **Key features used**: Router, extractors (Json, Path, Query), State, middleware layers, Extension
- **Official docs**: https://docs.rs/axum

### Axum-Extra (`axum-extra = "0.10"`)

- **Features enabled**: `typed-header`
- **Purpose**: Typed HTTP headers for auth token extraction
- **Used for**: `TypedHeader` extractor for Authorization bearer tokens

### Tower (`tower = "0.5"`)

- **Features enabled**: `full`
- **Purpose**: Middleware framework. Axum is built on Tower.
- **Used for**: Service composition, middleware layers

### Tower-HTTP (`tower-http = "0.6"`)

- **Features enabled**: `cors`, `trace`, `request-id`, `util`, `set-header`
- **Purpose**: Pre-built HTTP middleware
- **Used for**: CORS policy, request tracing, request ID generation, security headers

### SQLx (`sqlx = "0.8"`)

- **Features enabled**: `runtime-tokio-rustls`, `postgres`, `uuid`, `chrono`, `migrate`
- **Why chosen over Diesel**: SQLx is async-native and uses raw SQL instead of a DSL. This gives full control over queries (critical for Arabic full-text search and PostgreSQL-specific features). SQLx also supports compile-time query checking.
- **Compile-time checking**: Disabled for now (requires running DB). Will enable in CI.
- **Migration tool**: SQLx CLI (`sqlx migrate run`)

### Serde (`serde = "1"`)

- **Features enabled**: `derive`
- **Purpose**: Serialization/deserialization framework
- **Used for**: JSON request/response bodies, config parsing

### Serde JSON (`serde_json = "1"`)

- **Purpose**: JSON serialization
- **Used for**: API response bodies, error formatting

### UUID (`uuid = "1"`)

- **Features enabled**: `v4`, `v7`, `serde`
- **Purpose**: Unique identifier generation
- **Design choice**: UUIDv7 for primary keys (time-ordered for DB indexing performance). UUIDv4 for refresh tokens (random for security).

### Chrono (`chrono = "0.4"`)

- **Features enabled**: `serde`
- **Purpose**: Date/time handling
- **Used for**: Timestamps on all entities, JWT expiry calculations

### Thiserror (`thiserror = "2"`)

- **Purpose**: Derive macro for custom error types
- **Used for**: `AppError` enum in `crates/core/src/error.rs`

### Anyhow (`anyhow = "1"`)

- **Purpose**: Ergonomic error handling for application code
- **Used for**: Main function and config loading error chains

### Async-Trait (`async-trait = "0.1"`)

- **Purpose**: Allow async functions in traits (needed until Rust stabilizes async trait methods)
- **Used for**: All repository trait definitions in `crates/domain/`

### JSON Web Token (`jsonwebtoken = "9"`)

- **Purpose**: JWT creation and validation
- **Used for**: Access tokens (15min) and refresh tokens (7 days)
- **Algorithm**: HS256

### Argon2 (`argon2 = "0.5"`)

- **Purpose**: Password hashing
- **Why chosen**: Winner of the Password Hashing Competition. Memory-hard algorithm that resists GPU/ASIC attacks. Uses Argon2id variant (hybrid of Argon2i and Argon2d).

### Validator (`validator = "0.19"`)

- **Features enabled**: `derive`
- **Purpose**: Request validation
- **Used for**: Email format, string length, phone format validation on DTOs

### Tracing (`tracing = "0.1"`)

- **Purpose**: Structured logging framework
- **Used for**: Request tracing, error logging, performance monitoring

### Tracing-Subscriber (`tracing-subscriber = "0.3"`)

- **Features enabled**: `env-filter`, `json`
- **Purpose**: Log output configuration
- **Used for**: JSON-formatted logs, environment-based log level filtering (`RUST_LOG`)

### Dotenvy (`dotenvy = "0.15"`)

- **Purpose**: Load `.env` files into environment variables
- **Used for**: Local development configuration

### Tower-Governor (`tower-governor = "0.5"`)

- **Purpose**: Rate limiting middleware
- **Status**: Dependency declared, not yet wired up
- **Planned use**: API endpoint rate limiting

### ts-rs (`ts-rs = "10"`)

- **Features enabled**: `uuid-impl`, `chrono-impl`, `serde-json-impl`
- **Purpose**: Generate TypeScript type definitions from Rust structs
- **Used for**: Keeping frontend types in sync with backend DTOs
- **Generation**: `cargo test` outputs `.ts` files

### Lettre (`lettre = "0.11"`)

- **Features enabled**: `tokio1-rustls-tls`, `builder`, `smtp-transport` (default-features disabled)
- **Purpose**: Email sending via SMTP
- **Status**: Stub implementation only
- **Note**: `default-features = false` required to avoid native-tls conflict with rustls

### Slug (`slug = "0.1"`)

- **Purpose**: URL-friendly slug generation from text
- **Used for**: Job and company URL slugs

---

## Database Stack (Detailed)

### PostgreSQL 16

- **Docker image**: `postgres:16-alpine`
- **Default port**: 5432
- **Default credentials**: user=rizqak, password=secret, db=rizqak

### Extensions Used

| Extension   | Purpose                                    | Enabled In                  |
| ----------- | ------------------------------------------ | --------------------------- |
| `uuid-ossp` | UUID generation functions                  | 00001_create_extensions.sql |
| `pgcrypto`  | Cryptographic functions (gen_random_uuid)  | 00001_create_extensions.sql |
| `pg_trgm`   | Trigram fuzzy text search (Arabic search)  | 00001_create_extensions.sql |
| `unaccent`  | Remove diacritics for search normalization | 00001_create_extensions.sql |

### Connection Pooling

- Library: SQLx built-in pool
- Max connections: 10 (configurable via `DB_MAX_CONNECTIONS`)
- Auto-migration: Runs on startup via `sqlx::migrate!("../../migrations")`

---

## Cache Stack

### Redis 7

- **Docker image**: `redis:7-alpine`
- **Default port**: 6379
- **Status**: Docker service configured, Rust stub implementation only
- **Planned use**: Session cache, rate limiting state, job listing cache

---

## DevOps Stack

### Docker Compose

- **Services**: PostgreSQL 16, Redis 7
- **Volumes**: `pgdata` (persistent DB), `redisdata` (persistent cache)
- **Health checks**: Configured for both services

### Makefile

- Common dev shortcuts: `make dev`, `make check`, `make migrate`, `make test`

---

## Frontend Stack (Planned)

### Nuxt 4

- **Version**: 4.3.1 (Latest stable)
- **Why chosen**: Robust Vue.js framework with excellent SSR support, critical for SEO. Strong collaborative ecosystem and excellent RTL layout support for Arabic content.

### Core Ecosystem (Updated March 2026)

| Dependency     | Version | Purpose                     |
| -------------- | ------- | --------------------------- |
| Vue            | 3.5.29  | Core framework              |
| TypeScript     | 5.9.3   | Static typing & performance |
| Pinia          | 3.0.4   | State management            |
| Vite           | 7.3.1   | Build tool                  |
| Lucide Vue     | 0.577.0 | Icons                       |
| Tailwind Forms | 0.5.11  | Form reset/styling          |

### Styling

- **Approach**: Vanilla CSS with Tailwind CSS v4 custom properties (design tokens)
- **Font**: Cairo (Google Fonts) — Arabic-optimized
- **Direction**: RTL throughout

---

## Dependency Update Policy

- Check for security updates: Weekly
- Major version upgrades: Evaluate quarterly
- Pin exact versions in `Cargo.lock` (committed to repo)
- Test full workspace (`cargo check && cargo test`) before any upgrade

## Last Updated

2026-02-27 — Versions verified and updated to latest (Vue 3.5.29).
