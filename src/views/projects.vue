<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import data from '../data/data.json'
import Chips from 'primevue/chips'
import Calendar from 'primevue/calendar'
import Checkbox from 'primevue/checkbox'
import { COULEUR_MENU_SELECTIONNE, COULEUR_MENU_BASIC } from '../data/const'
import json from '../data/data';
import { findClosestCompetence } from '../utils/levenshtein'

// Liste de compétences prédéfinies
const predefinedCompetences = json.valid_skills

const Compvalue = ref([])
const startDate = ref(null)
const endDate = ref(null)
const checkType = ref([])

onMounted(() => {
  // Appliquer les styles
  $('nav ul li:nth-child(4)').css('border-bottom', '2px solid ' + COULEUR_MENU_SELECTIONNE);
  $('nav ul li:nth-child(4) span').css('color', COULEUR_MENU_SELECTIONNE);

  // Trouver les dates des projets
  if (data.projects && data.projects.length > 0) {
    const projectDates = data.projects.map(project => {
      const projectStart = new Date(project.dates[0])
      const projectEnd = project.dates[1] === "En cours" ? new Date() : new Date(project.dates[1])
      return { start: projectStart, end: projectEnd }
    })
    
    // Trouver la date du premier projet réalisé
    const earliestStart = projectDates.reduce((earliest, current) => {
      return current.start < earliest ? current.start : earliest
    }, projectDates[0].start)

    // Trouver la date du dernier projet réalisé
    const latestEnd = projectDates.reduce((latest, current) => {
      
      // Create a new date for today + 1 day
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      if (current.end.getDate() === new Date().getDate()) {
        current.end = tomorrow
      }

      if (current.end > latest) {
        return current.end
      }
      return latest

    }, projectDates[0].end)

    console.log(earliestStart, latestEnd)

    // Assigner les valeurs trouvées
    startDate.value = earliestStart.toISOString().split('T')[0]
    endDate.value = latestEnd.toISOString().split('T')[0]

    
  }
})

onUnmounted(() => {
  $('nav ul li:nth-child(4)').css('border-bottom', '0px');
  $('nav ul li:nth-child(4) span').css('color', COULEUR_MENU_BASIC);
})

const filteredProjects = computed(() => {
  let filteredByDate = data.projects || []

  // Filtrer par date
  if (startDate.value || endDate.value) {
    const end = endDate.value ? new Date(endDate.value) : new Date("2100-01-01")
    const start = startDate.value ? new Date(startDate.value) : new Date("1970-01-01")

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      alert('Veuillez entrer des dates valides.')
      return []
    }

    if (start > end) {
      alert('La date de début doit être antérieure à la date de fin')
      return []
    } else {
      filteredByDate = filteredByDate.filter(project => {
        if (!project.dates || project.dates.length < 2) return false

        const projectStartDate = new Date(project.dates[0])
        const projectEndDate = project.dates[1] === "En cours" ? new Date() : new Date(project.dates[1])

        return (projectStartDate >= start && projectEndDate <= end)
      })
    }
  }

  // Filtrer par compétence
  if (Compvalue.value && Compvalue.value.length > 0) {
    const correctedCompetences = Compvalue.value.map(comp => findClosestCompetence(comp))
    filteredByDate = filteredByDate.filter(project => {
      return project.competences && project.competences.some(competence => correctedCompetences.includes(competence))
    })
  }

  // Filtrer par type de projet
  if (checkType.value && checkType.value.length > 0) {
    filteredByDate = filteredByDate.filter(project => {
      return project.type && checkType.value.includes(project.type)
    })
  }

  return filteredByDate
})
</script>


<template>
  <div>
    <h1>Projects</h1>
    
    <div id="dates" class="card flex flex-wrap gap-3 p-fluid">
      <div class="datesIn" id="dateFilters">
        <h3>Dates</h3>
        <input class="dateInput" type="date" v-model="startDate" id="startDate">
        <input class="dateInput" type="date" v-model="endDate" id="endDate">
      </div>
      
      <div class="datesIn">
        <h3>Mots clés</h3>
        <div id="competenceFilter" class="p-fluid chip">
          <Chips v-model="Compvalue" separator="," title="Mots clés pour trier les projets utilisant l'algorithme de Levenshtein"/>
        </div>
      </div>

      <div class="datesIn">
        <h3>Type de projet:</h3>
        <div class="flex flex-wrap gap-3">
            <div class="flex align-items-center">
                <Checkbox v-model="checkType" inputId="universitaire" name="checkType" value="Universitaire" title="Projets réalisés dans le cadre de mes études."/>
                <label for="universitaire" class="ml-2"> Universitaire </label>
            </div>
            <div class="flex align-items-center">
                <Checkbox v-model="checkType" inputId="personnel" name="checkType" value="Personnel" title="Projets réalisés en loisir ou dans mon temps personnel."/>
                <label for="personnel" class="ml-2"> Personnel </label>
            </div>
        </div>
      </div>
    </div>

    <ul>
      <li v-for="project in filteredProjects" :key="project.id" :id="project.id" class="projectCard">
        <router-link :to="project.route" class="liensrouteur">
          <div class="projectCardIn">
            <h3 class="projectName">{{ project.nom }}</h3> 
          </div>

          <div class="pjtImgContainer">
            <img v-if="project.images[0]" 
            :src="'/images/projects/'+project.images[0].link" 
            :alt="project.images[0].description" 
            :title="project.images[0].description"
            class="projectimage">
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
  div.projectCardIn{
    height:min-content;
  }

  li.projectCard{
    background-color:black;
    height:min-content;
    width:min-content;
  }

  h3.projectName{
      color:white;
      background-color:gray;
      text-align:center;
      padding: 5px 0px 50px 0px;
      border:2px solid darkslategray;
  }

 .projectimage{
    width:100%;
    object-fit: cover;
    display:flex;
    align-items:center;
    flex:1;
    flex-wrap: wrap;
    flex-direction: row;
    flex-flow: wrap;
 }

 .pjtImgContainer{
  width: 300px;
    height: 200px;
    overflow: hidden;
    position: relative;
 }

 .pjtImgContainer .projectimage{
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 0.5s ease, object-position 0.5s ease;
 }

 .pjtImgContainer:hover .projectimage{
    transform: scale(0.90);
    
    border:1 px solid white;
    object-fit: cover;
    object-position: center;

    transition: transform 0.5s ease, object-position 0.75s ease-out, color 1s ease-in, border 1s ease-in;
 }

  #dates > div.card.flex.flex-wrap.justify-content-center.gap-3{
    height:60px;
    position:relative;
  }

  h3{
    height:30px;
  }

  .projectCard {
    min-width:300px;
    margin: 20px;
    border: 3px solid gray;
    color: white;
    box-shadow: 2px 2px 2px 2px black;
  }

  .liensrouteur {
    text-decoration: none;
  }

  #competenceFilter {
    padding-top: 10px;
  }

  .datesIn {
    display: table-column;
    margin-left: 20px;
    margin-right: 20px;
  }
  h1 {
    text-align: center;
    margin-bottom:30px;
  }

  .chip {
    width: 500px;
    text-align: center;
  }

  input {
    text-align: center;
  }

  li .p-chips-token {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
  }

  #dates {
    display: flex;
    justify-content: center;

    background-color:rgb(66, 79, 79);
    min-width:1050px;
  }

  ul {
    display: inline-flex;
  
    list-style: none;
  }

  .projectCardIn {
    list-style-type: none;
    text-decoration: none;
    border: 1px solid black;
    color: white;
    padding: 10px;
    width: 100%;
    height: 100px;
    background-color: rgb(0, 0, 0);
    transition: 1s;
  }

  .projectCardIn:hover {
    font-size: 105%;
    transition: 0.1s;
  }

  label {
    margin-right: 10px;
  }

  input[type="date"] {
    margin: 5px;
  }

  input[name="checkType"] {
    color:black;
  }

  .dateInput {
    width: 150px;
    height: 30px;
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    font-size: 1em;
    border-radius: 10px;
  }
</style>
