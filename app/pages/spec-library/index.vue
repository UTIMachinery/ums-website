<template>
  <main class="page">
    <section class="hero"><div class="wrap"><div class="kicker">UMS MACHINERY SPECIFICATION LIBRARY</div><h1>Machine Specification Library</h1><p>Research historical machine specifications by machine type, manufacturer, model and year. These reference pages are built from Used Machinery Source historical machine records and are separate from current equipment-for-sale listings.</p></div></section>
    <section class="wrap section"><div class="label">BROWSE BY MACHINE TYPE</div><h2>Historical Machine Specifications</h2><p class="intro">Choose a machinery group to see the machine types it contains, then browse manufacturers, models and historical specifications.</p><div class="grid">
      <NuxtLink v-for="g in groups" :key="g.slug" :to="`/spec-library/${g.slug}`" class="card available">
        <div class="status">AVAILABLE</div><h3>{{g.title}}</h3><p class="description">{{g.description}}</p>
        <div v-if="g.types.length" class="included"><strong>Machine types included:</strong><span>{{g.types.join(' • ')}}</span></div>
        <span class="browse">Browse {{g.title}} Specifications →</span>
      </NuxtLink>
    </div></section>
    <section class="wrap section method"><div class="label">ABOUT THE LIBRARY</div><h2>Historical reference data, not current inventory</h2><p>The UMS Spec Library is intended to help buyers, sellers and machinery professionals research machine models that may no longer be represented in current manufacturer literature. Specifications can vary by year, control, spindle package, options and configuration, so year-specific differences are preserved whenever the historical records support them.</p><NuxtLink to="/equipment" class="inventory-link">Looking for machines currently for sale? View Equipment →</NuxtLink></section>
  </main>
</template>
<script setup>
import historicalMachines from '~/assets/data/historical-machines.json'
const clean=s=>String(s||'').trim()
const definitions=[
{group:'CNC Lathes & Turning Centers',title:'CNC Lathes & Turning Centers',slug:'cnc-lathes',description:'Historical turning-center specifications organized by manufacturer, model and year/configuration.'},
{group:'CNC Vertical Machining Centers and CNC Mills',title:'Vertical Machining Centers (VMC)',slug:'vmcs',description:'Historical VMC and CNC mill specifications including travels, table data, spindle information, tooling and controls.'},
{group:'CNC Horizontal Machining Centers',title:'Horizontal Machining Centers (HMC)',slug:'hmcs',description:'Historical HMC specifications including pallet data, axis travels, spindle information, tooling and controls.'},
{group:'Vertical Boring Mills & VTL',title:'Vertical Boring Mills / Vertical Turret Lathes',slug:'vtls',description:'Historical VBM and VTL specifications organized by manufacturer, model and individual year/configuration.'},
{group:'Horizontal Boring Mills & HBM',title:'Horizontal Boring Mills (HBM)',slug:'hbms',description:'Historical HBM specifications organized by manufacturer, model, year and machine style.'},
{group:'Engine Lathes, Drilling & Milling',title:'Engine Lathes, Manual Mills & Drilling Machines',slug:'engine-lathes',description:'Historical conventional machine specifications including manual lathes, manual mills, drills and related machine types.'},
{group:'Grinders, Lappers & Hones',title:'Grinders',slug:'grinders',description:'Historical grinder, lapper and hone specifications organized from UMS historical records.'},
{group:'Automatics',title:'Automatics',slug:'automatics',description:'Historical automatic machinery organized from UMS historical records.'},
{group:'EDM',title:'EDM',slug:'edm',description:'Historical electrical discharge machinery organized from UMS historical records.'},
{group:'Fabricating',title:'Fabricating',slug:'fabricating',description:'Historical fabricating machinery organized from UMS historical records.'},
{group:'Presses',title:'Presses',slug:'presses',description:'Historical press machinery organized from UMS historical records.'},
{group:'Saws',title:'Saws',slug:'saws',description:'Historical saw machinery organized from UMS historical records.'},
{group:'Gear',title:'Gear',slug:'gear',description:'Historical gear machinery organized from UMS historical records.'},
{group:'Inspection',title:'Inspection',slug:'inspection',description:'Historical inspection machinery organized from UMS historical records.'},
{group:'Material Handling',title:'Material Handling',slug:'material-handling',description:'Historical material handling machinery organized from UMS historical records.'},
{group:'Finishing',title:'Finishing',slug:'finishing',description:'Historical finishing machinery organized from UMS historical records.'},
{group:'Heat Treating',title:'Heat Treating',slug:'heat-treating',description:'Historical heat treating machinery organized from UMS historical records.'},
{group:'Tables',title:'Tables',slug:'tables',description:'Historical machine tables organized from UMS historical records.'},
{group:'Welding',title:'Welding',slug:'welding',description:'Historical welding machinery organized from UMS historical records.'},
{group:'Other Machinery',title:'Other Machinery',slug:'other-machinery',description:'Other historical industrial machinery organized from UMS historical records.'}
]
const eligible=historicalMachines.filter(m=>clean(m.dont_advertise)!=='1')
const groups=definitions.map(g=>({...g,types:[...new Set(eligible.filter(m=>clean(m.Groups)===g.group).map(m=>clean(m.WebDesc||m.Web_Desc)).filter(Boolean))].sort((a,b)=>a.localeCompare(b))}))
useSeoMeta({title:'Machine Specification Library | Used Machinery Source',description:'Research historical CNC and industrial machine specifications by group, machine type, manufacturer, model and year in the Used Machinery Source Spec Library.'});useHead({link:[{rel:'canonical',href:'https://www.usedmachinerysource.com/spec-library'}]})
</script>
<style scoped>.page{color:#17273a;background:#fff;padding-bottom:64px}.wrap{max-width:1200px;margin:0 auto;padding:0 28px}.hero{background:linear-gradient(105deg,#071b33,#0d2c52);color:#fff;padding:58px 0;border-bottom:4px solid #f47b20}.kicker,.label{font-size:.78rem;font-weight:900;letter-spacing:.12em;color:#f47b20;margin-bottom:9px}.hero h1{font-size:clamp(2.4rem,4.5vw,3.7rem);line-height:1.08;margin:0 0 16px}.hero p{max-width:900px;font-size:1.08rem;line-height:1.75;color:#d9e4ef}.section{padding-top:48px}.section h2{color:#0b2545;font-size:2rem;margin:0 0 10px}.intro,.method p{max-width:930px;line-height:1.7;color:#526579}.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;margin-top:26px}.card{border:1px solid #d5dee7;border-radius:10px;padding:24px 25px;min-height:220px;display:flex;flex-direction:column;text-decoration:none;color:#17273a;background:#fff}.card.available{border-top:5px solid #f47b20}.card.available:hover{border-color:#f47b20;box-shadow:0 8px 24px rgba(11,37,69,.09);transform:translateY(-1px)}.status{font-size:.72rem;font-weight:900;letter-spacing:.1em;color:#f47b20;margin-bottom:9px}.card h3{font-size:1.35rem;color:#0b2545;margin:0 0 10px}.description{line-height:1.55;color:#526579;margin:0 0 14px}.included{border-top:1px solid #e3e8ee;padding-top:12px;margin-bottom:18px;color:#526579;font-size:.9rem;line-height:1.55}.included strong{display:block;color:#0b2545;margin-bottom:4px}.included span{display:block}.browse{margin-top:auto;color:#1c4587;font-weight:800}.method{margin-top:18px;background:#f5f7fa;border-left:5px solid #f47b20;padding-top:30px;padding-bottom:30px}.inventory-link{display:inline-block;margin-top:7px;color:#1c4587;font-weight:800;text-decoration:none}.inventory-link:hover{text-decoration:underline}@media(max-width:800px){.wrap{padding-left:18px;padding-right:18px}.grid{grid-template-columns:1fr}.hero{padding:44px 0}}</style>