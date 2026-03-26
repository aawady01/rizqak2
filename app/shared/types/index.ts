// =============================================
// Types — Barrel file
// Re-exports all domain types + local helpers
// =============================================

export * from './domain'

export interface FilterNode {
  id: string
  label: string
  count?: number
  children?: FilterNode[]
  isChecked?: boolean
  isOpen?: boolean
}

export interface SelectOption {
  label: string
  value: string | number
}

export interface BreadcrumbItem {
  name: string
  url: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    perPage: number
    total: number
    totalPages: number
  }
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  name: string
  role?: 'jobseeker' | 'employer'
}

export interface JobFilters {
  page?: number
  perPage?: number
  search?: string
  country?: string
  category?: string
  location?: string
  salaryMin?: number
  salaryMax?: number
  experience?: string
  type?: string
}

export interface CompanySummary {
  id: string
  name: string
  slug: string
  logo?: string
  industry: string
  location: string
  jobsCount: number
  rating?: number
  reviews?: number
}

export interface CompanyDetail extends CompanySummary {
  description: string
  founded?: number
  employees?: string
  website?: string
  email?: string
  phone?: string
  benefits?: string[]
  photos?: string[]
}

export interface Review {
  id: string
  author: string
  authorRole?: string
  rating: number
  content: string
  date: string
  helpful: number
  companyReply?: {
    text: string
    date: string
  }
}

export interface JobApplication {
  id: string
  jobId: string
  userId: string
  status: 'pending' | 'reviewing' | 'accepted' | 'rejected'
  appliedAt: string
  cv?: string
  coverLetter?: string
}
