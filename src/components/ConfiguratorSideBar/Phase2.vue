<script setup lang="ts">
    import { ref, Ref } from 'vue';

    const emit = defineEmits(['setTopping', 'changePhase']);

    const props = defineProps({
        topping: String,
    });
    
    const topping: Ref<string> = ref(props.topping ?props.topping :'');

    const handleTopping = (event: Event) => {
        const target = event.target as HTMLInputElement;
        target.id ? topping.value = target.id.split('--')[1] : topping.value = target.children[0].id.split('--')[1];
        emit('setTopping', topping.value);
    }

    const previousStep = () => {
        emit('changePhase', 1);
    }

    const nextStep = () => {
        if (topping.value === '') return;
        emit('changePhase', 3);
    }

</script>

<template>
    <div class="topping__container">
        <div class="phase2__description">
            <h1>Step 2</h1>
            <p>Select the topping you'd like</p>
        </div>
        <div class="topping__options">

            <div class="topping__option" :class="topping === 'chocolateSauce' ?'selected' :''" @click="handleTopping">
                <p id="topping--chocolateSauce">Chocolate sauce</p>
            </div>
            
            <div class="topping__option" :class="topping === 'strawberrySauce' ?'selected' :''" @click="handleTopping">
                <p id="topping--strawberrySauce">Strawberry sauce</p>
            </div>
            
            <div class="topping__option" :class="topping === 'mnm' ?'selected' :''" @click="handleTopping">
                <p id="topping--mnm">M&M's</p>
            </div>

            <div class="topping__option" :class="topping === 'sprinkles' ?'selected' :''" @click="handleTopping">
                <p id="topping--sprinkles">Sprinkles</p>
            </div>
        </div>

        <div class="button__container">
            <p class="previousStep" @click="previousStep"><img class="arrow--left" src="/src/assets/Images/arrow--left.svg"> Previous Step</p>
            <p class="nextStep" :class="props.topping!.length <=0 ?'disabled' :''" @click="nextStep">Next Step <img class="arrow--right" src="/src/assets/Images/arrow--right.svg"></p>
        </div>
    </div>
</template>

<style scoped>
    .topping__container{
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

    .phase2__description p{
        margin: 0;
        font-size: 1rem;
    }

    .topping__images{
        width: 150px;
        height: 150px;
        object-fit: contain;
    }

    .topping__options{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        flex-wrap: wrap;
        width: 100%;
    }
    
    .topping__option{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 1% 3%;
        width: 40%;
        padding: 0 8%;
        background-color: var(--lightGray);
        cursor: pointer;
        min-width: 18.75rem;
    }

    .topping__option:hover{
        background-color: var(--mainColorLight);
    }

    .selected{
        background-color: var(--mainColor);
    }

    @media screen and (max-width: 768px){
        .topping__container{
            margin-top: 0;
            height: 90%;
            width: 90%;
        }
    }
</style>