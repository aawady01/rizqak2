const serverDsn = process.env.SENTRY_DSN || process.env.NUXT_PUBLIC_SENTRY_DSN || ''

export default {
  dsn: serverDsn,
  enabled: Boolean(serverDsn),
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
}
