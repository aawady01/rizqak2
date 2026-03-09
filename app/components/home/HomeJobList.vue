<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { LayoutList } from "lucide-vue-next";
import JobCard from "../jobs/JobCard.vue";
import BaseTypography from "~/components/base/BaseTypography.vue";
import BasePagination from "~/shared/components/base/BasePagination.vue";
import { jobsData } from "~/shared/utils/mockData";

const sortBy = ref("latest");
const currentPage = ref(1);
const isDropdownOpen = ref(false);

const sortOptions = [
  { value: "latest", label: "الأحدث" },
  { value: "salary", label: "الأعلى راتباً" },
  { value: "views", label: "الأكثر مشاهدة" },
];

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const selectSortOption = (val: string) => {
  sortBy.value = val;
  isDropdownOpen.value = false;
};

const closeDropdown = (e: Event) => {
  const target = e.target as HTMLElement;
  if (!target.closest(".sort-dropdown-container")) {
    isDropdownOpen.value = false;
  }
};

onMounted(() => document.addEventListener("click", closeDropdown));
onUnmounted(() => document.removeEventListener("click", closeDropdown));
</script>

<template>
  <section id="jobs" class="scroll-mt-24">
    <!-- Section Header — ds pattern: mb-content, icon 20px/2, ds-heading semibold -->
    <div class="flex items-center justify-between mb-content">
      <BaseTypography
        variant="h3"
        weight="bold"
        color="text-foreground"
        class="flex items-center gap-compact"
      >
        <LayoutList class="w-5 h-5 text-primary" :stroke-width="2" />
        الوظائف المتاحة
        <span class="text-primary font-bold">(2,340)</span>
      </BaseTypography>

      <div class="flex items-center gap-compact">
        <span class="text-ds-caption text-muted-foreground whitespace-nowrap">
          ترتيب حسب:
        </span>
        <div class="relative sort-dropdown-container">
          <button
            type="button"
            @click="toggleDropdown"
            class="w-dropdown-trigger bg-card border border-border py-1.5 px-element text-foreground outline-none cursor-pointer text-ds-caption text-center font-medium"
          >
            {{ sortOptions.find((o) => o.value === sortBy)?.label }}
          </button>

          <div
            v-if="isDropdownOpen"
            class="inset-inline-start-0 z-dropdown-overlay absolute top-full w-full bg-card border border-border shadow-lg"
          >
            <button
              v-for="option in sortOptions"
              :key="option.value"
              type="button"
              @click="selectSortOption(option.value)"
              :class="[
                'w-full text-center py-2 px-element text-ds-caption font-medium transition-all duration-200 cursor-pointer outline-none border-none animate-none',
                sortBy === option.value
                  ? 'bg-state-selected text-state-selected'
                  : 'text-foreground bg-transparent hover-state-selected',
              ]"
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

    <BasePagination v-model:currentPage="currentPage" :total-pages="10" />
  </section>
</template>
