import { defineStore } from 'pinia'
import { apiClient } from '../core/api/client'
import type { User } from '~/shared/types/domain'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const isAuthenticated = computed(() => !!user.value)

  const currentUser = computed(() => user.value)
  const userRole = computed(() => user.value?.role)
  const isEmployer = computed(() => user.value?.role === 'employer')
  const isAdmin = computed(() => user.value?.role === 'admin')
  const userName = computed(() => user.value?.name ?? '')
  const userInitials = computed(() => {
    const name = user.value?.name
    if (!name) return '?'
    const parts = name.split(' ')
    if (parts.length > 1 && parts[0] && parts[1]) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  })

  function setUser(newUser: User | null) {
    user.value = newUser
  }

  function setToken(newToken: string | null) {
    token.value = newToken
    if (import.meta.client) {
      if (newToken) {
        localStorage.setItem('auth_token', newToken)
      } else {
        localStorage.removeItem('auth_token')
      }
    }
  }

  async function login(email: string, password: string) {
    const response = await apiClient.post<{ user: User; token: string }>('/auth/login', {
      email,
      password,
    })

    setUser(response.user)
    setToken(response.token)

    return response
  }

  async function register(data: {
    email: string
    password: string
    name: string
    role?: 'jobseeker' | 'employer'
  }) {
    const response = await apiClient.post<{ user: User; token: string }>('/auth/register', data)

    setUser(response.user)
    setToken(response.token)

    return response
  }

  async function logout() {
    setUser(null)
    setToken(null)

    if (import.meta.client) {
      navigateTo('/auth/login')
    }
  }

  async function refreshToken() {
    if (!token.value) return false

    try {
      const response = await apiClient.post<{ user: User; token: string }>('/auth/refresh')
      setUser(response.user)
      setToken(response.token)
      return true
    } catch {
      await logout()
      return false
    }
  }

  async function checkAuth() {
    if (import.meta.client) {
      const storedToken = localStorage.getItem('auth_token')
      if (!storedToken) {
        return false
      }

      setToken(storedToken)

      try {
        const userData = await apiClient.get<User>('/auth/me')
        setUser(userData)
        return true
      } catch {
        await logout()
        return false
      }
    }
    return false
  }

  function initAuth() {
    if (import.meta.client) {
      const storedToken = localStorage.getItem('auth_token')
      if (storedToken) {
        setToken(storedToken)
      }
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    currentUser,
    userRole,
    isEmployer,
    isAdmin,
    userName,
    userInitials,
    setUser,
    setToken,
    login,
    register,
    logout,
    refreshToken,
    checkAuth,
    initAuth,
  }
})
