<script setup lang="ts">
import type { Company, ReviewsDataSet, TabName } from "~/types/company";
import { useStructuredData, useBreadcrumbStructuredData } from '~/shared/composables/useStructuredData';

const { t } = useI18n()

const route = useRoute()



const activeTab = ref<TabName>('معلومات')

const company: Company = {
  name: 'الشركة المصرية للتوظيف',
  logo: '/assets/images/recruitment-logo.png',
  coverImage: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1200',
  rating: 4.2,
  licenseNumber: 1247,
  description: 'شركة رائدة في مجال التوظيف وإلحاق العمالة المصرية بالخارج. نسعى لتوفير فرص عمل حقيقية ومضمونة للشباب المصري في مختلف التخصصات.',
  location: 'القاهرة، مدينة نصر',
  hours: 'مفتوح الآن (9 ص - 5 م)',
  placedCount: '540+',
  followers: '12,500',
  aboutDescription: 'الشركة المصرية للتوظيف هي شركة رائدة متخصصة في توفير الكوادر البشرية المؤهلة للعمل في دول الخليج. نتميز بخبرة واسعة في مجالات التشييد والبناء، بالإضافة إلى توفير الطواقم الطبية للمستشفيات والمراكز الصحية. نعمل وفقاً لأعلى معايير الجودة والمصداقية لضمان حقوق العمال وأصحاب العمل على حد سواء.',
  classification: 'وكالة توظيف وإلحاق عمالة',
  foundedYear: '2010',
  experienceYears: '14 سنة خبرة',
  size: '20 - 50 موظف',
  stats: {
    totalJobs: 540,
    jobViews: '25.4K',
    profileVisits: '12.8K',
    followers: '12.5K',
    applicants: '3,150',
    monthlyAvg: 15,
  },
  topCountries: [
    { countryCode: 'sa', name: 'المملكة العربية السعودية', jobs: 320, percentage: 70 },
    { countryCode: 'kw', name: 'دولة الكويت', jobs: 150, percentage: 35 },
    { countryCode: 'ae', name: 'الإمارات العربية المتحدة', jobs: 70, percentage: 15 },
  ],
  topFields: [
    { name: 'التشييد والبناء', jobs: 250, percentage: 60 },
    { name: 'الرعاية الصحية والتمريض', jobs: 180, percentage: 40 },
    { name: 'المبيعات والتسويق', jobs: 60, percentage: 15 },
    { name: 'السائقين والنقل', jobs: 50, percentage: 12 },
  ],
  license: {
    number: '1247',
    issuer: 'وزارة القوى العاملة - مصر',
    expiry: '2025',
    status: 'ساري المفعول',
  },
  account: {
    joined: 'يناير 2022',
    managedBy: 'الشركة نفسها',
    verified: true,
  },
  branchAddress: 'القاهرة، مدينة نصر، شارع عباس العقاد',
  branchHours: 'مواعيد العمل: 9ص - 5م',
  mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_nW97shQcr0yLg3QdAJq0yNnbpoQQd5MtCWYQlIUeyMnS8EJy1uB96hpnMl9_in-4CFPmZ_jYZhN_FmOlCFx6Hapmsow73AcnMRWnaiVjlXkkVT632-1u4TWPtZZteINVjRMDSAnxMOGMFTqHajQSv4Skmnc1b2ySl5yRNYFXyngENo1ZFMXhiN9dcD-TzoewKjbKhLCsl65rgKyVpRk5u7sxwpjwKWPw1THZM950kzRZHqTBXUVx1-obeEqR1ucY75gaMIZLHA',
  links: {
    website: '#',
    facebook: '#',
    linkedin: '#',
    whatsapp: '#',
    phone: '#',
  },
  breadcrumb: [
    { label: 'الصفحة الرئيسية', href: '#' },
    { label: 'ناشر وظائف', href: '#' },
    { label: 'شركة إلحاق عمالة مرخصة', href: '#' },
    { label: 'الشركة المصرية للتوظيف', href: '#', current: true },
  ],
  tabs: [
    { label: 'الوظائف', count: 23, href: '#' },
    { label: 'المراجعات', count: 128, href: '#' },
    { label: 'معلومات', active: true, href: '#' },
  ],
}

const reviewsData: ReviewsDataSet = {
  overall: 4.2,
  label: 'ممتاز',
  totalReviews: 128,
  breakdown: [
    { stars: 5, percentage: 60, count: 77 },
    { stars: 4, percentage: 20, count: 25 },
    { stars: 3, percentage: 10, count: 13 },
    { stars: 2, percentage: 5, count: 6 },
    { stars: 1, percentage: 5, count: 7 },
  ],
  detailedRatings: [
    { label: 'المصداقية', percentage: 90, count: 115 },
    { label: 'الالتزام بالعقد', percentage: 94, count: 120 },
    { label: 'وضوح الرسوم والتكاليف', percentage: 85, count: 109 },
    { label: 'سرعة الإجراءات', percentage: 76, count: 98 },
    { label: 'التعامل', percentage: 84, count: 108 },
  ],
  reviews: [
    {
      id: '1',
      author: 'أحمد محمد علي',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBX7cF2wkg_EHGcRU9OGSCGJRRJI0EXFejrDL_5Hr9WNpoYtSrxN6SLxh1lZxjykC4NARks-_0UBXgvlq8bkszmi9iFy8UFlH5JzAnAGckhpLLW-yKUUiqmAsqX5V9QuZhnjzDV4SNdERwa6Ty8-cIpo-m25f38KhrEAyxMryDEft2l5_BxX6_kVdkrXQyRPt2f9spyeUMd-ohP3IgYMaqwzJWNftdHJkiAWHytABstNghJwUtVkF6NCAmzBff4i3NGveUWS2iAew',
      role: 'محاسب',
      time: 'منذ أسبوعين',
      rating: 5,
      badge: { text: 'سافر من خلال الشركة', variant: 'primary' },
      body: 'تجربة ممتازة مع الشركة. الإجراءات كانت واضحة وسريعة جداً. فريق العمل محترم ومتعاون، ساعدوني في كل خطوة من بداية التقديم حتى الحصول على التأشيرة والسفر للسعودية. أنصح أي حد يتعامل معاهم.',
      likes: 12,
      hasReply: true,
      companyReply: {
        body: 'شكراً لك يا أستاذ أحمد على ثقتك بنا. نتمنى لك التوفيق في رحلتك العملية الجديدة. نحن دائماً في الخدمة.',
        likes: 3,
      },
      userFollowUp: {
        body: 'شكراً جزيلاً لاهتمامكم وردكم الكريم.',
        time: 'منذ أسبوع',
        likes: 1,
      },
    },
    {
      id: '2',
      author: 'سارة إبراهيم',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBypZISlYWdKA1yTm_TEU7zgLVphcE8JZHE6T0-piONy_5l5uSn37rEnZMaTyPN4d7xjbjvYcsDJIKS1Z4XDtayYMr4FnIP921RQbnZluRPnTTN5lgEcm9ZHrfRrAR96McmxQEgb2Vx2ro5zHM3Uwl6FtT1gG0DODNW3xZ1MuMY0-iGaQ9cnZKo0UwIPWkjimn5pdhUinxo1yNRcxKC6Kzzfs11yG9N-Bxg0_pK39AeMlszDYJFTcXoHBr9SsS44ezJAqpPZynYlw',
      role: 'مهندسة معمارية',
      time: 'منذ شهر',
      rating: 4,
      badge: { text: 'في انتظار السفر', variant: 'default' },
      body: 'الشركة كويسة والمقابلات كانت منظمة. بس كان فيه شوية تأخير في الرد على الاستفسارات بعد توقيع العقد. ياريت يهتموا بخدمة العملاء أكتر شوية عشان الواحد بيبقى قلقان.',
      likes: 5,
    },
    {
      id: '3',
      author: 'محمود السيد',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCko8h8eMDE3MaWPGklSQmfONVVu79snB8Qrm72jmy5Zhceiiw44dYVDYLkpvif-1_hhQ1SWla_CCbCC43H5vTg0fdWMUEbP1Gu6N4B73jYpXHpukUJF_BIyJc2rNKacbfxr58xd_WCHDiEMlVeI6Z7PkEa2Ewkh7FPQgDE-64gnfos97gcFB3wsXzgKHY4fC8gzJ21Hs4NAxPVvhfkjLif21-ZxLmVTtZsVlygJnDTBZ4e-AWab7T4WbD_zdzN7-dh7A4iZNc8aA',
      role: 'فني كهرباء',
      time: 'منذ شهرين',
      rating: 5,
      badge: { text: 'سافر من خلال الشركة', variant: 'primary' },
      body: 'بصراحة، أحسن شركة تعاملت معاها. مفيش أي رسوم مخفية وكل حاجة كانت زي ما اتفقنا عليها بالظبط. ربنا يباركلهم ويوفقهم.',
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
    addressCountry: 'مصر'
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
    <div v-if="activeTab === 'المراجعات'" class="mt-content">
      <div class="max-w-none">
        <CompanyReviewsPanel :data="reviewsData" />
      </div>
    </div>

    <div v-else class="grid grid-cols-1 gap-section lg:grid-cols-company-sidebar xl:grid-cols-sidebar items-start mt-content">
      <aside class="order-1 space-y-section lg:sticky lg:top-[72px]">
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

          <!-- الوظائف Tab Content (placeholder) -->
          <div class="text-center py-section text-foreground-muted">
            <p>قائمة الوظائف ستكون هنا</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
