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

        <div class="wrapper">
            <div><span class="dot"></span></div>
            <div><span class="dot"></span></div>
            <div><span class="dot"></span></div>
            <div><span class="dot"></span></div>
            <div><span class="dot"></span></div>
            <div><span class="dot"></span></div>
            <div><span class="dot"></span></div>
            <div><span class="dot"></span></div>
            <div><span class="dot"></span></div>
            <div><span class="dot"></span></div>
            <div><span class="dot"></span></div>
            <div><span class="dot"></span></div>
            <div><span class="dot"></span></div>
            <div><span class="dot"></span></div>
            <div><span class="dot"></span></div>
        </div>

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
    h1{
        position:relative;
        z-index:90;
        text-align:center;
        margin-top:2vh;
        font-size:3em;
    }

.wrapper {
    height: 100vh; /* Full height */
    width: 100vw; /* Full width */
    position: fixed; /* Fixed positioning for background effect */
    top: 0; /* Start from top */
    left: 0; /* Start from left */
    z-index: 0; /* Lowest stacking */
    background: linear-gradient(180deg, #04f9fd84, 5%, #119cff9f, 50%, #030423da);
}


    .wrapper div {
    height: 60px;
    width: 60px;
    border: 2px solid rgba(255, 255, 255, 0.7);
    border-radius: 50px;
    position: absolute;
    top: 10%;
    left: 10%;
    animation: 4s linear infinite;
    }
    div .dot {
    height: 10px;
    width: 10px;
    border-radius: 50px;
    background: rgba(255, 255, 255, 0.5);
    position: absolute;
    top: 20%;
    right: 20%;
    }
    .wrapper div:nth-child(1) {
    top: 20%;
    left: 20%;
    animation: animate 8s linear infinite;
    }
    .wrapper div:nth-child(2) {
    top: 60%;
    left: 80%;
    animation: animate 10s linear infinite;
    }
    .wrapper div:nth-child(3) {
    top: 40%;
    left: 40%;
    animation: animate 3s linear infinite;
    }
    .wrapper div:nth-child(4) {
    top: 66%;
    left: 30%;
    animation: animate 7s linear infinite;
    }
    .wrapper div:nth-child(5) {
    top: 90%;
    left: 10%;
    animation: animate 9s linear infinite;
    }
    .wrapper div:nth-child(6) {
    top: 30%;
    left: 60%;
    animation: animate 5s linear infinite;
    }
    .wrapper div:nth-child(7) {
    top: 70%;
    left: 20%;
    animation: animate 8s linear infinite;
    }
    .wrapper div:nth-child(8) {
    top: 75%;
    left: 60%;
    animation: animate 10s linear infinite;
    }
    .wrapper div:nth-child(9) {
    top: 50%;
    left: 50%;
    animation: animate 6s linear infinite;
    }
    .wrapper div:nth-child(10) {
    top: 45%;
    left: 20%;
    animation: animate 10s linear infinite;
    }
    .wrapper div:nth-child(11) {
    top: 10%;
    left: 90%;
    animation: animate 9s linear infinite;
    }
    .wrapper div:nth-child(12) {
    top: 20%;
    left: 70%;
    animation: animate 7s linear infinite;
    }
    .wrapper div:nth-child(13) {
    top: 20%;
    left: 20%;
    animation: animate 8s linear infinite;
    }
    .wrapper div:nth-child(14) {
    top: 60%;
    left: 5%;
    animation: animate 6s linear infinite;
    }
    .wrapper div:nth-child(15) {
    top: 90%;
    left: 80%;
    animation: animate 9s linear infinite;
    }
    @keyframes animate {
    0% {
        transform: scale(0) translateY(0) rotate(70deg);
    }
    100% {
        transform: scale(1.3) translateY(-100px) rotate(360deg);
    }
    }


    span#searchBarContainer{
        z-index: 1; /* Positioned above the wrapper */
        position: relative; /* Ensure stacking context is respected */
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

    #skillsPage:not(.wrapper){
        z-index: 2; /* Ensure it's above the wrapper */
        position: relative; /* Respect stacking context */
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
        border:1px solid black;
        border-radius:5px;
        box-shadow: #000000 0px 0px 10px;

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