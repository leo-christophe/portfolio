<script setup>
    import experiencesData from '../data/data.json';
</script>

<template>
    <div>
      <div v-for="experience in experiences" :key="experience.titre" :id="experience.id" class="experience">
        <div class="experience">
          <h3>{{ experience.poste }}</h3>
          <p>{{ experience.entreprise }}</p>
          <p>{{ experience.dates.join(' - ') }}</p>
          <p>{{ experience.description }}</p>
          <ul>
            <li v-for="competence in experience.competences" :key="competence">{{ competence }}</li>
          </ul>
          <ul>
            <li v-for="mission in experience.missions" :key="mission">{{ mission }}</li>
          </ul>
        </div>
        <div v-if="experience.image">
          <img :src="experience.image" :id="experience.id+'_img'" class="imgExperience">
        </div>
      </div>
    </div>
  </template>
  
  
<style scoped>
    .experience {
        margin-bottom: 20px;
    }
    .imgExperience {
        max-width: 100%;
        height: auto;
    }
</style>