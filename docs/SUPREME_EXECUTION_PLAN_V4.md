# RIZQAK2 - Supreme Unified AI Execution Constitution v4.0
# Detailed Execution Plan, Governance Map, and Phase Workflow

Date: 2026-03-17
Scope: Entire Rizqak2 repository, all AI agents, all environments
Language: English

This document is the single, explicit, step-by-step plan that operationalizes the Supreme Unified AI Execution Constitution v4.0 for Rizqak2. It must be followed exactly. It exists to prevent chaos in a multi-model AI-built codebase, preserve the homepage as the product's visual DNA, and ensure one canonical source of truth for every concern.

==================================================
SECTION A - AUTHORITY AND CONFLICT RESOLUTION
==================================================

1. Canonical source of truth order when conflicts exist:
1. This document (SUPREME_EXECUTION_PLAN_V4.md) for process and workflow.
2. Repository reality files: `package.json`, `nuxt.config.ts`, `app/assets/css/main.css`, `app/app.vue`.
3. Project tracking files: `task.md`, `AGENTS.md`, `docs/STANDARDS.md`, `docs/CHECKPOINT.md`, `docs/PHASE_COMPLETION_LOG.md`.
4. All other docs.

2. If any instruction conflicts with actual installed versions:
1. Follow `package.json` as the version authority.
2. Document the discrepancy immediately in `docs/AI_WORKLOG.md` or `docs/PHASE_COMPLETION_LOG.md`.
3. Do not use APIs that do not match the installed version.

3. This plan supersedes older prompts or rule documents when they conflict.

==================================================
SECTION B - PRIMARY MISSION
==================================================

Mission statement:
- Stabilize and unify the codebase into one canonical design system and implementation law.
- Prevent architectural drift caused by multiple AI models.
- Preserve the current homepage visual output as the unchanging visual DNA.
- Reduce confusion by eliminating duplicate systems.
- Document every architectural decision so future agents do not reintroduce chaos.

==================================================
SECTION C - PROJECT CONTEXT (FACTUAL REALITY)
==================================================

Project:
- Name: Rizqak2
- Product: Arabic job platform for Egyptians seeking work abroad through Egyptian recruitment agencies.
- Audience: Arabic-speaking users in Egypt.
- Core goal: Discover, browse, filter, compare, and apply for jobs with strong Arabic SEO visibility.

Current realities:
- `srcDir` is `app`.
- Homepage exists and is the visual DNA.
- Arabic-first and RTL-first are mandatory.
- SSR is currently disabled due to an i18n SSR issue.
- Do not change SSR strategy unless explicitly tasked with SSR/SEO infrastructure.
- Brand law: zero-radius (sharp corners) everywhere unless an intentional tokenized exception is documented.
- The repository contains many shared base components and a large token system.
- Your role is to unify, protect, and complete, not to reinvent.
==================================================
SECTION D - EXACT TOOLCHAIN VERSIONS (AUTHORITATIVE)
==================================================

Version authority: `package.json` as of 2026-03-17.

Framework / Runtime:
- nuxt: 4.4.2
- vue: 3.5.30
- vite: 7.3.1
- typescript: 5.9.3
- vitest: 4.1.0
- @playwright/test: 1.58.2

Styling / CSS:
- tailwindcss: 4.2.1
- @tailwindcss/vite: 4.2.1
- @tailwindcss/forms: 0.5.11
- class-variance-authority: 0.7.1
- clsx: 2.1.1
- tailwind-merge: 3.5.0

i18n:
- @nuxtjs/i18n: 10.2.3

State management:
- pinia: 3.0.4
- @pinia/nuxt: 0.11.3

Data fetching / tables / virtualization:
- @tanstack/vue-query: 5.92.9
- @tanstack/vue-table: 8.21.3
- @tanstack/vue-virtual: 3.13.23

Form validation:
- vee-validate: 4.15.1
- @vee-validate/nuxt: 4.15.1
- @vee-validate/zod: 4.15.1
- zod: 4.3.6

UI / interaction:
- reka-ui: 2.9.2
- lucide-vue-next: 0.577.0
- vue-sonner: 2.0.9
- @formkit/auto-animate: 0.9.0

VueUse:
- @vueuse/core: 14.2.1
- @vueuse/integrations: 14.2.1
- @vueuse/nuxt: 14.2.1

SEO / crawlability:
- @nuxtjs/robots: 5.7.1
- @nuxtjs/sitemap: 7.6.0
- nuxt-schema-org: 5.0.10
- nuxt-og-image: 6.0.3
- nuxt-link-checker: 4.3.9

Media / external scripts:
- @nuxt/image: 2.0.0
- @nuxt/scripts: 0.13.2

PWA:
- @vite-pwa/nuxt: 1.1.1

Theme / fonts:
- @nuxtjs/color-mode: 4.0.0
- @nuxt/fonts: 0.14.0

Security / auth:
- nuxt-security: 2.5.1
- nuxt-auth-utils: 0.5.29

Monitoring:
- @sentry/nuxt: 10.43.0

Other:
- date-fns: 4.1.0
- better-sqlite3: 12.8.0
- debug: 4.4.3

Rules:
- Do not upgrade packages.
- Do not downgrade packages.
- Do not replace packages casually.
- Do not add packages unless absolutely necessary and explicitly justified.
- Always use patterns aligned with installed versions.

==================================================
SECTION E - ABSOLUTE NON-NEGOTIABLE LAWS
==================================================

LAW 1 - Never guess.
LAW 2 - Inspect before you touch.
LAW 3 - Preserve the homepage visual output.
LAW 4 - Extract, do not reinvent.
LAW 5 - One canonical way per concern.
LAW 6 - No hardcoded design values in implementation.
LAW 7 - Shared-first implementation.
LAW 8 - No duplicate sources of truth.
LAW 9 - Never delete blindly.
LAW 10 - Touch the smallest safe set of files.
LAW 11 - Document architectural decisions immediately.
LAW 12 - Do not behave like a generic code machine.

==================================================
SECTION F - HOMEPAGE IS SACRED VISUAL DNA
==================================================

Preserve and extract:
- Spacing rhythm
- Typography hierarchy
- Section density
- Card treatment
- Border treatment
- Surface hierarchy
- Shell styling
- Icon sizing
- Button sizing
- Hover/focus/active states
- Filter visuals
- Job card styling
- Company card styling
- Country card styling
- Layout proportions
- Responsive adaptation rules
- Dark mode visual intent
- Loading state visual language
- Empty state visual language
- Error state tone if present
- Metadata row styling
- Shell/container widths
- Hero section visual strategy
- Header/footer visual strategy

Refactor question:
How can I improve the internals while preserving the current user-facing appearance?
==================================================
SECTION G - MANDATORY WORKFLOW (EXECUTION GATES)
==================================================

Pre-Task Gate:
1. Read the instruction/request at least twice.
2. Read `task.md` current phase section fully.
3. Read the relevant phase section in `docs/SUPREME_EXECUTION_PLAN_V4.md` fully.
4. Read `docs/STANDARDS.md` (all applicable standards).
5. Identify all files mentioned or implied.
6. Identify all files that could be affected.
7. List every requirement, constraint, and standard.
8. If unclear, stop and ask the user.
9. Write a summary of task understanding:
- What needs to change
- Files involved
- Standards to follow
- Expected outcome

Project Reality Check:
1. Read every file to be modified (full content).
2. Read every referenced or related file.
3. Read `task.md` and the relevant phase section in `docs/SUPREME_EXECUTION_PLAN_V4.md`.
4. Read `docs/STANDARDS.md` applicable standards.
5. Check `nuxt.config.ts`, `package.json`, and `tsconfig.json` if relevant.
6. Run existing tests/lint/typecheck to know current state.
7. Verify installed versions (from `package.json`).
8. Write a summary of actual current state:
- What exists now in each file
- What is working vs broken
- Which standards exist vs missing
- Current typecheck/lint status
- Versions installed

Research and Best Practices:
1. Search the web for latest best practices for the task.
2. Read official docs for the installed versions.
3. Verify version compatibility.
4. Identify common pitfalls.
5. Identify the modern production-grade approach.
6. Check for breaking changes between installed and latest.
7. Write a research summary:
- Latest recommended approach
- Versions/APIs in use
- Pitfalls to avoid
- Best-practice pattern

Deep Analysis and Logic Check:
1. Ripple effects and potential breakage.
2. Simpler or cleaner alternatives.
3. Edge cases.
4. Conflicts with existing patterns.
5. Abstraction level correctness.
6. SSR/CSR compatibility.
7. RTL/LTR compatibility.
8. Dark/light mode compatibility.
9. Performance implications (Core Web Vitals).
10. Security implications (OWASP).
11. Accessibility implications (WCAG 2.1 AA).
12. SEO implications.
13. Responsive implications (320px, 768px, 1024px, 1280px).
14. Design token compliance.
15. Write analysis summary with:
- Risks and mitigations
- Edge cases and handling
- Compatibility concerns
- Chosen approach and why
- Most relevant skill domains

Execution Gate:
1. Create a detailed step-by-step plan.
2. For each step, specify:
- File to modify
- Exact change (line numbers, old text, new text)
- Verification after change
- Skill domains applied
3. Order steps by risk (least risky first).
4. Identify rollback points.
5. Write the plan in TodoList format.

Per-Line Protocol:
1. Read file and identify exact line numbers.
2. Show current content of those lines.
3. Write planned change (old -> new).
4. Apply change.
5. Read file again to verify.
6. Run typecheck if code change.
7. Only then proceed.

Per-File Protocol:
1. Read file fully.
2. Understand every section.
3. List all changes needed.
4. Make changes one section at a time.
5. After each section, read back and verify.
6. After all, read full file and verify.
7. Run typecheck/lint.
8. Only then mark done.

Per-Phase Protocol:
1. Read `task.md` phase section fully.
2. Read the relevant phase section in `docs/SUPREME_EXECUTION_PLAN_V4.md` fully.
3. Read `docs/CHECKPOINT.md`.
4. Read all files to be modified.
5. Create TodoList with every sub-task.
6. Execute using per-file or per-line protocol.
7. Run all verification commands.
8. Compare results vs requirements.
9. Update documentation.
10. Report to user.

Post-Task Gate:
1. Run `pnpm typecheck` and show full output.
2. Run `pnpm lint` and show full output.
3. Run all conflict greps listed in the plan.
4. Read every modified file one final time.
5. Compare final state vs requirements line by line.
6. Check unintended side effects.
7. Verify all skill standards (pass/fail per skill).
8. Update documentation:
- `task.md`
- `docs/STANDARDS.md` if new standards established
- `docs/PHASE_COMPLETION_LOG.md`
9. Write completion summary:
- Files modified, deleted, created
- Commands run and results
- Verification proof
10. Final report to user:
- What was requested
- What was done
- What was verified
- Standards applied
- Skills applied
- Next step

Stop Rules (User-enforceable):
- If any required read/verification step is skipped, the user can demand a reset.
==================================================
SECTION H - REQUIRED READING ORDER BEFORE BROAD CHANGES
==================================================

Read in this order before broad cleanup or system changes:
1. `nuxt.config.ts`
2. `package.json`
3. `tsconfig.json`
4. `app/assets/css/main.css`
5. `app/app.vue`
6. `app/layouts/default.vue`
7. `app/pages/index.vue`
8. All files in `app/components/home/`
9. All files in `app/components/layout/`
10. All files in `app/components/jobs/`
11. All files in `app/components/companies/`
12. All files in `app/components/filters/`
13. All files in `app/shared/components/base/`
14. All files in `app/shared/composables/`
15. All files in `app/shared/utils/`
16. All files in `app/shared/types/`
17. All files in `app/composables/filters/`
18. `app/core/api/client.ts`
19. `app/stores/auth.ts`
20. `app/stores/ui.ts`
21. All feature composables and schemas in `app/features/*`
22. All plugins in `app/plugins/`
23. Server helpers and routes in `app/server/`
24. i18n config and locale files
25. Public asset locations
26. Root docs and root clutter files
27. Current docs in `docs/`

==================================================
SECTION I - CANONICAL SOURCE-OF-TRUTH POLICY
==================================================

You must choose and document the canonical owner for each major concern:
- Design tokens
- Semantic color rules
- Typography rules
- Spacing rules
- Transition rules
- Z-index rules
- Dark mode rules
- Base UI components
- Section/app-level components
- Feature-local components
- Shared composables
- Feature composables
- Shared utilities
- Shared types
- Feature types
- Validation schemas
- API client
- SEO composable
- Structured data composable
- Public assets
- Locale files
- Icon system
- Image handling
- Animation approach
- Notifications
- Global app state
- Local UI state boundaries
- Layout shell
- Mock data source
- Docs to trust first
- Scripts folder ownership
- Root file hygiene rules

Preferred canonical direction unless repository inspection proves otherwise:
- `app/assets/css/main.css` for tokens.
- `app/shared/components/base/` for base primitives.
- `app/components/` for app-level sections/layout components.
- `app/features/*/components/` for feature-local components only when needed.
- `app/shared/composables/` for shared composables.
- `app/features/*/composables/` for feature/business/data composables.
- `app/shared/utils/` for shared utilities.
- `app/shared/types/` for shared types.
- `app/features/*/schemas/` for validation schemas.
- One single public asset location.
- One single locale file structure.
- One single overlay primitive policy.
- One single image handling policy.
- One single docs handoff policy.

==================================================
SECTION J - REQUIRED EARLY CLEANUP TARGETS
==================================================

Inspect and decide early:
1. `app/components/base` vs `app/shared/components/base`
2. `app/public` vs root `public`
3. Duplicate locale file locations
4. `BaseDialog` vs `BaseModal`
5. Duplicated cards, inputs, buttons, typography helpers
6. Duplicated SEO or structured-data helpers
7. Duplicated image/fallback patterns
8. Duplicated shell/layout wrappers
9. Duplicated root utility scripts
10. Root clutter files
11. Empty feature directories
12. Empty core directories
13. Duplicate docs that say overlapping things
14. Placeholder directories that imply active architecture but are empty
15. Any path likely to confuse another AI model

Output must explicitly state the decision for each.

==================================================
SECTION K - DESIGN SYSTEM LAW
==================================================

The project must operate on one explicit design system derived from the homepage.

Token system must fully cover:

A. Brand palettes:
- Primary scale
- Accent scale
- Neutral scale

B. Semantic colors:
- surface
- surface-alt
- surface-elevated
- foreground
- foreground-muted
- foreground-subtle
- border
- border-strong
- success
- warning
- error
- info
- shell header
- shell footer
- hero background
- hero text
- focus ring (semantic)
- muted interactive states (semantic)

C. Typography:
- Font family
- Display
- h1-h6
- Subtitle large
- Subtitle
- Body large
- Body
- Body small
- Caption
- Label
- Font weights
- Line heights
- Letter spacing (only if needed)

D. Spacing:
- Section spacing
- Content block spacing
- Element spacing
- Compact spacing
- xs/sm/md/lg/xl/2xl/3xl scale if used
- Container horizontal padding
- Grid gaps
- Card internal padding
- Form vertical rhythm

E. Borders / Radius:
- Radius none
- Border widths
- Border emphasis rules
- Focus treatment

F. Shadows:
- low
- medium
- high
- card
- dropdown/popover/modal (if used)

G. Z-index scale:
- dropdown
- sticky
- fixed
- backdrop
- modal
- popover
- tooltip
- toast

H. Transitions:
- fast
- normal
- base
- slow

I. UI states:
- hover
- focus-visible
- active
- selected
- disabled
- loading
- empty
- error
- success
- skeleton
- reduced-motion behavior

J. Dark mode:
- Every semantic token must have a dark-mode strategy.
- Dark mode must not be partial.
- Identify and complete missing dark-mode coverage.
==================================================
SECTION L - TAILWIND CSS V4 POLICY
==================================================

Rules:
- Use CSS-first Tailwind v4 with `@theme` in `app/assets/css/main.css`.
- Use semantic token-based classes.
- Avoid arbitrary values when a token exists.
- If an arbitrary value repeats, promote it to a token.
- Fix token exposure instead of hacks.
- Use `cn()` for class merging.
- Use CVA for component variants.
- Use logical properties for RTL/LTR safety.
- Avoid `left`/`right` when logical equivalents exist.

Never:
- Use `tailwind.config.js` or v3 patterns.
- Hardcode colors.
- Use `!important` to fix design system gaps.
- Concatenate class strings manually.

==================================================
SECTION M - COMPONENT HIERARCHY LAW
==================================================

Level 1 - Tokens:
- `app/assets/css/main.css`

Level 2 - Base UI primitives:
- `app/shared/components/base/`
- Examples: button, card, form controls, label, field wrapper, pagination, skeleton, table primitives, tabs, chips, badges, image wrapper, avatar, modal/dialog, empty/error/loading primitives

Level 3 - App/section components:
- `app/components/`
- Examples: header, footer, home sections, job card, company card, country card, filter sections, section wrappers

Level 4 - Feature-bound components:
- `app/features/*/components/`

Level 5 - Page composition:
- `app/pages/`

Rules:
- Tokens define values.
- Base components standardize primitives.
- Section components organize presentation.
- Feature components isolate feature-specific patterns.
- Pages compose; pages do not reinvent.

==================================================
SECTION N - CANONICAL IMPLEMENTATION RULES
==================================================

Icons:
- Use only `lucide-vue-next`.
- No second icon library.
- No icon fonts.
- No random inline SVG icons in templates.
- Flag SVGs are content assets and may remain exceptions.

Styling:
- Tailwind utilities and semantic tokens only.
- `cn()` for class merging.
- CVA for variant-heavy base primitives.
- Avoid scoped styles unless necessary.
- Avoid inline style attributes for normal UI.
- Centralize complex animation styles if needed.

Forms:
- Use `vee-validate` + `zod` v4.
- Use shared base form components.
- Do not invent a second validation pattern.
- No raw validation logic scattered in pages.

State management:
- Pinia for shared app state.
- Local component state for local concerns.
- VueUse where appropriate.
- No event bus.
- No ad hoc global reactive singletons.

Data fetching:
- Use core API client and feature composables.
- Use TanStack Query for server data caching.
- Do not scatter raw fetch in components.
- Keep mock data centralized and clearly marked.

Images:
- Follow one canonical image pattern.
- Prefer `NuxtImage` with stable sizing to reduce CLS.
- Document exceptions.

Toasts:
- Use `vue-sonner` only.

Animations:
- Simple interactions: Tailwind transitions.
- List movement: auto-animate.
- Respect reduced motion.

Tables and long lists:
- Use TanStack Table when complexity requires.
- Use virtualization when list size justifies it.

Text:
- Arabic-first.
- Crawlable.
- Not hidden in images.
- Not dependent on client-only rendering for critical SEO text.

==================================================
SECTION O - ARABIC-FIRST / RTL-FIRST LAW
==================================================

Rules:
- Arabic-first. Do not spend time on full English parity now.
- Preserve i18n compatibility where needed.
- If duplicate locale structures exist, choose one and migrate.
- Use logical CSS direction patterns.
- Avoid left/right assumptions.
- Ensure RTL and LTR both work in all layouts.
- Ensure icons placement feels natural in RTL.
- Ensure truncation behaves well in Arabic.
- Ensure typography remains readable in Arabic.
- Ensure spacing around Arabic punctuation is clean.
==================================================
SECTION P - ZERO-RADIUS BRAND LAW
==================================================

Zero radius everywhere by default:
- Buttons
- Cards
- Inputs
- Selects
- Textareas
- Chips
- Badges
- Tables
- Image wrappers
- Overlays
- Dropdowns
- Drawers
- Tabs
- Skeletons
- Alerts
- Empty/error states

Exceptions must be:
- Intentional
- Tokenized
- Documented
- Consistently applied

==================================================
SECTION Q - RESPONSIVE SYSTEM LAW
==================================================

Target widths:
- 360px
- 390px / 414px
- 640px
- 768px
- 1024px
- 1280px
- 1536px

Rules:
- Mobile-first.
- No horizontal overflow.
- No layout collapse.
- No unreadably small text.
- No cramped controls.
- No desktop-only assumptions.
- Touch targets >= 44x44 logical pixels.
- Preserve container widths, gutters, and hero scaling.
- Define sidebar collapse, header collapse, footer stacking, form stacking, table fallback, and modal/drawer mobile behavior.

==================================================
SECTION R - ACCESSIBILITY LAW (WCAG 2.1 AA)
==================================================

Required:
- Semantic HTML landmarks.
- Keyboard access for all interactive elements.
- Visible focus states using token `--shadow-focus`.
- `aria-label` or `aria-labelledby` for icon-only controls.
- `aria-expanded` on disclosure triggers.
- `aria-selected` on selectable items.
- `aria-hidden="true"` on decorative icons.
- Roles where semantic HTML is insufficient.
- Contrast ratios >= 4.5:1 (normal) and >= 3:1 (large).
- Touch targets >= 44x44.
- Skip navigation link at top of page.
- Focus trapping in modals/overlays.
- Announce dynamic content changes via `aria-live`.
- Logical tab order.

==================================================
SECTION S - SEO FOUNDATION LAW
==================================================

Rules:
- Do not rush SSR changes during cleanup.
- SEO-ready means semantic HTML, strong headings, crawlable text, internal links.
- Use canonical SEO composable and structured-data composable.
- OG image strategy ready.
- Sitemap and robots compatible.

SEO-critical content:
- Job titles
- Company names
- Country names
- City/location names
- Specializations
- Job descriptions
- Requirements
- Skills
- Salaries
- Benefits
- Timestamps
- Related links
==================================================
SECTION T - PERFORMANCE LAW
==================================================

Core Web Vitals targets:
- LCP <= 2.5s
- FID <= 100ms
- CLS <= 0.1
- INP <= 200ms

Rules:
- Use `defineAsyncComponent()` for heavy components.
- Route-based code splitting (Nuxt default).
- Use `v-memo` for expensive lists.
- Optimize images (`@nuxt/image`, size, lazy).
- Use computed for derived state.
- Debounce expensive operations.
- Use `shallowRef()` for large non-reactive objects.
- Avoid unnecessary re-renders.

==================================================
SECTION U - SECURITY-SAFE FRONTEND LAW
==================================================

Rules:
- No secrets in client bundle.
- Use `runtimeConfig` for secrets.
- HTTP-only cookies for auth tokens.
- CSP with no `unsafe-eval` or `unsafe-inline`.
- Validate inputs in server routes.
- Prevent XSS (`v-html` only with sanitization).
- CSRF protection for state-changing operations.
- Rate limiting on API endpoints.
- Proper CORS configuration.
- Use HTTPS only.

Never:
- Store sensitive data in localStorage.
- Rely solely on client-side validation.
- Use `eval()` or `new Function()`.
- Store passwords as plaintext.

==================================================
SECTION V - CODE QUALITY LAW
==================================================

Vue component requirements:
- `<script setup lang="ts">`
- Typed props and emits
- Nuxt auto-imports (no explicit Vue imports)
- Use shared types when appropriate
- Maintain readable templates
- Avoid giant components
- Avoid meaningless fragmentation

Naming:
- Components: PascalCase
- Composables: camelCase with `use` prefix
- Schemas: `xxxSchema`
- Stores: consistent camelCase
- Utilities: clear and scoped
==================================================
SECTION W - CLEANUP DECISION FRAMEWORK
==================================================

Step 1 - Identify:
- What does it do?
- What concern does it represent?
- Is it active or referenced?
- Is it duplicate?
- Is it placeholder?
- Is it obsolete or misleading?

Step 2 - Classify:
- canonical and healthy
- active but duplicate
- legacy but referenced
- dead code
- placeholder
- ambiguous ownership
- root clutter
- safe to remove now
- risky to remove now
- should be deprecated first

Step 3 - Decide:
- keep as canonical
- migrate into canonical
- deprecate and stop future usage
- archive/move
- remove safely

Step 4 - Validate:
- confirm references
- confirm replacement exists
- confirm imports updated
- confirm runtime safety
- confirm homepage still works

Step 5 - Document:
- what was found
- why confusing
- what became canonical
- what deprecated
- what removed
- rules for future agents

==================================================
SECTION X - REQUIRED DOCUMENTS TO CREATE OR UPDATE
==================================================

1. `docs/SOURCE_OF_TRUTH_MAP.md`
- Canonical owner per major concern
- Deprecated paths
- Notes for future agents

2. `docs/CANONICAL_RULES.md`
- One official way to do each major thing
- Styling, components, forms, data, images, icons, state, SEO, accessibility
- Shared vs local component rules

3. `docs/DESIGN_LANGUAGE.md`
- Homepage-derived visual DNA
- Spacing rhythm, type hierarchy, card patterns, surface hierarchy, button usage
- Shell rules, responsive rules, state rules
- Dark mode intent
- Empty/loading/error language

4. `docs/COMPONENT_REGISTRY.md`
- Reusable components, location, purpose
- When to use / not use
- Base vs app vs feature-local
- Deprecations/replacements

5. `docs/PAGE_BLUEPRINTS.md`
- Blueprint for each page type
- Purpose, user intent, sections, component mapping, heading structure
- SEO intent, internal linking, states, responsiveness, structured-data readiness

6. `docs/CLEANUP_DECISIONS.md`
- Every confusion source found
- Decision taken
- What kept, deprecated, removed
- What must never be reintroduced

7. `docs/AI_WORKLOG.md`
- Date, summary, files touched, validations run, decisions made
- Remaining risks
- Recommended next step
==================================================
SECTION Y - PHASED EXECUTION MODEL (MANDATORY ORDER)
==================================================

PHASE 0A - Deep Discovery and Conflict Inventory
Goal:
- Understand repository deeply before changing architecture.
Tasks:
- Inspect core files and folders.
- Map architecture, patterns, tokens, base components, shared utilities.
- Inventory feature composables, schemas, stores, docs.
- Identify duplicates, dead code, ambiguous ownership, root clutter.
- Identify dark-mode gaps, responsive gaps, SEO-helper ambiguity, image-handling ambiguity.
Deliverables:
- Inspected files list.
- Architecture inventory.
- Current pattern inventory.
- Conflict/duplicate inventory.
- Dead/legacy/placeholder inventory.
- Initial canonical recommendations.
- Risk notes.
Rule:
- No broad cleanup yet, only tiny safe fixes if necessary.

PHASE 0B - Canonical Freeze Plan
Goal:
- Choose and document the official source of truth for each major concern.
Tasks:
- Choose canonical base components location.
- Choose canonical public asset location.
- Choose canonical locale file location.
- Choose canonical modal/dialog policy.
- Choose canonical image handling policy.
- Choose canonical SEO helper path.
- Choose canonical structured-data helper path.
- Choose canonical docs list.
- Choose canonical folder usage rules.
- Choose canonical root hygiene rules.
Deliverables:
- `docs/SOURCE_OF_TRUTH_MAP.md`
- `docs/CANONICAL_RULES.md`
- `docs/CLEANUP_DECISIONS.md` (initial)
- Explicit decisions with reasons.
Rule:
- No new page work before this is clear.

PHASE 0C - Safe Cleanup Execution
Goal:
- Remove or neutralize confusion sources safely.
Tasks:
- Migrate duplicates into canonical path.
- Remove dead code if safe.
- Deprecate risky removals first.
- Reduce root clutter.
- Remove misleading empty folders.
- Fix references after cleanup.
- Preserve homepage visual output.
Deliverables:
- Cleanup summary.
- Files removed/moved/deprecated.
- Updated docs.
- Confirmation of homepage preservation.
Rules:
- Do not delete active code without replacement.
- If uncertain, inspect more.
- If risky, deprecate first.

PHASE 1 - Homepage DNA Extraction
Goal:
- Extract design language without changing visible output.
Tasks:
- Inspect homepage and child components.
- Identify container widths, shell proportions, spacing, card padding, borders.
- Identify title/subtitle patterns, metadata styles.
- Identify button sizes and variants.
- Identify badge/chip usage.
- Identify icon sizes.
- Identify list/grid behavior.
- Identify filter section behavior.
- Identify header/footer behavior.
- Identify hover/focus/active patterns.
- Identify loading/empty patterns.
- Identify dark mode behavior.
- Identify density and breathing room rules.
- Identify responsive transitions per breakpoint.
Deliverables:
- `docs/DESIGN_LANGUAGE.md`
- Extracted visual rule set
- Token gaps list
- Component gaps list
- Implementation inconsistencies list
Rule:
- Do not redesign the homepage.

PHASE 2 - Token System Completion and Unification
Goal:
- Make tokens complete, semantic, dark-mode-aware.
Tasks:
- Audit existing tokens.
- Identify missing semantic tokens.
- Identify repeated arbitrary values.
- Replace raw values with tokens.
- Preserve visual output.
- Complete dark-mode coverage.
- Complete transitions/shadow/z-index/state coverage.
- Support loading/empty/error patterns.
Deliverables:
- Token update summary.
- Raw values replaced list.
- New semantic tokens list.
- Rationale for new tokens.
- Confirmation of unchanged homepage visuals.
PHASE 3 - Base Component Audit and Unification
Goal:
- Ensure base components are canonical, typed, token-driven, accessible, RTL-safe, responsive.
Tasks:
- Audit every base component.
- Ensure typed props/emits.
- Ensure `cn()` usage.
- Ensure CVA for variants.
- Ensure token-only styling.
- Ensure accessibility defaults.
- Ensure RTL safety.
- Identify duplicate primitives.
- Decide single overlay primitive policy.
- Decide if missing primitives are required.
Potential missing primitives to evaluate only if needed:
- Breadcrumb
- Empty state
- Error state
- Inline loader/spinner
- Alert
- Dropdown menu
- Drawer primitive
Deliverables:
- Component audit summary.
- Duplicate primitive resolution summary.
- Missing primitives list (if justified).
- `docs/COMPONENT_REGISTRY.md` updated.

PHASE 4 - Layout Foundation
Goal:
- Canonical and responsive shell/layout system.
Tasks:
- Audit default layout, header, footer, container rules.
- Define contained layout rules.
- Define full-width hero rules.
- Define sidebar/content rules.
- Define narrow-centered auth rules.
- Define detail-page layout rules.
- Ensure mobile menu and overlays consistent.
Deliverables:
- Layout rules summary.
- Responsive shell decisions.
- Touched file list.
- Documentation updates.

PHASE 5 - Page Blueprints Before Implementation
Goal:
- Define page blueprints before building pages.
Blueprints for:
- Homepage
- Jobs listing
- Job detail
- Companies listing
- Company detail
- Search results
- Country landing
- Specialization landing
- Auth pages
- Public info pages if relevant
Each blueprint defines:
- Page purpose
- User intent
- Major sections
- Component mapping
- Heading structure
- SEO intent
- Internal linking intent
- Loading/empty/error states
- Responsive behavior
- Structured data readiness
Deliverable:
- `docs/PAGE_BLUEPRINTS.md`

PHASE 6 - Page Implementation (Scoped Tasks Only)
Rules:
- Reuse homepage design language.
- Reuse tokens and base components.
- Reuse composables and utilities.
- No hardcoded values.
- No new patterns if existing ones exist.
- Arabic-first, RTL-safe, responsive, accessible, SEO-ready, performance-aware.

PHASE 7 - Global Quality Passes
Passes:
- SEO pass
- Responsive edge-case pass
- Accessibility pass
- Performance pass
- Security-safe frontend pass
- Documentation pass
- Dead code pass
- Import hygiene pass
- Dark mode completeness pass
- Interaction state completeness pass
SSR restoration:
- Plan carefully only when in scope.
- Fix i18n SSR issue deliberately.

PHASE 8 - Final Validation
Validate:
- Homepage visual preservation
- Token consistency
- Component consistency
- No duplicate patterns
- No broken references
- No dead imports in touched scope
- Responsive behavior
- Dark mode completeness
- Accessibility baseline
- Semantic structure
- SEO helper consistency
- Type safety
- Lint safety
Run when possible:
- `pnpm typecheck`
- `pnpm lint`
- Build verification if practical (explain if not).
==================================================
SECTION Z - DESIGN MOCKUP IMPLEMENTATION PROTOCOL
==================================================

Step A - Analyze:
- Identify page type.
- Identify layout pattern.
- Identify section structure.
- Identify repeated visual patterns.
- Identify CTA patterns.
- Identify card types.
- Identify form patterns.
- Identify spacing rhythm.
- Identify type hierarchy.
- Identify mobile adaptation.

Step B - Map to Canonical System:
- Map every visual decision to tokens.
- Map repeated patterns to existing components.
- Decide if a new shared component is justified.
- Otherwise keep new code local.

Step C - Plan First:
- State reused components.
- State files to change.
- State new components needed and location.
- Justify why no duplicate pattern is created.

Step D - Implement:
- Build smallest stable pieces.
- Use tokens and canonical components.
- Preserve visual fidelity.
- Keep semantics strong.

Step E - Validate:
- Compare against reference.
- Confirm homepage DNA alignment.
- Confirm responsive behavior.
- Confirm RTL quality.
- Confirm dark mode safety.
- Confirm no hardcoded values.
- Confirm no duplicate system introduced.

==================================================
SECTION AA - SEO-SAFE PAGE DESIGN RULES
==================================================

Do:
- Semantic headings.
- Crawlable visible text.
- Internal links with descriptive text.
- Future-ready breadcrumb structure.
- Future-ready structured data.
- Logical content ordering.

Do not:
- Hide important text in collapsed-only UI.
- Hide essential content inside images.
- Rely on client-only rendering for crucial SEO text.
- Prioritize decorative UI over content architecture.

==================================================
SECTION AB - BEST-PRACTICE FRONTEND DECISION RULES
==================================================

Prefer:
- Semantic tokens over raw values.
- CVA for variant-heavy primitives.
- Computed state over duplicated mutable state.
- Composables for reusable logic.
- Clear separation between primitives and feature logic.
- Centralized search/filter logic when repeated.
- Debounced search where appropriate.
- Virtualization only when justified.
- Predictable data flow and stable naming.

Avoid:
- Overengineering.
- Under-structuring.
- Giant pages or templates.
- Meaningless wrapper components.
- Reactive spaghetti.
- Duplicate transformation logic.
- Logic buried in templates.
- Hidden shortcuts.

==================================================
SECTION AC - THINGS YOU MUST NOT DO
==================================================

Do not:
- Invent a new visual language.
- Redesign the homepage during cleanup.
- Add a second component system.
- Add a second token system.
- Add a second icon library.
- Add a second modal/dialog system.
- Add a second form strategy.
- Add a second data-fetching strategy.
- Add random dependencies.
- Scatter raw fetch logic in components.
- Hardcode design values in page templates.
- Use non-logical directional CSS assumptions.
- Silently move major files without documentation.
- Delete files blindly.
- Leave duplicates active.
- Create local one-off patterns when a shared one exists.
- Create architectural drift without documentation.
- Claim completion without validation.
==================================================
SECTION AD - WHEN TO REMOVE VS DEPRECATE
==================================================

Rules:
- Truly unused and safe: remove.
- Active but replaceable: migrate then remove.
- Active and risky: deprecate and stop future usage.
- Uncertain: inspect more before acting.

Deprecation is acceptable as a transition tool, but must be documented.

==================================================
SECTION AE - MANDATORY CHECKS AFTER EACH TASK
==================================================

Architecture:
- No duplicate pattern introduced.
- Touched files remain canonical.
- Docs updated if architecture changed.

Visual:
- Homepage DNA preserved.
- Output aligns with homepage language.
- Tokens used correctly.
- No random visual hacks.

Responsive:
- Mobile, tablet, desktop, widescreen safe.
- No overflow.
- No broken stacking/collapse behavior.

Dark mode:
- No unreadable surfaces.
- No missing token mapping.
- No raw light colors.
- State colors still make sense.

Accessibility:
- Semantics correct.
- Focus states present.
- Labels/controls correct.
- Keyboard behavior safe.
- Icon accessibility safe.

SEO:
- Heading structure sensible.
- Content crawlable.
- Internal links considered.
- Canonical helper usage aligned.

Quality:
- Types safe.
- Imports valid.
- No dead code left in touched area.
- No abandoned TODOs.

Tools:
- `pnpm typecheck`
- `pnpm lint`

==================================================
SECTION AF - REQUIRED RESPONSE FORMAT FOR EVERY TASK
==================================================

Respond in this exact order:
1. Task understanding
2. Files inspected
3. Current patterns found
4. Duplicate/conflict sources found
5. Canonical decisions
6. Plan
7. Files to change
8. Implementation summary
9. Validation results
10. Cleanup / deprecation / removal results
11. Documentation updates
12. Remaining risks, assumptions, or questions

==================================================
SECTION AG - START-FROM-SCRATCH RULE
==================================================

Always begin with:
- Inspection
- Pattern mapping
- Conflict detection
- Canonical mapping
- Scoped plan

Never jump straight into coding.

==================================================
SECTION AH - SPECIAL PROJECT PRIORITY ORDER
==================================================

Mandatory order:
1. Inspect everything carefully.
2. Identify major confusion sources.
3. Choose one canonical source of truth for each major concern.
4. Document decisions.
5. Execute safe cleanup that reduces ambiguity.
6. Preserve homepage visual output.
7. Extract design language from homepage.
8. Complete and unify token system.
9. Unify and audit shared base components.
10. Define page blueprints.
11. Implement new pages one by one.
12. Perform global quality passes.
13. Carefully plan SSR restoration later, if in scope.

==================================================
SECTION AI - FINAL EXECUTION LAW
==================================================

You are a strict repository guardian:
- Inspect before deciding.
- Preserve before refactoring.
- Unify before expanding.
- Document before handoff.
- Validate before claiming completion.

The homepage is the visual truth.
The canonical docs are the architectural truth.
The token system is the styling truth.
The shared base primitives are the UI truth.
No second truth is allowed.

==================================================
SECTION AJ - DEFAULT STARTING COMMAND FOR ANY NEW MODEL
==================================================

Start with PHASE 0A, PHASE 0B, and PHASE 0C only.
Do not build new pages yet.
Do not redesign anything.
Do not change the user-visible homepage appearance.
First job: inspect repository deeply, identify confusion sources, choose canonical sources of truth, create/update required docs, and execute only safe cleanup that reduces ambiguity for future AI models.

==================================================
SECTION AK - TASK ASSIGNMENT TEMPLATE (USE FOR FUTURE TASKS)
==================================================

==================================================
TASK ASSIGNMENT
==================================================

Target:
[page / component / feature / cleanup area]

Goal:
[design implementation / refactor / cleanup / responsive fix / SEO prep / accessibility fix / performance improvement]

Reference:
[screenshot / image / HTML mockup / detailed visual description]

Scope:
[exact files or folders allowed to change]

Must reuse:
- Homepage design language
- Tokens from `app/assets/css/main.css`
- Shared base components
- Existing composables and utilities
- Existing SEO helpers (where relevant)
- Existing form/data patterns

Must NOT do:
- Do not change visible homepage design
- Do not add new npm packages
- Do not introduce a new pattern if one already exists
- Do not hardcode design values
- Do not modify unrelated files
- Do not create duplicate components or logic
- Do not use inline styles
- Do not use non-logical direction assumptions

Success criteria:
- Visually aligned with homepage language
- Arabic-first
- RTL-safe
- Responsive
- Accessible
- Dark-mode-safe
- SEO-ready where relevant
- Token-driven
- Type-safe
- Lint-safe
- No existing behavior broken

==================================================
SECTION AL - MISSING SYSTEM CONCERNS SAFETY NOTE
==================================================

If you detect a missing system concern such as incomplete dark mode, incomplete loading/empty/error states, incomplete focus-visible states, incomplete responsive behavior, or duplicate/conflicting ownership, explicitly report it and handle it in the correct phase rather than ignoring it.
