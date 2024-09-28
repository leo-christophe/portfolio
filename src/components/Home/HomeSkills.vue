<script setup>
  import { ref, onMounted, getCurrentInstance } from 'vue';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();

  // Accéder aux données globales
  const instance = getCurrentInstance();
  const data = instance.appContext.config.globalProperties.$JSONData; // Accéder aux données globales

  const main_hard_skills = ref(data.main_hard_skills);
  const main_soft_skills = ref(data.main_soft_skills);

  // Définir une directive personnalisée pour observer les barres de compétences
  const vSkillBar = {
    mounted(el) {
      const observer = new IntersectionObserver((entries) => {
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
      observer.observe(el);
    },
    unmounted(el) {
      // Nettoyage de l'observation quand l'élément est supprimé
      observer.unobserve(el);
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
      </div>
      <div class="hard-skills">
        <div v-for="(category, index) in main_hard_skills" :key="index" class="compType">
          <h4>{{ Object.keys(category)[0] }}</h4>
          <div v-for="(skill, skillIndex) in category[Object.keys(category)[0]]" :key="skillIndex" class="skill-bar">
            <div class="skill-name">{{ Object.keys(skill)[0] }}</div>
            <div class="skill-level">
              <!-- Appliquer la directive v-skill-bar -->
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
      </div>
      <div class="soft-skills">
        <div class="cloud">
          <span v-for="(skill, index) in main_soft_skills" :key="index" class="soft-skill">{{ skill }}</span>
        </div>
      </div>
    </span>
  </div>
</template>

<style scoped>#softSkillsContainer, #hardSkillsContainer {
  display: flex;
  flex-direction: row;
  background-color: rgb(26, 26, 26);
  margin: 50px 300px 50px 300px;
  padding: 5vw;
  border: 1px solid black;
  border-radius: 20px;
  min-width: 830px;
  position: relative;
  /* Effet de translation pour les décaler comme si c'était en dehors de la page */
  transform: translateY(50px);
  opacity: 0;
  transition: all 0.6s ease-in-out;
  /* Effet d'ombre accentué pour un effet flottant */
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.8), 0 0 15px rgba(0, 0, 0, 0.4);
}

.hard-skills{
  display:flex;
}

#hardSkillsContainer.show, #softSkillsContainer.show {
  /* Quand les conteneurs deviennent visibles, ramener l'opacité et retirer la translation */
  transform: translateY(0);
  opacity: 1;
}

/* Descriptions des sections */
div#softSkillsDescription{
  margin-left: 5vw;
}

div#hardSkillsDescription {
  margin-right: 5vw;
}

/* Positionnement spécifique pour le conteneur hard-skills */
#hardSkillsContainer > div.hard-skills > div:nth-child(2) {
  margin-left: 2vw;
}

/* Disposition des conteneurs */
#softSkillsContainer {
  flex-direction: row-reverse;
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
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
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
