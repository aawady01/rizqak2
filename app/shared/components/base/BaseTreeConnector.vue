<script setup lang="ts">

interface Props {
  type: "stem" | "branch" | "bridge" | "root-branch";
  isLast?: boolean;
  active?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isLast: false,
  active: false,
});

const lineOpacityClass = computed(() =>
  props.active ? "filter-tree-line--active" : "filter-tree-line--muted",
);
</script>

<template>
  <template v-if="type === 'stem'">
    <div
      :class="['filter-tree-line', 'filter-tree-line--stem', lineOpacityClass]"
    />
  </template>

  <template v-else-if="type === 'bridge'">
    <div
      :class="['filter-tree-line', 'filter-tree-line--bridge', lineOpacityClass]"
    />
  </template>

  <template v-else-if="type === 'branch'">
    <div
      :class="[
        'filter-tree-line',
        'filter-tree-line--branch-horizontal',
        lineOpacityClass,
      ]"
    />
    <div
      v-if="!isLast"
      :class="[
        'filter-tree-line',
        'filter-tree-line--branch-vertical',
        lineOpacityClass,
      ]"
    />
    <div
      v-else
      :class="[
        'filter-tree-line',
        'filter-tree-line--branch-vertical-last',
        lineOpacityClass,
      ]"
    />
  </template>

  <template v-else>
    <div
      :class="[
        'filter-tree-line',
        'filter-tree-line--root-horizontal',
        lineOpacityClass,
      ]"
    />
    <div
      v-if="!isLast"
      :class="[
        'filter-tree-line',
        'filter-tree-line--root-vertical',
        lineOpacityClass,
      ]"
    />
    <div
      v-else
      :class="[
        'filter-tree-line',
        'filter-tree-line--root-vertical-last',
        lineOpacityClass,
      ]"
    />
  </template>
</template>


