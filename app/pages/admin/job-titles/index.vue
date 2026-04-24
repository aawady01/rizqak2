<script setup lang="ts">
import type { AdminColumn } from '~/types/admin'

definePageMeta({ layout: 'admin' })

const defaultColumns: AdminColumn[] = [
  { key: 'title', label: 'المسمى الوظيفي', sortable: true, width: 250 },
  { key: 'field', label: 'المجال', sortable: true, width: 180 },
  { key: 'jobs_count', label: 'الوظائف النشطة', sortable: true, width: 150 },
  { key: 'status', label: 'الحالة', sortable: true, width: 100 },
]

const {
  columns, columnsReady, totalMinWidth, isResizing, resizingColIndex,
  dragSourceIndex, dragOverIndex,
  onResizeStart, onDragStart, onDragOver, onDragLeave, onDrop, onDragEnd,
  getStatusConfig, getCellValue, searchQuery, selectAll, currentPage,
} = useAdminTable({ storageKey: 'admin-job-titles-columns', defaultColumns })

const jobTitles = ref([
  { id: 1, title: 'مطور واجهات أمامية (Frontend Developer)', field: 'تطوير البرمجيات', jobs_count: 85, status: 'active' },
  { id: 2, title: 'مصمم واجهة مستخدم (UI/UX Designer)', field: 'التصميم الجرافيكي', jobs_count: 42, status: 'active' },
  { id: 3, title: 'أخصائي تسويق رقمي', field: 'التسويق الرقمي', jobs_count: 67, status: 'active' },
  { id: 4, title: 'مدير مبيعات إقليمي', field: 'المبيعات', jobs_count: 12, status: 'active' },
  { id: 5, title: 'مطور تطبيقات أندرويد', field: 'تطوير البرمجيات', jobs_count: 34, status: 'review' },
  { id: 6, title: 'مهندس بيانات', field: 'الذكاء الاصطناعي', jobs_count: 28, status: 'active' },
])

const selectedTitles = ref<number[]>([])
</script>

<template>
  <AdminDataGrid
    v-model:selected="selectedTitles"
    :table="{
      columns, columnsReady, totalMinWidth, isResizing, resizingColIndex,
      dragSourceIndex, dragOverIndex, onResizeStart, onDragStart, onDragOver,
      onDragLeave, onDrop, onDragEnd, getStatusConfig, getCellValue,
      searchQuery, selectAll, currentPage
    }"
    :items="jobTitles"
    title="المسميات الوظيفية"
    items-label="مسمى"
    :total-items="240"
  >
    <!-- Add Button -->
    <template #actions>
      <button class="px-6 py-2 bg-primary text-white hover:bg-primary-dark transition-colors text-sm font-bold flex items-center gap-2">
        <span class="material-symbols-outlined text-sm">add</span>
        إضافة مسمى
      </button>
    </template>

    <!-- Title -->
    <template #cell-title="{ item }">
      <span class="font-bold">{{ item.title }}</span>
    </template>

    <!-- Field -->
    <template #cell-field="{ item }">
      <div class="flex items-center gap-1 text-foreground-muted">
        <span class="material-symbols-outlined text-[16px]">category</span>
        {{ item.field }}
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
