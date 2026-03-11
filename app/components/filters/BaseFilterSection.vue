<script setup lang="ts">
import { computed } from "vue";
import BaseDisclosureButton from "../../shared/components/base/BaseDisclosureButton.vue";
import BaseFilterHeader from "../../shared/components/base/BaseFilterHeader.vue";
import BaseTreeConnector from "../../shared/components/base/BaseTreeConnector.vue";
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
const connectorActive = computed(
  () => Boolean(props.allChecked || props.someChecked || props.expanded),
);
</script>

<template>
  <section
    class="filter-tree-scope pb-3"
    :aria-labelledby="sectionDomId"
  >
    <BaseFilterHeader
      :section-id="sectionDomId"
      :title="title"
      :searchable="searchable"
      v-model:searchQuery="query"
    />

    <div class="relative">
      <BaseTreeConnector
        v-if="hasSelectAll"
        type="stem"
        :active="connectorActive"
      />

      <div
        v-if="hasSelectAll"
        class="relative mb-1 z-20"
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
          role="group"
          :aria-labelledby="sectionDomId"
          :class="[hasSelectAll ? 'relative' : '']"
        >
          <slot />
        </div>
      </div>
    </div>
  </section>
</template>
