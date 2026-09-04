export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.server) return

  const router = nuxtApp.$router

  const style = document.createElement('style')
  style.textContent = `
    .featured-card .copy-link-button,
    .shared-wanted-card .copy-link-button {
      display: none !important;
    }
    .featured-card {
      cursor: pointer;
    }
  `
  document.head.appendChild(style)

  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement | null
    if (!target) return

    const card = target.closest('.featured-card') as HTMLElement | null
    if (!card) return

    // Keep the existing response button behavior unchanged.
    if (target.closest('button, a, input, select, textarea, label')) return

    const idText = card.querySelector('.featured-id')?.textContent || ''
    const match = idText.match(/(\d+)/)
    if (!match) return

    const wantedId = match[1]
    router.push({ path: '/wanted', query: { id: wantedId } })
  })
})
