<script setup>
import { ref, computed } from 'vue'
import data from '../data/data.json'
import Chips from 'primevue/chips'
import Calendar from 'primevue/calendar'
import Checkbox from 'primevue/checkbox'

const Compvalue = ref(null)
const startDate = ref('')
const endDate = ref('')
const checkType = ref()


const filteredProjects = computed(() => {
  let filteredByDate = data.projects || []

  // Filtrer par date
  if (startDate.value || endDate.value) {
    // Défaut pour endDate à une date très lointaine
    const end = endDate.value ? new Date(endDate.value) : new Date("2100-01-01")
    endDate.value = end.toISOString().split('T')[0]

    // Défaut pour startDate à une date très ancienne
    const start = startDate.value ? new Date(startDate.value) : new Date("1970-01-01")
    startDate.value = start.toISOString().split('T')[0]

    if (start > end) {
      alert('La date de début doit être antérieure à la date de fin')
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
    return filteredByDate.filter(project => {
      return project.competences && project.competences.some(competence => Compvalue.value.includes(competence))
    })
  }

  if (checkType.value) {
    return filteredByDate.filter(project => {
      return project.type && checkType.value.includes(project.type)
    })
  }

  return filteredByDate
})


</script>

<template>
  <div>
    <h1>Projects</h1>
    
    <!-- Ajouter des champs de filtre de date -->
    <div id="dates" class="card flex flex-wrap gap-3 p-fluid">
      <div class="datesIn" id="dateFilters">
        <h3>Dates</h3>
        <input class="dateInput" type="date" v-model="startDate" id="startDate">
        <input class="dateInput" type="date" v-model="endDate" id="endDate">
      </div>
      
      <div class="datesIn">
        <h3>Mots clés</h3>
        <div id="competenceFilter" class=" p-fluid chip">
          <Chips v-model="Compvalue" separator=","  />
        </div>
      </div>

      <div class="datesIn">
        <h3>Type de projet:</h3>
        <div class=" flex flex-wrap gap-3">
            <div class="flex align-items-center">
                <Checkbox v-model="checkType" inputId="universitaire" name="checkType" value="Universitaire"/>
                <label for="universitaire" class="ml-2"> Universitaire </label>
            </div>
            <div class="flex align-items-center">
                <Checkbox v-model="checkType" inputId="personnel" name="checkType" value="Personnel"/>
                <label for="personnel" class="ml-2"> Personnel </label>
            </div>
        </div>
      </div>

    </div>

    <ul>
      <li v-for="project in filteredProjects" :key="project.id" :id="project.id" class="projectCard">
        <router-link :to="project.route" class="liensrouteur">
          <div class="projectCardIn">
            {{ project.titre }}
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
#dates > div.card.flex.flex-wrap.justify-content-center.gap-3{
  height:60px;
  position:relative;
}
h3{
  height:30px;
}

.projectCard {
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
  margin: 10px;
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
  width: 20vw;
  height: 100px;
  background-color: rgb(0, 0, 0);
  transition: 1s;
}

.projectCardIn:hover {
  font-size: 105%;
  transition: 1s;
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
