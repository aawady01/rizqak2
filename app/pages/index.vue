<script setup lang="ts">
import HomeHero from '~/components/home/HomeHero.vue'
import HomeSidebar from '~/components/home/HomeSidebar.vue'
import HomeFeaturedCompanies from '~/components/home/HomeFeaturedCompanies.vue'
import HomeJobList from '~/components/home/HomeJobList.vue'

useSeoMeta({
  title: 'المعالي للتوظيف - فرصتك الوظيفية في الخارج',
  description: 'آلاف الوظائف في دول الخليج والعالم العربي بانتظارك من خلال منصة المعالي للتوظيف.',
})
</script>

<template>
  <div>
    <HomeHero />

    <!-- Main content — py-section, gap-section -->
    <div class="max-w-7xl mx-auto px-content sm:px-6 lg:px-section py-section">
      <div class="grid grid-cols-1 lg:grid-cols-[290px_1fr] xl:grid-cols-[310px_1fr] gap-section">
        <HomeSidebar />

        <div class="space-y-section order-2 w-full min-w-0">
          <HomeFeaturedCompanies />
          <HomeJobList />
        </div>
      </div>
    </div>
  </div>
</template>
