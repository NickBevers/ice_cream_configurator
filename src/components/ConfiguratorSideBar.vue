<script setup lang="ts">
    import Phase1 from '../components/ConfiguratorSideBar/Phase1.vue';
    import Phase2 from '../components/ConfiguratorSideBar/Phase2.vue';
    import Phase3 from '../components/ConfiguratorSideBar/Phase3.vue';

    const props = defineProps({
        currentPhase: Number
    });

    const emit = defineEmits(['setFlavour', 'changePhase']);

    const changeFlavour = (flavour: string) => {
        emit('setFlavour', flavour);
    }

</script>

<template>
    <div class="configurator-side-bar">
        <Phase1 v-if="props.currentPhase === 1" @set-flavour="changeFlavour"/>
        <Phase2 v-if="props.currentPhase === 2" />
        <Phase3 v-if="props.currentPhase === 3" />
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