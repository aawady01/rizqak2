<script setup lang="ts">
import { AlertTriangle } from "lucide-vue-next";
</script>

<template>
  <div class="bg-warning-bg border border-warning-light rounded-none p-content">
    <div class="flex items-start gap-content">
      <AlertTriangle class="size-6 text-warning shrink-0" :stroke-width="2" />
      <div>
        <h4 class="text-ds-body-r font-bold text-warning mb-element">تنبيه هام</h4>
        <p class="text-ds-body-r text-warning leading-relaxed">
          لا تقم بدفع أي مبالغ مالية قبل توقيع العقد الرسمي وتوثيقه. تأكد من صحة التراخيص قبل البدء في الإجراءات.
        </p>
      </div>
    </div>
  </div>
</template>
