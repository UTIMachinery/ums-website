<template><HaasHistoricalModelPage v-if="entry" :entry="entry"/><main v-else class="missing"><h1>Haas model not found</h1><NuxtLink to="/spec-library/haas/cnc-lathes">Browse Haas CNC lathes</NuxtLink></main></template>
<script setup>
import haasDetailed from '~/assets/data/haas-historical-detailed.js'
const route=useRoute()
const entry=computed(()=>haasDetailed.find(x=>x.slug===route.params.model && x.records.some(r=>r.specs?.length||r.recordedSpecs?.trim())))
if(!entry.value) setResponseStatus(404)
</script>
<style scoped>.missing{max-width:900px;margin:0 auto;padding:60px 24px}.missing a{color:#1c4587;font-weight:700}</style>