# Architecture Guide - Rizqak2

## Overview

Rizqak2 follows a modular, feature-based architecture built on Nuxt 4.3.1 with Vue 3.5.28 and Tailwind CSS 4.2.1. The architecture emphasizes separation of concerns, reusability, and maintainability.

---

## Directory Structure

```
rizqak2/
├── app/
│   ├── assets/
│   │   └── css/
│   │       └── main.css              # Tailwind + design tokens
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.vue
│   │   │   └── Footer.vue
│   │   └── jobs/
│   │       └── JobCard.vue
│   ├── core/
│   │   ├── api/
│   │   │   ├── client.ts              # API client
│   │   │   └── seo.ts                 # SEO composables
│   │   └── config/
│   ├── layouts/
│   │   ├── default.vue                 # Public pages
│   │   ├── dashboard.vue              # Dashboard pages
│   │   └── auth.vue                   # Auth pages
│   ├── middleware/
│   │   ├── auth.global.ts             # Auth protection
│   │   └── guest.global.ts            # Guest-only routes
│   ├── pages/
│   │   ├── index.vue                  # Homepage
│   │   ├── jobs/
│   │   │   └── index.vue              # Jobs listing
│   │   ├── companies/
│   │   │   ├── index.vue              # Companies listing
│   │   │   └── [slug].vue             # Company detail
│   │   └── auth/
│   │       ├── login.vue
│   │       └── register.vue
│   ├── stores/
│   │   ├── auth.ts                    # Authentication store
│   │   └── ui.ts                      # UI state store
│   └── public/
│       └── favicon.svg
├── docs/
│   ├── DEVELOPMENT-RULES.md
│   ├── AI-GOVERNANCE.md
│   ├── DESIGN-SYSTEM.md
│   ├── ARCHITECTURE.md
│   └── SEO-GUIDE.md
├── nuxt.config.ts
├── tsconfig.json
└── package.json
```

---

## Layer Architecture

The project follows a layered architecture with strict dependency rules:

```
core ← domain ← infrastructure ← app ← features ← pages
```

### Core Layer (`app/core/`)
- **API client**: Centralized HTTP client with interceptors
- **SEO utilities**: Meta tags, structured data helpers
- **Config**: Application constants

### Shared Layer (`app/shared/`)
- **Components**: Reusable base components
- **Composables**: Shared composition functions
- **Types**: Shared TypeScript interfaces
- **Utils**: Pure utility functions

### Features Layer (`app/features/`)
- Organized by domain (jobs, auth, companies, etc.)
- Contains feature-specific components, composables, and types
- Each feature is self-contained

### Pages Layer (`app/pages/`)
- Nuxt file-based routing
- Composes features into pages
- Handles page-specific logic

---

## Data Flow

### API to Component

```
API Response → Zod Validation → TypeScript Interface → Composable → Component
```

1. **API Client** (`app/core/api/client.ts`): Makes HTTP requests
2. **Zod Schema**: Validates response shape at runtime
3. **TypeScript Interface**: Provides type safety
4. **API Composable**: Wraps API calls with loading/error states
5. **Component**: Uses composable and renders data

### State Management

```
User Action → Component → Store Action → API → Store Update → Component Reactivity
```

1. **Component**: Dispatches store action
2. **Store Action**: Calls API, updates state
3. **API**: Makes HTTP request
4. **Store**: Updates reactive state
5. **Component**: Automatically re-renders

---

## API Integration Pattern

### Creating a New API Composable

```typescript
// app/features/jobs/composables/useJobsApi.ts
import { apiClient } from '~/app/core/api/client'
import { z } from 'zod'

// Define response schema
const JobSchema = z.object({
  id: z.string(),
  title: z.string(),
  company: z.string(),
  location: z.string(),
  salary: z.string().optional(),
})

type Job = z.infer<typeof JobSchema>

// Define API functions
export const useJobsApi = () => {
  const getJobs = async (params: {
    page?: number
    limit?: number
    keyword?: string
  }): Promise<{ jobs: Job[]; total: number }> => {
    const response = await apiClient.get('/jobs', params)
    
    return {
      jobs: z.array(JobSchema).parse(response.jobs),
      total: response.total,
    }
  }

  const getJob = async (id: string): Promise<Job> => {
    const response = await apiClient.get(`/jobs/${id}`)
    return JobSchema.parse(response)
  }

  return {
    getJobs,
    getJob,
  }
}
```

---

## Store Pattern

### Creating a New Store

```typescript
// app/stores/example.ts
import { defineStore } from 'pinia'

interface ExampleState {
  items: string[]
  loading: boolean
}

export const useExampleStore = defineStore('example', {
  state: (): ExampleState => ({
    items: [],
    loading: false,
  }),

  getters: {
    itemCount: (state) => state.items.length,
    isEmpty: (state) => state.items.length === 0,
  },

  actions: {
    async fetchItems() {
      this.loading = true
      try {
        // API call here
        this.items = ['item1', 'item2']
      } finally {
        this.loading = false
      }
    },
  },
})
```

---

## Component Composition

### Page → Feature → Base

```
Page (app/pages/jobs/index.vue)
  ├── JobsFilters (app/features/jobs/components/JobsFilters.vue)
  │   ├── BaseInput (app/shared/components/base/Input.vue)
  │   ├── BaseSelect (app/shared/components/base/Select.vue)
  │   └── BaseButton (app/shared/components/base/Button.vue)
  └── JobCard (app/components/jobs/JobCard.vue)
      └── BaseCard (app/shared/components/base/Card.vue)
```

---

## Routing

### Dynamic Routes

```
pages/jobs/index.vue         → /jobs
pages/jobs/[id].vue          → /jobs/:id
pages/companies/index.vue    → /companies
pages/companies/[slug].vue   → /companies/:slug
```

### Route Middleware

```typescript
// app/middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()
  
  if (!auth.isAuthenticated) {
    return navigateTo('/auth/login')
  }
})
```

Apply middleware in pages:

```typescript
definePageMeta({
  middleware: 'auth',
})
```

---

## SEO Implementation

### Page SEO Setup

```typescript
// In any page component
useSeo({
  title: 'Job Title - Rizqak',
  description: 'Job description...',
  ogTitle: 'Job Title - Rizqak',
  ogDescription: 'Job description...',
})

// For job pages
useJobSchema({
  id: '1',
  title: 'Software Engineer',
  description: 'Job description...',
  company: { name: 'Company Name' },
  location: 'Riyadh, Saudi Arabia',
  datePosted: '2024-01-01',
})
```

---

## Performance Guidelines

### Lazy Loading

```typescript
// Lazy load below-the-fold components
const HeavyComponent = defineAsyncComponent(() => 
  import('~/components/HeavyComponent.vue')
)

// Or use Nuxt's lazy prefix
<LazyHomeFeaturedCompanies />
```

### Image Optimization

Use Nuxt Image for automatic optimization:

```vue
<NuxtImg 
  src="/images/company-logo.png" 
  format="webp"
  sizes="sm:100px md:150px lg:200px"
/>
```

---

## Testing

All components should be tested for:
- Rendering with different props
- Responsive behavior
- Accessibility (keyboard, screen reader)
- RTL layout

---

## Security

- API tokens stored in localStorage (or HttpOnly cookies)
- XSS prevention via Vue's automatic escaping
- CSRF protection via server-side validation
- No sensitive data in client-side code

---

## Conclusion

This architecture ensures:
- **Scalability**: Easy to add new features
- **Maintainability**: Clear separation of concerns
- **Consistency**: Shared components and patterns
- **Performance**: Built-in optimizations
- **SEO**: Server-side rendering with structured data
