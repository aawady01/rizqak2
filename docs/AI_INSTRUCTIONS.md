# AI Instructions for Rizqak Project

> ⚠️ MANDATORY: Read `docs/DESIGN_SYSTEM.md` before making ANY changes to this project.

## Overview

Rizqak (رزقك) is an Egyptian job portal website built with:
- **Framework**: Nuxt 4.3.1 + Vue 3.5.29
- **Styling**: Tailwind CSS 4.2.1
- **Language**: Arabic (RTL-first)
- **State**: Pinia

---

## MANDATORY RULES

### Rule 1: Read Documentation First
Before making ANY change:
1. Read `docs/DESIGN_SYSTEM.md` - understand all tokens, colors, typography
2. Read `docs/ARCHITECTURE.md` - understand the project structure
3. Read existing components to understand patterns
4. Check `app/assets/css/main.css` for all design tokens

### Rule 2: Design System Compliance
- **NEVER** hardcode color values - always use design tokens
- **NEVER** hardcode font sizes - use `ds-*` typography classes
- **NEVER** hardcode spacing - use semantic spacing tokens
- **NEVER** change border radius - all is 0 (sharp corners)
- **ALWAYS** use logical CSS properties for RTL (`margin-inline-start`, not `margin-left`)

### Rule 3: Visual Consistency
- The Homepage is the **only** source of truth for visual design
- If creating a new page, use EXACT same colors, fonts, spacing as homepage
- Do NOT add new colors - use existing palette only
- Do NOT add new font sizes - use existing scale only

### Rule 4: Arabic & RTL
- All content is Arabic first
- Use `dir="rtl"` on `<html>` element
- Use logical CSS properties throughout
- Test all directional icons in RTL mode

### Rule 5: TypeScript
- Always use strict TypeScript
- Never use `any` type
- Define interfaces for all props and data
- Use proper union types when needed

### Rule 6: SEO
- Always add meta tags using `useSeoMeta()`
- Add structured data using `useJsonLd()` for relevant pages
- Use semantic HTML elements
- Ensure proper heading hierarchy (one h1 per page)

---

## Technology Versions (DO NOT CHANGE)

| Technology | Version | Notes |
|------------|---------|-------|
| Nuxt | 4.3.1 | Latest stable |
| Vue | 3.5.29 | Use Composition API |
| Tailwind CSS | 4.2.1 | Use @theme directive |
| Pinia | 2.x | State management |
| TypeScript | 5.x | Strict mode |

---

## Component Patterns

### Creating New Components
```vue
<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title: string
  variant?: 'default' | 'primary' | 'secondary'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
})

const classes = computed(() => {
  // Use design tokens, not hardcoded values
  return `bg-primary-700 text-white` // ✅
  // return '#1B6B4A' // ❌ NEVER hardcode
})
</script>

<template>
  <div :class="classes">
    {{ title }}
  </div>
</template>
```

### Using Existing Components
```vue
<script setup lang="ts">
import BaseButton from '~/shared/components/base/BaseButton.vue'
import JobCard from '~/components/jobs/JobCard.vue'
</script>

<template>
  <BaseButton variant="default">
    ابحث عن وظيفة
  </BaseButton>
  
  <JobCard :job="jobData" />
</template>
```

---

## Design Tokens Reference

### Colors (Use These)
```
Primary: var(--color-primary-700)     // #1b6b4a
Accent: var(--color-accent-500)       // #e8b931
Background: var(--color-bg-primary)    // #f3f4f6
Surface: var(--color-surface)         // #ffffff
Text: var(--color-text-primary)       // #1a1a1a
Muted: var(--color-text-muted)        // #999999
Border: var(--color-border-default)   // #e2e2e2
```

### Typography (Use These)
```
.text-ds-display  // 36px, bold, tight line-height
.text-ds-title    // 22px, bold
.text-ds-heading  // 17px, semibold
.text-ds-body     // 15px, regular
.text-ds-sm       // 13px, regular
.text-ds-caption  // 12px, medium
.text-ds-xs       // 10px, medium
```

### Spacing (Use These)
```
.p-content    // 16px padding
.p-element    // 12px padding
.p-compact    // 8px padding
.mt-section   // 32px margin
.gap-section  // 32px gap
.gap-element   // 12px gap
.gap-compact   // 8px gap
```

---

## SEO Implementation

### Basic SEO
```typescript
useSeoMeta({
  title: 'Job Title - Rizqak',
  description: 'Arabic job description...',
  ogTitle: 'Job Title',
  ogDescription: '...',
})
```

### Job Posting Schema
```typescript
useJsonLd({
  '@type': 'JobPosting',
  title: job.title,
  description: job.description,
  datePosted: job.datePosted,
  employmentType: 'FULL_TIME',
  // ... more properties
})
```

---

## File Naming Conventions

- **Components**: PascalCase (`JobCard.vue`, `LayoutHeader.vue`)
- **Composables**: camelCase with `use` prefix (`useJobsApi.ts`, `useTheme.ts`)
- **Types**: PascalCase (`Job.ts`, `Company.ts`)
- **Utilities**: camelCase (`tailwind.ts`, `string.ts`)
- **Pages**: kebab-case (`index.vue`, `jobs/[id].vue`)

---

## Folder Structure

```
app/
├── assets/css/main.css    # Design tokens
├── components/
│   ├── base/              # Atomic components (Flag)
│   ├── jobs/              # Job-related components
│   ├── companies/         # Company components
│   ├── home/              # Homepage sections
│   ├── layout/            # Header, Footer
│   └── filters/          # Filter components
├── core/api/              # API clients, SEO
├── shared/
│   ├── components/base/   # Base components (Button, Input, etc.)
│   ├── composables/       # Shared composables
│   ├── types/            # TypeScript types
│   └── utils/            # Utilities
├── pages/                 # Nuxt pages
├── stores/               # Pinia stores
└── app.vue               # Root
```

---

## Common Patterns

### Navigation Links (from LayoutHeader)
```vue
<NuxtLink
  to="/jobs"
  class="px-5 h-full flex items-center hover:bg-white/5"
  active-class="bg-white/10 font-bold"
>
  الوظائف
</NuxtLink>
```

### Card with Hover Indicator (from JobCard)
```vue
<div class="group relative overflow-hidden">
  <!-- Vertical indicator on right -->
  <div class="absolute right-0 top-0 bottom-0 w-[2px] bg-primary opacity-0 group-hover:opacity-100" />
  <!-- Content -->
  <div class="p-content">...</div>
</div>
```

### Dark Mode Toggle
```vue
<script setup>
const isDark = ref(false)
const toggleDark = () => {
  document.documentElement.classList.toggle('dark')
  isDark.value = !isDark.value
}
</script>
```

---

## What NOT To Do

1. ❌ Don't add new colors - use existing palette
2. ❌ Don't change border radius - it's always 0
3. ❌ Don't use English placeholders - use Arabic
4. ❌ Don't use left/right - use start/end
5. ❌ Don't skip SEO meta tags
6. ❌ Don't use inline styles
7. ❌ Don't forget RTL testing
8. ❌ Don't use `any` type in TypeScript

---

## Getting Help

- Design tokens: See `docs/DESIGN_SYSTEM.md`
- Architecture: See `docs/ARCHITECTURE.md`
- Existing components: Check `app/components/` and `app/shared/components/`
- Types: Check `app/shared/types/`

---

## Before Committing

1. ✅ Check design tokens are used (not hardcoded values)
2. ✅ Verify Arabic text is correct
3. ✅ Test RTL layout works
4. ✅ Add SEO meta tags
5. ✅ Add structured data if applicable
6. ✅ Verify TypeScript compiles without errors
7. ✅ Check mobile responsive works
