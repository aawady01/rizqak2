<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  /** The ISO country code (e.g., 'sa', 'eg') used to construct the SVG filename */
  countryCode?: string
  /** Controls the dimensions of the flag */
  size?: 'sm' | 'md' | 'lg'
  /** Accessibility text for the image */
  alt?: string
}>()

// Map size prop to specific Tailwind dimension classes
// sm: Used in JobCards
// md: Used in CountryCards
// lg: Available for future use (e.g., Company Profile)
const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-6 h-[18px]'
    case 'lg':
      return 'w-12 h-9 rounded-[4px]'
    case 'md':
    default:
      return 'w-8 h-6 rounded-[3px]'
  }
})
</script>

<template>
  <img 
    v-if="countryCode"
    :src="`/images/flags/${countryCode}.svg`" 
    :alt="alt || `Flag ${countryCode}`" 
    :class="[
      'object-cover flex-shrink-0',
      'border border-black/10 dark:border-white/10 shadow-sm',
      size === 'sm' ? 'rounded-[2px]' : 'rounded-[3px]',
      sizeClasses
    ]" 
  />
  <!-- Fallback if no countryCode is provided (could be an icon or empty space) -->
  <div 
    v-else
    :class="[
      'bg-muted/50 dark:bg-muted/20 flex-shrink-0 rounded-[2px]',
      sizeClasses
    ]"
    aria-hidden="true"
  ></div>
</template>
