<template>
  <header class="site-header">
    <div class="header-inner">
      <a href="/" class="logo-link">
        <img
          src="/images/ums-logo.png"
          alt="Used Machinery Source"
          class="logo"
        />
      </a>

      <nav>
        <a href="/">Home</a>
        <a href="/equipment">Equipment</a>
        <a href="/services">Services</a>
        <a href="/sell-your-machine">Sell Your Machine</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
    background: #ffffff;
  border-bottom: 1px solid #d9dee5;
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

nav {
  display: flex;
  gap: 30px;
  align-items: center;
}

nav a {
  color: #0b2545;
  text-decoration: none;
  font-size: 15px;
  font-weight: 600;
}

nav a:hover {
  color: #ff6a00;
}
</style>