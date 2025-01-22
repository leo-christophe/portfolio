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
                                    <div class="experienceLearnMore">
                                        <span class="text-image-exp">
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
                                                <img :src="experienceTimeline.item.image" 
                                                    :alt="experienceTimeline.item.poste"
                                                    :title="experienceTimeline.item.entreprise" 
                                                    class="imgExperience" />
                                            </div>
            
                                        </span>
                                    </div>
                                    <!-- Dialog spécifique à cet index -->
                                    <Dialog 
                                        v-if="experienceTimeline.item"
                                        v-model:visible="visibleDialogs[experienceTimeline.index]" 
                                        :modal="true" 
                                        :header="$t('experiences.experienceModalTitle')+ ' ' + experienceTimeline.item.poste + ' (' + experienceTimeline.item.entreprise + ') '"  
                                        class="custom-dialog"
                                        :breakpoints="{ '1300px': '75vw', '800px': '80vw' }" >
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
    /*
    * //////////////
    * STYLE MOBILE
    * //////////////
    */
    @media (max-width: 860px) {
        .column{
            width:100vw !important;
        }

        ul.skillsListExp, ul.missionsListExp{
            font-size: 1.3em;
        }

        .expDesc{
            max-width: none !important;
            font-size: 1.3em !important;
        }

        span#conteneurTimelineFormations{
            div.card.flex.flex-wrap.gap-12{
                left:0 !important;
            }
        }

        h1.formationTitres, h4.formationTitres{
            text-align: left;
            margin-left:5vw;
            width:100vw !important;
        }

        #formationExperienceContainer {
            flex-direction: column;
        }

        #conteneurTimelineFormations > div > div > div > div.p-timeline-event-content > div:nth-child(1) > div.imgExperienceContainer{
            display:none;
        }

        .column {
            width: 100%;
        }

        .experience{
            margin-bottom: 20px;
        }

        .conteneurBox {
            width: 100vw;
            max-width: 80vw  !important;
        }

        .information {
            max-width: 100%;
        }

        div.information.experienceInf {
            max-width: 100%;
        }

        .imgExperienceContainer {
            width: auto;
            margin: 0 auto;
            display:flex;
            justify-content:center;
        }

        .imgExperience {
            width: 100%;
            
        }

        .expDesc {
            max-width: 100%;
        }

        .downArrowExperienceContainer {
            padding-left: 0;
        }

        div#formationExperienceContainer{
            display:flex;
            flex-direction:column;
        }

        .conteneurBox.experienceBox{
            width:100%;
        }

        div.conteneurBox.experienceBox, div.partieCachee.conteneurBox.experienceBox, div.conteneurBox{
            width:100vw;
        }

        div.conteneurBox.experienceBox img{
            height:auto;
        }

        #conteneurTimelineFormations > div > div > div:nth-child(1) > div.p-timeline-event-content > div:nth-child(1) > div.downArrowExperienceContainer > i{
            transform:scale(2);
            margin-right:50px;
            margin-bottom:50px;
        }

        div.information.experienceInf{
            max-width:80%;
        }

        h4.titreExperience, h4.titreFormation{
            font-size: 1.6em !important;
        }
    }

    @media (max-width:1567px){
        small#avenir{
            display:none;
        }
    }

    /*
    * //////////////
    * STYLE TABLETTE
    * //////////////
    */
    @media (max-width:1300px) and (min-width:860px){
        #formationExperienceContainer{
            flex-direction:column !important;
        }

        h1.formationTitres, h4.formationTitres{
            width:100%;
            margin-right:20%;
            text-align: center;
            position: relative;
        }

        .column{
            width:100vw !important;
        }

        span#conteneurTimelineFormations{
            width:100vw;

            div.card.flex.flex-wrap.gap-12{
                width:100%;
                margin-right:20%;
                position: relative;
            }
        }

        .conteneurBox{
            min-width: min-content !important;
            width:70vw !important;
        }
    }

    /*
    * //////////////
    * STYLE GLOBALE
    * //////////////
    */
    .text-image-exp{
        display:flex;
    }

    .learnMore{
        display:flex;
        flex-direction: row;
        margin-top:20px;
        cursor:pointer;
        color:var(--secondColor);
    }

    .learnMore i{
        font-size:1.5em;
        margin-right:10px;
    }

    .learnMore .learnMoreText{
        font-size:1.5em;
    }


    .custom-dialog {
        max-height: 80vh;
        min-width:80vw;
        overflow: auto;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    }

    #text-ensavoirplus{
        display:flex !important;
        flex-direction: row !important;
        justify-content: left;
        min-width:min-content;
        cursor:pointer;
        text-decoration: underline;
    }

    #text-ensavoirplus i{
        font-size:var(--fontSize);  
        padding:5px;
        border-radius:50%;
        border:1px solid var(--secondColor);
        background-color:black;
    }

    .partieCachee.conteneurBox.experienceBox{
        height:fit-content;
        align-items: start;
    }

    #conteneurTimelineFormations > div > div > div > div.p-timeline-event-content > div.partieCachee.conteneurBox.experienceBox > span.expCacheContainerMissions{
        height:min-content;
        top:0px;
    }

    ul.missionsListExp li{
        margin:0rem 0 1rem 0;
    }

    .missionsListExp{
        list-style-type:  decimal;
        margin-left:10px;
    }

    .customized-timeline i.pi-circle-fill{
        padding:10px;
        margin:5px 5px 5px 5px;
        background-color: white;
        font-size: 0.5rem;
        border-radius: 100%;
        border:2px solid black;
        color:var(--secondColor);
    }

    #conteneurColonneExperience{
        margin-right:5vw;
    }

    h5.annees{
        margin-top:1rem;
        font-size: 1.8em !important;
        

        font-weight:500;
        color: var(--secondColor);
    }

    span#conteneurTimelineFormations{
        display:flex;
        flex-direction: row;
        justify-content: left;
    }

    .conteneurBox{
        background-color:rgb(36, 36, 36);
        color: white;
        width:35vw;
        min-width: min-content;
        max-width: 60vw;
        min-height:fit-content;
        justify-content: left;
        position: relative;
        margin: 5px;
        box-shadow: 5px 5px 5px 5px black;
        border:1px solid black;
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
    }

    .conteneurBox img{
        width:200px;
        height:200px;
        object-fit: cover;
        border-radius:8px;
    }

    #formationExperienceContainer > span.column.experience{
        flex-direction:column;
    }

    #formationExperienceContainer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: auto;
        align-items: flex-start;
    }

    .column {
        width: 45%;
        position: relative;
    }

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

    #conteneurFormations, #conteneurExperiences {
        position: relative;
    }

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

    div#conteneurExperiences{
        display: flex;
        align-items: center;
        margin: 0px 10px 0px 0px;
        padding: 0 0 10px 0;
        position: relative;
        box-shadow: 2px 2px 5px black;
    }

    .information {
        padding-left: 20px;
    }

    .timeline-dot {
        width: 10px;
        height: 10px;
        background-color: black;
        border-radius: 50%;
        margin-right: 20px;
    }

    .imgFormationContainer{
        width: 150px;
        height: auto;
        margin-left: 10px;
        align-items:center;
        justify-content: center;
    }

    .imgExperienceContainer {
        width: auto;
        height: auto;
        margin-left: 10px;
        align-items: center;
        justify-content: right;
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
        transform: scale(1.01);
    }

    small#avenir{
        font-size: 0.8em;
        line-height: 0.8;
    }

    .expDesc {
        max-width: 400px;
        margin-top:10px;
    }

    .experience .information, .formation .information {
        padding-left: 20px;
    }

    .experience{
        display:flex;
        flex-direction:row;
    }
</style>