<script setup lang="ts">
type AdminStatusTone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info'

interface Props {
  label: string
  tone?: AdminStatusTone
  dot?: boolean
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  tone: 'neutral',
  dot: false,
  class: '',
})

const badgeClasses: Record<AdminStatusTone, string> = {
  neutral: 'border-border bg-muted/30 text-foreground-muted',
  primary: 'border-primary/20 bg-primary/10 text-primary',
  success: 'border-success/20 bg-success-bg text-success',
  warning: 'border-warning/20 bg-warning-bg text-warning',
  danger: 'border-error/20 bg-error-bg text-error',
  info: 'border-info/20 bg-info-bg text-info',
}

const dotClasses: Record<AdminStatusTone, string> = {
  neutral: 'bg-foreground-subtle',
  primary: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-error',
  info: 'bg-info',
}
</script>

<template>
  <BaseBadge
    variant="outline"
    :class="[badgeClasses[tone], props.class]"
  >
    <span
      v-if="dot"
      :class="['size-1.5 shrink-0', dotClasses[tone]]"
      aria-hidden="true"
    />
    {{ label }}
  </BaseBadge>
</template>
