import imageFiles from '../../app/assets/data/images.json'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const invID = String(query.invID || '')

  if (!invID) {
    return []
  }

  return imageFiles
    .filter(file =>
      file.toLowerCase().startsWith(`${invID.toLowerCase()}_`) &&
      /\.(jpg|jpeg|png|webp)$/i.test(file)
    )
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
})