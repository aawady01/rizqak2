<script setup lang="ts">
import { Inbox } from "lucide-vue-next";
import { cn } from "~/shared/utils/tailwind";

interface Props {
  title?: string;
  description?: string;
  icon?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: "لا توجد نتائج",
  description: "لم نجد أي عناصر تطابق بحثك",
  icon: true,
});
</script>

<template>
  <div
    :class="cn('flex flex-col items-center justify-center py-12 px-4 text-center', props.class)"
  >
    <div v-if="icon" class="mb-4 size-12 rounded-full bg-surface-alt flex items-center justify-center">
      <Inbox class="size-6 text-foreground-subtle" :stroke-width="1.5" aria-hidden="true" />
    </div>
    <h3 class="text-ds-h5 font-semibold text-foreground mb-2">{{ title }}</h3>
    <p class="text-ds-body-r text-foreground-muted max-w-sm">{{ description }}</p>
    <div v-if="$slots.action" class="mt-4">
      <slot name="action" />
    </div>
  </div>
</template>
