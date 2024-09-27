<script setup>
import Button from 'primevue/button';
import {CV_NAME_WEB} from '../../data/const.js';
import { ref } from 'vue';


const WIDTH = "90%";
const HEIGHT = "900px";
const ZOOM = "70";
const RACINE = "/documents/";

const CVAdress = ref(RACINE+CV_NAME_WEB+"#page=1&zoom="+ZOOM);
</script>

<template>
    <div>
        <div class="CVsection">
            <h2 id="CVTitre">{{ $t('message.homeContactTitle') }}</h2>
            <div id="CV">
                <embed :src="CVAdress" type="application/pdf" :width="WIDTH" :height="HEIGHT" />
            </div>
        </div>

        <div id="finalText" class="CVsection">
            <h4>{{ $t('message.CTA1') }}<RouterLink to="/contact">{{ $t('message.CTA2') }}</RouterLink>{{ $t('message.CTA3')}}</h4>
        </div>
    </div>
</template>

<style scoped>
.CVsection h4{
        text-align: center;
        position:relative;
        margin:100px 0px 100px 0px;
    }

#finalText h4{
    position:relative;
    padding:5vh 0px 50px 0px;
}

#CVTitre {
    margin: 0px 0px 10px 25px;
}

#CV {
    display: flex;
    justify-content: center;
    height: 100vh;
    position:relative;
}

iframe{
    position:relative;
}
</style>
