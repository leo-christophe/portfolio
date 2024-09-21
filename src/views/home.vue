<script setup>
import HomeContact from '../components/Home/HomeContact.vue';
import HomeSkills from '../components/Home/HomeSkills.vue';
import HomeStart from '../components/Home/HomeStart.vue';
</script>

<template>

  <HomeStart id="start" class="pageSection"></HomeStart>
  <HomeSkills id="skills" class="pageSection"></HomeSkills>
  <HomeContact id="contactSection" class="pageSection"></HomeContact>

</template>

<style scoped>

#start{
  height:100vh;
  background-color:var(--home-background-color1);
  z-index:2;
}

#skills{
  z-index:3;
  height:100vh;
  min-width:100vw;
  margin-left:0px !important;
  background-color: var(--home-background-color2);
}

#contactSection{
  background-color: var(--home-background-color3);
}

.pageSection {
  padding-top:10vh;
  min-height:min-content;
  transition: opacity 2s;
  z-index:5;
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

/* #id {
  background-color: rgb(213, 249, 255);
  border-radius: 10px;
  font-size: 2rem;
  color: #ff7300;
  font-weight: 800;
} */

#text {
  display: inline;
}

#welcome {
  text-align: center;
}
</style>
