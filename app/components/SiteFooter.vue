<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <section class="footer-brand">
        <img src="/Images/ums-logo.png" alt="Used Machinery Source" class="footer-logo" loading="lazy">
        <p>Buying, selling and sourcing quality used CNC machinery throughout the United States.</p>
        <div class="footer-contact">
          <a href="tel:+12569801200">(256) 980-1200</a>
          <a href="mailto:jon@usedms.com">jon@usedms.com</a>
          <span>Florence, Alabama</span>
        </div>
      </section>

      <nav aria-label="Used machinery categories">
        <h2>Machinery</h2>
        <NuxtLink to="/equipment">Current Equipment</NuxtLink>
        <NuxtLink to="/equipment/type/cnc-lathes-turning-centers">CNC Lathes &amp; Turning Centers</NuxtLink>
        <NuxtLink to="/equipment/type/vertical-machining-centers">Vertical Machining Centers</NuxtLink>
        <NuxtLink to="/equipment/type/horizontal-machining-centers">Horizontal Machining Centers</NuxtLink>
        <NuxtLink to="/equipment/type/vertical-boring-mills-vtls">VTLs &amp; Vertical Boring Mills</NuxtLink>
        <NuxtLink to="/equipment/type/grinders-lappers-hones">Grinders</NuxtLink>
      </nav>

      <nav aria-label="Popular machinery manufacturers">
        <h2>Manufacturers</h2>
        <NuxtLink to="/equipment/manufacturer/haas">Used Haas Machines</NuxtLink>
        <NuxtLink to="/equipment/manufacturer/mazak">Used Mazak Machines</NuxtLink>
        <NuxtLink to="/equipment/manufacturer/doosan">Used Doosan / DN Solutions</NuxtLink>
        <NuxtLink to="/equipment/manufacturer/hurco">Used Hurco Machines</NuxtLink>
        <NuxtLink to="/equipment/manufacturer/mori-seiki">Used Mori-Seiki / DMG MORI</NuxtLink>
        <NuxtLink to="/equipment/manufacturer/okuma">Used Okuma Machines</NuxtLink>
      </nav>

      <nav aria-label="Used Machinery Source resources">
        <h2>Resources</h2>
        <NuxtLink to="/spec-library/cnc-lathes">CNC Lathe Spec Library</NuxtLink>
        <NuxtLink to="/wanted">Wanted Machinery</NuxtLink>
        <NuxtLink to="/sell-your-machine">Sell Your Machine</NuxtLink>
        <NuxtLink to="/services">Services</NuxtLink>
        <NuxtLink to="/about">About UMS</NuxtLink>
        <NuxtLink to="/contact">Contact</NuxtLink>
      </nav>
    </div>

    <div class="footer-bottom">
      <span>© {{ year }} Used Machinery Source, LLC</span>
      <div>
        <a href="https://www.facebook.com/UsedMachinerySource" target="_blank" rel="noopener">Facebook</a>
        <a href="https://www.youtube.com/@usedmachinerysource" target="_blank" rel="noopener">YouTube</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.site-footer{margin-top:0;background:#061526;color:#dce5ef;border-top:4px solid #f36c21}.footer-inner{max-width:1400px;margin:0 auto;padding:44px 36px 36px;display:grid;grid-template-columns:1.35fr repeat(3,1fr);gap:38px}.footer-logo{width:250px;max-width:100%;height:auto;background:#fff;border-radius:4px}.footer-brand p{max-width:360px;line-height:1.6;color:#c7d2df}.footer-contact{display:flex;flex-direction:column;gap:6px}.footer-contact a,.footer-contact span{color:#fff;text-decoration:none;font-weight:700}.site-footer h2{margin:0 0 12px;color:#fff;font-size:16px}.site-footer nav{display:flex;flex-direction:column;gap:8px}.site-footer nav a{color:#cbd7e4;text-decoration:none;font-size:14px;line-height:1.4}.site-footer nav a:hover,.footer-bottom a:hover{color:#f36c21}.footer-bottom{border-top:1px solid #20354d;max-width:1400px;margin:0 auto;padding:18px 36px 24px;display:flex;justify-content:space-between;gap:20px;color:#9fb0c1;font-size:13px}.footer-bottom div{display:flex;gap:16px}.footer-bottom a{color:#cbd7e4;text-decoration:none}@media(max-width:1000px){.footer-inner{grid-template-columns:1fr 1fr}.footer-brand{grid-column:1/-1}}@media(max-width:600px){.footer-inner{grid-template-columns:1fr;padding:34px 20px 28px}.footer-brand{grid-column:auto}.footer-bottom{padding:18px 20px 24px;flex-direction:column}}
</style>
