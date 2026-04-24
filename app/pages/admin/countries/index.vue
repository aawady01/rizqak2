<script setup lang="ts">
import type { AdminColumn } from '~/types/admin'

definePageMeta({
  layout: 'admin',
})

const defaultColumns: AdminColumn[] = [
  { key: 'name', label: 'الدولة', sortable: true, width: 250 },
  { key: 'code', label: 'رمز الدولة', sortable: true, width: 120 },
  { key: 'companies_count', label: 'الشركات المسجلة', sortable: true, width: 150 },
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
  storageKey: 'admin-countries-columns',
  defaultColumns,
})

// Mock country data
const countries = ref([
  { id: 1, name: 'المملكة العربية السعودية', code: 'SA 🇸🇦', companies_count: 145, jobs_count: 890, status: 'active' },
  { id: 2, name: 'الإمارات العربية المتحدة', code: 'AE 🇦🇪', companies_count: 89, jobs_count: 450, status: 'active' },
  { id: 3, name: 'جمهورية مصر العربية', code: 'EG 🇪🇬', companies_count: 120, jobs_count: 620, status: 'active' },
  { id: 4, name: 'دولة قطر', code: 'QA 🇶🇦', companies_count: 45, jobs_count: 210, status: 'active' },
  { id: 5, name: 'مملكة البحرين', code: 'BH 🇧🇭', companies_count: 23, jobs_count: 85, status: 'review' },
  { id: 6, name: 'سلطنة عمان', code: 'OM 🇴🇲', companies_count: 34, jobs_count: 120, status: 'active' },
])

const selectedCountries = ref<number[]>([])
</script>

<template>
  <AdminDataGrid
    v-model:selected="selectedCountries"
    :table="{
      columns, columnsReady, totalMinWidth, isResizing, resizingColIndex,
      dragSourceIndex, dragOverIndex, onResizeStart, onDragStart, onDragOver,
      onDragLeave, onDrop, onDragEnd, getStatusConfig, getCellValue,
      searchQuery, selectAll, currentPage
    }"
    :items="countries"
    title="الدول والمناطق"
    items-label="دولة"
    :total-items="22"
  >
    <!-- Add Button -->
    <template #actions>
      <button class="px-6 py-2 bg-primary text-white hover:bg-primary-dark transition-colors text-sm font-bold flex items-center gap-2">
        <span class="material-symbols-outlined text-sm">add</span>
        إضافة دولة
      </button>
    </template>

    <!-- Code -->
    <template #cell-code="{ item }">
      {{ item.code }}
    </template>

    <!-- Companies Count -->
    <template #cell-companies_count="{ item }">
      <div class="flex items-center gap-1 font-bold text-foreground-muted">
        <span class="material-symbols-outlined text-[16px]">business</span>
        {{ item.companies_count }}
      </div>
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
