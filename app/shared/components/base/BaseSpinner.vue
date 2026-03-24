<script setup lang="ts">
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/shared/utils/tailwind";

const spinnerVariants = cva(
  "animate-spin rounded-full border-2 border-current border-t-transparent",
  {
    variants: {
      size: {
        sm: "size-4",
        md: "size-6",
        lg: "size-8",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

type SpinnerVariants = VariantProps<typeof spinnerVariants>;

interface Props {
  size?: SpinnerVariants["size"];
  class?: string;
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  label: "جاري التحميل",
});
</script>

<template>
  <div
    role="status"
    :class="cn('inline-flex items-center justify-center', props.class)"
  >
    <div :class="spinnerVariants({ size })" />
    <span class="sr-only">{{ label }}</span>
  </div>
</template>
