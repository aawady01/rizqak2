<script setup lang="ts">
interface Props {
  title?: string
  description?: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  description: '',
  class: '',
})
</script>

<template>
  <section
    :class="[
      'border border-border bg-surface-alt/40 px-content py-content',
      props.class,
    ]"
  >
    <div
      v-if="title || description || $slots.actions"
      class="flex flex-col gap-content border-b border-border pb-content xl:flex-row xl:items-start xl:justify-between"
    >
      <div class="space-y-1">
        <h2 v-if="title" class="text-ds-subtitle-r font-extrabold text-foreground">
          {{ title }}
        </h2>
        <p v-if="description" class="max-w-3xl text-ds-body-s leading-7 text-foreground-muted">
          {{ description }}
        </p>
      </div>

      <div v-if="$slots.actions" class="flex flex-wrap gap-element">
        <slot name="actions" />
      </div>
    </div>

    <div :class="[title || description || $slots.actions ? 'pt-content' : '']">
      <slot />
    </div>

    <div v-if="$slots.footer" class="mt-content border-t border-border pt-content">
      <slot name="footer" />
    </div>
  </section>
</template>
