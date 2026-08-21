import fs from 'fs'
import path from 'path'

const imagesFolder = path.resolve('public/Images')
const outputFile = path.resolve('app/assets/data/images.json')

const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp']

const imageFiles = fs
  .readdirSync(imagesFolder)
  .filter(file =>
    allowedExtensions.includes(path.extname(file).toLowerCase())
  )
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

fs.writeFileSync(
  outputFile,
  JSON.stringify(imageFiles, null, 2) + '\n',
  'utf8'
)

console.log(`images.json updated with ${imageFiles.length} images.`)