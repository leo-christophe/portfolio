<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import DocumentViewer from '../components/DocumentViewer.vue'
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

    <div id="welcome">
        <div id="text">
            <h1>Léo CHRISTOPHE</h1>
            <p>2nd year IT student</p>
            <p>Based in Annecy, France</p>
        </div>
    </div>

    <News></News>

    <!-- <DocumentViewer/> -->

    

</template>

<style scoped>
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