<script setup lang="ts">
import { ChevronRight, ChevronLeft, SquareCheckBig } from "lucide-vue-next";
import CompanyCard from "../companies/CompanyCard.vue";
import BaseTypography from "~/shared/components/base/BaseTypography.vue";
import { companiesData } from "~/shared/utils/mockData";

const carouselRef = ref<HTMLElement | null>(null);
const { scrollCarousel } = useCarouselScroll(carouselRef);
</script>

<template>
  <section id="companies" class="relative scroll-mt-24">
    <div class="section-heading">
      <div class="section-heading__title">
        <SquareCheckBig class="size-5 text-primary" :stroke-width="2" aria-hidden="true" />
        <BaseTypography variant="h3" tag="h2" class="font-bold text-foreground">
          {{ $t('homeFeaturedCompanies.title') }}
        </BaseTypography>
      </div>

      <BaseTypography
        variant="caption-l"
        weight="medium"
        color="text-primary"
        class="tracking-wide"
      >
        {{ $t('homeFeaturedCompanies.subtitle') }}
      </BaseTypography>
    </div>

    <div class="relative group/carousel">
      <div 
        ref="carouselRef" 
        class="grid grid-flow-col auto-cols-[calc(50%-var(--spacing-content)/2)] md:auto-cols-[calc(25%-var(--spacing-content)*3/4)] gap-content overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory"
      >
        <CompanyCard
          v-for="company in companiesData"
          :key="company.id"
          :company="company"
          class="snap-start"
        />
      </div>

      <!-- Navigation Arrows (RTL: right=prev, left=next) -->
      <button
        :aria-label="$t('homeFeaturedCompanies.prev')"
        class="carousel-control carousel-control--surface inset-inline-start-overhang-md group/btn group-hover/carousel:opacity-100 focus-visible:ring-2 focus-visible:ring-primary-500"
        @click="scrollCarousel(1)"
      >
        <ChevronRight
          class="size-5 transition-transform group-hover/btn:scale-110"
          :stroke-width="2.5"
        />
      </button>
      <button
        :aria-label="$t('homeFeaturedCompanies.next')"
        class="carousel-control carousel-control--surface inset-inline-end-overhang-md group/btn group-hover/carousel:opacity-100 focus-visible:ring-2 focus-visible:ring-primary-500"
        @click="scrollCarousel(-1)"
      >
        <ChevronLeft
          class="size-5 transition-transform group-hover/btn:scale-110"
          :stroke-width="2.5"
        />
      </button>
    </div>
  </section>
</template>
