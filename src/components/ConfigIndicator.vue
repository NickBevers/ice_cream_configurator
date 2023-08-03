<script setup lang="ts">
    let visuals = new Array<number>(1, 2, 3, 4);

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
        emit('update:currentPhase', Number(textContent));
    }

    const updateCircleColors = () => {
        const circles = document.querySelectorAll('.fase__indicator__circle');
        circles.forEach(circle => {
            const textContent = circle.textContent;
            if (Number(textContent) < props.currentPhase!) {
                circle.classList.remove('fase__indicator__circle--future');
                circle.classList.remove('fase__indicator__circle--current');
                circle.classList.add('fase__indicator__circle--past');
            }
            else if (Number(textContent) === props.currentPhase!) {
                circle.classList.remove('fase__indicator__circle--future');
                circle.classList.remove('fase__indicator__circle--past');
                circle.classList.add('fase__indicator__circle--current');
            }
            else {
                circle.classList.remove('fase__indicator__circle--past');
                circle.classList.remove('fase__indicator__circle--current');
                circle.classList.add('fase__indicator__circle--future');
            }
        });
    }

</script>

<template>
    <div class="fase__indicator">
        <div v-for="visual in visuals" @click="handleClick">
            <div v-if="visual === props.currentPhase" class="fase__indicator__circle fase__indicator__circle--current">{{ visual }}</div>
            <div v-else-if="visual < props.currentPhase!" class="fase__indicator__circle fase__indicator__circle--past">{{ visual }}</div>
            <div v-else class="fase__indicator__circle fase__indicator__circle--future">{{ visual }}</div>
        </div>
    </div>
</template>

<style scoped>
    .fase__indicator{
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

    .fase__indicator__circle{
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        margin: 0 1rem;
        text-align: center;
        cursor: pointer;
    }

    .fase__indicator__circle--current, .fase__indicator__circle--past{
        background-color: var(--mainColorLight);
        border: 3px solid var(--mainColor);
    }

    .fase__indicator__circle--past{
        opacity: 0.5;
    }

    .fase__indicator__circle--future{
        background-color: var(--offWhite);
        border: 3px solid var(--lightGray);
    }

    .fase__indicator__circle--past, .fase__indicator__circle--future{
        color: var(--gray);
    }

    .fase__indicator__circle:hover{
        background-color: var(--mainColorLight);
        border-color: var(--mainColor);
    }

    @media screen and (max-width: 1360px) {
        .fase__indicator{
            width: 100%;
            height: 80px;
            top: 80px;
        }
    }

    @media screen and (max-width: 1024px) {
        .fase__indicator{
            flex-direction: column;
            height: calc(100% - 100px);
            width: 60px;
            position: absolute;
            top: 100px;
            left: calc(100% - 60px);
        }

        .fase__indicator__circle{
            margin: 0.8rem 0;
            width: 30px;
            height: 30px;
            font-size: 0.8rem;
        }

        .fase__indicator__circle--current, .fase__indicator__circle--past{
            border: 2px solid var(--mainColor);
        }

        .fase__indicator__circle--future{
            border: 2px solid var(--lightGray);
        }
    }

    @media screen and (max-width: 768px) {
        .fase__indicator{
            z-index: 10;
        }
    }
</style>