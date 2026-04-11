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
    class="relative z-10 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 min-w-0 transition-colors"
    :class="[
      level === 'category' ? 'min-h-filter-row-parent' : 'min-h-filter-row-child ms-4',
      disabled ? 'opacity-50' : '',
    ]"
  >
    <label
      :for="resolvedInputId"
      class="grid grid-cols-[16px_minmax(0,1fr)] items-center gap-3 min-w-0 cursor-pointer outline-none transition-colors hover:bg-surface-hover"
      :class="[
        level === 'category' ? 'py-1' : 'py-0.5',
        disabled ? 'cursor-not-allowed' : ''
      ]"
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
        class="relative inline-flex size-4 items-center justify-center shrink-0 justify-self-start rounded-full border transition-colors"
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
        class="relative inline-flex size-4 items-center justify-center shrink-0 justify-self-start rounded-none border transition-colors"
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

      <span class="flex min-w-0 items-baseline gap-1.5">
        <span
          class="min-w-0 truncate transition-colors"
          :class="[
            level === 'category'
              ? 'text-ds-body-r font-bold text-ds-foreground'
              : 'text-ds-caption-r font-medium text-ds-foreground/80',
          ]"
        >
          {{ label }}
        </span>

        <span
          v-if="count !== undefined || totalJobs !== undefined"
          class="shrink-0 text-ds-filter-count text-foreground-subtle font-medium"
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

