<script setup>
import { ref, onMounted } from 'vue';
import data from '../../data/data_en.json';

const projectsCompleted = ref(0);
const programmingYears = ref(0);
const commitsNumber = ref(0);
const technologiesMastered = ref(0);

// Déclarer targetValues comme un ref
const targetValues = ref({
  projects: data.projects.length,
  years: new Date().getFullYear() - parseInt(data.formations[1]["annees"].substring(0, 4), 10),
  commits: 0, // Initialisé à 0, sera mis à jour après getContributions
  technologies: 11
});

async function getContributions() {
  try {
    // Récupérer les données des deux comptes GitHub
    const response1 = await fetch('https://github-contributions-api.jogruber.de/v4/leo-christophe');
    const data1 = await response1.json();

    const response2 = await fetch('https://github-contributions-api.jogruber.de/v4/leochris7');
    const data2 = await response2.json();

    // Fusionner les contributions annuelles des deux comptes
    const contributions = {};

    // Ajouter les contributions du premier compte
    for (const [year, count] of Object.entries(data1.total)) {
      contributions[year] = (contributions[year] || 0) + count;
    }

    // Ajouter les contributions du deuxième compte
    for (const [year, count] of Object.entries(data2.total)) {
      contributions[year] = (contributions[year] || 0) + count;
    }

    // Calculer la somme totale des contributions
    let totalContributions = 0;
    for (const count of Object.values(contributions)) {
      totalContributions += count;
    }

    return totalContributions;
  } catch (error) {
    console.error('Erreur lors de la récupération des contributions:', error);
    return 0; // Retourner 0 en cas d'erreur
  }
}

function changePage(link) {
  if (link.substring(0, 1) === "/") {
    window.location.href = link;
  } else {
    window.open("https://" + link);
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

onMounted(async () => {
  // Récupérer le nombre total de contributions
  let totalCommits = await getContributions();
  console.log(totalCommits == 0)
  if (totalCommits == 0) {
    totalCommits = 500;
  }
  targetValues.value.commits = totalCommits; // Utiliser .value pour accéder à l'objet réactif


  // Lancer les animations
  animateNumbers(projectsCompleted, targetValues.value.projects);
  animateNumbers(programmingYears, targetValues.value.years);
  animateNumbers(commitsNumber, targetValues.value.commits);
  animateNumbers(technologiesMastered, targetValues.value.technologies);
});
</script>

<template>
    <div id="statisticsContentContainer">
        <ul id="statisticsList">
            <li class="statistic" id="statistic1" v-tooltip.top="$t('home.statistics.finishedProjectsTitle')" @click="changePage('/projects')">
                <span class="number">{{ projectsCompleted }}</span>
                <span class="textN">{{$t('home.statistics.finishedProject')}}</span>
            </li>

            <li class="statistic" id="statistic2" v-tooltip.bottom="$t('home.statistics.yearsOfProgrammingTitle')" @click="changePage('/formations')">
                <span class="number">{{ programmingYears }}</span>
                <span class="textN">{{$t('home.statistics.yearsOfProgramming')}}</span>
            </li>

            <li class="statistic" id="statistic3" v-tooltip.top="$t('home.statistics.commitsTitle')" @click="changePage('github.com/leo-christophe')"> 
                <span class="number">{{ commitsNumber }}</span>
                <span class="textN">{{$t('home.statistics.commits')}}</span>
            </li>

            <li class="statistic" id="statistic4" v-tooltip.bottom="$t('home.statistics.masteredTechTitle')" @click="changePage('/skills')">
                <span class="number">{{ technologiesMastered }}</span>
                <span class="textN">{{$t('home.statistics.masteredTech')}}</span>
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
