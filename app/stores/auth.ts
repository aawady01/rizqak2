import { defineStore } from 'pinia'
import { apiClient } from '../core/api/client'

interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'jobseeker' | 'employer' | 'admin'
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    isAuthenticated: false,
  }),

  getters: {
    currentUser: (state): User | null => state.user,
    userRole: (state): string | undefined => state.user?.role,
    isEmployer: (state): boolean => state.user?.role === 'employer',
    isAdmin: (state): boolean => state.user?.role === 'admin',
    userName: (state): string => state.user?.name ?? '',
    userInitials: (state): string => {
      const name = state.user?.name
      if (!name) return '?'
      const parts = name.split(' ')
      if (parts.length > 1 && parts[0] && parts[1]) {
        return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
      }
      return name.substring(0, 2).toUpperCase()
    },
  },

  actions: {
    setUser(user: User | null) {
      this.user = user
      this.isAuthenticated = !!user
    },

    setToken(token: string | null) {
      this.token = token
      if (token) {
        if (import.meta.client) {
          localStorage.setItem('auth_token', token)
        }
      } else {
        if (import.meta.client) {
          localStorage.removeItem('auth_token')
        }
      }
    },

    async login(email: string, password: string) {
      try {
        const response = await apiClient.post<{ user: User; token: string }>('/auth/login', {
          email,
          password,
        })

        this.setUser(response.user)
        this.setToken(response.token)

        return response
      } catch (e) {
        // Mock login for demo purposes
        console.warn('API Login failed, using mock data:', e)
        const mockUser: User = {
          id: '1',
          email: email,
          name: 'مستخدم تجريبي',
          role: 'jobseeker',
        }
        const mockToken = 'mock_token_' + Date.now()
        
        this.setUser(mockUser)
        this.setToken(mockToken)
        
        return { user: mockUser, token: mockToken }
      }
    },

    async register(data: {
      email: string
      password: string
      name: string
      role?: 'jobseeker' | 'employer'
    }) {
      try {
        const response = await apiClient.post<{ user: User; token: string }>('/auth/register', data)

        this.setUser(response.user)
        this.setToken(response.token)

        return response
      } catch (e) {
        // Mock register for demo purposes
        console.warn('API Register failed, using mock data:', e)
        const mockUser: User = {
          id: '1',
          email: data.email,
          name: data.name,
          role: data.role || 'jobseeker',
        }
        const mockToken = 'mock_token_' + Date.now()
        
        this.setUser(mockUser)
        this.setToken(mockToken)
        
        return { user: mockUser, token: mockToken }
      }
    },

    async logout() {
      this.setUser(null)
      this.setToken(null)
      
      if (import.meta.client) {
        navigateTo('/auth/login')
      }
    },

    async refreshToken() {
      if (!this.token) return false

      try {
        const response = await apiClient.post<{ user: User; token: string }>('/auth/refresh')
        this.setUser(response.user)
        this.setToken(response.token)
        return true
      } catch {
        await this.logout()
        return false
      }
    },

    async checkAuth() {
      if (import.meta.client) {
        const token = localStorage.getItem('auth_token')
        if (!token) {
          return false
        }

        this.setToken(token)

        try {
          const user = await apiClient.get<User>('/auth/me')
          this.setUser(user)
          return true
        } catch {
          await this.logout()
          return false
        }
      }
      return false
    },

    initAuth() {
      if (import.meta.client) {
        const token = localStorage.getItem('auth_token')
        if (token) {
          this.setToken(token)
        }
      }
    },
  },
})
