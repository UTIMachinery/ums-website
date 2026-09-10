<template>
  <ManufacturerCncLatheLibrary
    manufacturer="Mori-Seiki"
    heading-manufacturer="Mori-Seiki / DMG MORI"
    route-slug="mori-seiki"
    :aliases="['Mori Seiki','DMG Mori','DMG MORI','DMG-Mori','DMG Mori Seiki','DMG MORI SEIKI']"
    :entries="entries"
    historical-note="Mori Seiki is now part of DMG MORI. This UMS specification library preserves the Mori-Seiki name for machines originally manufactured and commonly identified under the Mori-Seiki brand, while the current-inventory section also includes matching DMG MORI turning machines."
  />
</template>
<script setup>
import entries from '~/assets/data/moriseiki-historical-detailed.js'
</script>
