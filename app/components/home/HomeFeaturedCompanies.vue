<script setup lang="ts">
import { ChevronRight, ChevronLeft, SquareCheckBig } from "lucide-vue-next";
import CompanyCard from "../companies/CompanyCard.vue";
import BaseTypography from "~/shared/components/base/BaseTypography.vue";
import { companiesData } from "~/shared/utils/mockData";
</script>

<template>
  <section id="companies" class="relative scroll-mt-24">
    <div class="flex justify-between items-center mb-content">
      <div class="flex items-center gap-compact">
        <SquareCheckBig class="size-5 text-primary" :stroke-width="2" aria-hidden="true" />
        <BaseTypography variant="h3" tag="h2" class="font-bold text-foreground">
          شركات توظيف مميزة
        </BaseTypography>
      </div>

      <BaseTypography
        variant="caption-l"
        weight="medium"
        color="text-primary"
        class="tracking-wide"
      >
        مختارة بعناية
      </BaseTypography>
    </div>

    <div class="relative group/carousel">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
        <CompanyCard
          v-for="company in companiesData"
          :key="company.id"
          :company="company"
        />
      </div>

      <button
        aria-label="السابق"
        class="absolute inset-inline-end-overhang-md top-1/2 -translate-y-1/2 size-10 bg-surface border border-border flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white hover:border-primary transition-all z-carousel text-foreground-muted shadow-md group/btn rounded-none opacity-0 group-hover/carousel:opacity-100 outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
      >
        <ChevronRight
          class="size-5 transition-transform group-hover/btn:scale-110"
          :stroke-width="2.5"
        />
      </button>
      <button
        aria-label="التالي"
        class="absolute inset-inline-start-overhang-md top-1/2 -translate-y-1/2 size-10 bg-surface border border-border flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white hover:border-primary transition-all z-carousel text-foreground-muted shadow-md group/btn rounded-none opacity-0 group-hover/carousel:opacity-100 outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
      >
        <ChevronLeft
          class="size-5 transition-transform group-hover/btn:scale-110"
          :stroke-width="2.5"
        />
      </button>
    </div>
  </section>
</template>
