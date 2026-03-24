import type {
  QueryParamValue,
  ApiErrorData,
  ApiErrorResponse,
} from '~/shared/types/domain'

function getAuthToken(): string | null {
  if (import.meta.client) {
    return localStorage.getItem('auth_token')
  }
  return null
}

function getBaseURL(): string {
  const config = useRuntimeConfig()
  return config.public.apiBase || 'http://localhost:3001'
}

function buildHeaders(customHeaders?: Record<string, string>): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Accept-Language': 'ar',
    ...customHeaders,
  }

  const token = getAuthToken()
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  return headers
}

function handleAuthError(status: number) {
  if (status === 401 && import.meta.client) {
    localStorage.removeItem('auth_token')
    navigateTo('/auth/login')
  }
}

function extractErrorMessage(errorData: unknown): { message: string; code?: string; details?: unknown } {
  if (errorData && typeof errorData === 'object') {
    const data = errorData as ApiErrorResponse
    return {
      message: data.message || data.error || 'Unexpected request error',
      code: data.code,
      details: data.details,
    }
  }
  return { message: 'Unexpected request error' }
}

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: {
      method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
      body?: unknown | FormData
      params?: Record<string, QueryParamValue>
      headers?: Record<string, string>
    } = {},
  ): Promise<T> {
    const { method = 'GET', body, params, headers: customHeaders } = options

    const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
    const url = `${getBaseURL()}${normalizedEndpoint}`

    const isFormData = body instanceof FormData

    const headers = buildHeaders(customHeaders)
    if (isFormData) {
      delete headers['Content-Type']
    }

    try {
      return (await $fetch<T>(url, {
        method,
        headers,
        params,
        body: body ?? undefined,
      })) as T
    } catch (error: unknown) {
      const fetchError = error as { response?: { status: number; _data: unknown }; statusCode?: number; statusMessage?: string }
      const status = fetchError.response?.status ?? fetchError.statusCode ?? 500

      handleAuthError(status)

      const { message, code, details } = extractErrorMessage(fetchError.response?._data)

      throw createError({
        statusCode: status,
        statusMessage: message,
        message,
        data: { code, details } satisfies ApiErrorData,
      })
    }
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
