<script setup lang="ts">
import type { AdminColumn } from '~/types/admin'

definePageMeta({ layout: 'admin' })

const defaultColumns: AdminColumn[] = [
  { key: 'name', label: 'المجال', sortable: true, width: 250 },
  { key: 'slug', label: 'الرابط (Slug)', sortable: true, width: 150 },
  { key: 'jobs_count', label: 'الوظائف المرتبطة', sortable: true, width: 150 },
  { key: 'status', label: 'الحالة', sortable: true, width: 100 },
]

const {
  columns, columnsReady, totalMinWidth, isResizing, resizingColIndex,
  dragSourceIndex, dragOverIndex,
  onResizeStart, onDragStart, onDragOver, onDragLeave, onDrop, onDragEnd,
  getStatusConfig, getCellValue, searchQuery, selectAll, currentPage,
} = useAdminTable({ storageKey: 'admin-fields-columns', defaultColumns })

const fields = ref([
  { id: 1, name: 'تطوير البرمجيات', slug: 'software-development', jobs_count: 340, status: 'active' },
  { id: 2, name: 'التصميم الجرافيكي', slug: 'graphic-design', jobs_count: 150, status: 'active' },
  { id: 3, name: 'التسويق الرقمي', slug: 'digital-marketing', jobs_count: 220, status: 'active' },
  { id: 4, name: 'المبيعات', slug: 'sales', jobs_count: 450, status: 'active' },
  { id: 5, name: 'الموارد البشرية', slug: 'human-resources', jobs_count: 85, status: 'review' },
  { id: 6, name: 'الذكاء الاصطناعي', slug: 'artificial-intelligence', jobs_count: 120, status: 'active' },
])

const selectedFields = ref<number[]>([])
</script>

<template>
  <AdminDataGrid
    v-model:selected="selectedFields"
    :table="{
      columns, columnsReady, totalMinWidth, isResizing, resizingColIndex,
      dragSourceIndex, dragOverIndex, onResizeStart, onDragStart, onDragOver,
      onDragLeave, onDrop, onDragEnd, getStatusConfig, getCellValue,
      searchQuery, selectAll, currentPage
    }"
    :items="fields"
    title="مجالات العمل"
    items-label="مجال"
    :total-items="15"
  >
    <!-- Add Button -->
    <template #actions>
      <button class="px-6 py-2 bg-primary text-white hover:bg-primary-dark transition-colors text-sm font-bold flex items-center gap-2">
        <span class="material-symbols-outlined text-sm">add</span>
        إضافة مجال
      </button>
    </template>

    <!-- Slug -->
    <template #cell-slug="{ item }">
      <span class="text-foreground-muted text-xs font-mono">{{ item.slug }}</span>
    </template>

    <!-- Jobs Count -->
    <template #cell-jobs_count="{ item }">
      <div class="flex items-center gap-1 font-bold">
        <span class="material-symbols-outlined text-[16px] text-primary">work</span>
        {{ item.jobs_count }}
      </div>
    </template>

    <!-- Status -->
    <template #cell-status="{ item }">
      <span
        :class="[
          'inline-flex items-center gap-1 px-2 py-1 text-xs font-bold',
          getStatusConfig(item.status).classes,
        ]"
      >
        <span class="material-symbols-outlined text-[14px]">{{ getStatusConfig(item.status).icon }}</span>
        {{ getStatusConfig(item.status).label }}
      </span>
    </template>
  </AdminDataGrid>
</template>
