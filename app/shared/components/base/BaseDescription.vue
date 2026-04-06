<script setup lang="ts">
/**
 * BaseDescription - Unified prose/description text component.
 * Used for long-form descriptive text across the app (company descriptions,
 * job details, about sections, etc.).
 *
 * Single source of truth — change here and it affects all usages.
 */
import { cn } from "~/shared/utils/tailwind";

interface Props {
  variant?: "default" | "muted" | "subtle";
  tag?: "p" | "div" | "span";
  maxW?: "default" | "full" | "2xl" | "3xl";
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  tag: "p",
  maxW: "full",
});

const variantClassMap: Record<string, string> = {
  default: "text-foreground",
  muted: "text-foreground-muted",
  subtle: "text-foreground-subtle",
};

const maxWidthMap: Record<string, string> = {
  default: "max-w-prose",
  full: "max-w-none",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
};

const classes = computed(() =>
  cn(
    "text-base leading-loose",
    variantClassMap[props.variant],
    maxWidthMap[props.maxW],
  ),
);
</script>

<template>
  <component :is="tag" :class="classes">
    <slot />
  </component>
</template>
