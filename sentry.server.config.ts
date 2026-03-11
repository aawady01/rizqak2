import { defineSentryConfig } from '@sentry/nuxt'

export default defineSentryConfig({
  dsn: process.env.SENTRY_DSN || process.env.NUXT_PUBLIC_SENTRY_DSN || '',
  enabled: !!(process.env.SENTRY_DSN || process.env.NUXT_PUBLIC_SENTRY_DSN),
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
})
