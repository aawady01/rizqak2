<script setup lang="ts">
import { useRoute, useRouter } from "#imports";
import BaseFilterSection from "./BaseFilterSection.vue";

const { t } = useI18n();

interface Props {
  selected?: string;
  queryKey?: string;
  icon?: any;
}

const props = withDefaults(defineProps<Props>(), {
  selected: "all",
  queryKey: undefined,
  icon: undefined,
});

const emit = defineEmits<{
  "update:selected": [value: string];
}>();

const route = useRoute();
const router = useRouter();

const options = computed(() => [
  { id: "all", label: t('filters.gender.all') },
  { id: "male", label: t('filters.gender.male') },
  { id: "female", label: t('filters.gender.female') },
]);

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

    const currentQuery = { ...route.query } as Record<string, string>;
    if (value && value !== "all") {
      currentQuery[props.queryKey] = value;
    } else {
      delete currentQuery[props.queryKey];
    }

    await router.replace({ query: currentQuery });
  },
});

const handleChange = (id: string) => {
  currentValue.value = id;
};
</script>

<template>
  <BaseFilterSection :title="t('filters.gender.title')" :icon="icon">
    <div
      class="grid grid-cols-3 gap-compact"
      role="radiogroup"
      :aria-label="t('filters.gender.ariaLabel')"
    >
      <button
        v-for="opt in options"
        :key="opt.id"
        type="button"
        role="radio"
        :aria-checked="currentValue === opt.id"
        class="min-h-filter-option border text-ds-body-r text-center transition-colors rounded-none outline-none cursor-pointer"
        :class="[
          currentValue === opt.id
            ? 'bg-primary/5 border-primary text-primary font-semibold'
            : 'border-border text-foreground-muted hover:border-primary/40 hover:text-primary font-medium',
        ]"
        @click="handleChange(opt.id)"
      >
        {{ opt.label }}
      </button>
    </div>
  </BaseFilterSection>
</template>
