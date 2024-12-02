<template>
  <Toast />
  <div>
    <HeaderCmt />
    <main>
      <router-view :key="$route.fullPath" v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
        <CookieBanner></CookieBanner>
        <Toast id="toastMainComponent"></Toast>
        <ConfirmDialog id="confirmDialogMainComponent"></ConfirmDialog>
      </router-view>

    </main>
    <FooterCmt />
  </div>
  
</template>

<script setup>
// Vue
import { onMounted } from 'vue';

// Components
import HeaderCmt from './components/HeaderCmt.vue';
import FooterCmt from './components/FooterCmt.vue';

// Libs
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';
import { useFavicon } from '@vueuse/core';

// Functions
import { traductionSetup } from '../src/utils/traduction.js';
import { isMobile } from '../src/utils/userdata.js';
import CookieBanner from './components/CookieBanner.vue';

const icon = useFavicon();

function zoomOutMobile() {
  var viewport = document.querySelector('meta[name="viewport"]');

  if (viewport) {
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
  const lang = traductionSetup();

  // Gestion du zoom sur mobile
  if (isMobile()) {
    zoomOutMobile();
  }

  // Setup cookie variable
  const isCookiePreferenceSet = localStorage.getItem("cookieChoice");
  if (isCookiePreferenceSet == null || isCookiePreferenceSet == ""){
    localStorage.setItem("cookieChoice","0")
  }

  const apiKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  const script = document.createElement('script');
  script.src = `https://www.google.com/recaptcha/api.js?render=${apiKey}`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);

  script.onload = () => {
    // You can now call any reCAPTCHA-related functions here, if needed
  };
});
</script>

<style>
/* Animation de fondu pour l'entrée et la sortie */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease, filter 0.1s ease; /* Augmenter la durée à 0.5s */
}

.fade-enter, .fade-leave-active /* .fade-leave-active en version 2.5+ */ {
  opacity: 0;
  filter: blur(2px); /* Ajouter un léger flou pour adoucir la transition */
}

main {
  display: flex;
  flex-direction: column;
  min-height: 80vh;
  flex: 1;
}
</style>
