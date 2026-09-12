import { timingSafeEqual } from 'node:crypto'
import {
  builderCookieName,
  builderPasswordConfigured,
  builderSessionToken
} from '../utils/email-builder-auth'

export default defineEventHandler(async (event) => {
  if (!builderPasswordConfigured()) {
    throw createError({
      statusCode: 503,
      statusMessage: 'EMAIL_BUILDER_PASSWORD is not configured.'
    })
  }

  const body = await readBody(event)
  const supplied = String(body?.password || '')
  const expected = String(process.env.EMAIL_BUILDER_PASSWORD || '')

  const suppliedBuffer = Buffer.from(supplied)
  const expectedBuffer = Buffer.from(expected)
  const valid =
    suppliedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(suppliedBuffer, expectedBuffer)

  if (!valid) {
    throw createError({ statusCode: 401, statusMessage: 'Incorrect password.' })
  }

  setCookie(event, builderCookieName, builderSessionToken(), {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/'
  })

  return { success: true }
})
