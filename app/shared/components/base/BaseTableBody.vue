<script setup lang="ts">
import { cn } from '~/shared/utils/tailwind'

interface Props {
  class?: string
}

const props = defineProps<Props>()

const bodyClass = computed(() => {
  return cn('[&_tr:last-child]:border-0', props.class)
})
</script>

<template>
  <tbody data-slot="table-body" :class="bodyClass">
    <slot />
  </tbody>
</template>
