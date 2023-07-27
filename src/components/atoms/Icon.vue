<script setup lang="ts">
    defineProps(['src']);
</script>

<template>
    <img :src="src" alt="icon" />
</template>

<style scoped>
    img {
        width: 100%;
        height: 100%;
    }
</style>