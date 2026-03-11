<script setup lang="ts">
import { computed } from "vue";
import { AvatarRoot, AvatarImage, AvatarFallback } from "reka-ui";
import { cn } from "~/shared/utils/tailwind";

interface Props {
  src?: string;
  alt?: string;
  fallback?: string;
  class?: any;
}

const props = defineProps<Props>();

const rootClass = computed(() => {
  return cn(
    "relative flex size-10 shrink-0 overflow-hidden rounded-none border border-ds-border",
    props.class,
  );
});
</script>

<template>
  <AvatarRoot data-slot="avatar" :class="rootClass">
    <AvatarImage
      v-if="src"
      data-slot="avatar-image"
      :src="src"
      :alt="alt"
      class="aspect-square size-full object-cover"
    />
    <AvatarFallback
      data-slot="avatar-fallback"
      class="bg-primary-light text-primary-dark flex size-full items-center justify-center rounded-none text-ds-body-r font-bold"
    >
      <slot>{{ fallback }}</slot>
    </AvatarFallback>
  </AvatarRoot>
</template>
