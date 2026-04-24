<script setup lang="ts">
interface Props {
  count: number
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: 'عنصر محدد',
})
</script>

<template>
  <div
    v-if="count > 0"
    class="sticky top-24 z-20 border border-primary/20 bg-primary/10 px-content py-element shadow-sm"
  >
    <div class="flex flex-col gap-element xl:flex-row xl:items-center xl:justify-between">
      <div class="flex items-center gap-element">
        <span class="inline-flex min-w-10 items-center justify-center border border-primary/20 bg-surface px-2 py-1 text-ds-body-s font-extrabold text-primary">
          {{ count }}
        </span>
        <p class="text-ds-body-r font-bold text-foreground">
          {{ label }}
        </p>
      </div>

      <div class="flex flex-wrap gap-element">
        <slot />
      </div>
    </div>
  </div>
</template>
