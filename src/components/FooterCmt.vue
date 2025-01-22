<script setup>
    import { ref, onMounted, getCurrentInstance } from 'vue';
    import { RouterLink } from 'vue-router';
    import { CV_NAME_WEB, CV_NAME_WEB_EN, COULEUR_MENU_SELECTIONNE } from '../data/const.js';
    import { changeLang, getLangFromUrl } from '../utils/traduction.js';
    import { useI18n } from 'vue-i18n';  // Importer l'API i18n

    // Accéder à l'instance actuelle
    const instance = getCurrentInstance();
    const data = instance.appContext.config.globalProperties.$JSONData; // Accéder aux données globales

    const CVAdress = ref('/documents/'+CV_NAME_WEB+"#page=1&zoom=70");
    
    if (getLangFromUrl() === 'en') {
        CVAdress.value = '/documents/'+CV_NAME_WEB_EN+"#page=1&zoom=70";
    }
    
    const links = ref(data.links);

    const { locale, t } = useI18n();
    const boolLang = ref(localStorage.getItem('lang')=='en')
    
    const switchLanguage = (lang) => {
        boolLang.value = lang === 'en';  // Set boolLang based on the target language
        locale.value = lang;  // Update the locale in the i18n system
        changeLang(lang);  // Update language in localStorage and URL

        localStorage.setItem('filter_competences', [])
        localStorage.setItem('filter_checkType', [])

        // Update the language of the page
        document.documentElement.lang = lang;


        location.reload();
    };


</script>
<template>
    <footer>
        <ul>
            <li class="footerURLLink">
                <RouterLink class="footerURLLink" :style="{ color: COULEUR_MENU_SELECTIONNE }" to="/mesdonnees">{{ $t('pages.personalData') }}</RouterLink>
            </li>
            <li class="footerURLLink">
                <RouterLink class="footerURLLink" :style="{ color: COULEUR_MENU_SELECTIONNE }" to="/contact">{{ $t('pages.contactInfo') }}</RouterLink>
            </li>
            <li class="footerURLLink">
                <a :href="CVAdress" class="footerURLLink" :style="{ color: COULEUR_MENU_SELECTIONNE }">{{ $t('footer.readCV') }}</a>
            </li>
            <li class="footerURLLink">
                <div>
                    <!-- Language switch button -->
                    <a v-if="boolLang" id="switchLanguageFooter" @click="switchLanguage('fr')" :style="{ color: COULEUR_MENU_SELECTIONNE }"> {{ $t('footer.changeLang') }} </a>
                    <a v-else id="switchLanguageFooter"  @click="switchLanguage('en')" :style="{ color: COULEUR_MENU_SELECTIONNE }"> {{ $t('footer.changeLang') }} </a>
                </div>
            </li>
            <li class="footerURLLink">
                <div>
                    <RouterLink class="footerURLLink" :style="{ color: COULEUR_MENU_SELECTIONNE }" to="/confidentialite">{{ $t('privacy.title') }}</RouterLink>
                </div>
            </li>
        </ul>

        <p id="watermark"><strong>© {{ new Date().getFullYear() }} {{  $t('footer.name')  }}</strong></p>

        <div id="links">
            <div v-for="link in links" :key="link.name" :id="link.name" class="link">
                <a :href="link.url" target="_blank"  v-if="link.url">
                    <i v-if="link.classpi" :class="link.classpi + ' imgLink'" :id="link.name+'_img'"></i>
                    <img 
                        v-else
                        :src="link.image" 
                        :id="link.name+'_img'" 
                        :alt="link.name"
                        :title="link.name"
                        class="imgLink" /> 
                </a>
            </div>
        </div>
    </footer>
</template>


<style scoped>
    /*//////////////////////////////////////
    ///         SMARTPHONE STYLES        ///
    ///        (0px - 860px)             ///
    ///       (Portrait et paysage)      ///
    //////////////////////////////////////*/

    @media screen and (max-width: 860px){

        div#links {
            display: flex;
            flex-direction: column-reverse;
            gap: 25px;
            margin-right:15%;
            top:30%;
            right:0;
            position: absolute;
            transform: scale(1.5);
        }

        ul{
            display:flex;
            flex-direction:column;
            gap:20px;
        }

        li.footerURLLink {
            font-size:1.5em;
        }

        p#watermark strong{
            font-size:1.5em;
        }
        
    }

    /*//////////////////////////////////////
    ///         ORDINATEUR STYLES        ///
    ///        (860px -1920px)           ///
    ///       (Portrait et paysage)      ///
    //////////////////////////////////////*/

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
        gap:30px;
        margin:0 50px 5px 0;
    }

    img.imgLink {
        height: 40px;
        margin: 10px;
    }

    i.imgLink{
        font-size:2.5em;
        color:var(--secondColor);
        transition:0.5s ease;
    }

    i.imgLink:hover{
        transform:scale(1.1);
        filter: drop-shadow(0 0 1rem var(--secondColor));
        transition:0.5s ease;
    }

    footer {
        background-color: rgb(0, 0, 0);
        width: 100%;
        min-width:100vw;
        overflow: hidden;
        color: white;
        text-align: center;
        position: relative;
    }
</style>
