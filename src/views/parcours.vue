<script setup>
    import Formations from '../components/Formations.vue';
    import Experiences from '../components/Experiences.vue';
</script>

<template>
    <div id="formationExperienceContainer">
        <!-- Section Formations -->
            <Formations class="column"></Formations>
        <!-- Section Expériences -->
            <Experiences class="column"></Experiences>
    </div>
</template>


<style scoped>
#formationExperienceContainer{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 0 0;
    gap:10%;
    width:100%;
}

.column{
    display:flex;
    flex-direction: column;
}

/* Media query for mobile devices */
@media (max-width: 860px) {
    .column {
        width: 100vw !important;
    }

    #formationExperienceContainer {
        flex-direction: column; /* Stack sections vertically */
    }

    h1.formationTitres, h4.formationTitres {
        text-align: left;
        margin-left: 5vw;
        width: 80vw !important;
    }

    div div.conteneurBox {
        width: 80vw; /* Adjust the box width to fit the screen */
        max-width: 80vw !important;
        min-height: fit-content !important;
    }

    .information {
        max-width: 100%; /* Ensure content fits on smaller screens */
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

    div#formationExperienceContainer {
        display: flex;
        flex-direction: column;
    }

    .conteneurBox.experienceBox {
        width: 100%;
    }

    div.conteneurBox.experienceBox, div.partieCachee.conteneurBox.experienceBox, div.conteneurBox {
        width: 100vw;
    }

    div.conteneurBox.experienceBox img {
        height: auto;
    }

    div.information.experienceInf {
        max-width: 80%;
    }

    h4.titreExperience, h4.titreFormation {
        font-size: 1.6em !important;
    }

    h5.obtention {
        font-size: 1.3em !important;
    }
}

/* Styles spécifiques pour les tablettes */
@media (max-width: 1300px) and (min-width: 860px) {
    #formationExperienceContainer {
        flex-direction: column !important;
    }

    h1.formationTitres, h4.formationTitres {
        width: 100%;
        text-align: center;
        position: relative;
    }

    .column {
        width: 95vw !important;
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    span#conteneurTimelineFormations {
        width: 100vw;
    }

    .conteneurBox {
        min-width: min-content !important;
        width: 70vw !important;
    }
}

</style>
