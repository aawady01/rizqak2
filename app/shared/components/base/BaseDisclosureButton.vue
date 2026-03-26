<script setup lang="ts">
import { Plus, Minus } from "lucide-vue-next";

const { t } = useI18n();

interface Props {
  expanded: boolean;
  collapsedLabel?: string;
  expandedLabel?: string;
  controlsId?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  collapsedLabel: undefined,
  expandedLabel: undefined,
  controlsId: undefined,
  disabled: false,
});

const resolvedCollapsed = computed(() => props.collapsedLabel ?? t('base.disclosure.expand'));
const resolvedExpanded = computed(() => props.expandedLabel ?? t('base.disclosure.collapse'));

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
    :aria-label="expanded ? resolvedExpanded : resolvedCollapsed"
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
