<template>
  <div class="relative max-w-3xl mx-auto mt-12 group/carousel">
    <!-- Prev Arrow -->
    <button
      aria-label="السابق"
      class="absolute inset-inline-end-overhang-lg top-1/2 -translate-y-1/2 size-10 bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/30 transition-all z-20 text-white rounded-none opacity-0 group-hover/carousel:opacity-100"
    >
      <span class="material-symbols-outlined text-icon-material-md">chevron_right</span>
    </button>

    <!-- Country Grid -->
    <div class="grid grid-cols-3 sm:grid-cols-6 gap-4 mx-auto px-0">
      <button
        v-for="country in countries"
        :key="country.name"
        class="group relative h-24 bg-white/5 border border-white/10 hover:bg-white/15 hover:border-white/30 transition-all flex flex-col items-center justify-center gap-2 p-3 rounded-none overflow-hidden"
      >
        <!-- Glass Effect -->
        <div
          class="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
        />

        <div class="text-3xl leading-none mb-1 relative z-10">
          {{ country.flag }}
        </div>
        <div class="flex flex-col items-center relative z-10">
          <span
            class="text-ds-caption-l text-white font-bold whitespace-nowrap"
          >
            {{ country.name }}
          </span>
          <span
            v-if="country.count"
            class="text-ds-caption-s text-white/60 font-medium"
          >
            {{ country.count }} وظيفة
          </span>
        </div>
      </button>
    </div>

    <!-- Next Arrow -->
    <button
      aria-label="التالي"
      class="absolute inset-inline-start-overhang-lg top-1/2 -translate-y-1/2 size-10 bg-white/10 border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white hover:text-primary hover:border-white transition-all z-20 text-white shadow-sm group/btn rounded-none opacity-0 group-hover/carousel:opacity-100"
    >
      <span
        class="material-symbols-outlined text-icon-material-md transition-transform group-hover/btn:scale-110"
        >chevron_left</span
      >
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Country } from "../../shared/types";

defineProps<{
  countries: Country[];
}>();
</script>
