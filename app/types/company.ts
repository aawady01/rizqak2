import type { Component } from 'vue'

export interface CompanyLink {
  website: string
  facebook: string
  linkedin: string
  whatsapp: string
  phone: string
}

export interface CompanyBreadcrumb {
  label: string
  href: string
  current?: boolean
}

export interface CompanyTab {
  label: string
  count?: number
  href: string
  active?: boolean
}

export type TabName = 'معلومات' | 'المراجعات' | 'الوظائف'

export interface CompanyStats {
  totalJobs: number
  jobViews: string
  profileVisits: string
  followers: string
  applicants: string
  monthlyAvg: number
}

export interface CountryData {
  countryCode: string
  name: string
  jobs: number
  percentage: number
}

export interface FieldData {
  name: string
  jobs: number
  percentage: number
}

export interface LicenseData {
  number: string
  issuer: string
  expiry: string
  status: string
}

export interface AccountData {
  joined: string
  managedBy: string
  verified: boolean
}

export interface Company {
  name: string
  logo: string
  coverImage: string
  rating: number
  licenseNumber: number
  description: string
  location: string
  hours: string
  placedCount: string
  followers: string
  aboutDescription: string
  classification: string
  foundedYear: string
  experienceYears: string
  size: string
  stats: CompanyStats
  topCountries: CountryData[]
  topFields: FieldData[]
  license: LicenseData
  account: AccountData
  branchAddress: string
  branchHours: string
  mapImage: string
  links: CompanyLink
  breadcrumb: CompanyBreadcrumb[]
  tabs: CompanyTab[]
}

export interface ReviewBadge {
  text: string
  variant: 'primary' | 'default'
}

export interface CompanyReply {
  body: string
  time?: string
  likes: number
}

export interface UserFollowUp {
  body: string
  time: string
  likes: number
}

export interface ReviewData {
  id: string
  author: string
  avatar: string
  role: string
  time: string
  rating: number
  badge?: ReviewBadge
  body: string
  likes: number
  hasReply?: boolean
  companyReply?: CompanyReply
  userFollowUp?: UserFollowUp
}

export interface RatingBreakdown {
  stars: number
  percentage: number
  count: number
}

export interface DetailedRating {
  label: string
  percentage: number
  count: number
}

export interface ReviewsDataSet {
  overall: number
  label: string
  totalReviews: number
  breakdown: RatingBreakdown[]
  detailedRatings: DetailedRating[]
  reviews: ReviewData[]
}

export interface FeeTransparencyItem {
  icon: Component
  label: string
}
