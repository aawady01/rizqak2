<script setup lang="ts">
import { Building2 } from "lucide-vue-next";
import BaseChip from "~/shared/components/base/BaseChip.vue";

defineProps<{
  description: string
  classification: string
  foundedYear: string
  experienceYears: string
  size: string
}>()
</script>

<template>
  <div>
    <div class="section-heading">
      <div class="section-heading__title">
      <Building2 class="size-5 text-primary" :stroke-width="2" />
      <h3 class="text-ds-h4 font-bold text-foreground">عن الشركة</h3>
      </div>
    </div>
      <div class="surface-panel p-content">
        <BaseDescription tag="div" class="mb-element"><p>{{ description }}</p></BaseDescription>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-x-section gap-y-content pt-element border-t border-border">
        <div class="flex flex-col gap-element">
          <span class="text-ds-caption-l font-normal text-foreground-muted">تصنيف الشركة</span>
          <span class="text-ds-body-m font-bold text-foreground">{{ classification }}</span>
        </div>
        <div class="flex flex-col gap-element">
          <span class="text-ds-caption-l font-normal text-foreground-muted">تاريخ التأسيس / سنوات الخبرة</span>
          <div class="flex items-center gap-element">
            <span class="text-ds-body-m font-bold text-foreground">{{ foundedYear }}</span>
            <BaseChip variant="primary" size="md">{{ experienceYears }}</BaseChip>
          </div>
        </div>
        <div class="flex flex-col gap-element">
          <span class="text-ds-caption-l font-normal text-foreground-muted">حجم المؤسسة</span>
          <span class="text-ds-body-m font-bold text-foreground">{{ size }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
