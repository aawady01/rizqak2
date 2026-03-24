<script setup lang="ts">
import { cn } from '~/shared/utils/tailwind'

const modelValue = defineModel<string>()

interface Props {
  id?: string
  class?: string
}

const props = defineProps<Props>()

const textareaId = computed(() => props.id)

const textareaClass = computed(() => {
  return cn(
    'resize-none border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-input-background px-3 py-2 text-base transition-color-shadow outline-none focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
    props.class,
  )
})
</script>

<template>
  <textarea
    :id="textareaId"
    v-model="modelValue"
    data-slot="textarea"
    :class="textareaClass"
    v-bind="$attrs"
  />
</template>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>
