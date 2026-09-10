export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', (html) => {
    const oldEquipmentBase = 'https://equipment.usedmachinerysource.com'
    const nonWwwBase = 'https://usedmachinerysource.com'
    const primaryBase = 'https://www.usedmachinerysource.com'

    html.head = html.head.map((chunk) =>
      chunk
        .replaceAll(oldEquipmentBase, primaryBase)
        .replaceAll(nonWwwBase, primaryBase)
    )
  })
})
