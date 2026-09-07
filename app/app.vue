<template>
  <div>
    <SiteHeader />
    <NuxtPage />
    <div v-if="showMazakIndex" class="mazak-single-wrap"><MazakSingleRecordLinks /></div>
    <EquipmentFooterCta v-if="showEquipmentDetailCta" />
  </div>
</template>

<script setup>
const route = useRoute()

const showEquipmentDetailCta = computed(() =>
  /^\/equipment\/[^/]+\/[^/]+/.test(route.path)
)
const showMazakIndex = computed(() => route.path === '/spec-library/mazak/cnc-lathes')
</script>

<style scoped>.mazak-single-wrap{max-width:1260px;margin:0 auto;padding:0 28px 40px}@media(max-width:850px){.mazak-single-wrap{padding:0 18px 30px}}</style>