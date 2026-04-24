<script setup lang="ts">
import { ref } from "vue";
import { Briefcase, MapPin, Banknote, GraduationCap, Users } from "lucide-vue-next";
import TreeFilterSection from "../filters/TreeFilterSection.vue";
import SimpleFilter from "../filters/SimpleFilter.vue";
import GenderFilter from "../filters/GenderFilter.vue";
import {
  fieldFilterData,
  locationFilterData,
  salaryFilters,
  experienceFilters,
} from "~/shared/utils/mockData";

interface Props {
  totalResults?: number;
  isMobile?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  totalResults: 145,
  isMobile: false,
});

const emit = defineEmits<{
  "clear-filters": [];
  "apply": [];
}>();

const gender = ref("all");

const handleApply = () => {
  emit("apply");
};
</script>

<template>
  <div class="flex flex-col flex-1 min-h-0 bg-surface">
    <!-- Scroll container -->
    <div class="flex-1 overflow-y-auto flex flex-col relative" style="scrollbar-width: thin; scrollbar-gutter: stable;">

      <!-- Filters Area -->
      <div class="p-content flex flex-col gap-2">
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

        <!-- Extra bottom padding on mobile to account for sticky footer -->
        <div v-if="isMobile" class="h-4" />
      </div>

      <!-- Sticky Footer inside Card -->
      <div
        class="sticky bottom-0 mt-auto shrink-0 p-content bg-surface border-t border-border z-10 w-full flex items-center gap-3"
        :class="{ 'pb-[calc(0.75rem+env(safe-area-inset-bottom))]': isMobile }"
      >
        <button
          type="button"
          class="flex-1 py-2.5 bg-primary hover:bg-primary-dark text-white transition-colors text-ds-body-r font-semibold outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 cursor-pointer rounded-sm"
          @click="handleApply"
        >
          {{ $t('sidebar.applyButton') }} ({{ props.totalResults }} {{ $t('sidebar.jobCount') }})
        </button>

        <button
          type="button"
          class="px-4 py-2.5 border border-separator/60 hover:bg-muted/30 text-muted-foreground hover:text-foreground transition-all text-ds-caption-l font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 cursor-pointer rounded-sm whitespace-nowrap"
          @click="emit('clear-filters')"
        >
          {{ $t('common.clearAll') }}
        </button>
      </div>
    </div>
  </div>
</template>
