import { computed, ref } from "vue";
import { getArabicSearchScore } from "~/shared/utils/string";

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

interface UseFilterSearchOptions<T extends SearchableItem> {
  resolveLabel?: (item: T, parent: T | null) => string;
  getChildren?: (item: T) => T[] | undefined;
  cloneWithChildren?: (item: T, children: T[]) => T;
}

interface RankedSearchResult<T> {
  item: T;
  score: number;
}

const defaultGetChildren = <T extends SearchableItem>(item: T) =>
  item.children as T[] | undefined;

const defaultCloneWithChildren = <T extends SearchableItem>(item: T, children: T[]) =>
  ({
    ...item,
    children,
  }) as T;

const rankTreeItem = <T extends SearchableItem>(
  item: T,
  query: string,
  resolveLabel: (item: T, parent: T | null) => string,
  getChildren: (item: T) => T[] | undefined,
  cloneWithChildren: (item: T, children: T[]) => T,
): RankedSearchResult<T> | null => {
  const selfScore = getArabicSearchScore(resolveLabel(item, null), query);
  const children = getChildren(item) ?? [];

  if (children.length === 0) {
    return selfScore > 0
      ? {
          item,
          score: selfScore,
        }
      : null;
  }

  const rankedChildren = children
    .map((child) => ({
      item: child,
      score: getArabicSearchScore(resolveLabel(child, item), query),
    }))
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score);

  if (selfScore === 0 && rankedChildren.length === 0) {
    return null;
  }

  const bestChildScore = rankedChildren[0]?.score ?? 0;
  const scopedChildren =
    selfScore > 0 ? children : rankedChildren.map((entry) => entry.item);

  return {
    item: cloneWithChildren(item, scopedChildren),
    score: Math.max(selfScore, bestChildScore) + (rankedChildren.length > 0 ? 15 : 0),
  };
};

/**
 * Headless search composable for flat or tree filters.
 * It ranks results using Arabic-aware normalization and keeps children scoped
 * to their matching parent branch so the UI remains understandable.
 */
export function useFilterSearch<T extends SearchableItem>(
  itemsRef: () => T[],
  options: UseFilterSearchOptions<T> = {},
) {
  const searchQuery = ref("");

  const resolveLabel = options.resolveLabel ?? ((item: T) => item.label);
  const getChildren = options.getChildren ?? defaultGetChildren<T>;
  const cloneWithChildren = options.cloneWithChildren ?? defaultCloneWithChildren<T>;

  const trimmedQuery = computed(() => searchQuery.value.trim());
  const isSearching = computed(() => trimmedQuery.value.length > 0);

  const filteredItems = computed(() => {
    const rawItems = itemsRef();

    if (!isSearching.value) {
      return rawItems;
    }

    return rawItems
      .map((item) =>
        rankTreeItem(item, trimmedQuery.value, resolveLabel, getChildren, cloneWithChildren),
      )
      .filter((entry): entry is RankedSearchResult<T> => entry !== null)
      .sort((left, right) => right.score - left.score)
      .map((entry) => entry.item);
  });

  const hasMatches = computed(() => filteredItems.value.length > 0);

  return {
    searchQuery,
    isSearching,
    filteredItems,
    hasMatches,
  };
}
