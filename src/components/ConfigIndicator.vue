<script setup lang="ts">
    let visuals = new Array<number>(1, 2, 3);

    const emit = defineEmits(['update:currentPhase']);

    const props = defineProps({
        currentPhase: Number
    });
    // let currentPhase = props.currentPhase;

    interface VisualEvent extends Event {
        target: HTMLDivElement
    }

    const handleClick = (event: Event) => {
        const textContent = (event as VisualEvent).target.textContent;
        // currentPhase = Number(textContent);
        updateCircleColors();
        emit('update:currentPhase', {detail: Number(textContent)});
    }

    const updateCircleColors = () => {
        const circles = document.querySelectorAll('.fase__Indicator__circle');
        circles.forEach(circle => {
            const textContent = circle.textContent;
            if (Number(textContent) < props.currentPhase!) {
                circle.classList.remove('fase__Indicator__circle--future');
                circle.classList.remove('fase__Indicator__circle--current');
                circle.classList.add('fase__Indicator__circle--past');
            }
            else if (Number(textContent) === props.currentPhase!) {
                circle.classList.remove('fase__Indicator__circle--future');
                circle.classList.remove('fase__Indicator__circle--past');
                circle.classList.add('fase__Indicator__circle--current');
            }
            else {
                circle.classList.remove('fase__Indicator__circle--past');
                circle.classList.remove('fase__Indicator__circle--current');
                circle.classList.add('fase__Indicator__circle--future');
            }
        });
    }

</script>

<template>
    <div class="fase__Indicator">
        <div v-for="visual in visuals" @click="handleClick">
            <div v-if="visual === props.currentPhase" class="fase__Indicator__circle fase__Indicator__circle--current">{{ visual }}</div>
            <div v-else-if="visual < props.currentPhase!" class="fase__Indicator__circle fase__Indicator__circle--past">{{ visual }}</div>
            <div v-else class="fase__Indicator__circle fase__Indicator__circle--future">{{ visual }}</div>
        </div>
    </div>
</template>

<style scoped>
    .fase__Indicator{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100px;
        position: absolute;
        top: 100px;
        left: 0;
    }

    .fase__Indicator__circle{
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        margin: 0 1rem;
        text-align: center;
    }

    .fase__Indicator__circle--current, .fase__Indicator__circle--past{
        background-color: var(--mainColorLight);
        border: 3px solid var(--mainColor);
    }

    .fase__Indicator__circle--past{
        opacity: 0.5;
    }

    .fase__Indicator__circle--future{
        background-color: var(--offWhite);
        border: 3px solid var(--lightGray);
    }

    .fase__Indicator__circle--past, .fase__Indicator__circle--future{
        color: var(--gray);
    }
</style>