/**
 * Admin Dashboard — Shared Types
 *
 * Centralised type definitions for all admin data-table pages.
 * Consumed by `useAdminTable` composable and individual page templates.
 */

/** Column definition used by every admin data-table. */
export interface AdminColumn {
  key: string
  label: string
  sortable: boolean
  /** Width in pixels, persisted to localStorage. */
  width: number
}

/** Minimal shape stored in localStorage (key + width only). */
export type SavedColumn = Pick<AdminColumn, 'key' | 'width'>

/** Status badge configuration returned by `getStatusConfig()`. */
export interface StatusConfig {
  label: string
  icon: string
  classes: string
}
