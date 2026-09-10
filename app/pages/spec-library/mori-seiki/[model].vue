<template><ManufacturerHistoricalModelPage v-if="entry" :entry="entry" manufacturer="Mori-Seiki" route-slug="mori-seiki"/><main v-else class="missing"><h1>Mori-Seiki model not found</h1><NuxtLink to="/spec-library/mori-seiki/cnc-lathes">Browse Mori-Seiki CNC lathes</NuxtLink></main></template>
<script setup>
import entries from '~/assets/data/moriseiki-historical-detailed.js'
const route=useRoute()
const entry=computed(()=>entries.find(x=>x.slug===route.params.model&&x.records.some(r=>r.specs?.length||r.recordedSpecs?.trim())))
if(!entry.value)setResponseStatus(404)
</script>
<style scoped>.missing{max-width:900px;margin:0 auto;padding:60px 24px}.missing a{color:#1c4587;font-weight:700}</style>
