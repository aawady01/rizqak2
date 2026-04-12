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
  // Task 2.3 — applicationContact support
  applicationContact?: {
    email?: string
    url?: string
  }
  path: string
}

// Task 2.4 — FAQPage schema types
export interface FAQEntry {
  question: string
  answer: string
}

import { resolveSiteUrl } from '~/shared/utils/siteUrl'

const withContext = (schema: StructuredDataNode): StructuredDataNode => ({
  '@context': 'https://schema.org',
  ...schema,
})

/**
 * Attach one or many JSON-LD schema nodes to the page head.
 * Task 1.2 — fix key collision by using Date.now()+index instead of @type+index
 */
export const useStructuredData = (
  schema: StructuredDataNode | StructuredDataNode[],
): void => {
  const nodes = Array.isArray(schema) ? schema : [schema]
  const ts = Date.now()

  useHead({
    script: nodes.map((node, index) => ({
      key: `jsonld-${node['@type']}-${ts}-${index}`,
      type: 'application/ld+json',
      innerHTML: JSON.stringify(withContext(node)),
    })),
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
    inLanguage: 'ar-EG',
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
 * Legacy-friendly alias for organization/employer identity schema.
 */
export const useEmployerStructuredData = (): void => {
  useOrganizationStructuredData()
}

/**
 * JobPosting schema for job detail pages.
 * Task 2.3 — added directApply: true and applicationContact
 */
export const useJobPostingStructuredData = (job: JobPostingStructuredData): void => {
  const siteUrl = resolveSiteUrl()

  const applicationContactNode = job.applicationContact
    ? {
        '@type': 'ContactPoint',
        contactType: 'HR',
        ...(job.applicationContact.email ? { email: job.applicationContact.email } : {}),
        ...(job.applicationContact.url ? { url: job.applicationContact.url } : {}),
      }
    : undefined

  useStructuredData({
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    datePosted: job.datePosted,
    validThrough: job.validThrough,
    employmentType: job.employmentType,
    directApply: true,
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
    applicationContact: applicationContactNode,
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

/**
 * Task 2.4 — FAQPage schema for rich results in Google.
 * Use in index.vue or any page that has FAQ content.
 */
export const useFAQStructuredData = (faqs: FAQEntry[]): void => {
  useStructuredData({
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  })
}
