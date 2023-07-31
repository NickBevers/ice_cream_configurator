<script setup lang="ts">
    import { ref, Ref } from 'vue';

    const emit = defineEmits(['setTopping', 'changePhase']);

    const previousStep = () => {
        emit('changePhase', 2);
    }

    const nextStep = () => {
        emit('changePhase', 4);
    }

    const fileName: Ref<String> = ref('Choose a file');
    const cupColor: Ref<String> = ref('#e2d4ff');

    const uploadImage = async (event: Event) => {
        const target = event.target as HTMLInputElement;
        if (!target.files) return;
        
        const file = target.files[0];
        fileName.value = file.name;

        const formData = new FormData();
        formData.append('file', file);
        formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

        fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);

            const imagePreview = document.querySelector('.image__preview__holder') as HTMLImageElement;
            imagePreview.src = data.secure_url;
            imagePreview.classList.remove('hidden');


            // TODO: save the image url to the database

        });
    }

</script>

<template>
    <div class="cup__container">
        <div class="phase3__description">
            <h1>Step 3</h1>
            <p>Customize your cup! Pick a colour you'd like your cup to be.</p>
        </div>
        <div class="customization__options">
            <div class="option__container">
                <div class="color__option">
                    <p>Pick a base color or choose your own.</p>
                    <div class="color__options">
                        <div class="color__option__color" :class="cupColor === '#adeeb4' ?'activeColor' :''" @click="cupColor = '#adeeb4'" style="background-color: #adeeb4;"></div>
                        <div class="color__option__color" :class="cupColor === '#aadee9' ?'activeColor' :''" @click="cupColor = '#aadee9'" style="background-color: #aadee9;"></div>
                        <div class="color__option__color" :class="cupColor === '#eba5de' ?'activeColor' :''" @click="cupColor = '#eba5de'" style="background-color: #eba5de;"></div>
                        <div class="color__option__color" :class="cupColor === '#ec9999' ?'activeColor' :''" @click="cupColor = '#ec9999'" style="background-color: #ec9999;"></div>
                        <div class="color__option__color" :class="cupColor === '#f0df95' ?'activeColor' :''" @click="cupColor = '#f0df95'" style="background-color: #f0df95;"></div>
                    </div>

                    <n-color-picker class="color__picker" :show-alpha="false" :default-value="'#e2d4ff'" v-model:value="cupColor"/>
                </div>

                <div class="image__option">
                    <div class="image__container">
                        <p>Choose a logo for your cup</p>
                        <label for="cup__image__input" class="cup__image"><input type="file" name="cup__image__input" id="cup__image__input" @change="uploadImage">{{ fileName }}</label>
                    </div>

                    <div class="image__preview">
                        <img class="image__preview__holder hidden" alt="Cup logo">
                    </div>
                </div>

            </div>
        </div>

        <div class="button__container">
            <p class="previousStep" @click="previousStep"><img class="arrow--left" src="/src/assets/Images/arrow--left.svg"> Previous Step</p>
            <p class="nextStep" @click="nextStep">Next Step <img class="arrow--right" src="/src/assets/Images/arrow--right.svg"></p>
        </div>
    </div>
</template>

<style scoped>
    .cup__container{
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

    h2{
        margin-bottom: 0.5rem;
        font-weight: 500;
        font-size: 1.1rem;
    }

    .phase3__description p{
        margin: 0;
        font-size: 1rem;
        width: 26.5rem;
        margin-bottom: 2rem;
    }

    .customization__options{
        display: flex;
        width: 100%;
        height: 100%;
    }

    .option__container{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        flex-wrap: wrap;
        width: 100%;
        height: clamp(350px, 100%, 550px);
    }

    .color__option, .image__option{
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        width: clamp(12.5rem, 100%, 26.5rem);
    }

    .color__option{
        margin-bottom: 1rem;
    }

    .image__option{
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
        height: 150px;
    }

    .color__options{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: start;
        padding-left: 0;
        width: 100%;
        margin-bottom: 1rem;
    }

    .color__option__color{
        width: 2rem;
        height: 2rem;
        border: 3px solid #fff;
        cursor: pointer;
        margin-right: 2rem;
    }

    .activeColor{
        border: 3px solid black;
    }

    .color__picker{
        max-width: 12.5rem;
        width: 12.5rem;
        padding: 0.8rem 0;
        box-sizing: content-box;
        margin-bottom: 1rem;
    }

    .cup__image{
        display: inline-block;
        max-width: 12.5rem;
        padding: 0.8rem 0;
        width: 100%;
        cursor: pointer;
        border: 3px solid black;
        font-weight: 600;
    }

    input[type="file"]{
        display: none;
        appearance: none;
        -webkit-appearance: none;
    }

    /* .image__container{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: start;
        width: 100%;
    } */

    .image__preview, .image__preview__holder{
        max-height: 150px;
        max-width: 360px;
    }

    .image__preview__holder{
        object-fit: contain;
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
        cursor: pointer;
        font-size: 1.25rem;
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