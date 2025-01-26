<script setup>
  import { ref, onMounted, getCurrentInstance } from 'vue';

  import { useRouter } from 'vue-router';

  import handleSkillClick from '../utils/skillUtils';

  const router = useRouter();

  // Accéder aux données globales
  const instance = getCurrentInstance();
  const data = instance.appContext.config.globalProperties.$JSONData;

  const main_hard_skills = ref(data.main_hard_skills);
  const main_soft_skills = ref(data.main_soft_skills);

import Carousel from 'primevue/carousel';

// Add responsive options for carousel
const responsiveOptions = ref([
  {
    breakpoint: '1400px',
    numVisible: 2,
    numScroll: 3
  },
  {
    breakpoint: '1199px',
    numVisible: 3,
    numScroll: 1
  },
  {
    breakpoint: '767px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '575px',
    numVisible: 1,
    numScroll: 1
  }
]);


// Helper function to get images for each skill category
const getSkillImages = (index) => {
  return hardSkillsImages.value[index].map(img => ({
    image: img,
    name: img.replace('.webp', '').replace('.svg',  '') // Remove file extension for display
  }));
};

    const hardSkillsImages = ref([
    // 1 - Développement Web
    [
      "Javascript.webp",
      "Laravel.webp",
      "Nuxt.webp",
      "PHP.webp",
      "Vite.webp",
      "Blazor.webp",
      "Flask.webp"
    ],
    
    // 2 - Développement Logiciel ou Jeux
    [
      "CSharp.webp",
      "Dotnet.webp",
      "Windev.webp",
      "Unity.webp",
      "WinUI.webp",
      "WPF.webp"
    ],

    // 3 - Analyse et Gestion des Données
    [
      "Grafana.webp",
      "InfluxDB.svg",
      "MySQL.webp",
      "PostgreSQL.webp",
      "PowerBI.webp"
    ],

    // 4 - Déploiement & DevOps
    [
      "Azure.webp",
      "Github.webp",
      "Gitlab.webp",
      "Vercel.webp",
      "VirtualBox.webp",
      "Linux.webp"
    ]
  ]);


  const hardSkillsIcons = ref([
    "pi pi-globe",
    "pi pi-desktop",
    "pi pi-database",
    "pi pi-sitemap"
  ])

  // Définir une directive personnalisée pour observer les barres de compétences
  const observer = ref(null);
  const vSkillBar = {
    mounted(el) {
      observer.value = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const bar = entry.target;
          if (entry.isIntersecting) {
            const width = bar.getAttribute('data-skill'); // Récupérer la compétence
            bar.style.width = width; // Remplir la barre
          } else {
            bar.style.width = '0%'; // Vider la barre
          }
        });
      }, { threshold: 0.5 }); // Déclenchement à 50% de visibilité

      // Observer l'élément (la barre de compétences)
      observer.value.observe(el);
    },
    unmounted(el) {
      // Nettoyage de l'observation quand l'élément est supprimé
      if (observer.value){
        observer.value.unobserve(el);
      }
    }
  };

  onMounted(() => {
    const containers = document.querySelectorAll('#langsContainer, #hardSkillsContainer');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        } else {
          entry.target.classList.remove('show');
        }
      });
    }, { threshold: 0.3 }); // Visible à 20% pour déclencher l'animation

    containers.forEach(container => {
      observer.observe(container);
    });
  });

  
</script>

<template>

  <div class="skills-page">
    <div id="skills-page-title">
      <h1>Compétences</h1>
    </div>

    <div class="skills-display">
      <span>
        <span id="hardSkillsContainer">
          <!--? Titre de la section "Compétences" -->
          <div id="hardSkillsDescription">
            <h2 id="competencesTitre" class="typeCompetenceTitre">{{ $t('skills.skillsTitle') }} 
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
                    <div class="skill-image-card">
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


        <span id="langsContainer">
          <div>
            <h2>Langues parlées</h2>
          </div>
          <div>
            <img src="/images/icons/tech/France.png" class="drapeau"/>
            <h3>Français</h3>
            <h4>Langue maternelle</h4>
          </div>
          <div>
            <img src="/images/icons/tech/English.png" class="drapeau"/>
            <h3>Anglais</h3>
            <h4>Niveau avancé (C2)</h4>
          </div>
          <div>
            <img src="/images/icons/tech/Italy.png" class="drapeau"/>
            <h3>Italien</h3>
            <h4>Niveau intermédiaire (B2)</h4>
          </div>
          <div>
            <img src="/images/icons/tech/Japanese.png" class="drapeau"/>
            <h3>Japonais</h3>
            <h4>Notions (A0)</h4>
          </div>
        </span>
      </span>
      <span id="langsContainer">

        <div class="soft-skills">
          <div id="referencesContainer">
            <h2 class="references-title">{{ $t('skills.references') }}</h2>
            <div class="references-row">
              <div v-for="(ref, index1) in data.references[0]" :key="index1" class="reference">
                <h3><strong>{{ ref.name }}</strong></h3><br>
                  <i class="pi pi-briefcase"/> <em>{{ ref.occupation }}</em> {{ $t("words.at") }}{{ ref.enterprise }}<br>
                {{ ref.location }}<br>
                <span id="contactRef">
                  <div><i class="pi pi-envelope"/> <a :href="'mailto:' + ref.email">{{ ref.email }}</a></div>
                  <span v-if="ref.phone"><i class="pi pi-phone"/> {{ ref.phone }}</span>
                </span>
              </div>
            </div>
          </div>
          
        </div>
      </span>
    </div>
  </div>
</template>

<style scoped>
img.drapeau{
  width:50px;
  height:50px;
  object-fit:cover;
  margin:5px;
}

#skills-page-title{
  text-align:center;
  margin-top:20px;
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


    span#langsContainer, span#hardSkillsContainer {
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
    span#langsContainer, span#hardSkillsContainer {
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
    gap:100px;
  }

  .skills-display span{
    display:flex;
    flex-direction:row;
  }

  span#langsContainer{
    margin-left:5vw;

  }


  #hardSkillsContainer,#langsContainer {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background-color: rgb(26, 26, 26);
    padding: 20px;
    border: 1px solid black;
    border-radius: 20px;
    min-width: 300px;
    max-width: 900px;
    height: fit-content;
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

  #hardSkillsContainer.show, #langsContainer.show {
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
    padding-top: 100px;
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
