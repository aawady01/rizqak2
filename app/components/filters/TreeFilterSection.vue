<script setup lang="ts">
import { computed, ref } from "vue";
import TreeBranch from "./TreeBranch.vue";
import BaseFilterSection from "./BaseFilterSection.vue";
import BaseFilterShowMore from "../../shared/components/base/BaseFilterShowMore.vue";
import type { FilterSection } from "~/shared/utils/mockData";
import { useFilterSearch } from "~/composables/filters/useFilterSearch";
import { useFilterPagination } from "~/composables/filters/useFilterPagination";
import { useTreeSelection } from "~/composables/filters/useTreeSelection";

interface Props {
  section: FilterSection;
  searchable?: boolean;
  urlKey?: string;
}

const props = defineProps<Props>();

const allExpanded = ref(true);
const expandedCategoryId = ref<string | null>(
  props.section.categories.find(
    (category) => (category.children?.length ?? 0) > 0 && category.expanded,
  )?.id ?? null,
);

const allChildIds = computed(() =>
  props.section.categories.flatMap(
    (category) => category.children?.map((child) => child.id) ?? [],
  ),
);

const { searchQuery, isSearching, filteredItems: filteredCategories } =
  useFilterSearch(() => props.section.categories);
const {
  showAll: showAllCategories,
  visibleItems: visibleCategories,
  hiddenCount,
  toggleShowAll,
} = useFilterPagination(filteredCategories, isSearching, 4);
const {
  selectedIds: checkedItems,
  toggleItem: handleToggleChild,
  toggleCategory,
  clearAll,
  selectAll,
} = useTreeSelection(new Set(allChildIds.value), props.urlKey);

const allChecked = computed(
  () =>
    checkedItems.value.size === allChildIds.value.length &&
    allChildIds.value.length > 0,
);
const someChecked = computed(
  () => checkedItems.value.size > 0 && !allChecked.value,
);

const handleToggleCategory = (_categoryId: string, childIds: string[]) => {
  toggleCategory(childIds);
};

const handleToggleAll = () => {
  if (allChecked.value) {
    clearAll();
  } else {
    selectAll(allChildIds.value);
  }
};

const handleExpandToggle = () => {
  allExpanded.value = !allExpanded.value;

  if (!allExpanded.value) {
    expandedCategoryId.value = null;
  }
};

const handleToggleBranchExpansion = (
  categoryId: string,
  nextExpanded: boolean,
) => {
  expandedCategoryId.value = nextExpanded ? categoryId : null;
};
</script>

<template>
  <BaseFilterSection
    :title="section.title"
    :searchable="searchable"
    v-model:searchQuery="searchQuery"
    :has-select-all="true"
    :total-label="section.totalLabel"
    :total-count="section.totalCount"
    :total-jobs="section.totalJobs"
    :all-checked="allChecked"
    :some-checked="someChecked"
    :expandable="true"
    :expanded="allExpanded"
    :select-all-input-id="`section-all-${section.id}`"
    @toggle-all="handleToggleAll"
    @expand-toggle="handleExpandToggle"
  >
    <TreeBranch
      v-for="(category, idx) in visibleCategories"
      :key="category.id"
      :category="category"
      :is-last="idx === visibleCategories.length - 1"
      :checked-children="checkedItems"
      :search-query="searchQuery"
      :expanded="expandedCategoryId === category.id"
      @toggle-child="handleToggleChild"
      @toggle-category="handleToggleCategory"
      @toggle-expand="handleToggleBranchExpansion"
    />

    <BaseFilterShowMore
      v-if="
        hiddenCount > 0 ||
        (showAllCategories && filteredCategories.length > 4 && !isSearching)
      "
      :show-all="showAllCategories"
      :hidden-count="hiddenCount"
      @toggle="toggleShowAll"
    />
  </BaseFilterSection>
</template>
