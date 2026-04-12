<script setup lang="ts">
import { TabsRoot, TabsList, TabsTrigger, TabsContent } from "reka-ui";
import { cn } from "~/shared/utils/tailwind";

const modelValue = defineModel<string>();

interface TabItem {
  value: string;
  label: string;
}

interface Props {
  items: TabItem[];
  rootClass?: string;
  listClass?: string;
  triggerClass?: string;
}

const props = defineProps<Props>();

const finalRootClass = computed(() =>
  cn("flex flex-col gap-compact", props.rootClass),
);
const finalListClass = computed(() =>
  cn(
    "bg-muted text-foreground-muted inline-flex h-10 w-fit items-center justify-center rounded-none p-1 flex",
    props.listClass,
  ),
);
const finalTriggerClass = computed(() =>
  cn(
    "tabs-trigger-state focus-visible:ring-ds-focus text-foreground-muted inline-flex h-full flex-1 items-center justify-center gap-compact rounded-none border border-transparent px-content py-compact text-ds-body-r font-semibold whitespace-nowrap transition-all outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 min-h-touch-target-compact",
    props.triggerClass,
  ),
);
</script>

<template>
  <TabsRoot
    v-model="modelValue"
    data-slot="tabs"
    :class="finalRootClass"
    v-bind="$attrs"
  >
    <TabsList data-slot="tabs-list" :class="finalListClass">
      <TabsTrigger
        v-for="item in items"
        :key="item.value"
        data-slot="tabs-trigger"
        :value="item.value"
        :class="finalTriggerClass"
      >
        <slot name="trigger" :item="item">{{ item.label }}</slot>
      </TabsTrigger>
    </TabsList>

    <TabsContent
      v-for="item in items"
      :key="item.value"
      data-slot="tabs-content"
      :value="item.value"
      class="flex-1 outline-none"
    >
      <slot :name="item.value" />
    </TabsContent>
  </TabsRoot>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
