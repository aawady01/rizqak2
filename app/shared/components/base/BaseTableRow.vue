<script setup lang="ts">
import { cn } from '~/shared/utils/tailwind'

interface Props {
  class?: string
}

const props = defineProps<Props>()

const rowClass = computed(() => {
  return cn('table-row-base hover:bg-muted/50 border-b transition-colors', props.class)
})
</script>

<template>
  <tr data-slot="table-row" :class="rowClass" v-bind="$attrs">
    <slot />
  </tr>
</template>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>
