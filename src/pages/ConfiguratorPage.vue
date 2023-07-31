<script setup lang="ts">
    import ConfigIndicator from '../components/ConfigIndicator.vue';
    import ConfiguratorSideBar from '../components/ConfiguratorSideBar.vue';
    import Configurator from '../components/Configurator.vue';
    import { ref, Ref } from 'vue';

    const currentPhase: Ref<number> = ref(1);

    // data to be stored in the database
    const data = {
        flavour: '',
        cupColor: '',
        logoUrl: '',
        logoPID: '',
        topping: '',
    }

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

    // chocolate sauce: 4D1F0C
    // strawberry sauce: B71C27
</script>

<template>
    <div class="configurator__container">
        <ConfigIndicator :current-phase="currentPhase" @update:current-phase="changePhase"/>

        <!-- Left side panel with options for the user width 33% -->
        <ConfiguratorSideBar :current-phase="currentPhase" @set-flavour="changeFlavour" @set-topping="changeTopping" @change-phase="changePhase" :flavour="data.flavour" :topping="data.topping"/>

        <!-- ThreeJS part that wont change except for colors width 66% -->
        <Configurator />
        
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