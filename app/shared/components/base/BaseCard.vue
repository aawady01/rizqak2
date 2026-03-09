<script setup lang="ts">
import { cn } from "~/shared/utils/tailwind";

interface Props {
  class?: string;
  headerClass?: string;
  titleClass?: string;
  descriptionClass?: string;
  contentClass?: string;
  footerClass?: string;
  actionClass?: string;
  title?: string;
  description?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div
    :class="
      cn(
        'bg-ds-surface text-ds-foreground flex flex-col rounded-none border border-ds-border shadow-sm transition-all duration-200',
        props.class,
      )
    "
  >
    <!-- Header Section -->
    <div
      v-if="$slots.header || title || description || $slots.action"
      :class="
        cn(
          '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1 p-5 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-5',
          props.headerClass,
        )
      "
    >
      <slot name="header">
        <h4
          v-if="title"
          :class="
            cn('text-ds-subtitle-l font-bold tracking-tight', props.titleClass)
          "
        >
          {{ title }}
        </h4>
        <p
          v-if="description"
          :class="
            cn('text-ds-caption-r text-neutral-500', props.descriptionClass)
          "
        >
          {{ description }}
        </p>
      </slot>
      <div
        v-if="$slots.action"
        data-slot="card-action"
        :class="
          cn(
            'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
            props.actionClass,
          )
        "
      >
        <slot name="action" />
      </div>
    </div>

    <!-- Content Section -->
    <div :class="cn('p-5 [&:last-child]:pb-5', props.contentClass)">
      <slot />
    </div>

    <!-- Footer Section -->
    <div
      v-if="$slots.footer"
      :class="
        cn('flex items-center p-5 pt-0 [.border-t]:pt-5', props.footerClass)
      "
    >
      <slot name="footer" />
    </div>
  </div>
</template>
