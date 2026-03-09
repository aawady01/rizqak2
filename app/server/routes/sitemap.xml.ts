import {
  buildAbsoluteUrl,
  escapeXml,
  getPublicSeoRoutes,
  resolveSiteUrl,
} from '~/server/utils/seo'

export default defineEventHandler((event) => {
  const siteUrl = resolveSiteUrl(event)
  const generatedDate = new Date().toISOString().split('T')[0] ?? '1970-01-01'
  const routes = getPublicSeoRoutes()

  const urls = routes
    .map((route) => {
      const location = escapeXml(buildAbsoluteUrl(siteUrl, route.path))
      const lastmod = escapeXml(route.lastmod ?? generatedDate)

      return [
        '  <url>',
        `    <loc>${location}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${route.changefreq}</changefreq>`,
        `    <priority>${route.priority}</priority>`,
        '  </url>',
      ].join('\n')
    })
    .join('\n')

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    '</urlset>',
    '',
  ].join('\n')

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  return xml
})
