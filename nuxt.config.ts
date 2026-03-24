import { defineNuxtConfig } from 'nuxt/config'

import tailwindcss from '@tailwindcss/vite'

const isDev = process.env.NODE_ENV !== 'production'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  srcDir: 'app',
  devtools: { enabled: true },
  telemetry: false,

  future: {
    compatibilityVersion: 4,
  },

  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxtjs/color-mode',
    '@vite-pwa/nuxt',
    'nuxt-og-image',
    '@nuxt/scripts',
    '@vee-validate/nuxt',
    '@nuxt/eslint',
    '@nuxt/test-utils/module',
    // Dev-slow modules: only in production
    ...(!isDev ? [
      '@sentry/nuxt/module' as const,
      '@nuxt-modules/compression' as const,
      'nuxt-security' as const,
      '@nuxtjs/device' as const,
      '@nuxtjs/sitemap' as const,
      '@nuxtjs/robots' as const,
      'nuxt-schema-org' as const,
      'nuxt-auth-utils' as const,
      'nuxt-link-checker' as const,
    ] : []),
  ],

  imports: {
    dirs: [
      'composables',
      'core/api',
      'shared/composables',
    ],
  },

  components: [
    { path: '~/components', pathPrefix: false },
    { path: '~/shared/components', pathPrefix: false },
  ],

  css: [
    '~/assets/css/main.css',
  ],

  i18n: {
    defaultLocale: 'ar',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
    locales: [
      {
        code: 'ar',
        iso: 'ar-EG',
        name: 'Arabic',
        dir: 'rtl',
        file: 'ar.json',
      },
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        dir: 'ltr',
        file: 'en.json',
      },
    ],
  },

  content: {
    watch: {
      enabled: true,
    },
  },

  fonts: {
    provider: 'google',
    families: [
      {
        name: 'Cairo',
        provider: 'google',
        weights: [300, 400, 500, 600, 700, 800],
        styles: ['normal'],
        subsets: ['arabic', 'latin'],
      },
    ],
  },

  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: '',
    storageKey: 'rizqak-color-mode',
  },

  pwa: {
    registerType: 'autoUpdate',
    includeAssets: ['favicon.svg'],
    manifest: {
      name: 'رزقاك | Rizqak',
      short_name: 'رزقاك',
      description: 'رزقاك تساعد الباحثين عن عمل في مصر وإفريقيا على إيجاد فرص موثوقة.',
      lang: 'ar',
      dir: 'rtl',
      theme_color: '#1B6B4A',
      background_color: '#F8FAFC',
      display: 'standalone',
      start_url: '/',
      icons: [
        {
          src: '/favicon.svg',
          sizes: 'any',
          type: 'image/svg+xml',
          purpose: 'any maskable',
        },
      ],
    },
  },

  ogImage: isDev ? { enabled: false } : {},

  device: {},

  compression: isDev ? { enabled: false } : {},

  linkChecker: {
    failOnError: false,
  },

  veeValidate: {
    autoImports: true,
  },

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://rizqak.com',
    name: 'Rizqak',
    defaultLocale: 'ar',
  },

  image: {},

  security: {
    headers: {
      contentSecurityPolicy: isDev
        ? {
            'base-uri': ["'none'"],
            'font-src': ["'self'", 'https:', 'data:'],
            'form-action': ["'self'"],
            'frame-ancestors': ["'self'"],
            'img-src': ["'self'", 'data:', 'blob:', 'https:'],
            'object-src': ["'none'"],
            'script-src-attr': ["'none'"],
            'style-src': ["'self'", 'https:', "'unsafe-inline'"],
            'script-src': [
              "'self'",
              'https:',
              "'unsafe-inline'",
              "'unsafe-eval'",
              "'strict-dynamic'",
              "'nonce-{{nonce}}'",
            ],
            'connect-src': ["'self'", 'https:', 'http:', 'ws:', 'wss:'],
            'upgrade-insecure-requests': false,
          }
        : {
            'base-uri': ["'none'"],
            'font-src': ["'self'", 'https:', 'data:'],
            'form-action': ["'self'"],
            'frame-ancestors': ["'self'"],
            'img-src': ["'self'", 'data:', 'blob:', 'https:'],
            'object-src': ["'none'"],
            'script-src-attr': ["'none'"],
            'style-src': ["'self'", 'https:', "'unsafe-inline'"],
            'script-src': [
              "'self'",
              'https:',
              "'unsafe-inline'",
              "'strict-dynamic'",
              "'nonce-{{nonce}}'",
            ],
            'connect-src': ["'self'", 'https:'],
            'upgrade-insecure-requests': true,
          },
    },
  },

  sitemap: {
    enabled: true,
  },

  robots: {
    sitemap: `${process.env.NUXT_PUBLIC_SITE_URL || 'https://rizqak.com'}/sitemap.xml`,
  },

  schemaOrg: {},

  vite: {
    resolve: {
      dedupe: ['vee-validate'],
    },
    plugins: [
      // @ts-expect-error -- compatibility issue between vite versions
      tailwindcss(),
    ],
    css: {
      devSourcemap: true,
    },
    optimizeDeps: {
      exclude: ['vue'],
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-pinia': ['pinia'],
            'vendor-reka': ['reka-ui'],
            'vendor-query': ['@tanstack/vue-query'],
          },
        },
      },
    },
  },

  app: {
    head: {
      title: 'رزقاك | وظائف في مصر والخليج',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'رزقاك تساعد الباحثين عن عمل في مصر وإفريقيا على إيجاد فرص موثوقة.' },
        { name: 'theme-color', content: '#1B6B4A' },
        { property: 'og:locale', content: 'ar_EG' },
        { property: 'og:site_name', content: 'Rizqak' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'format-detection', content: 'telephone=no, address=no, email=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3001',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://rizqak.com',
      sentryDsn: process.env.NUXT_PUBLIC_SENTRY_DSN || '',
    },
  },

  typescript: {
    strict: true,
    shim: false,
    typeCheck: false,
  },

  ssr: false,

  router: {
    options: {
    },
  },

  nitro: {
    compressPublicAssets: true,
    routeRules: {
      '/sitemap.xml': {
        headers: {
          'cache-control': 'public, max-age=3600, stale-while-revalidate=86400',
        },
      },
      '/robots.txt': {
        headers: {
          'cache-control': 'public, max-age=3600',
        },
      },
    },
  },

  experimental: {
    payloadExtraction: true,
    renderJsonPayloads: true,
  },
})
