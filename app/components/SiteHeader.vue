<template>
  <header class="site-header">
    <div class="header-inner">
      <NuxtLink to="/" class="logo-link" @click="menuOpen = false">
        <img src="/Images/ums-logo.png" alt="Used Machinery Source" class="logo">
      </NuxtLink>

      <div class="header-right">
        <nav :class="{ 'mobile-open': menuOpen }">
          <NuxtLink to="/" @click="menuOpen = false">Home</NuxtLink>
          <NuxtLink to="/about" @click="menuOpen = false">About</NuxtLink>
          <NuxtLink to="/services" @click="menuOpen = false">Services</NuxtLink>
          <NuxtLink to="/equipment" @click="menuOpen = false">Equipment</NuxtLink>
          <NuxtLink to="/wanted" @click="menuOpen = false">Wanted</NuxtLink>
          <NuxtLink to="/sell-your-machine" @click="menuOpen = false">Sell Your Machine</NuxtLink>
          <NuxtLink to="/contact" @click="menuOpen = false">Contact</NuxtLink>
          <a class="mobile-phone" href="tel:+12569801200">(256) 980-1200</a>
        </nav>

        <a class="header-phone" href="tel:+12569801200">(256) 980-1200</a>
        <button class="menu-button" type="button" :aria-expanded="menuOpen" aria-label="Open navigation menu" @click="menuOpen = !menuOpen">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
const menuOpen = ref(false)
</script>

<style scoped>
.site-header{background:#fff;border-bottom:1px solid #d9dee5;position:sticky;top:0;z-index:1000}.header-inner{max-width:1540px;margin:0 auto;padding:4px 32px;display:grid;grid-template-columns:300px 1fr auto;align-items:center;gap:34px}.logo-link{display:flex;align-items:center;height:100px;overflow:hidden}.logo{width:300px;height:auto;display:block;transform:translateY(10px)}.header-right{grid-column:2/4;display:grid;grid-template-columns:1fr auto;align-items:center;gap:44px}nav{display:flex;gap:30px;align-items:center;justify-content:center}nav a{color:#111;text-decoration:none;font-size:17px;font-weight:600;padding-bottom:5px;border-bottom:2px solid transparent;white-space:nowrap}nav a:hover,nav a.router-link-active{color:#ff6a00;border-bottom-color:#ff6a00}.header-phone{color:#0b2545;font-size:18px;font-weight:700;text-decoration:none;white-space:nowrap}.header-phone:hover{color:#ff6a00}.menu-button,.mobile-phone{display:none}
@media(max-width:1200px){.header-inner{grid-template-columns:250px 1fr auto;padding:4px 22px}.logo{width:250px}.header-right{gap:24px}nav{gap:18px}nav a{font-size:15px}.header-phone{font-size:16px}}
@media(max-width:900px){.header-inner{display:flex;padding:4px 20px;position:relative;justify-content:space-between}.logo-link{height:80px}.logo{width:220px;transform:translateY(7px)}.header-right{display:flex;gap:0}.header-phone{display:none}.menu-button{display:flex;width:44px;height:44px;padding:8px;border:0;background:transparent;flex-direction:column;justify-content:center;gap:6px;cursor:pointer}.menu-button span{display:block;width:28px;height:3px;background:#0b2545}nav{display:none;position:absolute;top:100%;left:0;right:0;background:#fff;border-top:1px solid #d9dee5;border-bottom:1px solid #d9dee5;padding:12px 20px 18px;flex-direction:column;align-items:stretch;gap:0}nav.mobile-open{display:flex}nav a{padding:12px 4px;font-size:17px;border-bottom:1px solid #e5e8ec}.mobile-phone{display:block;color:#0b2545;font-size:18px;font-weight:700;padding:14px 4px 4px;border-bottom:0}}
</style>
