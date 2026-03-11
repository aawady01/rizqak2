<script setup lang="ts">
import HomeHero from '~/components/home/HomeHero.vue'
import HomeSidebar from '~/components/home/HomeSidebar.vue'
import HomeFeaturedCompanies from '~/components/home/HomeFeaturedCompanies.vue'
import HomeJobList from '~/components/home/HomeJobList.vue'
import { jobsData } from '~/shared/utils/mockData'
import { useSEO } from '~/shared/composables/useSEO'
import {
  useWebsiteStructuredData,
  useOrganizationStructuredData,
  useBreadcrumbStructuredData,
  useItemListStructuredData,
} from '~/shared/composables/useStructuredData'

useSEO({
  title: 'Rizqak | Jobs in Egypt and the Gulf',
  description:
    'Browse verified opportunities in engineering, healthcare, finance, and more with Rizqak.',
  canonicalPath: '/',
  type: 'website',
})

useWebsiteStructuredData()
useOrganizationStructuredData()
useBreadcrumbStructuredData([
  { name: 'Home', path: '/' },
])
useItemListStructuredData(
  jobsData.map((job) => ({
    name: job.title,
    path: `/jobs/${job.id}`,
  })),
)
</script>

<template>
  <div>
    <HomeHero />

    <!-- Main content - py-section, gap-section -->
    <div class="max-w-7xl mx-auto px-content sm:px-6 lg:px-section py-section">
      <div class="grid grid-cols-1 lg:grid-cols-home-sidebar-lg xl:grid-cols-home-sidebar-xl gap-section">
        <HomeSidebar />

        <div class="space-y-section order-2 w-full min-w-0">
          <HomeFeaturedCompanies />
          <HomeJobList />
        </div>
      </div>
    </div>
  </div>
</template>
