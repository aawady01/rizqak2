// =============================================
// Domain Types — Unified Type Registry
// =============================================

// --- Existing Domain Types ---

export type EmploymentType =
  | 'FULL_TIME'
  | 'PART_TIME'
  | 'CONTRACT'
  | 'TEMPORARY'
  | 'INTERNSHIP'
  | 'FREELANCE'

export type ExperienceLevel =
  | 'ENTRY'
  | 'JUNIOR'
  | 'MID'
  | 'SENIOR'
  | 'LEAD'

export interface JobLocation {
  city: string
  governorate?: string
  country: string
  remote?: boolean
}

export interface SalaryRange {
  amountMin?: number
  amountMax?: number
  currency: 'EGP' | 'SAR' | 'AED' | 'USD'
  period: 'hour' | 'day' | 'week' | 'month' | 'year'
}

export interface JobEntity {
  id: string
  slug: string
  title: string
  description: string
  summary?: string
  companyId: string
  companyName: string
  employmentType: EmploymentType
  experienceLevel?: ExperienceLevel
  location: JobLocation
  salary?: SalaryRange
  skills?: string[]
  requirements?: string[]
  benefits?: string[]
  postedAt: string
  validThrough?: string
  applicationUrl?: string
  category?: string
  subcategory?: string
}

export interface CompanyEntity {
  id: string
  slug: string
  name: string
  description?: string
  industry?: string
  size?: string
  foundedYear?: number
  location?: JobLocation
  website?: string
  logoUrl?: string
}

export interface SearchFilters {
  keyword?: string
  location?: string
  category?: string
  employmentType?: EmploymentType[]
  experienceLevel?: ExperienceLevel[]
  salaryMin?: number
  salaryMax?: number
  page?: number
  perPage?: number
}

export interface PaginationInfo {
  page: number
  perPage: number
  total: number
  totalPages: number
}

export interface ApiEnvelope<T> {
  data: T
  message?: string
  meta?: Record<string, unknown>
}

export interface ApiProblem {
  code: string
  message: string
  details?: Record<string, unknown>
}

// --- API Client Types ---

export type QueryParamValue = string | number | boolean | undefined

export interface ApiClientOptions {
  baseURL?: string
  headers?: Record<string, string>
}

export interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: unknown | FormData
  params?: Record<string, QueryParamValue>
  headers?: Record<string, string>
}

export interface ApiErrorData {
  code?: string
  details?: unknown
}

export interface ApiErrorResponse {
  message?: string
  error?: string
  code?: string
  details?: unknown
}

// --- Auth Types ---

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'jobseeker' | 'employer' | 'admin'
}

// --- UI Display Types (mockData) ---

export interface Country {
  id: string
  name: string
  flag: string
  countryCode?: string
  jobCount: number
  isAllCountries?: boolean
}

export interface Company {
  id: string
  slug: string
  name: string
  logo?: string
  iconName?: string
  rating: number
  reviewCount: number
  availableJobs: number
}

export interface JobBenefit {
  label: string
}

export interface Job {
  id: string
  slug: string
  title: string
  hashtag: string
  timeAgo: string
  country: string
  countryFlag: string
  countryCode: string
  city?: string
  companyName: string
  companySlug: string
  salary: string
  salaryAmount?: number
  views?: number
  benefits: JobBenefit[]
  companyLogo?: string
  iconName?: string
  isSaved?: boolean
}

export interface JobDetailFactItem {
  id: string
  label: string
  value: string
  iconName?: string
}

export interface JobDetailFactGroup {
  id: string
  title: string
  items: JobDetailFactItem[]
}

export interface JobDetailContentSection {
  id: string
  title: string
  iconName?: string
  paragraphs?: string[]
  items?: string[]
  accentNote?: string
}

export interface JobDetailPublisherStat {
  id: string
  label: string
  value: string
}

export interface JobDetailSidebarAction {
  id: string
  label: string
  iconName: string
  variant: 'default' | 'outline' | 'secondary'
  tone?: 'brand' | 'success' | 'neutral'
  href?: string
}

export interface JobDetailPublisherInfo {
  name: string
  tagline: string
  logo?: string
  rating: string
  reviewCount: string
  followerCount: string
  headquarters: string
  license: string
  isVerified: boolean
  stats: JobDetailPublisherStat[]
}

export interface JobDetailComment {
  id: string
  author: string
  role?: string
  avatarFallback: string
  avatarSrc?: string
  body: string
  timeAgo: string
  likes?: number
  dislikes?: number
  isPublisher?: boolean
  verified?: boolean
  replies?: JobDetailComment[]
}

export interface JobDetailView {
  id: string
  slug: string
  title: string
  hashtag: string
  companyName: string
  companySlug: string
  companyLogo?: string
  countryCode: string
  location: string
  salary: string
  postedAtLabel: string
  postedAtIso: string
  statusLabel: string
  statusVariant: 'success' | 'neutral'
  seoSummary: string
  summaryBadges: string[]
  quickStats: JobDetailPublisherStat[]
  factGroups: JobDetailFactGroup[]
  compensationItems: JobDetailFactItem[]
  benefitTags: string[]
  contentSections: JobDetailContentSection[]
  interviewSection?: JobDetailContentSection
  publisher: JobDetailPublisherInfo
  sidebarActions: JobDetailSidebarAction[]
  safetyTitle: string
  safetyBody: string
  comments: JobDetailComment[]
  isSaved?: boolean
}

// --- Filter Types ---

export interface FilterChild {
  id: string
  label: string
  count: number
  checked?: boolean
}

export interface FilterCategory {
  id: string
  label: string
  count: number
  totalJobs: number
  children?: FilterChild[]
  expanded?: boolean
  checked?: boolean
}

export interface FilterSection {
  id: string
  title: string
  totalLabel: string
  totalCount: number
  totalJobs: number
  categories: FilterCategory[]
  type?: 'checkbox' | 'radio'
}
