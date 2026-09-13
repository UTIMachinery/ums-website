export function trackLeadEvent(eventName, params = {}) {
  if (!import.meta.client) return
  if (typeof window.gtag !== 'function') return

  window.gtag('event', eventName, params)
}
