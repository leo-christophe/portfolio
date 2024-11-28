<script setup>
    import InputText from 'primevue/inputtext';
    import Checkbox from 'primevue/checkbox';

    import { computed, getCurrentInstance, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useI18n } from 'vue-i18n'; // Notez le "I" majuscule dans `useI18n`.

    const { t } = useI18n(); 
    const router = useRouter();
    const instance = getCurrentInstance();
    const data = instance.appContext.config.globalProperties.$JSONData;

    // Reactive references for search input and filtered data
    const searchQuery = ref('');
    const filteredSkills = computed(() => {
    if (!searchQuery.value) return data.sorted_valid_skills;
        return data.sorted_valid_skills.filter(category => {
            const categoryName = Object.keys(category)[0].toLowerCase();
            const skills = Object.values(category)[0].map(skill => skill.toLowerCase());
            return categoryName.includes(searchQuery.value.toLowerCase()) || skills.includes(searchQuery.value.toLowerCase());
        });
    });
</script>

<template>
    <div>
        <h1>{{$t('message.skills')}}</h1>
        <span id="searchBarContainer">
            <p>{{$t('message.search')}}</p>
            <InputText v-model="searchQuery" :placeholder="$t('message.searchPlaceholder')" />
        </span>
        <!-- <div class="card flex flex-wrap justify-content-center gap-3">
            <div class="flex align-items-center">
                <Checkbox v-model="pizza" inputId="ingredient1" name="devlog" value="Cheese" aria-checked="true"/>
                <label for="ingredient1" class="ml-2"> Developpeur logiciel/c# </label>
            </div>
            <div class="flex align-items-center">
                <Checkbox v-model="pizza" inputId="ingredient2" name="devweb" value="Mushroom" aria-checked="true"/>
                <label for="ingredient2" class="ml-2"> Developpeur web </label>
            </div>
            <div class="flex align-items-center">
                <Checkbox v-model="pizza" inputId="ingredient3" name="gesdata" value="Pepper" aria-checked="true"/>
                <label for="ingredient3" class="ml-2"> Gestion de bases de données </label>
            </div>
            <div class="flex align-items-center">
                <Checkbox v-model="pizza" inputId="ingredient4" name="autre" value="Onion" aria-checked="true"/>
                <label for="ingredient4" class="ml-2"> Autre </label>
            </div>
        </div> -->


        <div id="skillsPage">
            <div v-for="(category, catIndex) in filteredSkills" :key="catIndex" class="skill-category">
            <!-- Extract the category name dynamically -->
            <h2>{{ Object.keys(category)[0] }}</h2>
            <!-- Find and display relevant projects -->
            <div class="projects">
                <h3>Experiences:</h3>
                <div v-for="(project, projIndex) in data.projects" :key="projIndex" class="listeProjets projectCard">
                <!-- Check if the project's competences include the category -->
                <div v-if="Object.keys(project.competences).includes(Object.keys(category)[0])" class="affichageProjet">
                    <img v-if="project.images[0]" :src="'/images/projects/'+project.images[0]['link']" alt="experience" style="width: 40px; height: 40px;"/>
                    <span @click="router.push(project.route)">
                    <h4>{{ project.nom }}</h4>
                    <p>{{ project.titre }}</p>
                    </span>
                </div>
                </div>

                <div v-for="(experience, projIndex) in data.experiences" :key="projIndex" class="listeExperiences projectCard">
                <!-- Check if the project's competences include the category -->
                <div v-if="Object.keys(experience.competences).includes(Object.keys(category)[0])" class="affichageExperience">
                    <img v-if="experience.image" :src="experience.image" alt="experience" style="width: 40px; height: 40px;"/>
                    <span @click="router.push('/formations')" class="projectCard">
                    <h4>{{ experience.contrat }} {{ experience.poste }}</h4>
                    <p>{{ experience.entreprise }} - {{ experience.localisation }}</p>
                    </span>
                </div>
                </div>
            </div>

            <details>
                <summary>Liste des compétences</summary>
                <ul>
                <li v-for="(skill, skillIndex) in Object.values(category)[0]" :key="skillIndex">{{ skill }}</li>
                </ul>
            </details>
            </div>
        </div>
    </div>
</template>

  
  
  

<style scoped>
    span#searchBarContainer{
        p{
            margin-right: 1vw;
        }

        input{
            line-height: 2em;
            width: 20vw;
        }

        display:flex;
        flex-direction:row;
        align-items:center;
        margin:5vh 0 0 3vw;
    }

    #skillsPage{
        display:flex;
        flex-wrap:wrap;
        justify-content: space-around;
        margin-top: 5vh;
    }

    .affichageExperience, .affichageProjet{
        display:flex;
        flex-direction: row;
        align-items: center;

        img{
            margin-right:1vw;
        }
    }

    .skill-category{
        margin: 2vh;
        background-color:rgb(27, 27, 27);
        padding:2vh;
        min-width:fit-content;
        width:25vw;

    }

    .listeProjets{
        color:lightblue;
    }

    .listeExperiences{
        color:lightcyan;
    }

    .projectCard{
        cursor: pointer;
    }

    .listeExperiences div, .listeProjets div{
        margin-bottom:2vh;
        width:25vw;
    }

    h1{
        text-align:center;
    }

    .skills-list {
        display: flex;
        flex-wrap:wrap;
    }
</style>