<script setup>
import { onMounted, onUnmounted } from 'vue';
import {COULEUR_MENU_SELECTIONNE, COULEUR_MENU_BASIC} from '../data/const'

onMounted(() => {
    $('nav ul li:nth-child(5)').css('border-bottom', '2px solid '+COULEUR_MENU_SELECTIONNE);
    $('nav ul li:nth-child(5) span').css('color', COULEUR_MENU_SELECTIONNE);
})

onUnmounted(() => {
    $('nav ul li:nth-child(5)').css('border-bottom', '0px');
    $('nav ul li:nth-child(5) span').css('color', COULEUR_MENU_BASIC);
})
</script>

<template>
HOBBIES
</template>

<style scoped>
</style>