<script setup lang="ts">
    let visuals = new Array<number>(1, 2, 3);

    const emit = defineEmits(['update:currentVisual']);

    const props = defineProps({
        currentVisual: Number
    });
    let currentVisual = props.currentVisual;

    // create an interface for the visual event to get the textContent of the clicked circle
    interface VisualEvent extends Event {
        target: HTMLDivElement
    }

    const handleClick = (event: Event) => {
        // get the textContent of the clicked circle
        const textContent = (event as VisualEvent).target.textContent;
        console.log(textContent);

        // set the currentVisual to the textContent of the clicked circle
        currentVisual = Number(textContent);

        // update the circle colors
        updateCircleColors();

        // emit the currentVisual to the parent
        emit('update:currentVisual', {detail: currentVisual});
    }

    const updateCircleColors = () => {
        // get all the circles
        const circles = document.querySelectorAll('.fase__Indicator__circle');

        // loop through all the circles
        circles.forEach(circle => {
            // get the textContent of the circle
            const textContent = circle.textContent;

            // if the textContent is smaller than the currentVisual, set the circle to past
            if (Number(textContent) < currentVisual!) {
                circle.classList.remove('fase__Indicator__circle--future');
                circle.classList.remove('fase__Indicator__circle--current');
                circle.classList.add('fase__Indicator__circle--past');
            }
            // if the textContent is equal to the currentVisual, set the circle to current
            else if (Number(textContent) === currentVisual!) {
                circle.classList.remove('fase__Indicator__circle--future');
                circle.classList.remove('fase__Indicator__circle--past');
                circle.classList.add('fase__Indicator__circle--current');
            }
            // if the textContent is bigger than the currentVisual, set the circle to future
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
            <div v-if="visual === currentVisual" class="fase__Indicator__circle fase__Indicator__circle--current">{{ visual }}</div>
            <div v-else-if="visual < currentVisual!" class="fase__Indicator__circle fase__Indicator__circle--past">{{ visual }}</div>
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