<script setup lang="ts">
import { Plus, Minus } from "lucide-vue-next";

interface Props {
  expanded: boolean;
  collapsedLabel?: string;
  expandedLabel?: string;
  controlsId?: string;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  collapsedLabel: "توسيع القائمة",
  expandedLabel: "طي القائمة",
  controlsId: undefined,
  disabled: false,
});

defineEmits<{
  toggle: [];
}>();
</script>

<template>
  <button
    type="button"
    class="filter-disclosure-button"
    :aria-expanded="expanded"
    :aria-controls="controlsId"
    :aria-label="expanded ? expandedLabel : collapsedLabel"
    :disabled="disabled"
    @click.stop="$emit('toggle')"
  >
    <Minus
      v-if="expanded"
      class="filter-disclosure-button__icon"
      :stroke-width="2.5"
    />
    <Plus
      v-else
      class="filter-disclosure-button__icon"
      :stroke-width="2.5"
    />
  </button>
</template>
