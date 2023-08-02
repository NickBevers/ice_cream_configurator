<script setup lang="ts">

</script>

<template>
    <div class="confirm__container">
        <h1>Enjoy your softserve!</h1>

        <!-- button to homescreen -->
        <router-link to="/" class="button--home">Go to homepage</router-link>
    </div>
</template>

<style scoped>
    .confirm__container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: transparent;
        min-height: fit-content;
    }

    h1{
        font-size: 3rem;
    }

    .button--home{
        width: 15rem;
        margin: 0;
        padding: 0.8rem 2rem;
        background-color: var(--offBlack);
        color: white;
        font-size: 1.25rem;
        font-weight: 600;
        text-decoration: none;
        transition: background-color 0.25s ease-in-out, color 0.25s ease-in-out;
        cursor: pointer;
        border: none;
    }

    .button--home:hover{
        background-color: var(--mainColor);
        color: black;
    }
</style>