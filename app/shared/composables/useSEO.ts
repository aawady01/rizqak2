import { computed } from 'vue'

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

interface JobSEOInput {
  id: string | number
  slug?: string
  title: string
  companyName: string
  location: string
  salary?: string
  summary?: string
}

const DEFAULT_TITLE = 'Rizqak - Jobs in Egypt and Gulf'
const DEFAULT_DESCRIPTION =
  'Rizqak helps job seekers in Egypt discover relevant opportunities in Egypt and Gulf markets.'
const DEFAULT_ROBOTS: SEOOptions['robots'] = 'index,follow'

const resolveSiteUrl = (): string => {
  const runtime = useRuntimeConfig()
  const siteUrl = runtime.public.siteUrl as string | undefined
  const apiBase = runtime.public.apiBase as string | undefined

  if (siteUrl && siteUrl.trim().length > 0) {
    return siteUrl.replace(/\/$/, '')
  }

  if (apiBase && apiBase.trim().length > 0) {
    return apiBase.replace(/\/api\/?$/, '').replace(/\/$/, '')
  }

  return 'https://rizqak.com'
}

/**
 * Apply canonical, social, and robots metadata for the active route.
 */
export const useSEO = (options: SEOOptions = {}): void => {
  const route = useRoute()
  const siteUrl = resolveSiteUrl()

  const title = options.title ?? DEFAULT_TITLE
  const description = options.description ?? DEFAULT_DESCRIPTION
  const type = options.type ?? 'website'
  const robots = options.robots ?? DEFAULT_ROBOTS

  const canonicalPath = computed(() => {
    if (options.canonicalPath && options.canonicalPath.trim().length > 0) {
      return options.canonicalPath.startsWith('/')
        ? options.canonicalPath
        : `/${options.canonicalPath}`
    }

    return route.path
  })

  const canonicalUrl = computed(() => `${siteUrl}${canonicalPath.value}`)
  const imageUrl = options.image ? `${siteUrl}${options.image}` : `${siteUrl}/og-default.png`

  useHead({
    link: [
      { rel: 'canonical', href: canonicalUrl.value },
      { rel: 'alternate', href: canonicalUrl.value, hreflang: 'ar-EG' },
      { rel: 'alternate', href: canonicalUrl.value, hreflang: 'ar' },
      { rel: 'alternate', href: canonicalUrl.value, hreflang: 'x-default' },
    ],
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
  const path = job.slug ? `/jobs/${job.slug}` : `/jobs/${job.id}`

  const descriptionParts = [
    `${job.title} at ${job.companyName}`,
    `Location: ${job.location}`,
  ]

  if (job.salary) {
    descriptionParts.push(`Salary: ${job.salary}`)
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