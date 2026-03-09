<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '~/shared/utils/tailwind'

interface Props {
  class?: any
}

const props = defineProps<Props>()

const footerClass = computed(() => {
  return cn('bg-muted/50 border-t font-medium [&>tr]:last:border-b-0', props.class)
})
</script>

<template>
  <tfoot data-slot="table-footer" :class="footerClass" v-bind="$attrs">
    <slot />
  </tfoot>
</template>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>
