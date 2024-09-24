<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import Chips from 'primevue/chips'
import Checkbox from 'primevue/checkbox'
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

import data from '../data/data.json'
import { findClosestCompetence } from '../utils/levenshtein'

const toast = useToast();

// Références aux valeurs des filtres
const Compvalue = ref([])
const startDate = ref(null)
const endDate = ref(null)
const checkType = ref([])

// Références aux éléments du DOM
const filters = ref(null)
const textFilter = ref(null)
const iconFilter = ref(null)

// Fonction générique pour sauvegarder une valeur dans le localStorage
function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

// Fonction générique pour restaurer une valeur depuis le localStorage
function restoreFromLocalStorage(key, defaultValue = null) {
  const savedValue = localStorage.getItem(key)
  return savedValue ? JSON.parse(savedValue) : defaultValue
}

// Sauvegarde des filtres dans le stockage local
function saveFiltersState() {
  saveToLocalStorage('filter_competences', Compvalue.value)
  saveToLocalStorage('filter_startDate', startDate.value)
  saveToLocalStorage('filter_endDate', endDate.value)
  saveToLocalStorage('filter_checkType', checkType.value)
}

// Restauration des filtres depuis le stockage local
function restoreFiltersState() {
  Compvalue.value = restoreFromLocalStorage('filter_competences', [])
  startDate.value = restoreFromLocalStorage('filter_startDate', null)
  endDate.value = restoreFromLocalStorage('filter_endDate', null)
  checkType.value = restoreFromLocalStorage('filter_checkType', [])
}

// Sauvegarde l'état d'un élément de filtre à chaque changement
watch([Compvalue, startDate, endDate, checkType], saveFiltersState, { deep: true })

onMounted(() => {
  // Restaure les filtres depuis le stockage local au démarrage
  restoreFiltersState()

  // Code existant pour calculer et assigner les dates par défaut
  if (data.projects && data.projects.length > 0) {
    const projectDates = data.projects.map(project => {
      const projectStart = new Date(project.dates[0])
      const projectEnd = project.dates[1] === "En cours" ? new Date() : new Date(project.dates[1])
      return { start: projectStart, end: projectEnd }
    })

    const earliestStart = projectDates.reduce((earliest, current) => {
      return current.start < earliest ? current.start : earliest
    }, projectDates[0].start)

    const latestEnd = projectDates.reduce((latest, current) => {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)

      if (current.end.getDate() === new Date().getDate()) {
        current.end = tomorrow
      }

      return current.end > latest ? current.end : latest
    }, projectDates[0].end)

    startDate.value = earliestStart.toISOString().split('T')[0]
    endDate.value = latestEnd.toISOString().split('T')[0]
  }

  // Restauration de l'état des filtres (actif/inactif)
  const savedFilterState = localStorage.getItem('project_filterState')
  if (savedFilterState) {
    if (savedFilterState === 'activated') {
      filters.value.classList.add('filterActivated')
      filters.value.classList.remove('filterDeactivated')
      iconFilter.value.classList.remove('pi-angle-down')
      iconFilter.value.classList.add('pi-angle-double-down')
    } else {
      filters.value.classList.add('filterDeactivated')
      filters.value.classList.remove('filterActivated')
      iconFilter.value.classList.add('pi-angle-down')
      iconFilter.value.classList.remove('pi-angle-double-down')
    }
  }
})

// Filtrer les projets selon les critères
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
      return project.competences && Object.values(project.competences).some(category =>
        category.some(competence => correctedCompetences.includes(competence))
      )
    })
  }

  // Filtrer par type de projet
  if (checkType.value && checkType.value.length > 0) {
    filteredByDate = filteredByDate.filter(project => {
      return project.type && checkType.value.includes(project.type)
    })
  }

  if (filteredByDate.length === 0) {
    alert('Aucun projet ne correspond à vos critères de recherche.')
    document.querySelector('li input').textContent = ''
    return data.projects;
  }

  return filteredByDate
})

/**
 * Fonction pour activer/désactiver les filtres
 */
function switchFilter() {
  const filterIcon = iconFilter.value

  if (filters.value.classList.contains('filterDeactivated')) {
    filters.value.classList.remove('filterDeactivated')
    filters.value.classList.add('filterActivated')

    filterIcon.classList.remove('pi-angle-down')
    filterIcon.classList.add('pi-angle-double-down')

    localStorage.setItem('project_filterState', 'activated')
  } else {
    filters.value.classList.add('filterDeactivated')
    filters.value.classList.remove('filterActivated')

    filterIcon.classList.add('pi-angle-down')
    filterIcon.classList.remove('pi-angle-double-down')

    localStorage.setItem('project_filterState', 'deactivated')
  }
}
</script>



<template>
  
  <div>
    <h1>Projets</h1>
    
    <p id="textFilterHeader" ref="textFilter" @click="switchFilter()"><i ref="iconFilter" class="pi pi-angle-down" style="margin: 0 10px 0 0"></i> Filtres</p>
    <div id="filters" ref="filters" class="card gap-3 p-fluid filterDeactivated">
      <div class="datesIn" id="dateFilters">
        <h3 id="datesTitle">Dates</h3>
        <input class="dateInput" type="date" v-model="startDate" id="startDate">
        <input class="dateInput" type="date" v-model="endDate" id="endDate">
      </div>
      
      <div class="datesIn" id="motClesContainer">
        <h3 id="motclesTitle">Mots clés</h3>
        <div id="competenceFilter" class="p-fluid chip">
          <Chips v-model="Compvalue" separator="," title="Mots clés pour trier les projets utilisant l'algorithme de Levenshtein"/>
        </div>
      </div>

      <div class="datesIn" id="typeProjetContainer">
        <h3 id="typProjetTitle">Type de projet:</h3>
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

    <ul id="projectList">
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
  @media screen and (max-width: 860px){
    .filterActivated{
      display:flex;
      flex-wrap:wrap;
      flex-direction: column;
      
      .datesIn{
        margin:10px
      }
    }
  }

  #startDate, #endDate{
    color:black;
  }

  .filterActivated{
    display:flex;
  }
    
  .filterDeactivated{
    display:none;
  }

  #filters{
    position:relative;
    width:100%;    
    justify-content: center;
    background-color:rgb(66, 79, 79);
  }

  #textFilterHeader{
    margin-left:10px;
  }

  #textFilterHeader:hover{
    cursor:pointer;
    font-weight: 500;
  }

  div.projectCardIn{
    height:min-content;
  }

  ul#projectList{
    display:flex;
    flex-wrap:wrap;
    justify-content:center;
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
      padding: 5px 0px 5px 0px;
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


  .projectCard {
    min-width:300px;
    margin: 20px 35px 20px 35px;
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

    height: 30px;
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    font-size: 1em;
    border-radius: 10px;
  }

  
</style>