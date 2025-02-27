<script setup>
import HomeContact from "../components/Home/HomeContact.vue";
import HomeStart from "../components/Home/HomeStart.vue";
import HomeInterests from "../components/Home/HomeInterests.vue";
</script>

<template>
  <div id="homeContent">
    <HomeStart id="start" class="pageSection"></HomeStart>
    <HomeInterests id="interests"></HomeInterests>
    <HomeContact id="contactSection" class="pageSection"></HomeContact>
  </div>
</template>

<style scoped>
div#homeContent {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10vh;
  min-height: 100vh;
}

#contactSection {
  height: 100vh;
}

#start {
  height: 100vh;
  z-index: 2;
  transition: background-color 2s ease-in-out; /* Ensure each section has smooth transition */
}

.star {
  transition: opacity 2s ease-in-out; /* Ensure smooth transition */
  border-radius: 99999px;
  z-index: -1;
  filter: blur(100px);
  animation: star 5s linear infinite;
}

@keyframes star {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100vh);
  }
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
  margin-top: 10vh;
}

#interests {
  margin-top: 10vh;
}

.pageSection {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: min-content;
  height: 80vh;
  transition: background-color 2s ease-in-out; /* Smooth transition of background color */
  z-index: 5;
}

.fade-enter-active {
  opacity: 1;
}

@font-face {
  font-family: "goodtimes";
  src: url("goodtimes.otf") format("otf");
}

h1 {
  font-family: "goodtimes";
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
