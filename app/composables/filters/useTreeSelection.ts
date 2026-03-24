import { useRoute, useRouter } from "#imports";

/**
 * Headless composable for managing deep nested selections (checkbox tree).
 * Now supports URL Query Parameter synchronization for SEO indexability and deep linking.
 */
export function useTreeSelection(
  initialIds = new Set<string>(),
  queryKey?: string,
) {
  const route = useRoute();
  const router = useRouter();

  const selectedIds = shallowRef<Set<string>>(new Set(initialIds));

  // Initialize from URL if queryKey is present
  if (queryKey && route?.query[queryKey]) {
    const qVal = route.query[queryKey];
    const idsFromQuery =
      typeof qVal === "string"
        ? qVal.split(",")
        : Array.isArray(qVal)
          ? (qVal.filter(Boolean) as string[])
          : [];
    if (idsFromQuery.length > 0) {
      selectedIds.value = new Set(idsFromQuery);
    }
  }

  const serializedSelection = computed(() =>
    Array.from(selectedIds.value).sort().join(","),
  );

  // Sync back to URL when state changes
  if (queryKey) {
    watch(serializedSelection, async (serializedValue) => {
      if (!route || !router) return;

      const currentRaw = route.query[queryKey];
      const currentSerialized =
        typeof currentRaw === "string"
          ? currentRaw
          : Array.isArray(currentRaw)
            ? currentRaw.join(",")
            : "";

      if (currentSerialized === serializedValue) return;

      const currentQuery = { ...route.query };

      if (serializedValue) {
        currentQuery[queryKey] = serializedValue;
      } else {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete currentQuery[queryKey];
      }

      await router.replace({ query: currentQuery });
    });
  }

  const isSelected = (id: string) => selectedIds.value.has(id);

  const toggleItem = (id: string) => {
    const next = new Set(selectedIds.value);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    selectedIds.value = next;
  };

  const toggleCategory = (childIds: string[]) => {
    const next = new Set(selectedIds.value);
    const allSelected = childIds.every(id => next.has(id));
    
    if (allSelected) {
      childIds.forEach(id => next.delete(id));
    } else {
      childIds.forEach(id => next.add(id));
    }
    
    selectedIds.value = next;
  };

  const clearAll = () => {
    selectedIds.value = new Set();
  };

  const selectAll = (allValidIds: string[]) => {
    selectedIds.value = new Set(allValidIds);
  };

  return {
    selectedIds,
    isSelected,
    toggleItem,
    toggleCategory,
    clearAll,
    selectAll
  };
}