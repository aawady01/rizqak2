import { createError } from 'h3'

type QueryParamValue = string | number | boolean | undefined

interface ApiClientOptions {
  baseURL?: string
  headers?: Record<string, string>
}

interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: unknown | FormData
  params?: Record<string, QueryParamValue>
  headers?: Record<string, string>
}

interface ApiErrorData {
  code?: string
  details?: unknown
}

interface ApiErrorResponse {
  message?: string
  error?: string
  code?: string
  details?: unknown
}

class ApiClient {
  private _baseURL: string | null = null
  private readonly _headers: Record<string, string>

  constructor(options: ApiClientOptions = {}) {
    this._headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
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

  private normalizeEndpoint(endpoint: string): string {
    return endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  }

  private buildURL(
    endpoint: string,
    params?: Record<string, QueryParamValue>,
  ): string {
    const base = this.baseURL.endsWith('/') ? this.baseURL : `${this.baseURL}/`
    const url = new URL(this.normalizeEndpoint(endpoint).slice(1), base)

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          url.searchParams.append(key, String(value))
        }
      })
    }

    return url.toString()
  }

  private async parseResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type') || ''

    if (contentType.includes('application/json')) {
      return response.json() as Promise<T>
    }

    return response.text() as Promise<T>
  }

  private async request<T>(
    endpoint: string,
    config: RequestConfig = {},
  ): Promise<T> {
    const { method = 'GET', body, params, headers = {} } = config

    const requestHeaders: Record<string, string> = {
      ...this._headers,
      ...headers,
    }

    const token = this.getAuthToken()
    if (token) {
      requestHeaders.Authorization = `Bearer ${token}`
    }

    const isFormDataBody = body instanceof FormData
    if (isFormDataBody) {
      // Let the browser set multipart boundaries automatically.
      delete requestHeaders['Content-Type']
    }

    const response = await fetch(this.buildURL(endpoint, params), {
      method,
      headers: requestHeaders,
      body: body
        ? isFormDataBody
          ? body
          : JSON.stringify(body)
        : undefined,
    })

    if (!response.ok) {
      if (response.status === 401 && import.meta.client) {
        localStorage.removeItem('auth_token')
        navigateTo('/auth/login')
      }

      let errorMessage = 'Unexpected request error'
      let errorCode: string | undefined
      let errorDetails: unknown

      try {
        const errorData = await this.parseResponse<ApiErrorResponse>(response)
        errorMessage = errorData.message || errorData.error || errorMessage
        errorCode = errorData.code
        errorDetails = errorData.details
      } catch {
        errorMessage = response.statusText || errorMessage
      }

      throw createError({
        statusCode: response.status,
        statusMessage: errorMessage,
        message: errorMessage,
        data: {
          code: errorCode,
          details: errorDetails,
        } satisfies ApiErrorData,
      })
    }

    if (response.status === 204) {
      return undefined as T
    }

    return this.parseResponse<T>(response)
  }

  async get<T>(
    endpoint: string,
    params?: Record<string, QueryParamValue>,
  ): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', params })
  }

  async post<T>(endpoint: string, body?: unknown | FormData): Promise<T> {
    return this.request<T>(endpoint, { method: 'POST', body })
  }

  async put<T>(endpoint: string, body?: unknown | FormData): Promise<T> {
    return this.request<T>(endpoint, { method: 'PUT', body })
  }

  async patch<T>(endpoint: string, body?: unknown | FormData): Promise<T> {
    return this.request<T>(endpoint, { method: 'PATCH', body })
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }
}

const apiClient = new ApiClient()

export const useApi = () => apiClient

export { apiClient }