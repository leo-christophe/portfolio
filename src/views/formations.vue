<script setup>
    import { ref } from 'vue';
    // données
    import {formations} from '../data/data.json';
    
</script>


<template>
    <div id="conteneurFormations">
        <h1 id="titreFormations">Formations</h1>

        <div v-for="formation in formations" :key="formation.titre" :id="formation.id" class="formation">
            <div class="information">
                <h3 class="titreFormation">{{ formation.titre }} at <strong>{{ formation.lieu }}</strong>, {{ formation.ville }} ({{ formation.departement }})</h3>
                <h4 class="obtention">{{ formation.obtention }}</h4>
                <h5 class="annees">{{ formation.annees }}</h5>
            </div>
            <div v-if="formation.image" class="imgFormationContainer">
                <img :src="formation.image" :id="formation.id+'_img'" class="imgFormation">
            </div>
        </div>

    </div>
    
</template>

<style scoped>
    

    #titreFormations{
        text-align: center;
        font-size: 3em;
        color:black;
        -webkit-text-stroke-width: 1px;
        -webkit-text-stroke-color: rgb(103, 103, 103);
    }

    #conteneurFormations{
        margin-left:10vw;
        margin-bottom:5vh;
        border:2px solid black;
        border-radius:5px;
        box-shadow: 2px 2px 5px black;
        padding:30px;
        background-color:lightgrey;
        width:80vw;
        
    }

    #butinfo{
        background-color: rgb(133, 74, 70);
        transition:0.5s ease-in-out all;
    }

    #butinfo:hover{
        background-color: rgb(131, 38, 32);
        transition:0.5s ease-in-out all;
    }

    #bac{
        background-color: rgb(139, 120, 102);
        transition:0.5s ease-in-out all;
    }

    #bac:hover{
        background-color: rgb(134, 98, 65);
        transition:0.5s ease-in-out all;
    }

    #brevet{
        background-color: rgb(85, 71, 138);
        transition:0.5s ease-in-out all;
    }

    #brevet:hover{
        background-color: rgb(55, 42, 105);
        transition:0.5s ease-in-out all;
    }

    .information{
        margin-left:20px;
        text-align: left;
        font-size:larger;
    }

    .formation{
        width:70vw;
        margin: 0 auto;
        display:flex;
        justify-content: space-between; 
        border:2px solid white;
        border-radius:10px;
        margin: 20px;
    }

    .imgFormationContainer .imgFormation{

        width:300px;
    }

    div.imgFormationContainer{
        float:right;
        margin-bottom:-6px;
        height:100%;
    }
    
</style>