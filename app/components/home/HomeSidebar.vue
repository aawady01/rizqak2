<script setup lang="ts">
import { SlidersHorizontal } from "lucide-vue-next";
import TreeFilterSection from "../filters/TreeFilterSection.vue";
import SimpleFilter from "../filters/SimpleFilter.vue";
import GenderFilter from "../filters/GenderFilter.vue";
import BaseTypography from "~/shared/components/base/BaseTypography.vue";
import {
  fieldFilterData,
  locationFilterData,
  salaryFilters,
  experienceFilters,
} from "~/shared/utils/mockData";

interface Props {
  totalResults?: number;
}

withDefaults(defineProps<Props>(), {
  totalResults: 145,
});

defineEmits<{
  "clear-filters": [];
}>();

const gender = ref("all");
</script>

<template>
  <aside class="order-1">
    <div class="sticky top-20 space-y-content">
      <!-- Section Header — ds pattern -->
      <div class="flex justify-between items-center gap-content">
        <BaseTypography
          variant="h3"
          tag="h2"
          weight="bold"
          color="text-foreground"
          class="flex items-center gap-compact"
        >
          <SlidersHorizontal class="size-5 text-primary" :stroke-width="2" aria-hidden="true" />
          {{ $t('sidebar.title') }}
        </BaseTypography>
        <button
          class="cursor-pointer group hover:underline outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          @click="$emit('clear-filters')"
        >
          <BaseTypography
            variant="caption-l"
            weight="medium"
            color="text-primary"
            class="group-hover:text-primary-dark transition-colors"
          >
            {{ $t('common.clearAll') }}
          </BaseTypography>
        </button>
      </div>

      <!-- Filter Card — p-content -->
      <div class="surface-panel p-content">
        <div class="space-y-6 divide-y divide-separator">
          <div>
            <TreeFilterSection
              :section="fieldFilterData"
              searchable
              url-key="field"
            />
          </div>

          <div class="pt-4">
            <TreeFilterSection
              :section="locationFilterData"
              searchable
              url-key="location"
            />
          </div>

          <div class="pt-4">
            <SimpleFilter
              :title="$t('sidebar.salaryFilter.title')"
              :total-label="$t('sidebar.salaryFilter.totalLabel')"
              :total-count="4"
              :total-jobs="2340"
              :items="salaryFilters"
              type="checkbox"
              searchable
              url-key="salary"
            />
          </div>

          <div class="pt-4">
            <SimpleFilter
              :title="$t('sidebar.experienceFilter.title')"
              :total-label="$t('sidebar.experienceFilter.totalLabel')"
              :total-count="4"
              :total-jobs="2340"
              :items="experienceFilters"
              type="checkbox"
              searchable
              url-key="experience"
            />
          </div>

          <div class="pt-4">
            <GenderFilter v-model:selected="gender" query-key="gender" />
          </div>

          <div class="pt-4">
            <button
              class="w-full py-2.5 bg-primary hover:bg-primary-dark text-white transition-colors text-ds-body-r font-semibold outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 cursor-pointer"
            >
              {{ $t('sidebar.applyButton') }} ({{ totalResults }} {{ $t('sidebar.jobCount') }})
            </button>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>
