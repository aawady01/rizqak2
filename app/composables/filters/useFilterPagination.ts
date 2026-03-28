import { ref, computed } from "vue";
import type { Ref } from "vue";

/**
 * Headless composable for managing "Show More / Show Less" visibility logic on lists.
 */
export function useFilterPagination<T>(
  filteredItemsRef: Ref<T[]> | (() => T[]),
  isSearchingRef: Ref<boolean>,
  limit: number = 4
) {
  const showAll = ref(false);

  // Reactively resolve item source (supports both Ref and getter)
  const items = computed(() => typeof filteredItemsRef === 'function' ? filteredItemsRef() : filteredItemsRef.value);

  const visibleItems = computed(() => {
    const list = items.value;
    // Bypass limit if searching, explicitly requesting all, or list is already small
    if (isSearchingRef.value || showAll.value || list.length <= limit) {
      return list;
    }
    return list.slice(0, limit);
  });

  const hiddenCount = computed(() => {
    const list = items.value;
    if (isSearchingRef.value || showAll.value) return 0;
    return Math.max(0, list.length - limit);
  });

  const toggleShowAll = () => {
    showAll.value = !showAll.value;
  };

  return {
    showAll,
    visibleItems,
    hiddenCount,
    toggleShowAll
  };
}