export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', (html) => {
    const oldBase = 'https://equipment.usedmachinerysource.com'
    const primaryBase = 'https://www.usedmachinerysource.com'

    html.head = html.head.map((chunk) =>
      chunk.replaceAll(oldBase, primaryBase)
    )
  })
})
