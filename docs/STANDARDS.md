# Unified Standards Registry — Rizqak2

> This file documents every unified standard adopted during refactoring.
> Any AI agent or developer working on this project MUST follow these standards.
> Each standard specifies: what to use, what was deleted, and how to verify compliance.

---

## 🚨 MANDATORY EXECUTION METHODOLOGY (Non-Negotiable)

> **ANY AI agent MUST follow this methodology for EVERY phase. No exceptions.**
> **Failure to follow this methodology = work is considered INCOMPLETE.**

### Phase Entry Checklist
1. Read `task.md` phase section COMPLETELY — every line, every checkbox
2. Read `implementation_plan.md` phase section COMPLETELY — every instruction
3. Create TodoList entries for EVERY sub-task BEFORE starting
4. Read EVERY file that will be modified BEFORE making any changes

### Execution Protocol
5. Execute ONE checklist item at a time
6. After EACH change: read the modified file to verify the change actually applied
7. Run ALL verification commands specified in the plan (grep, typecheck, etc.)
8. Show actual command results — do NOT assume or skip

### Phase Exit Checklist
9. Compare actual file state vs plan requirements LINE BY LINE
10. Run `pnpm typecheck` and show the result
11. Run ALL conflict greps from the plan and show results
12. Update `docs/STANDARDS.md` with any new standards
13. Update `docs/PHASE_COMPLETION_LOG.md` with checkpoint
14. Update `task.md` with REAL status (based on verification, not assumptions)
15. Write completion report listing: files modified, commands run, results shown

### Forbidden Behaviors
- ❌ Do NOT mark a task as done without running its verification
- ❌ Do NOT assume a change applied — read the file to confirm
- ❌ Do NOT skip grep/verification commands
- ❌ Do NOT proceed to next phase without completing current phase exit checklist
- ❌ Do NOT say "already done" without proof (show file contents or grep results)

---

## Phase 1 — Auto-Import Cleanup

- Standard: Use Nuxt auto-imports for Vue APIs (`ref`, `computed`, `watch`, etc.) and Nuxt component auto-resolution.
- Disallowed: Explicit `import { ... } from 'vue'` in app code and explicit component imports inside Vue SFCs.
- Allowed: Type-only imports and non-component imports (utilities, data, types).
- Verification: Grep `import\s+.*from\s+['"]vue['"]` in `app/` returns zero and no component-path imports remain.

---

## Phase 2 — Theme System Unification

- Standard: `@nuxtjs/color-mode` → `useColorMode()` as the SINGLE dark mode system.
- Disallowed: Custom `useTheme()` composable, manual `localStorage` for theme, manual `classList` manipulation for dark mode.
- Config: `classSuffix: ''`, `preference: 'system'`, `fallback: 'light'`, `storageKey: 'rizqak-color-mode'`
- Tailwind: `dark:` utilities MUST follow the `.dark` class (not `prefers-color-scheme`). Enforced in `app/assets/css/main.css` via `@custom-variant dark (&:where(.dark, .dark *));`
- Browser UI parity: `color-scheme` is set in CSS (`html` = light, `html.dark` = dark) to keep native form controls/scrollbars consistent with the active theme.
- SSR flash prevention: When `preference: 'system'`, any UI that conditionally renders based on `$colorMode` MUST be wrapped in `<ColorScheme>` (preferred) or guarded with `$colorMode.unknown` and a placeholder to avoid SSR hydration flashes.
- Verification (Tailwind): `@custom-variant dark` exists in `app/assets/css/main.css` and compiled CSS no longer contains `@media(prefers-color-scheme:dark){.dark\\:` blocks.
- Verification: Grep `useTheme`, `initTheme`, `classList.*dark` → ZERO. Single localStorage key only.
- To toggle: `colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'`

---

## Phase 3 — VueUse Integration

- Standard: `@vueuse/core` composables for ALL browser API interactions.
- Disallowed: `document.addEventListener`, `document.removeEventListener`, raw `localStorage.getItem/setItem`, `window.matchMedia`, `window.addEventListener('resize'|'scroll'|'keydown')`.
- Mapping:
  - Click outside → `onClickOutside(ref, callback)`
  - Key press → `onKeyStroke(key, callback)`
  - Toggle state → `useToggle(defaultValue)`
  - Scroll lock → `useScrollLock(element, isLocked)`
- Allowed: `localStorage` in auth/client code temporarily (Phase 14 migration to `nuxt-auth-utils`).
- Verification: Grep `document.addEventListener`, `removeEventListener`, `window.matchMedia` → ZERO in app code.

---

## Phase 4 — Font Delivery

- Standard: `@nuxt/fonts` module as sole provider for Cairo font family.
- Disallowed: Manual `dns-prefetch`, `preconnect` links for Google Fonts (Cairo).
- Kept: NONE — no external icon-font stylesheet links (icons are Lucide components).
- Config: `display: 'swap'`, weights 300-800, subsets arabic+latin.
- Verification: Grep `fonts.googleapis.com` in `nuxt.config.ts` returns ZERO.

---

## Phase 5 — Design Token Compliance

- Standard: ALL visual values use semantic design tokens. Zero hardcoded color literals in `.vue` files.
- Disallowed: `bg-white` (opaque), `text-neutral-*`, `bg-neutral-*`, `border-neutral-*`, hardcoded `#hex` values in templates.
- Token mapping:
  - `bg-white` (card/surface context) → `bg-surface`
  - `text-neutral-400` → `text-muted-foreground`
  - `text-neutral-500` → `text-secondary`
  - `text-neutral-600` → `text-secondary`
  - `text-neutral-300` → `text-border`
  - `bg-neutral-50` → `bg-muted`
  - `bg-neutral-100` → `bg-muted`
  - `bg-neutral-300` → `bg-border`
  - `border-neutral-300` → `border-border`
  - `hover:bg-neutral-100/200` → `hover:bg-border`
- Kept: `bg-white/5/10/15/20` opacity variants in shell-context (header/footer/hero) — these map to `--color-shell-surface`.
- Kept: `bg-white` for white dots inside colored backgrounds (checkbox indicators).
- Verification: Grep `bg-white` (without `/`), `text-neutral-`, `bg-neutral-`, `border-neutral-` → ZERO in app components.

---

## Phase 6 — Component Architecture

- Standard: Use `BaseButton` for all action buttons. Use `BaseInput` for all form inputs.
- Disallowed: Raw `<button>` for standard actions, raw `<input>` for form fields.
- Exceptions (raw `<button>` allowed):
  - Shell-context buttons with opacity-based styling (`bg-white/10`, `text-white/90`)
  - Custom dropdown trigger buttons (sort, select)
  - Custom radiogroup replacement buttons (GenderFilter)
  - Custom icon toggle buttons (JobCard save)
  - Base component internals (BaseCheckbox, BaseChip, etc.)
- Class merging: All components accepting `class` prop must use `cn()` from `~/shared/utils/tailwind`.
- Variant pattern: Multi-variant components must use CVA (class-variance-authority).
- Dead UI removal: Non-functional interactive elements (`@click="null"`) must be removed.

---

## Phase 7 — Icon System Rationalization

- Standard: Use `lucide-vue-next` icon components as the SINGLE UI icon system. Do not use Material Symbols (no external icon-font stylesheet, no `material-symbol*` classes).
- Do not use inline `<svg>` icons inside `.vue` templates (use Lucide components instead).
- Icon sizing: Use Tailwind `size-4` (16px), `size-5` (20px), `size-6` (24px). Any CSS token controlling icon size must resolve to one of these values (example: `--filter-tree-disclosure-icon-size: 16px`).
- Accessibility: Treat icons as decorative by default. Add `aria-hidden="true"` to decorative icons. Icon-only buttons must have an accessible name via `aria-label` or `sr-only` text.
- Verification: Grep `material-symbol*`/`Material Symbols` returns ZERO, grep `<svg` in `app/**/*.vue` returns ZERO, grep non-standard icon size patterns returns ZERO, `pnpm typecheck` + `pnpm lint` PASS.

---

## Phase 2 Improvements — Pinia Store Pattern & i18n Text Extraction

- Standard: All Pinia stores MUST use Composition API (setup store pattern) with `defineStore('name', () => { ... })`.
- Disallowed: Options API stores (`state:`, `getters:`, `actions:`).
- Standard: Third-party component plugins (e.g., `vue-sonner` Toaster) MUST be registered via Nuxt plugins in `app/plugins/` to enable template usage without explicit imports.
- Standard: All user-facing Arabic strings in components MUST use `$t()` / `useI18n()`. No hardcoded text in templates or computed properties.
- Verification: Grep Options API patterns (`state:\s*\(`, `getters:`, `actions:`) in `app/stores/` returns ZERO. Grep explicit `Toaster` import outside plugins returns ZERO.

---

## Phase 8 — Data Fetching & State Architecture

- Standard: Use `$fetch()` (ofetch/H3) for ALL API calls in `app/core/api/client.ts`. Raw `fetch()` is disallowed.
- Standard: All domain types MUST live in `app/shared/types/domain.ts`. Data files (`mockData.ts`, etc.) import from domain types and may re-export for backward compatibility.
- Standard: Vue Query plugin (`vue-query.ts`) MUST have production defaults: `staleTime: 5min`, `gcTime: 30min`, `retry: 1`, `refetchOnWindowFocus: false`.
- Disallowed: `fetch()`, `new URL()` for API calls, `response.json()`, manual `Content-Type` header setting.
- Verification: Grep `[^$]fetch\(`, `new Request\(`, `response\.json\(\)` in `app/` returns ZERO.

---

## Phase 9 — Animation & Motion Standardization

- Standard: ALL transition durations MUST use semantic token utilities: `duration-fast` (150ms), `duration-normal` (200ms), `duration-base` (250ms), `duration-slow` (350ms).
- Disallowed: Hardcoded Tailwind duration classes (`duration-150`, `duration-200`, `duration-300`, `duration-500`).
- Mandatory: EVERY `transition-*` class MUST have a `duration-*` class immediately after it. No bare transitions.
- Standard: Skeleton/loading animations MUST use CSS variables (not hardcoded hex colors) for dark mode support.
- Standard: All animation durations MUST use CSS variables from the motion token system.
- Standard: Dynamic lists (job cards, company cards, filter items) MUST use `v-auto-animate` for smooth add/remove animations.
- Standard: `prefers-reduced-motion: reduce` MUST be respected — all animations disabled when user prefers reduced motion.
- Verification: Grep `duration-\d{3}` in `app/**/*.vue` returns ZERO.

---

## Phase 10 — i18n Foundation

- Standard: ALL user-facing text MUST use `$t()` in templates and `t()` from `useI18n()` in scripts. Zero hardcoded Arabic strings in `.vue` files.
- Standard: Data labels (countries, companies, jobs, filters) MUST use i18n keys in data files, resolved via `$t()` in templates.
- Standard: `lang` and `dir` on `<html>` MUST be managed by `@nuxtjs/i18n` module — NEVER hardcoded via `useHead({ htmlAttrs })`.
- Standard: Third-party components accepting `dir` prop (e.g., Toaster) MUST bind to reactive computed from `useI18n()` locale direction.
- Standard: PWA manifest and meta descriptions MUST be in Arabic (primary locale) — update when i18n supports dynamic manifests.
- Disallowed: `useHead({ htmlAttrs: { lang: 'ar', dir: 'rtl' } })` in `app.vue`.
- Disallowed: `htmlAttrs: { lang: 'ar', dir: 'rtl' }` in `nuxt.config.ts` `app.head`.
- Verification: Grep Arabic text in `.vue` templates returns ZERO. Grep `htmlAttrs` in app code returns ZERO.

---

## Phase 12 — Form Handling Standardization

- Standard: ALL forms MUST use `vee-validate` + `@vee-validate/zod` with `toTypedSchema(zodResolver(schema))`.
- Standard: Validation schemas MUST use `zod` with i18n keys as error messages (e.g., `z.string().email('validation.email.invalid')`).
- Standard: ALL error messages in validation MUST reference i18n keys — never hardcoded strings.
- Standard: Forms MUST handle loading/success/error states — loading spinner on submit, server error display, success state.
- Standard: Use `BaseFormField` component for all form fields (Label + Slot + Error message).
- Standard: Use `BaseInput` for text inputs, `BaseButton` for submit buttons.
- Standard: Icon inputs MUST use Lucide icons (Mail, Lock, User, Eye, EyeOff) with `aria-hidden="true"` for decorative icons.
- Standard: Password fields MUST have show/hide toggle.
- Standard: Auth pages MUST use `useAuthStore()` for login/register actions.
- Standard: Page SEO MUST use `useSeoMeta()` with i18n-translated title/description.
- Disallowed: Raw `useForm` without Zod schema, hardcoded validation messages.
- Verification: All forms validate with Zod, error messages display in active locale, loading states work correctly.

---

## Phase 14 — Security Hardening

- Standard: CSP MUST be enforcing (NOT report-only) in production.
- Standard: `'unsafe-eval'` MUST be removed from CSP `script-src` — Vite production builds don't use eval.
- Standard: NO mock fallback auth in stores — errors MUST propagate to UI for user-facing error display.
- Standard: NO `process.env` in client-bundled code (Vue components, composables). Build-time config files (sentry configs) are exempt.
- Standard: `localStorage` for auth tokens is temporary — full migration to HTTP-only cookies via `nuxt-auth-utils` when server auth is implemented.
- Disallowed: `console.warn('API Login failed, using mock data')` and similar mock fallback patterns.
- Disallowed: CSP `Report-Only` mode in production — must be enforcing.
- Verification: Grep `process.env` in `app/` returns ZERO. Grep `mock.*data` in `app/stores/` returns ZERO.

---

## Phase 15 — Performance Optimization

- Standard: ALL `<img>` tags MUST use `<NuxtImg>` from `@nuxt/image` with `alt`, `width`, `height`, and `loading` attributes.
- Standard: `scrollbar-gutter: stable` on `html` to prevent layout shift between pages.
- Standard: Vite `manualChunks` for heavy vendor libraries to enable better caching.
- Standard: Heavy libraries (tiptap, chart.js, leaflet, swiper) MUST use lazy imports if used in components.
- Disallowed: Raw `<img>` tags in app components — use `<NuxtImg>`.
- Verification: Grep `<img ` in `app/**/*.vue` returns ZERO (except NuxtImg).

---

## Standard: State Persistence Protocol

- Before starting any sub-task: Update `task.md` with `[/]` marker.
- After completing any sub-task: Update `task.md` with `[x]` marker.
- After completing each Phase: Write checkpoint in `docs/PHASE_COMPLETION_LOG.md`.
- `task.md` is the single source of truth for current progress.

---

## Standard: Verification Protocol (Per Phase)

### Pre-Flight Checks
1. `pnpm typecheck` — must pass before starting
2. `pnpm lint` — must pass before starting
3. Note current visual state

### Post-Flight Checks
1. `pnpm typecheck` — zero new errors
2. `pnpm lint` — zero new warnings
3. Phase-specific conflict greps — must return ZERO
4. Visual diff: light mode + dark mode

### Phase Completion Gate
- ALL post-flight checks pass
- Phase completion summary in `docs/PHASE_COMPLETION_LOG.md`
- `task.md` updated with `[x]` marks
- Standards documented above

---

## Phase 19 — Logical Properties & Design Token Compliance

**Completed**: 2026-03-15

### Logical CSS Properties

- Standard: ALL CSS layout properties MUST use logical properties for RTL/LTR parity.
- Disallowed: `margin-left`, `margin-right`, `padding-left`, `padding-right`, `left`, `right`, `top`, `bottom` (where logical alternatives exist).
- Required mappings:
  - `margin-left/right: auto` → `margin-inline: auto`
  - `padding-left/right: X` → `padding-inline: X`
  - `margin-top/bottom: X` → `margin-block: X`
  - `padding-top/bottom: X` → `padding-block: X`
- Verification: `grep -E "margin-left|margin-right|padding-left|padding-right" app/assets/css/main.css` returns ZERO.

### Z-Index Token System

- Standard: ALL z-index values MUST use CSS variable tokens defined in `@theme` block.
- Token definitions: `--z-dropdown: 100`, `--z-sticky: 200`, `--z-fixed: 300`, `--z-modal-backdrop: 400`, `--z-modal: 500`, `--z-popover: 600`, `--z-tooltip: 700`, `--z-toast: 800`.
- Usage mapping:
  - Header (sticky): `z-sticky`
  - Modal backdrop: `z-modal-backdrop`
  - Modal content: `z-modal`
  - Dropdown/Select content: `z-popover`
  - Carousel overlays: `z-fixed`
- Disallowed: Arbitrary z-index values (`z-10`, `z-20`, `z-50`) in app components.
- Verification: `grep -E "z-[0-9]+" app/**/*.vue` returns ZERO for modified files.

### Spacing Token System

- Standard: ALL spacing values MUST use semantic tokens or their Tailwind equivalents.
- Token mappings:
  - `p-1` / `py-1` / `px-1` (4px) → `p-compact` / `py-compact` / `px-compact` (where 8px intended) OR keep as `p-1` if 4px is correct
  - `p-2` / `gap-2` (8px) → `p-compact` / `gap-compact`
  - `p-3` / `px-3` / `py-3` (12px) → `p-element` / `px-element` / `py-element`
  - `p-4` / `px-4` (16px) → `p-content` / `px-content`
  - `p-5` (20px) → `p-content` (16px) or `p-6` (24px) based on context
  - `p-6` (24px) → `p-section` or keep as `p-6`
  - `gap-1.5` / `mt-1.5` (6px) → `gap-compact` / `mt-compact` (8px)
  - `py-2.5` (10px) → `py-element` (12px)
  - `px-2.5` (10px) → `px-element` (12px)
- Disallowed: Arbitrary numeric spacing (`p-5`, `gap-1.5`, `py-2.5`, `mt-1.5`) in base components.
- Verification: `grep -E "p-5|gap-1\.5|py-2\.5|mt-1\.5" app/shared/components/base/` returns ZERO.

### Shadow Token Compliance

- Standard: ALL shadow values MUST use semantic tokens: `shadow-xs`, `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`.
- Disallowed: Un-tokenized shadow intensities that don't match component purpose.
- Component mapping:
  - Cards: `shadow-sm` (default), `shadow-md` (elevated)
  - Dropdowns/Selects: `shadow-lg` (NOT `shadow-xl`)
  - Modals/Dialogs: `shadow-lg`
- Headers: `shadow-sm`
- Verification: `grep "shadow-xl" app/shared/components/base/BaseSelect.vue` returns ZERO.

### Job Detail Page Rules

- Standard: Job detail pages MUST use the governed `grid-cols-job-detail` utility for desktop two-column layout in RTL.
- Standard: Sticky rail offsets MUST use `--offset-job-detail-sticky`; do not hardcode `top-*` values inside page templates.
- Standard: Dense fact tables MUST be built from reusable row utilities/classes, not ad-hoc borders and spacing per component.
- Standard: Page-specific action colors are allowed only through named theme tokens added to `app/assets/css/main.css`.
- Disallowed: Freehand layout metrics, inline styles, and arbitrary class values inside `app/pages/jobs/[slug].vue` and `app/components/jobs/detail/*`.
- Verification: job detail templates contain zero `style=` attributes, zero arbitrary color literals, and pass targeted ESLint/typecheck.
