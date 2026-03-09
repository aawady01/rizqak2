export interface StructuredDataNode {
  '@context'?: 'https://schema.org'
  '@type': string
  [key: string]: unknown
}

export interface BreadcrumbEntry {
  name: string
  path: string
}

export interface ItemListEntry {
  name: string
  path: string
}

export interface JobPostingStructuredData {
  title: string
  description: string
  datePosted: string
  validThrough?: string
  employmentType?: 'FULL_TIME' | 'PART_TIME' | 'CONTRACTOR' | 'TEMPORARY' | 'INTERN'
  hiringOrganization: {
    name: string
    logo?: string
    sameAs?: string
  }
  jobLocation: {
    addressLocality: string
    addressRegion?: string
    addressCountry: string
  }
  baseSalary?: {
    currency: 'EGP' | 'SAR' | 'AED' | 'USD'
    value: number | string
    unitText: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH' | 'YEAR'
  }
  skills?: string[]
  qualifications?: string[]
  responsibilities?: string[]
  educationRequirements?: string
  experienceRequirements?: string
  industry?: string
  occupationalCategory?: string
  jobBenefits?: string[]
  workHours?: string
  applicantLocationRequirements?: string[]
  path: string
}

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
 * Attach a JSON-LD schema node to the page head.
 */
export const useStructuredData = (schema: StructuredDataNode): void => {
  useHead({
    script: [
      {
        key: `jsonld-${schema['@type']}`,
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          ...schema,
        }),
      },
    ],
  })
}

/**
 * Website schema with search action support.
 */
export const useWebsiteStructuredData = (): void => {
  const siteUrl = resolveSiteUrl()

  useStructuredData({
    '@type': 'WebSite',
    name: 'Rizqak',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/jobs?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  })
}

/**
 * Organization identity schema.
 */
export const useOrganizationStructuredData = (): void => {
  const siteUrl = resolveSiteUrl()

  useStructuredData({
    '@type': 'Organization',
    name: 'Rizqak',
    url: siteUrl,
    logo: `${siteUrl}/favicon.svg`,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'EG',
      addressLocality: 'Cairo',
    },
  })
}

/**
 * JobPosting schema for job detail pages.
 */
export const useJobPostingStructuredData = (job: JobPostingStructuredData): void => {
  const siteUrl = resolveSiteUrl()

  useStructuredData({
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    datePosted: job.datePosted,
    validThrough: job.validThrough,
    employmentType: job.employmentType,
    hiringOrganization: {
      '@type': 'Organization',
      name: job.hiringOrganization.name,
      logo: job.hiringOrganization.logo,
      sameAs: job.hiringOrganization.sameAs,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.jobLocation.addressLocality,
        addressRegion: job.jobLocation.addressRegion,
        addressCountry: job.jobLocation.addressCountry,
      },
    },
    baseSalary: job.baseSalary
      ? {
          '@type': 'MonetaryAmount',
          currency: job.baseSalary.currency,
          value: {
            '@type': 'QuantitativeValue',
            value: job.baseSalary.value,
            unitText: job.baseSalary.unitText,
          },
        }
      : undefined,
    skills: job.skills,
    qualifications: job.qualifications,
    responsibilities: job.responsibilities,
    educationRequirements: job.educationRequirements,
    experienceRequirements: job.experienceRequirements,
    industry: job.industry,
    occupationalCategory: job.occupationalCategory,
    jobBenefits: job.jobBenefits,
    workHours: job.workHours,
    applicantLocationRequirements: job.applicantLocationRequirements,
    url: `${siteUrl}${job.path}`,
  })
}

/**
 * Breadcrumb schema for nested navigation.
 */
export const useBreadcrumbStructuredData = (items: BreadcrumbEntry[]): void => {
  const siteUrl = resolveSiteUrl()

  useStructuredData({
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  })
}

/**
 * ItemList schema for list pages.
 */
export const useItemListStructuredData = (items: ItemListEntry[]): void => {
  const siteUrl = resolveSiteUrl()

  useStructuredData({
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: `${siteUrl}${item.path}`,
    })),
  })
}