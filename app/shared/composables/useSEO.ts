/**
 * SEO options for page-level metadata.
 */
export interface SEOOptions {
  title?: string
  description?: string
  canonicalPath?: string
  image?: string
  type?: 'website' | 'article' | 'profile'
  robots?: 'index,follow' | 'index,nofollow' | 'noindex,nofollow'
}

export interface JobSEOInput {
  id: string | number
  slug?: string
  title: string
  companyName: string
  location: string
  salary?: string
  summary?: string
}

const DEFAULT_ROBOTS: SEOOptions['robots'] = 'index,follow'

const trimSlash = (value: string): string => value.replace(/\/$/, '')

const resolveSiteUrl = (): string => {
  const runtime = useRuntimeConfig()
  const siteUrl = runtime.public.siteUrl as string | undefined
  const apiBase = runtime.public.apiBase as string | undefined

  if (siteUrl && siteUrl.trim().length > 0) {
    return trimSlash(siteUrl)
  }

  if (apiBase && apiBase.trim().length > 0) {
    return trimSlash(apiBase.replace(/\/api\/?$/, ''))
  }

  return 'https://rizqak.com'
}

const toAbsoluteUrl = (siteUrl: string, pathOrUrl: string): string => {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl
  }

  const normalizedPath = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`
  return `${siteUrl}${normalizedPath}`
}

/**
 * Strip locale prefix from a path (e.g. /en/jobs/1 → /jobs/1, /ar/jobs/1 → /jobs/1).
 * Arabic is the default locale and has no prefix, so we only strip /en.
 */
const stripLocalePrefix = (path: string): string => {
  return path.replace(/^\/en(\/|$)/, (_, sep) => sep || '/')
}

/**
 * Apply canonical, social, and robots metadata for the active route.
 */
export const useSEO = (options: SEOOptions = {}): void => {
  const { t, locale } = useI18n()
  const route = useRoute()
  const siteUrl = resolveSiteUrl()

  const title = options.title ?? t('seo.defaultTitle')
  const description = options.description ?? t('seo.defaultDescription')
  const type = options.type ?? 'website'
  const robots = options.robots ?? DEFAULT_ROBOTS

  // Task 1.1 — fully reactive canonical path that updates with locale + route changes
  const canonicalPath = computed(() => {
    if (options.canonicalPath && options.canonicalPath.trim().length > 0) {
      const p = options.canonicalPath.startsWith('/')
        ? options.canonicalPath
        : `/${options.canonicalPath}`
      return stripLocalePrefix(p)
    }
    // route.fullPath may include /en prefix for English; strip it for a locale-neutral canonical
    return stripLocalePrefix(route.path)
  })

  // Canonical: always the Arabic (default) version
  const canonicalUrl = computed(() => `${siteUrl}${canonicalPath.value}`)

  // hreflang ar → default locale path (no prefix)
  const arUrl = computed(() => `${siteUrl}${canonicalPath.value}`)

  // hreflang en → /en prefix
  const enUrl = computed(() => {
    const base = canonicalPath.value === '/' ? '' : canonicalPath.value
    return `${siteUrl}/en${base}`
  })

  const imageUrl = options.image
    ? toAbsoluteUrl(siteUrl, options.image)
    : `${siteUrl}/og-image.png`

  // Task 2.1 — og:locale and og:locale:alternate
  const ogLocale = computed(() => locale.value === 'ar' ? 'ar_EG' : 'en_US')
  const ogLocaleAlternate = computed(() => locale.value === 'ar' ? 'en_US' : 'ar_EG')

  useHead({
    link: computed(() => [
      { rel: 'canonical', href: canonicalUrl.value },
      { rel: 'alternate', href: arUrl.value, hreflang: 'ar' },
      { rel: 'alternate', href: enUrl.value, hreflang: 'en' },
      // Task 2.2 — x-default always points to the AR (default) canonical, not repeated per locale
      { rel: 'alternate', href: arUrl.value, hreflang: 'x-default' },
    ]),
  })

  useSeoMeta({
    title,
    description,
    robots,
    ogTitle: title,
    ogDescription: description,
    ogType: type,
    ogUrl: canonicalUrl.value,
    ogImage: imageUrl,
    ogLocale: ogLocale.value,
    // Task 2.1 — og:locale:alternate for the other language
    ogLocaleAlternate: ogLocaleAlternate.value,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: imageUrl,
  })
}

/**
 * Generate SEO metadata for job detail-like content.
 */
export const useJobSEO = (job: JobSEOInput): void => {
  const { t } = useI18n()
  const path = job.slug ? `/jobs/${job.slug}` : `/jobs/${job.id}`

  const descriptionParts = [
    `${job.title} ${t('seo.jobAt')} ${job.companyName}`,
    `${t('seo.jobLocation')}: ${job.location}`,
  ]

  if (job.salary) {
    descriptionParts.push(`${t('seo.jobSalary')}: ${job.salary}`)
  }

  if (job.summary) {
    descriptionParts.push(job.summary)
  }

  useSEO({
    title: `${job.title} | ${job.companyName}`,
    description: descriptionParts.join(' - '),
    canonicalPath: path,
    type: 'article',
  })
}
