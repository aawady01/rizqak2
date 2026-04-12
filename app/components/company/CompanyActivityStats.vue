<script setup lang="ts">
import { BarChart3 } from "lucide-vue-next";
import type { CompanyStats } from "~/types/company";

defineProps<{
  stats: CompanyStats
}>()
</script>

<template>
  <div class="space-y-section">
    <div>
      <div class="section-heading">
        <div class="section-heading__title">
        <BarChart3 class="size-6 text-primary" :stroke-width="2" />
        <h3 class="text-ds-h4 font-bold text-foreground">إحصائيات النشاط</h3>
        </div>
      </div>
      <div class="surface-panel rounded-none p-content">
        <!-- Stats Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 bg-border gap-px rounded-none overflow-hidden">
          <div class="p-content flex flex-col items-center justify-center text-center gap-element bg-surface">
            <span class="text-ds-caption-l text-foreground-muted font-normal">إجمالي</span>
            <span class="text-ds-caption-l text-foreground-muted font-normal">الوظائف</span>
            <span class="text-ds-h4 font-bold text-foreground mt-element">{{ stats.totalJobs }}</span>
            <span class="text-ds-h4 font-bold text-foreground">وظيفة</span>
          </div>
          <div class="p-content flex flex-col items-center justify-center text-center gap-element bg-surface">
            <span class="text-ds-caption-l text-foreground-muted font-normal">مشاهدات</span>
            <span class="text-ds-caption-l text-foreground-muted font-normal">الوظائف</span>
            <span class="text-ds-h4 font-bold text-foreground mt-element">{{ stats.jobViews }}</span>
            <span class="text-ds-h4 font-bold text-foreground">مشاهدة</span>
          </div>
          <div class="p-content flex flex-col items-center justify-center text-center gap-element bg-surface">
            <span class="text-ds-caption-l text-foreground-muted font-normal">زيارات</span>
            <span class="text-ds-caption-l text-foreground-muted font-normal">البروفايل</span>
            <span class="text-ds-h4 font-bold text-foreground mt-element">{{ stats.profileVisits }}</span>
            <span class="text-ds-h4 font-bold text-foreground">زيارة</span>
          </div>
          <div class="p-content flex flex-col items-center justify-center text-center gap-element bg-surface">
            <span class="text-ds-caption-l text-foreground-muted font-normal">إجمالي</span>
            <span class="text-ds-caption-l text-foreground-muted font-normal">المتابعين</span>
            <span class="text-ds-h4 font-bold text-primary mt-element">{{ stats.followers }}</span>
            <span class="text-ds-h4 font-bold text-primary">متابع</span>
          </div>
          <div class="p-content flex flex-col items-center justify-center text-center gap-element bg-surface">
            <span class="text-ds-caption-l text-foreground-muted font-normal">إجمالي</span>
            <span class="text-ds-caption-l text-foreground-muted font-normal">المتقدمين</span>
            <span class="text-ds-h4 font-bold text-foreground mt-element">{{ stats.applicants }}</span>
            <span class="text-ds-h4 font-bold text-foreground">متقدم</span>
          </div>
          <div class="p-content flex flex-col items-center justify-center text-center gap-element bg-surface">
            <span class="text-ds-caption-l text-foreground-muted font-normal">متوسط النشر</span>
            <span class="text-ds-caption-l text-foreground-muted font-normal">الشهري</span>
            <span class="text-ds-h4 font-bold text-foreground mt-element">{{ stats.monthlyAvg }}</span>
            <span class="text-ds-h4 font-bold text-foreground">وظيفة</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
