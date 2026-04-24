<script setup lang="ts">
type StatTone = 'primary' | 'success' | 'warning' | 'danger' | 'info'

interface Props {
  title: string
  value: string
  detail?: string
  trend?: string
  trendLabel?: string
  tone?: StatTone
  icon?: unknown
  to?: string
}

const props = withDefaults(defineProps<Props>(), {
  detail: '',
  trend: '',
  trendLabel: '',
  tone: 'primary',
  icon: undefined,
  to: '',
})

const toneClasses: Record<StatTone, { badge: string, trend: string }> = {
  primary: {
    badge: 'bg-primary/10 text-primary border border-primary/20',
    trend: 'text-primary',
  },
  success: {
    badge: 'bg-success-bg text-success border border-transparent',
    trend: 'text-success',
  },
  warning: {
    badge: 'bg-warning-bg text-warning border border-transparent',
    trend: 'text-warning',
  },
  danger: {
    badge: 'bg-error-bg text-error border border-transparent',
    trend: 'text-error',
  },
  info: {
    badge: 'bg-info-bg text-info border border-transparent',
    trend: 'text-info',
  },
}
</script>

<template>
  <component
    :is="to ? 'NuxtLink' : 'div'"
    :to="to || undefined"
    class="group block"
  >
    <BaseCard
      class="h-full border-border bg-surface transition-colors duration-200 group-hover:border-primary/30"
      content-class="p-content"
    >
      <div class="flex items-start justify-between gap-content">
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <div
              v-if="icon"
              :class="[
                'flex size-11 items-center justify-center rounded-none',
                toneClasses[tone].badge,
              ]"
            >
              <component :is="icon" class="size-5" :stroke-width="2" />
            </div>

            <p class="text-ds-body-s font-semibold text-foreground-muted">
              {{ title }}
            </p>
          </div>

          <div class="flex flex-wrap items-end gap-3">
            <p class="text-ds-h2 font-extrabold text-foreground">
              {{ value }}
            </p>

            <div v-if="trend || trendLabel" class="flex items-center gap-2 pb-1">
              <span
                v-if="trend"
                :class="['text-ds-body-s font-bold', toneClasses[tone].trend]"
              >
                {{ trend }}
              </span>
              <span v-if="trendLabel" class="text-ds-caption-l text-foreground-muted">
                {{ trendLabel }}
              </span>
            </div>
          </div>
        </div>

        <span
          v-if="to"
          class="text-ds-caption-l font-bold text-foreground-subtle transition-colors group-hover:text-primary"
        >
          عرض
        </span>
      </div>

      <p v-if="detail" class="mt-3 text-ds-caption-l leading-6 text-foreground-muted">
        {{ detail }}
      </p>
    </BaseCard>
  </component>
</template>
