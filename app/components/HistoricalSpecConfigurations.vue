<template>
  <div class="historical-configurations">
    <article v-for="config in configurations" :key="config.invID" class="configuration">
      <div class="config-head">
        <div>
          <h3>{{ configurationTitle(config) }}</h3>
          <p v-if="config.machine.Control"><strong>Control:</strong> {{ clean(config.machine.Control) }}</p>
          <p class="record-number">Historical UMS record #{{ config.invID }}</p>
        </div>
        <button type="button" class="copy" @click="copySpecs(config)">{{ copied === config.invID ? 'Copied!' : 'Copy Specs' }}</button>
      </div>

      <div class="spec-sheet">
        <template v-for="(row, index) in displayRows(config)" :key="`${config.invID}-${index}`">
          <div v-if="row.section" class="spec-group">{{ row.section }}</div>
          <div v-else-if="row.equipment" class="equipment-line">{{ row.value }}</div>
          <div v-else class="spec-row"><span>{{ row.label }}</span><strong>{{ row.value }}</strong></div>
        </template>
      </div>
    </article>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { cleanSpecText } from '~/utils/specText'

const props = defineProps({
  configurations: { type: Array, required: true }
})

const copied = ref('')
const clean = cleanSpecText

function sectionName(value) {
  return clean(value).replace(/:\s*$/, '').toUpperCase()
}

function configurationTitle(config) {
  const machine = config.machine || {}
  return [clean(machine.Year), clean(machine.Manufacturer), clean(machine.Model), 'historical configuration'].filter(Boolean).join(' ')
}

function displayRows(config) {
  const rows = []
  let lastSection = ''

  for (const spec of config.specs || []) {
    const section = sectionName(spec.groupnames)
    const label = clean(spec.description)
    const value = clean(spec.specvalues)

    if (section && section !== lastSection) {
      rows.push({ section })
      lastSection = section
    }
    if (label && value) rows.push({ label, value })
  }

  const equipment = (config.specs || [])
    .map(spec => clean(spec.equippedwith))
    .filter(Boolean)

  if (equipment.length) {
    rows.push({ section: 'EQUIPPED WITH' })
    for (const value of [...new Set(equipment)]) rows.push({ equipment: true, value })
  }

  return rows
}

async function copySpecs(config) {
  const lines = [configurationTitle(config)]
  if (config.machine?.Control) lines.push(`Control: ${clean(config.machine.Control)}`)
  for (const row of displayRows(config)) {
    if (row.section) lines.push('', row.section)
    else if (row.equipment) lines.push(row.value)
    else lines.push(`${row.label}: ${row.value}`)
  }
  try {
    await navigator.clipboard.writeText(lines.join('\n').trim())
    copied.value = config.invID
    setTimeout(() => { if (copied.value === config.invID) copied.value = '' }, 1800)
  } catch {
    copied.value = ''
  }
}
</script>

<style scoped>
.configuration{border:1px solid #cfd9e3;border-radius:8px;padding:24px;margin:24px 0 34px;background:#fff}.config-head{display:flex;justify-content:space-between;gap:20px;align-items:flex-start;margin-bottom:18px}.config-head h3{font-size:1.35rem;color:#0b2545;margin:0 0 7px}.config-head p{margin:3px 0;color:#53677a}.record-number{font-size:.9rem}.copy{border:0;border-radius:5px;background:#0b2545;color:#fff;font-weight:800;padding:10px 14px;cursor:pointer;white-space:nowrap}.spec-sheet{border:1px solid #d7dde5;border-radius:7px;overflow:hidden}.spec-group{font-weight:800;color:#1c4587;background:#dce6f1;padding:7px 18px;border-top:1px solid #c5d0dc;border-bottom:1px solid #c5d0dc}.spec-group:first-child{border-top:0}.spec-row{display:grid;grid-template-columns:minmax(0,1fr) 220px;gap:24px;padding:10px 18px 10px 28px;border-bottom:1px solid #e1e6ec}.spec-row span{font-size:16px;font-weight:500}.spec-row strong{text-align:right;font-size:16px}.equipment-line{padding:8px 18px 8px 32px;border-bottom:1px solid #e1e6ec;line-height:1.45}.equipment-line::before{content:'•';margin-left:-14px;margin-right:8px}@media(max-width:760px){.config-head{display:block}.copy{margin-top:14px}.spec-row{grid-template-columns:1fr;gap:3px;padding:9px 14px}.spec-row strong{text-align:left}}
</style>
