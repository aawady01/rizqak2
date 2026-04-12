<script setup lang="ts">
import BaseSearchInput from "./BaseSearchInput.vue";

const { t } = useI18n();

interface Props {
  title: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  sectionId?: string;
  icon?: any;
}

withDefaults(defineProps<Props>(), {
  searchable: false,
  searchPlaceholder: undefined,
  sectionId: undefined,
  icon: undefined,
});

const searchQuery = defineModel<string>("searchQuery", { default: "" });
</script>

<template>
  <div class="w-full flex items-stretch justify-between min-h-[38px]">
    <!-- Icon and Title -->
    <div class="min-w-0 flex items-center flex-1">
      <div v-if="icon" class="flex items-center justify-center shrink-0 w-[38px] h-full bg-primary/10 text-primary transition-colors">
        <component :is="icon" class="size-4" stroke-width="2.5" />
      </div>
      <h4
        :id="sectionId"
        class="m-0 text-ds-body-r font-bold text-foreground whitespace-nowrap"
        :class="icon ? 'pe-3 ps-2.5 py-1.5' : 'px-3 py-1.5'"
      >
        {{ title }}
      </h4>
    </div>

    <!-- Search Input -->
    <div v-if="searchable" class="w-full max-w-[130px] flex items-stretch border-s border-separator/50 bg-surface/30">
      <BaseSearchInput
        v-model="searchQuery"
        :debounce="0"
        :placeholder="searchPlaceholder ?? t('base.filterHeader.searchPlaceholder')"
        class="w-full h-full [&_input]:!h-full [&_input]:!border-none [&_input]:!bg-transparent focus-within:bg-surface transition-colors"
      />
    </div>
  </div>
</template>
