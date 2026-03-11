<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "#imports";
import BaseFilterSection from "./BaseFilterSection.vue";

interface Props {
  selected?: string;
  queryKey?: string;
}

const props = withDefaults(defineProps<Props>(), {
  selected: "all",
  queryKey: undefined,
});

const emit = defineEmits<{
  "update:selected": [value: string];
}>();

const route = useRoute();
const router = useRouter();

const options = [
  { id: "all", label: "الكل" },
  { id: "male", label: "ذكور" },
  { id: "female", label: "إناث" },
];

const currentValue = computed({
  get: () => {
    if (props.queryKey) {
      const raw = route.query[props.queryKey];
      if (typeof raw === "string" && raw.trim()) {
        return raw;
      }
    }

    return props.selected;
  },
  set: async (value: string) => {
    emit("update:selected", value);

    if (!props.queryKey) return;

    const nextQuery = { ...route.query };
    if (value && value !== "all") {
      nextQuery[props.queryKey] = value;
    } else {
      delete nextQuery[props.queryKey];
    }

    await router.replace({ query: nextQuery });
  },
});

const handleChange = (id: string) => {
  currentValue.value = id;
};
</script>

<template>
  <BaseFilterSection title="الجنس">
    <div
      class="grid grid-cols-3 gap-compact"
      role="radiogroup"
      aria-label="تصفية حسب الجنس"
    >
      <button
        v-for="opt in options"
        :key="opt.id"
        type="button"
        role="radio"
        :aria-checked="currentValue === opt.id"
        @click="handleChange(opt.id)"
        class="min-h-filter-option border text-ds-body-r text-center transition-colors rounded-none outline-none"
        :class="[
          currentValue === opt.id
            ? 'bg-primary/5 border-primary text-primary font-semibold'
            : 'border-border text-muted-foreground hover:border-primary/40 hover:text-primary font-medium',
        ]"
      >
        {{ opt.label }}
      </button>
    </div>
  </BaseFilterSection>
</template>
