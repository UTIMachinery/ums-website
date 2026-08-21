<template>
  <header class="site-header">
    <div class="header-inner">
      <a href="/" class="logo-link">
        <img
          src="/Images/ums-logo.png"
          alt="Used Machinery Source"
          class="logo"
        />
      </a>

      <div class="header-right">
        <nav :class="{ 'mobile-open': menuOpen }">
          <a href="https://www.usedmachinerysource.com/">Home</a>
          <a href="https://www.usedmachinerysource.com/about">About</a>
          <a href="https://www.usedmachinerysource.com/services">Services</a>
          <a href="/equipment">Equipment</a>
          <a href="https://www.usedmachinerysource.com/sell-your-machine">Sell Your Machine</a>
          <a href="https://www.usedmachinerysource.com/contact">Contact</a>

          <div class="mobile-phone">(256) 980-1200</div>
        </nav>

        <div class="header-phone">(256) 980-1200</div>

        <button
          class="menu-button"
          type="button"
          aria-label="Open navigation menu"
          @click="menuOpen = !menuOpen"
        >
          <span></span>
          <span></span>
          <span></span>
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
.site-header {
  background: #ffffff;
  border-bottom: 1px solid #d9dee5;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 4px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-link {
  display: flex;
  align-items: center;
  height: 100px;
  overflow: hidden;
}

.logo {
  width: 300px;
  height: auto;
  display: block;
  transform: translateY(10px);
}

.header-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

nav {
  display: flex;
  gap: 30px;
  align-items: center;
}

nav a {
  color: #0b2545;
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
}

nav a:hover {
  color: #ff6a00;
}

.header-phone {
  color: #0b2545;
  font-size: 18px;
  font-weight: 600;
}

.menu-button {
  display: none;
}

.mobile-phone {
  display: none;
}

/* Tablet and mobile */
@media (max-width: 900px) {
  .header-inner {
    padding: 4px 20px;
    position: relative;
  }

  .logo-link {
    height: 80px;
  }

  .logo {
    width: 220px;
    transform: translateY(7px);
  }

  .header-phone {
    display: none;
  }

  .header-right {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .menu-button {
    display: flex;
    width: 44px;
    height: 44px;
    padding: 8px;
    border: none;
    background: transparent;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
    cursor: pointer;
  }

  .menu-button span {
    display: block;
    width: 28px;
    height: 3px;
    background: #0b2545;
  }

  nav {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #ffffff;
    border-top: 1px solid #d9dee5;
    border-bottom: 1px solid #d9dee5;
    padding: 12px 20px 18px;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
  }

  nav.mobile-open {
    display: flex;
  }

  nav a {
    padding: 12px 4px;
    font-size: 17px;
    border-bottom: 1px solid #e5e8ec;
  }

  .mobile-phone {
    display: block;
    color: #0b2545;
    font-size: 18px;
    font-weight: 600;
    padding: 14px 4px 4px;
  }
}
</style>