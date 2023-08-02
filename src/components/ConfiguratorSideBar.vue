<script setup lang="ts">
    import Phase1 from '../components/ConfiguratorSideBar/Phase1.vue';
    import Phase2 from '../components/ConfiguratorSideBar/Phase2.vue';
    import Phase3 from '../components/ConfiguratorSideBar/Phase3.vue';
    import Phase4 from './ConfiguratorSideBar/Phase4.vue';

    const props = defineProps({
        currentPhase: Number,
        flavour: String,
        topping: String,
        color: String,
        image: String
    });

    interface NameEmailObject {
        name: string,
        email: string
    }

    const emit = defineEmits(['setFlavour', 'setTopping', 'setColor', 'setLogo', 'createSoftServe', 'changePhase']);

    const changeFlavour = (flavour: string) => {
        emit('setFlavour', flavour);
    }

    const changeTopping = (topping: string) => {
        emit('setTopping', topping);
    }

    const changePhase = (phase: number) => {
        emit('changePhase', phase);
    }

    const changeColor = (color: string) => {
        emit('setColor', color);
    }

    const changeLogo = (logo: string) => {
        emit('setLogo', logo);
    }

    const makeCreation = (data: NameEmailObject) => {
        emit('createSoftServe', data);
    }

</script>

<template>
    <div class="configurator-side-bar">
        <Phase1 v-if="props.currentPhase === 1" @set-flavour="changeFlavour" @change-phase="changePhase" :flavour="props.flavour ?props.flavour :''"/>
        <Phase2 v-if="props.currentPhase === 2" @set-topping="changeTopping" @change-phase="changePhase" :topping="props.topping ?props.topping :''"/>
        <Phase3 v-if="props.currentPhase === 3" @set-color="changeColor" @set-logo="changeLogo" @change-phase="changePhase" :color="props.color" :image="props.image"/>
        <Phase4 v-if="props.currentPhase === 4" @create-soft-serve="makeCreation" />
    </div>
</template>

<style scoped>

    .configurator-side-bar{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 33%;
        height: calc(100% - 150px);
        background-color: transparent;
    }
</style>