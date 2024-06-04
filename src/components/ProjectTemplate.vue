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
    <h1>{{ data.projects[props.id].nom }}</h1>
    <div id="titre">
        {{ data.projects[props.id].titre }}
    </div>
    <div id="desc">
        {{ data.projects[props.id].description }}
    </div>
    <div id="dates">
        {{ data.projects[props.id].dates.join(" - ") }}
    </div>
    <div id="competences">
        {{ data.projects[props.id].competences.join(", ") }}
    </div>
    <div id="missions">
        {{ data.projects[props.id].realisations.join(", ") }}
    </div>
    <div id="imageetlien">
        <a :href="data.projects[props.id].url">
            <div id="image" v-if="data.projects[props.id].image !== null">
                <img :src="data.projects[props.id].image">
            </div>
        </a>
    </div>
</template>

<style scoped>

</style>