<script setup lang="ts">
import { SlidersHorizontal, Briefcase, MapPin, Banknote, GraduationCap, Users } from "lucide-vue-next";
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
    <div class="sticky top-[72px] lg:h-[calc(100vh-72px)] flex flex-col">
      <!-- Removed Title and Icon Section -->


      <!-- Filter Card — p-content -->
      <div class="surface-panel flex flex-col flex-1 min-h-0 overflow-hidden relative border-none shadow-none bg-transparent">
        <div class="flex-1 overflow-y-auto px-0.5 pb-4 pt-0" style="scrollbar-width: thin; scrollbar-gutter: stable;">
          <div class="flex flex-col gap-4">
            <TreeFilterSection
              :section="fieldFilterData"
              searchable
              url-key="field"
              :icon="Briefcase"
            />
            
            <TreeFilterSection
              :section="locationFilterData"
              searchable
              url-key="location"
              :icon="MapPin"
            />

            <SimpleFilter
              :title="$t('sidebar.salaryFilter.title')"
              :total-label="$t('sidebar.salaryFilter.totalLabel')"
              :total-count="4"
              :total-jobs="2340"
              :items="salaryFilters"
              type="checkbox"
              searchable
              url-key="salary"
              :icon="Banknote"
            />

            <SimpleFilter
              :title="$t('sidebar.experienceFilter.title')"
              :total-label="$t('sidebar.experienceFilter.totalLabel')"
              :total-count="4"
              :total-jobs="2340"
              :items="experienceFilters"
              type="checkbox"
              searchable
              url-key="experience"
              :icon="GraduationCap"
            />

            <GenderFilter v-model:selected="gender" query-key="gender" :icon="Users" />
          </div>
        </div>
      </div>
      <div class="shrink-0 p-content bg-surface border-t border-border shadow-[0_-4px_6px_-2px_rgb(0,0,0,0.02)] z-10 w-full relative flex items-center gap-3">
        <button
          class="flex-1 py-2.5 bg-primary hover:bg-primary-dark text-white transition-colors text-ds-body-r font-semibold outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 cursor-pointer rounded-sm"
        >
          {{ $t('sidebar.applyButton') }} ({{ totalResults }} {{ $t('sidebar.jobCount') }})
        </button>
        
        <button
          class="px-4 py-2.5 border border-separator/60 hover:bg-muted/30 text-muted-foreground hover:text-foreground transition-all text-ds-caption-l font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 cursor-pointer rounded-sm whitespace-nowrap"
          @click="$emit('clear-filters')"
        >
          {{ $t('common.clearAll') }}
        </button>
      </div>
    </div>
  </aside>
</template>
