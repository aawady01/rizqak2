<script setup lang="ts">
import { cn } from '~/shared/utils/tailwind'

/**
 * BaseSectionHeader — Unified section header component for the entire application.
 *
 * Uses the exact same .section-heading pattern from the homepage:
 * - Icon on the right (text-primary, size-5, stroke-width="2")
 * - Title with BaseTypography h3, bold, text-foreground
 * - Optional subtitle/actions on the left side
 *
 * Matches HomeFeaturedCompanies and HomeJobList section headers.
 *
 * Usage:
 *   <BaseSectionHeader>
 *     <template #icon><Icon class="size-5 text-primary" :stroke-width="2" /></template>
 *     عنوان القسم
 *     <template #subtitle>وصف فرعي</template>
 *   </BaseSectionHeader>
 */
interface Props {
  class?: string
}

const props = defineProps<Props>()
</script>

<template>
  <div :class="cn('section-heading', props.class)">
    <div class="section-heading__title">
      <span v-if="$slots.icon">
        <slot name="icon" />
      </span>
      <slot />
    </div>
    <div v-if="$slots.subtitle">
      <slot name="subtitle" />
    </div>
  </div>
</template>
