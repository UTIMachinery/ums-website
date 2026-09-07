<template><HaasHistoricalModelPage v-if="entry" :entry="entry"/><main v-else class="missing"><h1>Haas model not found</h1><NuxtLink to="/spec-library/haas/cnc-lathes">Browse Haas CNC lathes</NuxtLink></main></template>
<script setup>
import p1 from '~/assets/data/haasHistoricalModels1.json'
import p2 from '~/assets/data/haasHistoricalModels2.json'
import p3 from '~/assets/data/haasHistoricalModels3.json'
import p4 from '~/assets/data/haasHistoricalModels4.json'
const route=useRoute(); const all=[...p1,...p2,...p3,...p4]; const entry=computed(()=>all.find(x=>x.slug===route.params.model && x.records.some(r=>r.summary?.trim())))
if(!entry.value) setResponseStatus(404)
</script>
<style scoped>.missing{max-width:900px;margin:0 auto;padding:60px 24px}.missing a{color:#1c4587;font-weight:700}</style>