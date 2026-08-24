import machinesData from '~/assets/data/machines.json'

export default defineNuxtPlugin(() => {
  for (const machine of machinesData) {
    const webDesc = String(machine.WebDesc || '')
    const groups = String(machine.Groups || '')

    if (webDesc === 'CNC Machining Centers, Vertical') {
      machine.Groups = 'CNC Vertical Machining Centers'
    } else if (webDesc === 'CNC Machining Centers, Horizontal') {
      machine.Groups = 'CNC Horizontal Machining Centers'
    } else if (webDesc.startsWith('CNC Lathes')) {
      machine.Groups = 'CNC Lathes & Turning Centers'
    } else if (groups.includes('Boring Mills') || /boring|vertical turning|vtl/i.test(webDesc)) {
      machine.Groups = 'Boring Mills & VTLs'
    } else if (groups.includes('Grinders') || /grind/i.test(webDesc)) {
      machine.Groups = 'Grinders'
    } else if (groups.includes('Fabricat') || /fabricat|press brake|shear|laser|plasma/i.test(webDesc)) {
      machine.Groups = 'Fabricating'
    } else if (groups.includes('Inspection') || /inspect|cmm|measuring/i.test(webDesc)) {
      machine.Groups = 'Inspection'
    } else {
      machine.Groups = `Other:${webDesc || machine.InvID}`
    }
  }
})
