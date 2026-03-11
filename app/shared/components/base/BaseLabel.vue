<script setup lang="ts">
import { computed } from 'vue'
import { Label } from 'reka-ui'
import { cn } from '~/shared/utils/tailwind'

interface Props {
  for?: string
  class?: any
}

const props = defineProps<Props>()

const labelClass = computed(() => {
  return cn(
    'base-label peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
    props.class,
  )
})
</script>

<template>
  <Label :for="props.for" :class="labelClass" data-slot="label" v-bind="$attrs">
    <slot />
  </Label>
</template>
