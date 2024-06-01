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
            <div v-if="formation.image">
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
        padding:30px;
        background-color:lightgrey;
        width:80vw;
    }

    #butinfo{
        background-color: darkred
    }

    #bac{
        background-color: darkblue
    }

    #brevet{
        background-color: darkgreen
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

    .imgFormation{
        width:450px;
        border-radius: 10px;
        height:100%;
        border:1px solid white;
    }

    
</style>