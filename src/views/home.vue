<script setup>
import { onMounted, onUnmounted } from 'vue';
import HomeContact from '../components/Home/HomeContact.vue';
import HomeSkills from '../components/Home/HomeSkills.vue';
import HomeStart from '../components/Home/HomeStart.vue';
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

<HomeStart id="start" class></HomeStart>
<HomeSkills id="skills"></HomeSkills>
<HomeContact id="contact"></HomeContact>

</template>

<style scoped>

#start{
  height:100vh;
  background-color:rgb(39, 39, 39);
}

#home2{
  background-color:rgb(33, 33, 33);
}

#contactEtCv{
  padding-top:10vh;
}

.pageSection {
  padding-top:10vh;
  height: 90vh;
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
