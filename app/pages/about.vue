<template>
  <main class="page">
    <section class="page-hero">
      <div class="hero-photo" aria-hidden="true"></div>
      <div class="hero-fade" aria-hidden="true"></div>
      <div class="wrap hero-content">
        <div class="hero-copy">
          <p class="eyebrow">ABOUT USED MACHINERY SOURCE</p>
          <h1>Experience You Can Rely On.</h1>
          <p class="lead">Straightforward information, responsive service and decades of experience helping manufacturers buy, sell and locate used CNC machinery.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap two-col">
        <div>
          <p class="eyebrow dark">WHO WE ARE</p>
          <h2>Built Around the Way Machinery Business Should Be Done.</h2>
          <p>Used Machinery Source works with manufacturers throughout the United States to buy, sell and locate quality used CNC machinery. Our focus is simple: provide accurate information, communicate clearly and make the process easier for the people on both sides of a machinery transaction.</p>
          <p>Whether you are searching for a specific machine, moving surplus equipment or evaluating a larger plant project, you work directly with someone who understands the machinery and the market.</p>
        </div>
        <aside class="experience-card">
          <span>Since 1989</span>
          <strong>35+ Years</strong>
          <p>of hands-on experience in the used machinery industry.</p>
        </aside>
      </div>
    </section>

    <section class="section light">
      <div class="wrap">
        <div class="section-heading">
          <p class="eyebrow dark">WHAT MATTERS TO US</p>
          <h2>A Better Way to Buy and Sell Used Machinery.</h2>
        </div>
        <div class="values">
          <article><span>01</span><h3>Accurate Information</h3><p>Clear machine details, specifications and photos so you can make informed decisions.</p></article>
          <article><span>02</span><h3>Honest Guidance</h3><p>Practical answers based on experience—not pressure to make a transaction happen.</p></article>
          <article><span>03</span><h3>Responsive Service</h3><p>Direct communication and timely follow-up when you have a question or opportunity.</p></article>
        </div>
      </div>
    </section>

    <section class="cta"><div class="wrap cta-inner"><div><h2>Have a Machinery Need?</h2><p>Tell us what you are looking for—or what you have available.</p></div><div class="cta-actions"><NuxtLink to="/equipment" class="btn light-btn">Search Equipment</NuxtLink><NuxtLink to="/contact" class="btn orange-btn">Contact Us</NuxtLink></div></div></section>
  </main>
</template>

<script setup>
useSeoMeta({title:'About Used Machinery Source | Used CNC Machinery',description:'Learn about Used Machinery Source and our decades of experience helping manufacturers buy, sell and locate used CNC machinery.'})
</script>

<style scoped>
.page{color:#1a2532}.wrap{max-width:1280px;margin:0 auto;padding-left:40px;padding-right:40px}.page-hero{position:relative;min-height:430px;overflow:hidden;background:#061526;color:#fff}.hero-photo{position:absolute;inset:0 0 0 36%;background-image:url('/Images/about-jonathan-lester.png');background-size:cover;background-position:center 34%;background-repeat:no-repeat}.hero-fade{position:absolute;inset:0;background:linear-gradient(90deg,#061526 0%,#061526 34%,rgba(6,21,38,.97) 44%,rgba(6,21,38,.72) 58%,rgba(6,21,38,.20) 76%,rgba(6,21,38,0) 100%)}.hero-content{position:relative;z-index:2;min-height:430px;display:flex;align-items:center}.hero-copy{max-width:660px;padding:44px 0}.eyebrow{margin:0 0 15px;color:#f36c21;font-size:14px;font-weight:800;letter-spacing:1.5px}.eyebrow.dark{color:#d75b16}.page-hero h1{font-size:clamp(42px,4.7vw,62px);line-height:1.04;margin:0 0 20px}.lead{max-width:610px;font-size:20px;line-height:1.6;color:#dce4ed}.section{padding:78px 0}.section.light{background:#f4f6f8}.two-col{display:grid;grid-template-columns:1.5fr .65fr;gap:90px;align-items:center}.section h2{color:#082b5c;font-size:36px;line-height:1.18;margin:0 0 24px}.section p{font-size:17px;line-height:1.75;color:#46505d}.experience-card{background:#082b5c;color:#fff;padding:40px;border-top:5px solid #f36c21}.experience-card span{display:block;color:#f9a06e;font-weight:700}.experience-card strong{display:block;font-size:46px;margin:8px 0}.experience-card p{color:#fff;margin:0}.section-heading{max-width:720px;margin-bottom:38px}.values{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}.values article{background:#fff;padding:34px;border:1px solid #e0e4e8}.values span{color:#f36c21;font-weight:800}.values h3{color:#082b5c;font-size:22px;margin:12px 0}.values p{font-size:16px;margin:0}.cta{background:#0b315f;color:#fff;padding:46px 0}.cta-inner{display:flex;align-items:center;justify-content:space-between;gap:30px}.cta h2{margin:0 0 8px;font-size:30px}.cta p{margin:0;color:#dce5ef}.cta-actions{display:flex;gap:12px}.btn{display:inline-flex;min-height:50px;padding:0 22px;align-items:center;justify-content:center;text-decoration:none;font-weight:800;border-radius:3px}.light-btn{background:#fff;color:#082b5c}.orange-btn{background:#f36c21;color:#fff}
@media(max-width:1000px){.hero-photo{inset:0 0 0 30%;background-position:center 32%}.hero-fade{background:linear-gradient(90deg,#061526 0%,#061526 30%,rgba(6,21,38,.95) 46%,rgba(6,21,38,.58) 66%,rgba(6,21,38,.08) 86%,rgba(6,21,38,0) 100%)}}
@media(max-width:800px){.wrap{padding-left:22px;padding-right:22px}.page-hero,.hero-content{min-height:520px}.hero-photo{inset:170px 0 0 0;background-position:center 22%}.hero-fade{background:linear-gradient(180deg,#061526 0%,#061526 36%,rgba(6,21,38,.92) 50%,rgba(6,21,38,.38) 70%,rgba(6,21,38,.05) 100%)}.hero-content{align-items:flex-start}.hero-copy{padding:42px 0 0;max-width:100%}.lead{font-size:18px;max-width:560px}.two-col{grid-template-columns:1fr;gap:35px}.values{grid-template-columns:1fr}.cta-inner{align-items:flex-start;flex-direction:column}.section{padding:55px 0}.section h2{font-size:30px}}
</style>
