<template><main class="page"><section class="hero"><div class="wrap"><div class="kicker">UMS MACHINERY SPECIFICATION LIBRARY</div><div class="crumb"><NuxtLink to="/spec-library">Spec Library</NuxtLink> / <NuxtLink to="/spec-library/engine-lathes">Engine Lathes, Mills &amp; Drills</NuxtLink> / <NuxtLink :to="'/spec-library/'+maker?.slug+'/engine-lathes'">{{maker?.name}}</NuxtLink> / {{model?.name}}</div><h1>{{maker?.name}} {{model?.name}} Specifications</h1><p>Historical specifications shown separately by year and exact recorded configuration.</p></div></section><section v-if="model" class="wrap section"><h2>Historical {{model.name}} Specifications by Year</h2><p class="intro">Choose a recorded year below. Each configuration is joined to specifications only by its exact historical InvID.</p><HistoricalSpecConfigurations :configurations="configurations"/></section><section v-else class="wrap section"><h2>Model not found</h2><NuxtLink to="/spec-library/engine-lathes">Return to library</NuxtLink></section></main></template>
<script setup>
import a from '~/assets/data/engine-library-a-c.js'
import d from '~/assets/data/engine-library-d-h.js'
import i from '~/assets/data/engine-library-i-m.js'
import n from '~/assets/data/engine-library-n-r.js'
import s from '~/assets/data/engine-library-s-t.js'
import u from '~/assets/data/engine-library-u-z.js'
import { mergeSpecLibrary } from '~/utils/mergeSpecLibrary'
import { historicalConfigurations } from '~/utils/historicalSpecLibrary'
const route=useRoute()
const library=mergeSpecLibrary([a,d,i,n,s,u])
const maker=computed(()=>library.find(x=>x.slug===route.params.manufacturer))
const model=computed(()=>maker.value?.models.find(x=>x.slug===route.params.model))
const configurations=computed(()=>maker.value&&model.value?historicalConfigurations({manufacturer:maker.value.name,model:model.value.name}):[])
if(!maker.value||!model.value)setResponseStatus(404)
useSeoMeta({title:()=>maker.value&&model.value?`${maker.value.name} ${model.value.name} Specifications | UMS Spec Library`:'Machine Specifications | UMS',description:()=>maker.value&&model.value?`Historical ${maker.value.name} ${model.value.name} specifications by year from exact UMS machinery records.`:'Historical machinery specifications.'})
const canonical=computed(()=>`https://www.usedmachinerysource.com/spec-library/${route.params.manufacturer}/engine-lathes/${route.params.model}`)
useHead(()=>({link:[{rel:'canonical',href:canonical.value}]}))
</script>
<style scoped>
.page{color:#17273a;background:#fff;padding-bottom:70px}.wrap{max-width:1120px;margin:0 auto;padding:0 28px}.hero{background:linear-gradient(105deg,#071b33,#0d2c52);color:#fff;padding:48px 0;border-bottom:4px solid #f47b20}.kicker{color:#f47b20;font-size:.78rem;font-weight:900;letter-spacing:.12em}.crumb{color:#c9d7e6;margin:10px 0 16px}.crumb a{color:#fff}.hero h1{font-size:clamp(2rem,4vw,3rem);margin:0 0 12px}.section{padding-top:42px}.section>h2{color:#0b2545;margin:0 0 12px}.intro{line-height:1.7;max-width:900px;color:#526579}@media(max-width:760px){.wrap{padding:0 18px}}
</style>