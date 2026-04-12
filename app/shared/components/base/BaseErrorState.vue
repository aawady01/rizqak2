<script setup lang="ts">
import { AlertCircle, RefreshCw } from "lucide-vue-next";
import { cn } from "~/shared/utils/tailwind";

const { t } = useI18n();

interface Props {
  title?: string;
  description?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  description: undefined,
});

const emit = defineEmits<{
  retry: [];
}>();

const resolvedTitle = computed(() => props.title ?? t('base.errorState.title'));
const resolvedDescription = computed(() => props.description ?? t('base.errorState.description'));
</script>

<template>
  <div
    role="alert"
    :class="cn('flex flex-col items-center justify-center py-section px-content text-center', props.class)"
  >
    <div class="mb-content size-12 rounded-full bg-error-bg flex items-center justify-center">
      <AlertCircle class="size-6 text-error" :stroke-width="1.5" aria-hidden="true" />
    </div>
    <h3 class="text-ds-h5 font-semibold text-foreground mb-compact">{{ resolvedTitle }}</h3>
    <p class="text-ds-body-r text-foreground-muted max-w-sm mb-content">{{ resolvedDescription }}</p>
    <button
      class="inline-flex items-center gap-compact px-content py-compact bg-surface-alt text-foreground text-ds-body-r font-medium border border-border hover:bg-surface-hover transition-colors rounded-none"
      @click="emit('retry')"
    >
      <RefreshCw class="size-4" :stroke-width="2" />
      {{ t('base.errorState.retry') }}
    </button>
  </div>
</template>
