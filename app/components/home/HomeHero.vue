<script setup lang="ts">
import { Search, ChevronRight, ChevronLeft, X } from "lucide-vue-next";
import CountryCard from "./CountryCard.vue";
import BaseTypography from "~/shared/components/base/BaseTypography.vue";
import BaseButton from "~/shared/components/base/BaseButton.vue";
import { countriesData } from "~/shared/utils/mockData";
import type { Country } from "~/shared/utils/mockData";

const emit = defineEmits<{
  search: [query: string];
  countrySelect: [country: Country];
}>();

const searchQuery = ref("");
const selectedCountry = ref<Country | null>(null);
const isFocused = ref(false);

const handleSearch = () => {
  emit("search", searchQuery.value);
};

const clearSearch = () => {
  searchQuery.value = "";
};

const handleCountrySelect = (country: Country) => {
  selectedCountry.value = country;
  emit("countrySelect", country);
};

const carouselRef = ref<HTMLElement | null>(null);
const { scrollCarousel } = useCarouselScroll(carouselRef, { fallbackRatio: 0.7 });
</script>

<template>
  <section id="hero" class="relative isolate overflow-hidden bg-primary hero__section">
    <div class="relative z-10 max-w-5xl mx-auto text-center">
      <BaseTypography
        variant="display-l"
        tag="h1"
        class="hero__title text-white tracking-tight drop-shadow-sm"
      >
        {{ $t('hero.title') }}
      </BaseTypography>

      <!-- Subtitle -->
      <BaseTypography variant="subtitle-l" class="hero__subtitle">
        {{ $t('hero.subtitle') }}
      </BaseTypography>

      <!-- Search Interface -->
      <div class="relative max-w-2xl mx-auto group">
        <!-- Glow effect on focus -->
        <div
          :class="[
            'absolute -inset-0.5 bg-accent-400 transition-all duration-500 opacity-0 blur-sm z-0',
            isFocused ? 'opacity-30' : 'group-hover:opacity-10',
          ]"
        />

        <div
          class="relative hero__search-container z-10 transition-all duration-300"
        >
          <div
            :class="[
              'hero__search-icon-box',
              isFocused
                ? 'bg-primary text-white border-primary'
                : 'text-foreground-muted',
            ]"
          >
            <Search class="size-5" :stroke-width="2.5" />
          </div>

          <label for="hero-search" class="sr-only">{{ $t('hero.searchPlaceholder') }}</label>
          <input
            id="hero-search"
            v-model="searchQuery"
            type="text"
            class="hero__search-input text-foreground placeholder:text-neutral-400"
            :placeholder="$t('hero.searchPlaceholder')"
            @focus="isFocused = true"
            @blur="isFocused = false"
            @keydown.enter="handleSearch"
          >

          <!-- Clear Action -->
          <button
            v-if="searchQuery"
            :aria-label="$t('hero.clearSearch')"
            class="p-2 me-2 text-white/50 hover:text-white transition-all active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-white/50 cursor-pointer"
            @click="clearSearch"
          >
            <X class="size-5" />
          </button>

          <BaseButton
            variant="default"
            class="hero__search-button text-white"
            @click="handleSearch"
          >
            {{ $t('hero.searchButton') }}
          </BaseButton>
        </div>
      </div>

      <!-- Countries Carousel -->
      <div
        class="relative hero__carousel-container group/carousel max-w-4xl mx-auto"
      >
        <!-- Navigation Arrows (RTL: right=prev, left=next) -->
        <button
          :aria-label="$t('countryCarousel.previous')"
          class="carousel-control carousel-control--shell inset-inline-start-overhang-md group-hover/carousel:opacity-100 focus-visible:ring-2 focus-visible:ring-white/50"
          @click="scrollCarousel(1)"
        >
          <ChevronRight class="size-5" :stroke-width="3" />
        </button>

        <div ref="carouselRef" class="hero__countries-grid">
          <CountryCard
            v-for="country in countriesData"
            :key="country.id"
            :country="country"
            :is-selected="selectedCountry?.id === country.id"
            @click="handleCountrySelect"
          />
        </div>

        <button
          :aria-label="$t('countryCarousel.next')"
          class="carousel-control carousel-control--shell inset-inline-end-overhang-md group-hover/carousel:opacity-100 focus-visible:ring-2 focus-visible:ring-white/50"
          @click="scrollCarousel(-1)"
        >
          <ChevronLeft class="size-5" :stroke-width="3" />
        </button>
      </div>
    </div>
  </section>
</template>
