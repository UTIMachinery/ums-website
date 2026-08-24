export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const siteKey = config.public.turnstileSiteKey

  if (!siteKey || typeof window === 'undefined') return

  const cookieName = 'ums_turnstile_token'
  let scriptPromise

  const clearToken = () => {
    document.cookie = `${cookieName}=; Path=/; Max-Age=0; SameSite=Lax; Secure`
  }

  const setToken = (token) => {
    document.cookie = `${cookieName}=${encodeURIComponent(token)}; Path=/; Max-Age=300; SameSite=Lax; Secure`
  }

  const loadTurnstile = () => {
    if (window.turnstile) return Promise.resolve()
    if (scriptPromise) return scriptPromise

    scriptPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-ums-turnstile]')
      if (existing) {
        existing.addEventListener('load', resolve, { once: true })
        existing.addEventListener('error', reject, { once: true })
        return
      }

      const script = document.createElement('script')
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
      script.async = true
      script.defer = true
      script.dataset.umsTurnstile = 'true'
      script.onload = resolve
      script.onerror = reject
      document.head.appendChild(script)
    })

    return scriptPromise
  }

  const protectForm = async (form) => {
    if (!(form instanceof HTMLFormElement) || form.dataset.turnstileProtected === 'true') return

    form.dataset.turnstileProtected = 'true'
    form.dataset.turnstileReady = 'false'

    const submit = form.querySelector('button[type="submit"], input[type="submit"]')
    if (!submit) return

    submit.disabled = true

    const mount = document.createElement('div')
    mount.className = 'ums-turnstile'
    mount.setAttribute('aria-label', 'Security verification')

    const actions = submit.closest('.request-form-actions')
    if (actions && actions.parentNode === form) {
      form.insertBefore(mount, actions)
    } else {
      submit.parentNode.insertBefore(mount, submit)
    }

    form.addEventListener('submit', (event) => {
      if (form.dataset.turnstileReady !== 'true') {
        event.preventDefault()
        event.stopImmediatePropagation()
      }
    }, true)

    try {
      await loadTurnstile()
      window.turnstile.render(mount, {
        sitekey: siteKey,
        theme: 'auto',
        callback(token) {
          setToken(token)
          form.dataset.turnstileReady = 'true'
          submit.disabled = false
        },
        'expired-callback'() {
          clearToken()
          form.dataset.turnstileReady = 'false'
          submit.disabled = true
        },
        'error-callback'() {
          clearToken()
          form.dataset.turnstileReady = 'false'
          submit.disabled = true
        }
      })
    } catch (error) {
      console.error('Turnstile could not load:', error)
      form.dataset.turnstileReady = 'false'
      submit.disabled = true
    }
  }

  const protectForms = () => {
    document.querySelectorAll('form').forEach(protectForm)
  }

  onNuxtReady(() => {
    clearToken()
    protectForms()

    const observer = new MutationObserver(protectForms)
    observer.observe(document.body, { childList: true, subtree: true })
  })
})
