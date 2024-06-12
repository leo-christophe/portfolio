<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import DocumentViewer from '../components/Home/DocumentViewer.vue'
import HomeContact from '../components/Home/HomeContact.vue'
import HomeSkills from '../components/Home/HomeSkills.vue'
import HomeStart from '../components/Home/HomeStart.vue'

import News from '../components/News.vue'
import {COULEUR_MENU_SELECTIONNE, COULEUR_MENU_BASIC} from '../data/const'

onMounted(() => {
    $('nav ul li:nth-child(1)').css('border-bottom', '2px solid '+COULEUR_MENU_SELECTIONNE);
    $('nav ul li:nth-child(1) span').css('color', COULEUR_MENU_SELECTIONNE);
})

onUnmounted(() => {
    $('nav ul li:nth-child(1)').css('border-bottom', '0px');
    $('nav ul li:nth-child(1) span').css('color', COULEUR_MENU_BASIC);
})

</script>

<template>
    <div class="pageSection">
        <HomeStart></HomeStart>
    </div>
    <div class="pageSection">
        <HomeSkills></HomeSkills>
    </div>
    <div class="pageSection"> 
        <button>Consulter mon CV</button>
        <HomeContact></HomeContact>
    </div>

</template>

<style scoped>
    .pageSection{
        height:720px;
    }

    .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
    }

    @font-face {
    font-family: 'goodtimes';
        src:  url('goodtimes.otf') format('otf')
    }


    h1{
        font-family:'goodtimes';
        letter-spacing: 2px;
        float:left;
        margin-left:30px;
    }

    #id{
        background-color:rgb(213, 249, 255);
        border-radius: 10px;
        font-size: 2rem;
        color: #ff7300;
        font-weight: 800;
    }

    #text{
        display:inline;
    }

    #welcome{
        text-align:center;
    }
</style>