import type { H3Event } from 'h3'

export interface SitemapRouteEntry {
  path: string
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: string
  lastmod?: string
}

export const ROBOTS_DISALLOW_PATHS = [
  '/auth/',
  '/dashboard/',
  '/api/',
  '/admin/',
] as const

const PUBLIC_SEO_ROUTES: readonly SitemapRouteEntry[] = [
  {
    path: '/',
    changefreq: 'daily',
    priority: '1.0',
  },
] as const

const trimSlash = (value: string): string => value.replace(/\/$/, '')

export const resolveSiteUrl = (event?: H3Event): string => {
  const runtime = event ? useRuntimeConfig(event) : useRuntimeConfig()
  const siteUrl = runtime.public.siteUrl as string | undefined
  const apiBase = runtime.public.apiBase as string | undefined

  if (siteUrl && siteUrl.trim().length > 0) {
    return trimSlash(siteUrl)
  }

  if (apiBase && apiBase.trim().length > 0) {
    return trimSlash(apiBase.replace(/\/api\/?$/, ''))
  }

  return 'https://rizqak.com'
}

export const buildAbsoluteUrl = (siteUrl: string, path: string): string => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return normalizedPath === '/' ? siteUrl : `${siteUrl}${normalizedPath}`
}

export const escapeXml = (value: string): string => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll('\'', '&apos;')

export const getPublicSeoRoutes = (): SitemapRouteEntry[] => {
  return PUBLIC_SEO_ROUTES.map((route) => ({ ...route }))
}
