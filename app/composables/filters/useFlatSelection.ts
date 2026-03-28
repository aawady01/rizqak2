import { useRoute, useRouter } from "#imports";
import { shallowRef, ref, computed, watch } from "vue";
import type { ComputedRef } from "vue";
interface MultiSelectOptions {
  mode: "multi";
  queryKey?: string;
  defaultSelectedIds?: string[];
}

interface SingleSelectOptions {
  mode: "single";
  queryKey?: string;
  defaultValue?: string | null;
}

type FlatSelectionOptions = MultiSelectOptions | SingleSelectOptions;

export function useFlatSelection(
  allIds: ComputedRef<string[]>,
  options: FlatSelectionOptions,
) {
  const route = useRoute();
  const router = useRouter();

  const selectedIds = shallowRef<Set<string>>(
    new Set(options.mode === "multi" ? (options.defaultSelectedIds ?? allIds.value) : []),
  );
  const selectedValue = ref<string | null>(
    options.mode === "single" ? (options.defaultValue ?? null) : null,
  );

  const queryValue = options.queryKey ? route.query[options.queryKey] : undefined;

  if (options.queryKey) {
    if (options.mode === "multi") {
      const idsFromQuery =
        typeof queryValue === "string"
          ? queryValue.split(",").filter(Boolean)
          : Array.isArray(queryValue)
            ? queryValue.filter(Boolean) as string[]
            : [];

      if (idsFromQuery.length > 0) {
        selectedIds.value = new Set(idsFromQuery);
      }
    } else if (typeof queryValue === "string" && queryValue.trim()) {
      selectedValue.value = queryValue;
    }
  }

  const serializedState = computed(() => {
    if (options.mode === "multi") {
      return Array.from(selectedIds.value).sort().join(",");
    }

    return selectedValue.value ?? "";
  });

  watch(serializedState, async (nextSerialized) => {
    if (!options.queryKey) return;

    const currentRaw = route.query[options.queryKey];
    const currentSerialized =
      typeof currentRaw === "string"
        ? currentRaw
        : Array.isArray(currentRaw)
          ? currentRaw.join(",")
          : "";

    if (currentSerialized === nextSerialized) return;

    const nextQuery = { ...route.query };

      if (nextSerialized) {
      nextQuery[options.queryKey] = nextSerialized;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete nextQuery[options.queryKey];
    }

    await router.replace({ query: nextQuery });
  });

  const isChecked = (id: string) => {
    if (options.mode === "single") {
      return selectedValue.value === id;
    }

    return selectedIds.value.has(id);
  };

  const toggle = (id: string) => {
    if (options.mode === "single") {
      selectedValue.value = selectedValue.value === id ? null : id;
      return;
    }

    const next = new Set(selectedIds.value);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }

    selectedIds.value = next;
  };

  const clearAll = () => {
    if (options.mode === "single") {
      selectedValue.value = null;
      return;
    }

    selectedIds.value = new Set();
  };

  const selectAll = () => {
    if (options.mode === "multi") {
      selectedIds.value = new Set(allIds.value);
    }
  };

  const allChecked = computed(() => {
    if (options.mode === "single") {
      return selectedValue.value === null;
    }

    return (
      allIds.value.length > 0 &&
      selectedIds.value.size === allIds.value.length
    );
  });

  const someChecked = computed(() => {
    if (options.mode === "single") {
      return selectedValue.value !== null;
    }

    return selectedIds.value.size > 0 && !allChecked.value;
  });

  return {
    selectedIds,
    selectedValue,
    isChecked,
    toggle,
    clearAll,
    selectAll,
    allChecked,
    someChecked,
  };
}