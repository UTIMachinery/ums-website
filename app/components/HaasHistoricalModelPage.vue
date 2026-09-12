<template><main class="model-page" v-if="entry"><section class="hero"><div class="wrap"><NuxtLink to="/spec-library/haas/cnc-lathes" class="back">← Haas CNC Lathe Library</NuxtLink><div class="kicker">UMS MACHINERY SPECIFICATION LIBRARY</div><h1>Haas {{ entry.model }} Specifications</h1><p>Historical Haas {{ entry.model }} CNC turning specifications organized by year and control from UMS machinery records.</p></div></section><section class="wrap section"><div class="warning"><strong>Historical specification information — not a machine-for-sale listing.</strong> These are specifications recorded on individual machines and may vary by year, control, configuration and optional equipment.</div><h2>Historical {{ entry.model }} Specifications by Year</h2><p class="intro">Each block below uses the detailed specification rows recorded for that individual UMS machine. Advertising-summary text is used only when detailed specification rows are unavailable.</p><SpecYearConfigurations :model="`Haas ${entry.model}`" :configurations="configurations" /><SpecInventoryMatches manufacturer="Haas" :model="entry.model" machine-type="lathe" /><section class="cta"><div class="cta-kicker">NEED A MACHINE?</div><h2>Looking for a Haas {{ entry.model }}?</h2><p>Tell Used Machinery Source what you need, or browse the CNC lathes we currently have available.</p><div class="cta-actions"><NuxtLink to="/equipment#tell-us-what-you-need" class="primary">Tell Us What You Need</NuxtLink><NuxtLink to="/equipment" class="secondary">View Current Equipment</NuxtLink></div></section></section></main></template>
<script setup>
import { computed } from 'vue'
const props=defineProps({entry:{type:Object,required:true}})
const configurations=computed(()=>(props.entry.records||[])
  .filter(r=>(r.specs&&r.specs.length)||(r.recordedSpecs&&r.recordedSpecs.trim()))
  .map((r,i)=>({
    year:r.year||'Year not recorded',
    title:`${r.year||'Year not recorded'} Haas ${props.entry.model}${r.fallback?' — recorded summary':''}`,
    control:r.control||'Haas CNC configuration',
    specs:r.specs||[],
    recordedSpecs:r.fallback?r.recordedSpecs:'',
    note:r.fallback?`Historical UMS record #${r.invid}. Detailed specification rows were not available for this record, so its recorded advertising summary is shown instead.`:`Historical UMS record #${r.invid}`
  })))
useSeoMeta({title:()=>`Haas ${props.entry.model} Specifications by Year | UMS Spec Library`,description:()=>`Historical Haas ${props.entry.model} CNC lathe specifications, years, controls and configurations recorded by Used Machinery Source.`})
const canonical=computed(()=>`https://www.usedmachinerysource.com/spec-library/haas/${props.entry.slug}`)
const structuredData=computed(()=>({
  '@context':'https://schema.org',
  '@graph':[
    {
      '@type':'TechArticle',
      headline:`Haas ${props.entry.model} Specifications by Year`,
      description:`Historical Haas ${props.entry.model} CNC lathe specifications, years, controls and configurations recorded by Used Machinery Source.`,
      url:canonical.value,
      mainEntityOfPage:canonical.value,
      publisher:{'@id':'https://www.usedmachinerysource.com/#organization'},
      inLanguage:'en-US'
    },
    {
      '@type':'BreadcrumbList',
      itemListElement:[
        {'@type':'ListItem',position:1,name:'Home',item:'https://www.usedmachinerysource.com/'},
        {'@type':'ListItem',position:2,name:'CNC Lathe Spec Library',item:'https://www.usedmachinerysource.com/spec-library/cnc-lathes'},
        {'@type':'ListItem',position:3,name:'Haas CNC Lathes',item:'https://www.usedmachinerysource.com/spec-library/haas/cnc-lathes'},
        {'@type':'ListItem',position:4,name:`Haas ${props.entry.model} Specifications`,item:canonical.value}
      ]
    }
  ]
}))
useHead(()=>({
  htmlAttrs:{lang:'en'},
  link:[{rel:'canonical',href:canonical.value}],
  script:[{type:'application/ld+json',children:JSON.stringify(structuredData.value)}]
}))
</script>
<style scoped>.model-page{color:#17273a;background:#fff;padding-bottom:60px}.wrap{max-width:1120px;margin:0 auto;padding:0 28px}.hero{background:linear-gradient(105deg,#071b33,#0d2c52);color:#fff;padding:48px 0;border-bottom:4px solid #f47b20}.back{color:#c8d9eb;text-decoration:none}.kicker{color:#f47b20;font-size:.78rem;font-weight:900;letter-spacing:.12em;margin:18px 0 8px}.hero h1{font-size:clamp(2rem,4vw,3.2rem);margin:0 0 12px}.hero p{max-width:820px;line-height:1.7}.section{padding-top:44px}.warning{background:#fff7ea;border-left:5px solid #f47b20;padding:16px 18px;border-radius:6px;margin-bottom:34px}.section>h2{color:#0b2545;margin:34px 0 12px}.intro{line-height:1.7;max-width:900px;color:#526579}.cta{margin-top:46px;padding:30px 32px;background:linear-gradient(105deg,#071b33,#0d2c52);color:#fff;border-radius:10px;border-top:5px solid #f47b20}.cta-kicker{color:#f47b20;font-size:.76rem;font-weight:900;letter-spacing:.12em;margin-bottom:7px}.cta h2{margin:0 0 8px;color:#fff;font-size:1.8rem}.cta p{margin:0 0 12px;line-height:1.6;max-width:760px}.cta-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:12px}.cta a{display:inline-block;text-decoration:none;font-weight:800;padding:11px 16px;border-radius:5px}.cta a.primary{background:#f47b20;color:#fff}.cta a.secondary{background:transparent;color:#fff;border:1px solid #fff}@media(max-width:760px){.wrap{padding:0 18px}.cta{padding:24px 20px}}</style>