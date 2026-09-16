import { readFileSync, writeFileSync } from 'node:fs'

const [,, machinesInput, specificationsInput, machinesOutput = 'old-machines.json', specificationsOutput = 'old-specifications.json'] = process.argv
if (!machinesInput || !specificationsInput) {
  console.error('Usage: node scripts/build-historical-library.mjs <machines.txt> <specifications.txt> [machines.json] [specifications.json]')
  process.exit(1)
}

function parseTabFile(path) {
  // Access exports contain Windows-1252 characters. TextDecoder converts them
  // to clean UTF-8 JavaScript strings before JSON.stringify writes UTF-8 JSON.
  const text = new TextDecoder('windows-1252').decode(readFileSync(path)).replace(/^\uFEFF/, '')
  const lines = text.split(/\r?\n/).filter((line, index, all) => !(index === all.length - 1 && line === ''))
  const headers = lines.shift().split('\t')
  return lines.map(line => {
    const values = line.split('\t')
    return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? '']))
  })
}

const machines = parseTabFile(machinesInput)
const specifications = parseTabFile(specificationsInput)

const expectedMachineFields = ['InvID','Code','Description','Web_Code','Web_Desc','Groups','Manufacturer','Model','Year','Control','Price','Location','Condition','Adv_Spec','Sold','Off_Market','Create_Rep','dont_advertise','Special','feat_order']
const expectedSpecFields = ['id','invid','specid','groupnames','description','specvalues','ewid','equippedwith','groupnameew']

function assertFields(record, expected, label) {
  const actual = Object.keys(record || {})
  if (actual.join('\t') !== expected.join('\t')) throw new Error(`${label} header mismatch. Expected: ${expected.join(', ')}; got: ${actual.join(', ')}`)
}
assertFields(machines[0], expectedMachineFields, 'Machines')
assertFields(specifications[0], expectedSpecFields, 'Specifications')

const ids = specifications.map(row => Number(row.id))
if (ids.some(id => !Number.isInteger(id))) throw new Error('Specifications contains a non-numeric id.')
for (let i = 1; i < ids.length; i++) {
  if (ids[i] <= ids[i - 1]) throw new Error(`Specifications must be strictly ascending by id. Found ${ids[i - 1]} then ${ids[i]}.`)
}

writeFileSync(machinesOutput, JSON.stringify(machines, null, 2) + '\n', 'utf8')
writeFileSync(specificationsOutput, JSON.stringify(specifications, null, 2) + '\n', 'utf8')
console.log(`Wrote ${machines.length} machines and ${specifications.length} specification rows as UTF-8 JSON.`)
