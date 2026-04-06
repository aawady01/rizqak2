<script setup lang="ts">
import { Globe } from "lucide-vue-next";
import BaseFlag from "~/shared/components/base/BaseFlag.vue";
import type { CountryData } from "~/types/company";

defineProps<{
  countries: CountryData[]
}>()
</script>

<template>
  <div>
    <div class="flex items-center gap-2 mb-element px-compact">
      <Globe class="size-5 text-primary" :stroke-width="2" />
      <h4 class="text-ds-label-l font-bold text-foreground">أكثر الدول توظيفاً</h4>
    </div>

    <div class="surface-panel rounded-none p-content">
      <div class="space-y-section">
        <div v-for="country in countries" :key="country.name" class="flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 min-w-0">
              <BaseFlag :country-code="country.countryCode" size="sm" :alt="country.name" />
              <span class="text-ds-label-s font-semibold text-foreground-subtle truncate">{{ country.name }}</span>
            </div>
            <span class="text-ds-body-r font-bold text-foreground shrink-0 me-content">{{ country.jobs }} وظيفة</span>
          </div>
          <div class="w-full h-1.5 bg-surface-alt rounded-full overflow-hidden">
            <div class="h-full bg-primary rounded-full" :style="{ width: country.percentage + '%' }" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
