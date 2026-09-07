import machinesData from '../../../app/assets/data/machines.json'
import mazakSingle1 from '../../../app/assets/data/mazak-historical-single-1.js'
import mazakSingle2 from '../../../app/assets/data/mazak-historical-single-2.js'
import mazakSingle3 from '../../../app/assets/data/mazak-historical-single-3.js'
import mazakSingle4 from '../../../app/assets/data/mazak-historical-single-4.js'
import mazakCollision1 from '../../../app/assets/data/mazak-historical-collision-1.js'
import mazakCollision2 from '../../../app/assets/data/mazak-historical-collision-2.js'
import haas1 from '../../../app/assets/data/haasHistoricalModels1.json'
import haas2 from '../../../app/assets/data/haasHistoricalModels2.json'
import haas3 from '../../../app/assets/data/haasHistoricalModels3.json'
import haas4 from '../../../app/assets/data/haasHistoricalModels4.json'

export default defineEventHandler((event) => {
  const activeMachines = machinesData.filter(machine => Number(machine.Sold) === 0 && Number(machine.Off_Market ?? machine.OffMarket ?? 0) === 0 && Number(machine.dont_advertise ?? 0) === 0)
  const baseUrl = 'https://www.usedmachinerysource.com'
  const staticPages = [
    { path: '/', changefreq: 'weekly', priority: '1.0' },{ path: '/equipment', changefreq: 'daily', priority: '0.9' },{ path: '/wanted', changefreq: 'daily', priority: '0.9' },{ path: '/about', changefreq: 'monthly', priority: '0.7' },{ path: '/services', changefreq: 'monthly', priority: '0.7' },{ path: '/sell-your-machine', changefreq: 'monthly', priority: '0.8' },{ path: '/contact', changefreq: 'monthly', priority: '0.6' },{ path: '/spec-library/cnc-lathes', changefreq: 'monthly', priority: '0.8' },{ path: '/spec-library/mazak/cnc-lathes', changefreq: 'monthly', priority: '0.8' },{ path: '/spec-library/haas/cnc-lathes', changefreq: 'monthly', priority: '0.8' }
  ]
  const mazakCuratedSlugs = ['qt-20','quick-turn-20','quick-turn-10','quick-turn-18n','quick-turn-8','quick-turn-8n','qt-25l','slant-turn-50','qt-250hp','sqt-18m','dual-turn-20','integrex-30y','sqt-200ms','qt-300l','integrex-35y-1500','sqt-250m','sqt-250ms','integrex-200sy','multiplex-6200','sqt-15m','sqt-28ms','slant-turn-60n','integrex-300yb','sqt-10m','sqt-30ms','multiplex-630','powermaster','quick-turn-nexus-400','quick-turn-nexus-450m','multiplex-6200y','powermaster-1600','quick-turn-smart-250m','quick-turn-smart-350','multiplex-6200r','sqt-15ms','quick-turn-smart-100','quick-turn-smart-200','quick-turn-smart-350m','quick-turn-nexus-250ms','m-5','m-4','m-5-2000','m-4-1500','m-5-3000','m5-1500','m5-2000','m5n-3000','qt-250','qt-15','qt-20hp','qt-15n','qt-18n','qt-200','qt-6t','qt-10','qt-25','qt-25c','qt-28n','qt-30','qt-350','qt-8n','qt-8sp','qt6t','qtn-450-ii','quick-turn-15','quick-turn-15n','quick-turn-20hp','quick-turn-30','quick-turn-35n-1500','quick-turn-25l','quick-turn-25l-quick-turn','quick-turn-18','quick-turn-20n','quick-turn-28n','quick-turn-6g','quick-turn-6t','super-quick-turn-15ms','sqt-10ms','super-quick-turn-15s','super-quick-turn-10ms','integrex-30-1000','integrex-200msy','integrex-30y-1500','integrex-35y-1000','integrex-40','powermaster-chucker','powermaster-1600-big-bore','powermaster-3000','slant-turn-15','slant-turn-30-1500','slant-turn-50n','slant-turn-60-2000']
  const excludedHistoricalSlugs = new Set(['kfhgkdfj'])
  const mazakHistoricalModels = [...mazakSingle1,...mazakSingle2,...mazakSingle3,...mazakSingle4,...mazakCollision1,...mazakCollision2].filter(item => !excludedHistoricalSlugs.has(item.slug))
  const haasModels=[...haas1,...haas2,...haas3,...haas4].filter(item=>item.records?.some(r=>r.summary?.trim()))
  const staticUrls=staticPages.map(page=>`\n  <url><loc>${baseUrl}${page.path}</loc><changefreq>${page.changefreq}</changefreq><priority>${page.priority}</priority></url>`).join('')
  const specPaths=[...mazakCuratedSlugs.map(slug=>`/spec-library/mazak/${slug}`),...mazakHistoricalModels.map(item=>`/spec-library/mazak/${item.slug}`),...haasModels.map(item=>`/spec-library/haas/${item.slug}`)]
  const specLibraryUrls=[...new Set(specPaths)].map(path=>`\n  <url><loc>${baseUrl}${path}</loc><changefreq>yearly</changefreq><priority>0.6</priority></url>`).join('')
  const machineUrls=activeMachines.map(machine=>{const slug=`${machine.Manufacturer}-${machine.Model}`.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');return `\n  <url><loc>${baseUrl}/equipment/${machine.InvID}/${slug}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`}).join('')
  const sitemap=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${staticUrls}${specLibraryUrls}${machineUrls}\n</urlset>`
  setHeader(event,'Content-Type','application/xml');return sitemap
})