<script setup lang="ts">
/**
 * BaseTypography - Polymorphic atomic component for all text styles.
 * Follows the Rizqak Design System tokens (March 2026).
 */
import { cn } from "~/shared/utils/tailwind";

interface Props {
  /**
   * The semantic role of the text component.
   * Maps to tokens in main.css and docs/16-DESIGN-SYSTEM.md.
   */
  variant?:
    | "display-xxl"
    | "display-xl"
    | "display-l"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle-l"
    | "subtitle-r"
    | "body-l"
    | "body-r"
    | "body-s"
    | "caption-l"
    | "caption-r"
    | "caption-s"
    | "label-l"
    | "label-r"
    | "label-s";
  /**
   * The HTML tag to render. Defaults based on the variant.
   */
  tag?: string;
  /**
   * Font weight override.
   */
  weight?: "light" | "regular" | "medium" | "semibold" | "bold" | "extrabold";
  /**
   * Color override (Tailwind class).
   */
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "body-r",
});

// Default tag mapping based on variant
const defaultTagMap: Record<string, string> = {
  "display-xxl": "h1",
  "display-xl": "h1",
  "display-l": "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  "subtitle-l": "p",
  "subtitle-r": "p",
  "body-l": "p",
  "body-r": "p",
  "body-s": "p",
  "caption-l": "span",
  "caption-r": "span",
  "caption-s": "span",
  "label-l": "label",
  "label-r": "label",
  "label-s": "label",
};

const finalTag = computed(
  () => props.tag || defaultTagMap[props.variant] || "p",
);

const variantClassMap: Record<string, string> = {
  "display-xxl": "text-ds-display-xxl",
  "display-xl": "text-ds-display-xl",
  "display-l": "text-ds-display-l",
  h1: "text-ds-h1",
  h2: "text-ds-h2",
  h3: "text-ds-h3",
  h4: "text-ds-h4",
  h5: "text-ds-h5",
  h6: "text-ds-h6",
  "subtitle-l": "text-ds-subtitle-l",
  "subtitle-r": "text-ds-subtitle-r",
  "body-l": "text-ds-body-l",
  "body-r": "text-ds-body-r",
  "body-s": "text-ds-body-s",
  "caption-l": "text-ds-caption-l",
  "caption-r": "text-ds-caption-r",
  "caption-s": "text-ds-caption-s",
  "label-l": "text-ds-label-l",
  "label-r": "text-ds-label-r",
  "label-s": "text-ds-label-s",
};

const variantClasses = computed(() => {
  return cn(
    variantClassMap[props.variant] || "text-ds-body-r",
    props.variant === "h6" && "uppercase",
    props.weight && `font-${props.weight}`,
    props.color,
  );
});
</script>

<template>
  <component :is="finalTag" :class="variantClasses">
    <slot />
  </component>
</template>

