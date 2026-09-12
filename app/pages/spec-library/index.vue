<template>
  <main class="page">
    <section class="hero">
      <div class="wrap">
        <div class="kicker">UMS MACHINERY SPECIFICATION LIBRARY</div>
        <h1>Machine Specification Library</h1>
        <p>Research historical machine specifications by machine type, manufacturer, model and year. These reference pages are built from Used Machinery Source historical machine records and are separate from current equipment-for-sale listings.</p>
      </div>
    </section>

    <section class="wrap section">
      <div class="label">BROWSE BY MACHINE TYPE</div>
      <h2>Historical Machine Specifications</h2>
      <p class="intro">Choose a machine category to browse manufacturer and model specifications. Additional machine categories will be added as their historical data is reviewed and organized.</p>

      <div class="grid">
        <NuxtLink to="/spec-library/cnc-lathes" class="card available">
          <div class="status">AVAILABLE</div>
          <h3>CNC Lathes &amp; Turning Centers</h3>
          <p>Historical turning-center specifications organized by manufacturer, model and year/configuration.</p>
          <span>Browse CNC Lathe Specifications →</span>
        </NuxtLink>

        <NuxtLink to="/spec-library/vmcs" class="card available">
          <div class="status">AVAILABLE</div>
          <h3>Vertical Machining Centers (VMC)</h3>
          <p>Historical VMC specifications including travels, table data, spindle information, tooling and controls.</p>
          <span>Browse VMC Specifications →</span>
        </NuxtLink>

        <article class="card upcoming">
          <div class="status">IN DEVELOPMENT</div>
          <h3>Horizontal Machining Centers (HMC)</h3>
          <p>Historical horizontal machining center specifications will be organized by manufacturer, model and year/configuration.</p>
        </article>

        <article class="card upcoming">
          <div class="status">IN DEVELOPMENT</div>
          <h3>Vertical Boring Mills / Vertical Turret Lathes</h3>
          <p>VBM and VTL machines will share one historical specification library, organized by manufacturer and model.</p>
        </article>

        <article class="card upcoming">
          <div class="status">IN DEVELOPMENT</div>
          <h3>Horizontal Boring Mills (HBM)</h3>
          <p>Historical HBM specifications will include manufacturer, model and machine style such as table type or floor type.</p>
        </article>
      </div>
    </section>

    <section class="wrap section method">
      <div class="label">ABOUT THE LIBRARY</div>
      <h2>Historical reference data, not current inventory</h2>
      <p>The UMS Spec Library is intended to help buyers, sellers and machinery professionals research machine models that may no longer be represented in current manufacturer literature. Specifications can vary by year, control, spindle package, options and configuration, so year-specific differences are preserved whenever the historical records support them.</p>
      <NuxtLink to="/equipment" class="inventory-link">Looking for machines currently for sale? View Equipment →</NuxtLink>
    </section>
  </main>
</template>

<script setup>
useSeoMeta({
  title: 'Machine Specification Library | Used Machinery Source',
  description: 'Research historical CNC machine specifications by machine type, manufacturer, model and year in the Used Machinery Source Spec Library.'
})
useHead({link:[{rel:'canonical',href:'https://www.usedmachinerysource.com/spec-library'}]})
</script>

<style scoped>
.page{color:#17273a;background:#fff;padding-bottom:64px}.wrap{max-width:1200px;margin:0 auto;padding:0 28px}.hero{background:linear-gradient(105deg,#071b33,#0d2c52);color:#fff;padding:58px 0;border-bottom:4px solid #f47b20}.kicker,.label{font-size:.78rem;font-weight:900;letter-spacing:.12em;color:#f47b20;margin-bottom:9px}.hero h1{font-size:clamp(2.4rem,4.5vw,3.7rem);line-height:1.08;margin:0 0 16px}.hero p{max-width:900px;font-size:1.08rem;line-height:1.75;color:#d9e4ef}.section{padding-top:48px}.section h2{color:#0b2545;font-size:2rem;margin:0 0 10px}.intro,.method p{max-width:930px;line-height:1.7;color:#526579}.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;margin-top:26px}.card{border:1px solid #d5dee7;border-radius:10px;padding:24px 25px;min-height:190px;display:flex;flex-direction:column;text-decoration:none;color:#17273a;background:#fff}.card.available{border-top:5px solid #f47b20}.card.available:hover{border-color:#f47b20;box-shadow:0 8px 24px rgba(11,37,69,.09);transform:translateY(-1px)}.card.upcoming{background:#f7f9fb;border-top:5px solid #aeb9c5}.status{font-size:.72rem;font-weight:900;letter-spacing:.1em;color:#f47b20;margin-bottom:9px}.upcoming .status{color:#68798a}.card h3{font-size:1.35rem;color:#0b2545;margin:0 0 10px}.card p{line-height:1.6;color:#526579;margin:0 0 18px}.card span{margin-top:auto;color:#1c4587;font-weight:800}.method{margin-top:18px;background:#f5f7fa;border-left:5px solid #f47b20;padding-top:30px;padding-bottom:30px}.inventory-link{display:inline-block;margin-top:7px;color:#1c4587;font-weight:800;text-decoration:none}.inventory-link:hover{text-decoration:underline}@media(max-width:800px){.wrap{padding-left:18px;padding-right:18px}.grid{grid-template-columns:1fr}.hero{padding:44px 0}}
</style>