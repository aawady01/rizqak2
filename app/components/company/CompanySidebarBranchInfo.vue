<script setup lang="ts">
import { MapPin, Clock, Map } from "lucide-vue-next";

defineProps<{
  address: string
  hours: string
  mapImage: string
}>()
</script>

<template>
  <div>
    <div class="section-heading">
      <div class="section-heading__title">
      <MapPin class="size-5 text-primary" :stroke-width="2" />
      <h3 class="text-ds-h5 font-bold text-foreground">معلومات الفرع</h3>
      </div>
    </div>
    <div class="surface-panel p-content">
      <div class="space-y-element">
        <div class="flex items-start gap-content">
          <MapPin class="size-5 text-primary mt-0.5 shrink-0" :stroke-width="2" />
          <p class="text-ds-body-r text-foreground-subtle leading-snug">{{ address }}</p>
        </div>
        <div class="flex items-center gap-content">
          <Clock class="size-5 text-primary shrink-0" :stroke-width="2" />
          <p class="text-ds-body-r text-foreground-subtle">{{ hours }}</p>
        </div>
        <div class="relative w-full h-32 bg-surface-alt rounded-none overflow-hidden border border-border group cursor-pointer mt-element">
          <img alt="Map Preview" class="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" :src="mapImage">
          <div class="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-black/10 transition-colors">
            <button class="bg-surface text-primary text-ds-label-r font-bold px-content py-element rounded-none shadow-sm flex items-center gap-element hover:bg-surface-alt">
              <Map class="size-4" :stroke-width="2" />
              افتح في الخرائط
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
