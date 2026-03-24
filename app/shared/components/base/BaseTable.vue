<script setup lang="ts">
import { cn } from '~/shared/utils/tailwind'

interface Props {
  class?: string
}

const props = defineProps<Props>()

const tableClass = computed(() => {
  return cn('w-full caption-bottom text-sm', props.class)
})
</script>

<template>
  <div data-slot="table-container" class="relative w-full overflow-x-auto">
    <table data-slot="table" :class="tableClass" v-bind="$attrs">
      <slot />
    </table>
  </div>
</template>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>
