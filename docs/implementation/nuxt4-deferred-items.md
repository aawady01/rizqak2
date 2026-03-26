# Nuxt 4 Deferred Items

## Items Requiring Future Attention

---

### Item 1: Vite Version Update

| Attribute | Detail |
|-----------|--------|
| What | Upgrade Vite to 8.x |
| Why Deferred | Nuxt 4.4.2 uses Vite 7.3.1 internally - cannot manually override |
| Risk | HIGH if forced - would break build |
| What Would Be Needed | Wait for Nuxt 4.5+ which will bundle Vite 8 |
| Approval Required | Yes, before attempting any manual Vite upgrade |

---

### Item 2: Nuxt Module Type Definitions

| Attribute | Detail |
|-----------|--------|
| What | linkChecker, ogImage config properties show type errors |
| Why Deferred | Module type definitions not updated in Nuxt 4.4.2 |
| Risk | LOW - likely runtime works, just IDE type checking issue |
| What Would Be Needed | Module maintainers update type definitions |
| Approval Required | No - this is a module ecosystem issue, not project code |

---

### Item 3: E2E Test Suite

| Attribute | Detail |
|-----------|--------|
| What | Write Playwright tests for critical flows |
| Why Deferred | Project is early-stage, no flows fully implemented yet |
| Risk | N/A |
| What Would Be Needed | Complete job search flow, auth flow, user dashboard |
| Approval Required | No - but would improve code quality |

---

### Item 4: Vue Query Integration

| Attribute | Detail |
|-----------|--------|
| What | Actually use @tanstack/vue-query with useQuery/useMutation |
| Why Deferred | Custom apiClient works fine; no caching needs yet |
| Risk | LOW - adding caching infrastructure when not needed is premature |
| What Would Be Needed | App complexity grows to warrant server state caching |
| Approval Required | No - keeping as future-ready foundation |

---

### Item 5: Content Pages Implementation

| Attribute | Detail |
|-----------|--------|
| What | Implement blog/about pages using @nuxt/content |
| Why Deferred | Current MVP is job search, not content site |
| Risk | LOW - delaying non-core feature |
| What Would Be Needed | Marketing decides to add content pages |
| Approval Required | Yes - would require new pages and content |

---

### Item 6: Image Optimization Migration

| Attribute | Detail |
|-----------|--------|
| What | Migrate from raw img tags to NuxtImg |
| Why Deferred | No significant image content yet |
| Risk | LOW - simple find/replace when needed |
| What Would Be Needed | Add multiple images requiring optimization |
| Approval Required | No - but would improve performance |

---

**Date**: 2026-03-26