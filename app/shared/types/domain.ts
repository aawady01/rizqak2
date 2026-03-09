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
