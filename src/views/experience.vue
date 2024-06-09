<script setup>
    import { onMounted, onUnmounted, ref } from 'vue';
    import experiences from '../data/data.json';
    import Chip from 'primevue/chip';
    import Tag from 'primevue/tag';

    import {COULEUR_MENU_SELECTIONNE, COULEUR_MENU_BASIC} from '../data/const'

    onMounted(() => {
        $('nav ul li:nth-child(3)').css('border-bottom', '2px solid '+COULEUR_MENU_SELECTIONNE);
        $('nav ul li:nth-child(3) span').css('color', COULEUR_MENU_SELECTIONNE);
    })

    onUnmounted(() => {
        $('nav ul li:nth-child(3)').css('border-bottom', '0px');
        $('nav ul li:nth-child(3) span').css('color', COULEUR_MENU_BASIC);
    })

    const experiencesData = ref(experiences.experiences);
</script>

<template>
    
    <div id="experiences">
        <div v-for="experience in experiencesData" :key="experience.id" :id="experience.id" class="experience">
            <div class="experience">
                                
                <div class="mainInformations">
                    <div class="texteFormation">
                        <h3>{{ experience.contrat + " " + experience.poste }}</h3>
                        <p>{{ experience.entreprise }}</p>

                        <p v-if="new Date(experience.dates[1]) <= new Date()">{{ experience.dates.join(" - ") }}</p>
                        <p v-else="new Date(experience.dates[1]) > new Date()">{{ experience.dates[0] + " - " + "En cours" }}</p>

                        <p class="expDesc">{{ experience.description }}</p>
                    </div>
                    <div v-if="experience.image" class="imgExperience">
                        <img :src="experience.image" :id="experience.id+'_img'" class="imgExperience">
                    </div>

                    <div class="competencesAndMissions">
                        <h4>Compétences</h4>
                        <div class="competencesListe">
                            <span v-for="competence in experience.competences" :key="competence" class="competence">
                                {{ competence }}
                            </span>
                        </div>
                        <h4>Missions</h4>
                        <ul class="missions">
                            <li v-for="mission in experience.missions" :key="mission">{{ mission }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </template>
  
  
<style scoped>
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
        margin-bottom:10px;
        margin-left:20px;
    }

    .competencesListe{
        display:flex;
        flex-wrap:wrap;
        justify-content:space-around;
        margin-bottom:10px;
    }

    .competencesAndMissions{
        margin-top:30px;
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
        align-items:center
    }

    .mainInformations{
        text-align:left;
        margin-bottom: 20px;
        background-color:black;
        width:500px;
        height:fit-content;
        padding:20px;
        border-radius:10px;
        float:left;
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