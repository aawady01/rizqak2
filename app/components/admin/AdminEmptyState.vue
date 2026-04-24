<script setup lang="ts">
interface Props {
  title: string
  description: string
  icon?: unknown
  actionLabel?: string
  actionTo?: string
}

const props = withDefaults(defineProps<Props>(), {
  icon: undefined,
  actionLabel: '',
  actionTo: '',
})
</script>

<template>
  <div class="flex flex-col items-start gap-content px-section py-section text-start">
    <div
      v-if="icon"
      class="flex size-12 items-center justify-center border border-border bg-surface"
      aria-hidden="true"
    >
      <component :is="icon" class="size-5 text-foreground-muted" :stroke-width="2" />
    </div>

    <div class="space-y-2">
      <h3 class="text-ds-subtitle-r font-extrabold text-foreground">
        {{ title }}
      </h3>
      <p class="max-w-xl text-ds-body-r leading-7 text-foreground-muted">
        {{ description }}
      </p>
    </div>

    <slot name="action">
      <NuxtLink
        v-if="actionLabel && actionTo"
        :to="actionTo"
        class="inline-flex min-h-touch-target items-center justify-center border border-primary px-content py-element text-ds-body-r font-bold text-primary transition-colors hover:bg-primary hover:text-white"
      >
        {{ actionLabel }}
      </NuxtLink>
    </slot>
  </div>
</template>
