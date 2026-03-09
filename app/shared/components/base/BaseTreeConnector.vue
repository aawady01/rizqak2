<script setup lang="ts">
import { computed } from "vue";

interface Props {
  type: "stem" | "branch" | "bridge" | "root-branch";
  isLast?: boolean;
  active?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isLast: false,
  active: false,
});

const lineStyle = computed(() => ({
  opacity: props.active
    ? "var(--filter-tree-line-opacity-active)"
    : "var(--filter-tree-line-opacity-muted)",
}));
</script>

<template>
  <template v-if="type === 'stem'">
    <div
      :style="[
        lineStyle,
        {
          'inset-inline-start': 'var(--filter-tree-stem-offset)',
          top: 'calc(var(--filter-tree-node-center) + (var(--filter-tree-control-size) / 2))',
          bottom: '0',
        },
      ]"
      class="absolute w-[var(--filter-tree-line-width)] bg-[var(--tree-line-color)] pointer-events-none z-10 transition-opacity duration-200"
    />
  </template>

  <template v-else-if="type === 'bridge'">
    <div
      :style="lineStyle"
      class="absolute inset-inline-start-[var(--filter-tree-bridge-offset)] top-[var(--filter-tree-node-center)] h-[var(--filter-tree-bridge-height)] w-[var(--filter-tree-line-width)] bg-[var(--tree-line-color)] pointer-events-none z-10 transition-opacity duration-200"
    />
  </template>

  <template v-else-if="type === 'branch'">
    <div
      :style="lineStyle"
      class="absolute inset-inline-start-[var(--filter-tree-child-stem-offset)] top-[var(--filter-tree-node-center)] h-[var(--filter-tree-line-width)] bg-[var(--tree-line-color)] pointer-events-none z-20 transition-opacity duration-200"
      style="width: var(--filter-tree-branch-length)"
    />
    <div
      v-if="!isLast"
      :style="lineStyle"
      class="absolute inset-inline-start-[var(--filter-tree-child-stem-offset)] top-0 bottom-0 w-[var(--filter-tree-line-width)] bg-[var(--tree-line-color)] pointer-events-none z-20 transition-opacity duration-200"
    />
    <div
      v-else
      :style="lineStyle"
      class="absolute inset-inline-start-[var(--filter-tree-child-stem-offset)] top-0 h-[var(--filter-tree-node-center)] w-[var(--filter-tree-line-width)] bg-[var(--tree-line-color)] pointer-events-none z-20 transition-opacity duration-200"
    />
  </template>

  <template v-else>
    <div
      :style="lineStyle"
      class="absolute top-[var(--filter-tree-node-center)] h-[var(--filter-tree-line-width)] bg-[var(--tree-line-color)] pointer-events-none z-20 transition-opacity duration-200"
      style="inset-inline-start: 0; width: var(--filter-tree-root-branch-length)"
    />
    <div
      v-if="!isLast"
      :style="lineStyle"
      class="absolute top-0 bottom-0 w-[var(--filter-tree-line-width)] bg-[var(--tree-line-color)] pointer-events-none z-20 transition-opacity duration-200"
      style="inset-inline-start: var(--filter-tree-control-center-offset)"
    />
    <div
      v-else
      :style="lineStyle"
      class="absolute top-0 h-[var(--filter-tree-node-center)] w-[var(--filter-tree-line-width)] bg-[var(--tree-line-color)] pointer-events-none z-20 transition-opacity duration-200"
      style="inset-inline-start: var(--filter-tree-control-center-offset)"
    />
  </template>
</template>


