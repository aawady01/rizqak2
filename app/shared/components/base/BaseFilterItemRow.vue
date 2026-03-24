<script setup lang="ts">
import { Check } from "lucide-vue-next";
import { toDomSafeId } from "~/shared/utils/string";

interface Props {
  label: string;
  checked: boolean;
  indeterminate?: boolean;
  level?: "category" | "child";
  inputType?: "checkbox" | "radio";
  count?: number;
  totalJobs?: number;
  inputId?: string;
  inputName?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  level: "category",
  inputType: "checkbox",
  indeterminate: false,
  disabled: false,
  inputId: undefined,
  inputName: undefined,
});

const emit = defineEmits<{ toggle: [] }>();

const inputRef = ref<HTMLInputElement | null>(null);
const resolvedInputId = computed(
  () =>
    props.inputId ??
    toDomSafeId(props.label, `filter-${props.level}`),
);

watchEffect(() => {
  if (inputRef.value && props.inputType === "checkbox") {
    inputRef.value.indeterminate = Boolean(props.indeterminate && !props.checked);
  }
});
</script>

<template>
  <div
    class="filter-tree-item-row"
    :class="[
      level === 'category'
        ? 'filter-tree-item-row--category'
        : 'filter-tree-item-row--child',
      disabled ? 'opacity-50' : '',
    ]"
  >
    <label
      :for="resolvedInputId"
      class="filter-tree-item-row__label"
      :class="[disabled ? 'filter-tree-item-row__label--disabled' : '']"
    >
      <input
        :id="resolvedInputId"
        ref="inputRef"
        :name="inputName"
        :type="inputType"
        class="peer sr-only"
        :checked="checked"
        :disabled="disabled"
        @change="emit('toggle')"
      >

      <span
        v-if="inputType === 'radio'"
        class="filter-tree-item-row__control rounded-full border transition-colors"
        :class="[
          checked
            ? 'border-primary bg-primary'
            : 'border-border filter-control-idle-surface',
        ]"
      >
        <span v-if="checked" class="size-1.5 rounded-full bg-white" />
      </span>

      <span
        v-else
        class="filter-tree-item-row__control rounded-none border transition-colors"
        :class="[
          checked || indeterminate
            ? 'border-primary bg-primary'
            : 'border-border filter-control-idle-surface',
        ]"
      >
        <Check
          v-if="checked && !indeterminate"
          class="size-3 text-white"
          :stroke-width="3"
        />
        <span
          v-else-if="indeterminate"
          class="h-divider-thin w-2 rounded-full bg-white"
        />
      </span>

      <span class="filter-tree-item-row__content">
        <span
          class="min-w-0 truncate transition-colors"
          :class="[
            level === 'category'
              ? 'text-ds-body-r font-bold text-ds-foreground'
              : 'text-ds-caption-r font-medium text-ds-foreground/80',
          ]"
        >
          {{ $t(label) }}
        </span>

        <span
          v-if="count !== undefined || totalJobs !== undefined"
          class="filter-tree-item-row__count"
        >
          <template v-if="count !== undefined && count > 0">{{ count }}</template>
          <template v-if="totalJobs !== undefined"> ({{ totalJobs }})</template>
        </span>
      </span>
    </label>

    <div v-if="$slots.default" class="shrink-0">
      <slot />
    </div>
  </div>
</template>

