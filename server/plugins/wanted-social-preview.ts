import wantedsData from '../../app/assets/data/wanteds.json'

function escapeMeta(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:response', (response, { event }) => {
    if (typeof response.body !== 'string') return

    const url = new URL(event.node.req.url || '/', 'https://www.usedmachinerysource.com')
    if (url.pathname !== '/wanted') return

    const wantedId = Number(url.searchParams.get('id'))
    if (!Number.isFinite(wantedId)) return

    const wanted = (wantedsData as Array<any>).find(w => Number(w.WtdID) === wantedId)
    if (!wanted) return

    const description = String(wanted.Description || '').trim()
    const webDesc = String(wanted.WebDesc || 'Machine Wanted').trim()
    const titleText = description
      ? `Machine Needed: ${description}`.slice(0, 110)
      : `Machine Needed: ${webDesc}`
    const descriptionText = `Hot Wanted ID #${wantedId} — ${webDesc}. ${description}`.slice(0, 200)

    const title = escapeMeta(titleText)
    const metaDescription = escapeMeta(descriptionText)

    response.body = response.body
      .replace(/<meta property="og:title" content="[^"]*">/i, `<meta property="og:title" content="${title}">`)
      .replace(/<meta property="og:description" content="[^"]*">/i, `<meta property="og:description" content="${metaDescription}">`)
      .replace(/<meta name="twitter:title" content="[^"]*">/i, `<meta name="twitter:title" content="${title}">`)
      .replace(/<meta name="twitter:description" content="[^"]*">/i, `<meta name="twitter:description" content="${metaDescription}">`)
  })
})
