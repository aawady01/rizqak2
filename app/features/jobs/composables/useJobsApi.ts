import { z } from 'zod'
import { apiClient } from '~/core/api/client'

export const JobSchema = z.object({
  id: z.string(),
  title: z.string(),
  company: z.string(),
  companySlug: z.string(),
  location: z.string(),
  salary: z.string().optional(),
  type: z.string(),
  postedAt: z.string(),
  tags: z.array(z.string()).optional(),
  description: z.string().optional(),
  requirements: z.array(z.string()).optional(),
  benefits: z.array(z.string()).optional(),
  experience: z.string().optional(),
  education: z.string().optional(),
  language: z.string().optional(),
  updatedAt: z.string().optional(),
  expiresAt: z.string().optional(),
  applicants: z.number().optional(),
})

export type Job = z.infer<typeof JobSchema>

export const JobsListResponseSchema = z.object({
  jobs: z.array(JobSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
})

export type JobsListResponse = z.infer<typeof JobsListResponseSchema>

interface GetJobsParams {
  page?: number
  limit?: number
  keyword?: string
  location?: string
  type?: string
  salaryMin?: number
  salaryMax?: number
  experience?: string
  sort?: 'latest' | 'relevant' | 'salary-high' | 'salary-low'
}

export const useJobsApi = () => {
  const getJobs = async (params: GetJobsParams = {}): Promise<JobsListResponse> => {
    const response = await apiClient.get<JobsListResponse>('/jobs', {
      page: params.page || 1,
      limit: params.limit || 20,
      keyword: params.keyword,
      location: params.location,
      type: params.type,
      salary_min: params.salaryMin,
      salary_max: params.salaryMax,
      experience: params.experience,
      sort: params.sort,
    })

    return JobsListResponseSchema.parse(response)
  }

  const getJob = async (id: string): Promise<Job> => {
    const response = await apiClient.get<Job>(`/jobs/${id}`)
    return JobSchema.parse(response)
  }

  const createJob = async (data: Partial<Job>): Promise<Job> => {
    const response = await apiClient.post<Job>('/jobs', data)
    return JobSchema.parse(response)
  }

  const updateJob = async (id: string, data: Partial<Job>): Promise<Job> => {
    const response = await apiClient.patch<Job>(`/jobs/${id}`, data)
    return JobSchema.parse(response)
  }

  const deleteJob = async (id: string): Promise<void> => {
    await apiClient.delete(`/jobs/${id}`)
  }

  return {
    getJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
  }
}
