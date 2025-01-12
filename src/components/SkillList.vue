<script setup>
const list = defineProps({
  isSorted: {
    type: Boolean,
    required: true
  },
  content: {
    type: Object,
    default: [],
    required: true
  },
  filterType: {
    type: String,
    required: false
  }
});

const details = ref([]);

    import InputText from 'primevue/inputtext';
import { computed, getCurrentInstance, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n'; 
import SkillList from '../components/SkillList.vue';

const { t } = useI18n(); 
const router = useRouter();
const instance = getCurrentInstance();
const data = instance.appContext.config.globalProperties.$JSONData;

/**
 * @description Fermer tous les détails sauf celui sélectionné
 * @param {int} detail 
 */
function closeEveryDetails(detail, custom=false) {
    if (detail === undefined || detail < 0 || detail > details.value.length) {
        throw new Error('Aucun index de détail n\'a été fourni');
    }

    if (custom){
        details.value.forEach((d, index) => {
        if (index !== detail) {
            details.value[index].children[0].removeAttribute('open');
        }
    });
        return;
    }

    details.value.forEach((d, index) => {
        if (index !== detail) {
            details.value[index].children[0].removeAttribute('open');
        }
    });
}
</script>


<template>
    <div v-if="!isSorted" ref="details" @click="closeEveryDetails(catIndex)" v-for="(category, catIndex) in list.content" :key="catIndex" class="skill-category">
        <details >
            <summary>
                <h2>{{ Object.keys(category)[0] }}</h2>
                <!-- Conditional icons based on open state -->
            </summary>
            <div class="projects">
                <h3>Experiences:</h3>
                <div id="experiencesContainer">

                <!-- Vérifie que data.projects est défini avant d'itérer -->
                <div v-for="(project, projIndex) in data.projects.filter(project => 
                        Object.keys(project?.competences || {}).includes(Object.keys(category)[0]) && 
                        !project.wip
                    )" 
                
                    :key="projIndex" 
                    class="listeProjets projectCard" >
                    <div v-if="Object.keys(project.competences).includes(Object.keys(category)[0])">
                    <div class="affichageProjet">
                        <img 
                            v-if="project.images && project.images[0] && project.images[0].type == 'image'" 
                            :src="'/images/projects/' + project.images[0]['link']" 
                            :alt="'experience' + projIndex" 
                            width="100" height="100" 
                        />

                        <img 
                            v-else-if="project.images && project.images[0] && project.images[0].type == 'icone'"
                            :src="project.images[0]['link']"
                            :alt="'experience' + projIndex"
                            width="100" height="100"
                        />

                        <span @click="router.push(project.route)">
                        <h4>{{ project.nom }}</h4>
                        <p class="competenceTitre">{{ project.titre }}</p>
                        <p class="competenceListe">
                            ({{ project.competences[Object.keys(category)[0]].join(', ') }})
                        </p>
                        </span>
                    </div>
                    </div>
                </div>

                <div v-for="(experience, projIndex) in data.experiences" :key="projIndex" class="listeExperiences projectCard">
                <!-- Check if the project's competences include the category -->
                    <div v-if="Object.keys(experience.competences).includes(Object.keys(category)[0])" class="affichageExperience">
                        <img v-if="experience.image" :src="experience.image" alt="experience" width="100"  height="100"/>
                        <span @click="router.push('/formations')" class="projectCard">
                            <h4>{{ experience.contrat }} {{ experience.poste }}</h4>
                            <p>{{ experience.entreprise }} - {{ experience.localisation }}</p>
                            <p class="competenceListe">
                                ({{ experience.competences[Object.keys(category)[0]].join(', ') }})
                            </p>
                        </span>
                    </div>
                </div>
                </div>
            </div>
        </details>
    </div>

    <div v-else >
        <div v-for="comp,index in Object.keys(list.content)">
            <h2 class="uetitle">
                {{ comp }}: {{ data.ue_but[comp].titre }} 
                <div class="infoTooltip" v-tooltip.right="data.ue_but[comp].description">
                    <i class="pi pi-info-circle"></i>
                </div>
            </h2>
            <div>
                <div v-for="(skill, index) in list.content[comp]" :key="index" @click="closeEveryDetails(index, custom=true)" ref="details" >
                    <details>
                        <summary><h2>{{ skill.skillCategory }}</h2></summary>
                        <div class="projects">
                            <h3>Experiences:</h3>
                            <div id="experiencesContainer">
                                
                            <!-- Vérifie que data.projects est défini avant d'itérer -->
                            <div v-for="(project, projIndex) in data.projects.filter(project => {
                                    return Object.keys(project?.competences || {}).includes(skill.skillCategory) && 
                                    !project.wip })" 
                            
                                :key="projIndex" 
                                class="listeProjets projectCard" >
                                
                                <div v-if="Object.keys(project?.competences || {}).includes(skill.skillCategory)">
                                <div class="affichageProjet">
                                    <img 
                                        v-if="project.images && project.images[0] && project.images[0].type == 'image'" 
                                        :src="'/images/projects/' + project.images[0]['link']" 
                                        :alt="'experience' + projIndex" 
                                        width="100" height="100" 
                                    />

                                    <img 
                                        v-else-if="project.images && project.images[0] && project.images[0].type == 'icone'"
                                        :src="project.images[0]['link']"
                                        :alt="'experience' + projIndex"
                                        width="100" height="100"
                                    />

                                    <span @click="router.push(project.route)">
                                    <h4>{{ project.nom }}</h4>
                                    <p class="competenceTitre">{{ project.titre }}</p>
                                    <p class="competenceListe">
                                        ({{ project.competences[skill.skillCategory].join(', ') }})
                                    </p>
                                    </span>
                                </div>
                                </div>
                            </div>

                            <div v-for="(experience, projIndex) in data.experiences" :key="projIndex" class="listeExperiences projectCard">
                            <!-- Check if the project's competences include the category -->
                                <div v-if="Object.keys(experience.competences).includes(Object.keys(skill.skillCategory)[0])" class="affichageExperience">
                                    <img v-if="experience.image" :src="experience.image" alt="experience" width="100"  height="100"/>
                                    <span @click="router.push('/formations')" class="projectCard">
                                        <h4>{{ experience.contrat }} {{ experience.poste }}</h4>
                                        <p>{{ experience.entreprise }} - {{ experience.localisation }}</p>
                                        <p class="competenceListe">
                                            ({{ experience.competences[Object.keys(skill.skillCategory)[0]].join(', ') }})
                                        </p>
                                    </span>
                                </div>
                            </div>
                            </div>
                        </div>
                    </details>
                </div>
            </div>                
        </div>
    </div>
</template>

<style scoped>
.uetitle{
    display:flex;
    flex-direction: row;
    gap:10px;
}
    .pi-info-circle:hover{
        cursor:pointer;
    }

    @media screen and (max-width: 860px){
        .listeExperiences div, .listeProjets div {
            width: 100vw !important;
        }
    }

    div#experiencesContainer{
        display:flex;
        flex-flow:row wrap;
        justify-content:flex-start;
    
        gap:5%;
    }

    p.competenceTitre{
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp:2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow:ellipsis;
    }

    div#experiencesContainer:first-child:not(:empty){
        margin-left: 0;
        align-self: left; /* Remplace "left" par "flex-start" */
    }


    div#experiencesContainer:nth-child(3n+4){
        margin-left:0;
        align-self:left;
    }

    p.competenceListe{
        font-size:0.8em !important;
        font-style: italic;
    }

    h1{
        position:relative;
        z-index:90;
        text-align:center;
        margin-top:2vh;
        font-size:3em;
    }



    span#searchBarContainer{
        z-index: 1; /* Positioned above the wrapper */
        position: relative; /* Ensure stacking context is respected */
        p{
            margin-right: 1vw;
        }

        input{
            line-height: 2em;
            width: 20vw;
        }

        display:flex;
        flex-direction:row;
        align-items:center;
        margin:5vh 0 0 3vw;
    }

    #skillsPage:not(.wrapper){
        z-index: 2; /* Ensure it's above the wrapper */
        position: relative; /* Respect stacking context */
        display:flex;
        flex-direction: column;
        justify-content: space-around;
        margin-top: 5vh;
    }

    summary{
        display:flex;
        flex-direction: row;
        cursor:pointer;
    }

    .affichageExperience, .affichageProjet{
        display:flex;
        flex-direction: row;

        img{
            margin-right:1vw;
        }
    }



    .listeProjets{
        color:lightblue;

        
    }


    .listeExperiences{
        color:lightcyan;
    }

    .projectCard{
        cursor: pointer;
    }

    .listeExperiences div, .listeProjets div{
        margin-bottom:2vh;

        width:25vw;
    }

    h1{
        text-align:center;
    }

    .skills-list {
        display: flex;
        flex-wrap:wrap;
    }

    details{
        border:1px solid black;
        background-color: rgb(21, 21, 21);
        padding:1%;
        margin:1%;
        border-radius:2%;
    }

    summary{
        margin-bottom:25px;
        display:flex;
        align-items: center;
        justify-content: center;
    }
</style>