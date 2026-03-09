<script setup lang="ts">
import { computed } from "vue";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/shared/utils/tailwind";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-none border px-2.5 py-0.5 text-ds-caption-r font-semibold w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none transition-all duration-150 overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary-light text-primary-dark [a&]:hover:bg-primary-light/80",
        secondary:
          "border-transparent bg-secondary-light text-secondary-dark [a&]:hover:bg-secondary-light/80",
        destructive:
          "border-transparent bg-error-light text-error-dark [a&]:hover:bg-error-light/80",
        success:
          "border-transparent bg-success-light text-success-dark [a&]:hover:bg-success-light/80",
        neutral:
          "border-transparent bg-neutral-100 text-neutral-600 [a&]:hover:bg-neutral-200",
        outline: "text-neutral-600 border-neutral-300 [a&]:hover:bg-neutral-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type BadgeVariants = VariantProps<typeof badgeVariants>;

interface Props {
  variant?: BadgeVariants["variant"];
  as?: string;
  class?: any;
}

const props = withDefaults(defineProps<Props>(), {
  as: "span",
});

const badgeClass = computed(() => {
  return cn(badgeVariants({ variant: props.variant }), props.class);
});
</script>

<template>
  <component :is="as" :class="badgeClass" data-slot="badge">
    <slot />
  </component>
</template>
