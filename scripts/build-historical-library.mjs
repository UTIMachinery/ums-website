import { readFileSync, writeFileSync } from 'node:fs'

const [,, machinesInput, specificationsInput, machinesOutput = 'old-machines.json', specificationsOutput = 'old-specifications.json'] = process.argv
if (!machinesInput || !specificationsInput) {
  console.error('Usage: node scripts/build-historical-library.mjs <machines.txt> <specifications.txt> [machines.json] [specifications.json]')
  process.exit(1)
}

const expectedMachineFields = ['InvID','Code','Description','Web_Code','Web_Desc','Groups','Manufacturer','Model','Year','Control','Price','Location','Condition','Adv_Spec','Sold','Off_Market','Create_Rep','dont_advertise','Special','feat_order']
const expectedSpecFields = ['id','invid','specid','groupnames','description','specvalues','ewid','equippedwith','groupnameew']

function parseTabFile(path, expectedFields, idField, label) {
  const text = new TextDecoder('windows-1252').decode(readFileSync(path)).replace(/^\uFEFF/, '')
  const lines = text.split(/\r?\n/)
  const headers = lines.shift().split('\t')
  if (headers.join('\t') !== expectedFields.join('\t')) {
    throw new Error(`${label} header mismatch. Expected: ${expectedFields.join(', ')}; got: ${headers.join(', ')}`)
  }

  const rows = []
  const rejected = []
  for (let index = 0; index < lines.length; index++) {
    const line = lines[index]
    if (!line) continue
    const values = line.split('\t')
    if (values.length !== headers.length || !/^\d+$/.test(values[headers.indexOf(idField)] || '')) {
      rejected.push(index + 2)
      continue
    }
    rows.push(Object.fromEntries(headers.map((header, i) => [header, values[i]])))
  }

  if (rejected.length) {
    console.warn(`${label}: excluded ${rejected.length} malformed source lines rather than guessing/repairing them. Lines: ${rejected.join(', ')}`)
  }
  return rows
}

const machines = parseTabFile(machinesInput, expectedMachineFields, 'InvID', 'Machines')
const specifications = parseTabFile(specificationsInput, expectedSpecFields, 'id', 'Specifications')

let previousId = -Infinity
for (const row of specifications) {
  const id = Number(row.id)
  if (!Number.isInteger(id) || id <= previousId) {
    throw new Error(`Specifications must remain strictly ascending by id. Found ${previousId} then ${row.id}.`)
  }
  previousId = id
}

const machineIds = new Set(machines.map(row => row.InvID))
const orphanSpecs = specifications.filter(row => row.invid && !machineIds.has(row.invid)).length
if (orphanSpecs) console.warn(`Specifications: ${orphanSpecs} rows reference InvIDs not present in the machine export; they are retained but cannot render without a matching machine.`)

writeFileSync(machinesOutput, JSON.stringify(machines, null, 2) + '\n', 'utf8')
writeFileSync(specificationsOutput, JSON.stringify(specifications, null, 2) + '\n', 'utf8')
console.log(`Wrote ${machines.length} machines and ${specifications.length} specification rows as clean UTF-8 JSON.`)
