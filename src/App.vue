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
  import { isMobile } from '../src/utils/userdata.js';

  const icon = useFavicon();

  function zoomOutMobile() {
    var viewport = document.querySelector('meta[name="viewport"]');

    if ( viewport ) {
      viewport.content = "initial-scale=0.1";
      viewport.content = "width=860";
    }
  }

  onMounted(() => {
    // Gestion du style général du site
    document.body.style.overflowX = 'hidden';

    // Gestion des images de l'accueil / du site
    icon.value = '/images/app_identity/icon.jpg';

    // Gestion de la langue
    traductionSetup()

    // Gestion du zoom sur mobile
    if ( isMobile() ) {
      zoomOutMobile();
    }

    const apiKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${apiKey}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      console.log("reCAPTCHA script loaded successfully");
      // You can now call any reCAPTCHA-related functions here, if needed
    };
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
