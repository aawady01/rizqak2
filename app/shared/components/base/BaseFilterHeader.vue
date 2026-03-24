<script setup lang="ts">
import BaseSearchInput from "./BaseSearchInput.vue";

interface Props {
  title: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  sectionId?: string;
}

withDefaults(defineProps<Props>(), {
  searchable: false,
  searchPlaceholder: "ابحث...",
  sectionId: undefined,
});

const searchQuery = defineModel<string>("searchQuery", { default: "" });
</script>

<template>
  <div class="mb-element flex items-start justify-between gap-3">
    <div class="min-w-0 shrink-0">
      <h4
        :id="sectionId"
        class="m-0 text-ds-body-r font-bold text-foreground whitespace-nowrap"
      >
        {{ $t(title) }}
      </h4>
    </div>

    <div v-if="searchable" class="max-w-search-compact w-full">
      <BaseSearchInput
        v-model="searchQuery"
        :placeholder="searchPlaceholder"
        :aria-label="$t('filterHeader.searchAriaLabel')"
      />
    </div>
  </div>
</template>

