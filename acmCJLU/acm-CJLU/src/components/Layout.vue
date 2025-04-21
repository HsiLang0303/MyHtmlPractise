<template>
  <div class="layout">
    <Header/>
    <Main>
      <router-view :key="$route.fullPath"/>
    </Main>
    <Bottom/>
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/Header.vue";
import Bottom from "@/components/Bottom.vue";
import Main from "@/components/Main.vue";
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>