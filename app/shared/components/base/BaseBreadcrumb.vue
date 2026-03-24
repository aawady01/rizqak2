<script setup lang="ts">
import { ChevronLeft } from "lucide-vue-next";
import { cn } from "~/shared/utils/tailwind";

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface Props {
  items: BreadcrumbItem[];
  class?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <nav aria-label="مسار التنقل" :class="cn('flex items-center gap-1', props.class)">
    <ol class="flex items-center gap-1 flex-wrap" role="list">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="flex items-center gap-1"
      >
        <NuxtLink
          v-if="item.to && index < items.length - 1"
          :to="item.to"
          class="text-ds-caption-l text-foreground-muted hover:text-interactive transition-colors"
        >
          {{ item.label }}
        </NuxtLink>
        <span
          v-else
          class="text-ds-caption-l font-medium text-foreground"
          :aria-current="index === items.length - 1 ? 'page' : undefined"
        >
          {{ item.label }}
        </span>
        <ChevronLeft
          v-if="index < items.length - 1"
          class="size-3.5 text-foreground-subtle"
          :stroke-width="2"
          aria-hidden="true"
        />
      </li>
    </ol>
  </nav>
</template>
