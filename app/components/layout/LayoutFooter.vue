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
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
        <!-- Brand -->
        <div class="col-span-1">
          <div class="flex items-center gap-element mb-content group cursor-default">
            <div
              class="w-10 h-10 bg-white/10 text-white flex items-center justify-center border border-white/20 rounded-none transition-transform group-hover:scale-105"
            >
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
        <div>
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
        <div>
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
        <div>
          <BaseTypography variant="subtitle-l" class="font-bold text-white mb-content"
            >{{ $t('footer.contactTitle') }}</BaseTypography
          >
          <div class="flex gap-element">
            <a
              v-for="icon in 3"
              :key="icon"
              :href="icon === 1 ? 'mailto:info@rizqak.com' : undefined"
              role="button"
              :aria-label="icon === 1 ? $t('footer.icons.email') : icon === 2 ? $t('footer.icons.jobs') : $t('footer.icons.external')"
              class="w-10 h-10 border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all rounded-none active:scale-95"
            >
              <Mail v-if="icon === 1" class="size-5" />
              <BriefcaseBusiness v-if="icon === 2" class="size-5" />
              <SquareArrowOutUpRight v-if="icon === 3" class="size-5" />
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
