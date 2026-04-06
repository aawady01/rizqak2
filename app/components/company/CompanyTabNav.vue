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
  <div class="flex items-center gap-2 md:gap-2.5 mb-5 md:mb-6 border-b border-border">
    <NuxtLink
      v-for="tab in tabs"
      :key="tab.label"
      :to="tab.href"
      class="px-4 md:px-6 py-3 md:py-4 text-ds-h5 transition-colors"
      :class="tab.active
        ? 'font-bold text-primary border-b-2 border-primary'
        : 'font-medium text-foreground-subtle hover:text-foreground'"
    >
      {{ tab.label }}<span v-if="tab.count" class="ms-1">({{ tab.count }})</span>
    </NuxtLink>
  </div>
</template>
