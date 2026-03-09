import { z } from 'zod'
import { apiClient } from '~/core/api/client'

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  avatar: z.string().optional(),
  role: z.enum(['jobseeker', 'employer', 'admin']),
  createdAt: z.string().optional(),
})

export type User = z.infer<typeof UserSchema>

export const AuthResponseSchema = z.object({
  user: UserSchema,
  token: z.string(),
})

export type AuthResponse = z.infer<typeof AuthResponseSchema>

interface LoginParams {
  email: string
  password: string
}

interface RegisterParams {
  email: string
  password: string
  name: string
  role?: 'jobseeker' | 'employer'
}

interface ForgotPasswordParams {
  email: string
}

interface ResetPasswordParams {
  token: string
  password: string
}

export const useAuthApi = () => {
  const login = async (params: LoginParams): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', params)
    return AuthResponseSchema.parse(response)
  }

  const register = async (params: RegisterParams): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/register', params)
    return AuthResponseSchema.parse(response)
  }

  const logout = async (): Promise<void> => {
    await apiClient.post('/auth/logout')
  }

  const refreshToken = async (): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/refresh')
    return AuthResponseSchema.parse(response)
  }

  const forgotPassword = async (params: ForgotPasswordParams): Promise<{ message: string }> => {
    return await apiClient.post('/auth/forgot-password', params)
  }

  const resetPassword = async (params: ResetPasswordParams): Promise<{ message: string }> => {
    return await apiClient.post('/auth/reset-password', params)
  }

  const getCurrentUser = async (): Promise<User> => {
    const response = await apiClient.get<User>('/auth/me')
    return UserSchema.parse(response)
  }

  const verifyEmail = async (token: string): Promise<{ message: string }> => {
    return await apiClient.post('/auth/verify-email', { token })
  }

  return {
    login,
    register,
    logout,
    refreshToken,
    forgotPassword,
    resetPassword,
    getCurrentUser,
    verifyEmail,
  }
}
