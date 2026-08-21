import fs from 'fs'
import path from 'path'

const projectRoot = process.cwd()

const inputFolder = path.join(projectRoot, 'website-update')
const outputFolder = path.join(projectRoot, 'app', 'assets', 'data')

const files = [
  {
    input: 'machines.txt',
    output: 'machines.json',
    type: 'machines'
  },
  {
    input: 'specifications.txt',
    output: 'specifications.json',
    type: 'standard'
  },
  {
    input: 'videos.txt',
    output: 'Videos.json',
    type: 'standard'
  }
]

function readTabDelimited(inputPath) {
  const text = fs.readFileSync(inputPath, 'utf8')

  const lines = text
    .replace(/^\uFEFF/, '')
    .split(/\r?\n/)
    .filter(line => line.trim() !== '')

  if (lines.length < 2) {
    throw new Error(`No data found in ${inputPath}`)
  }

  const headers = lines[0]
    .split('\t')
    .map(header => header.trim())

  return lines.slice(1).map(line => {
    const values = line.split('\t')
    const record = {}

    headers.forEach((header, index) => {
      record[header] = values[index] ?? ''
    })

    return record
  })
}

function convertMachineRecord(record) {
  return {
    InvID: record.InvID,
    Code: record.Code,
    Description: record.Description,
    WebCode: record.Web_Code,
    WebDesc: record.Web_Desc,
    Groups: record.Groups,
    Manufacturer: record.Manufacturer,
    Model: record.Model,
    year: record.Year,
    Control: record.Control,
    Price: record.Price,
    Location: record.Location,
    Condition: record.Condition,
    AdvSpec: record.Adv_Spec,

    Sold: Number(record.Sold || 0),
    OffMarket: Number(record.Off_Market || 0),

    CreateRep: record.Create_Rep,

    dont_advertise: Number(record.dont_advertise || 0),
    special: Number(record.Special || 0),

    feat_order: record.feat_order
  }
}

for (const file of files) {
  const inputPath = path.join(inputFolder, file.input)
  const outputPath = path.join(outputFolder, file.output)

  if (!fs.existsSync(inputPath)) {
    console.error(`Missing file: ${inputPath}`)
    continue
  }

  let data = readTabDelimited(inputPath)

  if (file.type === 'machines') {
    data = data.map(convertMachineRecord)
  }

  fs.writeFileSync(
    outputPath,
    JSON.stringify(data, null, 2) + '\n',
    'utf8'
  )

  console.log(
    `${file.input} -> ${file.output}: ${data.length} records`
  )
}

console.log('Website JSON conversion complete.')