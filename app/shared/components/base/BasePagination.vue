<script setup lang="ts">
import { ChevronRight, ChevronLeft } from "lucide-vue-next";
import { cn } from "~/shared/utils/tailwind";

const { t } = useI18n();

interface Props {
  currentPage?: number;
  totalPages?: number;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  currentPage: 1,
  totalPages: 10,
});

const emit = defineEmits<{
  "update:currentPage": [page: number];
  change: [page: number];
}>();

const visiblePages = computed(() => {
  const pages: (number | string)[] = [];
  if (props.totalPages <= 5) {
    for (let i = 1; i <= props.totalPages; i++) pages.push(i);
  } else {
    pages.push(1, 2);
    if (props.currentPage > 3) pages.push("...");
    if (props.currentPage > 2 && props.currentPage < props.totalPages - 1) {
      pages.push(props.currentPage);
    }
    if (props.currentPage < props.totalPages - 2) pages.push("...");
    pages.push(props.totalPages);
  }
  return [...new Set(pages)];
});

const handlePageChange = (page: number | string) => {
  if (typeof page === "number" && page >= 1 && page <= props.totalPages) {
    emit("update:currentPage", page);
    emit("change", page);
  }
};
</script>

<template>
  <div :class="cn('pt-6 flex justify-center', props.class)">
    <nav :aria-label="t('base.pagination.ariaLabel')" class="flex gap-1.5">
      <!-- Arrow Right (Previous in RTL) -->
      <button
        :disabled="currentPage === 1"
        class="size-10 flex items-center justify-center border border-border text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors disabled:opacity-40 disabled:hover:border-border disabled:hover:text-muted-foreground"
        @click="handlePageChange(Math.max(1, currentPage - 1))"
      >
        <ChevronRight class="size-4" :stroke-width="2.5" />
      </button>

      <template v-for="(page, idx) in visiblePages" :key="`page-${idx}`">
        <span
          v-if="page === '...'"
          class="size-10 flex items-center justify-center text-muted-foreground text-ds-caption"
        >
          ...
        </span>
        <button
          v-else
          :class="
            cn(
              'size-10 flex items-center justify-center transition-colors text-ds-caption font-medium',
              currentPage === page
                ? 'bg-primary text-white font-bold'
                : 'border border-border text-foreground hover:border-primary/40 hover:text-primary',
            )
          "
          @click="handlePageChange(page)"
        >
          {{ page }}
        </button>
      </template>

      <!-- Arrow Left (Next in RTL) -->
      <button
        :disabled="currentPage === totalPages"
        class="size-10 flex items-center justify-center border border-border text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors disabled:opacity-40 disabled:hover:border-border disabled:hover:text-muted-foreground"
        @click="handlePageChange(Math.min(totalPages, currentPage + 1))"
      >
        <ChevronLeft class="size-4" :stroke-width="2.5" />
      </button>
    </nav>
  </div>
</template>
