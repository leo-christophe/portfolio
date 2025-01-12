<script setup>
    import DateUtils from '../utils/date_utils.js';
    import handleSkillClick from '../utils/skillUtils.js';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const props = defineProps({
        experienceProp: Object
    })

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };




</script>

<template>
    <span id="ficheMetierDetaillee">
        <section class="dialogSection" id="posteDescriptionRapide">
            <div>
                <img :src="experienceProp.image" :alt="experienceProp.entreprise" :title="experienceProp.entreprise" class="imgExpDialog" height="100">
            </div>

            <div id="description">
                <h3>{{ experienceProp.poste }}</h3>
                <p>{{ experienceProp.entreprise }} - {{ experienceProp.localisation }}</p>
                <span v-if="DateUtils.isPastDate(experienceProp.dates[1])">
                    {{ DateUtils.formatDateRange(experienceProp.dates[0], experienceProp.dates[1], $i18n.locale) }}
                </span>
                <span v-else-if="DateUtils.isFutureDate(experienceProp.dates[0])">
                    {{ DateUtils.formatDateRange(experienceProp.dates[0], experienceProp.dates[1], $i18n.locale) + " ("+$t("message.experienceComing")+")"}}
                </span>
                <span v-else>
                    {{ DateUtils.formatDate(experienceProp.dates[0]) + " - " + $t('message.experienceOngoing') }}
                </span>
            </div>
        </section>

        <section class="dialogSection">
            <h4 class="expSkillsTitle">Description:</h4>
            <p>{{ experienceProp.description }}</p>
        </section>

        <section>
            <div id="missionEtRealisation">
                <span class="expCacheContainerSkills">
                    <h4 class="expSkillsTitle">{{ $t('message.experienceCompetenceTitle') }}</h4>
                    <ul class="skillsListExp">
                        <li v-for="(competence, key) in experienceProp.competences" :key="key">
                            <span>
                                <p><strong>{{ key }}:</strong></p>
                                <span v-for="(competenceElt, indexY) in competence" :key="indexY" @click="handleSkillClick(competenceElt, router)" style="cursor:pointer;">
                                    {{ competenceElt.toUpperCase()}}<span v-if="indexY < competence.length - 1">, </span>
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
                        <li v-for="(mission, index) in experienceProp.missions" :key="index" class="">
                            {{ mission }}
                            <br><br>
                        </li>
                    </ul>
                </span>
            </div>
        </section>
    </span>
</template>

<style scoped>
    .imgExpDialog{
        border-radius:5%;
    }

    section.dialogSection{
        margin-bottom:3vh;
    }

    #posteDescriptionRapide{
        display:flex;
        justify-content:left;
        align-items:center;
    }

    #posteDescriptionRapide img{
        margin-right:50px;
    }

    #ficheMetierDetaillee{
        background-color: rgb(36, 36, 36);
    }

    #missionEtRealisation{
        display:flex;
        width:100%;
        min-width:fit-content;
        height:100%;
        justify-content: space-between;
    }

    .expCacheContainerSkills, .expCacheContainerMissions{
        position: relative !important;
        height:100%;
        top:0px;
        display:flex;
        flex-direction:column;
        justify-content:space-between;
        width:45%;
    }

    .expSkillsTitle, .expMissionsTitle{
        font-size: 1.2rem;
        font-weight:500;
        color: var(--secondColor);
    }

    .skillsListExp, .missionsListExp{
        list-style:square;
        margin-left:10px;
    }

</style>