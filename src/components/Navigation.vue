<script setup lang="ts">
import Icon from './Icon.vue'
</script>

<template>
    <nav class="navigation">
        <div class="navigation__icon">
            <router-link to="/"><Icon src="/src/assets/Images/logo_semibold.svg" /></router-link>
        </div>
        <div class="navigation__links">
            <router-link to="/" class="navigation__link">Home</router-link>
            <router-link to="/configurator" class="navigation__link">Configurator</router-link>
        </div>
    </nav>
</template>

<style scoped>
.navigation {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: transparent;
    color: black;
    z-index: 1000;
    padding-left: 0.4rem;
}

.navigation__icon {
    max-height: 80px;
}

.navigation__icon img {
    max-height: 80px;
}

.navigation__links {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 300px;
    margin-right: 1rem;
    gap: 1.5rem;
}

.navigation__link {
    text-decoration: none;
    color: var(--gray);
    font-size: 1.2rem;
    margin: 0 1rem;
    text-transform: uppercase;
    transition: color 0.25s ease-in-out;
}

.router-link-active, .navigation__link:hover {
    text-decoration: underline;
    text-underline-offset: 0.6rem;
    text-decoration-thickness: 0.15rem;
}

.router-link-active {
    position: relative;
    color: black;
}

.navigation__link:hover {
    color: var(--gray);
}
</style>