<script setup>
import { CV_NAME_WEB, CV_NAME_WEB_EN } from '../../data/const.js';
import { onMounted, ref } from 'vue';
import { getLangFromUrl } from '../../utils/traduction.js';

const WIDTH = "90%";
const HEIGHT = "900px";
const RACINE = "/documents/";

// Reactive reference for the CV address
const CVAdress = ref(RACINE + CV_NAME_WEB + "#page=1");
const windowWidth = ref(window.innerWidth);
onMounted(() => {
    // Check language and set the appropriate CV address
    if (getLangFromUrl() != 'fr') {
        CVAdress.value = RACINE + CV_NAME_WEB_EN + "#page=1";
    }
});
</script>


<template>
    <div class="CVsection">
        <div id="textCV">
            <div id="mainText">
                <span>
                    <div id="contactgifContainer">
                        <img id="imgContact" src="/images/home/contactGif.gif">
                    </div>
                </span>
                <span>
                    <h2 id="CVTitre">{{ $t('message.homeContactTitle') }}</h2>
                    <div id="SousTitre">{{ $t('message.homeContactDesc') }}</div>

                    <div id="finalText" class="CVsection computer">
                        <h5>{{ $t('message.CTA1') }}<RouterLink to="/contact">{{ $t('message.CTA2') }}</RouterLink>{{ $t('message.CTA3')}}</h5>
                    </div>
                </span>
            </div>



            <span id="buttons">
                <Button id="blackVariant"><i class="pi pi-download"></i>{{ $t("message.btnDownload") }}</Button>
                <Button id="blackVariant"><i class="pi pi-eye"></i>{{ $t("message.btnConsult") }}</Button>
            </span>
        </div>

        <div id="CV">
            <embed :src="CVAdress" type="application/pdf" :width="WIDTH" :height="HEIGHT" />
        </div>
    </div>
</template>

<style scoped>
.CVsection {
    height: auto;
    font-family: inherit;
    display: flex;
    flex-direction: column; /* Empile les éléments verticalement */
    justify-content: space-around;
    align-items: center; /* Centre les éléments horizontalement */
    padding: 20px;
    margin: 0 auto;
    max-width: 80%; /* Utilise toute la largeur disponible */
}

#mainText {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%; /* Assure que le texte occupe toute la largeur */
    margin-bottom: 20px;
}

#buttons {
    display: none;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center; /* Centre les boutons */
    margin: 50px 0;
    gap: 20px;
}

#CV {
    width: 90%; /* Largeur adaptée à toutes les résolutions */
    max-width: 1000px; /* Limite la taille maximale */
    height: 90vh;
    display: flex;
    justify-content: center;
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.8), 0 0 15px rgba(0, 0, 0, 0.4);
    margin-top: 20px;
}

embed {
    width: 100%; /* S'adapte à la taille de son conteneur */
    height: 100%; /* Garde la hauteur */
}

div#contactgifContainer {
    max-width: 10vw !important;
    width: 20vw;
    min-width: 125px;
    height: 200px;
    display: flex !important;
    justify-content: center !important;
    border-radius: 50%;
    /* animation: border 2s infinite; */
    transition: 1s ease-in-out all;
    margin: 20px 50px 50px 25px;
}

@media (max-width: 1470px) and (min-width: 860px) {
    #buttons {
        display: none !important;
    }

    .CVsection {
        flex-direction: column !important;
        max-width: 100% !important;
    }

    div#CV {
        width: 70vw !important;
        height: 90vh !important;
        display: flex !important;
        justify-content: center !important;
    }

    #mainText {
        width: 80vw !important;
        max-width:90vw !important;
        margin: 0;
    }

    h5#SousTitre {
        max-width: 60vw !important;
    }
    
}

@media (max-width: 860px) {
    Button#blackVariant {

    justify-content:space-around !important;
    width: 100% !important;
}

span#buttons{
    justify-content:center !important;
    width: 70% !important;
}

    .computer {
        display: none !important;
    }

    .mobile {
        display: block !important;
    }

    div#CV {
        display: none !important;
    }

    div#contactSection div#CV {
        min-width: auto;
        max-width: 100%;
        width: 100vw;
        margin: 0;
        padding: 0;
    }

    #contactSection {
        flex-direction: column;
    }

    .CVsection #SousTitre {
        width: 90vw;
        max-width:50vw;
        font-size:1.5em !important;
    }

    div div#finalText.CVsection {
        width: 80vw;
    }

    #mainText {
        width: 80vw !important;
        max-width:90vw !important;
        margin: 0;
    }

    h5#SousTitre {
        max-width: 60vw !important;
    }
}

div#finalText {
    margin: 0;
    padding: 0;

    margin-top:5vh;
    
}

/* @keyframes border {
    0% {
        border: 1px solid white;
        transition: 1s ease-in-out all;
    }

    30% {
        border: 2px solid gray;
        transition: 1s ease-in-out all;
    }

    60% {
        border: 3px solid black;
        transition: 1s ease-in-out all;
    }

    100% {
        border: 1px solid white;
        transition: 1s ease-in-out all;
    }
} */

Button#blackVariant {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 50vw; /* Largeur ajustable selon l'écran */
    max-width: 300px; /* Limite la largeur pour éviter que ça devienne trop large */
    padding: 10px 20px; /* Pour une meilleure mise en forme */

    i {
        margin-right: 10px; /* Espace entre l'icône et le texte */
    }
}

#buttons {
    display: flex; /* Assure que les boutons sont affichés en flex */
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center; /* Centre les boutons horizontalement */
    align-items: center; /* Centre verticalement si besoin */
    margin: 50px 0;
    gap: 20px; /* Espace entre les boutons */
}
</style>
