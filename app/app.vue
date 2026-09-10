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

const globalStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.usedmachinerysource.com/#organization',
      name: 'Used Machinery Source',
      legalName: 'Used Machinery Source, LLC',
      url: 'https://www.usedmachinerysource.com/',
      logo: 'https://www.usedmachinerysource.com/Images/ums-logo.png',
      telephone: '+1-256-980-1200',
      email: 'jon@usedms.com',
      sameAs: [
        'https://www.facebook.com/UsedMachinerySource',
        'https://www.youtube.com/@usedmachinerysource'
      ]
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.usedmachinerysource.com/#website',
      url: 'https://www.usedmachinerysource.com/',
      name: 'Used Machinery Source',
      publisher: { '@id': 'https://www.usedmachinerysource.com/#organization' },
      inLanguage: 'en-US'
    }
  ]
}

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(globalStructuredData)
    }
  ]
})

const showEquipmentDetailCta = computed(() =>
  /^\/equipment\/[^/]+\/[^/]+/.test(route.path)
)
const showMazakIndex = computed(() => route.path === '/spec-library/mazak/cnc-lathes')
</script>

<style>
.form-required-note{color:#b42318!important;font-weight:800!important}
.required-field-label{color:#b42318!important}
.required-field-label input,.required-field-label select,.required-field-label textarea{color:#1b2632}
</style>

<style scoped>.mazak-single-wrap{max-width:1260px;margin:0 auto;padding:0 28px 40px}@media(max-width:850px){.mazak-single-wrap{padding:0 18px 30px}}</style>