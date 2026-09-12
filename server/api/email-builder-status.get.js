import {
  builderPasswordConfigured,
  isBuilderAuthorized
} from '../utils/email-builder-auth'

export default defineEventHandler((event) => ({
  configured: builderPasswordConfigured(),
  authorized: isBuilderAuthorized(event)
}))
