<template><MazakHistoricalModelPage v-if="item" :model="item.model" :configurations="configurations" /></template>
<script setup>
import part1 from '~/assets/data/mazak-historical-single-1.js'
import part2 from '~/assets/data/mazak-historical-single-2.js'
import part3 from '~/assets/data/mazak-historical-single-3.js'
import part4 from '~/assets/data/mazak-historical-single-4.js'
const route=useRoute();const excluded=new Set(['kfhgkdfj']);const all=[...part1,...part2,...part3,...part4];const item=all.find(x=>x.slug===route.params.slug&&!excluded.has(x.slug));if(!item)throw createError({statusCode:404,statusMessage:'Mazak model not found'});const configurations=[{year:item.year,title:`${item.year} Mazak ${item.model}`,control:item.control,recordedSpecs:item.recordedSpecs,note:'This page is based on one historical UMS machine record. Verify specifications for the exact machine, serial number and configuration.'}];useSeoMeta({title:`Mazak ${item.model} Specifications | UMS Spec Library`,description:`Historical Mazak ${item.model} specifications from an individual UMS machinery record. Specifications may vary by year and configuration.`});useHead({link:[{rel:'canonical',href:`https://usedmachinerysource.com/spec-library/mazak/${item.slug}`}]})
</script>