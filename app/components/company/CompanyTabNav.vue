<script setup lang="ts">
interface Tab {
  label: string
  count?: number
  href: string
  active?: boolean
}

defineProps<{
  tabs: Tab[]
}>()
</script>

<template>
  <div class="flex items-center gap-compact md:gap-element mb-content md:mb-section border-b border-border" role="tablist">
    <NuxtLink
      v-for="tab in tabs"
      :key="tab.label"
      :to="tab.href"
      class="px-content md:px-section py-element md:py-content text-ds-h5 transition-colors min-h-touch-target-min"
      role="tab"
      :aria-selected="!!tab.active"
      :class="tab.active
        ? 'font-bold text-primary border-b-2 border-primary'
        : 'font-medium text-foreground-subtle hover:text-foreground'"
    >
      {{ tab.label }}<span v-if="tab.count" class="ms-1">({{ tab.count }})</span>
    </NuxtLink>
  </div>
</template>
