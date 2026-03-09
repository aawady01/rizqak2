<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '~/shared/utils/tailwind'

interface Props {
  class?: any
}

const props = defineProps<Props>()

const rowClass = computed(() => {
  return cn('hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors', props.class)
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
