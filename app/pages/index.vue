<template>
  <main class="home-page">
    <section class="hero">
      <div class="hero-content">
        <div class="hero-eyebrow"><span></span>BUY • SELL • BROKER</div>
        <h1>Buying &amp; Selling<br>Quality Used<br>CNC Machinery</h1>
        <p class="hero-intro">
          <strong>Your trusted source for used CNC machinery.</strong><br>
          Solutions for all your machinery needs.
        </p>
        <div class="hero-actions">
          <NuxtLink to="/equipment" class="hero-btn hero-btn-primary">Search Equipment</NuxtLink>
          <NuxtLink to="/equipment#tell-us-what-you-need" class="hero-btn hero-btn-light">Tell Us What You Need</NuxtLink>
          <NuxtLink to="/sell-your-machine" class="hero-btn hero-btn-orange">What Do You Have for Sale?</NuxtLink>
        </div>
      </div>

      <div class="hero-image">
        <img src="/Images/home-hero-cnc.webp" alt="CNC turning center machining area">
      </div>
    </section>

    <section class="home-actions">
      <article class="home-action-card">
        <div>
          <h2>Buying a Machine</h2>
          <span class="home-action-line"></span>
          <p>Browse our current inventory of used CNC machinery with detailed specifications, photos and equipment information.</p>
          <NuxtLink to="/equipment" class="home-action-link">Search Equipment →</NuxtLink>
        </div>
      </article>

      <article class="home-action-card">
        <div>
          <h2>Looking for Something?</h2>
          <span class="home-action-line"></span>
          <p>Don’t see what you need? Send us your requirements and we’ll use our industry network to help locate it.</p>
          <NuxtLink to="/equipment#tell-us-what-you-need" class="home-action-link">Tell Us What You Need →</NuxtLink>
        </div>
      </article>

      <article class="home-action-card">
        <div>
          <h2>Have a Machine to Sell?</h2>
          <span class="home-action-line"></span>
          <p>Single machine, surplus equipment or a complete facility—we can help market your machinery to qualified buyers.</p>
          <NuxtLink to="/sell-your-machine" class="home-action-link">What Do You Have for Sale? →</NuxtLink>
        </div>
      </article>
    </section>

    <section class="trust-band">
      <div class="trust-inner">
        <div><strong>35+ Years</strong><span>Industry Experience</span></div>
        <div><strong>Nationwide</strong><span>Buyer &amp; Seller Network</span></div>
        <div><strong>Accurate Information</strong><span>Clear Equipment Details</span></div>
        <div><strong>Personal Service</strong><span>Direct, Responsive Communication</span></div>
      </div>
    </section>
  </main>
</template>

<script setup>
useSeoMeta({
  title: 'Used CNC Machinery | Used Machinery Source',
  description: 'Used Machinery Source helps manufacturers buy, sell and locate quality used CNC machinery throughout North America.',
  ogTitle: 'Used Machinery Source | Used CNC Machinery',
  ogDescription: 'Buying, selling and sourcing quality used CNC machinery.',
  ogType: 'website'
})
</script>

<style scoped>
.home-page{margin:0;padding:0;background:#fff;color:#172033}.hero{min-height:535px;background:#061526;color:#fff;display:grid;grid-template-columns:65% 35%;overflow:hidden}.hero-content{padding:58px 56px 58px 170px;display:flex;flex-direction:column;justify-content:center;max-width:900px}.hero-eyebrow{display:flex;align-items:center;gap:14px;margin-bottom:22px;color:#f36c21;font-size:16px;font-weight:700;letter-spacing:.8px}.hero-eyebrow span{width:44px;height:2px;background:#f36c21}.hero h1{margin:0 0 24px;font-size:clamp(46px,4.4vw,70px);line-height:1.05;font-weight:700;letter-spacing:-1px}.hero-intro{margin:0;font-size:20px;line-height:1.55}.hero-image{width:100%;height:100%;overflow:hidden;position:relative}.hero-image::before{content:"";position:absolute;inset:0;background:#061526;clip-path:polygon(0 0,38% 0,12% 50%,38% 100%,0 100%);z-index:2;pointer-events:none}.hero-image img{width:100%;height:100%;object-fit:cover;object-position:35% center}.hero-actions{display:flex;gap:16px;margin-top:34px;flex-wrap:wrap}.hero-btn{display:inline-flex;align-items:center;justify-content:center;min-height:58px;padding:0 28px;border-radius:4px;font-size:17px;font-weight:700;line-height:1.2;text-decoration:none;white-space:nowrap;transition:transform .18s ease,box-shadow .18s ease}.hero-btn:hover{transform:translateY(-2px);box-shadow:0 7px 18px rgba(0,0,0,.18)}.hero-btn-primary{background:#123c75;color:#fff;border:1px solid #315c91}.hero-btn-light{background:#fff;color:#0b2545;border:1px solid #d7dde5}.hero-btn-orange{background:#f36c21;color:#fff;border:1px solid #f36c21}.home-actions{display:grid;grid-template-columns:repeat(3,1fr);max-width:1440px;margin:0 auto;padding:48px 60px;background:#fff}.home-action-card{padding:10px 42px;border-right:1px solid #d9d9d9}.home-action-card:last-child{border-right:0}.home-action-card h2{margin:2px 0 10px;font-size:27px;line-height:1.15;font-weight:800;color:#082b5c}.home-action-line{display:block;width:40px;height:2px;background:#ff6a00;margin-bottom:14px}.home-action-card p{margin:0 0 16px;color:#3b4350;font-size:16px;line-height:1.55}.home-action-link{color:#082b5c;font-size:16px;font-weight:700;text-decoration:none}.home-action-link:hover{color:#ff6a00}.trust-band{background:#f3f5f7;border-top:1px solid #e2e6ea}.trust-inner{max-width:1360px;margin:0 auto;padding:34px 50px;display:grid;grid-template-columns:repeat(4,1fr);gap:24px;text-align:center}.trust-inner div{padding:6px 18px;border-right:1px solid #d4d9df}.trust-inner div:last-child{border-right:0}.trust-inner strong{display:block;color:#082b5c;font-size:20px;margin-bottom:5px}.trust-inner span{color:#5b6470;font-size:14px}
@media(max-width:1200px){.hero-content{padding-left:80px}.hero{grid-template-columns:62% 38%}.home-actions{padding:38px 24px}.home-action-card{padding:10px 26px}.hero-btn{font-size:15px;padding:0 20px}}
@media(max-width:900px){.hero{grid-template-columns:1fr;min-height:0}.hero-content{max-width:none;padding:54px 28px 44px}.hero h1{font-size:clamp(42px,9vw,58px)}.hero-image{height:320px}.hero-image::before{display:none}.hero-image img{object-position:center}.home-actions{grid-template-columns:1fr;padding:18px 24px}.home-action-card{border-right:0;border-bottom:1px solid #d9d9d9;padding:26px 8px}.home-action-card:last-child{border-bottom:0}.trust-inner{grid-template-columns:1fr 1fr;padding:28px 22px}.trust-inner div{border-right:0}}
@media(max-width:560px){.hero-content{padding:40px 20px}.hero-actions{flex-direction:column}.hero-btn{width:100%;box-sizing:border-box}.hero-image{height:240px}.trust-inner{grid-template-columns:1fr}.hero-intro{font-size:18px}}
</style>
