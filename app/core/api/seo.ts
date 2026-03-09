export type { SEOOptions as SeoOptions, JobSEOInput as JobPostingSchema } from '~/shared/composables/useSEO'
export type {
  StructuredDataNode as JsonLdOptions,
  BreadcrumbEntry as BreadcrumbItem,
  ItemListEntry as JobListItem,
  JobPostingStructuredData,
} from '~/shared/composables/useStructuredData'

export { useSEO as useSeo, useSEO, useJobSEO } from '~/shared/composables/useSEO'
export {
  useStructuredData as useJsonLd,
  useWebsiteStructuredData as useWebsiteSchema,
  useOrganizationStructuredData as useOrganizationSchema,
  useJobPostingStructuredData as useJobPostingSchema,
  useBreadcrumbStructuredData as useBreadcrumbSchema,
  useItemListStructuredData as useJobListSchema,
} from '~/shared/composables/useStructuredData'
