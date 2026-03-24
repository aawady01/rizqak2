<script setup lang="ts">
import { cn } from "~/shared/utils/tailwind";

interface Props {
  class?: string;
}

const props = defineProps<Props>();

const headClass = computed(() => {
  return cn(
    "text-ds-foreground h-10 px-2 text-start align-middle font-bold whitespace-nowrap [&:has([role=checkbox])]:pe-0 [&>[role=checkbox]]:checkbox-baseline-nudge",
    props.class,
  );
});
</script>

<template>
  <th data-slot="table-head" :class="headClass" v-bind="$attrs">
    <slot />
  </th>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
