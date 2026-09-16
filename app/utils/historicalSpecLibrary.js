import oldMachines from '../../old-machines.json'
import oldSpecifications from '../../old-specifications.json'
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
      const specs = oldSpecifications.filter(row => String(row.invid) === String(machine.InvID))
      return { invID: String(machine.InvID), machine, specs }
    })
    .filter(config => hasUsableSpecifications(config.specs))
    .sort((a, b) => {
      const ay = Number.parseInt(a.machine.Year, 10)
      const by = Number.parseInt(b.machine.Year, 10)
      if (Number.isFinite(ay) && Number.isFinite(by) && ay !== by) return by - ay
      return Number(b.invID) - Number(a.invID)
    })
}
