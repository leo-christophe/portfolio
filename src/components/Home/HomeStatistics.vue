<script setup>
import { ref, onMounted } from 'vue';

const projectsCompleted = ref(0);
const programmingYears = ref(0);
const commitsNumber = ref(0);
const technologiesMastered = ref(0);

const targetValues = {
    projects: 10,
    years: 5,
    commits: 450,
    technologies: 11
};

const animateNumbers = (refVariable, target) => {
    let start = 0;
    const duration = 500; // Durée de l'animation en ms
    const stepTime = Math.abs(Math.floor(duration / target));

    const update = () => {
        if (start < target) {
            start++;
            refVariable.value = start;
            setTimeout(update, stepTime);
        } else {
            refVariable.value = target; // Assurer que l'on termine à la valeur cible
        }
    };
    update();
};

onMounted(() => {
    animateNumbers(projectsCompleted, targetValues.projects);
    animateNumbers(programmingYears, targetValues.years);
    animateNumbers(commitsNumber, targetValues.commits);
    animateNumbers(technologiesMastered, targetValues.technologies);
});
</script>

<template>
    <div id="statisticsContentContainer">
        <ul id="statisticsList">
            <li class="statistic" id="statistic1" v-tooltip.top="$t('message.finishedProjectsTitle')">
                <span class="number">{{ projectsCompleted }}</span>
                <span>{{$t('message.finishedProject')}}</span>
            </li>

            <li class="statistic" id="statistic2" v-tooltip.top="$t('message.yearsOfProgrammingTitle')">
                <span class="number">{{ programmingYears }}</span>
                <span>{{$t('message.yearsOfProgramming')}}</span>
            </li>

            <li class="statistic" id="statistic3" v-tooltip.top="$t('message.commitsTitle')"> 
                <span class="number">{{ commitsNumber }}</span>
                <span>{{$t('message.commits')}}</span>
            </li>

            <li class="statistic" id="statistic4" v-tooltip.top="$t('message.masteredTechTitle')">
                <span class="number">{{ technologiesMastered }}</span>
                <span>{{$t('message.masteredTech')}}</span>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.p-tooltip {
    padding: var(--p-tooltip-padding); /* Augmenter le padding ici */
}

#statisticsContentContainer{
    position:absolute;
    bottom:5vh;
    width:100%;
}

li.statistic{
    list-style-type: none;
    display:flex;
    padding:1em;    
    width:10vw;
}

ul{
    display:flex;
    justify-content: space-evenly;
    padding:0;
}

.number{
    color: var(--secondColor);
    font-size: 2em !important;
    font-weight: bold;
    margin-right: 1em;
}
</style>
