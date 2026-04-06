<script setup lang="ts">
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/shared/utils/tailwind";

const buttonVariants = cva(
  "active-scale-subtle inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none text-ds-body-r font-semibold transition-all duration-150 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-ds-focus cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white hover:bg-primary-dark border-transparent",
        destructive:
          "bg-error text-white hover:bg-error-dark border-transparent focus-visible:ring-error/20",
        outline:
          "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-white",
        secondary:
          "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border-transparent",
        ghost:
          "hover:bg-surface-hover hover:text-foreground border-transparent",
        link: "text-primary underline-offset-4 hover:underline border-transparent px-0 py-0",
      },
      size: {
        default: "h-11 px-content py-element font-bold", // 44px - matches hero search button
        sm: "h-10 px-element py-element font-bold", // 40px - compact variant
        lg: "h-12 px-8 py-3.5 text-ds-subtitle-r font-bold", // 48px
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonVariants = VariantProps<typeof buttonVariants>;

interface Props {
  variant?: ButtonVariants["variant"];
  size?: ButtonVariants["size"];
  as?: string;
  class?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  size: "default",
  as: "button",
  type: "button",
  disabled: false,
});

const finalClasses = computed(() => {
  return cn(
    buttonVariants({ variant: props.variant, size: props.size }),
    props.class,
  );
});
</script>

<template>
  <component
    :is="as"
    :type="as === 'button' ? type : undefined"
    :disabled="disabled"
    :class="finalClasses"
  >
    <slot />
  </component>
</template>
