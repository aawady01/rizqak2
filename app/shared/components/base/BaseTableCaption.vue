<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '~/shared/utils/tailwind'

interface Props {
  class?: any
}

const props = defineProps<Props>()

const captionClass = computed(() => {
  return cn('text-muted-foreground mt-4 text-sm', props.class)
})
</script>

<template>
  <caption data-slot="table-caption" :class="captionClass" v-bind="$attrs">
    <slot />
  </caption>
</template>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>
