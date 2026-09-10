<template><MazakHistoricalModelPage v-if="item" :model="item.model" :configurations="configurations" /></template>
<script setup>
import part1 from '~/assets/data/mazak-historical-single-1.js'
import part2 from '~/assets/data/mazak-historical-single-2.js'
import part3 from '~/assets/data/mazak-historical-single-3.js'
import part4 from '~/assets/data/mazak-historical-single-4.js'
import collisions1 from '~/assets/data/mazak-historical-collision-1.js'
import collisions2 from '~/assets/data/mazak-historical-collision-2.js'
const route=useRoute();const excluded=new Set(['kfhgkdfj']);const all=[...part1,...part2,...part3,...part4,...collisions1,...collisions2];const item=all.find(x=>x.slug===route.params.slug&&!excluded.has(x.slug));if(!item)throw createError({statusCode:404,statusMessage:'Mazak model not found'});const configurations=item.configurations||[{year:item.year,title:`${item.year} Mazak ${item.model}`,control:item.control,recordedSpecs:item.recordedSpecs,note:'This page is based on one historical UMS machine record. Verify specifications for the exact machine, serial number and configuration.'}];useSeoMeta({title:`Mazak ${item.model} Specifications | UMS Spec Library`,description:`Historical Mazak ${item.model} specifications from UMS machinery records. Specifications may vary by year and configuration.`});const canonical=`https://www.usedmachinerysource.com/spec-library/mazak/${item.slug}`
const structuredData={
  '@context':'https://schema.org',
  '@graph':[
    {
      '@type':'TechArticle',
      headline:`Mazak ${item.model} Specifications`,
      description:`Historical Mazak ${item.model} specifications from UMS machinery records. Specifications may vary by year and configuration.`,
      url:canonical,
      mainEntityOfPage:canonical,
      publisher:{'@id':'https://www.usedmachinerysource.com/#organization'},
      inLanguage:'en-US'
    },
    {
      '@type':'BreadcrumbList',
      itemListElement:[
        {'@type':'ListItem',position:1,name:'Home',item:'https://www.usedmachinerysource.com/'},
        {'@type':'ListItem',position:2,name:'CNC Lathe Spec Library',item:'https://www.usedmachinerysource.com/spec-library/cnc-lathes'},
        {'@type':'ListItem',position:3,name:'Mazak CNC Lathes',item:'https://www.usedmachinerysource.com/spec-library/mazak/cnc-lathes'},
        {'@type':'ListItem',position:4,name:`Mazak ${item.model} Specifications`,item:canonical}
      ]
    }
  ]
}
useHead({
  htmlAttrs:{lang:'en'},
  link:[{rel:'canonical',href:canonical}],
  script:[{type:'application/ld+json',children:JSON.stringify(structuredData)}]
})
</script>