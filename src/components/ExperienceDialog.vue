<script setup>
import { onMounted } from "vue";
import DateUtils from "../utils/date_utils.js";
import handleSkillClick from "../utils/skillUtils.js";
import { useRouter } from "vue-router";
import { onUnmounted } from "vue";

const router = useRouter();

defineProps({
  experienceProp: Object,
});

onMounted(() => {
  document.querySelectorAll(".p-dialog-mask").forEach((mask) => {
    // Ajouter un écouteur de clic pour fermer le modal
    mask.addEventListener("click", (event) => {
      if (!event.target.closest(".p-dialog")) {
        const dialog = mask.querySelector(".p-dialog");
        if (dialog) {
          // Utiliser l'API PrimeVue pour fermer (si applicable)
          const closeButton = dialog.querySelector(".p-dialog-header-close");
          if (closeButton) closeButton.click();
        }
      }
    });
  });
});

// Nettoyer les événements pour éviter les fuites de mémoire
onUnmounted(() => {
  document.querySelectorAll(".p-dialog-mask").forEach((mask) => {
    mask.removeEventListener("click", () => {}); // Supprimer le listener
  });
});
</script>

<template>
  <span id="ficheMetierDetaillee">
    <section class="dialogSection" id="posteDescriptionRapide">
      <div>
        <img
          :src="experienceProp.image"
          :alt="experienceProp.entreprise"
          :title="experienceProp.entreprise"
          class="imgExpDialog"
          @error="(e) => (e.target.src = '/images/default-image.png')"
          height="100"
        />
      </div>

      <div id="description">
        <h3>{{ experienceProp.poste }}</h3>
        <p>
          {{ experienceProp.entreprise }} - {{ experienceProp.localisation }}
        </p>
        <span v-if="DateUtils.isPastDate(experienceProp.dates[1])">
          {{
            DateUtils.formatDateRange(
              experienceProp.dates[0],
              experienceProp.dates[1],
              $i18n.locale,
            )
          }}
        </span>
        <span v-else-if="DateUtils.isFutureDate(experienceProp.dates[0])">
          {{
            DateUtils.formatDateRange(
              experienceProp.dates[0],
              experienceProp.dates[1],
              $i18n.locale,
            ) +
            " (" +
            $t("experiences.experienceComing") +
            ")"
          }}
        </span>
        <span v-else>
          {{
            DateUtils.formatDate(experienceProp.dates[0], $i18n.locale) +
            " - " +
            $t("experiences.experienceOngoing")
          }}
        </span>
      </div>
    </section>

    <section class="dialogSection">
      <h4 class="expSkillsTitle">Description:</h4>
      <p>{{ experienceProp.description }}</p>
    </section>

    <section>
      <div id="missionEtRealisation">
        <span class="expCacheContainerSkills">
          <h4 class="expSkillsTitle">
            {{ $t("experiences.experienceCompetenceTitle") }}
          </h4>
          <ul class="skillsListExp">
            <li
              v-for="(competence, key) in experienceProp.competences"
              :key="key"
            >
              <span>
                <p
                  @click="handleSkillClick(key, router)"
                  style="cursor: pointer"
                >
                  <strong>{{ key }}</strong>
                </p>
                <span id="skillsContainer">
                  <span
                    v-for="(competenceElt, indexY) in competence"
                    :key="indexY"
                    @click="handleSkillClick(competenceElt, router)"
                    class="skillExpItem"
                  >
                    {{ competenceElt }}
                  </span>
                </span>
                <br />
                <br />
              </span>
            </li>
          </ul>
        </span>
        <span class="expCacheContainerMissions">
          <h4 class="expMissionsTitle">
            {{ $t("experiences.experienceMissionsTitle") }}
          </h4>
          <ul class="missionsListExp">
            <li
              v-for="(mission, index) in experienceProp.missions"
              :key="index"
              class=""
            >
              {{ mission }}
              <br /><br />
            </li>
          </ul>
        </span>
      </div>
    </section>
  </span>
</template>

<style scoped>
span#skillsContainer {
  display: flex;
  flex-wrap: wrap;
  gap: 2%;
}

span.skillExpItem {
  cursor: pointer;
  padding: 5px;
  background-color: black;
  color: white;
  border-radius: 50px;
  border: 1px solid white;
  transition: 0.5s ease-in all;
}

span.skillExpItem:hover {
  color: var(--secondColor);
  border: 1px solid var(--secondColor);
  filter: drop-shadow(0px 0px 2px var(--secondColor));
  transition: 0.5s ease-in all;
}

.imgExpDialog {
  border-radius: 5%;
}

section.dialogSection {
  margin-bottom: 3vh;
}

#posteDescriptionRapide {
  display: flex;
  justify-content: left;
  align-items: center;
}

#posteDescriptionRapide img {
  margin-right: 50px;
}

#ficheMetierDetaillee {
  background-color: rgb(36, 36, 36);
}

#missionEtRealisation {
  display: flex;
  width: 100%;
  min-width: fit-content;
  height: 100%;
  justify-content: space-between;
}

.expCacheContainerSkills,
.expCacheContainerMissions {
  position: relative !important;
  height: 100%;
  top: 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 45%;
}

.expSkillsTitle,
.expMissionsTitle {
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--secondColor);
}

.skillsListExp,
.missionsListExp {
  list-style: square;
  margin-left: 10px;
}
</style>
