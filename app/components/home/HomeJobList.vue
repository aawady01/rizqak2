<script setup lang="ts">
import { LayoutList } from "lucide-vue-next";
import JobCard from "../jobs/JobCard.vue";
import BaseTypography from "~/shared/components/base/BaseTypography.vue";
import BasePagination from "~/shared/components/base/BasePagination.vue";
import { jobsData } from "~/shared/utils/mockData";

const { t } = useI18n();

const ITEMS_PER_PAGE = 10
const sortBy = ref("latest");
const currentPage = ref(1);
const isDropdownOpen = ref(false);
const dropdownRef = ref<HTMLElement>();

const sortOptions = computed(() => [
  { value: "latest", label: t('jobList.sortOptions.latest') },
  { value: "salary", label: t('jobList.sortOptions.salary') },
  { value: "views", label: t('jobList.sortOptions.views') },
]);

const sortedJobs = computed(() => {
  const jobs = [...jobsData]
  if (sortBy.value === 'salary') {
    return jobs.sort((a, b) => {
      const numA = parseInt(t(a.salary).replace(/[^0-9]/g, '')) || 0
      const numB = parseInt(t(b.salary).replace(/[^0-9]/g, '')) || 0
      return numB - numA
    })
  }
  if (sortBy.value === 'views') {
    return jobs.sort((a, b) => (b.id > a.id ? 1 : -1))
  }
  return jobs.sort((a, b) => Number(b.id) - Number(a.id))
})

const totalPages = computed(() => Math.max(1, Math.ceil(sortedJobs.value.length / ITEMS_PER_PAGE)))

const paginatedJobs = computed(() => {
  const start = (currentPage.value - 1) * ITEMS_PER_PAGE
  return sortedJobs.value.slice(start, start + ITEMS_PER_PAGE)
})

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const selectSortOption = (val: string) => {
  sortBy.value = val;
  currentPage.value = 1;
  isDropdownOpen.value = false;
};

onClickOutside(dropdownRef, () => {
  isDropdownOpen.value = false;
});
</script>

<template>
  <section id="jobs" class="scroll-mt-24">
    <!-- Section Header -->
    <div class="section-heading">
      <div class="section-heading__title">
        <LayoutList class="size-5 text-primary" :stroke-width="2" aria-hidden="true" />
        <BaseTypography
          variant="h3"
          tag="h2"
          weight="bold"
          color="text-foreground"
        >
          {{ $t('jobList.title') }}
          <span class="text-primary font-bold">({{ sortedJobs.length }})</span>
        </BaseTypography>
      </div>

      <div class="flex items-center gap-compact">
        <div ref="dropdownRef" class="relative sort-dropdown-container">
          <button
            type="button"
            role="combobox"
            aria-haspopup="listbox"
            aria-controls="sort-listbox"
            :aria-expanded="isDropdownOpen"
            :aria-label="$t('jobList.sortLabel')"
            class="surface-panel w-dropdown-trigger py-1.5 px-element text-foreground outline-none cursor-pointer text-ds-caption text-center font-medium"
            @click="toggleDropdown"
          >
            {{ sortOptions.find((o) => o.value === sortBy)?.label }}
          </button>

          <div
            v-if="isDropdownOpen"
            role="listbox"
            :aria-label="$t('jobList.sortLabel')"
            class="surface-panel inset-inline-start-0 z-dropdown-overlay absolute top-full w-full shadow-lg"
          >
            <button
              v-for="option in sortOptions"
              :key="option.value"
              type="button"
              role="option"
              :aria-selected="sortBy === option.value"
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

    <!-- Job Cards -->
    <div class="space-y-compact">
      <JobCard v-for="job in paginatedJobs" :key="job.id" :job="job" />
    </div>

    <BasePagination v-model:current-page="currentPage" :total-pages="totalPages" />
  </section>
</template>
