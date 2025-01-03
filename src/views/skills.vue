<script setup>
    import InputText from 'primevue/inputtext';
    import { computed, getCurrentInstance, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useI18n } from 'vue-i18n'; 

    const { t } = useI18n(); 
    const router = useRouter();
    const instance = getCurrentInstance();
    const data = instance.appContext.config.globalProperties.$JSONData;

    const details = ref([]);
    // Reactive references for search input and filtered data
    const searchQuery = ref('');
    const filteredSkills = computed(() => {
    if (!searchQuery.value) return data.sorted_valid_skills;
        return data.sorted_valid_skills.filter(category => {
            const categoryName = Object.keys(category)[0].toLowerCase();
            const skills = Object.values(category)[0].map(skill => skill.toLowerCase());
            return categoryName.includes(searchQuery.value.toLowerCase()) || skills.includes(searchQuery.value.toLowerCase());
        });
    });

    /**
     * @description Permet de fermer tous les détails sauf celui passé en paramètre (Indice)
     * @param {int} detail 
     */
    function closeEveryDetails(detail){
        if (detail === undefined || detail < 0 || detail >  details.value.length) throw new Error('Aucun index de détail n\'a été fourni');

        details.value.forEach((d,index) => {
            if (index !== detail) {
                details.value[index].children[0].removeAttribute('open');
            }
        });
    }

</script>

<template>
    <div>

        <h1>{{$t('skillsDetail.skills')}}</h1>
        <span id="searchBarContainer">
            <p>{{$t('skillsDetail.search')}}</p>
            <InputText v-model="searchQuery" :placeholder="$t('skillsDetail.searchPlaceholder')" />
        </span>

        <div id="skillsPage">
            <div ref="details" v-for="(category, catIndex) in filteredSkills" :key="catIndex" class="skill-category">
                <details @click="closeEveryDetails(catIndex)">
                    <summary ><h2>{{ Object.keys(category)[0] }}</h2></summary>
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
                                    v-if="project.images && project.images[0]" 
                                    :src="'/images/projects/' + project.images[0]['link']" 
                                    :alt="'experience' + projIndex" 
                                    width="40" height="40" 
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
                                <img v-if="experience.image" :src="experience.image" alt="experience" style="width: 40px; height: 40px;"/>
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
        </div>

    </div>
</template>

  
  
  

<style scoped>
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

    .skill-category{

        margin: 2vh;
        background-color:rgb(27, 27, 27);
        padding:2vh;
        width:95vw;
        max-width:95vw;
        border:1px solid black;
        border-radius:5px;
        box-shadow: #000000 0px 0px 10px;

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

        width:20vw;
    }

    h1{
        text-align:center;
    }

    .skills-list {
        display: flex;
        flex-wrap:wrap;
    }
</style>