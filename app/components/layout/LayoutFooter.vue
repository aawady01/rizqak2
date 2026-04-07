<script setup lang="ts">
import {
  Mail,
  BriefcaseBusiness,
  SquareArrowOutUpRight,
} from "lucide-vue-next";
import {
  footerJobSeekerLinks,
  footerEmployerLinks,
} from "~/shared/utils/mockData";

</script>

<template>
  <footer
    id="contact"
    class="bg-primary border-t border-white/10 mt-section py-section scroll-mt-24"
  >
    <div class="shell-container">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-12">
        <!-- Brand -->
        <div class="col-span-2 md:col-span-1">
          <div class="flex items-center gap-element mb-content group cursor-default">
            <div class="shell-brand-mark group-hover:scale-105">
              <BaseTypography variant="body-l" class="font-bold text-white"
                >{{ $t('footer.brandInitial') }}</BaseTypography
              >
            </div>
            <BaseTypography variant="h3" class="text-white font-bold"
              >{{ $t('footer.brandName') }}</BaseTypography
            >
          </div>
          <BaseTypography
            variant="body-r"
            class="text-white/80 leading-relaxed"
          >{{ $t('footer.description') }}</BaseTypography>
        </div>

        <!-- Job Seekers -->
        <div class="col-span-1">
          <BaseTypography variant="subtitle-l" class="font-bold text-white mb-content"
            >{{ $t('footer.jobSeekersTitle') }}</BaseTypography
          >
          <ul class="space-y-element">
            <li v-for="link in footerJobSeekerLinks" :key="link.label">
              <NuxtLink
                :to="link.href"
                class="transition-colors hover:text-white"
              >
                <BaseTypography
                  variant="caption-l"
                  class="text-white/70 hover:text-white transition-colors"
                >
                  {{ $t(link.label) }}
                </BaseTypography>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Employers -->
        <div class="col-span-1">
          <BaseTypography variant="subtitle-l" class="font-bold text-white mb-content"
            >{{ $t('footer.employersTitle') }}</BaseTypography
          >
          <ul class="space-y-element">
            <li v-for="link in footerEmployerLinks" :key="link.label">
              <NuxtLink :to="link.href" class="group">
                <BaseTypography
                  variant="caption-l"
                  class="text-white/70 group-hover:text-white transition-colors"
                >
                  {{ $t(link.label) }}
                </BaseTypography>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div class="col-span-2 md:col-span-1">
          <BaseTypography variant="subtitle-l" class="font-bold text-white mb-content"
            >{{ $t('footer.contactTitle') }}</BaseTypography
          >
          <div class="flex gap-element">
            <a
              :href="'mailto:info@rizqak.com'"
              :aria-label="$t('footer.icons.email')"
              class="shell-outline-button active-scale-subtle"
            >
              <Mail class="size-5" />
            </a>
            <a
              :href="'#jobs'"
              :aria-label="$t('footer.icons.jobs')"
              class="shell-outline-button active-scale-subtle"
            >
              <BriefcaseBusiness class="size-5" />
            </a>
            <a
              :href="'#'"
              :aria-label="$t('footer.icons.external')"
              class="shell-outline-button active-scale-subtle"
            >
              <SquareArrowOutUpRight class="size-5" />
            </a>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="border-t border-white/10 mt-section pt-section text-center">
        <BaseTypography variant="caption-s" class="text-white/60">{{ $t('footer.copyright') }}</BaseTypography>
      </div>
    </div>
  </footer>
</template>
