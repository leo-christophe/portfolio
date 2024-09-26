<script setup>
    import { ref, onMounted } from 'vue';
    import data from '../data/data.json';
    import { RouterLink } from 'vue-router';
    import { CV_NAME_WEB, COULEUR_MENU_SELECTIONNE } from '../data/const.js';
    import { changeLang, getLangFromUrl } from '../utils/traduction.js';
    import { useI18n } from 'vue-i18n';  // Importer l'API i18n

    const CVAdress = '/documents/'+CV_NAME_WEB+"#page=1&zoom=70";
    const links = ref(data.links);

    const { locale, t } = useI18n();
    const boolLang = ref(localStorage.getItem('lang')=='en')
    
    const switchLanguage = (lang) => {
    boolLang.value = lang === 'en';  // Set boolLang based on the target language
    locale.value = lang;  // Update the locale in the i18n system
    changeLang(lang);  // Update language in localStorage and URL
    location.reload();
};


</script>
<template>
    <footer>
        <ul>
            <li class="footerURLLink">
                <RouterLink class="footerURLLink" :style="{ color: COULEUR_MENU_SELECTIONNE }" to="/mesdonnees">Données personnelles</RouterLink>
            </li>
            <li>
                <RouterLink class="footerURLLink" :style="{ color: COULEUR_MENU_SELECTIONNE }" to="/contact">Informations de contact</RouterLink>
            </li>
            <li class="footerURLLink">
                <a :href="CVAdress" class="footerURLLink" :style="{ color: COULEUR_MENU_SELECTIONNE }">Consulter mon CV</a>
            </li>
            <li class="footerURLLink">
                <div>
                    <!-- Language switch button -->
                    <a v-if="boolLang" @click="switchLanguage('fr')">Change to french</a>
                    <a v-else @click="switchLanguage('en')">Changer en Anglais</a>
                </div>
            </li>
        </ul>

        <p id="watermark"><strong>© {{ new Date().getFullYear() }} Léo CHRISTOPHE</strong></p>

        <div id="links">
            <div v-for="link in links" :key="link.name" :id="link.name" class="link">
                <a :href="link.url" target="_blank" v-if="link.url">
                    <img :src="link.image" :id="link.name+'_img'" class="imgLink" />
                </a>
            </div>
        </div>
    </footer>
</template>


<style scoped>
    .footerURLLink:hover{
        text-decoration:underline;
    }

    ul {
        margin-top: 10px;
    }

    #watermark {
        float: left;
        position:relative;
        left:20px;
    }

    p {
        align-items: center;
    }

    #links {
        display: inline-flex;
        position:relative;
        float: right;
        margin:0px 20px 20px 0px;
    }

    .imgLink {
        height: 40px;
        margin: 10px;
    }

    footer {
        background-color: rgb(0, 0, 0);
        height: 150px;
        width: 100%;
        min-width:100vw;
        overflow: hidden;
        color: white;
        text-align: center;
        position: relative;
    }
</style>
