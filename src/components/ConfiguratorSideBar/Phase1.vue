<script setup lang="ts">
    import { ref, Ref } from 'vue';

    const props = defineProps({
        flavour: String,
    });

    const emit = defineEmits(['setFlavour', 'changePhase']);
    const flavour: Ref<string> = ref(props.flavour ?props.flavour :'');
    
    const changeFlavour = (event: Event) => {
        const target = event.target as HTMLInputElement;
        if (target.classList.contains('flavour__option')){
            flavour.value = target.children[0].id.split('--')[1];
        } else{
            flavour.value = target.parentElement!.children[0].id.split('--')[1];
        }
        emit('setFlavour', flavour.value);
    }

    const nextStep = () => {
        if (flavour.value === '') return;
        emit('changePhase', 2);
    }

    console.log(props.flavour);

</script>

<template>
    <div class="flavour__container">
        <div class="phase1__description">
            <h1>Step 1</h1>
            <p>Choose your ice cream flavour</p>
        </div>
        <div class="flavour__options">

            <div class="flavour__option" :class="flavour === 'vanilla' ?'selected' :''" @click="changeFlavour">
                <img class="flavour__images" id="flavour--vanilla" src="/src/assets/Images/Flavours/vanilla.png" alt="Vanilla flavouring">
                <label for="flavour--vanilla">Vanilla</label>
            </div>

            <div class="flavour__option" :class="flavour === 'chocolate' ?'selected' :''" @click="changeFlavour">
                <img class="flavour__images" id="flavour--chocolate" src="/src/assets/Images/Flavours/chocolate.png" alt="Chocolate flavouring">
                <label for="flavour--chocolate">Chocolate</label>
            </div>

            <div class="flavour__option" :class="flavour === 'strawberry' ?'selected' :''" @click="changeFlavour">
                <img class="flavour__images" id="flavour--strawberry" src="/src/assets/Images/Flavours/strawberry.png" alt="Strawberry flavouring">
                <label for="flavour--strawberry">Strawberry</label>
            </div>
        </div>

        <p class="nextStep" :class="props.flavour!.length <=0 ?'disabled' :''" @click="nextStep">Next Step <img class="arrow--right" src="/src/assets/Images/arrow--right.svg"></p>
    </div>
</template>

<style scoped>

    .flavour__container{
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

    .phase1__description p{
        margin: 0;
        font-size: 1rem;
    }

    .flavour__images{
        width: 150px;
        height: 150px;
        object-fit: contain;
    }

    .flavour__options{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly start;
        flex-wrap: wrap;
        width: 100%;
    }
    
    .flavour__option{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 1%;
        width: 40%;
        padding: 0 10%;
    }

    .flavour__option img{
        opacity: 0.5;
        transition: opacity 0.25s ease-in-out;
    }

    .flavour__option label{
        color: var(--gray);
        transition: color 0.25s ease-in-out;
    }

    .flavour__option:hover img, .selected img{
        opacity: 1;
    }

    .flavour__option:hover label, .selected label{
        color: var(--offBlack);
    }

    .nextStep{
        margin-top: 2rem;
        padding: 0.8rem 2rem;
        background-color: var(--offBlack);
        color: white;
        font-size: 1.25rem;
        font-weight: 600;
        text-decoration: none;
        transition: background-color 0.25s ease-in-out, color 0.25s ease-in-out;
        cursor: pointer;
    }

    .nextStep:hover{
        background-color: var(--mainColor);
        color: black;
    }

    .arrow--right{
        filter: invert(100%);
        height: 1.2rem;
        margin-bottom: -0.15rem;
        margin-left: 0.5rem;
        transition: all 0.25s ease-in-out;
    }

    .nextStep:hover .arrow--right{
        filter: invert(0%);
    }

</style>