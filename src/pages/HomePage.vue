<script setup lang="ts">
    import HomePageModel from '../components/HomePageModel.vue';
</script>

<template>
    <div class="home__container">
        <main>
            <div class="intro__text">
                <h1 class="intro__text__title">Create your very own <br> <span class="intro__text__title--colored">soft serve</span></h1>
                <p class="intro__text__description">Hello and welcome to the soft serve creator.<br>Choose your favourite flavour, toppings and sauce to create your very own soft serve!</p>

                <router-link to="/configurator" class="cta--startCreation">Start creating</router-link>
            </div>

            <div class="backdrop">                
                <HomePageModel />
            </div>

            <p class="credits">Made by <a href="https://nickbevers.be" target="_blank">Nick Bevers</a></p>
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
        height: 100%;
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

    .intro__text__title--colored{
        color: var(--mainColor);
        /* color: white; */
    }

    .intro__text__description{
        font-size: 1.25rem;
        font-weight: 300;
        margin: 0;
    }

    .cta--startCreation{
        margin-top: 4rem;
        padding: 1rem 2rem;
        background-color: var(--offBlack);
        color: white;
        font-size: 1.25rem;
        font-weight: 600;
        text-decoration: none;
        transition: background-color 0.25s ease-in-out, color 0.25s ease-in-out;
    }

    .cta--startCreation:hover{
        background-color: var(--mainColor);
        color: black;
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
        background-image: url('/src/assets/Images/shape2.png');
        background-repeat: no-repeat;
        background-position: 80% 40%;
        background-size: 110%;
    }

    .credits{
        position: absolute;
        bottom: -1.5rem;
        right: 0.5rem;
        margin: 0;
        padding: 0.5rem;
        font-weight: 300;
        color: var(--gray);
        transform: rotate(90deg);
        transform-origin: top right;
    }

    .credits a{
        margin-left: 0.1rem;
        color: black;
        text-decoration: none;
    }

</style>