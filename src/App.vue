<script setup>
  // Vue
  import { onMounted, ref } from 'vue';

  // Components
  //import DarkMode from './components/DarkMode.vue';
  import HeaderCmt from './components/HeaderCmt.vue';
  import FooterCmt from './components/FooterCmt.vue';

  // Libs
  import Toast from 'primevue/toast';
  import { useFavicon } from '@vueuse/core';

  // Functions
  import { traductionSetup } from '../src/utils/traduction.js';

  const icon = useFavicon();

  onMounted(() => {
    // Gestion du style général du site
    document.body.style.overflowX = 'hidden';

    // Gestion des images de l'accueil / du site
    icon.value = '/images/app_identity/icon.jpg';

    // Gestion de la langue
    traductionSetup()
  });
</script>

<template>
  <Toast />
  <div>
    <!-- <DarkMode /> -->
    <HeaderCmt />
    <main>
      <RouterView />
    </main>
    <FooterCmt />
  </div>
</template>

<style scoped>

  main {
    display: flex;
    flex-direction: column;
    min-height:80vh;
    flex: 1;
  }

</style>
