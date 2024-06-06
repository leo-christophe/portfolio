<script setup>
import { defineProps } from 'vue'
import data from '../data/data.json'

// Définir les props
const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})
</script>

<template>
    <div id="project">
        <h1 class="projectElement">{{ data.projects[props.id].nom }}</h1>
        <div id="titre" class="projectElement floatLeft">
            {{ data.projects[props.id].titre }}
        </div>
        <div id="desc" class="projectElement floatLeft">
            {{ data.projects[props.id].description }}
        </div>
        <div id="dates" class="projectElement floatLeft">
            {{ data.projects[props.id].dates.join(" - ") }}
        </div>
        <div id="competences" class="projectElement floatRight">
            <div class="competence" v-for="competence in data.projects[props.id].competences" :key="competence">
                <strong>{{ competence }}</strong>
            </div>
        </div>
        <div id="missions" class="projectElement floatRight">
            {{ data.projects[props.id].realisations.join(", ") }}
        </div>
        <div id="imageetlien" class="projectElement floatDown">
            <a :href="data.projects[props.id].url">
                <div id="image" v-if="data.projects[props.id].image !== null">
                    <img :src="data.projects[props.id].image">
                </div>
            </a>
        </div>
    </div>
</template>

<style scoped>
    .floatRight{
        float:right;
        width:300px;
    }
    
    .floatLeft{
        float:left;
        width:300px;
    }

    #competences{
        flex-wrap:wrap;
        background-color:black;
        width:20vw;
        height:auto;
        border: 5px solid gray;
        
        margin-right:100px;
    }

    .competence{
        margin:5px;
        padding:10px;
        border:1px solid black;
        background-color:rgb(64, 64, 64);
        text-align:center;
    }

    #project{
        margin-left:50px;
    }

    .projectElement{
        margin:20px;
    }
</style>