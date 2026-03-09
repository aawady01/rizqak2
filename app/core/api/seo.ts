import {
  useSEO,
  useJobSEO,
  type SEOOptions,
  type JobSEOInput,
} from '~/shared/composables/useSEO'
import {
  useStructuredData,
  useWebsiteStructuredData,
  useOrganizationStructuredData,
  useEmployerStructuredData,
  useJobPostingStructuredData,
  useBreadcrumbStructuredData,
  useItemListStructuredData,
  type StructuredDataNode,
  type BreadcrumbEntry,
  type ItemListEntry,
  type JobPostingStructuredData,
} from '~/shared/composables/useStructuredData'

export type SeoOptions = SEOOptions
export type JobPostingSchema = JobSEOInput
export type JsonLdOptions = StructuredDataNode
export type BreadcrumbItem = BreadcrumbEntry
export type JobListItem = ItemListEntry
export type JobPostingSchemaData = JobPostingStructuredData

export const useSeo = useSEO
export const useJobSeo = useJobSEO
export const useJsonLd = useStructuredData
export const useWebsiteSchema = useWebsiteStructuredData
export const useOrganizationSchema = useOrganizationStructuredData
export const useEmployerSchema = useEmployerStructuredData
export const useJobPostingSchema = useJobPostingStructuredData
export const useBreadcrumbSchema = useBreadcrumbStructuredData
export const useJobListSchema = useItemListStructuredData
