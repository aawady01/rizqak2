<script setup lang="ts">
import { Link2, Globe, Facebook, Linkedin, MessageCircle, Phone } from "lucide-vue-next";
import type { CompanyLink } from "~/types/company";

defineProps<{
  links: CompanyLink
}>()
</script>

<template>
  <div>
    <div class="flex items-center gap-element mb-element">
      <Link2 class="size-5 text-primary" :stroke-width="2" />
      <h3 class="text-ds-h5 font-bold text-foreground">الروابط الرسمية</h3>
    </div>
    <div class="surface-panel p-content">
      <div class="space-y-section">
        <a
          :href="links.website"
          class="flex items-center justify-center gap-element h-9 px-content w-full rounded-none border border-border bg-surface hover:bg-surface-alt text-primary text-ds-label-r font-medium transition-colors"
        >
          <Globe class="size-4" :stroke-width="2" />
          الموقع الإلكتروني
        </a>
        <div class="grid grid-cols-2 gap-element">
          <a
            :href="links.facebook"
            class="flex items-center justify-center gap-element h-9 px-content rounded-none bg-surface-alt text-foreground hover:bg-neutral-200 text-ds-label-r font-medium transition-colors"
          >
            <Facebook class="size-4" :stroke-width="2" />
            فيسبوك
          </a>
          <a
            :href="links.linkedin"
            class="flex items-center justify-center gap-element h-9 px-content rounded-none bg-surface-alt text-foreground hover:bg-neutral-200 text-ds-label-r font-medium transition-colors"
          >
            <Linkedin class="size-4" :stroke-width="2" />
            لينكد إن
          </a>
        </div>
        <div class="grid grid-cols-2 gap-element">
          <a
            :href="links.whatsapp"
            class="flex items-center justify-center gap-element h-9 px-content rounded-none bg-surface-alt text-foreground hover:bg-neutral-200 text-ds-label-r font-medium transition-colors"
          >
            <MessageCircle class="size-4" :stroke-width="2" />
            واتساب
          </a>
          <a
            :href="links.phone"
            class="flex items-center justify-center gap-element h-9 px-content rounded-none bg-surface-alt text-foreground hover:bg-neutral-200 text-ds-label-r font-medium transition-colors"
          >
            <Phone class="size-4" :stroke-width="2" />
            اتصال
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
