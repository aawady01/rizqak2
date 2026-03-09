import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  telemetry: false,

  future: {
    compatibilityVersion: 4,
  },
  srcDir: 'app',

  modules: [
    '@pinia/nuxt',
  ],

  imports: {
    dirs: [
      'composables',
      'core/api',
    ],
  },

  css: [
    '~/assets/css/main.css',
  ],

  vite: {
    resolve: {
    },
    plugins: [
      tailwindcss() as any,
    ],
    css: {
      devSourcemap: true,
    },
    optimizeDeps: {
      exclude: ['vue'],
    },
  },

  app: {
    head: {
      title: 'Rizqak - رزقك',
      htmlAttrs: {
        lang: 'ar',
        dir: 'rtl',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'منصة التوظيف العربية الأولى للعمل في الخليج' },
        { name: 'theme-color', content: '#1B6B4A' },
        { property: 'og:locale', content: 'ar_AR' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { 'http-equiv': 'Content-Security-Policy', content: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com" },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3001',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://rizqak.com',
    },
  },

  typescript: {
    strict: true,
    shim: false,
    typeCheck: false,
  },

  ssr: true,

  router: {
    options: {
    },
  },

  nitro: {
    preset: 'node-server',
    compressPublicAssets: true,
    routeRules: {
      '/': { prerender: true },
      '/jobs/**': { swr: 3600 },
      '/companies/**': { swr: 3600 },
      '/auth/**': { ssr: false },
      '/dashboard/**': { ssr: false },
    },
  },

  experimental: {
    payloadExtraction: true,
    renderJsonPayloads: true,
  },
})

