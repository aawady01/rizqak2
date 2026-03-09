<script setup lang="ts">
import { computed } from 'vue'
import { Label } from 'radix-vue'
import { cn } from '~/shared/utils/tailwind'

interface Props {
  for?: string
  class?: any
}

const props = defineProps<Props>()

const labelClass = computed(() => {
  return cn(
    'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
    props.class,
  )
})
</script>

<template>
  <Label :for="props.for" :class="labelClass" data-slot="label" v-bind="$attrs">
    <slot />
  </Label>
</template>
