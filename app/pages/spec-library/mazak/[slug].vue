<template><MazakHistoricalModelPage v-if="item" :model="item.model" :configurations="configurations" /></template>
<script setup>
import p1 from '~/assets/data/mazak-full-specs-1.js'
import p2 from '~/assets/data/mazak-full-specs-2.js'
import p3 from '~/assets/data/mazak-full-specs-3.js'
import p4 from '~/assets/data/mazak-full-specs-4.js'
import p5 from '~/assets/data/mazak-full-specs-5.js'
import p6 from '~/assets/data/mazak-full-specs-6.js'
import p7 from '~/assets/data/mazak-full-specs-7.js'
const route=useRoute()
const excluded=new Set(['kfhgkdfj'])
const raw=[...p1,...p2,...p3,...p4,...p5,...p6,...p7]
const hit=raw.find(x=>x[1]===route.params.slug&&!excluded.has(x[1]))
if(!hit)throw createError({statusCode:404,statusMessage:'Mazak model not found'})
const item={model:hit[0],slug:hit[1]}
const configurations=(hit[2]||[]).map(c=>({
  invId:c[0],
  year:c[1],
  control:c[2],
  title:`${c[1]||'Historical'} Mazak ${hit[0]}`,
  specs:(c[3]||[]).map(s=>({description:s[0],specvalues:s[1],label:s[0],value:s[1],group:s[2]||''})),
  equippedWith:c[4]||[],
  note:'Historical UMS machine record. Verify specifications for the exact machine, serial number and configuration.'
}))
useSeoMeta({title:`Mazak ${item.model} Specifications | UMS Spec Library`,description:`Historical Mazak ${item.model} specifications from UMS machinery records. Specifications may vary by year and configuration.`});const canonical=`https://www.usedmachinerysource.com/spec-library/mazak/${item.slug}`
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