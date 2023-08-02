<script setup lang="ts">
    import ConfigIndicator from '../components/ConfigIndicator.vue';
    import ConfiguratorSideBar from '../components/ConfiguratorSideBar.vue';
    import Configurator from '../components/Configurator.vue';
    import { ref, Ref, reactive } from 'vue';
    import router from '../router';

    const currentPhase: Ref<number> = ref(1);

    interface NameEmailObject {
        name: string,
        email: string
    }

    interface DataObject {
        [key: string]: string | undefined
    }

    // data to be stored in the database
    const data: DataObject = reactive({
        flavour: '',
        cupColor: '',
        logoUrl: '',
        logoPID: '',
        topping: '',
        name: '',
        email: '',
    });

    // const stepChange = (event: VisualChangeEvent) => {
    //     currentPhase.value = event.detail;
    // }

    const changePhase = (phase: number) => {
        currentPhase.value = phase;
    }

    const changeFlavour = (flavour: string) => {
        data.flavour = flavour;
    }

    const changeTopping = (topping: string) => {
        data.topping = topping;
    }

    const changeColor = (color: string) => {
        data.cupColor = color;
    }

    const changeLogo = (logo: string) => {
        data.logoUrl = logo;
    }

    const makeCreation = (finalData: NameEmailObject) => {
        data.name = finalData.name;
        data.email = finalData.email;

        // TODO: save everything to the database and send the email


        // reset the data and redirect to confirmation page
        for (const key in data) {
            data[key] = '';
        }
        
        router.push({name: 'ConfirmationPage'});
    }
</script>

<template>
    <div class="configurator__container">
        <ConfigIndicator :current-phase="currentPhase" @update:current-phase="changePhase"/>

        <!-- Left side panel with options for the user width 33% -->
        <ConfiguratorSideBar 
        @set-flavour="changeFlavour" 
        @set-topping="changeTopping" 
        @change-phase="changePhase"
        @set-color="changeColor"
        @set-logo="changeLogo"
        @create-soft-serve="makeCreation"
        :current-phase="currentPhase"  
        :flavour="data.flavour" 
        :topping="data.topping" 
        :color="data.cupColor" 
        :image="data.logoUrl"/>

        <!-- ThreeJS part that wont change except for colors width 66% -->
        <Configurator 
        :current-phase="currentPhase"
        :flavour="data.flavour"
        :topping="data.topping"
        :color="data.cupColor"
        :image="data.logoUrl"/>
        
    </div>
</template>

<style scoped>
    .configurator__container{
        display: flex;
        flex-direction: row;
        align-items: end;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
</style>