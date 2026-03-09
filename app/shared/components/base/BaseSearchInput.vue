<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from "vue";
import { Search, X } from "lucide-vue-next";
import { cn } from "~/shared/utils/tailwind";

interface Props {
  placeholder?: string;
  debounce?: number;
  class?: string;
  ariaLabel?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "ابحث...",
  debounce: 300, // Default 300ms debounce to protect backend/rendering
  ariaLabel: "حقل البحث",
  disabled: false,
});

// Vue 3.5+ standard
const model = defineModel<string>({ default: "" });

// Internal state for immediate UI feedback while delaying the actual model update
const internalValue = ref(model.value);
const isFocused = ref(false);
let timeoutId: ReturnType<typeof setTimeout> | null = null;

// Sync internal value when user types, but delay updating the v-model
watch(internalValue, (newVal) => {
  if (timeoutId) clearTimeout(timeoutId);

  if (props.debounce > 0) {
    timeoutId = setTimeout(() => {
      // Basic sanitization: trim spaces to prevent useless queries
      model.value = newVal.trim();
    }, props.debounce);
  } else {
    model.value = newVal.trim();
  }
});

// Sync internal value if model is updated from parent (e.g. clearing filters)
watch(model, (newVal) => {
  if (newVal !== internalValue.value) {
    internalValue.value = newVal;
  }
});

onBeforeUnmount(() => {
  if (timeoutId) clearTimeout(timeoutId);
});

const clearSearch = () => {
  internalValue.value = "";
};
</script>

<template>
  <div :class="cn('relative w-full', props.class)">
    <!-- Search Icon wrapper (styled based on isFocused state) -->
    <div
      class="absolute inset-y-0 start-0 flex items-center justify-center w-8 rounded-none pointer-events-none transition-colors duration-200 z-10"
      :class="isFocused ? 'bg-primary text-white' : 'text-muted-foreground'"
    >
      <Search class="size-3.5" />
    </div>

    <input
      ref="inputRef"
      v-model="internalValue"
      type="text"
      :placeholder="placeholder"
      :aria-label="ariaLabel"
      :disabled="disabled"
      @focus="isFocused = true"
      @blur="isFocused = false"
      :class="[
        'w-full h-8 bg-muted/50 focus:bg-white dark:focus:bg-search-surface-focus-dark border border-transparent focus:border-border rounded-none text-ds-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0 transition-all z-0 disabled:opacity-50 disabled:cursor-not-allowed ps-10 pe-8 py-1',
        isFocused ? 'bg-white border-border shadow-sm' : '',
      ]"
    />

    <!-- Clear Button -->
    <button
      v-if="internalValue"
      type="button"
      @click="clearSearch"
      aria-label="مسح البحث"
      class="absolute inset-y-0 end-0 flex items-center pe-2.5 text-muted-foreground hover:text-foreground transition-colors outline-none focus-visible:text-primary z-10"
    >
      <X class="size-3.5" />
    </button>
  </div>
</template>
