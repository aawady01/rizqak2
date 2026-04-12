<script setup lang="ts">
import { cn } from '~/shared/utils/tailwind'

interface Props {
  class?: string
}

const props = defineProps<Props>()

const captionClass = computed(() => {
  return cn('text-muted-foreground mt-content text-ds-body-r', props.class)
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
