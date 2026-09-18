<template><ManufacturerCncLatheLibrary :manufacturer="manufacturer" :route-slug="manufacturerSlug" /></template>
<script setup>
import { historicalManufacturers } from '~/utils/historicalSpecLibrary'
const route=useRoute()
const manufacturerSlug=String(route.params.manufacturer||'')
const slug=v=>String(v||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')
const isLathe=m=>String(m.WebDesc||m.Web_Desc||'').trim().toLowerCase().startsWith('cnc lathes')
const manufacturer=historicalManufacturers({machineFilter:isLathe}).find(name=>slug(name)===manufacturerSlug)
if(!manufacturer)throw createError({statusCode:404,statusMessage:'CNC lathe manufacturer not found'})
</script>