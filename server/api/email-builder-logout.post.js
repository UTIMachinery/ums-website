import { builderCookieName } from '../utils/email-builder-auth'

export default defineEventHandler((event) => {
  deleteCookie(event, builderCookieName, { path: '/' })
  return { success: true }
})
