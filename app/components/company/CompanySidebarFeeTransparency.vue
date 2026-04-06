<script setup lang="ts">
import { ShieldCheck, FileCheck, EyeOff, type Component } from "lucide-vue-next";
import type { FeeTransparencyItem } from "~/types/company";

const feeItems: FeeTransparencyItem[] = [
  { icon: ShieldCheck as Component, label: 'رسوم إدارية واضحة' },
  { icon: FileCheck as Component, label: 'عقد موثق ورسمي' },
  { icon: EyeOff as Component, label: 'لا توجد رسوم خفية' },
];
</script>

<template>
  <div>
    <div class="flex items-center gap-element mb-element">
      <ShieldCheck class="size-5 text-primary" :stroke-width="2" />
      <h3 class="text-ds-h5 font-bold text-foreground">شفافية الرسوم</h3>
    </div>
    <div class="surface-panel p-content">
      <div class="space-y-section">
        <div
          v-for="item in feeItems"
          :key="item.label"
          class="flex items-center gap-content p-compact bg-primary/5 rounded-none border border-primary/10"
        >
          <div class="w-4 h-4 rounded-none flex items-center justify-center shrink-0 border border-primary bg-primary/10">
            <component :is="item.icon" class="size-3 text-primary" :stroke-width="2.5" />
          </div>
          <span class="text-ds-label-s font-bold text-foreground">{{ item.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
