export interface SeoOptions {
  title?: string
  description?: string
  canonical?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogType?: string
  twitterCard?: string
  twitterImage?: string
  noindex?: boolean
  nofollow?: boolean
}

export interface JsonLdOptions {
  '@context'?: string
  '@type': string
  [key: string]: unknown
}

export const useSeo = (options: SeoOptions = {}) => {
  const config = useRuntimeConfig()
  const route = useRoute()

  const defaultTitle = 'Rizqak - رزقك'
  const defaultDescription = 'منصة التوظيف العربية الأولى للعمل في الخليج. ابحث عن وظائف في السعودية والإمارات والكويت وقطر والبحرين وعمان.'
  const siteUrl = config.public.apiBase?.replace('/api', '') || 'https://rizqak.com'

  const fullTitle = options.title 
    ? `${options.title} - رزقك`
    : defaultTitle

  const canonicalUrl = options.canonical 
    ? `${siteUrl}${options.canonical}`
    : `${siteUrl}${route.path}`

  useHead({
    title: fullTitle,
    meta: [
      { name: 'description', content: options.description || defaultDescription },
      ...(options.noindex ? [{ name: 'robots', content: 'noindex, nofollow' }] : [
        { name: 'robots', content: options.nofollow ? 'index, nofollow' : 'index, follow' }
      ]),
    ],
    link: [
      { rel: 'canonical', href: canonicalUrl },
    ],
  })

  useSeoMeta({
    ogTitle: options.ogTitle || options.title || defaultTitle,
    ogDescription: options.ogDescription || options.description || defaultDescription,
    ogImage: options.ogImage || `${siteUrl}/og-default.png`,
    ogType: (options.ogType || 'website') as 'website',
    ogUrl: canonicalUrl,
    twitterCard: (options.twitterCard || 'summary_large_image') as 'summary_large_image',
    twitterImage: options.twitterImage || `${siteUrl}/og-default.png`,
    twitterTitle: options.ogTitle || options.title || defaultTitle,
    twitterDescription: options.ogDescription || options.description || defaultDescription,
  })
}

export const useJsonLd = (schema: JsonLdOptions) => {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': schema['@context'] || 'https://schema.org',
          ...schema,
        }),
      },
    ],
  })
}

export interface JobPostingSchema {
  id: string
  title: string
  description: string
  datePosted: string
  validThrough?: string
  employmentType?: 'FULL_TIME' | 'PART_TIME' | 'CONTRACTOR' | 'INTERN' | 'TEMPORARY' | 'FREELANCE'
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
    currency: string
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
  applicantLocationRequirements?: string
  url?: string
}

export const useJobPostingSchema = (job: JobPostingSchema) => {
  const config = useRuntimeConfig()
  const siteUrl = config.public.apiBase?.replace('/api', '') || 'https://rizqak.com'

  useJsonLd({
    '@type': 'JobPosting',
    identifier: job.id,
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
    baseSalary: job.baseSalary ? {
      '@type': 'MonetaryAmount',
      currency: job.baseSalary.currency,
      value: job.baseSalary.value,
      unitText: job.baseSalary.unitText,
    } : undefined,
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
    url: job.url || `${siteUrl}/jobs/${job.id}`,
  })
}

export const useWebsiteSchema = () => {
  const config = useRuntimeConfig()
  const siteUrl = config.public.apiBase?.replace('/api', '') || 'https://rizqak.com'

  useJsonLd({
    '@type': 'WebSite',
    name: 'Rizqak - رزقك',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/jobs?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  })
}

export const useOrganizationSchema = () => {
  const config = useRuntimeConfig()
  const siteUrl = config.public.apiBase?.replace('/api', '') || 'https://rizqak.com'

  useJsonLd({
    '@type': 'Organization',
    name: 'Rizqak - رزقك',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: 'منصة التوظيف العربية الأولى للعمل في الخليج',
    sameAs: [
      'https://facebook.com/rizqak',
      'https://twitter.com/rizqak',
      'https://linkedin.com/company/rizqak',
      'https://instagram.com/rizqak',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+20-xxx-xxxxxxx',
      contactType: 'customer service',
      availableLanguage: ['Arabic', 'English'],
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'EG',
      addressLocality: 'القاهرة',
    },
  })
}

export interface BreadcrumbItem {
  name: string
  url: string
}

export const useBreadcrumbSchema = (items: BreadcrumbItem[]) => {
  const config = useRuntimeConfig()
  const siteUrl = config.public.apiBase?.replace('/api', '') || 'https://rizqak.com'

  useJsonLd({
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  })
}

export interface JobListItem {
  id: string
  title: string
  url: string
}

export const useJobListSchema = (jobs: JobListItem[]) => {
  const config = useRuntimeConfig()
  const siteUrl = config.public.apiBase?.replace('/api', '') || 'https://rizqak.com'

  useJsonLd({
    '@type': 'ItemList',
    itemListElement: jobs.map((job, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: job.title,
      url: `${siteUrl}${job.url}`,
    })),
  })
}

export const useEmployerSchema = (employer: {
  id: string
  name: string
  logo?: string
  description: string
  website?: string
  industries?: string[]
  size?: string
  founded?: number
  location?: string
}) => {
  useJsonLd({
    '@type': 'Employer',
    identifier: employer.id,
    name: employer.name,
    logo: employer.logo,
    description: employer.description,
    url: employer.website,
    industry: employer.industries,
    numberOfEmployees: employer.size ? {
      '@type': 'QuantitativeValue',
      value: employer.size,
    } : undefined,
    foundingDate: employer.founded?.toString(),
    address: employer.location ? {
      '@type': 'PostalAddress',
      addressLocality: employer.location,
    } : undefined,
  })
}

export const useJobSchema = (job: {
  id: string
  title: string
  description: string
  company: {
    name: string
    logo?: string
  }
  location: string
  salary?: string
  employmentType?: string
  datePosted: string
  validThrough?: string
}) => {
  useJobPostingSchema({
    id: job.id,
    title: job.title,
    description: job.description,
    datePosted: job.datePosted,
    validThrough: job.validThrough,
    employmentType: job.employmentType as JobPostingSchema['employmentType'],
    hiringOrganization: {
      name: job.company.name,
      logo: job.company.logo,
    },
    jobLocation: {
      addressLocality: job.location,
      addressCountry: 'EG',
    },
    baseSalary: job.salary ? {
      currency: 'EGP',
      value: job.salary,
      unitText: 'MONTH',
    } : undefined,
  })
}
