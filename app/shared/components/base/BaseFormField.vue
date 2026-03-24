<script setup lang="ts">
import { cn } from "~/shared/utils/tailwind";

interface Props {
  label?: string;
  error?: string;
  for?: string;
  required?: boolean;
  class?: string;
}

const props = defineProps<Props>();

const labelClass = computed(() =>
  cn(
    "text-ds-label-l font-medium text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    props.class,
  ),
);

const errorClass = "text-ds-caption-r text-error mt-compact flex items-center gap-1";
</script>

<template>
  <div class="space-y-2">
    <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -- label.for prop connects to child input via slot -->
    <label v-if="label" :for="props.for" :class="labelClass">
      {{ label }}
      <span v-if="required" class="text-error ms-0.5" aria-hidden="true">*</span>
    </label>

    <slot />

    <p v-if="error" :class="errorClass" role="alert">
      {{ error }}
    </p>
  </div>
</template>
