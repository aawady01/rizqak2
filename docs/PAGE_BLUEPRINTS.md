# PAGE BLUEPRINTS — Rizqak2

> كل صفحة جديدة يجب أن تتبع هذه الـ blueprints بالضبط.
> المصادر: DESIGN_LANGUAGE.md + homepage components + design tokens.

---

## 1. JOBS LISTING PAGE

**Route**: `/jobs` (or `/jobs/index`)
**File**: `app/pages/jobs/index.vue`

### 1.1 Purpose
عرض قائمة الوظائف المتاحة مع إمكانية الفلترة والبحث والترتيب.

### 1.2 URL Strategy
- Route: `/jobs`
- Query params: `?field=...&location=...&salary=...&experience=...&gender=...&sort=latest&page=1`
- Slugs: English transliterated (e.g., `/jobs/saudi-electrician-2026`)

### 1.3 Data Source
- Composable: `useJobsApi()` from `app/features/jobs/composables/useJobsApi.ts`
- Mock fallback: `jobsData` from `~/shared/utils/mockData`
- Query params synced via `useRoute().query`
- Filter data: `useFilterData()` from `app/shared/composables/useFilterData.ts`

### 1.4 SSR Strategy
- SSR: disabled (for now, since SSR globally disabled)
- When SSR restored: `swr: 3600` (1 hour cache)

### 1.5 Layout
```
Desktop (lg+):
┌─────────────────────────────────────────────────┐
│ Breadcrumb                                      │
├──────────┬──────────────────────────────────────┤
│ Sidebar  │ Section Header (title + count + sort)│
│ Filters  ├──────────────────────────────────────┤
│          │ JobCard 1                             │
│          │ JobCard 2                             │
│          │ JobCard 3                             │
│          │ ...                                   │
│          ├──────────────────────────────────────┤
│          │ Pagination                            │
└──────────┴──────────────────────────────────────┘

Mobile:
┌─────────────────────────┐
│ Breadcrumb              │
│ [فلتر] button (if any)  │
│ Section Header          │
│ JobCard 1               │
│ JobCard 2               │
│ ...                     │
│ Pagination              │
└─────────────────────────┘
```

### 1.6 Sections & Components

| Section | Component | Notes |
|---------|-----------|-------|
| Breadcrumb | BaseBreadcrumb | [{label: 'الرئيسية', to: '/'}, {label: 'الوظائف'}] |
| Page title | BaseTypography h1 (visible) | "الوظائف المتاحة" — visible on page |
| Sidebar (desktop) | TreeFilterSection + SimpleFilter + GenderFilter | Reuse existing filter components from `app/components/filters/` |
| Section header | flex justify-between + BaseTypography h3 | Title "الوظائف" + job count + sort dropdown |
| Sort dropdown | Reuse HomeJobList sort pattern | Options: الأحدث, الراتب, الأكثر مشاهدة |
| Job list | JobCard (reuse) in space-y-compact | Each card clickable → /jobs/[slug] |
| Pagination | BasePagination (reuse) | |
| Mobile filter | Drawer/modal with filter components | "فلتر" button + BaseBadge for active filter count |

### 1.7 Sidebar Filter Sections (desktop)

```
┌──────────────────────┐
│ الفلاتر        مسح الكل│
├──────────────────────┤
│ مجال العمل           │
│  TreeFilterSection   │
├──────────────────────┤
│ الموقع               │
│  TreeFilterSection   │
├──────────────────────┤
│ الراتب               │
│  SimpleFilter (checkbox) │
├──────────────────────┤
│ الخبرة               │
│  SimpleFilter (checkbox) │
├──────────────────────┤
│ الجنس                │
│  GenderFilter (radio) │
├──────────────────────┤
│ [تطبيق الفلاتر] (N results) │
└──────────────────────┘
```

### 1.8 Heading Structure
```html
<main>
  <h1 class="sr-only">الوظائف المتاحة في رزقك</h1>
  <nav aria-label="breadcrumb">...</nav>
  <section aria-labelledby="jobs-heading">
    <h2 id="jobs-heading">... (section header title)</h2>
    <article><h3>Job title</h3></article>
  </section>
</main>
```

### 1.9 SEO
```typescript
useSEO({
  title: 'الوظائف المتاحة للعمل abroad | رزقك',
  description: 'تصفح آلاف الوظائف المتاحة للعمل في السعودية والإمارات وقطر ودول الخليج من خلال شركات التوظيف المرخصة',
  canonicalUrl: 'https://rizqak.com/jobs'
})
```

**Structured Data**: ItemList of JobPosting
**Breadcrumbs**: JSON-LD BreadcrumbList

### 1.10 States

| State | Component | Display |
|-------|-----------|---------|
| Loading | BaseSkeleton × 5 | Job card placeholders |
| Empty | BaseEmptyState | "لا توجد وظائف تطابق بحثك" + زر مسح الفلاتر |
| Error | BaseErrorState | "حدث خطأ" + زر إعادة المحاولة |
| Data | JobCard list | Cards with pagination |

### 1.11 Responsive

| Breakpoint | Behavior |
|-----------|----------|
| Mobile (<1024px) | Sidebar hidden, "فلتر" button → drawer/modal |
| Desktop (≥1024px) | Sidebar visible, 290-310px fixed width |

### 1.12 Mock Data
Use `jobsData` from `~/shared/utils/mockData`
Pagination: 10 pages (static mock)

---

## 2. JOB DETAIL PAGE

**Route**: `/jobs/[slug]`
**File**: `app/pages/jobs/[slug].vue`

### 2.1 Purpose
عرض تفاصيل وظيفة واحدة مع إمكانية التقديم.

### 2.2 URL Strategy
- Route: `/jobs/[slug]`
- Slug: English transliterated, descriptive (e.g., `/jobs/saudi-electrician-2026`)
- 404 if slug not found

### 2.3 Data Source
- Composable: `useJobsApi()` — `getJob(slug)` or find from `jobsData`
- Mock: Find job by id from `jobsData` in `~/shared/utils/mockData`
- Related jobs: Filter `jobsData` by same country or field, exclude current

### 2.4 SSR Strategy
- When SSR restored: `swr: 3600` — SEO critical for job detail pages

### 2.5 Job Data Fields (from mockData.ts Job interface)
```
id, title (i18n key), hashtag (i18n key), timeAgo (i18n key),
country (i18n key), countryCode, companyName (i18n key), companyLogo,
salary (i18n key), iconName, benefits[{label (i18n key)}], isSaved
```

### 2.6 Layout
```
┌─────────────────────────────────────────────────┐
│ Breadcrumb                                      │
├─────────────────────────────────────────────────┤
│ Job Header (title, company, flag, date)         │
├───────────────────────────┬─────────────────────┤
│ Job Details (main)        │ Sidebar             │
│ - الوصف                    │ - زر التقديم        │
│ - المتطلبات               │ - معلومات الراتب    │
│ - Benefits                │ - معلومات الشركة     │
│ - Skills                  │ - وظائف مشابهة       │
└───────────────────────────┴─────────────────────┘
```

### 2.7 Sections & Components

| Section | Component | Notes |
|---------|-----------|-------|
| Breadcrumb | BaseBreadcrumb | [الرئيسية, الوظائف, عنوان الوظيفة] |
| Job header | BaseTypography h1 + metadata row | Title, company link, flag, date |
| Salary badge | Reuse JobCard salary pattern | text-primary bg-primary/5 border-primary/10 |
| Benefits | Reuse JobCard benefits pattern | px-2.5 py-1 bg-surface-alt tags |
| Description section | BaseTypography h2 + body text | Full job description |
| Requirements section | BaseTypography h2 + ul/li list | Bullet list |
| Skills section | BaseTypography h2 + BaseBadge | Skill tags |
| Apply sidebar (desktop) | BaseCard with BaseButton primary lg | Sticky top-20, full-width button |
| Salary info (sidebar) | BaseTypography | Wallet icon + salary text |
| Company mini card (sidebar) | CompanyCard compact or custom | Logo + name + rating + job count |
| Related jobs section | BaseTypography h2 + JobCard × 3 | Same country or field |
| Save button | Reuse JobCard bookmark pattern | BookmarkCheck/Bookmark lucide icons |

### 2.8 Apply Button Behavior
- Click → Show toast "تم إرسال طلب التقديم بنجاح" (vue-sonner)
- Or redirect to login if not authenticated
- TODO: Connect to actual API when available

### 2.9 Heading Structure
```html
<main>
  <h1>عنوان الوظيفة</h1>
  <section aria-labelledby="description-heading">
    <h2 id="description-heading">وصف الوظيفة</h2>
  </section>
  <section aria-labelledby="requirements-heading">
    <h2 id="requirements-heading">المتطلبات</h2>
  </section>
  <section aria-labelledby="benefits-heading">
    <h2 id="benefits-heading">المزايا</h2>
  </section>
  <section aria-labelledby="related-heading">
    <h2 id="related-heading">وظائف مشابهة</h2>
  </section>
</main>
```

### 2.10 SEO
```typescript
useSEO({
  title: 'وظيفة [Job Title] في [Country] | رزقك',
  description: '[First 150 chars of description]',
  canonicalUrl: 'https://rizqak.com/jobs/[slug]'
})
```

**Structured Data**: JobPosting (full schema with title, description, datePosted, validThrough, hiringOrganization, jobLocation, baseSalary, employmentType, qualifications)

### 2.11 States

| State | Component |
|-------|-----------|
| Loading | BaseSkeleton for header + sidebar + body |
| Error | BaseErrorState with retry |
| 404 | "الوظيفة غير موجودة" + BaseButton للعودة |

### 2.12 Responsive

| Breakpoint | Behavior |
|-----------|----------|
| Mobile | Single column, apply button sticky at bottom |
| Desktop | Sidebar + content, apply button in sidebar |

---

## 3. COMPANIES LISTING PAGE

**Route**: `/companies` (or `/companies/index`)
**File**: `app/pages/companies/index.vue`

### 3.1 Purpose
عرض قائمة شركات التوظيف المرخصة.

### 3.2 URL Strategy
- Route: `/companies`
- Query params: `?search=...&sort=rating&page=1`
- Slugs: English transliterated

### 3.3 Data Source
- Composable: `useCompaniesApi()` from `app/features/companies/composables/useCompaniesApi.ts`
- Mock fallback: `companiesData` from `~/shared/utils/mockData`
- Search: client-side filter on name

### 3.4 SSR Strategy
- When SSR restored: `swr: 3600`

### 3.5 Layout
```
Desktop:
┌─────────────────────────────────────────────────┐
│ Breadcrumb                                      │
│ Section Header (title + count)                  │
├─────────────────────────────────────────────────┤
│ Search + Filter bar (optional)                  │
├─────────────────────────────────────────────────┤
│ CompanyCard │ CompanyCard │ CompanyCard │ Co... │
│ CompanyCard │ CompanyCard │ CompanyCard │ Co... │
│ ...                                             │
├─────────────────────────────────────────────────┤
│ Pagination                                      │
└─────────────────────────────────────────────────┘

Mobile:
┌─────────────────────────┐
│ Breadcrumb              │
│ Section Header          │
│ Search bar              │
│ CompanyCard             │
│ CompanyCard             │
│ Pagination              │
└─────────────────────────┘
```

### 3.6 Sections & Components

| Section | Component | Notes |
|---------|-----------|-------|
| Breadcrumb | BaseBreadcrumb | [الرئيسية, شركات التوظيف] |
| Section header | flex justify-between + BaseTypography h3 | Title + company count |
| Search | BaseSearchInput | Search by company name |
| Company grid | CompanyCard (reuse) | grid-cols-2 md:grid-cols-4 gap-5 |
| Pagination | BasePagination | |

### 3.7 Heading Structure
```html
<main>
  <h1 class="sr-only">شركات التوظيف المرخصة</h1>
  <nav aria-label="breadcrumb">...</nav>
  <section aria-labelledby="companies-heading">
    <h2 id="companies-heading">شركات توظيف مميزة (العدد)</h2>
    <article><h3>Company name</h3></article>
  </section>
</main>
```

### 3.8 SEO
```typescript
useSEO({
  title: 'شركات التوظيف المرخصة | رزقك',
  description: 'قائمة شركات التوظيف المصرية المرخصة للعمل abroad. شركات موثوقة ومختارة بعناية',
  canonicalUrl: 'https://rizqak.com/companies'
})
```

**Structured Data**: ItemList of Organization

### 3.9 States

| State | Component |
|-------|-----------|
| Loading | BaseSkeleton × 8 (2 rows of 4) |
| Empty | BaseEmptyState + "لا توجد شركات" |
| Error | BaseErrorState + retry |
| Data | CompanyCard grid |

### 3.10 Responsive

| Breakpoint | Behavior |
|-----------|----------|
| Mobile | 2 cols, reduced padding |
| Tablet (md) | 4 cols |
| Desktop | 4 cols, same layout |

---

## 4. COMPANY DETAIL PAGE

**Route**: `/companies/[slug]`
**File**: `app/pages/companies/[slug].vue`

### 4.1 Purpose
عرض تفاصيل شركة توظيف مع الوظائف المتاحة منها.

### 4.2 URL Strategy
- Route: `/companies/[slug]`
- Slug: English transliterated
- 404 if slug not found

### 4.3 Data Source
- Composable: `useCompaniesApi()` — `getCompany(slug)`
- Mock: Find company by id from `companiesData`
- Company jobs: Filter `jobsData` by company name

### 4.4 Company Data Fields (from mockData.ts Company interface)
```
id, name (i18n key), logo, iconName, rating, reviewCount, availableJobs
```

### 4.5 SSR Strategy
- When SSR restored: `swr: 3600`

### 4.6 Layout
```
┌─────────────────────────────────────────────────┐
│ Breadcrumb                                      │
├─────────────────────────────────────────────────┤
│ Company Header                                  │
│ - Logo, Name, Rating, Review count              │
│ - Description                                   │
│ - Stats (jobs count, countries, since year)     │
├─────────────────────────────────────────────────┤
│ Company Jobs Section                            │
│ - Section header + count                        │
│ - JobCard list                                  │
│ - Pagination                                    │
└─────────────────────────────────────────────────┘
```

### 4.7 Sections & Components

| Section | Component | Notes |
|---------|-----------|-------|
| Breadcrumb | BaseBreadcrumb | [الرئيسية, شركات التوظيف, اسم الشركة] |
| Company header | BaseImageWithFallback + BaseTypography h1 | Logo, name, rating, description |
| Stats bar | flex + BaseTypography | Jobs count, countries, since year |
| Jobs section | JobCard list | Company-specific jobs |
| Pagination | BasePagination | |

### 4.8 Heading Structure
```html
<main>
  <h1>اسم الشركة</h1>
  <section aria-labelledby="about-heading">
    <h2 id="about-heading">عن الشركة</h2>
  </section>
  <section aria-labelledby="jobs-heading">
    <h2 id="jobs-heading">الوظائف المتاحة (العدد)</h2>
    <article><h3>Job title</h3></article>
  </section>
</main>
```

### 4.9 SEO
```typescript
useSEO({
  title: '[Company Name] - شركات التوظيف | رزقك',
  description: 'تعرف على شركة [Company Name] للتوظيف. [Description excerpt]',
  canonicalUrl: 'https://rizqak.com/companies/[slug]'
})
```

**Structured Data**: Organization or EmploymentAgency schema

### 4.10 States

| State | Component |
|-------|-----------|
| Loading | BaseSkeleton for header + job list |
| Error | BaseErrorState + retry |
| 404 | "الشركة غير موجودة" + BaseButton للعودة |

### 4.11 Responsive

| Breakpoint | Behavior |
|-----------|----------|
| Mobile | Single column, stats stack vertically |
| Desktop | Stats in row, full layout |

---

## SHARED PATTERNS ACROSS ALL PAGES

### Container
```html
<div class="max-w-7xl mx-auto px-6 lg:px-8">
```

### Breadcrumb Pattern
```html
<BaseBreadcrumb :items="[
  { label: $t('nav.home'), to: '/' },
  { label: $t('nav.jobs') } // last item = current page, no 'to'
]" class="mb-content" />
```

### Section Header Pattern
```html
<div class="flex items-center justify-between mb-content">
  <BaseTypography variant="h3" weight="bold" color="text-foreground" class="flex items-center gap-compact">
    <Icon class="w-5 h-5 text-primary" :stroke-width="2" />
    {{ sectionTitle }}
    <span class="text-primary font-bold">({{ count }})</span>
  </BaseTypography>
  <slot name="header-action" />
</div>
```

### Loading State Pattern
```html
<div v-if="isLoading" class="space-y-compact">
  <BaseSkeleton v-for="i in 5" :key="i" class="h-32" />
</div>
<div v-else-if="isError">
  <BaseErrorState @retry="refetch" />
</div>
<div v-else-if="!data?.length">
  <BaseEmptyState />
</div>
<div v-else>
  <!-- Actual content -->
</div>
```

### Mock Data Pattern
```typescript
// In composable or page:
import { jobsData } from '~/shared/utils/mockData'

// TODO: Replace with API data
const data = computed(() => jobsData)
```

### URL Query Params Pattern
```typescript
const route = useRoute()
const router = useRouter()

const currentField = computed(() => route.query.field as string || '')
const currentPage = computed(() => Number(route.query.page) || 1)
const currentSort = computed(() => route.query.sort as string || 'latest')

const updateQuery = (key: string, value: string) => {
  router.push({ query: { ...route.query, [key]: value, page: '1' } })
}
```

### Composable Data Pattern (TanStack Query)
```typescript
// In feature composable:
import { useQuery } from '@tanstack/vue-query'

export function useJobsApi() {
  const jobsQuery = useQuery({
    queryKey: ['jobs'],
    queryFn: () => getJobs(), // or mock data
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  })
  return { jobsQuery }
}

// In page:
const { jobsQuery } = useJobsApi()
const { data, isLoading, isError, refetch } = jobsQuery
```

### i18n Keys Pattern
- All user-facing text via `$t('key')` or `useI18n().t('key')`
- Keys defined in `locales/ar.json`
- Pattern: `section.element` (e.g., `jobList.title`, `sidebar.applyButton`)

### Bookmark Toggle Pattern (reuse from JobCard)
```typescript
const isSaved = ref(false)
const toggleSaved = (e: Event) => {
  e.stopPropagation()
  isSaved.value = !isSaved.value
}
// In template: BookmarkCheck if saved, Bookmark if not
```

---

*Document created: 2026-03-17*
*Next: Phase 5 — Page Implementation (one page at a time)*
