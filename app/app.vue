<template>
  <div>
    <SiteHeader />
    <NuxtPage />
    <EquipmentFooterCta v-if="showEquipmentDetailCta" />
  </div>
</template>

<script setup>
const route = useRoute()

const showEquipmentDetailCta = computed(() =>
  /^\/equipment\/[^/]+\/[^/]+/.test(route.path)
)
</script>