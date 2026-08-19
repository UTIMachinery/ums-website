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
  <nav>
    <a href="https://www.usedmachinerysource.com/">Home</a>
    <a href="https://www.usedmachinerysource.com/about">About</a>
    <a href="https://www.usedmachinerysource.com/services">Services</a>
    <a href="/equipment">Equipment</a>
    <a href="https://www.usedmachinerysource.com/sell-your-machine">Sell Your Machine</a>
    <a href="https://www.usedmachinerysource.com/contact">Contact</a>
  </nav>

  <div class="header-phone">(256) 980-1200</div>
</div>
    </div>
  </header>
</template>

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
.header-phone {
  color: #0b2545;
  font-size: 18px;
  font-weight: 600;
}
nav a:hover {
  color: #ff6a00;
}
</style>