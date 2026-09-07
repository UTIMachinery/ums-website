<template><section class="single-record"><div class="kicker">MORE EXACT MODEL DESIGNATIONS</div><h2>Additional Mazak Historical Models</h2><p class="intro">These pages cover additional exact model designations from UMS historical records, including single-record machines and punctuation or spacing variants that would otherwise collapse to the same URL. Each page shows only the specifications actually recorded for that exact designation.</p><details><summary>Browse {{ models.length }} additional Mazak model pages</summary><div class="links"><NuxtLink v-for="item in models" :key="item.slug" :to="`/spec-library/mazak/${item.slug}`">{{ item.model }} →</NuxtLink></div></details></section></template>
<script setup>
import part1 from '~/assets/data/mazak-historical-single-1.js'
import part2 from '~/assets/data/mazak-historical-single-2.js'
import part3 from '~/assets/data/mazak-historical-single-3.js'
import part4 from '~/assets/data/mazak-historical-single-4.js'
import collisions1 from '~/assets/data/mazak-historical-collision-1.js'
import collisions2 from '~/assets/data/mazak-historical-collision-2.js'
const excluded=new Set(['kfhgkdfj'])
const models=[...part1,...part2,...part3,...part4,...collisions1,...collisions2].filter(x=>!excluded.has(x.slug)).sort((a,b)=>a.model.localeCompare(b.model))
</script>
<style scoped>.single-record{padding:46px 0}.kicker{font-size:.78rem;font-weight:800;letter-spacing:.12em;color:#1c5a94;margin:0 0 8px}.single-record h2{font-size:2rem;margin:0 0 14px;color:#17273a}.intro{max-width:980px;line-height:1.7;color:#17273a}details{margin-top:22px;border:1px solid #cfd9e3;border-radius:10px;background:#fff}summary{cursor:pointer;padding:17px 20px;font-weight:900;color:#1c4587}.links{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px 16px;padding:0 20px 22px}.links a{color:#1c4587;text-decoration:none;font-weight:700;border-bottom:1px solid #e4e9ee;padding:9px 0}.links a:hover{text-decoration:underline}@media(max-width:850px){.links{grid-template-columns:1fr}}</style>