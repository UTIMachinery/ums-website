<template>
  <div class="historical-configurations">
    <nav v-if="years.length>1" class="year-picker" aria-label="Historical specification years">
      <button v-for="year in years" :key="year" type="button" :class="{active:selectedYear===year}" @click="selectedYear=year">{{ year }}</button>
    </nav>
    <p v-if="years.length>1" class="year-note">Showing {{ selectedYear }} historical configuration{{ visibleConfigurations.length===1?'':'s' }}.</p>

    <article v-for="config in visibleConfigurations" :key="config.invID" class="configuration">
      <div class="config-head">
        <div><h3>{{ configurationTitle(config) }}</h3><p v-if="machineType(config)" class="machine-type">{{ machineType(config) }}</p><p v-if="config.machine.Control"><strong>Control:</strong> {{ clean(config.machine.Control) }}</p><p class="record-number">Historical UMS record #{{ config.invID }}</p></div>
        <button v-if="hasDetails(config)" type="button" class="copy" @click="copySpecs(config)">{{ copied===config.invID?'Copied!':'Copy Specifications' }}</button>
      </div>
      <div v-if="!hasDetails(config)" class="no-specs"><strong>Detailed specifications not available in our historical records.</strong><p>This machine record is preserved in the UMS historical database, but no specification rows were recorded for this InvID.</p></div>
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
import { ref,computed,watch } from 'vue'
import { cleanSpecText } from '~/utils/specText'
const props=defineProps({configurations:{type:Array,required:true}})
const copied=ref('')
const clean=cleanSpecText
const yearOf=c=>clean(c?.machine?.Year)||'Year not recorded'
const machineType=c=>clean(c?.machine?.WebDesc||c?.machine?.Web_Desc)
const years=computed(()=>[...new Set(props.configurations.map(yearOf))].sort((a,b)=>{const an=parseInt(a),bn=parseInt(b);if(Number.isFinite(an)&&Number.isFinite(bn))return bn-an;if(Number.isFinite(an))return-1;if(Number.isFinite(bn))return 1;return a.localeCompare(b)}))
const selectedYear=ref('')
watch(years,v=>{if(!v.includes(selectedYear.value))selectedYear.value=v[0]||''},{immediate:true})
const visibleConfigurations=computed(()=>years.value.length>1?props.configurations.filter(c=>yearOf(c)===selectedYear.value):props.configurations)
const heading=v=>clean(v).replace(/:\s*$/,'').toUpperCase()
function configurationTitle(config){const m=config.machine||{};return [clean(m.Year),clean(m.Manufacturer),clean(m.Model),'— UMS record #'+config.invID].filter(Boolean).join(' ')}
const field=(row,...names)=>{for(const name of names){if(row?.[name]!==undefined&&row?.[name]!==null)return row[name]}const wanted=new Set(names.map(n=>n.toLowerCase().replace(/_/g,'')));for(const [key,value] of Object.entries(row||{})){if(wanted.has(key.toLowerCase().replace(/_/g,'')))return value}return ''}
function specRows(config){const rows=[];let last='';for(const s of config.specs||[]){const section=heading(field(s,'groupnames','GroupNames','group_names')),label=clean(field(s,'description','Description')),value=clean(field(s,'specvalues','SpecValues','spec_values'));if(section&&section!==last){rows.push({section});last=section}if(label&&value)rows.push({label,value})}return rows}
function equipmentRows(config){const rows=[];let last='';const seen=new Set();for(const s of config.specs||[]){const value=clean(field(s,'equippedwith','EquippedWith','equipped_with'));if(!value||seen.has(value))continue;const section=heading(field(s,'groupnameew','GroupNameEW','group_name_ew'));if(section&&section!=='EQUIPPED WITH'&&section!==last){rows.push({section});last=section}rows.push({value});seen.add(value)}return rows}
function hasDetails(config){return specRows(config).length>0||equipmentRows(config).length>0}
async function copySpecs(config){const lines=[configurationTitle(config)];if(config.machine?.Control)lines.push(`Control: ${clean(config.machine.Control)}`);for(const row of specRows(config)){if(row.section)lines.push('',row.section);else lines.push(`${row.label}: ${row.value}`)}const ew=equipmentRows(config);if(ew.length){lines.push('','EQUIPPED WITH');for(const row of ew){if(row.section)lines.push(row.section);else lines.push(row.value)}}try{await navigator.clipboard.writeText(lines.join('\n').trim());copied.value=config.invID;setTimeout(()=>{if(copied.value===config.invID)copied.value=''},1800)}catch{copied.value=''}}
</script>
<style scoped>
.year-picker{display:flex;flex-wrap:wrap;gap:8px;margin:20px 0 8px}.year-picker button{border:1px solid #b9c7d6;background:#fff;color:#0b2545;border-radius:5px;padding:9px 15px;font-weight:800;cursor:pointer}.year-picker button:hover,.year-picker button.active{background:#0b2545;color:#fff;border-color:#0b2545}.year-note{margin:0 0 18px;color:#53677a;font-size:.92rem}.configuration{border:1px solid #cfd9e3;border-radius:8px;padding:24px;margin:24px 0 34px;background:#fff}.config-head{display:flex;justify-content:space-between;gap:20px;align-items:flex-start;margin-bottom:18px}.config-head h3{font-size:1.35rem;color:#0b2545;margin:0 0 7px}.config-head p{margin:3px 0;color:#53677a}.config-head .machine-type{margin:1px 0 7px;color:#1c4587;font-size:1rem;font-weight:700}.record-number{font-size:.9rem}.copy{border:0;border-radius:5px;background:#0b2545;color:#fff;font-weight:800;padding:10px 14px;cursor:pointer;white-space:nowrap}.no-specs{background:#f5f7fa;border:1px solid #d6dee8;border-radius:7px;padding:16px 18px;color:#526579}.no-specs strong{color:#0b2545}.no-specs p{margin:6px 0 0;line-height:1.5}.hist-spec-section,.hist-equipment-section{border:1px solid #d6dee8;border-radius:8px;overflow:hidden;background:#fff;margin-top:16px}.hist-spec-section h4,.hist-equipment-section h4{margin:0;padding:10px 18px;background:#f3f6fa;border-bottom:1px solid #d7dde5;color:#0b2545;font-size:1.15rem}.hist-spec-group{font-weight:700;color:#1c4587;background:#dce6f1;padding:5px 18px;border-top:1px solid #c5d0dc;border-bottom:1px solid #c5d0dc}.hist-spec-row{display:grid;grid-template-columns:1fr 220px;gap:24px;padding:10px 18px 10px 28px;border-bottom:1px solid #e1e6ec}.hist-spec-row span{font-size:16px;font-weight:500}.hist-spec-row strong{text-align:right;font-size:16px}.hist-equipment-group{font-weight:700;color:#1c4587;padding:10px 18px 5px}.hist-equipment-row{padding:7px 18px 7px 32px;line-height:1.45}.hist-equipment-row::before{content:'•';margin-left:-14px;margin-right:8px}@media(max-width:760px){.config-head{display:block}.copy{margin-top:14px}.hist-spec-row{grid-template-columns:1fr;gap:3px;padding:9px 14px}.hist-spec-row strong{text-align:left}.year-picker button{padding:8px 12px}}
</style>