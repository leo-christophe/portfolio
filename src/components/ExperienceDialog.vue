<script setup>
    const props = defineProps({
        experienceProp: Object
    })

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
</script>

<template>
    <span id="ficheMetierDetaillee">
    <div>
        <div id="missionEtRealisation">
            <span class="expCacheContainerSkills">
                <h4 class="expSkillsTitle">{{ $t('message.experienceCompetenceTitle') }}</h4>
                <ul class="skillsListExp">
                    {{ console.log(experienceProp) }}
                    <li v-for="(competence, key) in experienceProp.competences" :key="key">
                        <span>
                            <p><strong>{{ key }}:</strong></p>
                            <span v-for="(competenceElt, indexY) in competence" :key="indexY">
                                {{ capitalizeFirstLetter(competenceElt) }}
                                <span v-if="indexY < competence.length - 1">, </span>
                            </span>
                            <br> 
                            <br> 
                        </span>
                    </li>
                </ul>
            </span>
            <span class="expCacheContainerMissions">
                <h4 class="expMissionsTitle">{{ $t('message.experienceMissionsTitle') }}</h4>
                <ul class="missionsListExp">
                    <li v-for="(mission, index) in experienceProp.missions" :key="index">
                        {{ mission }}
                    </li>
                </ul>
            </span>
        </div>
    </div>
    </span>
</template>

<style scoped>
    #ficheMetierDetaillee{
        background-color: rgb(36, 36, 36);
    }

    #missionEtRealisation{
        display:flex;
        justify-content:space-around;
        width:100%;
        height:100%;
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

    .expSkillsTitle, .expMissionsTitle{
        font-size: 1.2rem;
        font-weight:500;
        color: var(--secondColor);
    }

    .skillsListExp{
        list-style-type: "- ";
        margin-left:10px;
    }

</style>