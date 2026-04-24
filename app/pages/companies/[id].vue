<script setup lang="ts">
import type { Company, ReviewsDataSet, TabName } from "~/types/company";
import { useStructuredData, useBreadcrumbStructuredData } from '~/shared/composables/useStructuredData';

const { t } = useI18n()

const route = useRoute()



const activeTab = ref<TabName>('info')

const company: Company = {
  name: t('companyDetail.name'),
  logo: '/assets/images/recruitment-logo.png',
  coverImage: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1200',
  rating: 4.2,
  licenseNumber: 1247,
  description: t('companyDetail.description'),
  location: t('companyDetail.location'),
  hours: t('companyDetail.hours'),
  placedCount: '540+',
  followers: '12,500',
  aboutDescription: t('companyDetail.aboutDescription'),
  classification: t('companyDetail.classification'),
  foundedYear: '2010',
  experienceYears: t('companyDetail.experienceYears'),
  size: t('companyDetail.size'),
  stats: {
    totalJobs: 540,
    jobViews: '25.4K',
    profileVisits: '12.8K',
    followers: '12.5K',
    applicants: '3,150',
    monthlyAvg: 15,
  },
  topCountries: [
    { countryCode: 'sa', name: t('companyDetail.topCountries.sa'), jobs: 320, percentage: 70 },
    { countryCode: 'kw', name: t('companyDetail.topCountries.kw'), jobs: 150, percentage: 35 },
    { countryCode: 'ae', name: t('companyDetail.topCountries.ae'), jobs: 70, percentage: 15 },
  ],
  topFields: [
    { name: t('companyDetail.topFields.construction'), jobs: 250, percentage: 60 },
    { name: t('companyDetail.topFields.healthcare'), jobs: 180, percentage: 40 },
    { name: t('companyDetail.topFields.sales'), jobs: 60, percentage: 15 },
    { name: t('companyDetail.topFields.driving'), jobs: 50, percentage: 12 },
  ],
  license: {
    number: '1247',
    issuer: t('companyDetail.license.issuer'),
    expiry: '2025',
    status: t('companyDetail.license.status'),
  },
  account: {
    joined: t('companyDetail.account.joined'),
    managedBy: t('companyDetail.account.managedBy'),
    verified: true,
  },
  branchAddress: t('companyDetail.branchAddress'),
  branchHours: t('companyDetail.branchHours'),
  mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_nW97shQcr0yLg3QdAJq0yNnbpoQQd5MtCWYQlIUeyMnS8EJy1uB96hpnMl9_in-4CFPmZ_jYZhN_FmOlCFx6Hapmsow73AcnMRWnaiVjlXkkVT632-1u4TWPtZZteINVjRMDSAnxMOGMFTqHajQSv4Skmnc1b2ySl5yRNYFXyngENo1ZFMXhiN9dcD-TzoewKjbKhLCsl65rgKyVpRk5u7sxwpjwKWPw1THZM950kzRZHqTBXUVx1-obeEqR1ucY75gaMIZLHA',
  links: {
    website: '#',
    facebook: '#',
    linkedin: '#',
    whatsapp: '#',
    phone: '#',
  },
  breadcrumb: [
    { label: t('companyDetail.breadcrumb.home'), href: '/' },
    { label: t('companyDetail.breadcrumb.publisher'), href: '/companies' },
    { label: t('companyDetail.breadcrumb.licensed'), href: '#' },
    { label: t('companyDetail.name'), href: '#', current: true },
  ],
  tabs: [
    { label: t('companyDetail.tabs.jobs'), count: 23, href: '#' },
    { label: t('companyDetail.tabs.reviews'), count: 128, href: '#' },
    { label: t('companyDetail.tabs.info'), active: true, href: '#' },
  ],
}

const reviewsData: ReviewsDataSet = {
  overall: 4.2,
  label: t('companyDetail.reviews.label'),
  totalReviews: 128,
  breakdown: [
    { stars: 5, percentage: 60, count: 77 },
    { stars: 4, percentage: 20, count: 25 },
    { stars: 3, percentage: 10, count: 13 },
    { stars: 2, percentage: 5, count: 6 },
    { stars: 1, percentage: 5, count: 7 },
  ],
  detailedRatings: [
    { label: t('companyDetail.reviews.ratings.credibility'), percentage: 90, count: 115 },
    { label: t('companyDetail.reviews.ratings.contractCommitment'), percentage: 94, count: 120 },
    { label: t('companyDetail.reviews.ratings.feeClarity'), percentage: 85, count: 109 },
    { label: t('companyDetail.reviews.ratings.speed'), percentage: 76, count: 98 },
    { label: t('companyDetail.reviews.ratings.treatment'), percentage: 84, count: 108 },
  ],
  reviews: [
    {
      id: '1',
      author: t('companyDetail.reviews.list.0.author'),
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBX7cF2wkg_EHGcRU9OGSCGJRRJI0EXFejrDL_5Hr9WNpoYtSrxN6SLxh1lZxjykC4NARks-_0UBXgvlq8bkszmi9iFy8UFlH5JzAnAGckhpLLW-yKUUiqmAsqX5V9QuZhnjzDV4SNdERwa6Ty8-cIpo-m25f38KhrEAyxMryDEft2l5_BxX6_kVdkrXQyRPt2f9spyeUMd-ohP3IgYMaqwzJWNftdHJkiAWHytABstNghJwUtVkF6NCAmzBff4i3NGveUWS2iAew',
      role: t('companyDetail.reviews.list.0.role'),
      time: t('companyDetail.reviews.list.0.time'),
      rating: 5,
      badge: { text: t('companyDetail.reviews.badges.traveled'), variant: 'primary' },
      body: t('companyDetail.reviews.list.0.body'),
      likes: 12,
      hasReply: true,
      companyReply: {
        body: t('companyDetail.reviews.list.0.companyReply'),
        likes: 3,
      },
      userFollowUp: {
        body: t('companyDetail.reviews.list.0.followUp'),
        time: t('companyDetail.reviews.list.0.followUpTime'),
        likes: 1,
      },
    },
    {
      id: '2',
      author: t('companyDetail.reviews.list.1.author'),
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBypZISlYWdKA1yTm_TEU7zgLVphcE8JZHE6T0-piONy_5l5uSn37rEnZMaTyPN4d7xjbjvYcsDJIKS1Z4XDtayYMr4FnIP921RQbnZluRPnTTN5lgEcm9ZHrfRrAR96McmxQEgb2Vx2ro5zHM3Uwl6FtT1gG0DODNW3xZ1MuMY0-iGaQ9cnZKo0UwIPWkjimn5pdhUinxo1yNRcxKC6Kzzfs11yG9N-Bxg0_pK39AeMlszDYJFTcXoHBr9SsS44ezJAqpPZynYlw',
      role: t('companyDetail.reviews.list.1.role'),
      time: t('companyDetail.reviews.list.1.time'),
      rating: 4,
      badge: { text: t('companyDetail.reviews.badges.waiting'), variant: 'default' },
      body: t('companyDetail.reviews.list.1.body'),
      likes: 5,
    },
    {
      id: '3',
      author: t('companyDetail.reviews.list.2.author'),
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCko8h8eMDE3MaWPGklSQmfONVVu79snB8Qrm72jmy5Zhceiiw44dYVDYLkpvif-1_hhQ1SWla_CCbCC43H5vTg0fdWMUEbP1Gu6N4B73jYpXHpukUJF_BIyJc2rNKacbfxr58xd_WCHDiEMlVeI6Z7PkEa2Ewkh7FPQgDE-64gnfos97gcFB3wsXzgKHY4fC8gzJ21Hs4NAxPVvhfkjLif21-ZxLmVTtZsVlygJnDTBZ4e-AWab7T4WbD_zdzN7-dh7A4iZNc8aA',
      role: t('companyDetail.reviews.list.2.role'),
      time: t('companyDetail.reviews.list.2.time'),
      rating: 5,
      badge: { text: t('companyDetail.reviews.badges.traveled'), variant: 'primary' },
      body: t('companyDetail.reviews.list.2.body'),
      likes: 24,
    },
  ],
}

const handleTabClick = (tab: TabName) => {
  activeTab.value = tab
}

useSEO({
  title: t('company.seo.title', { name: company.name }),
  description: t('company.seo.description', { name: company.name }),
  canonicalPath: `/companies/${route.params.id}`,
  type: 'profile',
  image: company.logo
})

useStructuredData({
  '@type': 'Organization',
  name: company.name,
  url: 'https://rizqak.com', // fallback site URL
  logo: `https://rizqak.com${company.logo}`,
  description: t('company.seo.description', { name: company.name }),
  address: {
    '@type': 'PostalAddress',
    addressLocality: company.location,
    addressCountry: t('companyDetail.addressCountry')
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: company.rating,
    reviewCount: reviewsData.totalReviews
  }
})

useBreadcrumbStructuredData([
  { name: t('nav.home'), path: '/' },
  { name: t('nav.companies'), path: '/companies' },
  { name: company.name, path: `/companies/${route.params.id}` },
])
</script>

<template>
  <main class="page-shell">
    <CompanyBreadcrumb :items="company.breadcrumb" />

    <CompanyHero
      :name="company.name"
      :logo="company.logo"
      :rating="company.rating"
      :license-number="company.licenseNumber"
      :description="company.description"
      :location="company.location"
      :hours="company.hours"
      :placed-count="company.placedCount"
      :followers="company.followers"
      :tabs="company.tabs"
      :active-tab="activeTab"
      @tab-click="handleTabClick"
    />

    <!-- Tab Content -->
    <div v-if="activeTab === 'reviews'" class="mt-content">
      <div class="max-w-none">
        <CompanyReviewsPanel :data="reviewsData" />
      </div>
    </div>

    <div v-else class="grid grid-cols-1 gap-section lg:grid-cols-company-sidebar xl:grid-cols-sidebar items-start mt-content">
      <aside class="order-1 space-y-section lg:sticky lg:top-[var(--offset-company-sidebar-sticky)]">
        <CompanySidebarLinks :links="company.links" />
        <CompanySidebarBranchInfo
          :address="company.branchAddress"
          :hours="company.branchHours"
          :map-image="company.mapImage"
        />
        <CompanySidebarFeeTransparency />
        <CompanySidebarWarning />
        <CompanySidebarCTA />
      </aside>

      <div class="order-2 min-w-0">
        <div class="space-y-section">
          <CompanyAbout
            :description="company.aboutDescription"
            :classification="company.classification"
            :founded-year="company.foundedYear"
            :experience-years="company.experienceYears"
            :size="company.size"
          />
          
          <CompanyActivityStats :stats="company.stats" />

          <!-- Top Countries & Fields - Standalone Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-section">
            <TopCountriesCard :countries="company.topCountries" />
            <TopFieldsCard :fields="company.topFields" />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-content items-start">
            <CompanyLicenseInfo :license="company.license" />
            <CompanyAccountInfo :account="company.account" />
          </div>

          <div class="text-center py-section text-foreground-muted">
            <p>{{ $t('companyDetail.jobsPlaceholder') }}</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
