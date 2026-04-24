<script setup lang="ts">
import type { AdminColumn } from '~/types/admin'

definePageMeta({
  layout: 'admin',
})

// Column definitions (only data — logic lives in useAdminTable)
const defaultColumns: AdminColumn[] = [
  { key: 'title', label: 'المسمى الوظيفي', sortable: true, width: 350 },
  { key: 'company', label: 'الشركة الناشرة', sortable: true, width: 250 },
  { key: 'country', label: 'الدولة', sortable: true, width: 200 },
  { key: 'stats', label: 'إحصائيات', sortable: true, width: 300 },
  { key: 'day', label: 'اليوم', sortable: true, width: 180 },
  { key: 'time', label: 'وقت النشر', sortable: true, width: 150 },
  { key: 'date', label: 'تاريخ النشر', sortable: true, width: 200 },
  { key: 'status', label: 'الحالة', sortable: true, width: 200 },
]

const {
  columns, columnsReady, totalMinWidth, isResizing, resizingColIndex,
  dragSourceIndex, dragOverIndex,
  onResizeStart, onDragStart, onDragOver, onDragLeave, onDrop, onDragEnd,
  getStatusConfig, getCellValue,
  searchQuery, selectAll, currentPage,
} = useAdminTable({
  storageKey: 'admin-jobs-columns',
  defaultColumns,
})

// Mock job data
const jobs = ref([
  {
    id: 1,
    title: 'مهندس برمجيات أول',
    company: 'حلول التقنية',
    country: 'السعودية 🇸🇦',
    views: '1,240',
    clicks: '320',
    reviews: '45',
    day: 'الأربعاء',
    time: '10:30 ص',
    date: '2023-10-25',
    status: 'active',
  },
  {
    id: 2,
    title: 'مدير تسويق رقمي',
    company: 'مجموعة إبداع',
    country: 'السعودية 🇸🇦',
    views: '850',
    clicks: '210',
    reviews: '12',
    day: 'الجمعة',
    time: '09:15 ص',
    date: '2023-10-20',
    status: 'active',
  },
  {
    id: 3,
    title: 'محلل مالي',
    company: 'المصرف العربي',
    country: 'السعودية 🇸🇦',
    views: '3,420',
    clicks: '890',
    reviews: '89',
    day: 'الجمعة',
    time: '01:45 م',
    date: '2023-09-15',
    status: 'closed',
  },
  {
    id: 4,
    title: 'مصمم واجهات مستخدم',
    company: 'ديزاين لاب',
    country: 'الإمارات 🇦🇪',
    views: '5,102',
    clicks: '1,200',
    reviews: '150',
    day: 'الأربعاء',
    time: '08:00 ص',
    date: '2023-11-01',
    status: 'active',
  },
  {
    id: 5,
    title: 'مطور تطبيقات جوال',
    company: 'تطبيقات مصر',
    country: 'مصر 🇪🇬',
    views: '2,150',
    clicks: '420',
    reviews: '35',
    day: 'الأحد',
    time: '11:20 ص',
    date: '2023-11-05',
    status: 'review',
  },
  {
    id: 6,
    title: 'أخصائي موارد بشرية',
    company: 'مواهب الخليج',
    country: 'قطر 🇶🇦',
    views: '920',
    clicks: '180',
    reviews: '8',
    day: 'الجمعة',
    time: '03:50 م',
    date: '2023-11-10',
    status: 'active',
  },
  {
    id: 7,
    title: 'مدير مبيعات إقليمي',
    company: 'سيلز بروكيرز',
    country: 'البحرين 🇧🇭',
    views: '1,840',
    clicks: '390',
    reviews: '52',
    day: 'السبت',
    time: '12:05 م',
    date: '2023-10-28',
    status: 'closed',
  },
  {
    id: 8,
    title: 'مهندس بيانات',
    company: 'داتا تيك',
    country: 'السعودية 🇸🇦',
    views: '4,200',
    clicks: '950',
    reviews: '110',
    day: 'الأحد',
    time: '02:30 م',
    date: '2023-11-12',
    status: 'active',
  },
  {
    id: 9,
    title: 'كاتب محتوى إبداعي',
    company: 'محتوى عمان',
    country: 'عمان 🇴🇲',
    views: '1,050',
    clicks: '260',
    reviews: '18',
    day: 'الأربعاء',
    time: '09:40 ص',
    date: '2023-11-08',
    status: 'active',
  },
  {
    id: 10,
    title: 'محاسب أول',
    company: 'المحاسبون المتحدون',
    country: 'الكويت 🇰🇼',
    views: '2,800',
    clicks: '610',
    reviews: '75',
    day: 'الأحد',
    time: '04:15 م',
    date: '2023-10-15',
    status: 'closed',
  },
  {
    id: 11,
    title: 'مهندس أمن سيبراني',
    company: 'سايبر سيلد',
    country: 'السعودية 🇸🇦',
    views: '3,900',
    clicks: '880',
    reviews: '92',
    day: 'الثلاثاء',
    time: '11:55 ص',
    date: '2023-11-14',
    status: 'active',
  },
  {
    id: 12,
    title: 'مدير مشروع تقني',
    company: 'تك بروجكتس',
    country: 'الإمارات 🇦🇪',
    views: '4,500',
    clicks: '1,100',
    reviews: '130',
    day: 'الخميس',
    time: '08:45 ص',
    date: '2023-11-02',
    status: 'active',
  },
  {
    id: 13,
    title: 'محلل أعمال',
    company: 'بيزنس أنالايز',
    country: 'الأردن 🇯🇴',
    views: '1,600',
    clicks: '340',
    reviews: '41',
    day: 'الثلاثاء',
    time: '01:10 م',
    date: '2023-11-07',
    status: 'review',
  },
  {
    id: 14,
    title: 'أخصائي تسويق شبكات',
    company: 'شبكات التسويق',
    country: 'السعودية 🇸🇦',
    views: '2,300',
    clicks: '550',
    reviews: '68',
    day: 'الأحد',
    time: '10:05 ص',
    date: '2023-10-22',
    status: 'closed',
  },
  {
    id: 15,
    title: 'مهندس ذكاء اصطناعي',
    company: 'المستقبل للذكاء',
    country: 'الإمارات 🇦🇪',
    views: '6,800',
    clicks: '1,800',
    reviews: '210',
    day: 'الأربعاء',
    time: '05:30 م',
    date: '2023-11-15',
    status: 'active',
  },
])

const selectedJobs = ref<number[]>([])
</script>

<template>
  <AdminDataGrid
    v-model:selected="selectedJobs"
    :table="{
      columns, columnsReady, totalMinWidth, isResizing, resizingColIndex,
      dragSourceIndex, dragOverIndex, onResizeStart, onDragStart, onDragOver,
      onDragLeave, onDrop, onDragEnd, getStatusConfig, getCellValue,
      searchQuery, selectAll, currentPage
    }"
    :items="jobs"
    title="إدارة الوظائف"
    items-label="وظيفة"
    :total-items="1248"
  >
    <!-- Add Job Button -->
    <template #actions>
      <button class="px-6 py-2 bg-primary text-white hover:bg-primary-dark transition-colors text-sm font-bold flex items-center gap-2">
        <span class="material-symbols-outlined text-sm">add</span>
        إضافة وظيفة
      </button>
    </template>

    <!-- Company -->
    <template #cell-company="{ item }">
      <span class="text-foreground-muted">{{ item.company }}</span>
    </template>

    <!-- Country -->
    <template #cell-country="{ item }">
      <span class="text-foreground-muted">{{ item.country }}</span>
    </template>

    <!-- Stats -->
    <template #cell-stats="{ item }">
      <div class="flex gap-4 text-xs">
        <span class="flex items-center gap-1" title="مشاهدات">
          <span class="material-symbols-outlined text-[14px] text-primary">visibility</span>
          {{ item.views }}
        </span>
        <span class="flex items-center gap-1" title="النقرات">
          <span class="material-symbols-outlined text-[14px] text-primary">touch_app</span>
          {{ item.clicks }}
        </span>
        <span class="flex items-center gap-1" title="مراجعات">
          <span class="material-symbols-outlined text-[14px] text-primary">reviews</span>
          {{ item.reviews }}
        </span>
      </div>
    </template>

    <!-- Day -->
    <template #cell-day="{ item }">
      {{ item.day }}
    </template>

    <!-- Time -->
    <template #cell-time="{ item }">
      <span class="text-foreground-muted">{{ item.time }}</span>
    </template>

    <!-- Date -->
    <template #cell-date="{ item }">
      <span class="text-foreground-muted">{{ item.date }}</span>
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

<style scoped>
/* Prevent text selection during resize */
.table-fixed {
  table-layout: fixed;
}
</style>
