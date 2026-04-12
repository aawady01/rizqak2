<script setup lang="ts">
import { cn } from "~/shared/utils/tailwind";

const modelValue = defineModel<string | number>();

interface Props {
  class?: string;
}

const props = defineProps<Props>();

const inputClass = computed(() => {
  return cn(
    "file:text-ds-foreground placeholder:text-neutral-400 selection:bg-primary-light selection:text-primary-dark dark:bg-surface-dark border-neutral-300 flex h-12 w-full min-w-0 rounded-none border px-3 py-2.5 text-ds-body-r bg-surface transition-all outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-ds-body-r file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-ds-body-r",
    "focus-visible:border-primary focus-visible:ring-ds-focus",
    "aria-invalid:ring-error-light aria-invalid:border-error",
    props.class,
  );
});
</script>

<template>
  <input
    v-model="modelValue"
    data-slot="input"
    :class="inputClass"
    v-bind="$attrs"
  >
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
