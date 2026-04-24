<script setup lang="ts">
interface Props {
  title: string
  description?: string
  empty?: boolean
  tableClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  description: '',
  empty: false,
  tableClass: '',
})
</script>

<template>
  <BaseCard
    class="border-border bg-surface"
    header-class="border-b border-border"
    content-class="p-0"
    :title="title"
    :description="description"
  >
    <template v-if="$slots.action" #action>
      <slot name="action" />
    </template>

    <div v-if="$slots.toolbar" class="border-b border-border px-content py-content">
      <slot name="toolbar" />
    </div>

    <div v-if="empty">
      <slot name="empty" />
    </div>

    <BaseTable v-else :class="props.tableClass">
      <BaseTableHeader>
        <slot name="head" />
      </BaseTableHeader>
      <BaseTableBody>
        <slot name="body" />
      </BaseTableBody>
    </BaseTable>

    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </BaseCard>
</template>
