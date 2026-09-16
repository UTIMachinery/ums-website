<template><ManufacturerCncLatheLibrary :manufacturer="manufacturer" :manufacturer-slug="manufacturerSlug" /></template>
<script setup>
import { historicalManufacturers } from '~/utils/historicalSpecLibrary'
const route=useRoute()
const manufacturerSlug=String(route.params.manufacturer||'')
const slug=v=>String(v||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')
const isLathe=m=>String(m.Groups||'').toLowerCase().includes('cnc lathe')||String(m.WebDesc||m.Web_Desc||'').toLowerCase().includes('turning center')
const manufacturer=historicalManufacturers({machineFilter:isLathe}).find(name=>slug(name)===manufacturerSlug)
if(!manufacturer)throw createError({statusCode:404,statusMessage:'CNC lathe manufacturer not found'})
</script>