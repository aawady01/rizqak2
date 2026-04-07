<script setup lang="ts">
import {
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Flag,
  MessageSquare,
} from "lucide-vue-next"
import type { ReviewsDataSet } from "~/types/company"

const props = defineProps<{
  data: ReviewsDataSet
}>()

const sortBy = ref("الأحدث أولاً")
const isDropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement>()

const sortOptions = [
  { value: "الأحدث أولاً", label: "الأحدث أولاً" },
  { value: "الأعلى تقييماً", label: "الأعلى تقييماً" },
  { value: "الأقل تقييماً", label: "الأقل تقييماً" },
]

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const selectSortOption = (val: string) => {
  sortBy.value = val
  isDropdownOpen.value = false
}

onClickOutside(dropdownRef, () => {
  isDropdownOpen.value = false
})
</script>

<template>
  <div class="grid grid-cols-1 gap-section lg:grid-cols-sidebar xl:grid-cols-sidebar items-start">
    <!-- Sidebar - Rating Summary -->
    <aside class="space-y-section">
      <div class="surface-panel p-content">
        <div class="space-y-section">
          <!-- Overall Rating -->
          <div class="text-center mb-section">
            <div class="text-[80px] leading-none font-black text-foreground tracking-tight">
              {{ data.overall }}
            </div>
            <div class="flex text-gold-star mt-element justify-center" role="img" :aria-label="`${data.overall} من 5 نجوم`">
              <Star
                v-for="i in 5"
                :key="i"
                class="size-9"
                :class="i <= Math.round(data.overall) ? 'fill-current' : 'text-border'"
                :stroke-width="1.5"
                :aria-hidden="i > Math.round(data.overall) ? 'true' : undefined"
              />
            </div>
            <div class="flex items-center justify-center gap-1 text-lg font-bold text-foreground mt-element">
              <span class="font-medium">{{ data.label }}</span>
              <span class="mx-1">•</span>
              <span>{{ data.totalReviews }} تقييم</span>
            </div>
          </div>

          <!-- Rating Breakdown Bars -->
          <div class="space-y-element pt-element">
            <div v-for="item in data.breakdown" :key="item.stars">
              <div class="flex justify-between items-end mb-compact">
                <span class="text-ds-caption-l text-foreground-muted font-medium">{{ item.stars }} نجوم</span>
                <div class="flex items-center gap-1">
                  <span class="text-ds-label-r font-bold text-foreground">{{ item.percentage }}%</span>
                  <span class="text-ds-caption-l text-foreground-subtle">({{ item.count }})</span>
                </div>
              </div>
              <div class="h-2.5 bg-surface-alt overflow-hidden w-full">
                <div
                  class="h-full bg-gold-star transition-all duration-500"
                  :style="{ width: item.percentage + '%' }"
                />
              </div>
            </div>
          </div>

          <!-- Detailed Ratings -->
          <div class="pt-section border-t border-border">
            <h4 class="text-ds-h6 font-bold text-foreground mb-element">تقييمات تفصيلية</h4>
            <div class="space-y-element">
              <div v-for="detail in data.detailedRatings" :key="detail.label">
                <div class="flex justify-between items-end mb-compact">
                  <span class="text-ds-caption-l text-foreground-muted font-medium">{{ detail.label }}</span>
                  <div class="flex items-center gap-1">
                    <span class="text-ds-label-r font-bold text-foreground">{{ detail.percentage }}%</span>
                    <span class="text-ds-caption-l text-foreground-subtle">({{ detail.count }})</span>
                  </div>
                </div>
                <div class="h-2.5 bg-surface-alt overflow-hidden w-full">
                  <div
                    class="h-full bg-gold-star transition-all duration-500"
                    :style="{ width: detail.percentage + '%' }"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Add Review Button -->
          <div class="pt-section border-t border-border">
            <button class="w-full bg-primary text-white font-bold py-3 hover:bg-primary-dark transition-colors text-ds-label-l" aria-label="أضف تقييمك">
              أضف تقييمك
            </button>
          </div>
        </div>
      </div>
    </aside>

    <!-- Reviews List -->
    <div class="min-w-0 space-y-section">
      <!-- CTA Banner -->
      <div class="surface-panel p-content flex items-center justify-between">
        <div>
          <h3 class="text-ds-h6 font-bold text-foreground">شارك تجربتك مع الآخرين</h3>
          <p class="text-ds-body-r text-foreground-muted mt-compact">تساعد مراجعتك الآخرين في اتخاذ القرار المناسب</p>
        </div>
        <button class="bg-primary hover:bg-primary-dark text-white font-bold py-element px-content transition-colors text-ds-label-r shadow-sm shrink-0 ms-content" aria-label="أضف تقييم">
          أضف تقييم
        </button>
      </div>

      <!-- Section Header -->
      <div class="section-heading">
        <div class="section-heading__title">
          <MessageSquare class="size-5 text-primary" :stroke-width="2" aria-hidden="true" />
          <h2 class="text-ds-h3 font-bold text-foreground">
            المراجعات
            <span class="text-primary font-bold">({{ data.totalReviews }})</span>
          </h2>
        </div>

        <div ref="dropdownRef" class="relative sort-dropdown-container">
          <button
            type="button"
            role="combobox"
            aria-haspopup="listbox"
            aria-label="ترتيب المراجعات"
            :aria-expanded="isDropdownOpen"
            class="surface-panel w-dropdown-trigger py-1.5 px-element text-foreground outline-none cursor-pointer text-ds-caption text-center font-medium"
            @click="toggleDropdown"
          >
            {{ sortOptions.find((o) => o.value === sortBy)?.label }}
          </button>

          <div
            v-if="isDropdownOpen"
            role="listbox"
            aria-label="ترتيب المراجعات"
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

      <!-- Reviews -->
      <div class="surface-panel divide-y divide-border">
        <div v-for="review in data.reviews" :key="review.id" class="p-content">
          <div class="flex items-start gap-content">
            <!-- Avatar -->
            <div class="w-10 h-10 bg-surface-alt overflow-hidden shrink-0">
              <img :alt="`صورة ${review.author}`" class="w-full h-full object-cover" :src="review.avatar">
            </div>

            <div class="flex-1 min-w-0">
              <!-- Header -->
              <div class="flex items-center justify-between mb-element">
                <div>
                  <h4 class="text-ds-label-l font-bold text-foreground">{{ review.author }}</h4>
                  <div class="flex items-center gap-element text-ds-caption-l text-foreground-muted mt-compact">
                    <span>{{ review.role }}</span>
                    <span class="w-0.5 h-0.5 bg-border" aria-hidden="true"></span>
                    <span>{{ review.time }}</span>
                  </div>
                </div>
                <div class="flex text-gold-star text-ds-caption-l gap-compact shrink-0 ms-content" role="img" :aria-label="`${review.rating} من 5 نجوم`">
                  <Star
                    v-for="i in 5"
                    :key="i"
                    class="size-4.5"
                    :class="i <= review.rating ? 'fill-current' : 'text-gold-star'"
                    :stroke-width="2"
                  />
                </div>
              </div>

              <!-- Badge -->
              <div v-if="review.badge" class="flex items-center gap-element mb-element">
                <span
                  class="text-ds-caption-s font-bold px-compact py-compact border"
                  :class="review.badge.variant === 'primary'
                    ? 'bg-primary/5 text-primary border-primary/10'
                    : 'bg-surface-alt text-foreground-subtle border-border'"
                >
                  {{ review.badge.text }}
                </span>
              </div>

              <!-- Body -->
              <p class="text-ds-body-r text-foreground-muted leading-relaxed mb-content">
                {{ review.body }}
              </p>

              <!-- Actions -->
              <div class="flex items-center gap-content">
                <button class="group flex items-center gap-1.5 text-foreground-subtle hover:text-foreground transition-colors text-ds-caption-l font-medium" aria-label="إعجاب">
                  <ThumbsUp class="size-4.5" :stroke-width="2" />
                  {{ review.likes }}
                </button>
                <button class="group flex items-center gap-1.5 text-foreground-subtle hover:text-foreground transition-colors text-ds-caption-l font-medium" aria-label="عدم إعجاب">
                  <ThumbsDown class="size-4.5" :stroke-width="2" />
                </button>
                <button class="group flex items-center gap-1.5 text-foreground-subtle hover:text-primary transition-colors text-ds-caption-l font-medium" aria-label="رد على المراجعة">
                  <MessageCircle class="size-4.5" :stroke-width="2" />
                  رد
                </button>
                <button class="ms-auto text-border hover:text-error transition-colors" aria-label="إبلاغ عن تعليق">
                  <Flag class="size-4.5" :stroke-width="2" />
                </button>
              </div>

              <!-- Company Reply Thread -->
              <div v-if="review.companyReply" class="mt-section pt-section border-t border-border">
                <div class="bg-primary-light/30 p-content border border-primary/10">
                  <div class="flex items-start gap-content">
                    <div class="w-8 h-8 bg-surface-alt overflow-hidden shrink-0 border border-white/50">
                      <img alt="شعار الشركة" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6LdSlIF5TRMicCT2EuW5PgL1O3Ds8F7rOGlMBIIo9TH2PEGaNEj-ezNCgra5g6Ha_0D1cI97J7jbYpZ0jwD3dA0sgFlJ2MQBbKhy5KgZXJIzjnvKOQckDfJ-O5YafoJhZpv6s28FWJCRbQExIE2RVMLyIeQdvvpwVyOb5M2eQtzcYMgcHXzXeSTBc7J3quOMrGJMFDShjsZ7Qi08-mbKb-LyvF8z1rhbXpZA9Er1s2df-B4k7EbT9MYRfLt976_nblThgJmsJw">
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center gap-element mb-compact">
                        <span class="text-ds-label-r font-bold text-foreground">الشركة المصرية للتوظيف</span>
                        <span class="text-ds-caption-s bg-primary text-white px-1.5 py-compact">مسؤول</span>
                      </div>
                      <p class="text-ds-caption-l text-foreground-muted leading-relaxed mb-element">
                        {{ review.companyReply.body }}
                      </p>
                      <div class="flex items-center gap-content">
                        <button class="group flex items-center gap-1.5 text-foreground-subtle hover:text-foreground transition-colors text-ds-caption-s font-medium" :aria-label="`إعجاب على رد ${review.author}`">
                          <ThumbsUp class="size-3.5" :stroke-width="2" />
                          {{ review.companyReply.likes }}
                        </button>
                        <button class="group flex items-center gap-1.5 text-foreground-subtle hover:text-primary transition-colors text-ds-caption-s font-medium" :aria-label="`رد على رد ${review.author}`">
                          <MessageCircle class="size-3.5" :stroke-width="2" />
                          رد
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Load More -->
      <div class="text-center">
        <button class="px-content py-element border border-border text-foreground-subtle text-ds-label-r font-medium hover:bg-surface-alt hover:text-foreground transition-colors" aria-label="عرض المزيد من المراجعات">
          عرض المزيد من المراجعات
        </button>
      </div>
    </div>
  </div>
</template>
