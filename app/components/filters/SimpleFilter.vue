<script setup lang="ts">
import { ref, computed } from "vue";
import BaseFilterSection from "./BaseFilterSection.vue";
import BaseFilterShowMore from "../../shared/components/base/BaseFilterShowMore.vue";
import BaseFilterItemRow from "../../shared/components/base/BaseFilterItemRow.vue";
import BaseEmptyState from "../../shared/components/base/BaseEmptyState.vue";
import { useFilterSearch } from "~/composables/filters/useFilterSearch";
import { useFilterPagination } from "~/composables/filters/useFilterPagination";
import { useFlatSelection } from "~/composables/filters/useFlatSelection";
import { toDomSafeId } from "~/shared/utils/string";

interface Props {
  title: string;
  totalLabel: string;
  totalCount: number;
  totalJobs: number;
  items: { id: string; label: string }[];
  type?: "checkbox" | "radio";
  radioName?: string;
  searchable?: boolean;
  expandable?: boolean;
  urlKey?: string;
  icon?: any;
}

const props = withDefaults(defineProps<Props>(), {
  type: "checkbox",
  radioName: undefined,
  expandable: true,
  searchable: false,
  urlKey: undefined,
  icon: undefined,
});
const { t } = useI18n();

const allExpanded = ref(false);
const allItemIds = computed(() => props.items.map((item) => item.id));
const sectionIdBase = computed(() => toDomSafeId(props.title, "flat-section"));

const { searchQuery, isSearching, filteredItems, hasMatches } = useFilterSearch(
  () => props.items,
  {
    resolveLabel: (item) => t(item.label),
  },
);
const {

  showAll: showAllItems,
  visibleItems,
  hiddenCount,
  toggleShowAll,
} = useFilterPagination(filteredItems, isSearching, 4);

const selection = useFlatSelection(
  allItemIds,
  props.type === "radio"
    ? {
        mode: "single",
        queryKey: props.urlKey,
        defaultValue: null,
      }
    : {
        mode: "multi",
        queryKey: props.urlKey,
        defaultSelectedIds: allItemIds.value,
      },
);

const allChecked = computed(() => selection.allChecked.value);
const someChecked = computed(() => selection.someChecked.value);

const handleToggle = (id: string) => {
  selection.toggle(id);
};

const handleToggleAll = () => {
  if (props.type === "radio") {
    selection.clearAll();
    return;
  }

  if (selection.allChecked.value) {
    selection.clearAll();
  } else {
    selection.selectAll();
  }
};

const handleExpandToggle = () => {
  allExpanded.value = !allExpanded.value;
};
</script>

<template>
  <BaseFilterSection
    v-model:search-query="searchQuery"
    :title="title"
    :searchable="searchable"
    :has-select-all="true"
    :total-label="totalLabel"
    :total-count="totalCount"
    :total-jobs="totalJobs"
    :all-checked="allChecked"
    :some-checked="someChecked"
    :is-radio="type === 'radio'"
    :expandable="expandable"
    :expanded="allExpanded"
    :icon="icon"
    :select-all-input-id="`${sectionIdBase}-all`"
    @toggle-all="handleToggleAll"
    @expand-toggle="handleExpandToggle"
  >
    <BaseEmptyState
      v-if="isSearching && !hasMatches"
      :icon="false"
      class="py-section px-0"
    />

    <div v-for="item in visibleItems" :key="item.id" class="relative">
      <div>
        <BaseFilterItemRow
          :input-id="`${sectionIdBase}-${item.id}`"
          :input-name="type === 'radio' ? (radioName ?? title) : undefined"
          :label="t(item.label)"
          :checked="selection.isChecked(item.id)"
          :input-type="type"
          level="category"
          @toggle="handleToggle(item.id)"
        />
      </div>
    </div>

    <BaseFilterShowMore
      v-if="
        hiddenCount > 0 ||
        (showAllItems && filteredItems.length > 4 && !isSearching)
      "
      :show-all="showAllItems"
      :hidden-count="hiddenCount"
      @toggle="toggleShowAll"
    />
  </BaseFilterSection>
</template>
