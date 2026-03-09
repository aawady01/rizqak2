# Development Rules - Rizqak2

## Overview

This document contains the mandatory rules that ALL developers and AI models must follow when working on the Rizqak2 project. These rules are non-negotiable and enforced through code review and automated checks.

---

## RULE 1: Design System Compliance

**All visual design values MUST come from the design system tokens defined in the Tailwind CSS theme configuration.**

- NO component may contain hardcoded color values like `bg-blue-500` or `text-gray-700`
- All colors MUST be referenced through semantic token names (e.g., `bg-primary-700`, `text-neutral-500`)
- All spacing values MUST use the spacing scale
- All font sizes MUST use the typography scale
- All border radius values MUST use the radius scale
- All shadows MUST use the shadow scale

**ZERO exceptions to this rule.**

---

## RULE 2: Component Architecture

**All UI elements MUST be built using the base components from the shared components directory.**

- If a needed component exists in `app/shared/components/`, it MUST be used
- If a needed component does NOT exist, it MUST first be created as a base component with proper props and types
- Feature-specific components go in `app/features/[feature]/components/`
- Pages compose features; features compose base components

**NEVER rebuild a UI primitive that already exists.**

---

## RULE 3: File Organization

**Files MUST be placed in the correct directory according to the architecture:**

| File Type | Location |
|-----------|----------|
| Base components | `app/shared/components/base/` |
| Feature components | `app/features/[feature]/components/` |
| Composables | `app/shared/composables/` or `app/features/[feature]/composables/` |
| Types | `app/shared/types/` or `app/features/[feature]/types/` |
| Pages | `app/pages/` (Nuxt file-based routing) |
| Stores | `app/stores/` |
| Utils | `app/shared/utils/` |
| Layouts | `app/layouts/` |
| Middleware | `app/middleware/` |

---

## RULE 4: TypeScript Strict Mode

**All code MUST be written in TypeScript with strict mode enabled:**

- The `any` type is ABSOLUTELY forbidden
- Every function MUST have typed parameters and return values
- Every component MUST have a typed props interface
- Every composable MUST have typed return values
- Every API response MUST be validated and typed

---

## RULE 5: SEO Compliance

**Every public page MUST have:**

- A unique and descriptive `<title>` tag
- A unique meta description
- Proper Open Graph tags (`og:title`, `og:description`, `og:image`)
- Exactly ONE `<h1>` element
- Proper heading hierarchy (h1 → h2 → h3, etc.)
- Semantic HTML elements
- JSON-LD structured data where applicable

---

## RULE 6: Accessibility Compliance

**Every interactive element MUST be:**

- Keyboard accessible
- Have proper focus indicators
- Have ARIA attributes where needed

**Every form input MUST:**

- Have a proper `<label>` element
- Have proper `for` attribute linking to input

**Color contrast MUST meet WCAG AA standards.**

---

## RULE 7: Responsive Design

**All layouts and components MUST be:**

- Fully responsive from 320px mobile to 2560px desktop
- Use mobile-first approach with base styles for mobile
- Use responsive modifiers (`md:`, `lg:`, `xl:`) for larger screens
- Tested at mobile (375px), tablet (768px), and desktop (1280px+)

---

## RULE 8: RTL Compliance

**All layouts MUST:**

- Use `dir="rtl"` on the HTML element
- Use logical properties (`start`/`end` instead of `left`/`right`)
- Use Tailwind's RTL-safe utilities (`ms-`/`me-`, `ps-`/`pe-`, `start-`/`end-`)
- Have proper text alignment using `text-start` and `text-end`
- Have directionally appropriate icons and arrows

---

## RULE 9: API Integration

**All API calls MUST:**

- Go through the centralized API client in `app/core/api/client.ts`
- Use typed composables for each domain
- Handle errors gracefully with user-friendly Arabic messages
- Use Nuxt's `useFetch` or `useAsyncData` for SSR compatibility
- Have Zod schemas for response validation

**NO component may make direct fetch/axios calls.**

---

## RULE 10: State Management

**Global state MUST be managed through Pinia stores in `app/stores/`.**

- Component local state uses Vue's `ref` and `reactive`
- Shared state between parent/child uses props and emits
- For prop drilling beyond two levels, use provide/inject or stores

---

## RULE 11: Naming Conventions

| File Type | Convention | Example |
|-----------|------------|---------|
| Components | PascalCase | `JobCard.vue` |
| Composables | camelCase with `use` prefix | `useAuth.ts` |
| Utils | camelCase | `formatDate.ts` |
| Types | PascalCase | `JobTypes.ts` |
| Stores | camelCase with `use` prefix | `useAuthStore.ts` |
| Pages | kebab-case (Nuxt routing) | `index.vue`, `job-details.vue` |

---

## RULE 12: Code Quality

- NO duplicated code - extract to composables/utils
- NO commented out code in production
- NO `console.log` statements in production
- Functions should be small and focused
- Components should follow single responsibility principle

---

## RULE 13: Design System Extension Process

**When a new design token or component is needed:**

1. Add the new token to `app/assets/css/main.css` in the `@theme` block
2. Document the new token in `docs/design-system.md`
3. Create the base component if needed
4. THEN use it in feature components or pages

**NEVER add values inline and plan to centralize later. ALWAYS centralize first.**

---

## RULE 14: Completion Checklist

**Before any work is considered complete, verify:**

- [ ] Design system compliance (no hardcoded values)
- [ ] TypeScript strict mode (no `any` types)
- [ ] SEO compliance (proper meta, headings, structured data)
- [ ] Accessibility compliance (keyboard navigation, ARIA, contrast)
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] RTL compliance (proper directional properties)
- [ ] Performance (no unnecessary re-renders)

---

## Enforcement

These rules are enforced through:

1. ESLint configuration with strict rules
2. TypeScript strict mode
3. Code review process
4. Automated tests

Any violation must be fixed before merging.
