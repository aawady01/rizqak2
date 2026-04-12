<script setup lang="ts">
import { BadgeCheck, UserCheck, XCircle } from "lucide-vue-next";
import type { AccountData } from "~/types/company";

defineProps<{
  account: AccountData
}>()
</script>

<template>
  <div>
    <div class="section-heading">
      <div class="section-heading__title">
      <UserCheck class="size-5 text-primary" :stroke-width="2" />
      <h3 class="text-ds-h4 font-bold text-foreground">بيانات الحساب</h3>
      </div>
    </div>
    <div class="surface-panel rounded-none p-content h-full flex flex-col justify-center">
      <div class="space-y-element">
        <div class="flex justify-between items-center py-compact">
          <span class="text-foreground-muted font-normal text-ds-body-r">تاريخ الانضمام</span>
          <span class="text-ds-body-m font-bold text-foreground">{{ account.joined }}</span>
        </div>
        <div class="flex justify-between items-center py-compact">
          <span class="text-foreground-muted font-normal text-ds-body-r">جهة الإدارة</span>
          <span class="text-ds-body-m font-bold text-foreground">{{ account.managedBy }}</span>
        </div>
        <div class="flex justify-between items-center py-compact">
          <span class="text-foreground-muted font-normal text-ds-body-r">حالة التوثيق</span>
          <span v-if="account.verified" class="flex items-center gap-element text-primary font-bold text-ds-body-m">
            <BadgeCheck class="size-4 text-primary fill-primary/20" :stroke-width="2" />
            موثق
          </span>
          <span v-else class="flex items-center gap-element text-error font-bold text-ds-body-m">
            <XCircle class="size-4" :stroke-width="2" />
            غير موثق
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
