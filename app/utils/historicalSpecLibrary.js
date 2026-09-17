import oldMachines from '~/assets/data/historical-machines.json'
import oldSpecifications from '~/assets/data/historical-specifications.json'
import { cleanSpecText } from '~/utils/specText'

function normalized(value) {
  return cleanSpecText(value).toLowerCase().replace(/[^a-z0-9]+/g, '')
}

function hasUsableSpecifications(rows) {
  return rows.some(row =>
    (cleanSpecText(row.description) && cleanSpecText(row.specvalues)) ||
    cleanSpecText(row.equippedwith)
  )
}

// The source specification export is intentionally kept in ascending id order.
// Building the index in one pass preserves that order within every InvID while
// avoiding a 127k-row scan for every historical machine rendered.
// Accept both historical export casing variants so specs always join by InvID.
const specsByInvID = new Map()
for (const row of oldSpecifications) {
  const key = String(row.invid ?? row.InvID ?? '')
  if (!key) continue
  if (!specsByInvID.has(key)) specsByInvID.set(key, [])
  specsByInvID.get(key).push(row)
}

export function historicalConfigurations({ manufacturer, model, machineFilter } = {}) {
  const manufacturerKey = normalized(manufacturer)
  const modelKey = normalized(model)

  return oldMachines
    .filter(machine => {
      if (manufacturerKey && normalized(machine.Manufacturer) !== manufacturerKey) return false
      if (modelKey && normalized(machine.Model) !== modelKey) return false
      if (machineFilter && !machineFilter(machine)) return false
      return true
    })
    .map(machine => {
      const invID = String(machine.InvID ?? machine.invid ?? '')
      const specs = specsByInvID.get(invID) || []
      return { invID, machine, specs }
    })
    .filter(config => hasUsableSpecifications(config.specs))
    .sort((a, b) => {
      const ay = Number.parseInt(a.machine.Year, 10)
      const by = Number.parseInt(b.machine.Year, 10)
      if (Number.isFinite(ay) && Number.isFinite(by) && ay !== by) return by - ay
      return Number(b.invID) - Number(a.invID)
    })
}

export function historicalManufacturers({ machineFilter } = {}) {
  const manufacturers = new Map()
  for (const machine of oldMachines) {
    if (machineFilter && !machineFilter(machine)) continue
    const manufacturer = cleanSpecText(machine.Manufacturer)
    if (!manufacturer) continue
    const invID = String(machine.InvID ?? machine.invid ?? '')
    const specs = specsByInvID.get(invID) || []
    if (!hasUsableSpecifications(specs)) continue
    const key = normalized(manufacturer)
    if (!manufacturers.has(key)) manufacturers.set(key, manufacturer)
  }
  return [...manufacturers.values()].sort((a,b)=>a.localeCompare(b,undefined,{numeric:true,sensitivity:'base'}))
}

export function historicalModels({ manufacturer, machineFilter } = {}) {
  const manufacturerKey = normalized(manufacturer)
  const models = new Map()
  for (const machine of oldMachines) {
    if (manufacturerKey && normalized(machine.Manufacturer) !== manufacturerKey) continue
    if (machineFilter && !machineFilter(machine)) continue
    const model = cleanSpecText(machine.Model)
    if (!model) continue
    const invID = String(machine.InvID ?? machine.invid ?? '')
    const specs = specsByInvID.get(invID) || []
    if (!hasUsableSpecifications(specs)) continue
    const key = normalized(model)
    if (!models.has(key)) models.set(key, model)
  }
  return [...models.values()].sort((a,b)=>a.localeCompare(b,undefined,{numeric:true}))
}

export function historicalModelBySlug({ manufacturer, slug, machineFilter } = {}) {
  const slugKey = String(slug || '').toLowerCase()
  const aliases = manufacturer && normalized(manufacturer) === 'mazak' ? {
    'quick-turn-25l-quick-turn': 'Quick Turn 25L',
    'quick-turn-35n-1500': 'Quick-Turn 35N/1500'
  } : {}
  const models = historicalModels({ manufacturer, machineFilter })
  if (aliases[slugKey]) {
    const aliasKey = normalized(aliases[slugKey])
    const match = models.find(model => normalized(model) === aliasKey)
    if (match) return match
  }
  return models.find(model => model.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'') === slugKey) || null
}

export function historicalModelSummaries({ manufacturer, machineFilter } = {}) {
  const manufacturerKey = normalized(manufacturer)
  const models = new Map()
  for (const machine of oldMachines) {
    if (manufacturerKey && normalized(machine.Manufacturer) !== manufacturerKey) continue
    if (machineFilter && !machineFilter(machine)) continue
    const model = cleanSpecText(machine.Model)
    if (!model) continue
    const invID = String(machine.InvID ?? machine.invid ?? '')
    const specs = specsByInvID.get(invID) || []
    if (!hasUsableSpecifications(specs)) continue
    const key = normalized(model)
    if (!models.has(key)) models.set(key,{model,slug:model.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''),years:[],count:0})
    const entry=models.get(key)
    entry.count++
    const year=Number.parseInt(machine.Year,10)
    if(Number.isFinite(year))entry.years.push(year)
  }
  return [...models.values()].map(x=>({...x,firstYear:x.years.length?Math.min(...x.years):null,lastYear:x.years.length?Math.max(...x.years):null})).sort((a,b)=>a.model.localeCompare(b.model,undefined,{numeric:true}))
}
