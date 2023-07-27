<script setup lang="ts">
    import ConfigIndicator from '../components/ConfigIndicator.vue';

    let currentVisual = 2;
    interface VisualChangeEvent extends Event {
        detail: number
    }

    const stepChange = (event: Event) => {
        currentVisual = (event as VisualChangeEvent).detail;
    }

</script>

<template>
    <div class="configurator__container">
        <ConfigIndicator :current-visual="currentVisual" @update:current-visual="stepChange"/>
        
    </div>
</template>

<style scoped>
    
</style>