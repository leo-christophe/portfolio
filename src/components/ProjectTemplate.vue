<script setup>
import { defineProps, ref, computed } from 'vue'
import data from '../data/data.json'

// Définir les props
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const ActualImage = ref(0)
const switchImage = (way) => {
    const totalImages = data.projects[props.id].images.length;
    if (way === "back") {
        ActualImage.value = (ActualImage.value - 1 + totalImages) % totalImages;
    } else {
        ActualImage.value = (ActualImage.value + 1) % totalImages;
    }
}

const hasImages = computed(() => data.projects[props.id].images[0] != null)
const multipleImages = computed(() => data.projects[props.id].images.length > 1)
</script>

<template>
    <div id="project">
        <h1 class="projectElement">{{ data.projects[props.id].nom }}</h1>
        
        <div id="titre" class="projectElement">
            {{ data.projects[props.id].titre }}
        </div>
        
        <div v-if="hasImages" id="images" class="projectElement">
            <button v-if="multipleImages" @click="switchImage('back')" id="leftButton" title="Voir la dernière image">&#8678;</button>
            <a :v-if="data.projects[props.id].url" :href="data.projects[props.id].url">
            <a :v-if="!(data.projects[props.id].url) && data.projects[props.id].github" :href="data.projects[props.id].github">   
                <img v-if="data.projects[props.id].images[ActualImage].type != 'video'" :src="data.projects[props.id].images[ActualImage].link" class="projectimage" :title="data.projects[props.id].images[ActualImage].description">  
                
                <iframe width="560" height="315" v-else :src="data.projects[props.id].images[ActualImage].link" class="projectimage" :title="data.projects[props.id].images[ActualImage].description" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

                <p class="imageDescription">{{ data.projects[props.id].images[ActualImage].description }}</p> 
            </a> 
            </a>
            <button v-if="multipleImages" @click="switchImage('forward')" id="rightButton"  title="Voir la prochaine image">&#8680;</button>
        </div>
        
        <div id="desc" class="projectElement">
            {{ data.projects[props.id].description }}
        </div>

        <div id="lists">
            <div id="competences" class="ListeDescendanteConteneur projectElement floatLeft">
                <div class="ListeDescendante" v-for="competence in data.projects[props.id].competences" :key="competence">
                    <strong>{{ competence }}</strong>
                </div>
            </div>

            <div id="realisations" class="ListeDescendanteConteneur projectElement floatRight">
                <div class="ListeDescendante" v-for="realisation in data.projects[props.id].realisations" :key="realisation">
                    <strong>{{ realisation }}</strong>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.imageDescription{
    color:lightgray;
    font-size:0.9rem;
}

#project {
    margin-left: 50px;
    margin-right: 50px;
}

.projectElement {
    margin: 20px;
    text-align: center;
}

#images {
    background-color: gray;
    border-radius: 10px;
    width: 900px;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    box-shadow: 2px 2px 2px 2px black;
    margin: auto;
}

button#leftButton, button#rightButton {
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    background-color: rgb(0, 0, 0);
    border-radius: 30px;
    font-weight: 900;
    margin: 0 20px;
}

img.projectimage {
    width: 500px;
    height: auto;
    border-radius: 10px;
    border: 1px solid black;
    box-shadow: 3px 3px 3px 3px darkslategray;
}

#lists {
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
}

.ListeDescendanteConteneur {
    width: 45%;
}

.ListeDescendante {
    margin: 5px;
    padding: 10px;
    border: 1px solid black;
    background-color: rgb(64, 64, 64);
    text-align: center;
}
small{
    margin-top:30px;
}

</style>
