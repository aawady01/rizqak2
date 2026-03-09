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
    class="bg-shell-bg border-t border-white/10 mt-16 py-12 scroll-mt-24"
  >
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
        <!-- Brand -->
        <div class="col-span-1">
          <div class="flex items-center gap-3 mb-6 group cursor-default">
            <div
              class="w-10 h-10 bg-white/10 text-white flex items-center justify-center border border-white/20 rounded-none transition-transform group-hover:scale-105"
            >
              <BaseTypography variant="body-l" class="font-bold text-white"
                >م</BaseTypography
              >
            </div>
            <BaseTypography variant="h3" class="text-white font-bold"
              >المعالي</BaseTypography
            >
          </div>
          <BaseTypography
            variant="body-r"
            class="text-white/80 leading-relaxed"
          >
            منصة توظيف رائدة تربط الكفاءات المصرية بفرص العمل المتميزة في دول
            الخليج والعالم العربي بمنتهى الاحترافية والشفافية.
          </BaseTypography>
        </div>

        <!-- Job Seekers -->
        <div>
          <BaseTypography
            variant="subtitle-l"
            class="font-bold text-white mb-6"
            >للباحثين عن عمل</BaseTypography
          >
          <ul class="space-y-3">
            <li v-for="link in footerJobSeekerLinks" :key="link.label">
              <NuxtLink
                :to="link.href"
                class="transition-colors hover:text-white"
              >
                <BaseTypography
                  variant="caption-l"
                  class="text-white/70 hover:text-white transition-colors"
                >
                  {{ link.label }}
                </BaseTypography>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Employers -->
        <div>
          <BaseTypography
            variant="subtitle-l"
            class="font-bold text-white mb-6"
            >لأصحاب العمل</BaseTypography
          >
          <ul class="space-y-3">
            <li v-for="link in footerEmployerLinks" :key="link.label">
              <NuxtLink :to="link.href" class="group">
                <BaseTypography
                  variant="caption-l"
                  class="text-white/70 group-hover:text-white transition-colors"
                >
                  {{ link.label }}
                </BaseTypography>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <BaseTypography
            variant="subtitle-l"
            class="font-bold text-white mb-6"
            >تواصل معنا</BaseTypography
          >
          <div class="flex gap-3">
            <a
              v-for="icon in 3"
              :key="icon"
              href="#"
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
      <div class="border-t border-white/10 mt-16 pt-8 text-center">
        <BaseTypography variant="caption-s" class="text-white/60">
          © 2026 جميع الحقوق محفوظة لمنصة المعالي للتوظيف — صمم بعناية فائقة
        </BaseTypography>
      </div>
    </div>
  </footer>
</template>
