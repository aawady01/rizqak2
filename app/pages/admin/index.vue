<script setup lang="ts">

definePageMeta({
  layout: 'admin',
})

const stats = ref([
  {
    label: 'إجمالي الوظائف',
    value: '1,234',
    change: '+12%',
    trend: 'up',
    icon: 'work',
    color: 'text-blue-600',
    bg: 'bg-blue-100',
  },
  {
    label: 'الشركات النشطة',
    value: '456',
    change: '+5%',
    trend: 'up',
    icon: 'business',
    color: 'text-emerald-600',
    bg: 'bg-emerald-100',
  },
  {
    label: 'طلبات التوظيف',
    value: '8,901',
    change: '-2%',
    trend: 'down',
    icon: 'description',
    color: 'text-amber-600',
    bg: 'bg-amber-100',
  },
  {
    label: 'مستخدمين جدد',
    value: '342',
    change: '+18%',
    trend: 'up',
    icon: 'group',
    color: 'text-purple-600',
    bg: 'bg-purple-100',
  },
])

const recentActivity = ref([
  {
    id: 1,
    title: 'تم إضافة شركة جديدة',
    description: 'تم تسجيل شركة "تقنية المعلومات المتقدمة" بنجاح',
    time: 'منذ ساعتين',
    icon: 'domain_add',
    type: 'success',
  },
  {
    id: 2,
    title: 'وظيفة جديدة بانتظار المراجعة',
    description: 'تم نشر وظيفة "مطور واجهات أمامية" وتحتاج لمراجعة',
    time: 'منذ 3 ساعات',
    icon: 'pending_actions',
    type: 'warning',
  },
  {
    id: 3,
    title: 'تحديث بيانات دولة',
    description: 'تم تحديث معلومات "المملكة العربية السعودية"',
    time: 'منذ 5 ساعات',
    icon: 'update',
    type: 'info',
  },
  {
    id: 4,
    title: 'حظر حساب شركة',
    description: 'تم إيقاف حساب شركة "تسويق بلا حدود" لمخالفة الشروط',
    time: 'منذ يوم واحد',
    icon: 'block',
    type: 'error',
  },
])
</script>

<template>
  <div class="flex flex-col h-full bg-background overflow-hidden">
    <!-- TopAppBar -->
    <header class="flex items-center w-full px-6 h-[72px] border-b border-primary/20 bg-white text-right shrink-0">
      <div class="flex items-center gap-4">
        <h2 class="text-xl font-bold text-primary">نظرة عامة</h2>
      </div>
      <div class="flex items-center mr-auto gap-4">
        <!-- Date Range -->
        <div class="hidden md:flex items-center gap-2 px-4 py-2 border border-border bg-background text-sm">
          <span class="material-symbols-outlined text-sm text-foreground-muted">calendar_today</span>
          <span>اخر 30 يوم</span>
          <span class="material-symbols-outlined text-sm text-foreground-muted ml-2">expand_more</span>
        </div>
        <!-- Export Button -->
        <button class="px-6 py-2 border border-primary text-primary hover:bg-primary/5 transition-colors text-sm font-bold flex items-center gap-2">
          <span class="material-symbols-outlined text-sm">download</span>
          تصدير التقرير
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 overflow-auto p-6 text-right">
      <div class="max-w-7xl mx-auto space-y-6">
        
        <!-- Welcome Banner -->
        <div class="bg-primary text-white p-8 border border-primary/20 relative overflow-hidden">
          <div class="relative z-10">
            <h1 class="text-2xl font-bold mb-2">مرحباً بك في لوحة تحكم رزقك</h1>
            <p class="text-primary-100 max-w-2xl">
              يمكنك من هنا إدارة جميع الجوانب المتعلقة بالوظائف، الشركات، الدول، ومجالات العمل بكفاءة عالية.
            </p>
          </div>
          <div class="absolute -left-10 -top-10 text-white/10">
            <span class="material-symbols-outlined" style="font-size: 200px">dashboard</span>
          </div>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            v-for="stat in stats" 
            :key="stat.label"
            class="bg-white p-6 border border-border hover:border-primary/30 transition-colors"
          >
            <div class="flex justify-between items-start mb-4">
              <div :class="['w-12 h-12 flex items-center justify-center', stat.bg, stat.color]">
                <span class="material-symbols-outlined">{{ stat.icon }}</span>
              </div>
              <div 
                :class="[
                  'px-2 py-1 text-xs font-bold flex items-center gap-1',
                  stat.trend === 'up' ? 'text-emerald-600 bg-emerald-50' : 'text-amber-600 bg-amber-50'
                ]"
              >
                {{ stat.change }}
                <span class="material-symbols-outlined text-[14px]">
                  {{ stat.trend === 'up' ? 'trending_up' : 'trending_down' }}
                </span>
              </div>
            </div>
            <div>
              <h3 class="text-foreground-muted text-sm font-medium mb-1">{{ stat.label }}</h3>
              <p class="text-2xl font-bold text-foreground">{{ stat.value }}</p>
            </div>
          </div>
        </div>

        <!-- Two Columns Layout -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <!-- Charts Area (Placeholder) -->
          <div class="lg:col-span-2 bg-white border border-border p-6 flex flex-col min-h-[400px]">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-lg font-bold text-primary">إحصائيات الوظائف والشركات</h3>
              <button class="text-primary hover:underline text-sm font-bold">عرض التفاصيل</button>
            </div>
            <div class="flex-1 border border-dashed border-border bg-surface-alt flex items-center justify-center">
              <div class="text-center text-foreground-muted">
                <span class="material-symbols-outlined text-4xl mb-2">bar_chart</span>
                <p>رسم بياني للإحصائيات سيعرض هنا</p>
              </div>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="bg-white border border-border p-6">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-lg font-bold text-primary">أحدث النشاطات</h3>
            </div>
            
            <div class="space-y-6">
              <div 
                v-for="(activity, index) in recentActivity" 
                :key="activity.id"
                class="relative pl-4"
              >
                <!-- Line connector -->
                <div 
                  v-if="index !== recentActivity.length - 1" 
                  class="absolute right-[11px] top-8 bottom-[-24px] w-px bg-border"
                ></div>
                
                <div class="flex gap-4">
                  <!-- Icon indicator -->
                  <div class="relative z-10 w-6 h-6 flex items-center justify-center bg-white border border-border rounded-full shrink-0 mt-1">
                    <div 
                      :class="[
                        'w-2 h-2 rounded-full',
                        activity.type === 'success' ? 'bg-emerald-500' : 
                        activity.type === 'warning' ? 'bg-amber-500' : 
                        activity.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                      ]"
                    ></div>
                  </div>
                  
                  <!-- Content -->
                  <div>
                    <h4 class="text-sm font-bold text-foreground mb-1">{{ activity.title }}</h4>
                    <p class="text-xs text-foreground-muted mb-2">{{ activity.description }}</p>
                    <span class="text-xs text-foreground-subtle">{{ activity.time }}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <button class="w-full mt-6 py-2 border border-border text-foreground-muted hover:bg-surface-alt transition-colors text-sm font-bold">
              عرض كل النشاطات
            </button>
          </div>
          
        </div>

      </div>
    </main>
  </div>
</template>
