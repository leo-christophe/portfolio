<script setup>
  import { ref, onUnmounted,onMounted, getCurrentInstance } from 'vue';

  import Carousel from 'primevue/carousel';
  import { useRouter } from 'vue-router';

  import{ gestionVisibilite, vSkillBar, responsiveOptions, animateLangues} from '../utils/skillsDisplayUtils'
  import { hardSkillsImages, hardSkillsIcons } from '../data/const';

  const router = useRouter();

  // Accéder aux données globales
  const instance = getCurrentInstance();
  const data = instance.appContext.config.globalProperties.$JSONData;
  const main_hard_skills = ref(data.main_hard_skills);

  // Mapper permettant de récupérer les images des compétences en fonction de l'index et leur nom
  const getSkillImages = (index) => {
    return hardSkillsImages[index].map(img => ({
      image: img,
      name: img.replace(".svg", "").replace(".webp", "")
      }) 
  )};

  onMounted(() => {
    // Setup l'observer des conteneurs
    gestionVisibilite();
    animateLangues();
  });


  const currentSection = ref(0);
const isScrolling = ref(false);

const handleScroll = () => {
  const sections = document.querySelectorAll('.sectionPage');
  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
      currentSection.value = index;
    }
  });
};

const scrollToSection = (direction) => {
  if (isScrolling.value) return;
  isScrolling.value = true;

  const newSection = direction === 'down' 
    ? Math.min(currentSection.value + 1, 2)
    : Math.max(currentSection.value - 1, 0);

  currentSection.value = newSection;
  
  window.scrollTo({
    top: newSection * window.innerHeight,
    behavior: 'smooth'
  });

  setTimeout(() => {
    isScrolling.value = false;
  }, 800);
};

const handleWheel = (e) => {
  e.preventDefault();
  if (Math.abs(e.deltaY) < 5) return;
  scrollToSection(e.deltaY > 0 ? 'down' : 'up');
};

let touchStartY = 0;

const handleTouchStart = (e) => {
  touchStartY = e.touches[0].clientY;
};

const handleTouchEnd = (e) => {
  const deltaY = touchStartY - e.changedTouches[0].clientY;
  if (Math.abs(deltaY) < 50) return;
  scrollToSection(deltaY > 0 ? 'down' : 'up');
};

onMounted(() => {
  document.querySelector("nav").style.position = "fixed";
  gestionVisibilite();
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('wheel', handleWheel, { passive: false });
  window.addEventListener('touchstart', handleTouchStart);
  window.addEventListener('touchend', handleTouchEnd);
});

onUnmounted(() => {
  document.querySelector("nav").style.position = "relative";
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('wheel', handleWheel);
  window.removeEventListener('touchstart', handleTouchStart);
  window.removeEventListener('touchend', handleTouchEnd);
});

// Options responsive pour le carrousel des références
const referencesResponsiveOptions = ref([
  {
    breakpoint: '1400px',
    numVisible: 1,
    numScroll: 1
  },
  {
    breakpoint: '768px',
    numVisible: 1,
    numScroll: 1
  }
]);
</script>

<template>

  <div class="skills-page">
    <div class="section-indicators">
      <div class="indicator" :class="{ active: currentSection === 0 }"></div>
      <div class="indicator" :class="{ active: currentSection === 1 }"></div>
      <div class="indicator" :class="{ active: currentSection === 2 }"></div>
    </div>

    <div id="skills-page-title">
      <h1>{{$t('pages.skills')}}</h1>
    </div>
    <div class="skills-display">

    <section class="sectionPage">
      <span>
        <span id="hardSkillsContainer" class="skillsContainer">
          <!--? Titre de la section "Compétences" -->
          <div id="hardSkillsDescription">
            <h2 id="competencesTitre" class="typeCompetenceTitre">
              {{ $t('skills.skillsTitle') }} 
              <small>
                <a href="/skillslist">({{ $t('words.learnmore') }})</a>
              </small>
            </h2>
          </div>

          <!--? Barres de progression: Compétences -->
          <div class="hard-skills">
            <div v-for="(percentage, skillName, index) in main_hard_skills" :key="index" class="skill-bar-container">
              <div class="skill-content">
                <div class="skill-info">
                  <span class="skill-name">
                    <i :class="hardSkillsIcons[index]"></i>
                    <h3>{{ skillName }}</h3>
                  </span>
                  <div class="skill-level">
                    <div class="skill-percentage" 
                        :id="'skill-percentage-' + index" 
                        v-skill-bar 
                        :data-skill="percentage"
                        style="height: 20px;">
                    </div>
                  </div>
                </div>
                
                <!-- Carousel for skill images -->
                <Carousel :value="getSkillImages(index)" 
                        :numVisible="3" 
                        :numScroll="1"
                        :responsiveOptions="responsiveOptions"
                        circular :autoplayInterval="3500"
                        class="skill-carousel">
                  <template #item="slotProps">
                    <div class="skill-image-card" @click="router.push({ path: '/skillslist',      query: { skill: (slotProps.data?.name === 'CSharp' ? 'C#' : slotProps.data?.name || '') }}) ">

                      <img :src="'/images/icons/tech/' + slotProps.data.image" 
                          :alt="slotProps.data.name"
                          class="skill-image" />
                      <div class="skill-image-name">{{ slotProps.data.name }}</div>
                    </div>
                  </template>
                </Carousel>
              </div>
            </div>
          </div>
        </span>

      </span>
    </section>

    <section class="sectionPage">
      <span id="langsContainer" class="skillsContainer">
        <div>
          <h2>{{ $t('skills.langs.talkedLangs') }}</h2>
        </div>
        <div id="langsSectionContainer">
          <div>
            <div class="drapeauContainer">
              <img src="/images/icons/tech/France.png" class="drapeau"/>
            </div>
            <span class="descriptionLang">
              <h3>{{ $t('skills.langs.french') }}</h3>
              <h4>{{ $t('skills.langs.native') }}</h4>
            </span>
          </div>
          <div>
            <div class="drapeauContainer">
              <img src="/images/icons/tech/English.png" class="drapeau"/>
            </div>
            <span class="descriptionLang">
              <h3>{{ $t('skills.langs.english') }}</h3>
              <h4>{{ $t('skills.langs.advanced') }}</h4>
            </span>
          </div>
          <div>
            <div class="drapeauContainer">
              <img src="/images/icons/tech/Italy.png" class="drapeau"/>
            </div>
            <span class="descriptionLang">
              <h3>{{ $t('skills.langs.italian') }}</h3>
              <h4>{{ $t('skills.langs.intermediate') }}</h4>
            </span>
          </div>
          <div>
            <div class="drapeauContainer">
              <img src="/images/icons/tech/Japanese.png" class="drapeau"/>
            </div>
            <span class="descriptionLang">
              <h3>{{ $t('skills.langs.japanese') }}</h3>
              <h4>{{ $t('skills.langs.notions') }}</h4>
            </span>
          </div>
        </div>
      </span>
    </section>

    <section class="sectionPage">
  <span id="references" class="skillsContainer">
    <div class="soft-skills">
      <div id="referencesContainer">
        <h2 class="references-title">{{ $t('skills.references') }}</h2>
        
        <!-- Carousel des références -->
        <Carousel :value="data.references[0]" 
                :numVisible="1" 
                :numScroll="1"
                :responsiveOptions="referencesResponsiveOptions"
                :circular="false"
                :autoplayInterval="0"
                class="references-carousel">
          <template #item="slotProps">
            <div class="reference-card">
              <div class="reference-image-container">
                <img :src="'/images/icons/' + slotProps.data.image" 
                    :alt="slotProps.data.name"
                    class="reference-image" />
              </div>
              <div class="reference-content">
                <h3><strong>{{ slotProps.data.name }}</strong></h3>
                <div class="reference-details">
                  <i class="pi pi-briefcase"/> <em>{{ slotProps.data.occupation }}</em> 
                  {{ $t("words.at") }} {{ slotProps.data.enterprise }}<br>
                  {{ slotProps.data.location }}<br>
                  <span id="contactRef">
                    <div><i class="pi pi-envelope"/> <a :href="'mailto:' + slotProps.data.email">{{ slotProps.data.email }}</a></div>
                    <span v-if="slotProps.data.phone"><i class="pi pi-phone"/> {{ slotProps.data.phone }}</span>
                  </span>
                </div>
              </div>
            </div>
          </template>
        </Carousel>
      </div>
    </div>
  </span>
</section>
    </div>
  </div>
</template>

<style scoped>
/* Styles pour le carrousel des références */
.references-carousel {
  width: 80%;
  margin: 2rem auto;
}

.reference-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  min-height: 400px;
}

.reference-image-container {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 1.5rem;
  border: 3px solid #3498db;
}

.reference-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.reference-content {
  text-align: center;
}

.reference-details {
  margin-top: 1rem;
  line-height: 1.6;
}

/* Responsive */
@media (max-width: 768px) {
  .references-carousel {
    width: 95%;
  }
  
  .reference-card {
    padding: 1rem;
    min-height: auto;
  }
  
  .reference-image-container {
    width: 150px;
    height: 150px;
  }
}
#langsSectionContainer > div {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

#langsSectionContainer > div.visible {
  opacity: 1;
  transform: translateY(0);
}

.drapeauContainer img.loaded {
  transform: scale(1);
}

#skills-page-title {
  position: absolute;
  top: 20px;
  width: 100%;
  text-align: center;
  z-index: 1000;
}

.drapeauContainer:hover img {
  transform: scale(1.05) rotate(-2deg);
}

/* Conteneur des indicateurs de section */
.section-indicators {
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 1000;
}

/* Style des losanges (indicateurs) */
.indicator {
  width: 12px;
  height: 12px;
  background-color: #ccc;
  transform: rotate(45deg);
  transition: background-color 0.3s ease;
  transition:0.5s ease all;
}

/* Style du losange actif */
.indicator.active {
  background-color: var(--secondColor);
  border:1px solid black;
  filter:drop-shadow(0 0 2px var(--secondColor));
  transition:0.5s ease all;
}



section.sectionPage{
  height:100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

div.drapeauContainer{
  display:flex;
  justify-content:center;
}

span.descriptionLang{
  text-align: center;
  display: flex;
  flex-direction: column;
}

span#langsContainer{
  min-width: fit-content;
}

div#langsSectionContainer{
  display:flex;
  flex-direction: row;
  gap:10vw;
  justify-content: space-evenly;
  align-items: center;
  margin-top:20px;
  width:fit-content;
}

img.drapeau{
  width:100px;
  height:100px;
  object-fit:cover;
  margin:5px;
  transition: transform 0.3s ease;
  transform: scale(0.95);
  
}

#skills-page-title{
  text-align:center;
  margin-top:50px;
}

.skill-content{
  display: flex;
  flex-direction: row;
  gap:5vw;
  justify-content: left;
  align-items: left;
}

.skill-image{
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin: 5px;
}

.skill-carousel{
  max-width:50%;
  filter:drop-shadow(0 0 5px black);
  background-color:rgb(36, 36, 36);
  border-radius:5px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .skill-content {
    flex-direction: column;
  }
  
  .skill-info {
    width: 100%;
  }
  
  .skill-carousel {

    width: 100%;
    max-width: none;
  }
}

  /*
  * /////////////////
  *   STYLE MOBILE
  * /////////////////
  */
  @media (max-width: 1278px) {
    span.skill-name{
      max-width:75%;
    }

    p.skillSectionDescription, div#hardSkillsDescription , div#langsDescription  {
      width:auto !important;
      display:block !important;
      max-width:100% !important;
      min-width:auto !important;
    }

    div.hard-skills{
      flex-direction: column;
    }


    .skillsContainer {
      flex-direction: column; /* Stack containers vertically */
      min-width: auto !important;
      width:100vw;
    }

    .hard-skills {
      flex-direction: column; /* Stack skills vertically */
    }

    div.references-row {
      flex-direction: row;
      justify-content: space-between;
      gap:10%;
      min-width:100% !important;
    }

    div.reference{
      width:40%;
      min-width:40%;
      max-width:50%;
    }

    .skill-level {
      width: 100%; /* Full width for skill levels */
    }

    div.soft-skills{
      max-width:100% !important;
    }
  }

  /*
  * /////////////////
  *   STYLE TABLETTE
  * /////////////////
  */
  @media (max-width:1470px) and (min-width: 860px) {
    .skillsContainer {
      min-width:1200px;
    }
  }

  /*
  * /////////////////
  *   STYLE GENERAL
  * /////////////////
  */

  #skill-percentage-0{
    background-color: var(--skillDevColor);
  }

  #skill-percentage-1{
    background-color: var(--skillOtherColor);
  }

  a[href^="mailto:"] {
    color: inherit;
    text-decoration: underline;
  }

  .banniereSkills{
    width:100%;
    height:120px;
    object-fit:cover;
    margin-top:20px;
    border-radius:5px;
  }

  #langsDescription > img{
    height:175px;
  }

  .skill-name{
    display:flex;
    flex-direction: row;
    align-items: center;
    margin-top:20px;
    padding:5px 0 5px 0;
    transition:0.5s ease all;
  }


  .skill-name i{
    margin-right:5px;
  }

  .hardSkillName{
    margin-bottom:10px;
  }

  span#contactRef{
    width:100%;
    margin-top:10px;
    display:block;
  }

  .skills-display {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap; 
  }



  #hardSkillsContainer{
    max-width: 900px;
  }

  .skillsContainer {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background-color: rgb(26, 26, 26);
    padding: 20px;
    border: 1px solid black;
    border-radius: 20px;
    min-width: 300px;
    
    min-height: fit-content;
    position: relative;
    transform: translateY(50px);
    opacity: 0;
    transition: all 0.6s ease-in-out;
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.8), 0 0 15px rgba(0, 0, 0, 0.4);
  }

  #langsContainer {
    flex-direction: column;
    height:fit-content;
  }

  .hard-skills {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items:left;
    min-width: 500px;
    height: 50vh;
  }

  .skillsContainer.show {
    transform: translateY(0);
    opacity: 1;
  }

  /* Descriptions des sections */
  div#langsDescription, div#hardSkillsDescription {
    max-width: 500px;
    width:45vw;
    min-width:250px;
  }

  #referencesContainer {
    margin-top: 20px;
    min-width:fit-content;
    display:flex;

  }

  .references-title {
    text-align: left;
    margin-bottom: 10px;
  }

  .references-row {
    display: flex;
  }

  .reference {
    margin-right: 20px;
    flex: 1;
    min-width: fit-content;
    max-width: 250px;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  }

  .skills-display {
    font-family: Arial, sans-serif;
    margin: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  /* Styles pour les barres de compétences */
  .skill-bar {
    height:50px;
    margin-bottom: 10px;
  }

  .skill-name {
    font-weight: bold;
  }

  .skill-level {
    background: #eee;
    border-radius: 5px;
    overflow: hidden;
    height: 20px;
    width:350px;
  }

  .skill-image-card:hover{
    transition:0.2s ease all;
    cursor:pointer;
    transform:scale(1.05);
  }

  .skill-image-card{
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    margin:5px;
  }

  .skill-percentage {
    background: #3498db;
    height: 20px;
    border-radius: 5px 0 0 5px;
    width: 0%;
    transition: width 1.5s ease-in-out;
  }

  /* Styles pour les soft-skills */
  .soft-skills {
    display: flex;
    flex-direction: column;
    justify-content: left;
    max-width: 50%;
  }

  .cloud {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .soft-skill {
    background: #3498db;
    color: white;
    padding: 5px 10px;
    border-radius: 15px;
    margin: 5px;
    font-size: 14px;
    transition: transform 0.3s;
  }

  .soft-skill:hover {
    transform: scale(1.1);
  }
</style>
