<script setup>
import Button from 'primevue/button';
import {CV_NAME_WEB} from '../../data/const.js';


const WIDTH = "90%";
const HEIGHT = "900px";
const ZOOM = "70";
const RACINE = "/documents/";

const CVAdress = RACINE+CV_NAME_WEB+"#page=1&zoom="+ZOOM;
</script>

<template>
    <div class="CVsection">
        <h2 id="CVTitre">Curriculum Vitae</h2>
        <div id="CV">
            <embed :src="CVAdress" type="application/pdf" :width="WIDTH" :height="HEIGHT" />
        </div>
    </div>

    <div id="finalText" class="CVsection">
        <h4>Convaincu ? <RouterLink to="/contact">Contactez moi</RouterLink> dès maintenant!</h4>
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
