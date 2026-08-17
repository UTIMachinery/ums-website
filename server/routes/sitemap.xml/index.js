import machinesData from '../../../app/assets/data/machines.json'

export default defineEventHandler((event) => {
  const activeMachines = machinesData.filter(machine =>
    Number(machine.Sold) === 0 &&
    Number(machine.OffMarket) === 0 &&
    Number(machine.dont_advertise) === 0
  )

  const baseUrl = 'https://www.usedmachinerysource.com'

  const urls = activeMachines.map(machine => {
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
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <url>
    <loc>${baseUrl}/equipment</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
${urls}
</urlset>`

  setHeader(event, 'Content-Type', 'application/xml')

  return sitemap
})