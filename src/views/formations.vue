<script setup>
    import { onMounted, onUnmounted, ref } from 'vue';
    // données
    import {formations} from '../data/data.json';
    import {COULEUR_MENU_SELECTIONNE, COULEUR_MENU_BASIC} from '../data/const'

    onMounted(() => {
        $('nav ul li:nth-child(2)').css('border-bottom', '2px solid '+COULEUR_MENU_SELECTIONNE);
        $('nav ul li:nth-child(2) span').css('color', COULEUR_MENU_SELECTIONNE);
    })

    onUnmounted(() => {
        $('nav ul li:nth-child(2)').css('border-bottom', '0px');
        $('nav ul li:nth-child(2) span').css('color', COULEUR_MENU_BASIC);
    })
</script>


<template>
    <h1 id="titreFormations">Formations</h1>
    
    
    <div id="conteneurFormations">
        <div v-for="formation in formations" :key="formation.titre" :id="formation.id" class="formation">
          
                <div class="information">
                    <h4 class="titreFormation">{{ formation.titre }} au <strong>{{ formation.lieu }}</strong>, {{ formation.ville }} ({{ formation.departement }})</h4>
                    <h5 class="obtention">{{ formation.obtention }}</h5>
                    <h5 class="annees">{{ formation.annees }}</h5>
                </div>
                <div v-if="formation.image" class="imgFormationContainer" @click="window.open(formation.siteFormation, '_blank').focus();">
                    <img :src="formation.image" :id="formation.id+'_img'" class="imgFormation">
                </div>
       
        </div>
    </div>
    
</template>

<style scoped>
    

    #titreFormations{
        text-align: center;
        font-size: 3em;
        color:white;
        padding: 10px 0px 10px 0px;
    }

    #conteneurFormations{
        margin:0px 0px 50px 10vw;
        border:2px solid black;
        border:2px solid gray;
        box-shadow: 2px 2px 5px black;
        padding:10px;
        background-color:rgb(66, 79, 79);;
        width:80vw;
        height:auto;
        display:inline-flex;
        flex-wrap:wrap;
        justify-content: space-around;

    }

    #butinfo{
        background-color: rgb(41, 35, 76);
        transition:0.5s ease-in-out all;
    }

    #butinfo:hover{
        background-color: rgb(59, 51, 102);
        transition:0.5s ease-in-out all;
    }

    #bac{
        background-color: rgb(35, 42, 76);
        transition:0.5s ease-in-out all;
    }

    #bac:hover{
        background-color: rgb(52, 62, 114);
        transition:0.5s ease-in-out all;
    }

    #brevet{
        background-color: rgb(35, 53, 76);
        transition:0.5s ease-in-out all;
    }

    #brevet:hover{
        background-color: rgb(50, 74, 125);
        transition:0.5s ease-in-out all;
    }

    .information{
        margin:5px 20px 0px 20px;
        text-align: left;
        font-size:larger;
        height:150%;
    }

    .formation{
        width:300px;

        justify-content: space-between; 
        border:2px solid white;
        border-radius:10px;
        margin: 20px;

        display:flex;
        flex-direction: column;
    }

    .annee{
        bottom:0px;
        position:relative;

    }

    .imgFormationContainer .imgFormation{
        height:150px;
        object-fit: cover;
        width:100%;
        position:relative;
        bottom:-6px;
        border-radius:0px 0px 10px 10px;
        border-top:1px solid white;
    }

    div.imgFormationContainer{
        height:auto;
    }
    
</style>