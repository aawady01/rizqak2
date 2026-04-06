<script setup lang="ts">
import { BellDot, Moon, Sun, SquareUser, LayoutGrid, X } from "lucide-vue-next";
import { navLinks } from "~/shared/utils/mockData";
const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => { finished: Promise<void> }
}

const toggleTheme = async () => {
  const isDarkNow = colorMode.value === "dark";
  const newTheme = isDarkNow ? "light" : "dark";
  const doc = document as ViewTransitionDocument;

  if (!doc.startViewTransition) {
    document.documentElement.classList.add("theme-transitioning");
    colorMode.preference = newTheme;
    await nextTick();
    setTimeout(() => {
      document.documentElement.classList.remove("theme-transitioning");
    }, 0);
    return;
  }

  document.documentElement.classList.add("theme-transitioning");
  const transition = doc.startViewTransition(() => {
    colorMode.preference = newTheme;
  });

  transition.finished.finally(() => {
    document.documentElement.classList.remove("theme-transitioning");
  });
};

const [mobileMenuOpen, toggleMobileMenu] = useToggle(false);
const { isHidden } = useScrollHeader();
</script>

<template>
  <header
    :class="[
      'bg-primary sticky top-0 z-sticky w-full border-b border-white/10 shadow-sm transition-transform duration-300 ease-in-out',
      isHidden ? '-translate-y-full' : 'translate-y-0'
    ]"
  >
    <div class="shell-container">
      <div class="shell-header-row flex justify-between items-center">
        <NuxtLink to="/" class="flex items-center gap-element group">
          <div class="shell-brand-mark">
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

        <div class="hidden md:flex items-center gap-1 shell-header-row">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.label"
            :to="link.href"
            class="shell-nav-link group"
            active-class="shell-nav-link--active"
          >
            <BaseTypography variant="body-r" class="font-semibold text-current">
              {{ $t(link.label) }}
            </BaseTypography>
          </NuxtLink>
        </div>

        <div class="flex items-center gap-compact">
          <button
            class="shell-icon-button active-scale-subtle"
            :aria-label="$t('header.notifications')"
          >
            <BellDot class="size-5" :stroke-width="2" />
          </button>

          <div class="shell-divider-vertical mx-1" />

          <button
            class="shell-action-button active-scale-subtle"
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
            class="shell-icon-button active-scale-subtle"
            :aria-label="isDark ? $t('header.theme.light') : $t('header.theme.dark')"
            @click="toggleTheme"
          >
            <Sun v-if="isDark" class="size-5" :stroke-width="2" />
            <Moon v-else class="size-5" :stroke-width="2" />
          </button>

          <button
            class="md:!hidden shell-icon-button"
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
            class="shell-mobile-link"
            active-class="shell-mobile-link--active"
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
