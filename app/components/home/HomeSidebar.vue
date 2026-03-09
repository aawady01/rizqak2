<script setup lang="ts">
import { ref } from "vue";
import { SlidersHorizontal } from "lucide-vue-next";
import TreeFilterSection from "../filters/TreeFilterSection.vue";
import SimpleFilter from "../filters/SimpleFilter.vue";
import GenderFilter from "../filters/GenderFilter.vue";
import BaseTypography from "~/components/base/BaseTypography.vue";
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

const gender = ref("all");
</script>

<template>
  <aside class="order-1">
    <div class="sticky top-20 space-y-content">
      <!-- Section Header — ds pattern -->
      <div class="flex justify-between items-center">
        <BaseTypography
          variant="h3"
          weight="bold"
          color="text-foreground"
          class="flex items-center gap-compact"
        >
          <SlidersHorizontal class="w-5 h-5 text-primary" :stroke-width="2" />
          تصفية النتائج
        </BaseTypography>
        <button
          class="cursor-pointer group hover:underline"
          @click="$emit('clear-filters')"
        >
          <BaseTypography
            variant="caption-l"
            weight="medium"
            color="text-primary"
            class="group-hover:text-primary-dark transition-colors"
          >
            مسح الكل
          </BaseTypography>
        </button>
      </div>

      <!-- Filter Card — p-content -->
      <div class="bg-card p-content border border-border">
        <div class="space-y-6 divide-y divide-separator">
          <div>
            <TreeFilterSection
              :section="fieldFilterData"
              searchable
              url-key="field"
            />
          </div>

          <div class="pt-5">
            <TreeFilterSection
              :section="locationFilterData"
              searchable
              url-key="location"
            />
          </div>

          <div class="pt-5">
            <SimpleFilter
              title="الراتب المتوقع"
              totalLabel="كل الرواتب"
              :totalCount="4"
              :totalJobs="2340"
              :items="salaryFilters"
              type="checkbox"
              searchable
              url-key="salary"
            />
          </div>

          <div class="pt-5">
            <SimpleFilter
              title="سنوات الخبرة"
              totalLabel="كل المستويات"
              :totalCount="4"
              :totalJobs="2340"
              :items="experienceFilters"
              type="checkbox"
              searchable
              url-key="experience"
            />
          </div>

          <div class="pt-5">
            <GenderFilter v-model:selected="gender" query-key="gender" />
          </div>

          <div class="pt-5">
            <button
              class="w-full py-2.5 bg-primary hover:bg-primary-dark text-white transition-colors text-ds-body-r font-semibold"
            >
              تطبيق ({{ totalResults }} وظيفة)
            </button>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>
