// Core Domain Types
export interface Country {
  flag: string
  name: string
  count: string | number
  code?: string
}

export interface Company {
  id: string
  name: string
  slug: string
  logo?: string
  icon?: string
  rating: string | number
  reviews: string | number
  jobs: string | number
  industry?: string
  location?: string
}

export interface Job {
  id: string | number
  slug: string
  title: string
  category: string
  time?: string
  flag?: string
  location: string
  company: string
  companySlug: string
  salary: string
  type?: string
  postedAt?: string
  benefits?: string[]
  icon?: string
  logo?: string
  experience?: string
  tags?: string[]
}

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

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
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

// Auth Types
export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'jobseeker' | 'employer' | 'admin'
  phone?: string
  location?: string
  bio?: string
  createdAt?: string
  updatedAt?: string
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

// Job Types
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

// Company Types
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

// Review Types
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

// Application Types
export interface JobApplication {
  id: string
  jobId: string
  userId: string
  status: 'pending' | 'reviewing' | 'accepted' | 'rejected'
  appliedAt: string
  cv?: string
  coverLetter?: string
}

export * from './domain'
