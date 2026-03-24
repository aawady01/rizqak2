# SEO Guide - Rizqak2

## Overview

SEO is critical for Rizqak2 as a job listing platform. This guide covers all SEO requirements and implementations.

---

## SEO Checklist for All Pages

### Required Elements

- [ ] Unique `<title>` tag (60-70 characters max)
- [ ] Unique meta description (150-160 characters max)
- [ ] Canonical URL
- [ ] Open Graph tags (`og:title`, `og:description`, `og:image`)
- [ ] Twitter Card tags
- [ ] Proper heading hierarchy (one H1, H2 follows)
- [ ] Semantic HTML structure
- [ ] JSON-LD structured data (where applicable)

---

## Page-Specific SEO

### Homepage

```typescript
useSeo({
  title: 'وظائف في الخليج - رزقك',
  description: 'ابحث عن أفضل فرص العمل في السعودية والإمارات والكويت وقطر والبحرين وعمان. آلاف الوظائف من أفضل الشركات.',
  ogTitle: 'وظائف في الخليج - رزقك',
  ogDescription: 'ابحث عن أفضل فرص العمل في دول الخليج',
})

useOrganizationSchema()
useBreadcrumbSchema([
  { name: 'الرئيسية', url: '/' },
])
```

### Job Listing Page (`/jobs`)

```typescript
useSeo({
  title: 'وظائف شاغرة - رزقك',
  description: 'تصفح أحدث الوظائف الشاغرة في الخليج. فلتر حسب الموقع والنوع والراتب.',
  ogTitle: 'وظائف شاغرة - رزقك',
})

useBreadcrumbSchema([
  { name: 'الرئيسية', url: '/' },
  { name: 'الوظائف', url: '/jobs' },
])
```

### Job Detail Page (`/jobs/[id]`)

```typescript
useSeo({
  title: `${job.title} - رزقك`,
  description: job.description.substring(0, 160),
  ogTitle: `${job.title} - رزقك`,
  ogDescription: job.description.substring(0, 160),
  ogImage: job.companyLogo,
})

useJobSchema({
  id: job.id,
  title: job.title,
  description: job.description,
  company: {
    name: job.company.name,
    logo: job.company.logo,
  },
  location: job.location,
  salary: job.salary,
  employmentType: job.type,
  datePosted: job.postedAt,
  validThrough: job.expiresAt,
})

useBreadcrumbSchema([
  { name: 'الرئيسية', url: '/' },
  { name: 'الوظائف', url: '/jobs' },
  { name: job.title, url: `/jobs/${job.id}` },
])
```

### Company Profile Page (`/companies/[slug]`)

```typescript
useSeo({
  title: `${company.name} - رزقك`,
  description: company.description,
  ogTitle: `${company.name} - رزقك`,
  ogDescription: company.description,
  ogImage: company.logo,
})

useJsonLd({
  '@type': 'Organization',
  name: company.name,
  url: `https://rizqak.com/companies/${company.slug}`,
  logo: company.logo,
  description: company.description,
  numberOfEmployees: {
    '@type': 'QuantitativeValue',
    minValue: company.minEmployees,
    maxValue: company.maxEmployees,
  },
  areaServed: company.countries,
})

useBreadcrumbSchema([
  { name: 'الرئيسية', url: '/' },
  { name: 'الشركات', url: '/companies' },
  { name: company.name, url: `/companies/${company.slug}` },
])
```

---

## JSON-LD Structured Data

### JobPosting Schema

```typescript
{
  "@context": "https://schema.org",
  "@type": "JobPosting",
  "identifier": "123",
  "title": "مهندس برمجيات senior",
  "description": "وظيفة شاغرة لمهندس برمجيات...",
  "datePosted": "2024-01-15",
  "validThrough": "2024-02-15",
  "employmentType": "FULL_TIME",
  "hiringOrganization": {
    "@type": "Organization",
    "name": "شركة تقنية",
    "logo": "https://rizqak.com/logo.png"
  },
  "jobLocation": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "الرياض",
      "addressCountry": "SA"
    }
  },
  "baseSalary": {
    "@type": "MonetaryAmount",
    "currency": "SAR",
    "value": {
      "@type": "QuantitativeValue",
      "minValue": 15000,
      "maxValue": 25000,
      "unitText": "MONTH"
    }
  }
}
```

### Organization Schema

```typescript
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Rizqak - رزقك",
  "url": "https://rizqak.com",
  "logo": "https://rizqak.com/logo.png",
  "description": "منصة التوظيف العربية الأولى للعمل في الخليج",
  "sameAs": [
    "https://facebook.com/rizqak",
    "https://twitter.com/rizqak",
    "https://linkedin.com/company/rizqak"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+20-xxx-xxxxxxx",
    "contactType": "customer service",
    "availableLanguage": ["Arabic", "English"]
  }
}
```

### BreadcrumbList Schema

```typescript
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "الرئيسية",
      "item": "https://rizqak.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "الوظائف",
      "item": "https://rizqak.com/jobs"
    }
  ]
}
```

---

## Meta Tag Templates

### Default (Homepage)

```html
<title>Rizqak - رزقك | وظائف في الخليج</title>
<meta name="description" content="منصة التوظيف العربية الأولى للعمل في الخليج...">
<meta property="og:title" content="Rizqak - رزقك | وظائف في الخليج">
<meta property="og:description" content="منصة التوظيف العربية الأولى...">
<meta property="og:image" content="https://rizqak.com/og-default.png">
<meta property="og:url" content="https://rizqak.com/">
<meta name="twitter:card" content="summary_large_image">
<link rel="canonical" href="https://rizqak.com/">
```

### Job Detail

```html
<title>مهندس برمجيات - رزقك</title>
<meta name="description" content="وظيفة مهندس برمجيات في شركة...">
<meta property="og:title" content="مهندس برمجيات - رزقك">
<meta property="og:description" content="وظيفة مهندس برمجيات في شركة...">
<meta property="og:image" content="https://rizqak.com/og-job.png">
<meta property="og:url" content="https://rizqak.com/jobs/123">
<meta name="twitter:card" content="summary_large_image">
<link rel="canonical" href="https://rizqak.com/jobs/123">
```

---

## URL Structure

| Page | URL Pattern | Example |
|------|-------------|---------|
| Homepage | `/` | `rizqak.com` |
| Jobs | `/jobs` | `rizqak.com/jobs` |
| Job Detail | `/jobs/[id]` | `rizqak.com/jobs/123` |
| Companies | `/companies` | `rizqak.com/companies` |
| Company Detail | `/companies/[slug]` | `rizqak.com/companies/aramco` |
| Auth Login | `/auth/login` | `rizqak.com/auth/login` |
| Dashboard | `/dashboard` | `rizqak.com/dashboard` |

---

## Internal Linking

- All navigation links must use `<NuxtLink>` for SPA navigation
- Links should use descriptive anchor text in Arabic
- Related jobs should link to each other
- Company pages should link to their job listings
- Breadcrumbs on every page for navigation

---

## Image SEO

- All images must have descriptive `alt` text in Arabic
- Use descriptive filenames: `company-logo-aramco.png`
- Use WebP format for better compression
- Implement lazy loading for below-fold images

---

## Sitemap

Sitemap is auto-generated for all public pages via Nitro. Configure in `nuxt.config.ts`:

```typescript
nitro: {
  prerender: {
    routes: ['/'],
  },
  routeRules: {
    '/jobs/**': { swr: 3600 },
    '/companies/**': { swr: 3600 },
  },
}
```

---

## Performance & SEO

### Core Web Vitals Targets

- **LCP** (Largest Contentful Paint): < 2.5s
- **INP** (Interaction to Next Paint): < 200ms
- **CLS** (Cumulative Layout Shift): < 0.1

### SSR vs CSR

- Public pages (homepage, jobs, companies): Use SSR for SEO
- Dashboard pages: Use CSR (client-side rendering)
- Auth pages: Can use SSR or CSR

---

## Monitoring

Track SEO performance with:

- Google Search Console
- Google Analytics 4
- Lighthouse CI
- Schema Markup Validator
