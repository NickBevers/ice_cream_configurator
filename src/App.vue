<script setup lang="ts">
    import Navigation from './components/Navigation.vue';
</script>

<template>
    <Navigation class="navigation"/>
    <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
            <component :is="Component"></component>
        </transition>
    </router-view>

</template>

<style scoped>
    .navigation{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        padding: 0 2rem;
        margin-top: 1rem;
        z-index: 1000;
    }

</style>
