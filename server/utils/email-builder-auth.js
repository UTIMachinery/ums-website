import { createHash, timingSafeEqual } from 'node:crypto'

const COOKIE_NAME = 'ums_email_builder_auth'

const digest = (value = '') =>
  createHash('sha256').update(String(value)).digest('hex')

export const builderPasswordConfigured = () =>
  Boolean(process.env.EMAIL_BUILDER_PASSWORD)

export const builderCookieName = COOKIE_NAME

export const builderSessionToken = () => {
  const password = process.env.EMAIL_BUILDER_PASSWORD || ''
  return password ? digest(`ums-email-builder:${password}`) : ''
}

export const isBuilderAuthorized = (event) => {
  const expected = builderSessionToken()
  const actual = getCookie(event, COOKIE_NAME) || ''
  if (!expected || !actual || expected.length !== actual.length) return false
  return timingSafeEqual(Buffer.from(actual), Buffer.from(expected))
}

export const requireBuilderAuth = (event) => {
  if (!builderPasswordConfigured()) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Direct email sending is not configured yet.'
    })
  }
  if (!isBuilderAuthorized(event)) {
    throw createError({ statusCode: 401, statusMessage: 'Email Builder login required.' })
  }
}
