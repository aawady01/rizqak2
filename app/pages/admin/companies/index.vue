<script setup lang="ts">
import type { AdminColumn } from '~/types/admin'

definePageMeta({
  layout: 'admin',
})

const defaultColumns: AdminColumn[] = [
  { key: 'name', label: 'الشركة', sortable: true, width: 200 },
  { key: 'industry', label: 'مجال العمل', sortable: true, width: 150 },
  { key: 'country', label: 'الدولة', sortable: true, width: 130 },
  { key: 'jobs_count', label: 'الوظائف النشطة', sortable: true, width: 150 },
  { key: 'status', label: 'الحالة', sortable: true, width: 100 },
]

const {
  columns, columnsReady, totalMinWidth, isResizing, resizingColIndex,
  dragSourceIndex, dragOverIndex,
  onResizeStart, onDragStart, onDragOver, onDragLeave, onDrop, onDragEnd,
  getStatusConfig, getCellValue,
  searchQuery, selectAll, currentPage,
} = useAdminTable({
  storageKey: 'admin-companies-columns',
  defaultColumns,
})

// Mock company data
const companies = ref([
  { id: 1, name: 'حلول التقنية', industry: 'تقنية المعلومات', country: 'السعودية 🇸🇦', jobs_count: 12, status: 'active' },
  { id: 2, name: 'مجموعة إبداع', industry: 'تسويق وإعلان', country: 'السعودية 🇸🇦', jobs_count: 5, status: 'active' },
  { id: 3, name: 'المصرف العربي', industry: 'بنوك ومالية', country: 'الإمارات 🇦🇪', jobs_count: 24, status: 'review' },
  { id: 4, name: 'تطبيقات مصر', industry: 'تطوير برمجيات', country: 'مصر 🇪🇬', jobs_count: 8, status: 'active' },
  { id: 5, name: 'مواهب الخليج', industry: 'موارد بشرية', country: 'قطر 🇶🇦', jobs_count: 0, status: 'closed' },
])

const selectedCompanies = ref<number[]>([])
</script>

<template>
  <AdminDataGrid
    v-model:selected="selectedCompanies"
    :table="{
      columns, columnsReady, totalMinWidth, isResizing, resizingColIndex,
      dragSourceIndex, dragOverIndex, onResizeStart, onDragStart, onDragOver,
      onDragLeave, onDrop, onDragEnd, getStatusConfig, getCellValue,
      searchQuery, selectAll, currentPage
    }"
    :items="companies"
    title="الشركات"
    items-label="شركة"
    :total-items="85"
  >
    <!-- Add Button -->
    <template #actions>
      <button class="px-6 py-2 bg-primary text-white hover:bg-primary-dark transition-colors text-sm font-bold flex items-center gap-2">
        <span class="material-symbols-outlined text-sm">add</span>
        إضافة شركة
      </button>
    </template>

    <!-- Industry -->
    <template #cell-industry="{ item }">
      <div class="flex items-center gap-1 text-foreground-muted">
        <span class="material-symbols-outlined text-[16px]">category</span>
        {{ item.industry }}
      </div>
    </template>

    <!-- Country -->
    <template #cell-country="{ item }">
      <span class="text-foreground-muted">{{ item.country }}</span>
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
