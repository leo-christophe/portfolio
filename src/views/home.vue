<script setup>
import HomeContact from '../components/Home/HomeContact.vue';
import HomeSkills from '../components/Home/HomeSkills.vue';
import HomeStart from '../components/Home/HomeStart.vue';
import HomeInterests from '../components/Home/HomeInterests.vue';
</script>

<template>
  <div id="homeContent">
    <HomeStart id="start" class="pageSection"></HomeStart>
    <HomeSkills id="skills" class="pageSection"></HomeSkills>
    <HomeInterests id="interests"></HomeInterests>
    <HomeContact id="contactSection" class="pageSection"></HomeContact>
  </div>
</template>

<style scoped>

#start {
  height: 100vh;
  z-index: 2;
  transition: background-color 2s ease-in-out; /* Ensure each section has smooth transition */
}


#skills {
  z-index: 3;
  height: 100vh;
  min-width: 100vw;
  margin-left: 0px !important;
  transition: background-color 2s ease-in-out; /* Ensure smooth transition */
}

#contactSection {
  transition: background-color 2s ease-in-out; /* Smooth transition */
  margin-top:10vh;
}

#interests{
  margin-top:10vh;
}

.pageSection {
  padding-top: 10vh;
  min-height: min-content;
  height: 100vh;
  transition: background-color 2s ease-in-out; /* Smooth transition of background color */
  z-index: 5;
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
