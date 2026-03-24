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
  title: string
  hashtag: string
  timeAgo: string
  country: string
  countryFlag: string
  countryCode: string
  city?: string
  companyName: string
  salary: string
  benefits: JobBenefit[]
  companyLogo?: string
  iconName?: string
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
