<script setup lang="ts">
import { ref } from 'vue';
import {
  MapPin,
  Clock,
  Users,
  UserMinus,
  Share2,
  Star,
  ShieldCheck,
  UsersRound,
  UserPlus
} from "lucide-vue-next";
import type { CompanyTab, TabName } from "~/types/company";

const props = defineProps<{
  name: string
  logo: string
  coverImage?: string
  rating: number
  licenseNumber: number
  description: string
  location: string
  hours: string
  placedCount: string
  followers: string
  tabs?: CompanyTab[]
  activeTab?: TabName
}>()

const emit = defineEmits<{
  (e: 'tab-click', tab: TabName): void
}>()

const { t } = useI18n()
const isFollowing = ref(false)

const handleTabClick = (tab: TabName) => {
  emit('tab-click', tab)
}
</script>

<template>
  <div class="grid grid-cols-1 gap-section lg:grid-cols-company-sidebar xl:grid-cols-sidebar items-stretch mb-section">
    <!-- كارت الوصف والإجراءات الملاصقة (يمين) -->
    <div class="order-1 surface-panel rounded-none p-0 overflow-hidden flex flex-col gap-0 z-20 lg:h-company-hero-card xl:h-company-hero-card-xl">
      
      <!-- نص الوصف -->
      <div class="p-content flex-1 z-10 bg-surface flex flex-col">
        <BaseDescription tag="div" class="wrap-break-word md:text-base leading-relaxed">
          <p>{{ description }}</p>
        </BaseDescription>

        <!-- عدد المتابعين -->
        <div class="mt-auto pt-content flex items-center justify-center gap-element text-ds-label-s text-foreground-subtle border-t-0 border-border">
          <UsersRound class="size-4 text-primary" :stroke-width="2" />
          <span class="font-bold text-foreground">{{ followers }}</span>
          {{ t('company.followersSuffix') }}
        </div>
      </div>

      <!-- شريط الإجراءات (ملاصق للكارت من الأسفل) -->
      <div class="flex items-stretch border-t border-border bg-surface shrink-0 h-company-action-bar-sm md:h-company-action-bar-md w-full mt-auto">
        <!-- التقييم -->
        <div
          class="w-company-rating-col-sm md:w-company-rating-col-md flex flex-col items-center justify-center bg-surface-alt/30 border-e border-border text-foreground hover:bg-surface-alt transition-colors cursor-help shrink-0"
          role="img"
          :aria-label="t('company.ratingLabel')"
        >
          <Star class="size-3.5 md:size-4 text-gold-star fill-gold-star mb-1" :stroke-width="2" />
          <span class="text-ds-caption-s md:text-ds-label-s font-bold leading-none dir-ltr">{{ rating }}</span>
        </div>

        <!-- المتابعة -->
        <button
          type="button"
          class="flex-1 text-white text-ds-label-s md:text-ds-label-r font-bold flex items-center justify-center gap-element transition-all shadow-none outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          :class="isFollowing ? 'bg-neutral-500 hover:bg-neutral-600' : 'bg-primary hover:bg-primary-dark'"
          :aria-label="isFollowing ? t('company.unfollow') : t('company.follow')"
          :aria-pressed="isFollowing"
          @click="isFollowing = !isFollowing"
        >
          <UserMinus v-if="isFollowing" class="size-4 md:size-4" :stroke-width="2" />
          <UserPlus v-else class="size-4 md:size-4" :stroke-width="2" />
          {{ isFollowing ? t('company.following') : t('company.follow') }}
        </button>

        <!-- المشاركة -->
        <button
          type="button"
          class="w-company-share-btn-sm md:w-company-share-btn-md shrink-0 bg-transparent text-primary hover:bg-surface-alt flex items-center justify-center transition-all border-s border-border outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          :aria-label="t('company.share')"
          :title="t('company.share')"
        >
          <Share2 class="size-4 md:size-4" :stroke-width="2" />
        </button>
      </div>
    </div>

    <!-- الغلاف + البروز -->
    <div class="order-2 flex flex-col z-10">
      
      <!-- الغلاف الفعلي بحدوده -->
      <div class="relative flex-1 rounded-none p-0 flex items-end border border-border bg-surface overflow-visible min-h-company-cover-sm md:min-h-company-cover-md">
        
        <!-- صورة الغلاف -->
        <NuxtImg 
          :src="coverImage || '/images/company-cover-placeholder.jpg'" 
          :alt="t('company.coverAlt', { name })" 
          class="absolute inset-0 w-full h-full object-cover rounded-none" 
        />
        
        <!-- تدرج لوني لضمان وضوح النص -->
        <div class="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-transparent pointer-events-none rounded-none"></div>

        <!-- الصورة الشخصية (مربع متداخل مع الحافة السفلية) -->
        <div class="absolute bottom-company-logo-offset-sm md:bottom-company-logo-offset-lg inset-s-4 md:inset-s-6 w-company-logo-sm h-company-logo-sm md:w-company-logo-lg md:h-company-logo-lg rounded-none border-2 md:border-4 border-background bg-surface shadow-md overflow-hidden z-10">
          <NuxtImg
            :alt="name"
            class="w-full h-full object-contain p-1.5"
            :src="logo"
            loading="lazy"
          />
        </div>

        <!-- تفاصيل الشركة (فوق الغلاف) -->
        <div class="relative w-full p-content flex z-10">
          
          <!-- مساحة لدفع المحتوى بعيداً عن الصورة الشخصية -->
          <div class="w-full ms-company-logo-indent-sm md:ms-company-logo-indent-lg space-y-element">
            
            <div class="flex flex-wrap items-center gap-content">
              <h1 class="mb-0 text-ds-h5 md:text-ds-h2 font-bold leading-tight text-white drop-shadow-md">{{ name }}</h1>
              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-none text-ds-caption-s md:text-ds-label-s font-bold bg-white/10 text-white backdrop-blur-md border border-white/20 shadow-sm">
                <ShieldCheck class="size-3 md:size-3.5" :stroke-width="2" />
                {{ t('company.licensedBadge') }} ({{ licenseNumber }})
              </span>
            </div>

            <div class="flex items-center gap-x-4 gap-y-2 md:gap-x-6 text-ds-caption-l md:text-ds-body-r text-white/80 flex-wrap">
              <div class="flex items-center gap-element drop-shadow-sm">
                <MapPin class="size-4 md:size-4 text-white/60" :stroke-width="2" />
                {{ location }}
              </div>
              <div class="flex items-center gap-element drop-shadow-sm">
                <Clock class="size-4 md:size-4 text-white/60" :stroke-width="2" />
                {{ hours }}
              </div>
              <div class="flex items-center gap-element drop-shadow-sm">
                <Users class="size-4 md:size-4 text-white/60" :stroke-width="2" />
                {{ placedCount }} {{ t('company.placedSuffix') }}
              </div>
            </div>
          </div>

        </div>

        <!-- قائمة التبويبات (ملاصقة لأسفل الغلاف من الخارج) -->
        <div v-if="tabs && tabs.length" class="absolute top-full end-0 z-20">
          <div role="tablist" :aria-label="t('company.tabsLabel')" class="bg-surface border border-border flex items-center shadow-sm overflow-x-auto hide-scrollbar w-fit">
            <button
              v-for="tab in tabs"
              :key="tab.label"
              role="tab"
              type="button"
              :aria-selected="tab.label === props.activeTab"
              :tabindex="tab.label === props.activeTab ? 0 : -1"
              class="flex-1 md:flex-none px-content md:px-content py-element md:py-element text-ds-label-s md:text-ds-label-l font-bold transition-all duration-300 whitespace-nowrap flex items-center justify-center md:justify-start"
              :class="tab.label === props.activeTab ? 'bg-primary text-white shadow-inner' : 'text-foreground-subtle hover:text-foreground hover:bg-surface-alt'"
              @click="handleTabClick(tab.label as TabName)"
            >
               {{ tab.label }} 
               <span v-if="tab.count" class="opacity-80 text-ds-caption-s ms-compact inline-block dir-ltr">({{ tab.count }})</span>
            </button>
          </div>
        </div>
      </div> <!-- إغلاق الغلاف -->

        <!-- مساحة لاستيعاب بروز الصورة الشخصية والتبويبات -->
        <div class="h-company-hero-spacer-sm md:h-company-hero-spacer-md w-full shrink-0 pointer-events-none"></div>

    </div>
  </div>
</template>
