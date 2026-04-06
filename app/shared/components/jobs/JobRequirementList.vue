<script setup lang="ts">
import { cn } from '~/shared/utils/tailwind'

export interface RequirementItem {
  label: string
  value: string
}

interface Props {
  items: RequirementItem[]
  class?: string
}

const props = defineProps<Props>()
</script>

<template>
  <ul :class="cn('relative mr-2.5 border-r-2 border-primary/20', props.class)">
    <li
      v-for="(item, index) in items"
      :key="item.label"
      class="relative pr-8"
      :class="index < items.length - 1 ? 'pb-8' : ''"
    >
      <span class="absolute -right-[11px] top-1.5 z-10 h-4 w-4 rounded-full bg-primary ring-4 ring-surface dark:ring-surface" />
      <span class="mb-2 block text-ds-body-s font-normal text-foreground-muted dark:text-foreground-muted">{{ item.label }}</span>
      <p class="text-ds-body-m font-bold leading-relaxed text-foreground dark:text-foreground">{{ item.value }}</p>
    </li>
  </ul>
</template>
