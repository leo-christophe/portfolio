<template>
  <div class="skills-display">
    <h2>Compétences</h2>
    <div class="hard-skills">
      <div v-for="(category, index) in main_hard_skills" :key="index" class="compType">
        <h4>{{ Object.keys(category)[0] }}</h4>
        <div v-for="(skill, skillIndex) in category[Object.keys(category)[0]]" :key="skillIndex" class="skill-bar">
          <div class="skill-name">{{ Object.keys(skill)[0] }}</div>
          <div class="skill-level">
            <div class="skill-percentage" :data-skill="skill[Object.keys(skill)[0]]" :style="{ height: '10px' }"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="soft-skills">
      <div class="cloud">
        <span v-for="(skill, index) in main_soft_skills" :key="index" class="soft-skill">{{ skill }}</span>
      </div>
    </div>
  </div>
</template>

  
  <script setup>
  import { ref, onMounted } from 'vue';
  import data from '../../data/data.json';

  const main_hard_skills = ref(data.main_hard_skills);
  const main_soft_skills = ref(data.main_soft_skills);

  onMounted(() => {
    const skillBars = document.querySelectorAll('.skill-percentage');
    skillBars.forEach((bar) => {
      const width = bar.getAttribute('data-skill'); // Get the percentage from a data attribute
      bar.style.width = width;
    });
  });
</script>

  
  <style scoped>
    .compType{
        display:inline-block;
        margin-left:20vw;
    }

  .skills-display {
    font-family: Arial, sans-serif;
    margin: 20px;
    padding-top:100px;
  }
  
  .hard-skills, .soft-skills {
    margin-bottom: 20px;
  }
  
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
  }
  
  .soft-skills {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin-top:100px;
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

  .skill-percentage {
    background: #3498db;
    height: 10px;
    border-radius: 5px 0 0 5px;
    width: 0%; /* Initial width set to 0 */
    transition: width 1.5s ease-in-out; /* Smooth transition for the width */
}

  </style>
  