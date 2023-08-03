<script setup lang="ts">
    import HomePageModel from '../components/HomePageModel.vue';
</script>

<template>
    <div class="home__container">
        <main>
            <div class="intro__text">
                <h1 class="intro__text__title">Create your very own <br> <span class="intro__text__title--colored">soft serve</span></h1>
                <p class="intro__text__description">Hello and welcome to the soft serve creator. <br class="break--intro">Choose your favourite flavour, toppings and sauce to create your very own soft serve!</p>

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
        height: 95%;
        margin-top: 5%;
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
        height: 95%;
        margin-top: 5%;
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

    @media screen and (max-width: 1360px) {
        .intro__text{
            width: 55%;
        }

        .intro__text__title{
            font-size: 2.5rem;
        }

        .backdrop{
            width: 45%;
            background-position:  50% 20%;
            background-size: 135%;
        }
    }

    @media screen and (max-width: 1024px) {
        .intro__text{
            width: 50%;
            padding-left: 1rem;
        }

        .intro__text__title{
            font-size: 2.25rem;
        }

        .intro__text__description{
            font-size: 1.1rem;
        }

        .backdrop{
            width: 50%;
        }

        .credits{
            font-size: 0.85rem;
        }

        .cta--startCreation{
            font-size: 1.1rem;
        }
    }

    @media screen and (max-width: 900px) {
        .cta--startCreation{
            padding: 0.8rem 1.2rem;
            font-size: 0.9rem;
            margin-top: 3rem;
        }

        .intro__text__description{
            font-size: 1rem;
        }

        .intro__text__title{
            font-size: 2rem;
        }
    }

    @media screen and (max-width: 768px) {
        main{
            flex-direction: column-reverse;
        }

        .intro__text{
            width: 100%;
            height: 50%;
            margin-top: 0;
            justify-content: space-evenly;
            background: transparent;
            z-index: 1;
        }

        .backdrop{
            display: flex;
            justify-content: start;
            width: 60%;
            height: 60%;
            z-index: 0;
            padding: 0;
            top: 80px;
            right: 0;
            background-position: 20% 40%;
            background-size: 120%;
            position: absolute;
            margin-top: 0;
        }
    }

    @media screen and (max-width: 480px) {
        .intro__text{
            height: 40%;
            padding-left: 0;
        }

        .credits{
            padding-top: 0;
        }

        .backdrop{
            width: calc(100% - 4rem);
            height: 50%;
            display: block;
            background-position: 60% 50%;
            background-size: 120%;
            right: auto;
            left: auto;
        }

        .intro__text__title{
            margin-bottom: 1rem;
        }

        .cta--startCreation{
            margin-top: 2rem;
        }
    }

    @media screen and (max-width: 400px) {
        .intro__text__title{
            font-size: 1.65rem;
            margin-bottom: 0.75rem;
        }

        .intro__text__description{
            font-size: 0.9rem;
        }

        .cta--startCreation{
            font-size: 0.8rem;
            padding: 0.7rem 1rem;
            margin-top: 1.5rem;
        }

        .break--intro{
            display: none;
        }
    }

</style>