<template>
  <div class="bottom"> 
    <div class="footer-content">
      <p>© 2025 CJLU. All rights reserved.</p>
      <div class="social-links">
        <a href="#" target="_blank">Facebook</a>
        <a href="#" target="_blank">Twitter</a>
        <a href="#" target="_blank">LinkedIn</a>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.bottom {
  width: 100%;
  height: 80px;
  background-color: #acacac;
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer-content {
  text-align: center;
}

.social-links {
  margin-top: 10px;
}

.social-links a {
  margin: 0 10px;
  color: #fff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.social-links a:hover {
  color: #1890ff;
}
</style>
