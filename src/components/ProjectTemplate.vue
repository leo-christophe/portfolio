<script setup>
import { defineProps, ref, computed } from 'vue'
import data from '../data/data.json'
import { PowerBIEmbedModule } from 'powerbi-client-vue-js';

// Définir les props
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})


function downloadFile(downloadlink){
    // Lien vers le fichier existant (URL absolue ou relative)
    const fileUrl = downloadlink; // Remplacer avec l'URL réelle du fichier
    const fileName = downloadlink.substring(downloadlink.lastIndexOf('/') + 1); // Nom du fichier téléchargé

    // Créer un élément de lien
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;

    // Simuler un clic pour déclencher le téléchargement
    link.click();
}


    function getMaxRows() {
        // Trouver la longueur maximale parmi toutes les listes de compétences
        return Math.max(...Object.values(this.data.projects[this.props.id].competences).map(v => v.length));
    }


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
const LineIndex = ref(0);
function LineIndexIncrementation(){
    LineIndex.value = LineIndex.value + 1;
}
</script>

<template>
    <div id="project">
        <h1 class="projectElement">{{ data.projects[props.id].nom }}</h1>
        
        <div id="titre" class="projectElement">
            {{ data.projects[props.id].titre }}
        </div>
        
        <div id="images-container" class="projectElement">

            <div v-if="hasImages" id="images">
                <button v-if="multipleImages" @click="switchImage('back')" id="leftButton" title="Voir la dernière image">&#8678;</button>
                <a :v-if="data.projects[props.id].url" :href="data.projects[props.id].url">
                    <a :v-if="!(data.projects[props.id].url) && data.projects[props.id].github" :href="data.projects[props.id].github">   
                        
                        <div v-if="data.projects[props.id].images[ActualImage].type == 'image'">
                            <img  :src="'/images/projects/'+data.projects[props.id].images[ActualImage].link" class="projectimage" :title="data.projects[props.id].images[ActualImage].description">  
                        </div>

                        <div v-else-if="data.projects[props.id].images[ActualImage].type == 'video'">
                            <iframe width="560" height="315" :src="data.projects[props.id].images[ActualImage].link" class="projectimage" :title="data.projects[props.id].images[ActualImage].description" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        </div>

                        <div v-else-if="data.projects[props.id].images[ActualImage].type == 'powerbi'">
                            <iframe width="660" height="415" :src="data.projects[props.id].images[ActualImage].link" frameborder="1" allowFullScreen="true" class="projectimage" :title="data.projects[props.id].images[ActualImage].description"></iframe>
                        </div>

                      
                        <p class="imageDescription">{{ data.projects[props.id].images[ActualImage].description }}</p> 
                    </a> 
                </a>
                <button v-if="multipleImages" @click="switchImage('forward')" id="rightButton" title="Voir la prochaine image">&#8680;</button>
            </div>
            
            <div id="Projectlinks">
                <a v-if="data.projects[props.id].github" :href="data.projects[props.id].github">
                    <i class="pi pi-github imgProjectLinks"  title="Lien vers le Github / Le code source"></i>
                </a>
                <a v-if="data.projects[props.id].url" :href="data.projects[props.id].url">
                    <i class="pi pi-globe imgProjectLinks" title="Lien vers le site web / Le téléchargement du projet"></i>
                </a>
                <a v-if="data.projects[props.id].download" @click="downloadFile(data.projects[props.id].download)">
                    <i class="pi pi-download imgProjectLinks" title="Télécharger le fichier"></i>
                </a>
            </div>

        </div>

        <div id="desc" class="projectElement">
            {{ data.projects[props.id].description }}
        </div>

        <div id="lists">
            <table id="competences" class="ListeDescendanteConteneur projectElement floatLeft">
    <thead>
        <tr>
            <!-- En-têtes de colonnes avec les noms des compétences -->
            <th v-for="(value, key) in data.projects[props.id].competences" :key="'header-' + key">
                {{ key }}
            </th>
        </tr>
    </thead>
    <tbody>
        <!-- Pour chaque indice de tableau de compétence -->
        <tr v-for="index in data.projects[props.id].competences" :key="index">
            {{index}}
        </tr>
    </tbody>
</table>




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
    position:relative;
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

#images-container {
    justify-content: center;
    align-self: center;
    display:grid;
    
}

#Projectlinks {
    bottom: 10px; /* Le placer en bas du rectangle gris */
    left: 10px; /* Le placer à gauche du rectangle gris */
    display: flex;
    flex-direction: row; /* Aligner les liens horizontalement */
    gap: 10px; /* Espacement entre les liens */
    margin-top:10px;
}

#images {
    position: relative; /* Assurer que #Projectlinks se positionne correctement */
    background-color: gray;
    border-radius: 10px;
    width: 900px;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    box-shadow: 2px 2px 2px 2px black;
}

.imgProjectLinks {
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
}

</style>
