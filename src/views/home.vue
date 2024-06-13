<script setup>
import { onMounted, onUnmounted } from 'vue';
import DocumentViewer from '../components/Home/DocumentViewer.vue';
import HomeContact from '../components/Home/HomeContact.vue';
import HomeSkills from '../components/Home/HomeSkills.vue';
import HomeStart from '../components/Home/HomeStart.vue';
import News from '../components/News.vue';
import scrollDirective from '../directives/scroll-directive.js';
import { COULEUR_MENU_SELECTIONNE, COULEUR_MENU_BASIC } from '../data/const';

onMounted(() => {
  $('nav ul li:nth-child(1)').css('border-bottom', '2px solid ' + COULEUR_MENU_SELECTIONNE);
  $('nav ul li:nth-child(1) span').css('color', COULEUR_MENU_SELECTIONNE);
});

onUnmounted(() => {
  $('nav ul li:nth-child(1)').css('border-bottom', '0px');
  $('nav ul li:nth-child(1) span').css('color', COULEUR_MENU_BASIC);
});
</script>

<template>
  <div class="pageSection" v-scroll>
    <HomeStart></HomeStart>
  </div>
  <div class="pageSection" v-scroll>
    <HomeSkills></HomeSkills>
  </div>
  <div class="pageSection" id="contactEtCv"  v-scroll>
    <button>Consulter mon CV</button>
    <HomeContact></HomeContact>
  </div>
</template>

<style scoped>


.pageSection {
  margin-top:10vh;
  height: 100vh;
  opacity: 0;
  transition: opacity 2s;
}

.fade-enter-active {
  opacity: 1;
}

@font-face {
  font-family: 'goodtimes';
  src: url('goodtimes.otf') format('otf');
}

h1 {
  font-family: 'goodtimes';
  letter-spacing: 2px;
  float: left;
  margin-left: 30px;
}

#id {
  background-color: rgb(213, 249, 255);
  border-radius: 10px;
  font-size: 2rem;
  color: #ff7300;
  font-weight: 800;
}

#text {
  display: inline;
}

#welcome {
  text-align: center;
}
</style>
