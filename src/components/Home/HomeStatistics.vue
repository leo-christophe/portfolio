<script setup>
import { ref, onMounted } from 'vue';
import data from '../../data/data_en.json'

const projectsCompleted = ref(0);
const programmingYears = ref(0);
const commitsNumber = ref(0);
const technologiesMastered = ref(0);

const targetValues = {
    projects: data.projects.length,
    years: new Date().getFullYear() -  parseInt(data.formations[1]["annees"].substring(0, 4), 10),
    commits: 450,
    technologies: 11
};

function changePage(link){
    if (link.substring(0,1) === "/") {
        window.location.href = link;
    } else {
        window.open("https://"+link);
    }
}

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
            <li class="statistic" id="statistic1" v-tooltip.top="$t('message.finishedProjectsTitle')" @click="changePage('/projects')">
                <span class="number">{{ projectsCompleted }}</span>
                <span class="textN">{{$t('message.finishedProject')}}</span>
            </li>

            <li class="statistic" id="statistic2" v-tooltip.bottom="$t('message.yearsOfProgrammingTitle')" @click="changePage('/formations')">
                <span class="number">{{ programmingYears }}</span>
                <span class="textN">{{$t('message.yearsOfProgramming')}}</span>
            </li>

            <li class="statistic" id="statistic3" v-tooltip.top="$t('message.commitsTitle')" @click="changePage('github.com/leo-christophe')"> 
                <span class="number">{{ commitsNumber }}</span>
                <span class="textN">{{$t('message.commits')}}</span>
            </li>

            <li class="statistic" id="statistic4" v-tooltip.bottom="$t('message.masteredTechTitle')" @click="changePage('/skills')">
                <span class="number">{{ technologiesMastered }}</span>
                <span class="textN">{{$t('message.masteredTech')}}</span>
            </li>
        </ul>
    </div>
</template>

<style scoped>

/*//////////////////////////////////////
///         SMARTPHONE STYLES        ///
///        (0px - 860px)             ///
////////////////////////////////////////*/

@media screen and (max-width: 860px){
    div#statisticsContentContainer{
        display:none !important;
    }
}

/*//////////////////////////////////////
///         TABLETTE ET TEL          ///
///        (0px - 1500px)            ///
////////////////////////////////////////*/
@media screen and (max-width: 1500px){
    ul#statisticsList{
        margin:0;
        padding:0;
        font-size:smaller;
        justify-content: space-around;
    }

    li.statistic{
        padding:0.5em;
        width: min-content !important;
    }
}

@media screen and (max-width: 1200px){
    ul{
        flex-wrap: wrap !important;
    }
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
    width: min-content !important;
    cursor:pointer;
}

ul{
    display:flex;
    justify-content: space-evenly;
    padding:0;
}

.number{
    color: var(--secondColor);
    font-size: 4em !important;
    font-weight: bold;
    margin-right: 1em;
}

.textN{
    font-size: 2em !important;
    font-weight: bold;
}
</style>
