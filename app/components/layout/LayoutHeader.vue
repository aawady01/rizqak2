<script setup lang="ts">
import { BellDot, Moon, Sun, SquareUser, LayoutGrid, X } from "lucide-vue-next";
import { navLinks } from "~/shared/utils/mockData";
const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");

const toggleTheme = async () => {
  const isDarkNow = colorMode.value === "dark";
  const newTheme = isDarkNow ? "light" : "dark";

  // Fallback for browsers that don't support View Transitions
  if (!(document as any).startViewTransition) {
    document.documentElement.classList.add("theme-transitioning");
    colorMode.preference = newTheme;
    await nextTick();
    setTimeout(() => {
      document.documentElement.classList.remove("theme-transitioning");
    }, 0);
    return;
  }

  document.documentElement.classList.add("theme-transitioning");
  const transition = (document as any).startViewTransition(() => {
    colorMode.preference = newTheme;
  });

  transition.finished.finally(() => {
    document.documentElement.classList.remove("theme-transitioning");
  });
};

const [mobileMenuOpen, toggleMobileMenu] = useToggle(false);
</script>

<template>
  <header
    class="bg-primary sticky top-0 z-sticky w-full border-b border-white/10 shadow-sm transition-all duration-300"
  >
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <div class="flex justify-between items-center h-14">
        <NuxtLink to="/" class="flex items-center gap-element group">
          <div
            class="w-10 h-10 bg-white/10 flex items-center justify-center border border-white/20 rounded-none transition-all group-hover:bg-white/20"
          >
            <BaseTypography variant="body-l" class="text-white font-bold">
              {{ $t('header.brandInitial') }}
            </BaseTypography>
          </div>
          <BaseTypography
            variant="h3"
            class="text-white hidden sm:block tracking-tight"
          >
            {{ $t('header.brandName') }}
          </BaseTypography>
        </NuxtLink>

        <div class="hidden md:flex items-center gap-1 h-14">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.label"
            :to="link.href"
            class="hover:text-white hover:bg-white/5 px-5 h-full flex items-center transition-all duration-200 relative group"
            active-class="text-white bg-white/10"
          >
            <BaseTypography
              variant="body-r"
              class="font-semibold text-white/90 group-hover:text-white"
            >
              {{ $t(link.label) }}
            </BaseTypography>
          </NuxtLink>
        </div>

        <div class="flex items-center gap-compact">
          <button
            class="p-2.5 rounded-none hover:bg-white/10 text-white/90 hover:text-white transition-all active:scale-95"
            :title="$t('header.notifications')"
          >
            <BellDot class="size-5" :stroke-width="2" />
          </button>

          <div class="w-px h-6 bg-white/20 mx-1" />

          <button
            class="active-scale-subtle flex items-center gap-compact text-white/90 hover:text-white hover:bg-white/10 px-content py-compact rounded-none transition-all"
          >
            <SquareUser class="size-5" :stroke-width="2" />
            <BaseTypography
              variant="caption-r"
              class="font-bold hidden sm:block"
            >
              {{ $t('header.login') }}
            </BaseTypography>
          </button>

          <button
            class="p-2.5 rounded-none hover:bg-white/10 text-white/90 hover:text-white transition-all active:scale-95"
            @click="toggleTheme"
          >
            <Sun v-if="isDark" class="size-5" :stroke-width="2" />
            <Moon v-else class="size-5" :stroke-width="2" />
          </button>

          <button
            class="md:hidden p-2.5 rounded-none hover:bg-white/10 text-white/90 hover:text-white transition-all"
            @click="toggleMobileMenu()"
          >
            <X v-if="mobileMenuOpen" class="size-5" :stroke-width="2" />
            <LayoutGrid v-else class="size-5" :stroke-width="2" />
          </button>
        </div>
      </div>

      <div
        v-show="mobileMenuOpen"
        class="md:hidden py-content border-t border-white/10"
      >
        <div class="flex flex-col gap-1">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.label"
            :to="link.href"
            class="text-white/80 hover:text-white px-content py-element hover:bg-white/10 transition-colors"
            active-class="text-white bg-white/10"
            @click="mobileMenuOpen = false"
          >
            <BaseTypography variant="body-r" class="font-semibold">
              {{ $t(link.label) }}
            </BaseTypography>
          </NuxtLink>

        </div>
      </div>
    </div>
  </header>
</template>
