<script setup lang="ts">
interface Props {
  showAll: boolean;
  hiddenCount: number;
}

withDefaults(defineProps<Props>(), {
  hiddenCount: 0,
});

const emit = defineEmits<{ toggle: [] }>();
</script>

<template>
  <div class="filter-show-more mt-1 flex justify-end pe-[var(--filter-tree-root-branch-length)]">
    <button
      type="button"
      class="rounded-none px-1 py-0.5 text-ds-caption-r font-medium text-primary outline-none transition-colors hover:underline focus-visible:shadow-[var(--filter-tree-focus-ring)]"
      :aria-expanded="showAll"
      :aria-label="showAll ? 'عرض عناصر أقل' : 'عرض عناصر إضافية'"
      @click.stop="emit('toggle')"
    >
      {{ showAll ? "عرض أقل" : "عرض المزيد" }}
      <span v-if="!showAll && hiddenCount > 0" class="ms-1">
        ({{ hiddenCount }})
      </span>
    </button>
  </div>
</template>
