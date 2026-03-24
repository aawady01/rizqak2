<script setup lang="ts">
import { cn } from '~/shared/utils/tailwind'

interface Props {
  class?: string
}

const props = defineProps<Props>()

const headerClass = computed(() => {
  return cn('[&_tr]:border-b', props.class)
})
</script>

<template>
  <thead data-slot="table-header" :class="headerClass">
    <slot />
  </thead>
</template>
