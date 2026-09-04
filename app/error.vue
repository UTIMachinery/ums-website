<script setup lang="ts">
const props = defineProps<{ error: { statusCode?: number; statusMessage?: string } }>()

const is404 = computed(() => props.error?.statusCode === 404)

useSeoMeta({
  title: () => is404.value ? 'Page Not Found | Used Machinery Source' : 'Something Went Wrong | Used Machinery Source',
  robots: 'noindex, nofollow'
})

function goHome() {
  clearError({ redirect: '/' })
}

function goEquipment() {
  clearError({ redirect: '/equipment' })
}

function goWanted() {
  clearError({ redirect: '/wanted' })
}
</script>

<template>
  <main class="error-page">
    <section class="error-panel">
      <p class="eyebrow">USED MACHINERY SOURCE</p>
      <div class="error-code">{{ is404 ? '404' : (error?.statusCode || 'Error') }}</div>
      <h1>{{ is404 ? "We Couldn't Find That Page" : 'Something Went Wrong' }}</h1>
      <p class="message" v-if="is404">
        The page may have moved, the machine may no longer be available, or the link may be from an older version of our website.
      </p>
      <p class="message" v-else>
        We weren't able to load this page. Please use one of the links below to continue.
      </p>

      <div class="actions">
        <button type="button" class="primary" @click="goEquipment">Search Equipment</button>
        <button type="button" class="secondary" @click="goWanted">View Wanted Machines</button>
        <button type="button" class="secondary" @click="goHome">Go to Home Page</button>
      </div>

      <p class="help">Looking for a specific machine? Call <a href="tel:+12569801200">(256) 980-1200</a>.</p>
    </section>
  </main>
</template>

<style scoped>
.error-page {
  min-height: calc(100vh - 140px);
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 48px 24px;
  background: #f5f7fa;
  color: #172033;
}
.error-panel {
  width: min(760px, 100%);
  box-sizing: border-box;
  border-top: 7px solid #e66d18;
  border-radius: 10px;
  background: #fff;
  padding: 46px 44px;
  text-align: center;
  box-shadow: 0 10px 32px rgba(17, 32, 51, .10);
}
.eyebrow {
  margin: 0 0 8px;
  color: #c95c12;
  font-size: .78rem;
  font-weight: 900;
  letter-spacing: .14em;
}
.error-code {
  color: #0b315d;
  font-size: clamp(3.5rem, 10vw, 6.5rem);
  font-weight: 900;
  line-height: .95;
}
h1 {
  margin: 14px 0 12px;
  color: #071a2c;
  font-size: clamp(1.8rem, 4vw, 2.7rem);
}
.message {
  max-width: 620px;
  margin: 0 auto;
  color: #526274;
  font-size: 1.05rem;
  line-height: 1.6;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 28px;
}
.actions button {
  min-height: 44px;
  border-radius: 5px;
  padding: 0 20px;
  font: inherit;
  font-weight: 800;
  cursor: pointer;
}
.primary {
  border: 1px solid #e66d18;
  background: #e66d18;
  color: #fff;
}
.secondary {
  border: 1px solid #b9c3ce;
  background: #fff;
  color: #0b315d;
}
.primary:hover { background: #cc5c0e; border-color: #cc5c0e; }
.secondary:hover { border-color: #0b315d; background: #f2f5f8; }
.help {
  margin: 28px 0 0;
  color: #647282;
  font-size: .94rem;
}
.help a { color: #0b315d; font-weight: 800; }
@media (max-width: 620px) {
  .error-page { padding: 28px 16px; }
  .error-panel { padding: 34px 20px; }
  .actions { flex-direction: column; }
  .actions button { width: 100%; }
}
</style>
