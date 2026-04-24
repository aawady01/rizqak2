<script setup lang="ts">
interface Props {
  title: string
  description?: string
  actionLabel?: string
  actionTo?: string
  contentClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  description: '',
  actionLabel: '',
  actionTo: '',
  contentClass: '',
})
</script>

<template>
  <BaseCard
    :title="title"
    :description="description"
    header-class="border-b border-border"
    :content-class="contentClass"
  >
    <template v-if="actionLabel && actionTo" #action>
      <NuxtLink
        :to="actionTo"
        class="inline-flex min-h-touch-target-compact items-center justify-center px-element py-compact text-ds-body-s font-bold text-primary transition-colors hover:bg-primary/5"
      >
        {{ actionLabel }}
      </NuxtLink>
    </template>

    <slot />

    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </BaseCard>
</template>
