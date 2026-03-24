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

// Optional: Add logic for the chevron buttons to scroll the container
// Currently they serve as UI markers as per the react implementation.
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
                : 'text-white/50',
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
            class="p-2 me-2 text-white/50 hover:text-white transition-all active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-white/50"
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
        <!-- Navigation Arrows -->
        <button
          class="-inset-inline-start-5 absolute top-1/2 -translate-y-1/2 z-carousel size-10 bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-primary-dark transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 shadow-xl active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          @click="null"
        >
          <ChevronRight class="size-5" :stroke-width="3" />
        </button>

        <div class="hero__countries-grid">
          <CountryCard
            v-for="country in countriesData"
            :key="country.id"
            :country="country"
            :is-selected="selectedCountry?.id === country.id"
            @click="handleCountrySelect"
          />
        </div>

        <button
          class="-inset-inline-end-5 absolute top-1/2 -translate-y-1/2 z-carousel size-10 bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-primary-dark transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 shadow-lg active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          @click="null"
        >
          <ChevronLeft class="size-5" :stroke-width="3" />
        </button>
      </div>
    </div>
  </section>
</template>
