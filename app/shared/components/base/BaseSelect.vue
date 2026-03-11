<script setup lang="ts">
import { computed } from "vue";
import {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectIcon,
  SelectPortal,
  SelectContent,
  SelectScrollUpButton,
  SelectViewport,
  SelectGroup,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectScrollDownButton,
} from "reka-ui";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-vue-next";
import { cn } from "~/shared/utils/tailwind";

interface Option {
  label: string;
  value: string;
}

const modelValue = defineModel<string>();

interface Props {
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  class?: any;
}

const props = defineProps<Props>();

const triggerClass = computed(() => {
  return cn(
    "select-trigger-state border-input [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-full items-center justify-between gap-2 rounded-md border bg-input-background px-3 py-2 text-sm whitespace-nowrap transition-color-shadow outline-none focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50 h-9 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    props.class,
  );
});
</script>

<template>
  <SelectRoot v-model="modelValue" :disabled="disabled">
    <SelectTrigger data-slot="select-trigger" :class="triggerClass">
      <SelectValue data-slot="select-value" :placeholder="placeholder" />
      <SelectIcon asChild>
        <ChevronDownIcon class="size-4 opacity-50" />
      </SelectIcon>
    </SelectTrigger>

    <SelectPortal>
      <SelectContent
        data-slot="select-content"
        class="bg-white text-ds-foreground relative z-50 min-w-select-panel select-content-geometry overflow-x-hidden overflow-y-auto rounded-none border border-ds-border shadow-xl select-content-state"
        position="popper"
      >
        <SelectScrollUpButton
          data-slot="select-scroll-up-button"
          class="flex cursor-default items-center justify-center py-1"
        >
          <ChevronUpIcon class="size-4" />
        </SelectScrollUpButton>

        <SelectViewport class="p-1 w-full scroll-my-1 select-viewport-geometry">
          <SelectGroup data-slot="select-group">
            <SelectItem
              v-for="option in options"
              :key="option.value"
              :value="option.value"
              data-slot="select-item"
              class="select-item-state focus:bg-primary/5 focus:text-primary [&_svg:not([class*='text-'])]:text-neutral-400 relative flex w-full cursor-default items-center gap-2 rounded-none py-2.5 pe-10 ps-3 text-ds-caption-r font-bold outline-none select-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2 transition-colors"
            >
              <span
                class="absolute inset-inline-end-3 flex size-4 items-center justify-center text-primary"
              >
                <SelectItemIndicator>
                  <CheckIcon class="size-5" :stroke-width="3" />
                </SelectItemIndicator>
              </span>
              <SelectItemText>{{ option.label }}</SelectItemText>
            </SelectItem>
          </SelectGroup>
        </SelectViewport>

        <SelectScrollDownButton
          data-slot="select-scroll-down-button"
          class="flex cursor-default items-center justify-center py-1"
        >
          <ChevronDownIcon class="size-4" />
        </SelectScrollDownButton>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>
