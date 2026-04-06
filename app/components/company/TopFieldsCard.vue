<script setup lang="ts">
import { Briefcase, Building2, HeartPulse, Megaphone, Truck, type Component } from "lucide-vue-next";
import type { FieldData } from "~/types/company";

const props = defineProps<{
  fields: FieldData[]
}>()

const iconMap: Record<string, Component> = {
  'تشييد': Building2,
  'بناء': Building2,
  'انشاء': Building2,
  'صحة': HeartPulse,
  'رعاية': HeartPulse,
  'تمريض': HeartPulse,
  'طبي': HeartPulse,
  'مبيعات': Megaphone,
  'تسويق': Megaphone,
  'بيع': Megaphone,
  'سائق': Truck,
  'نقل': Truck,
  'قيادة': Truck,
}

function getIconForField(name: string): Component {
  const lower = name.toLowerCase()
  for (const [keyword, icon] of Object.entries(iconMap)) {
    if (lower.includes(keyword)) {
      return icon
    }
  }
  return Briefcase
}
</script>

<template>
  <div>
    <div class="flex items-center gap-2 mb-element px-compact">
      <Briefcase class="size-5 text-primary" :stroke-width="2" />
      <h4 class="text-ds-label-l font-bold text-foreground">أكثر المجالات طلباً</h4>
    </div>

    <div class="surface-panel rounded-none p-content">
      <div class="space-y-section">
        <div v-for="field in fields" :key="field.name" class="flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 min-w-0">
              <component :is="getIconForField(field.name)" class="size-4 text-foreground-muted shrink-0" :stroke-width="2" />
              <span class="text-ds-label-s font-semibold text-foreground-subtle truncate">{{ field.name }}</span>
            </div>
            <span class="text-ds-body-r font-bold text-foreground shrink-0 me-content">{{ field.jobs }} وظيفة</span>
          </div>
          <div class="w-full h-1.5 bg-surface-alt rounded-full overflow-hidden">
            <div class="h-full bg-primary rounded-full" :style="{ width: field.percentage + '%' }" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
