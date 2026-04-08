<script setup lang="ts">
import HomeHero from '~/components/home/HomeHero.vue'
import HomeSidebar from '~/components/home/HomeSidebar.vue'
import HomeFeaturedCompanies from '~/components/home/HomeFeaturedCompanies.vue'
import HomeJobList from '~/components/home/HomeJobList.vue'
import { jobsData } from '~/shared/utils/mockData'
import { useSEO } from '~/shared/composables/useSEO'
import { getJobPath } from '~/shared/utils/jobDetails'
import {
  useWebsiteStructuredData,
  useOrganizationStructuredData,
  useBreadcrumbStructuredData,
  useItemListStructuredData,
} from '~/shared/composables/useStructuredData'

const { t } = useI18n()

useSEO({
  canonicalPath: '/',
  type: 'website',
})

useWebsiteStructuredData()
useOrganizationStructuredData()
useBreadcrumbStructuredData([
  { name: t('nav.home'), path: '/' },
])
useItemListStructuredData(
  jobsData.map((job) => ({
    name: job.title,
    path: getJobPath(job),
  })),
)
</script>

<template>
  <div>
    <HomeHero />

    <div class="page-shell">
      <div class="grid grid-cols-1 lg:grid-cols-home-sidebar-lg xl:grid-cols-home-sidebar-xl gap-section">
        <HomeSidebar :total-results="jobsData.length" />

        <div class="space-y-section order-2 w-full min-w-0">
          <HomeFeaturedCompanies />
          <HomeJobList />
        </div>
      </div>
    </div>
  </div>
</template>
