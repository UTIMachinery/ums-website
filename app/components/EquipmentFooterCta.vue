<template>
  <section class="equipment-footer-cta-wrap">
    <div class="equipment-footer-cta">
      <div class="equipment-footer-copy">
        <h3>Don't See What You're Looking For?</h3>
        <p>Our inventory is constantly changing. If you don't see what you need—or would rather send us your requirements—tell us what you're looking for. We'll let you know what's available that fits your needs.</p>
      </div>
      <NuxtLink to="/equipment#tell-us-what-you-need" class="equipment-footer-button">Tell Us What You Need</NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.equipment-footer-cta-wrap {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 32px 48px;
  box-sizing: border-box;
}

.equipment-footer-cta {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 22px 26px;
  background: linear-gradient(105deg, #071b33 0%, #0b2545 100%);
  border-left: 5px solid #f47b20;
  border-radius: 6px;
  color: #fff;
}

.equipment-footer-copy {
  flex: 1;
}

.equipment-footer-copy h3 {
  margin: 0 0 7px;
  color: #fff;
  font-size: 21px;
  font-weight: 800;
}

.equipment-footer-copy p {
  margin: 0;
  color: #e8eef5;
  font-size: 14px;
  line-height: 1.55;
}

.equipment-footer-button {
  flex: 0 0 auto;
  background: #f47b20;
  color: #fff;
  border: 1px solid #f47b20;
  border-radius: 5px;
  padding: 11px 18px;
  font-size: 14px;
  font-weight: 800;
  text-decoration: none;
  white-space: nowrap;
}

.equipment-footer-button:hover {
  background: #d96512;
  border-color: #d96512;
}

@media (max-width: 600px) {
  .equipment-footer-cta-wrap {
    padding-left: 16px;
    padding-right: 16px;
  }

  .equipment-footer-cta {
    flex-direction: column;
    align-items: flex-start;
  }

  .equipment-footer-button {
    width: 100%;
    box-sizing: border-box;
    text-align: center;
  }
}
</style>