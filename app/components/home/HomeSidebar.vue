<script setup lang="ts">
import { SlidersHorizontal, X } from "lucide-vue-next";
import HomeFilterContent from "./HomeFilterContent.vue";
import { useMobileFilter } from "~/composables/filters/useMobileFilter";

interface Props {
  totalResults?: number;
}

const props = withDefaults(defineProps<Props>(), {
  totalResults: 145,
});

const emit = defineEmits<{
  (e: 'clear-filters'): void;
}>();

const { isMobileFilterOpen, closeFilter } = useMobileFilter();
</script>

<template>
  <div class="contents">
    <!-- Desktop Sidebar (Hidden on Mobile) -->
    <aside class="order-1 h-full pb-section hidden lg:block">
      <div class="sticky top-[56px] h-[calc(100vh-56px)] flex flex-col">
        <!-- Unified Filter Card -->
        <div class="surface-panel flex flex-col flex-1 min-h-0 overflow-hidden relative mt-content">
          <HomeFilterContent
            :total-results="totalResults"
            @clear-filters="$emit('clear-filters')"
          />
        </div>
      </div>
    </aside>

    <!-- Mobile Floating Action Button (Only below lg) -->
    <div class="lg:hidden">
      <!-- FAB Trigger -->
      <button
        type="button"
        class="fixed bottom-4 inset-e-4 z-fixed flex items-center gap-2 rounded-full bg-primary px-5 py-3 shadow-lg text-white transition-transform duration-200 hover:bg-primary-dark active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        aria-label="Toggle Filters"
        @click="isMobileFilterOpen = true"
      >
        <SlidersHorizontal class="size-5" aria-hidden="true" />
        <span class="text-ds-body-r font-bold">{{ $t('sidebar.title') }}</span>
      </button>

      <!-- Full-Screen Overlay Backdrop -->
      <Transition
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
        enter-active-class="transition-opacity duration-200 ease-out"
        leave-active-class="transition-opacity duration-150 ease-in"
      >
        <button
          v-if="isMobileFilterOpen"
          type="button"
          class="fixed inset-0 z-[calc(z-fixed+1)] bg-foreground/50 border-0 cursor-pointer"
          aria-label="Close filter overlay"
          @click="closeFilter"
          @keydown.esc="closeFilter"
        />
      </Transition>

      <Transition
        enter-from-class="translate-x-full opacity-0"
        leave-to-class="translate-x-full opacity-0"
        enter-active-class="transition-all duration-300 ease-out"
        leave-active-class="transition-all duration-200 ease-in"
      >
        <div
          v-if="isMobileFilterOpen"
          role="dialog"
          aria-modal="true"
          :aria-label="$t('sidebar.title')"
          class="fixed inset-y-0 inset-e-0 z-[calc(z-fixed+2)] w-full sm:max-w-[400px] bg-surface shadow-xl flex flex-col"
        >
          <!-- Close Button -->
          <div class="flex items-center justify-between p-content border-b border-border">
            <h2 class="text-ds-h4 font-bold text-foreground">
              {{ $t('sidebar.title') }}
            </h2>
            <button
              type="button"
              class="p-2 rounded-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Close filter overlay"
              @click="closeFilter"
            >
              <X class="size-5" aria-hidden="true" />
            </button>
          </div>

          <!-- Filter Content -->
          <HomeFilterContent
            :total-results="totalResults"
            is-mobile
            @clear-filters="$emit('clear-filters')"
            @apply="closeFilter"
          />
        </div>
      </Transition>
    </div>
  </div>
</template>
