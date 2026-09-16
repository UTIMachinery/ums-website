<template>
  <div class="historical-configurations">
    <article v-for="config in configurations" :key="config.invID" class="configuration">
      <div class="config-head">
        <div><h3>{{ configurationTitle(config) }}</h3><p v-if="config.machine.Control"><strong>Control:</strong> {{ clean(config.machine.Control) }}</p><p class="record-number">Historical UMS record #{{ config.invID }}</p></div>
        <button type="button" class="copy" @click="copySpecs(config)">{{ copied===config.invID?'Copied!':'Copy Specifications' }}</button>
      </div>

      <section v-if="specRows(config).length" class="hist-spec-section">
        <h4>Specifications</h4>
        <template v-for="(row,index) in specRows(config)" :key="`${config.invID}-spec-${index}`">
          <div v-if="row.section" class="hist-spec-group">{{ row.section }}</div>
          <div v-else class="hist-spec-row"><span>{{ row.label }}</span><strong>{{ row.value }}</strong></div>
        </template>
      </section>

      <section v-if="equipmentRows(config).length" class="hist-equipment-section">
        <h4>Equipped With</h4>
        <template v-for="(row,index) in equipmentRows(config)" :key="`${config.invID}-ew-${index}`">
          <div v-if="row.section" class="hist-equipment-group">{{ row.section }}</div>
          <div v-else class="hist-equipment-row">{{ row.value }}</div>
        </template>
      </section>
    </article>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { cleanSpecText } from '~/utils/specText'
const props=defineProps({configurations:{type:Array,required:true}})
const copied=ref('')
const clean=cleanSpecText
const heading=v=>clean(v).replace(/:\s*$/,'').toUpperCase()
function configurationTitle(config){const m=config.machine||{};return [clean(m.Year),clean(m.Manufacturer),clean(m.Model),'— UMS record #'+config.invID].filter(Boolean).join(' ')}
function specRows(config){
  const rows=[]; let last=''
  for(const s of config.specs||[]){
    const section=heading(s.groupnames), label=clean(s.description), value=clean(s.specvalues)
    if(section&&section!==last){rows.push({section});last=section}
    if(label&&value)rows.push({label,value})
  }
  return rows
}
function equipmentRows(config){
  const rows=[]; let last=''; const seen=new Set()
  for(const s of config.specs||[]){
    const value=clean(s.equippedwith); if(!value||seen.has(value))continue
    const section=heading(s.groupnameew)
    if(section&&section!=='EQUIPPED WITH'&&section!==last){rows.push({section});last=section}
    rows.push({value}); seen.add(value)
  }
  return rows
}
async function copySpecs(config){
  const lines=[configurationTitle(config)]
  if(config.machine?.Control)lines.push(`Control: ${clean(config.machine.Control)}`)
  for(const row of specRows(config)){if(row.section)lines.push('',row.section);else lines.push(`${row.label}: ${row.value}`)}
  const ew=equipmentRows(config); if(ew.length){lines.push('','EQUIPPED WITH');for(const row of ew){if(row.section)lines.push(row.section);else lines.push(row.value)}}
  try{await navigator.clipboard.writeText(lines.join('\n').trim());copied.value=config.invID;setTimeout(()=>{if(copied.value===config.invID)copied.value=''},1800)}catch{copied.value=''}
}
</script>

<style scoped>
.configuration{border:1px solid #cfd9e3;border-radius:8px;padding:24px;margin:24px 0 34px;background:#fff}.config-head{display:flex;justify-content:space-between;gap:20px;align-items:flex-start;margin-bottom:18px}.config-head h3{font-size:1.35rem;color:#0b2545;margin:0 0 7px}.config-head p{margin:3px 0;color:#53677a}.record-number{font-size:.9rem}.copy{border:0;border-radius:5px;background:#0b2545;color:#fff;font-weight:800;padding:10px 14px;cursor:pointer;white-space:nowrap}.hist-spec-section,.hist-equipment-section{border:1px solid #d6dee8;border-radius:8px;overflow:hidden;background:#fff;margin-top:16px}.hist-spec-section h4,.hist-equipment-section h4{margin:0;padding:10px 18px;background:#f3f6fa;border-bottom:1px solid #d7dde5;color:#0b2545;font-size:1.15rem}.hist-spec-group{font-weight:700;color:#1c4587;background:#dce6f1;padding:5px 18px;border-top:1px solid #c5d0dc;border-bottom:1px solid #c5d0dc}.hist-spec-row{display:grid;grid-template-columns:1fr 220px;gap:24px;padding:10px 18px 10px 28px;border-bottom:1px solid #e1e6ec}.hist-spec-row span{font-size:16px;font-weight:500}.hist-spec-row strong{text-align:right;font-size:16px}.hist-equipment-group{font-weight:700;color:#1c4587;padding:10px 18px 5px}.hist-equipment-row{padding:7px 18px 7px 32px;line-height:1.45}.hist-equipment-row::before{content:'•';margin-left:-14px;margin-right:8px}@media(max-width:760px){.config-head{display:block}.copy{margin-top:14px}.hist-spec-row{grid-template-columns:1fr;gap:3px;padding:9px 14px}.hist-spec-row strong{text-align:left}}
</style>