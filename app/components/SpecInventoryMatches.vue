<template>
  <section v-if="matches.length" class="inventory-match">
    <div class="inventory-head">
      <div>
        <div class="eyebrow">CURRENT UMS INVENTORY</div>
        <h2>{{ heading }}</h2>
        <p>{{ intro }}</p>
      </div>
      <NuxtLink :to="browseUrl" class="browse-link">{{ browseLabel }} →</NuxtLink>
    </div>
    <div class="machine-grid">
      <article v-for="machine in matches" :key="machine.InvID" class="machine-card">
        <NuxtLink :to="machineUrl(machine)" class="image-link">
          <img v-if="machineImage(machine)" :src="'/Images/' + machineImage(machine)" :alt="('Used ' + (machine.Year || '') + ' ' + (machine.Manufacturer || '') + ' ' + (machine.Model || '') + ' for sale').replace(/\s+/g,' ').trim()" loading="lazy" />
          <div v-else class="placeholder">Used Machinery Source</div>
        </NuxtLink>
        <div class="machine-copy">
          <div v-if="isExact(machine)" class="exact-badge">EXACT MODEL MATCH</div>
          <h3><NuxtLink :to="machineUrl(machine)">{{ machine.Manufacturer }} {{ machine.Model }}<span v-if="machine.Year"> – {{ machine.Year }}</span></NuxtLink></h3>
          <p class="description">{{ machine.WebDesc || machine.Web_Desc || machineTypeLabel }}</p>
          <p class="stock">Stock #{{ machine.InvID }}</p>
          <p v-if="machine.AdvSpec || machine.Adv_Spec" class="spec">{{ machine.AdvSpec || machine.Adv_Spec }}</p>
          <NuxtLink :to="machineUrl(machine)" class="view-button">View Machine</NuxtLink>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import machinesData from '~/assets/data/machines.json'
import imagesData from '~/assets/data/images.json'

const props=defineProps({
  manufacturer:{type:String,required:true},
  model:{type:String,default:''},
  machineType:{type:String,required:true}
})

const typeGroups={
  lathe:'CNC Lathes & Turning Centers',
  vmc:'CNC Vertical Machining Centers and CNC Mills',
  hmc:'CNC Horizontal Machining Centers',
  vtl:'Vertical Boring Mills & VTL',
  hbm:'Boring Mills & VTLs'
}
const typeLabels={
  lathe:'CNC Lathes & Turning Centers',
  vmc:'Vertical Machining Centers',
  hmc:'Horizontal Machining Centers',
  vtl:'Vertical Boring Mills & VTLs',
  hbm:'Horizontal Boring Mills'
}
const manufacturerAliases={
  'mori-seiki':['mori-seiki','mori seiki','dmg mori','dmg-mori'],
  'doosan':['doosan','dn solutions'],
  'smec':['smec','samsung'],
  'hyundai-wia':['hyundai-wia','hyundai wia','hyundai'],
  'mitsui-seiki':['mitsui-seiki','mitsui seiki'],
  'hitachi-seiki':['hitachi-seiki','hitachi seiki']
}
const norm=v=>String(v||'').toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,' ').trim()
const compact=v=>norm(v).replace(/\s+/g,'')
const manufacturerKey=computed(()=>norm(props.manufacturer).replace(/\s+/g,'-'))
const aliases=computed(()=>{const key=manufacturerKey.value;return (manufacturerAliases[key]||[props.manufacturer]).map(norm)})
const targetGroup=computed(()=>typeGroups[props.machineType]||'')
const machineTypeLabel=computed(()=>typeLabels[props.machineType]||'Machines')
const active=(machinesData||[]).filter(m=>Number(m.Sold)===0&&Number(m.OffMarket??m.Off_Market??0)===0&&Number(m.dont_advertise)===0)
const brandType=computed(()=>active.filter(m=>aliases.value.includes(norm(m.Manufacturer))&&(!targetGroup.value||String(m.Groups||'')===targetGroup.value)))
const isExact=m=>props.model&&compact(m.Model)===compact(props.model)
const matches=computed(()=>[...brandType.value].sort((a,b)=>{const exact=Number(isExact(b))-Number(isExact(a));if(exact)return exact;return Number(b.Year||0)-Number(a.Year||0)}).slice(0,5))
const exactCount=computed(()=>brandType.value.filter(isExact).length)
const heading=computed(()=>exactCount.value ? props.manufacturer+' '+props.model+' Currently Available' : props.manufacturer+' '+machineTypeLabel.value+' Currently Available')
const intro=computed(()=>exactCount.value ? 'We currently have a '+props.manufacturer+' '+props.model+' listed for sale. Additional '+props.manufacturer+' '+machineTypeLabel.value.toLowerCase()+' are shown when available.' : 'Looking for a '+props.manufacturer+' '+(props.model||machineTypeLabel.value)+'? These current '+props.manufacturer+' '+machineTypeLabel.value.toLowerCase()+' may be a fit.')
const browseLabel=computed(()=>'View All '+props.manufacturer+' '+machineTypeLabel.value)
const browseUrl=computed(()=>'/equipment?search='+encodeURIComponent(props.manufacturer)+'&category='+encodeURIComponent(targetGroup.value))
const machineSlug=m=>((m.Manufacturer||'')+'-'+(m.Model||'')).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')
const machineUrl=m=>'/equipment/'+m.InvID+'/'+machineSlug(m)
const machineImage=m=>(imagesData||[]).find(file=>String(file).toLowerCase().startsWith(String(m.InvID+'_').toLowerCase()))||''
</script>

<style scoped>
.inventory-match{margin-top:46px;padding-top:34px;border-top:1px solid #d9e1e8}.inventory-head{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;margin-bottom:20px}.eyebrow{color:#f47b20;font-size:.76rem;font-weight:900;letter-spacing:.12em;margin-bottom:7px}.inventory-head h2{margin:0 0 7px;color:#0b2545;font-size:1.75rem}.inventory-head p{margin:0;max-width:760px;color:#526579;line-height:1.55}.browse-link{color:#1c4587;font-weight:800;text-decoration:none;white-space:nowrap}.machine-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px}.machine-card{border:1px solid #d7e0e8;border-radius:8px;overflow:hidden;background:#fff;display:flex;flex-direction:column}.image-link{height:135px;background:#f7f9fb;display:flex;align-items:center;justify-content:center}.image-link img{width:100%;height:100%;object-fit:contain}.placeholder{padding:12px;text-align:center;color:#667789;font-size:.78rem;font-weight:700}.machine-copy{padding:12px;display:flex;flex-direction:column;flex:1}.exact-badge{align-self:flex-start;margin-bottom:6px;padding:3px 6px;border-radius:4px;background:#fff1e5;color:#a74708;font-size:.63rem;font-weight:900;letter-spacing:.04em}.machine-copy h3{margin:0 0 6px;font-size:.98rem;line-height:1.25}.machine-copy h3 a{color:#0b2545;text-decoration:none}.description{margin:0 0 6px;color:#43566b;font-size:.78rem;font-weight:700;line-height:1.35}.stock{margin:0 0 6px;color:#6b7785;font-size:.72rem}.spec{margin:0 0 9px;color:#526579;font-size:.72rem;line-height:1.4;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}.view-button{display:inline-block;align-self:flex-start;margin-top:auto;background:#1c4587;color:#fff;text-decoration:none;font-size:.75rem;font-weight:800;padding:8px 10px;border-radius:5px}@media(max-width:1050px){.machine-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}@media(max-width:760px){.inventory-head{align-items:flex-start;flex-direction:column}.machine-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.browse-link{white-space:normal}}@media(max-width:520px){.machine-grid{grid-template-columns:1fr}.image-link{height:210px}}
</style>
