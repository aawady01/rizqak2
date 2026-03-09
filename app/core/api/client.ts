import { createError } from 'h3'

interface ApiClientOptions {
  baseURL?: string
  headers?: Record<string, string>
}

interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: unknown
  params?: Record<string, string | number | boolean | undefined>
  headers?: Record<string, string>
}

class ApiClient {
  private _baseURL: string | null = null
  private _headers: Record<string, string>

  constructor(options: ApiClientOptions = {}) {
    this._headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Language': 'ar',
      ...options.headers,
    }
  }

  private get baseURL(): string {
    if (!this._baseURL) {
      const config = useRuntimeConfig()
      this._baseURL = config.public.apiBase || 'http://localhost:3001'
    }
    return this._baseURL
  }

  private getAuthToken(): string | null {
    if (import.meta.client) {
      return localStorage.getItem('auth_token')
    }
    return null
  }

  private buildURL(endpoint: string, params?: Record<string, string | number | boolean | undefined>): string {
    const url = new URL(`${this.baseURL}${endpoint}`)
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          url.searchParams.append(key, String(value))
        }
      })
    }
    return url.toString()
  }

  private async request<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    const { method = 'GET', body, params, headers = {} } = config

    const token = this.getAuthToken()
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const requestHeaders = {
      ...this._headers,
      ...headers,
    }

    const response = await fetch(this.buildURL(endpoint, params), {
      method,
      headers: requestHeaders,
      body: body ? JSON.stringify(body) : undefined,
    })

    if (!response.ok) {
      if (response.status === 401) {
        if (import.meta.client) {
          localStorage.removeItem('auth_token')
          navigateTo('/auth/login')
        }
      }
      
      let errorMessage = 'حدث خطأ غير متوقع'
      try {
        const errorData = await response.json()
        errorMessage = errorData.message || errorData.error || errorMessage
      } catch {
        errorMessage = response.statusText || errorMessage
      }

      throw createError({
        statusCode: response.status,
        message: errorMessage,
      })
    }

    if (response.status === 204) {
      return undefined as T
    }

    return response.json()
  }

  async get<T>(endpoint: string, params?: Record<string, string | number | boolean | undefined>): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', params })
  }

  async post<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>(endpoint, { method: 'POST', body })
  }

  async put<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>(endpoint, { method: 'PUT', body })
  }

  async patch<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>(endpoint, { method: 'PATCH', body })
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }
}

const apiClient = new ApiClient()

export const useApi = () => {
  return apiClient
}

export { apiClient }
