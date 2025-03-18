<template>
    <AppTopNav />
    <Header />
    <div class="main">
        <router-view />
    </div>
    <Bottom />
</template>

<style></style>

<script>
import AppTopNav from '@/components/AppTopNav.vue';
import Header from '@/components/Header.vue'  
import Bottom from '@/components/Bottom.vue'
export default {
    components: {
        AppTopNav,
        Header,
        Bottom
    }
}
</script>