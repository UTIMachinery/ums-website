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

    // IMPORTANT: Do not modify machine.Groups.
    // The Access Groups field is authoritative and must be displayed exactly as exported.
  }
})
