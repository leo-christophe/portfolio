<script setup>
import { ref, onMounted, computed, getCurrentInstance } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import Lightbox from "./LightboxCmt.vue";
import handleSkillClick from "../utils/skillUtils";

// Définir les props
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const { t } = useI18n(); // Accès à la fonction de traduction
const instance = getCurrentInstance();
const data = instance.appContext.config.globalProperties.$JSONData;
const router = useRouter();
const project = computed(() => data.projects[props.id]);
const isLightboxOpen = ref(false);

// Ouvrir la lightbox
const openLightbox = () => {
  isLightboxOpen.value = true;
};

// Fermer la lightbox
const closeLightbox = () => {
  isLightboxOpen.value = false;
};

// Récupérer les lignes de compétences
const getCompetenceRows = (competences) => {
  const maxRows = getMaxRows(competences);
  return Array.from({ length: maxRows }, (_, rowIndex) => rowIndex + 1);
};

// Fonction pour télécharger un fichier
function downloadFile(downloadlink) {
  const fileUrl = downloadlink;
  const fileName = downloadlink.substring(downloadlink.lastIndexOf("/") + 1);

  const link = document.createElement("a");
  link.href = fileUrl;
  link.download = fileName;

  link.click();
}

// Fonction pour obtenir le nombre maximal de lignes à afficher (le tableau le plus long)
function getMaxRows(competences) {
  return Math.max(...Object.values(competences).map((v) => v.length));
}

const images = data.projects[props.id].images.filter((image) => {
  if (!(image.type == "icone" && image.display === false)) {
    return image;
  }
});

// Gestion des images
const ActualImage = ref(0);
const switchImage = (way) => {
  const totalImages = images.length;
  ActualImage.value =
    way === "back"
      ? (ActualImage.value - 1 + totalImages) % totalImages
      : (ActualImage.value + 1) % totalImages;
};

const hasImages = computed(() => images[0] != null);
const multipleImages = computed(() => images.length > 1);
const projectURL = ref("");
projectURL.value =
  data.projects[props.id].url || data.projects[props.id].github || "";

function tempsPris(datedebut, datefin) {
  const start = new Date(datedebut);
  const end = new Date(datefin);

  const years = end.getFullYear() - start.getFullYear();
  const months = end.getMonth() - start.getMonth();

  const totalMonths = years * 12 + months;

  if (totalMonths == 0) {
    return end.getDate() - start.getDate() + " " + t("words.days");
  }

  return totalMonths + " " + t("words.month");
}

onMounted(() => {
  document.querySelectorAll("#competences td").forEach((td) => {
    if (td.textContent.trim() != "") {
      td.classList.add("has-content");
    }
  });
});
</script>

<template>
  <div id="project">
    <h1 class="projectElement">{{ data.projects[props.id].nom }}</h1>

    <div id="titre" class="projectElement">
      {{ data.projects[props.id].titre }} ({{
        tempsPris(
          data.projects[props.id].dates[0],
          data.projects[props.id].dates[1],
        )
      }})
    </div>

    <div id="images-container" class="projectElement">
      <div v-if="hasImages" id="images">
        <button
          id="leftButton"
          v-if="multipleImages"
          @click="switchImage('back')"
          :title="$t('projects.detailsTemplate.projectLastImage')"
        >
          <i class="pi pi-arrow-circle-left"></i>
        </button>

        <span @click="openLightbox()" id="mainContentContainer">
          <div v-if="['image', 'icone'].includes(images[ActualImage].type)">
            <img
              v-if="images[ActualImage].type == 'icone'"
              :src="images[ActualImage].link"
            />
            <img
              v-else
              :src="'/images/projects/' + images[ActualImage].link"
              class="projectimage"
              :title="images[ActualImage].description"
            />
          </div>

          <div v-else-if="images[ActualImage].type == 'video'">
            <iframe
              width="560"
              height="315"
              :src="images[ActualImage].link"
              class="projectimage"
              :title="images[ActualImage].description"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>

          <div v-else-if="images[ActualImage].type == 'powerbi'">
            <iframe
              width="660"
              height="415"
              :src="images[ActualImage].link"
              frameborder="1"
              allowFullScreen="true"
              class="projectimage"
              :title="images[ActualImage].description"
            ></iframe>
          </div>

          <p class="imageDescription">
            <strong>{{ images[ActualImage].description }}</strong>
          </p>
        </span>
        <button
          id="rightButton"
          v-if="multipleImages"
          @click="switchImage('forward')"
          :title="$t('projects.detailsTemplate.projectNextImage')"
        >
          <i class="pi pi-arrow-circle-right"></i>
        </button>
        <i
          class="pi pi-search-plus"
          v-if="['image', 'icone'].includes(images[ActualImage].type)"
          @click="openLightbox()"
        ></i>
      </div>

      <Lightbox
        v-if="
          images[ActualImage].type == 'image' ||
          images[ActualImage].type == 'icone'
        "
        :isOpen="isLightboxOpen"
        :content="
          images[ActualImage].type == 'image'
            ? '/images/projects/' + images[ActualImage].link
            : images[ActualImage].link
        "
        :type="images[ActualImage].type"
        :description="images[ActualImage].description"
        @close="closeLightbox"
      />

      <div id="Projectlinks">
        <a
          v-if="data.projects[props.id].GitHub"
          :href="data.projects[props.id].GitHub"
        >
          <i class="pi pi-github imgProjectLinks"></i>
        </a>

        <a
          v-if="data.projects[props.id].url"
          :href="data.projects[props.id].url"
        >
          <i
            v-if="data.projects[props.id].url.includes('youtube')"
            class="pi pi-youtube imgProjectLinks"
          ></i>
          <i v-else class="pi pi-globe imgProjectLinks"></i>
        </a>

        <div id="docWrapper" v-if="data.projects[props.id].pdf_docs">
          <span v-for="doc in data.projects[props.id].pdf_docs" :key="doc">
            <a
              v-if="doc"
              :href="'/documents/' + doc"
              target="_blank"
              :title="doc"
            >
              <i class="pi pi-file-pdf imgProjectLinks"></i>
            </a>
          </span>
        </div>

        <a
          v-if="data.projects[props.id].download"
          @click="downloadFile(data.projects[props.id].download)"
        >
          <i class="pi pi-download imgProjectLinks"></i>
        </a>
      </div>
    </div>

    <div id="descContainer" class="projectElement">
      <div id="desc">
        {{ data.projects[props.id].description }}
      </div>
    </div>

    <div class="project_title_container">
      <h2 class="project_title">
        {{ $t("projects.detailsTemplate.projectRealisationsMissionsTitle") }}
      </h2>
    </div>
    <div id="realisations" class="ListeDescendanteConteneur projectElement">
      <div
        v-motion-fade-visible
        class="ListeDescendante"
        v-for="realisation in data.projects[props.id].realisations"
        :key="realisation"
      >
        {{ realisation }}
      </div>
    </div>

    <div class="project_title_container">
      <h2 class="project_title">
        {{ $t("projects.detailsTemplate.mobilizedSkills") }}
      </h2>
    </div>
    <div id="lists ListeDescendanteConteneur">
      <table id="competences" class="projectElement">
        <thead>
          <tr>
            <th
              v-for="(value, key) in data.projects[props.id].competences"
              :key="'header-' + key"
              class="ligneHeader"
              :title="$t('projects.detailsTemplate.projectSkillDetail') + key"
              @click="handleSkillClick(key, router)"
            >
              {{ key }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="rowIndex in getCompetenceRows(project.competences)"
            :key="'row-' + rowIndex"
          >
            <td
              v-for="(value, key) in data.projects[props.id].competences"
              :key="'data-' + key + '-' + rowIndex"
              :class="rowIndex % 2 == 0 ? 'lignePaire' : 'ligneImpaire'"
              @click="handleSkillClick(value[rowIndex - 1], router)"
              :title="
                $t('projects.detailsTemplate.projectSkillDetail') +
                value[rowIndex - 1]
              "
            >
              <span v-if="value[rowIndex - 1]">{{ value[rowIndex - 1] }}</span>
              <span v-else>&nbsp;</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
#docWrapper{
  display: flex;
  flex-direction: row;
  gap: 10px;
}

@media (max-width: 860px) {
  div#desc {
    justify-content: center;
    align-self: center;
    align-items: center;
    margin: 0;
    position: relative;
    width: 100%;
  }

  div#descContainer {
    width: 85vw;
  }

  #realisations {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    width: 100vw;

    .ListeDescendante {
      padding: 20px;
      width: 80vw !important;
      font-size: 1rem !important;
    }
  }
}

#mainContentContainer {
  cursor: pointer;
}

.lignePaire {
  background-color: var(--listPaire) !important;
}

.ligneImpaire {
  background-color: var(--listImpaire) !important;
}

.ligneHeader {
  background-color: var(--listHeader) !important;
  line-height: 3;
  cursor: pointer;
}

table#competences thead tr th.ligneHeader:hover {
  color: var(--secondColor);
  transition: 0.2s ease all;
}

#realisations {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  width: 100vw;

  .ListeDescendante {
    padding: 20px;
    width: 50vw;
    font-size: 1rem;
  }
}

.pi-search-plus {
  z-index: 0;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 2rem;
  color: white;
  border: 4px solid white;
  background-color: black;

  padding: 7px;
}

.project_title_container {
  display: flex;
  justify-content: center;
  align-items: center;
}

#descContainer {
  width: 100vw;
  margin: 50px 0px 50px 0px;
  position: relative;
  align-self: center;
}

#desc {
  text-align: justify;
  margin: 5vh 10vw 5vh 10vw;
  padding: 20px;
  font-size: 20px !important;
}

.imageDescription {
  color: rgb(225, 225, 225);
}

#project {
  margin-left: 50px;
  margin-right: 50px;
  display: contents;
}

.projectElement {
  margin: 20px;
  text-align: center;
}

button#leftButton,
button#rightButton {
  color: white;
  background-color: black;

  width: 75px;
  height: 75px;
  border-radius: 50%;
  align-items: center;
  display: flex;
  justify-content: center;
  border: 0;

  cursor: pointer;

  i {
    font-size: 4rem;
  }
}

button#leftButton {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
}

button#rightButton {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}

img.projectimage {
  width: 500px;
  height: auto;
  max-height: 800px;
  border-radius: 10px;
  border: 1px solid black;
  box-shadow: 3px 3px 3px 3px darkslategray;
  position: relative;
}

#lists {
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
}

.ListeDescendanteConteneur {
  width: 50vw;
  margin: 50px 0px 50px 0px;
  position: relative;
  display: grid;
  align-self: center;
}

.ListeDescendante {
  margin: 5px;
  padding: 10px;
  border: 1px solid black;
  background-color: rgb(64, 64, 64);
  text-align: center;
}
small {
  margin-top: 30px;
}

#images-container {
  justify-content: center;
  align-self: center;
  display: grid;
}

#Projectlinks {
  bottom: 10px; /* Le placer en bas du rectangle gris */
  left: 10px; /* Le placer à gauche du rectangle gris */
  display: flex;
  flex-direction: row; /* Aligner les liens horizontalement */
  gap: 10px; /* Espacement entre les liens */
  margin-top: 10px;
}

#images {
  position: relative; /* Assurer que #Projectlinks se positionne correctement */
  background-color: gray;
  border-radius: 10px;

  min-height: 600px !important;
  max-height: 800px;
  width: 800px;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 10px;
  box-shadow: 2px 2px 2px 2px black;
}

.imgProjectLinks {
  color: white;
  background-color: black;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  transition: 0.5s ease all;
  border: 1px solid gray;
  width: 3em;
  height: 3em;
  display: flex;
  justify-content: center;
  align-items: center;
}

.imgProjectLinks:hover {
  background-color: white;
  color: black;
  transition: 0.5s ease all;
}

#competences table {
  border-collapse: collapse;
  width: 100%;
  border: 1px solid black;
}

#competences td {
  background-color: rgb(64, 64, 64);
  padding: 5px;
  width: 200px;
}

#competences th {
  background-color: rgb(57, 44, 44);
  color: white;
  padding: 5px;
  width: 40vw;
}

h1 {
  font-size: 2.5rem;
}

div#titre {
  font-size: 20px !important;
}

table#competences td {
  border: 1px solid transparent;
  transition: 0.2s ease all;
}

table#competences td.has-content:hover {
  border: 1px solid var(--secondColor); /* Exemple de style */
  cursor: pointer; /* Rendre les cellules cliquables */
  transition: 0.2s ease all;
  cursor: pointer;
}

.realisationitem {
  transform: translateY(50px);
  opacity: 0;
  transition:
    transform 1s ease-out,
    opacity 1s ease-out; /* Ajout de la transition */
}

.realisationitem.show {
  transform: translateY(0);
  opacity: 1;
}
</style>
