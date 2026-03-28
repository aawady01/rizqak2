<script setup lang="ts">
const { t } = useI18n();

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
  <div class="mt-1 flex justify-end pe-filter-tree-root">
    <button
      type="button"
      class="rounded-none px-1 py-0.5 text-ds-caption-r font-medium text-primary outline-none transition-colors hover:underline filter-tree-focus-ring cursor-pointer"
      :aria-expanded="showAll"
      :aria-label="showAll ? t('base.filterShowMore.ariaShowLess') : t('base.filterShowMore.ariaShowMore')"
      @click.stop="emit('toggle')"
    >
      {{ showAll ? t('base.filterShowMore.showLess') : t('base.filterShowMore.showMore') }}
      <span v-if="!showAll && hiddenCount > 0" class="ms-1">
        ({{ hiddenCount }})
      </span>
    </button>
  </div>
</template>
