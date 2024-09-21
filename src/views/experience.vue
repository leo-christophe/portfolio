<script setup>
    import { ref } from 'vue';
    import experiences from '../data/data.json';

    const experiencesData = ref(experiences.experiences);
    const show = ref(false);
</script>

<template>
    <h1 id="titreExperience">Expériences</h1>
    <div id="experiences">
        
        <div v-for="experience in experiencesData" :key="experience.id" :id="experience.id" class="experience">
            <div class="experience">
                                
                <div class="mainInformations">

                    <span id="mainPresentationImage">
                        <div v-if="experience.image" class="imgExperienceContainer">
                            <img :src="experience.image" :id="experience.id+'_img'" class="imgExperience">
                        </div>

                        <div class="texteFormation">
                            <h3>{{ experience.contrat + " " + experience.poste }}</h3>
                            <p>{{ experience.entreprise }}</p>

                            <p v-if="new Date(experience.dates[1]) <= new Date()">{{ experience.dates.join(" - ") }}</p>
                            <p v-else="new Date(experience.dates[1]) > new Date()">{{ experience.dates[0] + " - " + "En cours" }}</p>

                            <p class="expDesc">{{ experience.description }}</p>
                        </div>
                    </span>

                    <i v-if="show" class="pi pi-chevron-down" @click="show = !show"></i>
                    <i v-else  class="pi pi-chevron-up" @click="show = !show"></i>

                    <div v-if="show" class="competencesAndMissions">
                        <span id="competenceContainer">
                            <h4>Compétences</h4>
                            <div class="competencesListe">
                                <span v-for="competence in experience.competences" :key="competence" class="competence">
                                    <div class="competence" v-for="competenceUnique in competence">
                                        {{ competenceUnique }}
                                    </div>
                                    
                                </span>
                            </div>
                        </span>
                        <span id="missionsContainer">
                            <h4>Missions</h4>
                            <ul class="missions">
                                <li v-for="mission in experience.missions" :key="mission">{{ mission }}</li>
                            </ul>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </template>
  
  
<style scoped>
    .imgExperienceContainer {
        background-color: var(--cyan-50);
        border: 1px solid gray;
        border-radius: 10px;
        margin-left: 50px;
        width: 300px;
        height: 150px;
        display: flex; /* Ensures flexbox is used for centering */
        justify-content: center; /* Horizontally center image */
        align-items: center; /* Vertically center image */
        padding: 10px;
        box-shadow: 2px 2px 2px 1px rgb(52, 52, 52);
    }

    .imgExperienceContainer img {
        max-width: 100%; /* Make sure image scales within container */
        max-height: 100%; /* Ensure image doesn't overflow vertically */
        border-radius: 10px;
    }


    h1#titreExperience{
        text-align:center;
        position: relative;
    }

    #experiences{
        flex-wrap:wrap;
        display:flex;
        justify-content:space-around;
        margin-top:20px;
        margin-left:20px;
        margin-right:20px;
    }
    
    .missions{
        float:left;
        list-style:circle;
        justify-content:space-around;
        margin-left:20px;
    }

    .competencesListe{
        display:flex;
        flex-wrap:wrap;
        justify-content:space-around;
    }

    .competencesAndMissions{
        margin:5vh 0px 1vh 0px;
        display:flex;
        flex-direction:row;
        justify-content:space-around;
        transition:0.5s ease all;
    }

    .expDesc{
        border-top:1px solid white;
    }

    ul{
        list-style: none;
        text-align:left;
        background-color:black;
        float:right;
        padding:10px;
        border-radius:10px;
    }

    .experience{
        align-items:center;
        width:70vw;
        background-color:black;
        display:flex;
        border-radius: 20px;
    }

    span#missionsContainer{
        width:50%;
        padding:10px;
    }

    .missions {
        display: flex;
        flex-wrap: wrap; /* Allows the list items to wrap into multiple lines */
        justify-content: space-between; /* Distribute the space between items */
        gap: 10px; /* Space between list items */
        width: 100%; /* Full width */
        list-style-type:decimal; /* Keep bullet points */
        padding: 10px; /* Padding for the mission list */
        background-color: var(--experience_mission_background);
        border-radius: 10px;
    }

    .missions li {
        flex: 1 1 25%; /* Each item takes up about 45% of the width */
        min-width: 110px; /* Minimum width for each list item */
    }



    span#mainPresentationImage{
        display:flex;
        flex-direction:row;
        justify-content:space-around;
    }

    .mainInformations{
        text-align:left;
        
        width:100%;
        height:fit-content;
        padding:20px 20px 0px 20px;
        border-radius:10px;
    }

    .competence{
        font-size:13px;
        background-color:white;
        border:1px solid gray;
        color:black;
        padding:5px;
        margin:2px;
        border-radius:10px;
    }

    .experience {
        margin-bottom: 20px;
    }

    .imgExperience {
        height: 100px;
    }
</style>