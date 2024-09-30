<script setup>
    import { getCurrentInstance } from 'vue';
    import DateUtils from '../utils/date_utils.js';
    import { COULEUR_MENU_SELECTIONNE } from '../data/const.js'
    import Timeline from 'primevue/timeline';
    import Button from 'primevue/button';
    import Card from 'primevue/card';
    import { ref } from "vue";

    const instance = getCurrentInstance();
    const { formations } = instance.appContext.config.globalProperties.$JSONData;
    const experiences = instance.appContext.config.globalProperties.$JSONData

    const events = ref([
        formations[0],
        formations[1],
        formations[2]
    ]);
</script>

<template>
    <div id="formationExperienceContainer">
        <!-- Section Formations -->
        <span class="column education">

            <h1 id="titreFormations" class="formationTitres">{{ $t('message.educationTitle') }}</h1>
            <h4 class="sousTitreFormations formationTitres">{{ $t('message.educationSubtitle') }}</h4>

            <span id="conteneurTimelineFormations">
                <div class="card flex flex-wrap gap-12">
                    <Timeline :value="events" align="right" class="customized-timeline">
                        <template #marker="slotProps">
                            <span class="flex w-8 h-8 items-center justify-center text-white rounded-full z-10 shadow-sm">
                                <i class="pi pi-circle"></i>
                            </span>
                        </template>
                    </Timeline>
                </div>

                <div id="conteneurFormations">
                    <div v-for="formation in formations" :key="formation.titre" class="conteneurBox">
                        <div class="information">
                            <h5 class="annees">{{ formation.annees }}</h5>
                            <br>
                            <h4 class="titreFormation">{{ formation.titre }} <br> <strong>{{ formation.lieu }}</strong>, {{ formation.ville }} ({{ formation.departement }})</h4>
                            <h5 class="obtention">{{ formation.obtention }}</h5>
                        </div>
                    </div>
                    <br>
                </div>
            </span>
        </span>

        <!-- Section Expériences -->
        <span class="column experience">
        <h1 id="titreExperience" class="formationTitres">{{ $t('message.experienceTitle') }}</h1>
        <h4 class="sousTitreFormations formationTitres">{{ $t('message.experienceSubtitle') }}</h4>
        <span id="conteneurColonneExperiences">
                <div id="conteneurExperiences">
                    <div v-for="experience in experiences.experiences" :key="experience.id" class="conteneurBox">
                        <div class="information">
                            <h5 class="annees">
                                <span v-if="DateUtils.isPastDate(experience.dates[1])">
                                    {{ DateUtils.formatDateRange(experience.dates[0], experience.dates[1], $i18n.locale) }}
                                </span>
                                <span v-else>
                                    {{ DateUtils.formatDate(experience.dates[0]) + " - " + $t('message.experienceOngoing') }}
                                </span>
                            </h5>
                            <br>
                            <h4 class="titreExperience">{{ experience.contrat + " " + experience.poste }} {{$t('message.at_au')}} {{ experience.entreprise }}</h4>
                            <p class="expDesc">{{ experience.description }}</p>
                        </div>
                        <div v-if="experience.image" class="imgExperienceContainer">
                            <img :src="experience.image" class="imgExperience" @click="window.open(experience.website, '_blank');">
                        </div>
                    </div>
                </div>
            </span>
        </span>
    </div>
</template>


<style scoped>

    div.p-timeline-event-separator{
        min-height: 20vh;
    }

    span#conteneurTimelineFormations{
        display:flex;
        flex-direction: row;
        align-items: center;
    }

    div.conteneurBox{
        margin:5rem 3rem 5rem 7rem;
        padding:10px 5px 10px 5px;
        background-color:rgb(36, 36, 36);
        color: white;
        max-width:45rem;
        box-shadow: 5px 5px 5px 5px black;
        border:1px solid black;
    }

    #conteneurColonneExperiences{
        padding:10px;
    }

    #formationExperienceContainer > span.column.experience{
        flex-direction:column;
    }

    /* Conteneur principal pour aligner les colonnes */
    #formationExperienceContainer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: auto;
        align-items: flex-start;
    }

    /* Colonnes */
    .column {
        width: 45%;
        position: relative;
    }

    /* Titres */
    .formationTitres {
        text-align: center;
        color: white;
        padding: 10px 0;
    }

    #titreFormations, #titreExperience {
        font-size: 2.5em;
    }

    .sousTitreFormations {
        font-size: 1em;
    }

    /* Conteneurs */
    #conteneurFormations, #conteneurExperiences {

        position: relative;
    }

    /* Formation */
    div#conteneurExperiences{
        display: flex;
        align-items: center;
        margin: 20px 10px 10px 0px;
        padding: 20px 0;
        position: relative;
        box-shadow: 2px 2px 5px black;
    }

    .conteneurFormations{
        display: flex;
        align-items: center;
        margin: 20px 10px 10px 0px;
        padding: 20px 0;
        position: relative;
        box-shadow: 2px 2px 5px black;
    }

    /* Formation */
    div#conteneurExperiences{
        display: flex;
        align-items: center;
        margin: 0px 10px 0px 0px;
        padding: 0 0 10px 0;
        position: relative;
        box-shadow: 2px 2px 5px black;
    }


    /* Alignement des informations */
    .information {
        padding-left: 20px;
    }

    /* Styles des points de timeline */
    .timeline-dot {
        width: 10px;
        height: 10px;
        background-color: black;
        border-radius: 50%;
        margin-right: 20px;
    }

    /* Image Formation */
    .imgFormationContainer{
        width: 150px;
        height: auto;
        margin-left: 10px;
        align-items:center;
        justify-content: center;
    }

        /* Conteneur de l'image d'expérience */
    .imgExperienceContainer {
        width: 150px;
        height: 150px; /* Ajuster la taille comme souhaité */
        margin-left: 10px;
        display: flex;
        align-items: center; /* Centrage vertical */
        justify-content: center; /* Centrage horizontal */
    }

    /* Image de l'expérience */
    .imgExperience {
        max-width: 100%; /* Limiter la taille à la largeur du conteneur */
        max-height: 100%; /* Limiter la hauteur à la hauteur du conteneur */
        border-radius: 5px;
        transition: transform 0.5s;
    }

    .imgFormation, .imgExperience {
        display:grid;
        width: 100%;
        height: auto;
        border-radius: 5px;
        
        align-items:center;

        position:relative;
        transition: transform 0.5s;
    }

    img.imgExperience{
        align-self:center;
        text-align:center;
        justify-content: center;

    }


    .imgFormation:hover, .imgExperience:hover {
        transform: scale(1.1);
    }

    /* Description d'expérience */
    .expDesc {
        max-width: 400px;
    }

    /* Marges similaires */
    .experience .information, .formation .information {
        padding-left: 20px;
    }

    .experience{
        display:flex;
        flex-direction:row;
    }
</style>
