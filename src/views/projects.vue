<script setup>
import { ref, computed, watch, onMounted, getCurrentInstance } from 'vue'
import Chips from 'primevue/chips'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'
import Calendar from 'primevue/calendar'
import { useI18n } from 'vue-i18n'
import { findClosestCompetence } from '../utils/levenshtein'
import { saveFiltersState, restoreFiltersState, getEarliestDate, getLatestDate, applyFilterStateClasses } from '../utils/project_list'
import { changeLibLangs } from '../utils/traduction'
import { onBeforeMount } from 'vue'

// Initialisation des données
const instance = getCurrentInstance()
const data = instance.appContext.config.globalProperties.$JSONData
const { t, locale } = useI18n()

const Compvalue = ref([])
const startDate = ref(null)
const endDate = ref(null)
const checkType = ref(['University', 'Personal'])
const sortBy = ref('recent')

const filters = ref(null)
const textFilter = ref(null)
const iconFilter = ref(null)

  // Sauvegarde l'état des filtres
  watch([Compvalue, startDate, endDate, checkType], () => {
    saveFiltersState(Compvalue.value, startDate.value, endDate.value, checkType.value)
  }, { deep: true })

onBeforeMount(() => {
  changeLibLangs(localStorage.getItem('lang') || 'en')
})

onMounted(() => {
    restoreFiltersState(Compvalue, startDate, endDate, checkType)
    if (checkType.value.length === 0) checkType.value = ['University', 'Personal']

    if (data.projects && data.projects.length > 0) {
      const projectDates = data.projects.map(project => {
        const projectStart = new Date(project.dates[0])
        const projectEnd = project.dates[1] === t('message.projectsOnGoing') ? new Date() : new Date(project.dates[1])
        return { start: projectStart, end: projectEnd }
      })
      
      startDate.value = getEarliestDate(projectDates).toISOString().split('T')[0]
      endDate.value = getLatestDate(projectDates, t).toISOString().split('T')[0]
    }

    const savedFilterState = localStorage.getItem('project_filterState')
    if (savedFilterState) applyFilterStateClasses(filters.value, iconFilter.value, savedFilterState)

  })

  // Définir la fonction de filtrage et de tri combinée
  const filteredAndSortedProjects = computed(() => {
    // Filtrage par date
    let projects = data.projects || []
    
    if (startDate.value || endDate.value) {
      const start = startDate.value ? new Date(startDate.value) : new Date("1970-01-01")
      const end = endDate.value ? new Date(endDate.value) : new Date("2100-01-01")
      
      if (start > end) {
        alert(t('message.projectsDateError'))
        return []
      }
      
      projects = projects.filter(project => {
        const projectStartDate = new Date(project.dates[0])
        const projectEndDate = project.dates[1] === t('message.projectsOnGoing') ? new Date() : new Date(project.dates[1])
        return projectStartDate >= start && projectEndDate <= end
      })
    }

    // Filtrage par compétence
    if (Compvalue.value.length > 0) {
      const correctedCompetences = Compvalue.value.map(comp => findClosestCompetence(comp))
      projects = projects.filter(project =>
        project.competences && Object.values(project.competences).some(category =>
          category.some(competence => correctedCompetences.includes(competence))
        )
      )
    }

    // Filtrage par type
    projects = projects.filter(project => {
      const type = project.type ? project.type.toLowerCase() : ''
      const typeMap = { fr: { University: 'Universitaire', Personal: 'Personnel' }, en: { University: 'University', Personal: 'Personal' } }
      const localeType = typeMap[locale.value] || typeMap['en']
      const selectedTypes = checkType.value.map(type => localeType[type]?.toLowerCase() || '')
      return selectedTypes.includes(type)
    })

  // Tri selon `sortBy`
  return projects.sort((a, b) => {
    // Vérifier et initialiser la date de début
    if (isNaN(new Date(a.dates[0]))) {
      a.dates[0] = new Date(); // Assigner la date actuelle si la date est invalide
    }

    if (isNaN(new Date(b.dates[0]))) {
      b.dates[0] = new Date(); // Assigner la date actuelle si la date est invalide
    }

    const dateA = new Date(a.dates[0]);
    const dateB = new Date(b.dates[0]);
    
    // Vérifier et initialiser la date de fin
    if (isNaN(new Date(a.dates[1]))) {
      a.dates[1] = new Date(); // Assigner la date actuelle si la date est invalide
    }

    if (isNaN(new Date(b.dates[1]))) {
      b.dates[1] = new Date(); // Assigner la date actuelle si la date est invalide
    }

    let dateFinA = new Date(a.dates[1]);
    let dateFinB = new Date(b.dates[1]);

    // Calculer la durée en jours
    const durationA = (dateFinA - dateA) / (1000 * 60 * 60 * 24); // en jours
    const durationB = (dateFinB - dateB) / (1000 * 60 * 60 * 24); // en jours
    
    switch (sortBy.value) {
      case 'recent':
        return dateB - dateA; // Trier par date la plus récente
      case 'oldest':
        return dateA - dateB; // Trier par date la plus ancienne
      case 'longest':
        return durationB - durationA; // Trier par la durée la plus longue
      case 'shortest':
        return durationA - durationB; // Trier par la durée la plus courte
      default:
        return 0; // Pas de tri
    }
  });

  })

  /**
   *  @function SwitchFilter
   *  @description Permet de basculer l'état des filtres
   *  @returns {void}
   */
   function switchFilter() {
    const filterIcon = iconFilter.value

    // Vérifier que filters.value et filterIcon ne sont pas null
    if (!filters.value || !filterIcon) {
      console.error("filters ou iconFilter n'est pas défini.")
      return
    }

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

  // Simple vérification pour setup la liste des projets
  if (filteredAndSortedProjects.value.length === 0) {
    window.location.reload()
  }

</script>


<template>
  <div>
    <h1>{{$t('message.projectsTitle')}}</h1>
    <span id="sortFilterContainer">
      <Button class="blackVariant">
        <p id="textFilterHeader" @click="switchFilter">
          <i ref="iconFilter" class="pi pi-angle-down" style="margin: 0 10px 0 0"></i> 
          {{$t('message.projectsFiltersKeyword')}}
        </p>
      </Button>

      <div class="sort-filter">
        <label for="sort">{{$t('message.projectsSort')}}</label>
        <select id="sort" v-model="sortBy" class="blackVariant">
          <option value="recent">{{$t('message.projectsMostRecent')}}</option>
          <option value="oldest">{{$t('message.projectsOldest')}}</option>
          <option value="longest">{{$t('message.projectsLongest')}}</option>
          <option value="shortest">{{$t('message.projectsShortest')}}</option>
        </select>
      </div>
    </span>

    <div id="filters" class="card gap-3 p-fluid filterDeactivated" ref="filters">
      <div id="dateFilters">
        <h3>{{ $t('message.projectsDateLabel') }}</h3>
        <Calendar  v-model="startDate" class="dateInput" id="startDate" :showIcon="true" dateFormat="yy-mm-dd"/>
        <Calendar v-model="endDate" class="dateInput" id="endDate" :showIcon="true" dateFormat="yy-mm-dd"/>
      </div>

      <div id="motClesContainer">
        <h3>{{ $t('message.projectsKeywordsLabel') }}</h3>
        <Chips v-model="Compvalue" separator="," :title="$t('message.projectsFiltersKeywordTitle')"/>
      </div>

      <div id="typeProjetContainer">
        <h3>{{$t('message.projectsTypeLabel')}}</h3>
        <div>
          <Checkbox v-model="checkType" inputId="University" value="University" :title="$t('message.projectsTypeUniversityTitle')"/>
          <label for="University"> {{$t('message.projectsTypeUniversity')}} </label>
        </div>
        <div>
          <Checkbox v-model="checkType" inputId="Personal" value="Personal" :title="$t('message.projectsTypePersonalTitle')"/>
          <label for="Personal"> {{$t('message.projectsTypePersonal')}} </label>
        </div>
      </div>
    </div>

    <ul id="projectList">
      <li v-for="project in filteredAndSortedProjects" :key="project.id" :id="project.id" class="projectCard">
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
      flex-direction: row;
      
      select{
        padding:20px;
      }

      .datesIn{
        margin:10px
      }
    }
  }

  #startDate{
    margin-bottom:10px;
  }

  #startDate, #endDate{
    color:var(--darkBackground-color) !important;
    background-color:var(--textBasicColor) !important;
    width:150px;
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
    min-width:100vw; 
    padding:2vh 0 2vh 0;
    justify-content: space-around;
    background-color:rgb(66, 79, 79);
  }

  Button#blackVariant{
    margin-left:2vw;
  }

  #textFilterHeader{
    width:fit-content;
    height:fit-content;
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

  #motClesContainer{
    width: 30vw !important;
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

  input[name="checkType"] {
    color:black;
  }

  #typeProjetContainer > div > div > div{
    margin-right: 5px;
  }

  #typeProjetContainer{
    display: flex;
    flex-direction: column;
  }

  .dateInput {
    height: 30px;
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    font-size: 1em;
    border-radius: 10px;
  }

  #sortFilterContainer{
    display:flex;
    justify-content: space-between;
    margin: 20px 0px 0px 0px;
  }

  div#typeProjetContainer div{
    display:flex;
    flex-direction:row;
    justify-content:flex-start  ;
  }

  #sort{
    padding:10px;
  }
  
</style>