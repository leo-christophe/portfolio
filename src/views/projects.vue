<script setup>
import { ref, computed } from 'vue'
import data from '../data/data.json'
import Chips from 'primevue/chips';
import Calendar from 'primevue/calendar';

const Compvalue = ref();
// Définir les variables de date pour le filtre
const startDate = ref('')
const endDate = ref('')

// Calculer les projets filtrés par date
const filteredProjects = computed(() => {
  // Défaut pour endDate à aujourd'hui
  if (!endDate.value) {
    endDate.value = new Date("2100-01-01").toISOString().split('T')[0]
  } 

  // Défaut pour startDate à une date très ancienne
  if (!startDate.value) {
    startDate.value = new Date("1970-01-01").toISOString().split('T')[0]
  }

  const start = new Date(startDate.value)
  const end = new Date(endDate.value)

  if (start > end) {
    alert('La date de début doit être antérieure à la date de fin')
    return data.projects
  }

  return data.projects.filter(project => {
    const projectStartDate = new Date(project.dates[0])
    const projectEndDate = project.dates[1] === "En cours" ? new Date() : new Date(project.dates[1])

    return (projectStartDate >= start && projectEndDate <= end)
  })
})
</script>


<template>
    <div>
        <h1>Projects</h1>
        
        <!-- Ajouter des champs de filtre de date -->
        <div id="dates" class="card flex flex-wrap gap-3 p-fluid">
            <div class="datesIn">
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

        </div>

        

        <ul>
            <li v-for="project in filteredProjects" :key="project.id" :id="project.id" class="projectCard">
                <router-link :to="project.route">
                    <div class="projectCardIn">
                        {{ project.titre }}
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>


<style scoped>
#competenceFilter{
    padding-top: 10px;
    
}
.datesIn{
    display:table-column;
    margin-left:10px;
}
h1{
    text-align:center;

}
.chip{
    width:500px;
    text-align:center;
}

input{
    text-align:center;
}

li .p-chips-token{
    display: flex;
    flex-wrap: wrap;
    list-style:none;
}

#dates {
    display:flex;
    justify-content: center;
    margin: 10px;
}

ul {
    display: inline-flex;
    list-style: none;
}

.projectCardIn {
    list-style-type: none;
    border: 1px solid black;
    margin: 10px;
    padding: 10px 0px 0px 0px;
    width: 20vw;
    height: 100px;
    background-color: white;
    transition: 1s;
}

.projectCardIn:hover {
    font-size: 115%;
    transition: 1s;
}

label {
    margin-right: 10px;
}

input[type="date"] {
    margin: 5px;
}

.dateInput{
    width:150px;
    height:30px;
    font-family: 'Roboto', sans-serif;
    font-weight:bold;
    font-size: 1em;
    border-radius: 10px;
}
</style>
