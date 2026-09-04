export default defineNuxtPlugin(() => {
  if (import.meta.server) return

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
    const match = idText.match(/#\s*(\d+)/)
    if (!match) return

    // A real navigation makes the ?id=#### URL reliable in mobile browsers
    // and available to the phone's normal Share / Copy Link controls.
    window.location.href = `/wanted?id=${match[1]}`
  })
})
