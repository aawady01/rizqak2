<script setup lang="ts">
import { computed } from "vue";
import { TabsRoot, TabsList, TabsTrigger, TabsContent } from "radix-vue";
import { cn } from "~/shared/utils/tailwind";

const modelValue = defineModel<string>();

interface TabItem {
  value: string;
  label: string;
}

interface Props {
  items: TabItem[];
  rootClass?: any;
  listClass?: any;
  triggerClass?: any;
}

const props = defineProps<Props>();

const finalRootClass = computed(() =>
  cn("flex flex-col gap-2", props.rootClass),
);
const finalListClass = computed(() =>
  cn(
    "bg-neutral-100 text-neutral-500 inline-flex h-10 w-fit items-center justify-center rounded-none p-1 flex",
    props.listClass,
  ),
);
const finalTriggerClass = computed(() =>
  cn(
    "data-[state=active]:bg-ds-surface data-[state=active]:text-primary data-[state=active]:border-ds-border-strong focus-visible:ring-ds-focus text-neutral-600 inline-flex h-full flex-1 items-center justify-center gap-2 rounded-none border border-transparent px-4 py-1.5 text-ds-body-r font-semibold whitespace-nowrap transition-all outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    props.triggerClass,
  ),
);
</script>

<template>
  <TabsRoot
    data-slot="tabs"
    :class="finalRootClass"
    v-model="modelValue"
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
