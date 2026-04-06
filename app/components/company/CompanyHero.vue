<script setup lang="ts">
import { ref } from 'vue';
import {
  MapPin,
  Clock,
  Users,
  UserMinus,
  Share2,
  Star,
  ShieldCheck,
  UsersRound,
  UserPlus
} from "lucide-vue-next";
import type { CompanyTab, TabName } from "~/types/company";

const props = defineProps<{
  name: string
  logo: string
  coverImage?: string
  rating: number
  licenseNumber: number
  description: string
  location: string
  hours: string
  placedCount: string
  followers: string
  tabs?: CompanyTab[]
  activeTab?: TabName
}>()

const emit = defineEmits<{
  (e: 'tab-click', tab: TabName): void
}>()

const isFollowing = ref(false)

const handleTabClick = (tab: TabName) => {
  emit('tab-click', tab)
}
</script>

<template>
  <div class="grid grid-cols-1 gap-section lg:grid-cols-company-sidebar xl:grid-cols-sidebar items-stretch mb-10 md:mb-16">
    <!-- كارت الوصف والإجراءات الملاصقة (يمين) -->
    <div class="order-1 surface-panel rounded-none p-0 overflow-hidden flex flex-col h-full gap-0 z-20">
      
      <!-- نص الوصف -->
      <div class="p-content flex-1 z-10 bg-surface flex flex-col">
        <BaseDescription tag="div" class="wrap-break-word md:text-base leading-relaxed">
          <p>{{ description }}</p>
        </BaseDescription>

        <!-- عدد المتابعين (يظهر فوق زر المتابعة تماماً) -->
        <div class="mt-auto pt-content flex items-center justify-center gap-element text-xs md:text-sm text-foreground-subtle border-t-0 border-border">
          <UsersRound class="size-4 text-primary" :stroke-width="2" />
          <span class="font-bold text-foreground">{{ followers }}</span> متابع
        </div>
      </div>

      <!-- شريط الإجراءات (ملاصق للكارت من الأسفل) -->
      <div class="flex items-stretch border-t border-border bg-surface shrink-0 h-11 md:h-12 w-full mt-auto">
        <!-- التقييم -->
        <div class="w-12 md:w-16 flex flex-col items-center justify-center bg-surface-alt/30 border-e border-border text-foreground hover:bg-surface-alt transition-colors cursor-help shrink-0" role="img" aria-label="تقييم الشركة">
          <Star class="size-3.5 md:size-4 text-gold-star fill-gold-star mb-1" :stroke-width="2" />
          <span class="text-[10px] md:text-[11px] font-bold leading-none dir-ltr">{{ rating }}</span>
        </div>

        <!-- المتابعة -->
        <button
          type="button"
          class="flex-1 text-white text-xs md:text-sm font-bold flex items-center justify-center gap-1.5 transition-all shadow-none outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          :class="isFollowing ? 'bg-neutral-500 hover:bg-neutral-600' : 'bg-primary hover:bg-primary-dark'"
          :aria-label="isFollowing ? 'إلغاء المتابعة' : 'متابعة'"
          :aria-pressed="isFollowing"
          @click="isFollowing = !isFollowing"
        >
          <UserMinus v-if="isFollowing" class="size-4 md:size-4.5" :stroke-width="2" />
          <UserPlus v-else class="size-4 md:size-4.5" :stroke-width="2" />
          {{ isFollowing ? 'متابع' : 'متابعة' }}
        </button>

        <!-- المشاركة -->
        <button type="button" class="w-12 md:w-14 shrink-0 bg-transparent text-primary hover:bg-surface-alt flex items-center justify-center transition-all border-s border-border outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface" :aria-label="'مشاركة الشركة'" title="مشاركة الشركة">
          <Share2 class="size-4 md:size-4.5" :stroke-width="2" />
        </button>
      </div>
    </div>

    <!-- مساحة الكارت الأيسر التي تتضمن الغلاف ومساحة البروز للحفاظ على المحاذاة مع الكارت الأيمن -->
    <div class="order-2 flex flex-col h-full z-10">
      
      <!-- الغلاف الفعلي بحدوده -->
      <div class="relative flex-1 rounded-none p-0 flex items-end border border-border bg-surface overflow-visible min-h-[180px] md:min-h-[200px]">
        
        <!-- صورة الغلاف -->
      <img 
        :src="coverImage || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200'" 
        alt="غلاف الشركة" 
        class="absolute inset-0 w-full h-full object-cover rounded-none" 
      />
      
      <!-- تدرج لوني لضمان وضوح النص -->
      <div class="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-transparent pointer-events-none rounded-none"></div>

      <!-- الصورة الشخصية (مربع متداخل مع الحافة السفلية) -->
      <div class="absolute -bottom-10 md:-bottom-14 inset-s-4 md:inset-s-6 w-24 h-24 md:w-32 md:h-32 rounded-none border-[3px] md:border-4 border-background bg-surface shadow-md overflow-hidden z-10">
        <img
          :alt="name"
          class="w-full h-full object-contain p-1.5"
          :src="logo"
          loading="lazy"
        >
      </div>

      <!-- تفاصيل الشركة (فوق الغلاف) -->
      <div class="relative w-full p-content flex z-10">
        
        <!-- مساحة لدفع المحتوى لليسار بعيداً عن الصورة الشخصية (مدروسة رياضياً للمحاذاة التامة) -->
        <div class="w-full ms-[112px] md:ms-[152px] space-y-element">
          
          <div class="flex flex-wrap items-center gap-content">
            <h1 class="mb-0 text-lg md:text-2xl font-bold leading-tight text-white drop-shadow-md">{{ name }}</h1>
            <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-none text-[10px] md:text-xs font-bold bg-white/10 text-white backdrop-blur-md border border-white/20 shadow-sm">
              <ShieldCheck class="size-3 md:size-3.5" :stroke-width="2" />
              مرخصة ({{ licenseNumber }})
            </span>
          </div>

          <div class="flex items-center gap-x-4 gap-y-2 md:gap-x-6 text-xs md:text-sm text-white/80 flex-wrap">
            <div class="flex items-center gap-1.5 drop-shadow-sm">
              <MapPin class="size-4 md:size-4.5 text-white/60" :stroke-width="2" />
              {{ location }}
            </div>
            <div class="flex items-center gap-1.5 drop-shadow-sm">
              <Clock class="size-4 md:size-4.5 text-white/60" :stroke-width="2" />
              {{ hours }}
            </div>
            <div class="flex items-center gap-1.5 drop-shadow-sm">
              <Users class="size-4 md:size-4.5 text-white/60" :stroke-width="2" />
              {{ placedCount }} تم توظيفهم
            </div>
          </div>
        </div>

      </div>

      <!-- قائمة التبويبات (على الجانب الأيسر أسفل صورة الغلاف) -->
      <div v-if="tabs && tabs.length" class="absolute -bottom-10 md:-bottom-14 inset-e-4 md:inset-e-6 flex items-end z-20">
        <div role="tablist" aria-label="أقسام الشركة" class="bg-surface/90 backdrop-blur-md border border-border flex items-center shadow-sm rounded-none p-1 max-w-full overflow-x-auto hide-scrollbar">
          <button
            v-for="tab in tabs"
            :key="tab.label"
            role="tab"
            type="button"
            :aria-selected="tab.label === props.activeTab"
            :tabindex="tab.label === props.activeTab ? 0 : -1"
            class="px-4 md:px-6 py-2 text-xs md:text-sm font-bold transition-all duration-300 rounded-none whitespace-nowrap flex items-center"
            :class="tab.label === props.activeTab ? 'bg-primary text-white shadow-inner' : 'text-foreground-subtle hover:text-foreground hover:bg-surface-alt'"
            @click="handleTabClick(tab.label)"
          >
             {{ tab.label }} 
             <span v-if="tab.count" class="opacity-80 text-[10px] md:text-xs ms-1.5 dir-ltr inline-block">({{ tab.count }})</span>
          </button>
        </div>
      </div>
    </div> <!-- إغلاق الغلاف الفعلي بحدوده -->

      <!-- هذه المساحة السفلية ضرورية لأن الصورة الشخصية والتبويبات تبرز للأسفل بمقدار معين.
           وجود هذه المساحة داخل جريد الكارت الأيسر يُجبر الكارت الأيمن بأكمله
           على التمدد والوصول لنفس الحافة السفلية الدقيقة للصورة والتبويبات. -->
      <div class="h-10 md:h-14 w-full shrink-0 pointer-events-none"></div>

    </div>
  </div>
</template>
