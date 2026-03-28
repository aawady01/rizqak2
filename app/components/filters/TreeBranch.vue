<script setup lang="ts">
import { computed } from "vue";
import type { FilterCategory } from "~/shared/utils/mockData";
import { toDomSafeId } from "~/shared/utils/string";
import { useFilterPagination } from "~/composables/filters/useFilterPagination";
import BaseDisclosureButton from "../../shared/components/base/BaseDisclosureButton.vue";
import BaseFilterShowMore from "../../shared/components/base/BaseFilterShowMore.vue";
import BaseFilterItemRow from "../../shared/components/base/BaseFilterItemRow.vue";

const { t } = useI18n();

interface Props {
  category: FilterCategory;
  isLast: boolean;
  checkedChildren: Set<string>;
  isSearching?: boolean;
  expanded?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isSearching: false,
  expanded: false,
});

const emit = defineEmits<{
  toggleChild: [childId: string];
  toggleCategory: [catId: string, allChildIds: string[]];
  toggleExpand: [catId: string, expanded: boolean];
}>();

const hasChildren = computed(
  () => !!props.category.children && props.category.children.length > 0,
);
const childIds = computed(
  () => props.category.children?.map((child) => child.id) ?? [],
);
const checkedCount = computed(
  () => childIds.value.filter((id) => props.checkedChildren.has(id)).length,
);

const allChecked = computed(
  () =>
    hasChildren.value &&
    childIds.value.length > 0 &&
    checkedCount.value === childIds.value.length,
);
const someChecked = computed(
  () => checkedCount.value > 0 && !allChecked.value,
);
const visibleChildrenSource = computed(() => props.category.children ?? []);
const expanded = computed(() => Boolean(props.expanded) || props.isSearching);

const {
  showAll: showAllChildren,
  visibleItems: visibleChildren,
  hiddenCount: hiddenChildrenCount,
  toggleShowAll,
} = useFilterPagination(visibleChildrenSource, computed(() => props.isSearching), 4);

const categoryInputId = computed(() => toDomSafeId(props.category.id, "tree-cat"));
const childGroupId = computed(() => toDomSafeId(props.category.id, "tree-group"));

const toggleExpanded = () => {
  if (!hasChildren.value || props.isSearching) return;
  emit("toggleExpand", props.category.id, !props.expanded);
};

const onCategoryToggle = () => {
  emit("toggleCategory", props.category.id, childIds.value);
};

const onChildToggle = (childId: string) => {
  emit("toggleChild", childId);
};
</script>

<template>
  <div class="relative">
    <div>
      <div class="relative z-20">
        <BaseFilterItemRow
          :input-id="categoryInputId"
          :label="category.label"
          :checked="allChecked"
          :indeterminate="someChecked"
          :count="category.count"
          :total-jobs="category.totalJobs"
          level="category"
          @toggle="onCategoryToggle"
        >
          <BaseDisclosureButton
            v-if="hasChildren"
            :expanded="expanded"
            :controls-id="childGroupId"
            :disabled="props.isSearching"
            :collapsed-label="t('filters.expandGroup')"
            :expanded-label="t('filters.collapseGroup')"
            @toggle="toggleExpanded"
          />
        </BaseFilterItemRow>
      </div>

      <div
        v-if="hasChildren"
        :id="childGroupId"
        class="grid transition-all duration-300 ease-in-out"
        :class="
          expanded ? 'grid-rows-expand opacity-100' : 'grid-rows-collapse opacity-0'
        "
      >
        <div class="overflow-hidden">
          <div
            class="relative ps-5 pt-0.5 flex flex-col gap-0.5"
            role="group"
            :aria-labelledby="categoryInputId"
          >
            <div
              v-for="child in visibleChildren"
              :key="child.id"
              class="relative"
            >
              <BaseFilterItemRow
                :input-id="`tree-child-${category.id}-${child.id}`"
                :label="child.label"
                :checked="checkedChildren.has(child.id)"
                :count="child.count"
                level="child"
                @toggle="onChildToggle(child.id)"
              />
            </div>

            <BaseFilterShowMore
              v-if="
                hiddenChildrenCount > 0 ||
                (showAllChildren &&
                  visibleChildrenSource.length > 4 &&
                  !props.isSearching)
              "
              :show-all="showAllChildren"
              :hidden-count="hiddenChildrenCount"
              @toggle="toggleShowAll"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
