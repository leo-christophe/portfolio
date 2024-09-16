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
  background-color:rgb(39, 39, 39);
  z-index:2;
}

#contactSection{
  background-color:rgb(13, 13, 13);
}

#skills{
  z-index:3;
  height:100vh;
}

#home2{
  background-color:rgb(33, 33, 33);
}

.pageSection {
  padding-top:10vh;
  height: 130vh;
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
