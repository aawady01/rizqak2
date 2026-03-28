<script setup lang="ts">
import { Check } from "lucide-vue-next";
import { cn } from "~/shared/utils/tailwind";

interface Props {
  modelValue?: boolean | string[] | number[];
  value?: string | number;
  id?: string;
  name?: string;
  disabled?: boolean;
  class?: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  "update:modelValue": [value: boolean | string[] | number[]];
  change: [value: boolean | string[] | number[]];
}>();

const isChecked = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return (
      props.value !== undefined &&
      props.modelValue.includes(props.value as never)
    );
  }
  return !!props.modelValue;
});

const toggleCheckbox = () => {
  if (props.disabled) return;

  let newValue: boolean | string[] | number[];

  if (Array.isArray(props.modelValue)) {
    if (props.value === undefined) return;
    const set = new Set<string | number>(props.modelValue as (string | number)[]);
    if (set.has(props.value as never)) {
      set.delete(props.value as never);
    } else {
      set.add(props.value as never);
    }
    newValue = Array.from(set) as string[] | number[];
  } else {
    newValue = !props.modelValue;
  }

  emit("update:modelValue", newValue);
  emit("change", newValue);
};
</script>

<template>
  <button
    :id="id"
    type="button"
    role="checkbox"
    :aria-checked="isChecked"
    :disabled="disabled"
    :name="name"
    :class="
      cn(
        'peer border border-ds-border-strong bg-ds-surface aria-checked:bg-primary aria-checked:text-white aria-checked:border-primary focus-visible:border-primary focus-visible:ring-ds-focus aria-invalid:ring-error-light aria-invalid:border-error size-4 shrink-0 rounded-none shadow-xs transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center',
        props.class,
      )
    "
    @click.prevent="toggleCheckbox"
  >
    <Check v-if="isChecked" class="size-3.5" :stroke-width="3" />
  </button>
</template>
