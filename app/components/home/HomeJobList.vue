<script setup lang="ts">
import { LayoutList } from "lucide-vue-next";
import JobCard from "../jobs/JobCard.vue";
import BaseTypography from "~/shared/components/base/BaseTypography.vue";
import BasePagination from "~/shared/components/base/BasePagination.vue";
import { jobsData } from "~/shared/utils/mockData";

const { t } = useI18n();

const sortBy = ref("latest");
const currentPage = ref(1);
const isDropdownOpen = ref(false);
const dropdownRef = ref<HTMLElement>();

const sortOptions = computed(() => [
  { value: "latest", label: t('jobList.sortOptions.latest') },
  { value: "salary", label: t('jobList.sortOptions.salary') },
  { value: "views", label: t('jobList.sortOptions.views') },
]);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const selectSortOption = (val: string) => {
  sortBy.value = val;
  isDropdownOpen.value = false;
};

onClickOutside(dropdownRef, () => {
  isDropdownOpen.value = false;
});
</script>

<template>
  <section id="jobs" class="scroll-mt-24">
    <!-- Section Header — ds pattern: mb-content, icon 20px/2, ds-heading semibold -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-y-4 mb-content">
      <div class="flex items-center gap-compact">
        <LayoutList class="size-5 text-primary" :stroke-width="2" aria-hidden="true" />
        <BaseTypography
          variant="h3"
          tag="h2"
          weight="bold"
          color="text-foreground"
        >
          {{ $t('jobList.title') }}
          <span class="text-primary font-bold">(2,340)</span>
        </BaseTypography>
      </div>

      <div class="flex items-center gap-compact">
        <span class="text-ds-caption text-foreground-muted whitespace-nowrap">
          {{ $t('jobList.sortLabel') }}
        </span>
        <div ref="dropdownRef" class="relative sort-dropdown-container">
          <button
            type="button"
            class="w-dropdown-trigger bg-surface border border-border py-1.5 px-element text-foreground outline-none cursor-pointer text-ds-caption text-center font-medium"
            @click="toggleDropdown"
          >
            {{ sortOptions.find((o) => o.value === sortBy)?.label }}
          </button>

          <div
            v-if="isDropdownOpen"
            class="inset-inline-start-0 z-dropdown-overlay absolute top-full w-full bg-surface border border-border shadow-lg"
          >
            <button
              v-for="option in sortOptions"
              :key="option.value"
              type="button"
              :class="[
                'w-full text-center py-compact px-element text-ds-caption font-medium transition-all duration-200 cursor-pointer outline-none border-none animate-none',
                sortBy === option.value
                  ? 'bg-state-selected text-state-selected'
                  : 'text-foreground bg-transparent hover-state-selected',
              ]"
              @click="selectSortOption(option.value)"
            >
              {{ option.label }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Job Cards — gap-compact -->
    <div class="space-y-compact">
      <JobCard v-for="job in jobsData" :key="job.id" :job="job" />
    </div>

    <BasePagination v-model:current-page="currentPage" :total-pages="10" />
  </section>
</template>
