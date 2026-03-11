<template>
  <NuxtPwaAssets />
  <NuxtLayout>
    <NuxtPage />
    <Toaster rich-colors position="bottom-center" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { Toaster } from 'vue-sonner'

useHead({
  htmlAttrs: {
    lang: 'ar',
    dir: 'rtl',
  },
})
</script>
