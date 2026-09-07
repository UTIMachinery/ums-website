<template><MazakHistoricalModelPage model="M-5" :configurations="configurations" /></template><script setup>
const configurations=[
{year:'1980',title:'1980 Mazak M-5',control:'Fanuc 6T / CRT',recordedSpecs:'24 in swing over bed, 13 in swing over carriage, 80 in between centers.'},
{year:'1983',title:'1983 Mazak M-5 — Mazatrol',control:'Mazatrol T-1 / CRT',recordedSpecs:'24 in swing, 80 in centers, 1,010 RPM, 4.1 in spindle hole, 30 HP, 8 + 4 turret positions, chip conveyor.'},
{year:'1983',title:'1983 Mazak M-5 — Fanuc',control:'Fanuc 6T / CRT',recordedSpecs:'24 in swing over bed, 13 in swing over cross slide, X 22.75 in, Z 101 in, A1-11 spindle nose, 2,200 RPM, 30 HP, chip conveyor, coolant system, tailstock.'},
{year:'1984',title:'1984 Mazak M-5',control:'Fanuc 6TB / CRT',recordedSpecs:'24 in swing, 80 in centers, 6.5 in spindle hole, 30 HP, 2,200 RPM, 8 + 6 turret positions.'},
{year:'1985',title:'1985 Mazak M-5',control:'Fanuc 6TB / CRT',recordedSpecs:'24 in swing, 80 in centers, 4.12 in spindle hole, 30 HP, 2,200 RPM, 8 turret positions.'},
{year:'1992/93',title:'1992/93 Mazak M-5',control:'Mazatrol T32-2 / CRT',recordedSpecs:'24 in swing over bed, 13 in swing over cross slide, 60 in maximum center distance, 8 + 6 turret positions, 4 in spindle bore, 2,200 RPM, 30 HP, 20 in 4-jaw hydraulic chuck.'},
{year:'2000',title:'2000 Mazak M-5',control:'Fanuc CNC Control',recordedSpecs:'22.8 in maximum turning diameter, 24 in swing over bed ways, 13 in swing over cross slide, 82 in centers, X 21.25 in, Z 81 in, 18 in chuck, tailstock, chip conveyor.'}]
useSeoMeta({title:'Mazak M-5 Specifications by Year | UMS Spec Library',description:'Historical Mazak M-5 CNC lathe specifications by year and control from UMS machinery records.'});useHead({link:[{rel:'canonical',href:'https://usedmachinerysource.com/spec-library/mazak/m-5'}]})
</script>