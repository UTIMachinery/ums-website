import { readdir } from 'node:fs/promises'
import { join } from 'node:path'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const invID = String(query.invID || '')

  if (!invID) {
    return []
  }

  const imagesFolder = join(process.cwd(), 'public', 'Images')
  const files = await readdir(imagesFolder)

  return files
    .filter(file =>
      file.toLowerCase().startsWith(`${invID.toLowerCase()}_`) &&
      /\.(jpg|jpeg|png|webp)$/i.test(file)
    )
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
})