export async function verifyTurnstile(event) {
  const secret = process.env.TURNSTILE_SECRET_KEY
  const token = getCookie(event, 'ums_turnstile_token')

  if (!secret) {
    throw createError({ statusCode: 500, statusMessage: 'Turnstile is not configured.' })
  }

  if (!token) {
    throw createError({ statusCode: 403, statusMessage: 'Security verification is required.' })
  }

  const remoteip = getRequestIP(event, { xForwardedFor: true })
  const formData = new URLSearchParams()
  formData.set('secret', secret)
  formData.set('response', token)
  if (remoteip) formData.set('remoteip', remoteip)

  const result = await $fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formData.toString()
  })

  deleteCookie(event, 'ums_turnstile_token', { path: '/' })

  if (!result?.success) {
    throw createError({ statusCode: 403, statusMessage: 'Security verification failed. Please try again.' })
  }

  return result
}
