<script setup lang="ts">
import { computed } from "vue";
import type { FilterCategory } from "~/shared/utils/mockData";
import { normalizeArabic, toDomSafeId } from "~/shared/utils/string";
import { useFilterPagination } from "~/composables/filters/useFilterPagination";
import BaseDisclosureButton from "../../shared/components/base/BaseDisclosureButton.vue";
import BaseFilterShowMore from "../../shared/components/base/BaseFilterShowMore.vue";
import BaseFilterItemRow from "../../shared/components/base/BaseFilterItemRow.vue";

interface Props {
  category: FilterCategory;
  isLast: boolean;
  checkedChildren: Set<string>;
  searchQuery?: string;
  expanded?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  searchQuery: "",
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

const normalizedSearch = computed(() =>
  normalizeArabic(props.searchQuery.trim().toLowerCase()),
);
const isSearching = computed(() => normalizedSearch.value.length > 0);

const matchesSelf = computed(() => {
  if (!isSearching.value) return false;

  return normalizeArabic(props.category.label.toLowerCase()).includes(
    normalizedSearch.value,
  );
});

const matchingChildren = computed(() => {
  if (!props.category.children) return [];
  if (!isSearching.value) return props.category.children;

  return props.category.children.filter((child) =>
    normalizeArabic(child.label.toLowerCase()).includes(normalizedSearch.value),
  );
});

const autoExpandedFromSearch = computed(
  () =>
    hasChildren.value &&
    isSearching.value &&
    (matchesSelf.value || matchingChildren.value.length > 0),
);
const expanded = computed(
  () => Boolean(props.expanded) || autoExpandedFromSearch.value,
);

const {
  showAll: showAllChildren,
  visibleItems: visibleChildren,
  hiddenCount: hiddenChildrenCount,
  toggleShowAll,
} = useFilterPagination(matchingChildren, isSearching, 4);

const rowStateActive = computed(
  () => someChecked.value || allChecked.value || expanded.value,
);
const categoryInputId = computed(() => toDomSafeId(props.category.id, "tree-cat"));
const childGroupId = computed(() => toDomSafeId(props.category.id, "tree-group"));

const toggleExpanded = () => {
  if (!hasChildren.value || isSearching.value) return;
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
    <!-- الخط الأفقي للفئة الرئيسية - يربط الفئة بالخط العمودي -->
    <div 
      class="absolute h-[2px] bg-primary transition-all duration-300 z-20 rounded-full"
      :class="rowStateActive ? 'opacity-90' : 'opacity-40'"
      style="inset-inline-end: -2px; top: 50%; transform: translateY(-50%); width: 6px;"
    />

    <div class="ps-[6px]">
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
            :disabled="isSearching"
            collapsed-label="توسيع المجموعة"
            expanded-label="طي المجموعة"
            @toggle="toggleExpanded"
          />
        </BaseFilterItemRow>
      </div>

      <div
        v-if="hasChildren"
        :id="childGroupId"
        class="grid transition-all duration-300 ease-in-out origin-top"
        :class="
          expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        "
      >
        <div class="overflow-hidden">
          <div
            class="relative ps-[20px] pt-1"
            role="group"
            :aria-labelledby="categoryInputId"
          >
            <!-- الخط العمودي الرئيسي للأطفال - متصل وسلس -->
            <div 
              v-if="visibleChildren.length > 0"
              class="absolute w-[2px] bg-primary transition-all duration-300 z-10 rounded-full"
              :class="rowStateActive ? 'opacity-90' : 'opacity-40'"
              style="inset-inline-start: 0; top: 4px;"
              :style="{ 
                height: `calc(100% - ${visibleChildren.length > 1 ? '21px' : '4px'})`
              }"
            />
            
            <div
              v-for="(child, idx) in visibleChildren"
              :key="child.id"
              class="relative"
            >
              <!-- الخط الأفقي للعنصر الطفل - يتصل بالخط العمودي -->
              <div 
                class="absolute h-[2px] bg-primary transition-all duration-300 z-20 rounded-full"
                :class="checkedChildren.has(child.id) ? 'opacity-90' : 'opacity-40'"
                style="inset-inline-start: -20px; top: 50%; transform: translateY(-50%); width: 20px;"
              />

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
                  matchingChildren.length > 4 &&
                  !isSearching)
              "
              :show-all="showAllChildren"
              :hidden-count="hiddenChildrenCount"
              class="relative z-10 ps-0"
              @toggle="toggleShowAll"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
