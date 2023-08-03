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
    const sidebarActive = ref(false);

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


    const toggleSidebar = () => {
        console.log('toggle');
        sidebarActive.value = !sidebarActive.value;
    } 
</script>

<template>
    <div class="configurator__container">
        <ConfigIndicator :current-phase="currentPhase" @update:current-phase="changePhase"/>

        <!-- Left side panel with options for the user width 33% -->
        <ConfiguratorSideBar 
        class="configurator__sidebar"
        :class="sidebarActive ?'active' :''"
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
        class="softserve__configurator"
        :current-phase="currentPhase"
        :flavour="data.flavour"
        :topping="data.topping"
        :color="data.cupColor"
        :image="data.logoUrl"/>

        <div class="sidebar--mobile" @click="toggleSidebar">
            <p v-if="!sidebarActive">Open</p>
            <p v-else>Close</p>

            <img v-if="!sidebarActive" src="/src/assets/Images/arrow--right.svg" alt="Collapse sidemenu">
            <img v-else src="/src/assets/Images/arrow--left.svg" alt="Collapse sidemenu">
        </div>
        
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

    .configurator-side-bar{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 33%;
        height: calc(100% - 150px);
        background-color: var(--offWhite);
    }

    .softserve__configurator{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 66%;
        height: calc(100% - 150px);
        background-image: url('/src/assets/Images/shape4.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
    }

    .sidebar--mobile{
        display: none;
        background: white;
        padding: 0 1rem;
        cursor: pointer;
        width: 7rem;
        z-index: 5;
    }

    .sidebar--mobile p{
        margin: 0.4rem 0;
    }

    .sidebar--mobile img{
        width: 1.5rem;
        cursor: pointer;
        margin-left: 1rem;
    }

    .sidebar--mobile:hover{
        background: var(--mainColorLight);
        transition: all 0.25s ease-in-out;
    }

    @media screen and (max-width: 1360px) {
        .configurator-side-bar, .softserve__configurator{
            width: 50%;
        }
    }

    @media screen and (max-width: 1024px) {
        .configurator-side-bar, .softserve__configurator{
            height: calc(100% - 100px);
        }
    }

    @media screen and (max-width: 768px) {
        .configurator-side-bar{
            width: 60%;
            position: absolute;
            left: 0;
            bottom: 0;
            transform: translateX(-100%);
            transition: transform 0.5s ease-in-out;
        }

        .configurator-side-bar.active{
            transform: translateX(0);
        }

        .sidebar--mobile{
            display: flex;
            flex-direction: row;
            position: absolute;
            top: 125px;
            left: 0;
            transition: left 0.5s ease-in-out;
            transition-delay: 0.5s;
        }

        .softserve__configurator{
            width: clamp(320px, 90%, 650px);
            margin-top: 100px;
        }
    }

    @media screen and (max-width: 580px) {
        .configurator-side-bar{
            width: 100%;
        }

        .sidebar--mobile{
            top: 110px;
        }
    }
</style>