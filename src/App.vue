<template>
  <div>
    <DarkMode />
    <HeaderCmt />
    <main>
      <RouterView />
    </main>
    <FooterCmt />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import DarkMode from './components/DarkMode.vue';
import HeaderCmt from './components/HeaderCmt.vue';
import FooterCmt from './components/FooterCmt.vue';

document.querySelector('body').style.overflowX = 'hidden';
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  min-height:80vh;
  flex: 1;
}


</style>
