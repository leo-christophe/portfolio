<script setup>
import DarkMode from './components/DarkMode.vue';
import Header from './components/Header.vue';

</script>

<template>
  <DarkMode/>
  <div>
    <Header></Header>
    <main>
    <RouterView />
    </main>
  </div>
</template>

<style scoped>

</style>