<script setup lang="ts">
import { Label } from 'reka-ui'
import { cn } from '~/shared/utils/tailwind'

interface Props {
  for?: string
  class?: string
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
  <Label
    :class="labelClass"
    :for="props.for"
    :data-for="props.for"
    data-slot="label"
    v-bind="$attrs"
  >
    <slot />
  </Label>
</template>
