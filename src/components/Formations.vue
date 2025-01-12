<script setup>
    import { getCurrentInstance, ref } from 'vue';

    import Timeline from 'primevue/timeline';

    import { TIMELINE_STYLE } from '../data/const.js'

    const instance = getCurrentInstance();

    const { formations } = instance.appContext.config.globalProperties.$JSONData;
    const formationTimeline = ref([...formations.slice(0, formations.length), ""]);
</script>

<template>
    <!-- Section Formations -->
    <span class="column education">

        <h1 id="titreFormations" class="formationTitres">{{ $t('message.educationTitle') }}</h1>
        <h4 class="sousTitreFormations formationTitres">{{ $t('message.educationSubtitle') }}</h4>

        <span id="conteneurTimelineFormations">
            <div class="card flex flex-wrap gap-12">
                <Timeline 
                        :value="formationTimeline" 
                        align="left" 
                        class="customized-timeline"
                        :style="TIMELINE_STYLE"
                    >
                    <template #marker="formationTimeline">
                        <div class="anneeCercle">
                            <span class="flex w-8 h-8 items-center justify-center text-white rounded-full z-10 shadow-sm">
                                <i class="pi pi-circle-fill" v-if="formationTimeline.item"></i>
                            </span>
                        </div>
                    </template>
                    <template #content="formationTimeline">
                        <div id="conteneurFormations" v-if="formationTimeline.item">
                            <div class="conteneurBox">
                                <div class="information">
                                    <h5 class="annees">{{ formationTimeline.item.annees }}</h5>
                                    <br>
                                    <h4 class="titreFormation">{{ formationTimeline.item.titre }} <br><p id="departementDetail" title="(Haute-Savoie)"><strong>{{ formationTimeline.item.lieu }}</strong>, {{ formationTimeline.item.ville }} ({{ formationTimeline.item.departement }})</p></h4>
                                    <h5 class="obtention">{{ formationTimeline.item.obtention }}</h5>
                                </div>
                                <div class="imageFormation">
                                    <a :href="formationTimeline.item.siteFormation"  target='_blank'>
                                        <img :src="formationTimeline.item.image" 
                                            class="imgFormation" 
                                            :alt="formationTimeline.item.titre + ' ' + formationTimeline.item.annees + ' ' + formationTimeline.item.lieu"
                                            :title="formationTimeline.item.lieu" >
                                    </a>
                                </div>
                            </div>
                        </div>
                    </template>
                </Timeline>
            </div>

            
        </span>
    </span>
</template>

<style scoped>
/* Media query for mobile devices */
@media (max-width: 860px) {
    .downArrowExperienceContainer{
        
        position:relative !important;
    }

    .downArrowExperienceContainer i{
        margin:0 !important;
        padding:20px;
    }

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
        flex-direction: column; /* Stack sections vertically */
    }

    #conteneurTimelineFormations > div > div > div > div.p-timeline-event-content > div:nth-child(1) > div.imgExperienceContainer{
        display:none;
    }

    .column {
        width: 100%; /* Make the columns take full width on mobile */
    }

    .experience, .education {
        margin-bottom: 20px; /* Add space between sections */
    }

    .conteneurBox {
        width: 100vw; /* Adjust the box width to fit the screen */
        max-width: 80vw  !important;

    }

    .information {
        max-width: 100%; /* Ensure content fits on smaller screens */
    }

    div.information.experienceInf {
        max-width: 100%; /* Same for experience content */
    }

    .imgExperienceContainer {
        width: auto; /* Adjust image container on mobile */
        margin: 0 auto; /* Center images on mobile */
    }

    .imgExperience {
        width: 100%; /* Ensure the images resize correctly */
    }

    .expDesc {
        max-width: 100%; /* Ensure experience description fits screen */
    }

    .downArrowExperienceContainer {
        padding-left: 0; /* Align arrow correctly on mobile */
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

    h5.obtention{
        font-size: 1.3em !important;
    }


}


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

.expSkillsTitle, .expMissionsTitle{
    font-size: 1.2rem;
    font-weight:500;
    color: var(--secondColor);
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

.expCacheContainerSkills, .expCacheContainerMissions{
    position: relative !important;
    height:100%;
    top:0px;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    padding:20px 5px 0px 20px;
    width:40%;
}

.skillsListExp{
    list-style-type: "- ";
    margin-left:10px;
}

.missionsListExp{
    list-style-type:  decimal;
    margin-left:10px;
}
    .customized-timeline{
        i.pi-circle-fill{
            padding:10px;
            margin:5px 5px 5px 5px;
            background-color: white;
            font-size: 0.5rem;
            border-radius: 100%;
            border:2px solid black;
            color:var(--secondColor);
        }

    }


    .pi-arrow-circle-down,.pi-arrow-circle-up, .arrowDownExp{
        font-size: 2rem;
        color: var(--secondColor);
        transition:0.4s ease-out all;
        cursor:pointer;
    }

    .pi-arrow-circle-down:hover,.pi-arrow-circle-up:hover{
        font-size: 2rem;
        color: white;
        transition:0.4s ease-in all;
    }

    .downArrowExperienceContainer{
        display:flex;
        flex-direction: column-reverse;
        
        z-index: 100;
        position: absolute;
        right:0;
        bottom:0;
        background-color: black;
        padding:10px;
        border-radius: 100%;
    }

    /* .information.experienceInf{
        max-width:20vw;
    } */

    #conteneurColonneExperience{
        margin-right:5vw;
    }

    h5.annees{
        margin-top:1rem;
        font-size: 1.8em !important;
    
        font-weight:500;
        color: var(--secondColor);
    }

    h5.obtention{
        font-size: 1.2rem;
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

        img{
            width:200px;
            height:200px;
            object-fit: cover;
            border-radius:8px;
        }
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

    #departementDetail{
        cursor:pointer;
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


        width: auto;
        height: auto; /* Ajuster la taille comme souhaité */
        margin-left: 10px;
        align-items: center; /* Centrage vertical */
        justify-content: center; /* Centrage horizontal */
    }

    /* Image de l'expérience */


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

    /* Description d'expérience */
    .expDesc {
        max-width: 400px;
        margin-top:10px;
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