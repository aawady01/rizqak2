<script setup lang="ts">
type KpiTone = 'primary' | 'success' | 'warning' | 'danger' | 'info'

interface Props {
  title: string
  value: string
  meta?: string
  detail?: string
  actionLabel?: string
  actionTo?: string
  tone?: KpiTone
}

const props = withDefaults(defineProps<Props>(), {
  meta: '',
  detail: '',
  actionLabel: '',
  actionTo: '',
  tone: 'primary',
})

const toneClasses: Record<KpiTone, { dot: string, action: string }> = {
  primary: {
    dot: 'bg-primary',
    action: 'text-primary',
  },
  success: {
    dot: 'bg-success',
    action: 'text-success',
  },
  warning: {
    dot: 'bg-warning',
    action: 'text-warning',
  },
  danger: {
    dot: 'bg-error',
    action: 'text-error',
  },
  info: {
    dot: 'bg-info',
    action: 'text-info',
  },
}
</script>

<template>
  <component
    :is="actionTo ? 'NuxtLink' : 'div'"
    :to="actionTo || undefined"
    class="group block h-full"
  >
    <BaseCard
      class="h-full border-border bg-surface transition-colors duration-200 group-hover:border-primary/30"
      content-class="p-content"
    >
      <div class="flex items-start justify-between gap-content">
        <div class="space-y-3">
          <div class="flex items-center gap-2">
            <span :class="['size-2.5 shrink-0', toneClasses[tone].dot]" aria-hidden="true" />
            <p class="text-ds-caption-l font-bold tracking-[0.18em] text-foreground-muted uppercase">
              {{ title }}
            </p>
          </div>

          <div class="space-y-2">
            <p class="text-ds-h3 font-extrabold text-foreground">
              {{ value }}
            </p>
            <p v-if="meta" class="text-ds-body-s font-semibold text-foreground-muted">
              {{ meta }}
            </p>
          </div>
        </div>

        <span
          v-if="actionLabel && actionTo"
          :class="['text-ds-caption-l font-bold transition-colors group-hover:text-primary', toneClasses[tone].action]"
        >
          {{ actionLabel }}
        </span>
      </div>

      <p v-if="detail" class="mt-4 border-t border-border pt-4 text-ds-caption-l leading-6 text-foreground-muted">
        {{ detail }}
      </p>
    </BaseCard>
  </component>
</template>
