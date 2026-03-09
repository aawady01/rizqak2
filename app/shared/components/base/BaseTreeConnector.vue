<script setup lang="ts">
import { computed } from "vue";

interface Props {
  type: "stem" | "branch" | "bridge" | "root-branch";
  isLast?: boolean;
  active?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isLast: false,
  active: false,
});

const lineBaseClass = computed(() => [
  "absolute pointer-events-none transition-all duration-300 ease-out",
  props.active ? "opacity-100" : "opacity-50",
]);
</script>

<template>
  <!-- Stem: deprecated - الخط يُرسم مباشرة في المكون الأب -->
  <template v-if="type === 'stem'">
    <!-- لا شيء -->
  </template>

  <!-- Bridge: deprecated - الخط يُرسم مباشرة في المكون الأب -->
  <template v-else-if="type === 'bridge'">
    <!-- لا شيء -->
  </template>

  <!-- Branch: deprecated - الخط يُرسم مباشرة في المكون الأب -->
  <template v-else-if="type === 'branch'">
    <!-- لا شيء -->
  </template>

  <!-- Root Branch: خط الفرع الأفقي للفئة الرئيسية فقط -->
  <template v-else>
    <!-- الخط الأفقي من اليمين للفئة -->
    <div
      :class="lineBaseClass"
      class="h-[2px] bg-primary z-20"
      style="
        inset-inline-end: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 16px;
      "
    />
  </template>
</template>
