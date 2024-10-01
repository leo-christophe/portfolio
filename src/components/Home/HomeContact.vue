<script setup>
import { CV_NAME_WEB, CV_NAME_WEB_EN } from '../../data/const.js';
import { onMounted, ref } from 'vue';
import { getLangFromUrl } from '../../utils/traduction.js';

const WIDTH = "90%";
const HEIGHT = "900px";
const ZOOM = "70";
const RACINE = "/documents/";

// Reactive reference for the CV address
const CVAdress = ref(RACINE + CV_NAME_WEB + "#page=1&zoom=" + ZOOM);

onMounted(() => {
    // Check language and set the appropriate CV address
    if (getLangFromUrl() != 'fr') {
        CVAdress.value = RACINE + CV_NAME_WEB_EN + "#page=1&zoom=" + ZOOM;
    }
});
</script>


<template>
    <div class="CVsection">
        <div id="textCV">
            <h2 id="CVTitre">{{ $t('message.homeContactTitle') }}</h2>
            <h3 id="SousTitre">{{ $t('message.homeContactDesc') }}</h3>
            <div id="finalText" class="CVsection">
                <h4>{{ $t('message.CTA1') }}<RouterLink to="/contact">{{ $t('message.CTA2') }}</RouterLink>{{ $t('message.CTA3')}}</h4>
            </div>
        </div>

        <div id="CV">
            <embed :src="CVAdress" type="application/pdf" :width="WIDTH" :height="HEIGHT" />
        </div>
    </div>
</template>

<style scoped>
embed{
    max-width:40%;
}

div#CV{
    max-width:40%;
}


#textCV{
    max-width:500px;
}

.CVsection{
    font-family: inherit;
    display:flex;
    flex-direction: row;
    justify-content: space-around;
}

.CVsection #SousTitre {
    margin: 0 25px 50px 25px;
    font-size: 1.2em;
    font-weight: 400;
}

.CVsection h4 {
    text-align: center;
    margin: 100px 0;
}

#CVTitre {
    margin: 0 0 10px 25px;
}

div#CV{
    display: flex;
    justify-content: center;
    height: 100vh;
    min-width:1000px;
}

/* Adjust iframe styling */
iframe {
    border: none; /* Removes iframe border */
    max-width: 100%; /* Ensures the iframe doesn't exceed its container */
    height: 100%; /* Makes sure it scales properly */
}
</style>
