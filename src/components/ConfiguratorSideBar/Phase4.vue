<script setup lang="ts">
    import { ref, Ref } from 'vue';

    const props = defineProps({
        email: String,
    });

    const email: Ref<string> = ref(props.email ?props.email :'');
    const name: Ref<string> = ref('');

    const emit = defineEmits(['createSoftServe', 'changePhase']);

    const previousStep = () => {
        emit('changePhase', 3);
    }

    const makeCreation = () => {
        if (email.value === '' || name.value === '') return;
        // TODO: save everything to the database and send the email
        emit('createSoftServe', {email: email.value, name: name.value});
    }

</script>

<template>
    <div class="confirmation__container">
        <div class="confirmation__description">
            <h1>Finalization</h1>
            <p>Thank you for creating your personal softserve. <br class="break--desktop">
                Fill in your email below and we'll send you your creation!</p>
        </div>

        <div class="email__container">
            <div class="input__container">
                <label for="name">Name</label>
                <input type="text" class="name__input" placeholder="Your name" v-model="name">
            </div>

            <div class="input__container">
                <label for="email">Email</label>
                <input type="email" class="email__input" placeholder="Your email" v-model="email">
            </div>
        </div>

        <div class="button__container">
            <p class="previousStep" @click="previousStep"><img class="arrow--left" src="/src/assets/Images/arrow--left.svg"> Previous Step</p>
            <p class="nextStep" :class="name.length > 0 && email.length > 0 ?'' :'disabled'" @click="makeCreation">Create it!<img class="arrow--right" src="/src/assets/Images/arrow--right.svg"></p>
        </div>
    </div>
</template>

<style scoped>
    .confirmation__container{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        background-color: transparent;
        min-height: fit-content;
        margin-top: -5rem;
    }

    h1{
        margin-bottom: 0;
    }

    .break--desktop{
        display: block;
    }

    .confirmation__description p{
        margin: 0;
        margin-top: 0.4rem;
        font-size: 1rem;
        text-align: left;
    }

    .email__container{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: start;
        width: 100%;
        height: 100%;
        background-color: transparent;
        min-height: fit-content;
        margin-top: 2.5rem;
    }

    .input__container{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        margin-bottom: 2.5rem;
    }

    .input__container label{
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
    }

    input{
        width: 26.5rem;
        height: 3rem;
        border: none;
        border: 2px solid var(--offBlack);
        background: transparent;
        padding-left: 1rem;
        outline: none;
        font-size: 1rem;
        font-family: 'REM', sans-serif;
    }

    input:active, input:focus{
        background: white;
    }

    input::placeholder{
        color: var(--offBlack);
    }

    @media screen and (max-width: 1024px){
        .confirmation__container{
            width: 90%;
            margin-left: 10%;
        }

        .input__container{
            width: 100%;
        }

        input{
            width: 100%;
        }
    }

    @media screen and (max-width: 768px){
        .confirmation__container{
            margin-top: 0;
            height: 90%;
            width: 90%;
            margin-left: 0;
        }

        .confirmation__description{
            width: 100%;
            margin-bottom: 2rem;
        }

        .confirmation__description p{
            width: 100%;
        }

        .email__container{
            width: 100%;
            padding-right: 3rem;
        }
    }

    @media screen and (max-width: 480px) {
        .confirmation__description p{
            font-size: 0.9rem;
        }

        .break--desktop{
            display: none;
        }
    }
</style>