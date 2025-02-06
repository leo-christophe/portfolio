<script setup>
    import { getCurrentInstance, ref } from 'vue';

    import Dialog from 'primevue/dialog';
    import Timeline from 'primevue/timeline';

    import DateUtils from '../utils/date_utils.js';
    import { TIMELINE_STYLE } from '../data/const.js'

    import ExperienceDialog from './ExperienceDialog.vue';

    const instance = getCurrentInstance();

    const  experiences = instance.appContext.config.globalProperties.$JSONData.experiences;
    const experienceTimeline = ref([...experiences.slice(0, experiences.length), ""]);
    const visibleDialogs = ref({});

    /**
     * @function toggleDialog
     * @description Affiche ou cache le dialog de l'expérience
     * @param index ID de l'expérience
     */
    function toggleDialog(index) {
        visibleDialogs.value[index] = !visibleDialogs.value[index];
    }
</script>

<template>
    <!-- Section Expériences -->
    <span class="column experience">
            <h1 id="titreExperience" class="formationTitres">{{ $t('experiences.experienceTitle') }}</h1>
            <h4 class="sousTitreFormations formationTitres">{{ $t('experiences.experienceSubtitle') }}</h4>
            <span id="conteneurColonneExperiences">

                    <span id="conteneurTimelineFormations">
                    <div class="card flex flex-wrap gap-12">
                        <Timeline 
                                :value="experienceTimeline" 
                                class="customized-timeline"
                                :style="TIMELINE_STYLE"
                            >
                            <template #marker="experienceTimeline">
                                <div class="anneeCercle">
                                    <span class="flex w-8 h-8 items-center justify-center text-white rounded-full z-10 shadow-sm">
                                        <i class="pi pi-circle-fill" v-if="experienceTimeline.item"></i>
                                    </span>
                                </div>
                            </template>
                            <template #content="experienceTimeline">
                                <div class="conteneurBox experienceBox" v-if="experienceTimeline.item" @click="toggleDialog(experienceTimeline.index)">
                                    <div class="information experienceInf">
                                        <h5 class="annees">
                                            <span v-if="DateUtils.isPastDate(experienceTimeline.item.dates[1])">
                                                {{ DateUtils.formatDateRange(experienceTimeline.item.dates[0], experienceTimeline.item.dates[1], $i18n.locale) }}
                                            </span>
                                            <span v-else-if="DateUtils.isFutureDate(experienceTimeline.item.dates[0])">
                                                {{ DateUtils.formatDateRange(experienceTimeline.item.dates[0], experienceTimeline.item.dates[1], $i18n.locale) }}  <small id="avenir">({{$t("experiences.experienceComing")}})</small>
                                            </span>
                                            <span v-else>
                                                {{ DateUtils.formatDate(experienceTimeline.item.dates[0], $i18n.locale) + " - " + $t('experiences.experienceOngoing') }}
                                            </span>
                                        </h5>
                                        <h4 class="titreExperience">{{ experienceTimeline.item.contrat + " " + experienceTimeline.item.poste }}</h4>
                                        <p class="expDesc">{{ experienceTimeline.item.description }}</p>
                                        <span class="learnMore">
                                            
                                            <i class="pi pi-info-circle"></i><a><p class="learnMoreText">{{ $t('words.learnmore') }}</p>
                                        </a>
                                        </span>
                                    </div>

                                    <div class="imgExperienceContainer">
                                        <a>
                                        <img :src="experienceTimeline.item.image" 
                                            :alt="experienceTimeline.item.poste"
                                            :title="experienceTimeline.item.entreprise" 
                                            class="imgExperience" />
                                        </a>
                                    </div>
    
 
                                   
                                    <!-- Dialog spécifique à cet index -->
                                    <Dialog 
                                        v-if="experienceTimeline.item"
                                        v-model:visible="visibleDialogs[experienceTimeline.index]" 
                                        :modal="true" 
                                        :header="$t('experiences.experienceModalTitle')+ ' ' + experienceTimeline.item.poste + ' (' + experienceTimeline.item.entreprise + ') '"  
                                        class="custom-dialog"
                                        :breakpoints="{ '1300px': '75vw', '800px': '100vw' }" >
                                        <ExperienceDialog :experienceProp="experienceTimeline.item" />
                                    </Dialog>
                                </div>
                            </template>
                        </Timeline>
                    </div>
                </span>
            </span>
        </span>
</template>

<style scoped>
@import url("../assets/style/ParcoursStyle.css");

/* Styles spécifiques au composant Experiences */


span#conteneurColonneExperiences{
    max-width:90vw;
}




.learnMore {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
    cursor: pointer;
    color: var(--secondColor);
}

.learnMore i {
    font-size: 1.5em;
    margin-right: 10px;
}

.learnMore .learnMoreText {
    font-size: 1.2em;
}

.custom-dialog {
    max-height: 80vh;
    overflow: auto;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

#text-ensavoirplus {
    display: flex !important;
    flex-direction: row !important;
    justify-content: left;
    min-width: min-content;
    cursor: pointer;
    text-decoration: underline;
}

#text-ensavoirplus i {
    font-size: var(--fontSize);
    padding: 5px;
    border-radius: 50%;
    border: 1px solid var(--secondColor);
    background-color: black;
}



#conteneurTimelineFormations > div > div > div > div.p-timeline-event-content > div.partieCachee.conteneurBox.experienceBox > span.expCacheContainerMissions {
    height: min-content;
    top: 0px;
}

ul.missionsListExp li {
    margin: 0rem 0 1rem 0;
}

.missionsListExp {
    list-style-type: decimal;
    margin-left: 10px;
}

small#avenir {
    font-size: 0.8em;
    line-height: 0.8;
}

@media screen and (min-width:861px) and (max-width: 1024px){
.experienceInf{
    min-width:50% !important;
    max-width:75%;
}

p.expDesc{
    font-size: 1.3em;
}

div.information{
    width:80% !important;
}
}
</style>