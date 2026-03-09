import { z } from 'zod'
import { apiClient } from '~/core/api/client'

export const CompanySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  fullDescription: z.string().optional(),
  industry: z.string(),
  location: z.string(),
  employees: z.string().optional(),
  founded: z.number().optional(),
  website: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  logo: z.string().optional(),
  jobsCount: z.number(),
  rating: z.number().optional(),
  reviews: z.number().optional(),
  applications: z.number().optional(),
})

export type Company = z.infer<typeof CompanySchema>

export const CompaniesListResponseSchema = z.object({
  companies: z.array(CompanySchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
})

export type CompaniesListResponse = z.infer<typeof CompaniesListResponseSchema>

interface GetCompaniesParams {
  page?: number
  limit?: number
  keyword?: string
  location?: string
  industry?: string
  sort?: 'name' | 'jobs' | 'rating'
}

export const useCompaniesApi = () => {
  const getCompanies = async (params: GetCompaniesParams = {}): Promise<CompaniesListResponse> => {
    const response = await apiClient.get<CompaniesListResponse>('/companies', {
      page: params.page || 1,
      limit: params.limit || 20,
      keyword: params.keyword,
      location: params.location,
      industry: params.industry,
      sort: params.sort,
    })

    return CompaniesListResponseSchema.parse(response)
  }

  const getCompany = async (slug: string): Promise<Company> => {
    const response = await apiClient.get<Company>(`/companies/${slug}`)
    return CompanySchema.parse(response)
  }

  const updateCompany = async (slug: string, data: Partial<Company>): Promise<Company> => {
    const response = await apiClient.patch<Company>(`/companies/${slug}`, data)
    return CompanySchema.parse(response)
  }

  return {
    getCompanies,
    getCompany,
    updateCompany,
  }
}
