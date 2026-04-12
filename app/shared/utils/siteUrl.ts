/**
 * Resolves the site URL from runtime config.
 * Single Source of Truth — used by useSEO and useStructuredData.
 */
const trimSlash = (value: string): string => value.replace(/\/$/, '')

export const resolveSiteUrl = (): string => {
  const runtime = useRuntimeConfig()
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

export const toAbsoluteUrl = (siteUrl: string, pathOrUrl: string): string => {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl
  }

  const normalizedPath = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`
  return `${siteUrl}${normalizedPath}`
}
