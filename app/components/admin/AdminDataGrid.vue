<script setup lang="ts">
import type { AdminColumn } from '~/types/admin'

const props = defineProps<{
  table: any
  items: any[]
  title: string
  totalItems: number
  itemsLabel: string
}>()

const selected = defineModel<number[]>('selected', { default: () => [] })

function toggleSelectAll() {
  if (props.table.selectAll) {
    selected.value = props.items.map((j: any) => j.id)
  } else {
    selected.value = []
  }
}
</script>

<template>
  <div class="flex flex-col h-full">
    <!-- TopAppBar -->
    <header class="flex items-center w-full px-6 h-[72px] border-b border-primary/20 bg-white text-right shrink-0">
      <div class="flex items-center gap-4">
        <h2 class="text-xl font-bold text-primary">{{ title }}</h2>
        <span class="text-lg font-bold bg-primary/10 text-primary px-3 py-1">{{ totalItems }} {{ itemsLabel }}</span>
      </div>
      <div class="flex items-center mr-auto gap-4">
        <!-- Search -->
        <div class="relative hidden md:block">
          <span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-foreground-subtle text-sm">search</span>
          <input
            v-model="table.searchQuery"
            class="pl-4 pr-10 py-2 border border-border bg-background text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-64 text-sm font-normal"
            placeholder="بحث..."
            type="text"
          >
        </div>
        <!-- Add Button Slot -->
        <slot name="actions" />
        
        <!-- Export Button -->
        <button class="text-primary hover:underline transition-colors text-sm font-bold flex items-center gap-1">
          <span class="material-symbols-outlined text-sm">download</span>
          تصدير
        </button>
      </div>
    </header>

    <!-- Main Canvas -->
    <main class="flex-1 flex flex-col bg-background overflow-hidden min-w-0 min-h-0">
      <!-- Data Table Container -->
      <div class="w-full flex-1 overflow-x-scroll overflow-y-auto custom-scrollbar min-h-0 transition-opacity duration-150" :class="table.columnsReady ? 'opacity-100' : 'opacity-0'" dir="rtl">
        <table class="w-full text-right text-sm table-fixed" :style="{ minWidth: `${table.totalMinWidth}px` }">
          <colgroup>
            <col style="width: 48px">
            <col v-for="col in table.columns" :key="col.key" :style="{ width: `${col.width}px` }">
          </colgroup>

          <!-- Table Head -->
          <thead class="bg-surface-alt border-b border-primary/20 text-foreground-muted font-bold sticky top-0 z-10">
            <tr>
              <!-- Checkbox Column -->
              <th class="px-4 py-3 whitespace-nowrap w-12 text-center border-l border-primary/10">
                <input
                  v-model="table.selectAll"
                  class="border-border text-primary focus:ring-primary"
                  type="checkbox"
                  @change="toggleSelectAll"
                >
              </th>

              <!-- Data Columns -->
              <th
                v-for="(col, colIdx) in table.columns"
                :key="col.key"
                :draggable="!table.isResizing"
                :class="[
                  'group relative px-4 py-3 whitespace-nowrap transition-colors select-none',
                  col.key !== 'status' ? 'border-l border-primary/10' : '',
                  table.dragOverIndex === colIdx && table.dragSourceIndex !== colIdx ? 'bg-primary/10' : '',
                  table.dragSourceIndex === colIdx ? 'opacity-50' : '',
                  table.isResizing ? '' : 'cursor-grab active:cursor-grabbing',
                ]"
                @dragstart="table.onDragStart($event, colIdx)"
                @dragover="table.onDragOver($event, colIdx)"
                @dragleave="table.onDragLeave"
                @drop="table.onDrop($event, colIdx)"
                @dragend="table.onDragEnd"
              >
                <div class="flex items-center">
                  {{ col.label }}
                </div>

                <!-- Resize Handle -->
                <div
                  class="absolute top-0 left-0 w-2 h-full cursor-col-resize z-20 hover:bg-primary/40 transition-colors"
                  :class="table.resizingColIndex === colIdx ? 'bg-primary/50' : 'bg-transparent'"
                  @pointerdown="table.onResizeStart($event, colIdx)"
                />
              </th>
            </tr>
          </thead>

          <!-- Table Body -->
          <tbody class="divide-y divide-primary/10 text-foreground bg-background">
            <tr
              v-for="(item, idx) in items"
              :key="item.id"
              :class="[
                'hover:bg-neutral-200 transition-colors',
                Number(idx) % 2 === 0 ? 'bg-white' : 'bg-admin-row-alt',
              ]"
            >
              <!-- Checkbox -->
              <td class="px-4 py-2 whitespace-nowrap text-center border-l border-primary/10">
                <input
                  v-model="selected"
                  :value="item.id"
                  class="border-border text-primary focus:ring-primary"
                  type="checkbox"
                >
              </td>

              <!-- Dynamic columns -->
              <td
                v-for="col in table.columns"
                :key="col.key"
                :class="[
                  'px-4 py-2 whitespace-nowrap overflow-hidden text-ellipsis',
                  col.key !== 'status' ? 'border-l border-primary/10' : '',
                  col.key === 'title' || col.key === 'name' ? 'font-bold' : '',
                ]"
              >
                <!-- Allow parent to render custom content for specific keys -->
                <slot :name="`cell-${col.key}`" :item="item" :col="col">
                  <!-- Fallback: Just render the cell value -->
                  {{ table.getCellValue(item, col.key) }}
                </slot>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex justify-between items-center px-6 h-[72px] border-t border-primary/20 bg-surface-alt text-sm text-foreground-muted shrink-0 w-full">
        <div>
          عرض 1 إلى {{ items.length }} من {{ totalItems }} {{ itemsLabel }}
        </div>
        <div class="flex gap-2">
          <button class="px-3 py-1 border border-border hover:bg-neutral-200 disabled:opacity-50" disabled>
            السابق
          </button>
          <button
            v-for="page in [1, 2, 3]"
            :key="page"
            :class="[
              'px-3 py-1 border',
              table.currentPage === page
                ? 'bg-primary text-white border-primary'
                : 'border-border hover:bg-neutral-200',
            ]"
            @click="table.currentPage = page"
          >
            {{ page }}
          </button>
          <span class="px-2 py-1">...</span>
          <button class="px-3 py-1 border border-border hover:bg-neutral-200">
            التالي
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Prevent text selection during resize */
.table-fixed {
  table-layout: fixed;
}
</style>
