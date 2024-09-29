<script setup>
  import { ref, onMounted, getCurrentInstance } from 'vue';

  // Accéder aux données globales
  const instance = getCurrentInstance();
  const data = instance.appContext.config.globalProperties.$JSONData; // Accéder aux données globales

  const main_hard_skills = ref(data.main_hard_skills);
  const main_soft_skills = ref(data.main_soft_skills);

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
    const containers = document.querySelectorAll('#softSkillsContainer, #hardSkillsContainer');
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
  <div class="skills-display">
    <span id="hardSkillsContainer">
      <div id="hardSkillsDescription">
        <h2 id="competencesTitre" class="typeCompetenceTitre">{{ $t('message.skillsTitle') }}</h2>
        <span>
          <p class="skillSectionDescription">{{ $t('message.hardskillsDescription') }}</p>
        </span>
        <img class="banniereSkills" src="/images/home/hardskills_banniere.jpg"></img>
      </div>
      <div class="hard-skills">
        <div v-for="(category, index) in main_hard_skills" :key="index" class="compType">
          <h4 class="hardSkillName">{{ Object.keys(category)[0] }}</h4>
          <div v-for="(skill, skillIndex) in category[Object.keys(category)[0]]" :key="skillIndex" class="skill-bar">
            <div class="skill-name">{{ Object.keys(skill)[0] }}</div>
            <div class="skill-level">
              <div class="skill-percentage" v-skill-bar :data-skill="skill[Object.keys(skill)[0]]" :style="{ height: '10px' }"></div>
            </div>
          </div>
        </div>
      </div>
    </span>

    <span id="softSkillsContainer">
      <div id="softSkillsDescription">
        <h2 class="typeCompetenceTitre">{{ $t('message.softskillsTitle') }}</h2>
        <span>
          <p class="skillSectionDescription">{{ $t('message.softskillsDescription') }}</p>
        </span>
        <img class="banniereSkills" src="/images/home/softskills_banniere.jpg"></img>
      </div>
      <div class="soft-skills">
        <div class="cloud">
          <span v-for="(skill, index) in main_soft_skills" :key="index" class="soft-skill">{{ skill }}</span>
        </div>

        <div id="referencesContainer">
          <h2 class="references-title">{{ $t('message.references') }}</h2>
          <div class="references-row">
            <div v-for="(ref, index1) in data.references[0]" :key="index1" class="reference">
              <h3><strong>{{ ref.name }}</strong></h3><br>
                <i class="pi pi-briefcase"/> <em>{{ ref.occupation }}</em> {{ $t("message.at") }}{{ ref.enterprise }}<br>
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
</template>

<style scoped>
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

#softSkillsDescription > img{
  height:175px;
}

.skill-name{
  margin-top:20px;
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
  justify-content: center; /* Center align the containers */
  align-items: flex-start; /* Align to the top */
  flex-wrap: wrap; 
  
  gap:100px; /* Space between the containers */
}

#hardSkillsContainer > div.hard-skills > div:nth-child(2){
  margin-left: 20px;
}

#softSkillsContainer, #hardSkillsContainer {
  display: flex;
  justify-content: space-around;
  background-color: rgb(26, 26, 26);
  padding: 20px; /* Add padding for better spacing */
  border: 1px solid black;
  border-radius: 20px;
  width:80vw;
  min-width: 850px; /* Adjust minimum width for mobile */
  max-width: 85%; /* Limit maximum width */
  height: fit-content; /* Set a fixed height for equal sizing */
  position: relative;
  transform: translateY(50px);
  opacity: 0;
  transition: all 0.6s ease-in-out;
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.8), 0 0 15px rgba(0, 0, 0, 0.4);
}

#softSkillsContainer {
  flex-direction: row-reverse;
}

.hard-skills {
  display: flex;
  min-width: 500px;
}

#hardSkillsContainer.show, #softSkillsContainer.show {
  transform: translateY(0);
  opacity: 1;
}

/* Descriptions des sections */
div#softSkillsDescription, div#hardSkillsDescription {
  max-width: 500px; /* Ensure descriptions fit within the container */
  min-width:400px;
}




#referencesContainer {
  margin-top: 20px; /* Space between soft skills and references */
}

.references-title {
  text-align: left; /* Align title to the left */
  margin-bottom: 10px; /* Space below title */
}

.references-row {
  display: flex; /* Display references in a row */
}

.reference {
  margin-right: 20px; /* Space between references */
  flex: 1; /* Make references responsive */
  min-width: fit-content; /* Set a minimum width for references */
  max-width: 250px; /* Set a max width */
  padding: 10px; /* Adjust padding for smaller boxes */
  background-color: rgba(255, 255, 255, 0.1); /* Add a background for better visibility */
  border-radius: 10px; /* Rounded corners for the reference box */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); /* Optional shadow for depth */
}

.skills-display {
  font-family: Arial, sans-serif;
  margin: 20px;
  padding-top: 100px;
}

/* Styles pour les barres de compétences */
.skill-bar {
  margin-bottom: 10px;
}

.skill-name {
  font-weight: bold;
}

.skill-level {
  background: #eee;
  border-radius: 5px;
  overflow: hidden;
  height: 10px;
  width: 200px;
}

.skill-percentage {
  background: #3498db;
  height: 10px;
  border-radius: 5px 0 0 5px;
  width: 0%; /* Initial width set to 0 */
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

/* Media Queries for Responsiveness */
@media (max-width: 860px) {
  #softSkillsContainer, #hardSkillsContainer {
    flex-direction: column; /* Stack containers vertically */
    margin: 20px; /* Adjust margin for smaller screens */
    padding: 10px; /* Adjust padding for smaller screens */
  }

  .hard-skills {
    flex-direction: column; /* Stack skills vertically */
  }

  .references-row {
    flex-direction: column; /* Stack references vertically */
  }

  .reference {
    margin-right: 0; /* Remove right margin */
    margin-bottom: 10px; /* Add bottom margin for spacing */
    min-width: 100%; /* Take full width on mobile */
  }

  .skill-level {
    width: 100%; /* Full width for skill levels */
  }
}
</style>
