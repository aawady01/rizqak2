<script setup lang="ts">
import { cva, type VariantProps } from "class-variance-authority";
import { Info, CheckCircle, AlertTriangle, XCircle, X } from "lucide-vue-next";
import { cn } from "~/shared/utils/tailwind";

const alertVariants = cva(
  "flex items-start gap-3 p-4 border rounded-none",
  {
    variants: {
      variant: {
        info: "bg-info-bg border-info/20 text-info",
        success: "bg-success-bg border-success/20 text-success",
        warning: "bg-warning-bg border-warning/20 text-warning",
        error: "bg-error-bg border-error/20 text-error",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
);

type AlertVariants = VariantProps<typeof alertVariants>;

const iconMap = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
};

interface Props {
  variant?: AlertVariants["variant"];
  title?: string;
  dismissible?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "info",
  dismissible: false,
});

const emit = defineEmits<{
  dismiss: [];
}>();

const visible = ref(true);

const iconComponent = computed(() => iconMap[props.variant || "info"]);
</script>

<template>
  <div
    v-if="visible"
    role="alert"
    :class="cn(alertVariants({ variant }), props.class)"
  >
    <component
      :is="iconComponent"
      class="size-5 flex-shrink-0 mt-0.5"
      :stroke-width="2"
      aria-hidden="true"
    />
    <div class="flex-1 min-w-0">
      <p v-if="title" class="text-ds-body-r font-semibold mb-1">{{ title }}</p>
      <div class="text-ds-body-r opacity-90">
        <slot />
      </div>
    </div>
    <button
      v-if="dismissible"
      class="flex-shrink-0 p-1 opacity-70 hover:opacity-100 transition-opacity"
      aria-label="إغلاق"
      @click="visible = false; emit('dismiss')"
    >
      <X class="size-4" :stroke-width="2" />
    </button>
  </div>
</template>
