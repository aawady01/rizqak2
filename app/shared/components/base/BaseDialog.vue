<script setup lang="ts">
import {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "reka-ui";
import { XIcon } from "lucide-vue-next";
import { cn } from "~/shared/utils/tailwind";

const modelValue = defineModel<boolean>();

interface Props {
  title?: string;
  description?: string;
  contentClass?: string;
  hideClose?: boolean;
}

const props = defineProps<Props>();

const overlayClass = computed(() => {
  return cn(
    "fixed inset-0 z-50 bg-foreground/50 dialog-overlay-state",
  );
});

const finalContentClass = computed(() => {
  return cn(
    "bg-background fixed top-1/2 inset-inline-start-1/2 z-50 dialog-mobile-max-w grid w-full -translate-x-1/2 -translate-y-1/2 gap-4 rounded-none border border-ds-border p-6 shadow-lg duration-200 sm:max-w-lg dialog-content-state",
    props.contentClass,
  );
});
</script>

<template>
  <DialogRoot v-model:open="modelValue">
    <DialogTrigger data-slot="dialog-trigger" as-child>
      <slot name="trigger" />
    </DialogTrigger>

    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay data-slot="dialog-overlay" :class="overlayClass" />
      <DialogContent
        data-slot="dialog-content"
        :class="finalContentClass"
        v-bind="$attrs"
      >
        <div
          v-if="title || description || $slots.header"
          data-slot="dialog-header"
          class="flex flex-col gap-2 text-start sm:text-start"
        >
          <slot name="header">
            <DialogTitle
              v-if="title"
              data-slot="dialog-title"
              class="text-ds-subtitle-l font-bold"
            >
              {{ title }}
            </DialogTitle>
            <DialogDescription
              v-if="description"
              data-slot="dialog-description"
              class="text-muted-foreground text-ds-caption-r"
            >
              {{ description }}
            </DialogDescription>
          </slot>
        </div>

        <slot />

        <div
          v-if="$slots.footer"
          data-slot="dialog-footer"
          class="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"
        >
          <slot name="footer" />
        </div>

        <DialogClose
          v-if="!hideClose"
          data-slot="dialog-close"
          class="absolute top-4 inset-inline-end-4 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ds-focus"
        >
          <XIcon class="size-5" />
          <span class="sr-only">{{ $t('modal.close') }}</span>
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
