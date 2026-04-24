/**
 * useAdminTable — Shared composable for admin data-table pages.
 *
 * Encapsulates:
 *  • Column resize (pointer-based state machine)
 *  • Column drag-reorder (HTML5 Drag API)
 *  • localStorage persistence with anti-flash (columnsReady)
 *  • Status badge config
 *  • Select-all / search / pagination state
 *
 * Usage:
 *   const { columns, columnsReady, isResizing, ... } = useAdminTable({
 *     storageKey: 'admin-jobs-columns',
 *     defaultColumns: [{ key: 'title', label: '…', sortable: true, width: 350 }],
 *   })
 */
import type { AdminColumn, SavedColumn, StatusConfig } from '~/types/admin'

export interface UseAdminTableOptions {
  /** localStorage key for persisting column order & widths. */
  storageKey: string
  /** Default column definitions (used on first visit). */
  defaultColumns: AdminColumn[]
}

export function useAdminTable(options: UseAdminTableOptions) {
  const { storageKey, defaultColumns } = options

  // ──────────────────────────────────────────────
  // Columns (reactive, persisted)
  // ──────────────────────────────────────────────
  const columns = ref<AdminColumn[]>([...defaultColumns])
  const columnsReady = ref(false)

  function loadFromStorage(): AdminColumn[] | null {
    if (typeof window === 'undefined') return null
    try {
      const raw = localStorage.getItem(storageKey)
      if (!raw) return null
      const saved = JSON.parse(raw) as SavedColumn[]
      if (!Array.isArray(saved) || saved.length === 0) return null

      const defaultMap = new Map(defaultColumns.map((c: AdminColumn) => [c.key, c]))
      const result: AdminColumn[] = []
      for (const s of saved) {
        const def = defaultMap.get(s.key)
        if (def) {
          result.push({ ...def, width: s.width })
          defaultMap.delete(s.key)
        }
      }
      // Append any new columns that didn't exist in the saved data
      for (const remaining of defaultMap.values()) {
        result.push(remaining)
      }
      return result
    }
    catch {
      return null
    }
  }

  function saveToStorage(): void {
    if (typeof window === 'undefined') return
    const toSave: SavedColumn[] = columns.value.map((c: AdminColumn) => ({
      key: c.key,
      width: c.width,
    }))
    localStorage.setItem(storageKey, JSON.stringify(toSave))
  }

  onMounted(() => {
    const saved = loadFromStorage()
    if (saved) {
      columns.value = saved
    }
    nextTick(() => {
      columnsReady.value = true
    })
  })

  // ──────────────────────────────────────────────
  // Column Resizing (pointer-based)
  // ──────────────────────────────────────────────
  const isResizing = ref(false)
  const resizingColIndex = ref(-1)
  const resizeStartX = ref(0)
  const resizeStartWidth = ref(0)

  function onResizeStart(event: PointerEvent, colIndex: number): void {
    event.preventDefault()
    event.stopPropagation()
    isResizing.value = true
    resizingColIndex.value = colIndex
    resizeStartX.value = event.clientX
    resizeStartWidth.value = columns.value[colIndex].width

    document.addEventListener('pointermove', onResizeMove)
    document.addEventListener('pointerup', onResizeEnd)
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
  }

  function onResizeMove(event: PointerEvent): void {
    if (!isResizing.value || resizingColIndex.value < 0) return
    // RTL: dragging left increases width, dragging right decreases
    const delta = resizeStartX.value - event.clientX
    const newWidth = Math.max(60, resizeStartWidth.value + delta)
    columns.value[resizingColIndex.value].width = newWidth
  }

  function onResizeEnd(): void {
    isResizing.value = false
    resizingColIndex.value = -1
    document.removeEventListener('pointermove', onResizeMove)
    document.removeEventListener('pointerup', onResizeEnd)
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
    saveToStorage()
  }

  // ──────────────────────────────────────────────
  // Column Drag Reorder (HTML5 Drag API)
  // ──────────────────────────────────────────────
  const dragSourceIndex = ref(-1)
  const dragOverIndex = ref(-1)

  function onDragStart(event: DragEvent, colIndex: number): void {
    if (isResizing.value) {
      event.preventDefault()
      return
    }
    dragSourceIndex.value = colIndex
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('text/plain', String(colIndex))
    }
  }

  function onDragOver(event: DragEvent, colIndex: number): void {
    event.preventDefault()
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move'
    }
    dragOverIndex.value = colIndex
  }

  function onDragLeave(): void {
    dragOverIndex.value = -1
  }

  function onDrop(event: DragEvent, targetIndex: number): void {
    event.preventDefault()
    const sourceIndex = dragSourceIndex.value
    if (sourceIndex < 0 || sourceIndex === targetIndex) {
      resetDragState()
      return
    }
    const movedCol = columns.value.splice(sourceIndex, 1)[0]
    columns.value.splice(targetIndex, 0, movedCol)
    saveToStorage()
    resetDragState()
  }

  function onDragEnd(): void {
    resetDragState()
  }

  function resetDragState(): void {
    dragSourceIndex.value = -1
    dragOverIndex.value = -1
  }

  // ──────────────────────────────────────────────
  // Status Badge Config (shared across all tables)
  // ──────────────────────────────────────────────
  function getStatusConfig(status: string): StatusConfig {
    switch (status) {
      case 'active':
        return {
          label: 'نشط',
          icon: 'check_circle',
          classes: 'bg-primary/10 text-primary border border-primary/20',
        }
      case 'closed':
        return {
          label: 'مغلق',
          icon: 'block',
          classes: 'bg-surface-alt text-foreground-muted border border-border',
        }
      case 'review':
        return {
          label: 'مراجعة',
          icon: 'pending',
          classes: 'bg-amber-100 text-amber-800 border border-amber-300',
        }
      default:
        return {
          label: status,
          icon: 'help',
          classes: 'bg-surface-alt text-foreground-muted border border-border',
        }
    }
  }

  // ──────────────────────────────────────────────
  // Generic cell value accessor
  // ──────────────────────────────────────────────
  function getCellValue(row: Record<string, unknown>, key: string): unknown {
    return row[key] ?? ''
  }

  // ──────────────────────────────────────────────
  // Selection & pagination state
  // ──────────────────────────────────────────────
  const searchQuery = ref('')
  const selectAll = ref(false)
  const currentPage = ref(1)

  // Computed minimum table width (checkbox col + all data columns)
  const totalMinWidth = computed(() => {
    return 48 + columns.value.reduce((sum: number, c: AdminColumn) => sum + c.width, 0)
  })

  return {
    // Columns
    columns,
    columnsReady,
    totalMinWidth,
    saveToStorage,

    // Resize
    isResizing,
    resizingColIndex,
    onResizeStart,

    // Drag reorder
    dragSourceIndex,
    dragOverIndex,
    onDragStart,
    onDragOver,
    onDragLeave,
    onDrop,
    onDragEnd,

    // Helpers
    getStatusConfig,
    getCellValue,

    // Page state
    searchQuery,
    selectAll,
    currentPage,
  }
}
