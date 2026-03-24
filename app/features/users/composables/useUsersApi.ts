import { z } from 'zod'
import { apiClient } from '~/core/api/client'

export const UserProfileSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  avatar: z.string().optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  bio: z.string().optional(),
  resume: z.string().optional(),
  skills: z.array(z.string()).optional(),
  experience: z.number().optional(),
  education: z.string().optional(),
  linkedIn: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

export type UserProfile = z.infer<typeof UserProfileSchema>

interface UpdateProfileParams {
  name?: string
  phone?: string
  location?: string
  bio?: string
  resume?: string
  skills?: string[]
  experience?: number
  education?: string
  linkedIn?: string
}

export const useUsersApi = () => {
  const getProfile = async (): Promise<UserProfile> => {
    const response = await apiClient.get<UserProfile>('/users/me')
    return UserProfileSchema.parse(response)
  }

  const updateProfile = async (params: UpdateProfileParams): Promise<UserProfile> => {
    const response = await apiClient.patch<UserProfile>('/users/me', params)
    return UserProfileSchema.parse(response)
  }

  const uploadAvatar = async (file: File): Promise<{ url: string }> => {
    const formData = new FormData()
    formData.append('avatar', file)
    return apiClient.post<{ url: string }>('/users/me/avatar', formData)
  }

  const uploadResume = async (file: File): Promise<{ url: string }> => {
    const formData = new FormData()
    formData.append('resume', file)
    return apiClient.post<{ url: string }>('/users/me/resume', formData)
  }

  return {
    getProfile,
    updateProfile,
    uploadAvatar,
    uploadResume,
  }
}
