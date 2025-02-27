<script setup>
import { ref, computed, watch, onMounted, getCurrentInstance } from "vue";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import Calendar from "primevue/calendar";
// import DataView from 'primevue/dataview'
import { useI18n } from "vue-i18n";
import { findClosestCompetence } from "../utils/levenshtein";
import {
  saveFiltersState,
  restoreFiltersState,
  getEarliestDate,
  getLatestDate,
  applyFilterStateClasses,
} from "../utils/project_list";
import { changeLibLangs } from "../utils/traduction";

import { onBeforeMount } from "vue";

// Initialisation des données
const instance = getCurrentInstance();
const data = instance.appContext.config.globalProperties.$JSONData;
const { t, locale } = useI18n();

const chipsExpanded = ref(false);
const Compvalue = ref([]);
const startDate = ref(null);
const endDate = ref(null);
const checkType = ref(["University", "Personal"]);
const sortBy = ref("recent");

const filters = ref(null);
const iconFilter = ref(null);

// Filtrage des compétences
const filteredCompetences = computed(() => {
  if (!searchCompetence.value) return [];
  return allCompetences.value.filter((comp) =>
    comp.toLowerCase().includes(searchCompetence.value.toLowerCase()),
  );
});

// Sauvegarde l'état des filtres
watch(
  [Compvalue, startDate, endDate, checkType],
  () => {
    saveFiltersState(
      Compvalue.value,
      startDate.value,
      endDate.value,
      checkType.value,
    );
  },
  { deep: true },
);

onBeforeMount(() => {
  changeLibLangs(localStorage.getItem("lang") || "en");
});

onMounted(() => {
  restoreFiltersState(Compvalue, startDate, endDate, checkType);
  if (checkType.value.length === 0)
    checkType.value = ["University", "Personal"];

  if (data.projects && data.projects.length > 0) {
    const projectDates = data.projects.map((project) => {
      const projectStart = new Date(project.dates[0]);
      const projectEnd =
        project.dates[1] === t("projects.projectsOnGoing")
          ? new Date()
          : new Date(project.dates[1]);
      return { start: projectStart, end: projectEnd };
    });

    startDate.value = getEarliestDate(projectDates).toISOString().split("T")[0];
    endDate.value = getLatestDate(projectDates).toISOString().split("T")[0];
  }

  const savedFilterState = localStorage.getItem("project_filterState");
  if (savedFilterState)
    applyFilterStateClasses(filters.value, iconFilter.value, savedFilterState);
});

// Définir la fonction de filtrage et de tri combinée
const filteredAndSortedProjects = computed(() => {
  // Filtrage par date
  let projects = data.projects || [];

  if (startDate.value || endDate.value) {
    const start = startDate.value
      ? new Date(startDate.value)
      : new Date("1970-01-01");
    const end = endDate.value
      ? new Date(endDate.value)
      : new Date("2100-01-01");

    // Ne devrait théoriquement jamais arriver
    if (start > end) {
      alert(t("projects.projectsDateError"));
      return [];
    }

    projects = projects.filter((project) => {
      const projectStartDate = new Date(project.dates[0]);
      const projectEndDate =
        project.dates[1] === t("projects.projectsOnGoing")
          ? new Date()
          : new Date(project.dates[1]);
      return projectStartDate >= start && projectEndDate <= end;
    });
  }

  // Filtrage par compétence
  if (Compvalue.value.length > 0) {
    const correctedCompetences = Compvalue.value.map((comp) =>
      findClosestCompetence(comp),
    );
    projects = projects.filter(
      (project) =>
        project.competences &&
        Object.values(project.competences).some((category) =>
          category.some((competence) =>
            correctedCompetences.includes(competence),
          ),
        ),
    );
  }

  // Filtrage par type - Version corrigée
  projects = projects.filter((project) => {
    const typeMap = {
      fr: {
        University: "Universitaire",
        Personal: "Personnel",
      },
      en: {
        University: "University",
        Personal: "Personal",
      },
    };

    // Traduire le type du projet selon la locale
    const projectType =
      typeMap[locale.value][
        checkType.value.find(
          (t) =>
            project.type === typeMap.fr[t] || project.type === typeMap.en[t],
        )
      ];

    return projectType !== undefined;
  });

  // Filtrage des projets finits
  projects = projects.filter((project) => {
    const isWIP = project.wip;
    if (!isWIP) return true;
  });

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
      case "recent":
        return dateB - dateA; // Trier par date la plus récente
      case "oldest":
        return dateA - dateB; // Trier par date la plus ancienne
      case "longest":
        return durationB - durationA; // Trier par la durée la plus longue
      case "shortest":
        return durationA - durationB; // Trier par la durée la plus courte
      default:
        return 0; // Pas de tri
    }
  });
});

/**
 *  @function SwitchFilter
 *  @description Permet de basculer l'état des filtres
 *  @returns {void}
 */
function switchFilter() {
  const filterIcon = iconFilter.value;

  // Vérifier que filters.value et filterIcon ne sont pas null
  if (!filters.value || !filterIcon) {
    console.error("filters ou iconFilter n'est pas défini.");
    return;
  }

  if (filters.value.classList.contains("filterDeactivated")) {
    filters.value.classList.remove("filterDeactivated");
    filters.value.classList.add("filterActivated");
    filterIcon.classList.remove("pi-angle-down");
    filterIcon.classList.add("pi-angle-double-down");

    localStorage.setItem("project_filterState", "activated");
  } else {
    filters.value.classList.add("filterDeactivated");
    filters.value.classList.remove("filterActivated");
    filterIcon.classList.add("pi-angle-down");
    filterIcon.classList.remove("pi-angle-double-down");

    localStorage.setItem("project_filterState", "deactivated");
  }
}

// Simple vérification pour setup la liste des projets
if (filteredAndSortedProjects.value.length === 0) {
  //window.location.reload()
}

const maxEndDate = computed(() => {
  return new Date(endDate.value);
});

const minStartDate = computed(() => {
  return new Date(startDate.value);
});

// Dans les imports
import AutocompleteDropdown from "../components/UI/AutocompleteDropdown.vue";

// Dans le state
const searchCompetence = ref("");
const allCompetences = ref([]);

// Récupération de toutes les compétences au montage
onMounted(() => {
  allCompetences.value = data.sorted_valid_skills.flatMap((category) => {
    return [Object.keys(category)[0], ...Object.values(category)[0]];
  });
});

// Gestion de l'ajout/suppression
function addCompetence(competence) {
  if (!Compvalue.value.includes(competence)) {
    Compvalue.value.push(competence);
  }
  searchCompetence.value = "";
}

function removeCompetence(index) {
  Compvalue.value.splice(index, 1);
}

// const layout = ref('grid');
</script>

<template>
  <div>
    <h1>{{ $t("projects.filters.projectsTitle") }}</h1>
    <span id="sortFilterContainer">
      <Button class="blackVariant">
        <p id="textFilterHeader" @click="switchFilter">
          <i
            ref="iconFilter"
            class="pi pi-angle-down"
            style="margin: 0 10px 0 0"
          ></i>
          {{ $t("projects.filters.projectsFiltersKeyword") }}
        </p>
      </Button>

      <div class="sort-filter">
        <label for="sort">{{ $t("projects.filters.projectsSort") }}</label>
        <select id="sort" v-model="sortBy" class="blackVariant">
          <option value="recent">
            {{ $t("projects.filters.projectsMostRecent") }}
          </option>
          <option value="oldest">
            {{ $t("projects.filters.projectsOldest") }}
          </option>
          <option value="longest">
            {{ $t("projects.filters.projectsLongest") }}
          </option>
          <option value="shortest">
            {{ $t("projects.filters.projectsShortest") }}
          </option>
        </select>
      </div>
    </span>

    <div
      id="filters"
      class="card gap-3 p-fluid filterDeactivated"
      ref="filters"
    >
      <div id="dateFilters">
        <h3>{{ $t("projects.filters.projectsDateLabel") }}</h3>
        <div id="datedebutcontainer">
          <p>{{ $t("projects.filters.dateFilter_du") }}</p>
          <Calendar
            v-model="startDate"
            class="dateInput"
            id="startDate"
            :showIcon="true"
            dateFormat="yy-mm-dd"
            :maxDate="maxEndDate"
          />
        </div>
        <div id="datefincontainer">
          <p>{{ $t("projects.filters.dateFilter_au") }}</p>
          <Calendar
            v-model="endDate"
            class="dateInput"
            id="endDate"
            :showIcon="true"
            dateFormat="yy-mm-dd"
            :minDate="minStartDate"
          />
        </div>
      </div>

      <div id="motClesContainer">
        <h3>{{ $t("projects.filters.projectsKeywordsLabel") }}</h3>

        <AutocompleteDropdown
          v-model="searchCompetence"
          :suggestions="filteredCompetences"
          :placeholder="$t('skillsDetail.searchPlaceholder')"
          @selectSuggestion="addCompetence"
        />

        <div class="chips-wrapper">
          <div
            class="chips-container"
            :class="{ expanded: chipsExpanded }"
            ref="chipsContainer"
          >
            <span
              v-for="(competence, index) in Compvalue"
              :key="index"
              class="custom-chip"
            >
              {{ competence }}
              <i
                class="pi pi-times-circle"
                @click="removeCompetence(index)"
              ></i>
            </span>
          </div>

          <Button
            v-if="Compvalue.length > 0"
            @click="chipsExpanded = !chipsExpanded"
            icon="pi pi-ellipsis-v"
            class="p-button-text p-button-sm toggle-button"
            :class="{ rotated: chipsExpanded }"
          />
        </div>
      </div>

      <div id="typeProjetContainer">
        <h3>{{ $t("projects.filters.projectsTypeLabel") }}</h3>
        <div>
          <Checkbox
            v-model="checkType"
            inputId="University"
            value="University"
            :title="$t('projects.filters.projectsTypeUniversityTitle')"
          />
          <label for="University">
            {{ $t("projects.filters.projectsTypeUniversity") }}
          </label>
        </div>
        <div>
          <Checkbox
            v-model="checkType"
            inputId="Personal"
            value="Personal"
            :title="$t('projects.filters.projectsTypePersonalTitle')"
          />
          <label for="Personal">
            {{ $t("projects.filters.projectsTypePersonal") }}
          </label>
        </div>
      </div>
    </div>

    <ul id="projectList">
      <li
        v-for="project in filteredAndSortedProjects"
        :key="project.id"
        :id="project.id"
        class="projectCard"
      >
        <router-link :to="project.route" class="liensrouteur">
          <div class="projectCardIn">
            <h3 class="projectName">{{ project.nom }}</h3>
          </div>
          <div class="pjtImgContainer">
            <img
              v-if="project.images[0].type == 'image' && project.images[0].link"
              :src="'/images/projects/' + project.images[0].link"
              :alt="project.images[0].description"
              :title="project.images[0].description"
              class="projectimage"
              @error="(e) => (e.target.src = '/images/default-image.png')"
            />

            <img
              v-else-if="
                project.images[0].type == 'icone' && project.images[0].link
              "
              :src="project.images[0].link"
              :alt="project.images[0].description"
              :title="project.images[0].description"
              class="projectimage"
              @error="(e) => (e.target.src = '/images/default-image.png')"
            />

            <div v-else class="projectimage" id="imgMissing">
              <i class="pi pi-question"></i>
            </div>
          </div>
        </router-link>
      </li>
    </ul>

    <!-- <DataView :value="filteredAndSortedProjects" :layout="layout">
      <template #header>
          <div class="flex justify-end">
              <SelectButton v-model="layout" :options="options" :allowEmpty="false">
                  <template #option="{ option }">
                      <i :class="[option === 'list' ? 'pi pi-bars' : 'pi pi-table']" />
                  </template>
              </SelectButton>
          </div>
      </template>

      <template #list="slotProps">
          <div class="flex flex-col">
              <div v-for="(item, index) in slotProps.items" :key="index">
                {{ console.log(item) }}
                  <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4" :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }">
                      <div class="md:w-40 relative">
                          <img class="block xl:block mx-auto rounded w-full" :src="`https://primefaces.org/cdn/primevue/images/product/${item.image}`" :alt="item.name" />
                          <div class="absolute bg-black/70 rounded-border" style="left: 4px; top: 4px">
                              <Tag :value="item.inventoryStatus"></Tag>
                          </div>
                      </div>
                      <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                          <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                              <div>
                                  <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ item.category }}</span>
                                  <div class="text-lg font-medium mt-2">{{ item.name }}</div>
                              </div>
                              <div class="bg-surface-100 p-1" style="border-radius: 30px">
                                  <div class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2" style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                                      <span class="text-surface-900 font-medium text-sm">{{ item.rating }}</span>
                                      <i class="pi pi-star-fill text-yellow-500"></i>
                                  </div>
                              </div>
                          </div>
                          <div class="flex flex-col md:items-end gap-8">
                              <span class="text-xl font-semibold">${{ item.price }}</span>
                              <div class="flex flex-row-reverse md:flex-row gap-2">
                                  <Button icon="pi pi-heart" outlined></Button>
                                  <Button icon="pi pi-shopping-cart" label="Buy Now" :disabled="item.inventoryStatus === 'OUTOFSTOCK'" class="flex-auto md:flex-initial whitespace-nowrap"></Button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </template>

      <template #grid="slotProps">
          <div class="grid grid-cols-12 gap-4">
              <div v-for="(item, index) in slotProps.items" :key="index" class="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-6 p-2">
                  <div class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col">
                      <div class="bg-surface-50 flex justify-center rounded p-4">
                          <div class="relative mx-auto">
                              <img class="rounded w-full" :src="`https://primefaces.org/cdn/primevue/images/product/${item.image}`" :alt="item.name" style="max-width: 300px"/>
                              <div class="absolute bg-black/70 rounded-border" style="left: 4px; top: 4px">
                                  <Tag :value="item.inventoryStatus"></Tag>
                              </div>
                          </div>
                      </div>
                      <div class="pt-6">
                          <div class="flex flex-row justify-between items-start gap-2">
                              <div>
                                  <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ item.category }}</span>
                                  <div class="text-lg font-medium mt-1">{{ item.name }}</div>
                              </div>
                              <div class="bg-surface-100 p-1" style="border-radius: 30px">
                                  <div class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2" style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                                      <span class="text-surface-900 font-medium text-sm">{{ item.rating }}</span>
                                      <i class="pi pi-star-fill text-yellow-500"></i>
                                  </div>
                              </div>
                          </div>
                          <div class="flex flex-col gap-6 mt-6">
                              <span class="text-2xl font-semibold">${{ item.price }}</span>
                              <div class="flex gap-2">
                                  <Button icon="pi pi-shopping-cart" label="Buy Now" :disabled="item.inventoryStatus === 'OUTOFSTOCK'" class="flex-auto whitespace-nowrap"></Button>
                                  <Button icon="pi pi-heart" outlined></Button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </template>
  </DataView> -->
  </div>
</template>

<style scoped>
.toggle-button.rotated {
  transform: rotate(90deg);
}

.chips-container.expanded {
  flex-wrap: wrap;
  max-width: 100%;
  overflow: visible;
}

.toggle-button {
  transform: rotate(0deg);
  transition: transform 0.3s ease;
  color: var(--secondColor);
}

.chips-container {
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  gap: 0.5rem;
  max-width: 100%;
  transition: max-width 0.3s ease;
}

.custom-chip {
  flex-shrink: 0;
  color: var(--secondColor);
  background: black;
  padding: 0.5rem 1rem;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: 0.3s;
}

.custom-chip i {
  cursor: pointer;
  font-size: 0.8rem;
  margin-left: 0.5rem;
}

.chips-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  position: relative;
}

.custom-chip i:hover {
  color: var(--primary-color-text);
}

div#imgMissing {
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(5);
  color: white;
}

@media screen and (max-width: 860px) {
  .filterActivated {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;

    select {
      padding: 20px;
    }

    .datesIn {
      margin: 10px;
    }
  }
}

#startDate {
  margin-bottom: 10px;
}

#startDate,
#endDate {
  color: var(--darkBackground-color) !important;
  background-color: var(--textBasicColor) !important;
  width: 150px;
}

.filterActivated {
  display: flex;
}

.filterDeactivated {
  display: none;
}

#filters {
  position: relative;
  width: 100%;
  min-width: 100vw;
  padding: 2vh 0 2vh 0;
  justify-content: space-around;
  background-color: rgb(66, 79, 79);
}

Button#blackVariant {
  margin-left: 2vw;
}

#textFilterHeader {
  width: fit-content;
  height: fit-content;
}

#textFilterHeader:hover {
  cursor: pointer;
  font-weight: 500;
}

div.projectCardIn {
  height: min-content;
}

ul#projectList {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

li.projectCard {
  background-color: black;
  height: min-content;
  width: min-content;
}

h3.projectName {
  color: white;
  background-color: gray;
  text-align: center;
  padding: 5px 0px 5px 0px;
  border: 2px solid darkslategray;
}

.projectimage {
  width: 100%;
  object-fit: cover;
  display: flex;
  align-items: center;
  flex: 1;
  flex-wrap: wrap;
  flex-direction: row;
  flex-flow: wrap;
}

.pjtImgContainer {
  width: 100%;

  padding: 7%;
  height: 300px;
  overflow: hidden;
  position: relative;
}

.pjtImgContainer .projectimage {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition:
    transform 0.5s ease,
    object-position 0.5s ease;
}

.pjtImgContainer:hover .projectimage {
  transform: scale(0.9);

  border: 1 px solid white;
  object-fit: cover;
  object-position: center;

  transition:
    transform 0.5s ease,
    object-position 0.75s ease-out,
    color 1s ease-in,
    border 1s ease-in;
}

#dates > div.card.flex.flex-wrap.justify-content-center.gap-3 {
  height: 60px;
  position: relative;
}

.projectCard {
  min-width: 300px;
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
  margin-bottom: 30px;
}

.chip {
  width: 500px;
  text-align: center;
}

input {
  text-align: center;
}

#motClesContainer {
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
  color: black;
}

#typeProjetContainer > div > div > div {
  margin-right: 5px;
}

#typeProjetContainer {
  display: flex;
  flex-direction: column;
}

.dateInput {
  height: 30px;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  font-size: 1em;
  border-radius: 10px;
}

#sortFilterContainer {
  display: flex;
  justify-content: space-between;
  margin: 20px 0px 0px 0px;
}

div#typeProjetContainer div {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

#sort {
  padding: 10px;
}

div#datedebutcontainer,
div#datefincontainer {
  display: flex;
  flex-direction: row;
  justify-content: right;

  p {
    margin-right: 10px;
    width: 35px;
    justify-content: right;
  }
}
</style>
