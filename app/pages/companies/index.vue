<script setup lang="ts">
import { Building2 } from 'lucide-vue-next'
import CompanyListItem from '~/components/companies/CompanyListItem.vue'
import BaseTypography from '~/shared/components/base/BaseTypography.vue'
import BasePagination from '~/shared/components/base/BasePagination.vue'
import BaseSearchInput from '~/shared/components/base/BaseSearchInput.vue'
import BaseEmptyState from '~/shared/components/base/BaseEmptyState.vue'
import { companiesData } from '~/shared/utils/mockData'
import { useSEO } from '~/shared/composables/useSEO'
import {
  useBreadcrumbStructuredData,
  useItemListStructuredData,
} from '~/shared/composables/useStructuredData'

const { t } = useI18n()

useSEO({
  canonicalPath: '/companies',
  type: 'website',
})

useBreadcrumbStructuredData([
  { name: t('nav.home'), path: '/' },
  { name: t('companiesPage.title'), path: '/companies' },
])

useItemListStructuredData(
  companiesData.map((company) => ({
    name: t(company.name),
    path: `/companies/${company.slug}`,
  })),
)

const ITEMS_PER_PAGE = 8
const currentPage = ref(1)
const searchQuery = ref('')

const filteredCompanies = computed(() => {
  if (!searchQuery.value) return companiesData
  const query = searchQuery.value.toLowerCase()
  return companiesData.filter((company) => {
    const name = t(company.name).toLowerCase()
    const location = company.location ? t(company.location).toLowerCase() : ''
    const description = company.description ? t(company.description).toLowerCase() : ''
    return name.includes(query) || location.includes(query) || description.includes(query)
  })
})

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredCompanies.value.length / ITEMS_PER_PAGE)),
)

const paginatedCompanies = computed(() => {
  const start = (currentPage.value - 1) * ITEMS_PER_PAGE
  return filteredCompanies.value.slice(start, start + ITEMS_PER_PAGE)
})

// Reset to page 1 when search changes
watch(searchQuery, () => {
  currentPage.value = 1
})
</script>

<template>
  <div class="page-shell">
    <!-- Section Header -->
    <div class="section-heading">
      <div class="section-heading__title">
        <Building2 class="size-5 text-primary" :stroke-width="2" aria-hidden="true" />
        <BaseTypography variant="h3" tag="h1" weight="bold" color="text-foreground">
          {{ $t('companiesPage.title') }}
          <span class="text-primary font-bold">({{ filteredCompanies.length }})</span>
        </BaseTypography>
      </div>
    </div>

    <!-- Search Bar -->
    <div class="mb-content max-w-md">
      <BaseSearchInput
        v-model="searchQuery"
        :placeholder="$t('companiesPage.searchPlaceholder')"
        :aria-label="$t('companiesPage.searchAriaLabel')"
      />
    </div>

    <!-- Companies List -->
    <div v-if="paginatedCompanies.length" class="space-y-compact">
      <CompanyListItem
        v-for="company in paginatedCompanies"
        :key="company.id"
        :company="company"
      />
    </div>

    <!-- Empty State -->
    <BaseEmptyState
      v-else
      :title="$t('companiesPage.emptyTitle')"
      :description="$t('companiesPage.emptyDescription')"
    />

    <BasePagination
      v-if="totalPages > 1"
      v-model:current-page="currentPage"
      :total-pages="totalPages"
    />
  </div>
</template>