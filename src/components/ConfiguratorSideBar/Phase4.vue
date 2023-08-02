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
            <p>Thank you for creating your personal softserve. <br>
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
            <p class="nextStep" @click="makeCreation">Create it!<img class="arrow--right" src="/src/assets/Images/arrow--right.svg"></p>
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


    .button__container{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
        width: 100%;
    }

    .nextStep{
        width: 12.5rem;
        margin-top: 2rem;
        margin-bottom: 0;
        padding: 0.8rem 2rem;
        background-color: var(--offBlack);
        color: white;
        font-size: 1.25rem;
        font-weight: 600;
        text-decoration: none;
        transition: background-color 0.25s ease-in-out, color 0.25s ease-in-out;
        cursor: pointer;
        max-width: 12.5rem;
    }

    .previousStep{
        width: 12.5rem;
        padding-top: 0.8rem;
        padding-bottom: 0.8rem;
        padding-left: 0;
        padding-right: 0;
        margin: 2rem 0 0 0;
        font-size: 1.25rem;
        cursor: pointer;
    }

    .nextStep:hover{
        background-color: var(--mainColor);
        color: black;
    }

    .previousStep:hover{
        color: var(--mainColor);

    }

    .arrow--right{
        filter: invert(100%);
        height: 1.2rem;
        margin-bottom: -0.2rem;
        margin-left: 0.5rem;
        transition: all 0.25s ease-in-out;
    }

    .arrow--left{
        height: 1.2rem;
        margin-bottom: -0.2rem;
        margin-left: 0;
        margin-right: 0.5rem;
    }

    .nextStep:hover .arrow--right{
        filter: invert(0%);
    }

    .previousStep:hover .arrow--left{
        filter: invert(84%) sepia(45%) saturate(610%) hue-rotate(192deg) brightness(102%) contrast(101%);
    }
</style>