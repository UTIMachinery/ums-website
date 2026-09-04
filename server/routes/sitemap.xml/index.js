import machinesData from '../../../app/assets/data/machines.json'

export default defineEventHandler((event) => {
  const activeMachines = machinesData.filter(machine =>
    Number(machine.Sold) === 0 &&
    Number(machine.Off_Market ?? machine.OffMarket ?? 0) === 0 &&
    Number(machine.dont_advertise ?? 0) === 0
  )

  const baseUrl = 'https://www.usedmachinerysource.com'

  const staticPages = [
    { path: '/', changefreq: 'weekly', priority: '1.0' },
    { path: '/equipment', changefreq: 'daily', priority: '0.9' },
    { path: '/wanted', changefreq: 'daily', priority: '0.9' },
    { path: '/about', changefreq: 'monthly', priority: '0.7' },
    { path: '/services', changefreq: 'monthly', priority: '0.7' },
    { path: '/sell-your-machine', changefreq: 'monthly', priority: '0.8' },
    { path: '/contact', changefreq: 'monthly', priority: '0.6' }
  ]

  const staticUrls = staticPages.map(page => `
  <url>
    <loc>${baseUrl}${page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')

  const machineUrls = activeMachines.map(machine => {
    const slug = `${machine.Manufacturer}-${machine.Model}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

    return `
  <url>
    <loc>${baseUrl}/equipment/${machine.InvID}/${slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  }).join('')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${staticUrls}${machineUrls}
</urlset>`

  setHeader(event, 'Content-Type', 'application/xml')

  return sitemap
})