<script setup lang="ts">
import HomeSidebar from '~/components/home/HomeSidebar.vue'
import JobCard from '~/components/jobs/JobCard.vue'
import BasePagination from '~/shared/components/base/BasePagination.vue'
import BaseTypography from '~/shared/components/base/BaseTypography.vue'
import { LayoutList } from 'lucide-vue-next'
import { jobsData } from '~/shared/utils/mockData'
import { useSEO } from '~/shared/composables/useSEO'
import { getJobPath } from '~/shared/utils/jobDetails'
import { useItemListStructuredData } from '~/shared/composables/useStructuredData'

const { t } = useI18n()

useSEO({
  canonicalPath: '/jobs',
  type: 'website',
})

useItemListStructuredData(
  jobsData.map((job) => ({
    name: job.title,
    path: getJobPath(job),
  })),
)

const ITEMS_PER_PAGE = 10
const currentPage = ref(1)
const isDropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement>()

const sortBy = ref('latest')
const sortOptions = computed(() => [
  { value: 'latest', label: t('jobList.sortOptions.latest') },
  { value: 'salary', label: t('jobList.sortOptions.salary') },
  { value: 'views', label: t('jobList.sortOptions.views') },
])

const sortedJobs = computed(() => {
  const jobs = [...jobsData]
  if (sortBy.value === 'salary') {
    return jobs.sort((a, b) => (b.salaryAmount || 0) - (a.salaryAmount || 0))
  }
  if (sortBy.value === 'views') {
    return jobs.sort((a, b) => (b.views || 0) - (a.views || 0))
  }
  // latest: default order (by id descending)
  return jobs.sort((a, b) => Number(b.id) - Number(a.id))
})

const totalPages = computed(() => Math.max(1, Math.ceil(sortedJobs.value.length / ITEMS_PER_PAGE)))

const paginatedJobs = computed(() => {
  const start = (currentPage.value - 1) * ITEMS_PER_PAGE
  return sortedJobs.value.slice(start, start + ITEMS_PER_PAGE)
})

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const selectSortOption = (val: string) => {
  sortBy.value = val
  currentPage.value = 1
  isDropdownOpen.value = false
}

onClickOutside(dropdownRef, () => {
  isDropdownOpen.value = false
})
</script>

<template>
  <div>
    <div class="page-shell py-section">
      <div class="grid grid-cols-1 lg:grid-cols-home-sidebar-lg xl:grid-cols-home-sidebar-xl gap-section items-start">
        <HomeSidebar :total-results="sortedJobs.length" />

        <div class="order-2 w-full min-w-0">
          <!-- Section Header -->
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-content mb-content min-h-[44px]">
            <div class="flex items-center gap-compact">
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

            <div ref="dropdownRef" class="relative sort-dropdown-container">
              <button
                type="button"
                role="combobox"
                aria-haspopup="listbox"
                :aria-expanded="isDropdownOpen"
                class="surface-panel w-dropdown-trigger h-10 px-element text-foreground outline-none cursor-pointer text-ds-caption text-center font-medium flex items-center justify-center"
                @click="toggleDropdown"
              >
                {{ sortOptions.find((o) => o.value === sortBy)?.label }}
              </button>

              <div
                v-if="isDropdownOpen"
                role="listbox"
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

          <div class="space-y-compact">
            <JobCard
              v-for="job in paginatedJobs"
              :key="job.id"
              :job="job"
            />
          </div>

          <BasePagination
            v-model:current-page="currentPage"
            :total-pages="totalPages"
          />
        </div>
      </div>
    </div>
  </div>
</template>
