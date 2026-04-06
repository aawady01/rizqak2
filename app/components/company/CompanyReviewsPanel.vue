<script setup lang="ts">
import {
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Flag,
  ChevronDown,
  ArrowDown,
} from "lucide-vue-next"
import type { ReviewsDataSet } from "~/types/company"

const props = defineProps<{
  data: ReviewsDataSet
}>()

const sortBy = ref("الأحدث أولاً")
</script>

<template>
  <div class="grid grid-cols-1 gap-section lg:grid-cols-sidebar xl:grid-cols-sidebar items-start">
    <!-- Sidebar - Rating Summary -->
    <aside class="space-y-section">
      <div class="rounded-none border border-border bg-surface p-content">
        <div class="space-y-section">
          <!-- Overall Rating -->
          <div>
            <div class="text-5xl md:text-6xl font-black text-foreground tracking-tight leading-none mb-2">
              {{ data.overall }}
            </div>
            <div class="flex items-center gap-1 text-sm text-foreground-muted mb-section">
              <span class="font-medium">{{ data.label }}</span>
              <span class="mx-1">•</span>
              <span>{{ data.totalReviews }} تقييم</span>
            </div>
            <div class="flex text-gold-star text-lg" role="img" :aria-label="`${data.overall} من 5 نجوم`">
              <Star
                v-for="i in 5"
                :key="i"
                class="size-5"
                :class="i <= Math.round(data.overall) ? 'fill-current' : 'text-border'"
                :stroke-width="2"
                :aria-hidden="i > Math.round(data.overall) ? 'true' : undefined"
              />
            </div>
          </div>

          <!-- Rating Breakdown Bars -->
          <div class="space-y-element pt-element">
            <div v-for="item in data.breakdown" :key="item.stars">
              <div class="flex justify-between items-end mb-compact">
                <span class="text-xs text-foreground-muted font-medium">{{ item.stars }} نجوم</span>
                <div class="flex items-center gap-1">
                  <span class="text-xs font-bold text-foreground">{{ item.percentage }}%</span>
                  <span class="text-xs text-foreground-subtle">({{ item.count }})</span>
                </div>
              </div>
              <div class="h-2 bg-surface-alt rounded-full overflow-hidden w-full">
                <div
                  class="h-full bg-gold-star rounded-full transition-all duration-500"
                  :style="{ width: item.percentage + '%' }"
                />
              </div>
            </div>
          </div>

          <!-- Detailed Ratings -->
          <div class="pt-section border-t border-border">
            <h4 class="text-sm font-bold text-foreground mb-element">تقييمات تفصيلية</h4>
            <div class="space-y-element">
              <div v-for="detail in data.detailedRatings" :key="detail.label">
                <div class="flex justify-between items-end mb-compact">
                  <span class="text-xs text-foreground-muted font-medium">{{ detail.label }}</span>
                  <div class="flex items-center gap-1">
                    <span class="text-xs font-bold text-foreground">{{ detail.percentage }}%</span>
                    <span class="text-xs text-foreground-subtle">({{ detail.count }})</span>
                  </div>
                </div>
                <div class="h-2 bg-surface-alt rounded-full overflow-hidden w-full">
                  <div
                    class="h-full bg-gold-star rounded-full transition-all duration-500"
                    :style="{ width: detail.percentage + '%' }"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Add Review Button -->
          <div class="mt-section pt-section border-t border-border">
            <button class="w-full bg-primary text-white font-bold py-3 rounded-none hover:bg-primary-dark transition-colors" aria-label="أضف تقييمك">
              أضف تقييمك
            </button>
          </div>
        </div>
      </div>
    </aside>

    <!-- Reviews List -->
    <div class="min-w-0">
      <!-- CTA Banner -->
      <div class="bg-background-sub rounded-none border border-border/50 p-content mb-section flex items-center justify-between">
        <div>
          <h3 class="font-bold text-foreground">شارك تجربتك مع الآخرين</h3>
          <p class="text-sm text-foreground-muted mt-compact">تساعد مراجعتك الآخرين في اتخاذ القرار المناسب</p>
        </div>
        <button class="bg-primary hover:bg-primary-dark text-white font-bold py-element px-content rounded-none transition-colors text-sm shadow-sm" aria-label="أضف تقييم">
          أضف تقييم
        </button>
      </div>

      <!-- Sort Dropdown -->
      <div class="flex items-center justify-end mb-section">
        <div class="relative">
          <select
            v-model="sortBy"
            aria-label="ترتيب المراجعات"
            class="appearance-none bg-surface border border-border text-foreground py-1.5 pe-8 ps-3 rounded-none text-sm font-medium focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
          >
            <option>الأحدث أولاً</option>
            <option>الأعلى تقييماً</option>
            <option>الأقل تقييماً</option>
          </select>
          <ChevronDown class="size-4.5 text-foreground-subtle absolute left-2 top-2 pointer-events-none" :stroke-width="2" />
        </div>
      </div>

      <!-- Reviews -->
      <div class="space-y-0 divide-y divide-border">
        <div v-for="review in data.reviews" :key="review.id" class="py-section first:pt-0">
          <div class="flex items-start gap-content">
            <!-- Avatar -->
            <div class="w-10 h-10 rounded-full bg-surface-alt overflow-hidden shrink-0">
              <img :alt="`صورة ${review.author}`" class="w-full h-full object-cover" :src="review.avatar">
            </div>

            <div class="flex-1">
              <!-- Header -->
              <div class="flex items-center justify-between mb-element">
                <div>
                  <h4 class="font-bold text-foreground text-sm">{{ review.author }}</h4>
                  <div class="flex items-center gap-element text-xs text-foreground-muted mt-compact">
                    <span>{{ review.role }}</span>
                    <span class="w-0.5 h-0.5 rounded-full bg-border" aria-hidden="true"></span>
                    <span>{{ review.time }}</span>
                  </div>
                </div>
                <div class="flex text-gold-star text-xs gap-compact" role="img" :aria-label="`${review.rating} من 5 نجوم`">
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
                  class="text-[10px] font-bold px-compact py-compact rounded border"
                  :class="review.badge.variant === 'primary'
                    ? 'bg-primary/5 text-primary border-primary/10'
                    : 'bg-surface-alt text-foreground-subtle border-border'"
                >
                  {{ review.badge.text }}
                </span>
              </div>

              <!-- Body -->
              <p class="text-foreground-muted text-sm leading-relaxed mb-content">
                {{ review.body }}
              </p>

              <!-- Actions -->
              <div class="flex items-center gap-content">
                <button class="group flex items-center gap-1.5 text-foreground-subtle hover:text-foreground transition-colors text-xs font-medium" aria-label="إعجاب">
                  <ThumbsUp class="size-4.5" :stroke-width="2" />
                  {{ review.likes }}
                </button>
                <button class="group flex items-center gap-1.5 text-foreground-subtle hover:text-foreground transition-colors text-xs font-medium" aria-label="عدم إعجاب">
                  <ThumbsDown class="size-4.5" :stroke-width="2" />
                </button>
                <button class="group flex items-center gap-1.5 text-foreground-subtle hover:text-primary transition-colors text-xs font-medium" aria-label="رد على المراجعة">
                  <MessageCircle class="size-4.5" :stroke-width="2" />
                  رد
                </button>
                <button class="ms-auto text-border hover:text-error transition-colors" aria-label="إبلاغ عن تعليق">
                  <Flag class="size-4.5" :stroke-width="2" />
                </button>
              </div>

              <!-- Company Reply Thread -->
              <div v-if="review.companyReply" class="mt-6 space-y-6 relative bg-primary-light/30 -me-4 -ms-4 ps-4 pe-4 pt-4 pb-4 rounded-none">
                <!-- Reply Thread Visual -->
                <div class="relative pe-4">
                  <div class="absolute end-0 top-[-16px] w-5 h-5 flex items-center justify-center -me-[8.5px] z-10 bg-primary-light/30 rounded-full">
                    <ArrowDown class="size-5 text-primary-active" :stroke-width="2" />
                  </div>
                  <div class="absolute end-0 top-0 bottom-[-24px] w-[3px] bg-primary rounded-full"></div>

                  <!-- Company Reply -->
                  <div class="bg-primary-light rounded-none p-4 border border-primary/20 relative">
                    <div class="flex items-start gap-3">
                      <div class="w-8 h-8 rounded-full border border-white/50 overflow-hidden shrink-0">
                        <img alt="شعار الشركة" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6LdSlIF5TRMicCT2EuW5PgL1O3Ds8F7rOGlMBIIo9TH2PEGaNEj-ezNCgra5g6Ha_0D1cIb97J7jbYpZ0jwD3dA0sgFlJ2MQBbKhy5KgZXJIzjnvKOQckDfJ-O5YafoJhZpv6s28FWJCRbQExIE2RVMLyIeQdvvpwVyOb5M2eQtzcYMgcHXzXeSTBc7J3quOMrGJMFDShjsZ7Qi08-mbKb-LyvF8z1rhbXpZA9Er1s2df-B4k7EbT9MYRfLt976_nblThgJmsJw">
                      </div>
                      <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2 mb-1">
                          <span class="text-xs font-bold text-foreground">الشركة المصرية للتوظيف</span>
                          <span class="text-[10px] bg-primary text-white px-1.5 rounded">مسؤول</span>
                        </div>
                        <p class="text-xs text-foreground-muted leading-relaxed mb-3">
                          {{ review.companyReply.body }}
                        </p>
                        <div class="flex items-center gap-6">
                          <button class="group flex items-center gap-1.5 text-foreground-subtle hover:text-foreground transition-colors text-[10px] font-medium" :aria-label="`إعجاب على رد ${review.author}`">
                            <ThumbsUp class="size-3.5" :stroke-width="2" />
                            {{ review.companyReply.likes }}
                          </button>
                          <button class="group flex items-center gap-1.5 text-foreground-subtle hover:text-primary transition-colors text-[10px] font-medium" :aria-label="`رد على رد ${review.author}`">
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
      </div>

      <!-- Load More -->
      <div class="mt-section pt-section border-t border-border text-center">
        <button class="px-content py-element rounded-none border border-border text-foreground-subtle text-sm font-medium hover:bg-surface-alt hover:text-foreground transition-colors" aria-label="عرض المزيد من المراجعات">
          عرض المزيد من المراجعات
        </button>
      </div>
    </div>
  </div>
</template>
