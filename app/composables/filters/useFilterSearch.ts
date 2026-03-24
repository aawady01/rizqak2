import { normalizeArabic } from '~/shared/utils/string';

export interface SearchableItem {
  id: string;
  label: string;
  children?: SearchableItem[];
  count?: number;
  totalJobs?: number;
  expanded?: boolean;
  isOpen?: boolean;
  isChecked?: boolean;
}

/**
 * Headless composable for fuzzy Arabic searching across flat or tree structures.
 * Includes a debounce mechanism to maintain 60fps performance on large lists.
 */
export function useFilterSearch<T extends SearchableItem>(
  itemsRef: () => T[],
  debounceMs: number = 200
) {
  const searchQuery = ref('');
  const debouncedQuery = ref('');
  let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

  // Debounce the input
  watch(searchQuery, (newVal) => {
    if (debounceTimeout) clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      debouncedQuery.value = newVal;
    }, debounceMs);
  });

  // Cleanup on scope disposal to prevent memory leaks
  onScopeDispose(() => {
    if (debounceTimeout) clearTimeout(debounceTimeout);
  });

  const isSearching = computed(() => debouncedQuery.value.trim().length > 0);

  const filteredItems = computed(() => {
    const rawItems = itemsRef();
    if (!isSearching.value) return rawItems;

    const query = normalizeArabic(debouncedQuery.value.toLowerCase());

    return rawItems.map(item => {
      // Direct match
      if (normalizeArabic(item.label.toLowerCase()).includes(query)) return item;

      // Check children if it's a tree node
      if (!item.children) return null;

      const matchingChildren = item.children.filter((child: SearchableItem) =>
        normalizeArabic(child.label.toLowerCase()).includes(query)
      );

      if (matchingChildren.length === 0) return null;

      // Return a copy with only matched children
      return {
        ...item,
        children: matchingChildren
      };
    }).filter(Boolean) as T[];
  });

  const hasMatches = computed(() => filteredItems.value.length > 0);

  return {
    searchQuery,
    debouncedQuery,
    isSearching,
    filteredItems,
    hasMatches
  };
}