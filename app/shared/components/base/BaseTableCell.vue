<script setup lang="ts">
import { cn } from "~/shared/utils/tailwind";

interface Props {
  class?: string;
}

const props = defineProps<Props>();

const cellClass = computed(() => {
  return cn(
    "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pe-0 [&>[role=checkbox]]:checkbox-baseline-nudge",
    props.class,
  );
});
</script>

<template>
  <td data-slot="table-cell" :class="cellClass" v-bind="$attrs">
    <slot />
  </td>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
