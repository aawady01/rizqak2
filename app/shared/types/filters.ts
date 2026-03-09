/**
 * Global Design System Filter Data Types
 * These definitions strictly decouple the UI completely from the application Domain (like 'Job', 'Sector').
 */

export interface BaseGenericFilterItem<T = string> {
  id: T
  label: string
  /**
   * The count of items attached to this filter (useful for search/categories)
   */
  count?: number
  /**
   * Total number of items total (e.g. jobs attached to this category)
   */
  totalCount?: number
  /**
   * Indicates if this specific node is currently checked/selected
   */
  isChecked?: boolean
  /**
   * For hierarchical filters, whether this specific branch is expanded to show children
   */
  isExpanded?: boolean
  
  /**
   * Recursively nest further filter items to build infinite trees
   */
  children?: BaseGenericFilterItem<T>[]
  
  /**
   * An Escape-Hatch extra data object just in case the smart component needs to attach domain-specific data
   */
  meta?: Record<string, unknown>
}

// Emitting Payload standard for check toggles
export interface BaseFilterToggleEvent<T = string> {
  id: T
  checked: boolean
}
