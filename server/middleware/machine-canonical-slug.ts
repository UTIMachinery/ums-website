import machinesData from '../../app/assets/data/machines.json'

const slugify = (value: string) => String(value || '')
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')

export default defineEventHandler((event) => {
  const url = getRequestURL(event)
  const match = url.pathname.match(/^\/equipment\/([^/]+)\/([^/]+)\/?$/)
  if (!match) return

  const [, rawId, requestedSlug] = match
  const machine = (machinesData as any[]).find(item => String(item.InvID) === String(rawId))
  if (!machine) return

  const canonicalSlug = slugify(`${machine.Manufacturer || ''}-${machine.Model || ''}`)
  if (!canonicalSlug || requestedSlug === canonicalSlug) return

  return sendRedirect(
    event,
    `https://www.usedmachinerysource.com/equipment/${machine.InvID}/${canonicalSlug}${url.search}`,
    301
  )
})
