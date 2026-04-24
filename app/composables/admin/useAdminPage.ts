import { useState } from '#app'

export interface Breadcrumb {
  label: string
  href?: string
}

export interface AdminPageConfig {
  title: string
  subtitle?: string
  breadcrumbs?: Breadcrumb[]
  backUrl?: string
  searchPlaceholder?: string
  searchQuery?: string
  actionLabel?: string
  actionHref?: string
}

const defaultAdminPageConfig: AdminPageConfig = {
  title: '',
  subtitle: '',
  breadcrumbs: [],
  backUrl: '',
  searchPlaceholder: '',
  searchQuery: '',
  actionLabel: '',
  actionHref: '',
}

function applyAdminPageConfig(config: AdminPageConfig) {
  const pageTitle = useState<string>('admin-page-title', () => '')
  const pageSubtitle = useState<string>('admin-page-subtitle', () => '')
  const pageBreadcrumbs = useState<Breadcrumb[]>('admin-page-breadcrumbs', () => [])
  const backUrl = useState<string>('admin-back-url', () => '')
  const searchPlaceholder = useState<string>('admin-search-placeholder', () => '')
  const searchQuery = useState<string>('admin-search-query', () => '')
  const actionLabel = useState<string>('admin-action-label', () => '')
  const actionHref = useState<string>('admin-action-href', () => '')

  pageTitle.value = config.title
  pageSubtitle.value = config.subtitle ?? ''
  pageBreadcrumbs.value = [...(config.breadcrumbs ?? [])]
  backUrl.value = config.backUrl ?? ''
  searchPlaceholder.value = config.searchPlaceholder ?? ''
  searchQuery.value = config.searchQuery ?? ''
  actionLabel.value = config.actionLabel ?? ''
  actionHref.value = config.actionHref ?? ''
}

export function resetAdminPage() {
  applyAdminPageConfig(defaultAdminPageConfig)
}

/**
 * Composable for admin pages to configure the sticky top bar in the admin layout.
 */
export function useAdminPage(config?: Partial<AdminPageConfig>) {
  const pageTitle = useState<string>('admin-page-title', () => '')
  const pageSubtitle = useState<string>('admin-page-subtitle', () => '')
  const pageBreadcrumbs = useState<Breadcrumb[]>('admin-page-breadcrumbs', () => [])
  const backUrl = useState<string>('admin-back-url', () => '')
  const searchPlaceholder = useState<string>('admin-search-placeholder', () => '')
  const searchQuery = useState<string>('admin-search-query', () => '')
  const actionLabel = useState<string>('admin-action-label', () => '')
  const actionHref = useState<string>('admin-action-href', () => '')
  const ownerId = useState<string>('admin-page-owner-id', () => '')

  if (config) {
    const instanceId = `admin-page-${Math.random().toString(36).slice(2, 10)}`
    const resolvedConfig: AdminPageConfig = {
      ...defaultAdminPageConfig,
      ...config,
      title: config.title ?? '',
    }

    ownerId.value = instanceId
    applyAdminPageConfig(resolvedConfig)

    onBeforeUnmount(() => {
      if (ownerId.value === instanceId) {
        ownerId.value = ''
        resetAdminPage()
      }
    })
  }

  return {
    pageTitle,
    pageSubtitle,
    pageBreadcrumbs,
    backUrl,
    searchPlaceholder,
    searchQuery,
    actionLabel,
    actionHref,
  }
}
