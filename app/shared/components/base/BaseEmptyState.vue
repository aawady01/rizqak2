<script setup lang="ts">
import { Inbox } from "lucide-vue-next";
import { cn } from "~/shared/utils/tailwind";

const { t } = useI18n();

interface Props {
  title?: string;
  description?: string;
  icon?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  description: undefined,
  icon: true,
});

const resolvedTitle = computed(() => props.title ?? t('base.emptyState.title'));
const resolvedDescription = computed(() => props.description ?? t('base.emptyState.description'));
</script>

<template>
  <div
    :class="cn('flex flex-col items-center justify-center py-section px-content text-center', props.class)"
  >
    <div v-if="icon" class="mb-content size-12 rounded-full bg-surface-alt flex items-center justify-center">
      <Inbox class="size-6 text-foreground-subtle" :stroke-width="1.5" aria-hidden="true" />
    </div>
    <h3 class="text-ds-h5 font-semibold text-foreground mb-compact">{{ resolvedTitle }}</h3>
    <p class="text-ds-body-r text-foreground-muted max-w-sm">{{ resolvedDescription }}</p>
    <div v-if="$slots.action" class="mt-content">
      <slot name="action" />
    </div>
  </div>
</template>
