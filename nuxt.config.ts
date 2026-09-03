import fs from 'node:fs'
import path from 'node:path'

const imagesFolder = path.resolve('public/Images')
const imagesIndexFile = path.resolve('app/assets/data/images.json')
const allowedImageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp'])

if (fs.existsSync(imagesFolder)) {
  const imageFiles = fs
    .readdirSync(imagesFolder)
    .filter(file => allowedImageExtensions.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

  fs.writeFileSync(
    imagesIndexFile,
    JSON.stringify(imageFiles, null, 2) + '\n',
    'utf8'
  )
}

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/wanted-enhancements.css'],

  runtimeConfig: {
    public: {
      turnstileSiteKey: ''
    }
  },

  nitro: {
    externals: {
      traceInclude: [
        './public/Images/**'
      ]
    }
  }
})