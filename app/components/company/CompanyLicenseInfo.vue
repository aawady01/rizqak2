<script setup lang="ts">
import { BadgeCheck } from "lucide-vue-next";
import type { LicenseData } from "~/types/company";

defineProps<{
  license: LicenseData
}>()
</script>

<template>
  <div>
    <div class="flex items-center gap-element mb-element">
      <BadgeCheck class="size-5 text-primary" :stroke-width="2" />
      <h3 class="text-ds-h4 font-bold text-foreground">بيانات الترخيص</h3>
    </div>
    <div class="surface-panel rounded-none p-content h-full flex flex-col justify-center">
      <div class="space-y-content">
        <div class="flex justify-between items-center py-element">
          <span class="text-foreground-muted font-normal text-ds-body-r">رقم الترخيص</span>
          <span class="text-ds-body-m font-bold text-foreground">{{ license.number }}</span>
        </div>
        <div class="flex justify-between items-center py-element">
          <span class="text-foreground-muted font-normal text-ds-body-r">جهة الإصدار</span>
          <span class="text-ds-body-m font-bold text-foreground">{{ license.issuer }}</span>
        </div>
        <div class="flex justify-between items-center py-element">
          <span class="text-foreground-muted font-normal text-ds-body-r">الحالة</span>
          <span class="text-success text-ds-caption-l font-bold">{{ license.status }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
