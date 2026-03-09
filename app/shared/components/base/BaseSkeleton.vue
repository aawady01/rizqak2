<script setup lang="ts">
import { computed } from "vue";
import { cn } from "~/shared/utils/tailwind";

interface Props {
  class?: any;
}

const props = defineProps<Props>();

const skeletonClass = computed(() => {
  return cn("bg-neutral-100 animate-pulse rounded-none", props.class);
});
</script>

<template>
  <div data-slot="skeleton" :class="skeletonClass" v-bind="$attrs" />
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
