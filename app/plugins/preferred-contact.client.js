export default defineNuxtPlugin(() => {
  const cookieName = 'ums-preferred-contact'

  const readCookie = () => {
    const match = document.cookie.match(new RegExp(`(?:^|; )${cookieName}=([^;]*)`))
    return match ? decodeURIComponent(match[1]) : ''
  }

  const savePreference = (value) => {
    if (!value) return
    document.cookie = `${cookieName}=${encodeURIComponent(value)}; Path=/; Max-Age=31536000; SameSite=Lax`
  }

  const addPreferredContact = (form) => {
    if (!(form instanceof HTMLFormElement)) return
    if (form.dataset.preferredContactReady === 'yes') return
    form.dataset.preferredContactReady = 'yes'

    if (form.textContent?.includes('Preferred method of communication')) return

    const label = document.createElement('label')
    label.className = 'ums-preferred-contact'
    label.style.display = 'block'
    label.style.marginBottom = '16px'
    label.style.color = '#253344'
    label.style.fontSize = '14px'
    label.style.fontWeight = '700'
    label.textContent = 'Preferred method of communication *'

    const select = document.createElement('select')
    select.name = 'preferredContact'
    select.required = true
    select.style.boxSizing = 'border-box'
    select.style.width = '100%'
    select.style.marginTop = '7px'
    select.style.border = '1px solid #cbd3dc'
    select.style.borderRadius = '4px'
    select.style.padding = '11px 12px'
    select.style.font = 'inherit'
    select.style.fontWeight = '400'
    select.style.background = '#fff'

    const choices = [
      ['', 'Select one'],
      ['Call', 'Call'],
      ['Email', 'Email'],
      ['Text', 'Text']
    ]

    for (const [value, text] of choices) {
      const option = document.createElement('option')
      option.value = value
      option.textContent = text
      if (!value) option.disabled = true
      select.appendChild(option)
    }

    select.value = readCookie()
    select.addEventListener('change', () => savePreference(select.value))
    label.appendChild(select)

    const firstQuestion = form.querySelector('.form-question, .request-radio-group')
    const firstTextareaLabel = form.querySelector('textarea')?.closest('label')
    const insertBefore = firstQuestion || firstTextareaLabel
    if (insertBefore) form.insertBefore(label, insertBefore)
    else form.appendChild(label)
  }

  const scan = () => document.querySelectorAll('form').forEach(addPreferredContact)

  document.addEventListener('submit', (event) => {
    const form = event.target
    if (!(form instanceof HTMLFormElement)) return
    const select = form.querySelector('select[name="preferredContact"]')
    if (select) savePreference(select.value)
  }, true)

  scan()
  const observer = new MutationObserver(scan)
  observer.observe(document.body, { childList: true, subtree: true })
})
