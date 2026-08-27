export default defineNuxtPlugin(() => {
  const oldHost = 'equipment.usedmachinerysource.com'
  const primaryHost = 'www.usedmachinerysource.com'

  if (window.location.hostname === oldHost) {
    const target = `https://${primaryHost}${window.location.pathname}${window.location.search}${window.location.hash}`
    window.location.replace(target)
    return
  }

  const style = document.createElement('style')
  style.setAttribute('data-ums-mobile-fix', 'true')
  style.textContent = `
    @media (max-width: 900px) {
      .machine-detail {
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
        overflow-x: hidden;
      }

      .machine-top,
      .gallery-column,
      .machine-gallery,
      .machine-info,
      .lower-grid,
      .specifications-section,
      .equipment-section {
        min-width: 0;
        max-width: 100%;
      }

      .thumbnail-grid {
        width: 100%;
        max-width: 100%;
        overflow-x: auto;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
      }
    }
  `

  document.head.appendChild(style)
})
