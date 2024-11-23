<script setup>
    import { computed, getCurrentInstance, ref } from 'vue';
    import { useRouter } from 'vue-router';

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
        <h1>Skills and Corresponding Projects/Experiences</h1>
        <input v-model="searchQuery" placeholder="Search for a skill or category..." />
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