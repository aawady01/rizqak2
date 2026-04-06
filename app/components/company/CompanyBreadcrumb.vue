<script setup lang="ts">
import { Home, ChevronRight } from "lucide-vue-next";

interface BreadcrumbItem {
  label: string
  href: string
  current?: boolean
}

defineProps<{
  items: BreadcrumbItem[]
}>()
</script>

<template>
  <nav aria-label="Breadcrumb" class="mb-4 md:mb-5">
    <ol class="flex items-center gap-2 text-ds-label-r">
      <template v-for="(item, index) in items" :key="index">
        <li v-if="index === 0">
          <NuxtLink
            :to="item.href"
            class="flex items-center gap-1 text-primary hover:text-primary-dark transition-colors font-medium"
          >
            <Home class="size-4" :stroke-width="2" aria-hidden="true" />
            <span class="hover:underline">{{ item.label }}</span>
          </NuxtLink>
        </li>
        <li v-else-if="!item.current">
          <NuxtLink
            :to="item.href"
            class="text-primary hover:text-primary-dark transition-colors hover:underline font-medium"
          >
            {{ item.label }}
          </NuxtLink>
        </li>
        <li v-else>
          <span class="text-foreground-subtle font-medium" aria-current="page">{{ item.label }}</span>
        </li>
        <li v-if="index < items.length - 1" class="flex items-center text-neutral-300" aria-hidden="true">
          <ChevronRight class="size-4 rtl:rotate-180" :stroke-width="2" />
        </li>
      </template>
    </ol>
  </nav>
</template>
