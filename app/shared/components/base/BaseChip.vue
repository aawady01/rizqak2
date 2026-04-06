<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '~/shared/utils/tailwind'

/**
 * BaseChip — Unified chip/tag component for the entire application.
 *
 * Unified properties across ALL chips:
 * - Background: bg-surface-alt (one color for every chip)
 * - Hover: hover:bg-surface-hover (one effect for every chip)
 * - Border: border-border
 * - Radius: rounded-none
 * - Padding: px-element py-1 (default sm)
 * - Font: text-ds-caption-r font-medium
 * - Transition: transition-colors duration-fast
 *
 * Only text color varies by variant.
 */
const chipVariants = cva(
  'inline-flex items-center rounded-none border border-border bg-surface-alt whitespace-nowrap transition-colors duration-fast hover:bg-surface-hover dark:hover:bg-primary/10 dark:hover:border-primary/20',
  {
    variants: {
      variant: {
        /** Default: neutral text — benefit tags, specs, filters */
        default: 'text-foreground-muted',
        /** Primary: brand text — salary, key highlights */
        primary: 'text-primary',
        /** Success: green text — status badges */
        success: 'text-success',
        /** Destructive: error text — warnings */
        destructive: 'text-error',
      },
      size: {
        xs: 'px-compact py-0.5 text-ds-caption-s',
        sm: 'px-element py-1 text-ds-caption-r',
        md: 'px-content py-1 text-ds-caption-r',
        lg: 'px-content py-element text-ds-caption-l',
      },
      weight: {
        normal: 'font-normal',
        medium: 'font-medium',
        bold: 'font-bold',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
      weight: 'medium',
    },
  },
)

type ChipVariants = VariantProps<typeof chipVariants>

interface Props {
  variant?: ChipVariants['variant']
  size?: ChipVariants['size']
  weight?: ChipVariants['weight']
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'sm',
  weight: 'medium',
})

const chipClass = computed(() =>
  cn(chipVariants({ variant: props.variant, size: props.size, weight: props.weight }), props.class),
)
</script>

<template>
  <span :class="chipClass" data-slot="chip">
    <slot />
  </span>
</template>
