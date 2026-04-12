<script setup lang="ts">
import BaseDisclosureButton from "../../shared/components/base/BaseDisclosureButton.vue";
import BaseFilterHeader from "../../shared/components/base/BaseFilterHeader.vue";
import BaseFilterItemRow from "../../shared/components/base/BaseFilterItemRow.vue";
import { toDomSafeId } from "~/shared/utils/string";

interface Props {
  title: string;
  searchable?: boolean;
  searchQuery?: string;
  hasSelectAll?: boolean;
  totalLabel?: string;
  totalCount?: number;
  totalJobs?: number;
  allChecked?: boolean;
  someChecked?: boolean;
  isRadio?: boolean;
  expandable?: boolean;
  expanded?: boolean;
  selectAllInputId?: string;
  icon?: any;
}

const emit = defineEmits<{
  "update:searchQuery": [value: string];
  toggleAll: [];
  expandToggle: [];
}>();

const props = withDefaults(defineProps<Props>(), {
  searchable: false,
  hasSelectAll: false,
  searchQuery: "",
  isRadio: false,
  expandable: false,
  expanded: false,
  selectAllInputId: undefined,
  icon: undefined,
});

const query = computed({
  get: () => props.searchQuery,
  set: (val) => {
    emit("update:searchQuery", val);
    if (val.trim() && props.expandable && !props.expanded) {
      emit("expandToggle");
    }
  },
});

const sectionDomId = computed(
  () => toDomSafeId(props.title, "filter-section"),
);
const contentDomId = computed(() => `${sectionDomId.value}-content`);
</script>

<template>
  <section
    class="filter-tree-scope bg-surface border border-separator/60 rounded flex flex-col overflow-hidden"
    :aria-labelledby="sectionDomId"
  >
    <div class="bg-primary/5 border-b border-separator/60 flex items-center">
      <BaseFilterHeader
        v-model:search-query="query"
        :section-id="sectionDomId"
        :title="title"
        :searchable="searchable"
        :icon="icon"
        class="!mb-0"
      />
    </div>

    <div class="relative px-4 pt-3 pb-4">
      <div
        v-if="hasSelectAll"
        class="relative z-20 mb-1"
      >
        <BaseFilterItemRow
          :input-id="selectAllInputId"
          :label="totalLabel ?? ''"
          :checked="allChecked ?? false"
          :indeterminate="someChecked"
          :input-type="isRadio ? 'radio' : 'checkbox'"
          :count="totalCount"
          :total-jobs="totalJobs"
          level="category"
          @toggle="$emit('toggleAll')"
        >
          <BaseDisclosureButton
            v-if="expandable"
            :expanded="expanded"
            :controls-id="contentDomId"
            @toggle="$emit('expandToggle')"
          />
        </BaseFilterItemRow>
      </div>

      <div
        :id="contentDomId"
        class="grid transition-all duration-300 ease-in-out"
        :class="
          expanded || !expandable
            ? 'grid-rows-expand opacity-100'
            : 'grid-rows-collapse opacity-0'
        "
      >
        <div
          class="overflow-hidden"
          :aria-labelledby="sectionDomId"
        >
          <div class="flex flex-col gap-1" :class="{ 'pt-2': hasSelectAll }">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
