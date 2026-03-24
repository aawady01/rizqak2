<script setup lang="ts">

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
      return 'w-6 h-flag-sm'
    case 'lg':
      return 'w-12 h-9'
    case 'md':
    default:
      return 'w-8 h-6'
  }
})

const radiusClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'rounded-flag-sm'
    case 'lg':
      return 'rounded-flag-lg'
    case 'md':
    default:
      return 'rounded-flag-md'
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
      radiusClass,
      sizeClasses
    ]" 
  >
  <!-- Fallback if no countryCode is provided (could be an icon or empty space) -->
  <div 
    v-else
    :class="[
      'bg-muted/50 dark:bg-muted/20 flex-shrink-0',
      radiusClass,
      sizeClasses
    ]"
    aria-hidden="true"
  />
</template>
