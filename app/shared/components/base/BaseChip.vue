<template>
  <span :class="['chip', `chip--${variant}`, { 'chip--removable': removable }]">
    <slot />
    <button
      v-if="removable"
      class="chip__remove"
      @click.stop="$emit('remove')"
      aria-label="إزالة"
    >
      <span class="material-symbols-outlined">close</span>
    </button>
  </span>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error'
  removable?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
  removable: false,
})

defineEmits<{
  remove: []
}>()
</script>

<style scoped>
.chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 500;
  border-radius: var(--radius-full);
  line-height: 1.4;
  white-space: nowrap;
}

.chip--default {
  background-color: var(--color-neutral-100);
  color: var(--color-neutral-700);
}

.chip--primary {
  background-color: var(--color-primary-100);
  color: var(--color-primary-800);
}

.chip--success {
  background-color: var(--color-success-bg);
  color: var(--color-success);
}

.chip--warning {
  background-color: var(--color-warning-bg);
  color: var(--color-warning);
}

.chip--error {
  background-color: var(--color-error-bg);
  color: var(--color-error);
}

.chip__remove {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.15s;
}

.chip__remove:hover {
  opacity: 1;
}

.chip__remove .material-symbols-outlined {
  font-size: 14px;
}
</style>
