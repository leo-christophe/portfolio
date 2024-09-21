<script setup>
  // Vue
  import { onMounted } from 'vue';

  // Components
  //import DarkMode from './components/DarkMode.vue';
  import HeaderCmt from './components/HeaderCmt.vue';
  import FooterCmt from './components/FooterCmt.vue';

  // Libs
  import Toast from 'primevue/toast';
  import { useFavicon } from '@vueuse/core';

  const icon = useFavicon();

  onMounted(() => {
    document.body.style.overflowX = 'hidden';
    icon.value = '/images/app_identity/icon.jpg';
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
