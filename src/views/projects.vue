<script setup>
  import { ref, computed, onMounted, watch, getCurrentInstance } from 'vue'
  import Chips from 'primevue/chips'
  import Checkbox from 'primevue/checkbox'
  import { useI18n } from 'vue-i18n'
  import { findClosestCompetence } from '../utils/levenshtein'
  import { saveToLocalStorage, restoreFromLocalStorage, getEarliestDate, getLatestDate, saveFiltersState, restoreFiltersState, applyFilterStateClasses } from '../utils/project_list'
  import DateUtils from '../utils/date_utils'

  const instance = getCurrentInstance();
  const data = instance.appContext.config.globalProperties.$JSONData;

  const { t, locale } = useI18n()

  const Compvalue = ref([])
  const startDate = ref(null)
  const endDate = ref(null)
  const checkType = ref(['University', 'Personal'])

  const filters = ref(null)
  const textFilter = ref(null)
  const iconFilter = ref(null)

  // Sauvegarde l'état des filtres
  watch([Compvalue, startDate, endDate, checkType], () => {
    saveFiltersState(Compvalue.value, startDate.value, endDate.value, checkType.value)
  }, { deep: true })

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

  /**
   * @function filteredProjects
   * @description Filtre les projets en fonction des critères de recherche
   * @returns {Array} Liste des projets filtrés
   */
  const filteredProjects = computed(() => {
    let filteredByDate = data.projects || []

    if (startDate.value || endDate.value) {
      const end = endDate.value ? new Date(endDate.value) : new Date("2100-01-01")
      const start = startDate.value ? new Date(startDate.value) : new Date("1970-01-01")

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        alert(t('message.projectsInvalidDate'))
        return []
      }

      if (start > end) {
        alert(t('message.projectsDateError'))
        return []
      } else {
        filteredByDate = filteredByDate.filter(project => {
          const projectStartDate = new Date(project.dates[0])
          const projectEndDate = project.dates[1] === t('message.projectsOnGoing') ? new Date() : new Date(project.dates[1])
          return (projectStartDate >= start && projectEndDate <= end)
        })
      }
    }

    if (Compvalue.value && Compvalue.value.length > 0) {
      const correctedCompetences = Compvalue.value.map(comp => findClosestCompetence(comp))

      filteredByDate = filteredByDate.filter(project => {
        return project.competences && Object.values(project.competences).some(category =>
          category.some(competence => correctedCompetences.includes(competence))
        )
      })
    }

    // Filtrage par type de projet
    return filteredByDate.filter(project => {
      const hasProjectType = project.type !== undefined && project.type !== null
      const normalizedProjectType = hasProjectType ? project.type.toLowerCase() : ''
      
      const checkTypeLabels = {
        'fr': { University: 'Universitaire', Personal: 'Personnel' },
        'en': { University: 'University', Personal: 'Personal' }
      }
      const currentLang = checkTypeLabels[locale.value] ? locale.value : 'en'
      const normalizedCheckTypes = checkType.value.map(type => checkTypeLabels[currentLang][type]?.toLowerCase() || '')
      
      return hasProjectType && normalizedCheckTypes.includes(normalizedProjectType)
    })
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
</script>



<template>
  
  <div>
    <h1>{{$t('message.projectsTitle')}}</h1>
    
    <p id="textFilterHeader" ref="textFilter" @click="switchFilter()"><i ref="iconFilter" class="pi pi-angle-down" style="margin: 0 10px 0 0"></i> {{$t('message.projectsFiltersKeyword')}}</p>
    <div id="filters" ref="filters" class="card gap-3 p-fluid filterDeactivated">
      <div class="datesIn" id="dateFilters">
        <h3 id="datesTitle">{{ $t('message.projectsDateLabel') }}</h3>
        <input class="dateInput" type="date" v-model="startDate" id="startDate">
        <input class="dateInput" type="date" v-model="endDate" id="endDate">
      </div>
      
      <div class="datesIn" id="motClesContainer">
        <h3 id="motclesTitle">{{ $t('message.projectsKeywordsLabel') }}</h3>
        <div id="competenceFilter" class="p-fluid chip">
          <Chips v-model="Compvalue" separator="," :title="$t('message.projectsFiltersKeywordTitle')"/>
        </div>
      </div>

      <div class="datesIn" id="typeProjetContainer">
        <h3 id="typProjetTitle">{{$t('message.projectsTypeLabel')}}</h3>
        <div class="flex flex-wrap gap-3">
          <div class="flex align-items-center">
            <Checkbox v-model="checkType" inputId="University" name="checkType" value="University" :title="$t('message.projectsTypeUniversityTitle')"/>
            <label for="University" class="ml-2"> {{$t('message.projectsTypeUniversity')}} </label>
          </div>
          <div class="flex align-items-center">
            <Checkbox v-model="checkType" inputId="Personal" name="checkType" value="Personal" :title="$t('message.projectsTypePersonalTitle')"/>
            <label for="Personal" class="ml-2"> {{$t('message.projectsTypePersonal')}} </label>
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
    color:var(--darkBackground-color);
    background-color:var(--textBasicColor);
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

  #typeProjetContainer > div > div > div{
    margin-right: 5px;
  }

  .dateInput {

    height: 30px;
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    font-size: 1em;
    border-radius: 10px;
  }

  
</style>