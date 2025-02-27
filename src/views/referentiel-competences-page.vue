<template>
  <div>
    <div>
      <h1>{{ $t("skillsDetail.skills") }}</h1>

      <div id="filtresContainer">
        <span id="searchBarContainer">
          <p>{{ $t("skillsDetail.search") }}</p>
          <AutocompleteDropdown
            v-model="searchQuery"
            :suggestions="suggestions"
            :placeholder="$t('skillsDetail.searchPlaceholder')"
            :disabled="isSorted"
            @selectSuggestion="selectSuggestion"
          />
        </span>

        <span id="checkBoxesContainer">
          <Checkbox
            id="referentielBUT"
            v-model="isSorted"
            @change="handleCheckRefBUT"
            :binary="true"
          />
          <label>
            {{ $t("skillsDetail.sortRefBUT") }}
            <a
              href="https://www.enseignementsup-recherche.gouv.fr/sites/default/files/2023-12/informatique-30855.pdf#page=15"
              target="_blank"
            >
              {{ $t("skillsDetail.refBUT") }}
            </a>
          </label>
        </span>
      </div>

      <div
        v-show="
          filteredSkills.length == 0 && isLoading == true && isSorted == false
        "
      >
        <ProgressSpinner
          style="width: 50px; height: 50px"
          strokeWidth="4"
          animationDuration=".5s"
        />
      </div>
      <div
        v-show="
          filteredSkills.length == 0 && isLoading == false && isSorted == false
        "
        id="noskillText"
      >
        <div
          style="
            width: 100vw;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 5vh;
          "
        >
          <div style="font-size: 2em; font-weight: 700">
            {{ t("skillsDetail.noskill") }}
          </div>
          <div
            style="
              display: flex;
              justify-content: center;
              border-radius: 50%;
              background-color: white;
              width: 300px;
              height: 300px;
            "
          >
            <img
              src="/images/icons/no_skills.png"
              alt="No skills found"
              style="width: 100%; padding: 50px"
            />
          </div>
        </div>
      </div>
    </div>

    <div id="skillsPage">
      <SkillList
        v-show="!isLoading"
        :isSorted="isSorted"
        :content="isSorted ? sortedFilteredSkills : filteredSkills"
        :filterType="isSorted ? filterType : null"
        :searchQuery="searchQuery"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, getCurrentInstance, nextTick } from "vue";
import { useI18n } from "vue-i18n";
import SkillList from "../components/SkillList.vue";
import AutocompleteDropdown from "../components/UI/AutocompleteDropdown.vue";
import Checkbox from "primevue/checkbox";
import ProgressSpinner from "primevue/progressspinner";
import { useRoute, useRouter } from "vue-router";

const { t } = useI18n();
const route = useRoute();
const instance = getCurrentInstance();
const data = instance.appContext.config.globalProperties.$JSONData;

const searchQuery = ref("");
const filteredSkills = ref(data.sorted_valid_skills);
const isSorted = ref(false);
const sortedFilteredSkills = ref([]);
const filterType = ref(null);
const isLoading = ref(false);
const suggestions = ref([]);

function getSuggestions(query) {
  const allSuggestions = data.sorted_valid_skills.flatMap((category) => {
    const categoryName = Object.keys(category)[0];
    const skills = Object.values(category)[0];
    return [categoryName, ...skills];
  });

  const uniqueSuggestions = [...new Set(allSuggestions)];

  // Filtrer seulement si query existe
  suggestions.value = uniqueSuggestions
    .sort()
    .filter(
      (item) => !query || item.toLowerCase().includes(query.toLowerCase()),
    );
}
const router = useRouter();

watch(searchQuery, async (newQuery) => {
  if (route.query.skill != newQuery) {
    // Créer une nouvelle query sans le paramètre `skill`
    const newQuery = { ...route.query };
    delete newQuery.skill;

    // Naviguer vers la nouvelle URL sans le paramètre `skill`

    router.replace({ query: newQuery });
  }

  document.querySelectorAll("details").forEach((detail) => {
    detail.open = true;
  });
  isLoading.value = true;
  getSuggestions(newQuery);

  setTimeout(async () => {
    if (!newQuery) {
      filteredSkills.value = data.sorted_valid_skills;
    } else {
      const normalizedQuery = newQuery.toLowerCase().trim().replace(/\s+/g, "");
      const allCategoryNames = data.sorted_valid_skills.map((cat) =>
        Object.keys(cat)[0].toLowerCase().trim().replace(/\s+/g, ""),
      );

      if (allCategoryNames.includes(normalizedQuery)) {
        // Recherche par catégorie exacte
        filteredSkills.value = data.sorted_valid_skills.filter(
          (category) =>
            Object.keys(category)[0]
              .toLowerCase()
              .trim()
              .replace(/\s+/g, "") === normalizedQuery,
        );
      } else {
        // Recherche par compétence exacte
        filteredSkills.value = data.sorted_valid_skills.filter((category) => {
          const skills = Object.values(category)[0].map((skill) =>
            skill.toLowerCase().trim().replace(/\s+/g, ""),
          );
          return skills.includes(normalizedQuery);
        });
      }
    }
    isLoading.value = false;

    await nextTick(); // Attendre que le DOM soit mis à jour
    const firstDetail = document.querySelector("details");
    if (firstDetail) {
      firstDetail.open = true;
    }
  }, 300);
});
function selectSuggestion(suggestion) {
  searchQuery.value = suggestion;
}

onMounted(() => {
  const skill = route.query.skill;
  searchQuery.value = skill;
  if (skill) {
    const detailsElements = document.querySelectorAll("details");
    if (detailsElements.length > 0) {
      detailsElements.forEach((detail) => {
        detail.open = true;
      });

      // Ouvrir le premier élément <details> après le montage
      const firstDetail = detailsElements[0];
      if (firstDetail) {
        firstDetail.open = true;
      }
    } else {
      console.warn("No <details> elements found on the page.");
    }
  } else {
    console.warn("No skill query parameter found in the route.");
  }
});

watch(
  () => route.query.skill,
  (newSkill) => {
    if (newSkill) {
      searchQuery.value = newSkill;
      document.querySelectorAll("details").forEach((detail) => {
        detail.open = true;
      });

      isLoading.value = true;
      getSuggestions(newSkill);
      filteredSkills.value = data.sorted_valid_skills.filter((category) => {
        const categoryName = Object.keys(category)[0].toLowerCase().trim();
        const skills = Object.values(category)[0].map((skill) =>
          skill.toLowerCase().trim(),
        );
        return (
          categoryName.includes(newSkill.toLowerCase().trim()) ||
          skills.includes(newSkill.toLowerCase().trim())
        );
      });
      isLoading.value = false;

      // Ouvrir le premier élément <details> après le filtrage
      const firstDetail = document.querySelector("details");
      if (firstDetail) {
        firstDetail.open = true;
      }
    }
  },
);
function handleCheckRefBUT() {
  isLoading.value = true;
  filterType.value = isSorted.value ? "UE-IUT" : null;
  const dataUE = data.ue_but;

  if (!dataUE) {
    isLoading.value = false;
    return;
  }

  sortedFilteredSkills.value = {
    UE1: [],
    UE2: [],
    UE3: [],
    UE4: [],
    UE5: [],
    UE6: [],
  };

  for (const [key, ue] of Object.entries(dataUE)) {
    const associatedSkills = ue["competences_associes"];
    if (associatedSkills && associatedSkills.length > 0) {
      associatedSkills.forEach((skillCategory) => {
        const sorted_valid_skills = data.sorted_valid_skills;
        const categoryData = sorted_valid_skills.find(
          (item) => item[skillCategory],
        );
        if (categoryData) {
          sortedFilteredSkills.value[key].push({
            skillCategory: skillCategory, // Doit être une string
            validSkills: categoryData[skillCategory],
          });
        }
      });
    }
  }
  isLoading.value = false;
}
</script>

<style scoped>
@media screen and (max-width: 860px) {
  .listeExperiences div,
  .listeProjets div {
    width: 100vw !important;
  }
}

span#checkBoxesContainer {
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  gap: 10px;
  margin: 2vh 0 0 3vw;
}

div#experiencesContainer {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;

  gap: 5%;
}

p.competenceTitre {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

div#experiencesContainer:first-child:not(:empty) {
  margin-left: 0;
  align-self: left; /* Remplace "left" par "flex-start" */
}

div#experiencesContainer:nth-child(3n + 4) {
  margin-left: 0;
  align-self: left;
}

p.competenceListe {
  font-size: 0.8em !important;
  font-style: italic;
}

h1 {
  position: relative;
  z-index: 90;
  text-align: center;
  margin-top: 2vh;
  font-size: 3em;
}

span#searchBarContainer {
  z-index: 9999; /* Positioned above the wrapper */
  position: relative; /* Ensure stacking context is respected */
  p {
    margin-right: 1vw;
  }

  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 5vh 0 0 3vw;
}

#skillsPage:not(.wrapper) {
  z-index: 2; /* Ensure it's above the wrapper */
  position: relative; /* Respect stacking context */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 5vh;
}

#skillsPage {
  margin: 3vw 3vw 3vw 3vw;
}

summary {
  display: flex;
  flex-direction: row;
  cursor: pointer;
}

.affichageExperience,
.affichageProjet {
  display: flex;
  flex-direction: row;

  img {
    margin-right: 1vw;
  }
}

.listeProjets {
  color: lightblue;
}

.listeExperiences {
  color: lightcyan;
}

.projectCard {
  cursor: pointer;
}

.listeExperiences div,
.listeProjets div {
  margin-bottom: 2vh;

  width: 25vw;
}

h1 {
  text-align: center;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
}

div#noskillText {
  transition: 0.5s ease-in-out all;
  display: block;

  img {
    filter: drop-shadow(20px 20px 20px rgba(88, 125, 126, 0.525));
  }
}

div#noskillText p {
  width: 100%;

  text-align: center;
}

div#noskillText {
  margin-top: 5vh;
}
</style>
