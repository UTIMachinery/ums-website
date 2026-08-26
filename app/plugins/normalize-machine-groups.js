import machinesData from '~/assets/data/machines.json'

export default defineNuxtPlugin(() => {
  for (const machine of machinesData) {
    // Normalize native Access export field names to the names used by the site.
    if (machine.WebCode == null && machine.Web_Code != null) machine.WebCode = machine.Web_Code
    if (machine.WebDesc == null && machine.Web_Desc != null) machine.WebDesc = machine.Web_Desc
    if (machine.AdvSpec == null && machine.Adv_Spec != null) machine.AdvSpec = machine.Adv_Spec
    if (machine.OffMarket == null && machine.Off_Market != null) machine.OffMarket = machine.Off_Market
    if (machine.CreateRep == null && machine.Create_Rep != null) machine.CreateRep = machine.Create_Rep
    if (machine.special == null && machine.Special != null) machine.special = machine.Special

    // Keep the status fields numeric so existing filters behave consistently.
    machine.Sold = Number(machine.Sold || 0)
    machine.OffMarket = Number(machine.OffMarket || 0)
    machine.dont_advertise = Number(machine.dont_advertise || 0)
    machine.special = Number(machine.special || 0)

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
    } else if (groups.includes('EDM') || webDesc === 'EDM') {
      machine.Groups = 'EDM'
    } else if (groups.includes('Drilling, Milling & Lathes')) {
      machine.Groups = /Lathes, Manual/i.test(webDesc) ? 'Engine Lathes' : 'Milling/Drilling'
    } else {
      machine.Groups = `Other:${webDesc || machine.InvID}`
    }
  }
})
