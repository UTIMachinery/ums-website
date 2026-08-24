<template>
  <main class="home-page">
    <section class="hero">
      <div class="hero-content">
        <div class="hero-eyebrow">
          <span></span>
          BUY • SELL • BROKER
        </div>

        <h1>
          Buying &amp; Selling<br>
          Quality Used<br>
          CNC Machinery
        </h1>

        <p class="hero-intro">
          Your trusted source for used CNC machinery.<br>
          Solutions for all your machinery needs.
        </p>

<div class="hero-actions">
  <NuxtLink to="/equipment" class="hero-btn hero-btn-primary">
    Search Equipment
  </NuxtLink>

  <NuxtLink to="/equipment" class="hero-btn hero-btn-light">
    Tell Us What You Need
  </NuxtLink>

  <a href="#" class="hero-btn hero-btn-orange">
    What Do You Have for Sale?
  </a>
</div>

      </div>

      <div class="hero-image">
        <img
          src="/Images/home-hero-cnc.webp"
          alt="CNC turning center machining area"
        >
      </div>
    </section>
   <section class="home-actions">
  <div class="home-action-card">
    <div class="home-action-icon">⌕</div>

    <div class="home-action-content">
      <h2>Buying a Machine</h2>
      <span class="home-action-line"></span>
      <p>
        Search our current inventory of quality used CNC machinery.
      </p>

      <NuxtLink to="/equipment" class="home-action-link">
        Search Equipment →
      </NuxtLink>
    </div>
  </div>

  <div class="home-action-card">
    <div class="home-action-icon">◎</div>

    <div class="home-action-content">
      <h2>Looking for Something?</h2>
      <span class="home-action-line"></span>
      <p>
        Don’t see what you need? Tell us what you’re looking for and we’ll help you find it.
      </p>

      <NuxtLink to="/equipment" class="home-action-link">
        Tell Us What You Need →
      </NuxtLink>
    </div>
  </div>

  <div class="home-action-card">
    <div class="home-action-icon">◇</div>

    <div class="home-action-content">
      <h2>Have a Machine to Sell?</h2>
      <span class="home-action-line"></span>
      <p>
        We buy single machines, surplus equipment, and complete facilities.
      </p>

      <a href="#" class="home-action-link">
        What Do You Have for Sale? →
      </a>
    </div>
  </div>
</section>

  </main>
</template>

<style scoped>
.home-page {
  margin: 0;
  padding: 0;
}

.hero {
  min-height: 535px;
  background: #061526;
  color: #ffffff;
  display: grid;
  grid-template-columns: 65% 35%;
  overflow: hidden;
}

.hero-content {
  padding: 58px 56px 58px 170px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 900px;
}

.hero-eyebrow {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 22px;
  color: #f36c21;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.8px;
}

.hero-eyebrow span {
  display: block;
  width: 44px;
  height: 2px;
  background: #f36c21;
}

h1 {
  margin: 0 0 24px;
  font-size: clamp(46px, 4.4vw, 70px);
  line-height: 1.05;
  font-weight: 700;
  letter-spacing: -1px;
}

.hero-intro {
  margin: 0;
  font-size: 20px;
  line-height: 1.55;
}



.hero-image {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.hero-image::before {
  content: "";
  position: absolute;
  inset: 0;
  background: #061526;
  clip-path: polygon(
  0 0,
  38% 0,
  12% 50%,
  38% 100%,
  0 100%
);
  z-index: 2;
  pointer-events: none;
}



.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 35% center;
}

.hero-actions {
  display: flex;
  gap: 16px;
  margin-top: 34px;
  flex-wrap: wrap;
}

.hero-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 58px;
  padding: 0 28px;
  border-radius: 4px;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.2;
  text-decoration: none;
  white-space: nowrap;
}

.hero-btn-primary {
  background: #123c75;
  color: #ffffff;
  border: 1px solid #315c91;
}

.hero-btn-light {
  background: #ffffff;
  color: #0b2545;
  border: 1px solid #d7dde5;
}

.hero-btn-orange {
  background: #f36c21;
  color: #ffffff;
  border: 1px solid #f36c21;
}

.hero-btn:hover {
  transform: translateY(-1px);
}

.home-actions {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  max-width: 1440px;
  margin: 0 auto;
  padding: 42px 60px;
  background: #ffffff;
}

.home-action-card {
  display: flex;
  gap: 24px;
  padding: 10px 38px;
  border-right: 1px solid #d9d9d9;
}

.home-action-card:last-child {
  border-right: 0;
}

.home-action-icon {
  flex: 0 0 72px;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #082b5c;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
}

.home-action-content h2 {
  margin: 2px 0 10px;
  font-size: 21px;
  line-height: 1.2;
  color: #082b5c;
}

.home-action-content p {
  margin: 0 0 16px;
  color: #333333;
  font-size: 16px;
  line-height: 1.5;
}

.home-action-link {
  color: #082b5c;
  font-size: 16px;
  font-weight: 700;
  text-decoration: none;
}

.home-action-link:hover {
  color: #ff6a00;
}

.home-action-link:hover {
  color: #ff6a00;
}

</style>