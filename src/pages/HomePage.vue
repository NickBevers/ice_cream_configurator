<script setup lang="ts">
    import Navigation from '../components/molecules/Navigation.vue';
    import ThreeSoftserve from '../components/atoms/three/ThreeSoftserve.vue';
</script>

<template>
    <div class="home__container">
        <Navigation />
        <main>
            <div class="intro__text">
                <h1 class="intro__text__title">Create your very own <br> soft serve</h1>
                <p class="intro__text__description">Hello and welcome to the soft serve creator.<br>Choose your favourite flavour, toppings and sauce to create your very own soft serve!</p>
            </div>

            <div class="backdrop">
                <img src="/src/assets/Images/shape2.png" alt="Backdrop shape" tabindex="-1">
                
                <ThreeSoftserve />
            </div>

        </main>
    </div>
</template>

<style scoped>

    .home__container{
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    main{
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        height: calc(100% - 100px);
    }

    .intro__text{
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        width: 50%;
        height: 100%;
        padding-left: max(3rem, 8vw);
    }

    .intro__text__title, .intro__text__description{
        text-align: left;
    }

    .intro__text__title{
        font-size: 3rem;
        font-weight: 600;
        margin-bottom: 1.5rem;
        margin-top: 0;
        line-height: 120%;
    }

    .intro__text__description{
        font-size: 1.25rem;
        font-weight: 300;
        margin: 0;
    }

    .backdrop{
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2rem 0;
        overflow: hidden;
        position: relative;
    }

    .backdrop img{
        height: 150%;
        object-fit: cover;
    }

</style>