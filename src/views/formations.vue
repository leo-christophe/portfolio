<script setup>
    import { getCurrentInstance } from 'vue';
    import DateUtils from '../utils/date_utils.js';
    const instance = getCurrentInstance();
    const { formations } = instance.appContext.config.globalProperties.$JSONData;
    const experiences = instance.appContext.config.globalProperties.$JSONData
</script>

<template>
    <div id="formationExperienceContainer">
        <!-- Section Formations -->
        <span class="column education">
            <h1 id="titreFormations" class="formationTitres">{{ $t('message.educationTitle') }}</h1>
            <h4 id="sousTitreFormations" class="formationTitres">{{ $t('message.educationSubtitle') }}</h4>

            <div id="conteneurFormations">
                <div v-for="formation in formations" :key="formation.titre" class="formation">
                    <div class="timeline-dot"></div> <!-- Point de la timeline -->
                    <div class="information">
                        <h5 class="annees">{{ formation.annees }}</h5>
                        <h4 class="titreFormation">{{ formation.titre }} au <strong>{{ formation.lieu }}</strong>, {{ formation.ville }} ({{ formation.departement }})</h4>
                        <h5 class="obtention">{{ formation.obtention }}</h5>
                    </div>
                </div>
            </div>
        </span>

        <!-- Section Expériences -->
        <span class="column experience">
        <h1 id="titreExperience" class="formationTitres">{{ $t('message.experienceTitle') }}</h1>

        <span >
            
                <div id="conteneurExperiences">
                    <div v-for="experience in experiences.experiences" :key="experience.id" class="experience">
                        <div class="timeline-dot"></div> <!-- Point de la timeline -->
                        <div class="information">
                            <h5 class="annees">
                                <span v-if="DateUtils.isPastDate(experience.dates[1])">
                                    {{ DateUtils.formatDateRange(experience.dates[0], experience.dates[1], $i18n.locale) }}
                                </span>
                                <span v-else>
                                    {{ DateUtils.formatDate(experience.dates[0]) + " - " + $t('message.experienceOngoing') }}
                                </span>
                            </h5>
                            <h4 class="titreExperience">{{ experience.contrat + " " + experience.poste }} chez {{ experience.entreprise }}</h4>
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

    #sousTitreFormations {
        font-size: 1em;
    }

    /* Conteneurs */
    #conteneurFormations, #conteneurExperiences {
        padding: 10px;
        position: relative;
    }

    /* Formation */
    .formation, .experience {
        display: flex;
        align-items: center;
        margin: 20px 0;
        padding: 20px 0;
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
    .imgFormationContainer, .imgExperienceContainer {
        width: 150px;
        height: auto;
        margin-left: 10px;
    }

    .imgFormation, .imgExperience {
        width: 100%;
        height: auto;
        border-radius: 5px;
        transition: transform 0.5s;
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
</style>
