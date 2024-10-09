<script setup>
import { CV_NAME_WEB, CV_NAME_WEB_EN } from '../../data/const.js';
import { onMounted, ref } from 'vue';
import { getLangFromUrl } from '../../utils/traduction.js';
import Button from 'primevue/button';

const WIDTH = "90%";
const HEIGHT = "900px";
const ZOOM = toString(50);
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
            <h2 id="CVTitre">{{ $t('message.homeContactTitle') }}</h2>
            <h5 id="SousTitre">{{ $t('message.homeContactDesc') }}</h5>
            <div id="finalText" class="CVsection computer">
                <h4>{{ $t('message.CTA1') }}<RouterLink to="/contact">{{ $t('message.CTA2') }}</RouterLink>{{ $t('message.CTA3')}}</h4>
            </div>

            <!-- <span id="buttons">
                <Button id="blackVariant">Télécharger le CV</Button>
                <Button id="blackVariant">Consulter le CV</Button>
            </span> -->
        </div>

        <div id="CV">
            <embed :src="CVAdress" type="application/pdf" :width="WIDTH" :height="HEIGHT" />
        </div>

        <div id="finalText" class="CVsection mobile">
            <h4>{{ $t('message.CTA1') }}<RouterLink to="/contact">{{ $t('message.CTA2') }}</RouterLink>{{ $t('message.CTA3')}}</h4>
        </div>
    </div>
</template>

<style scoped>

@media (max-width:1470px) and (min-width: 860px) {
  span#softSkillsContainer, span#hardSkillsContainer {
    min-width:1200px;
  }
}

@media (max-width:860px) {
    .computer{
        display: none !important;
    }

    .mobile{
        display: block !important;
    }

    div#contactSection div#CV{
        min-width: auto;
        max-width: 100%;
        width:100vw;
        margin: 0;
        padding:0;

        embed{
            width:100%;
            height: 100%;
            max-width:none;
            zoom:120%;
        }
    }

    #contactSection{
        flex-direction: column;
    }

    .CVsection #SousTitre {
        width:90vw;
    }
    div div#finalText.CVsection{
        width:80vw;
        margin:0 10vw 0 10vw;
    
    }   

    #buttons{
        flex-direction: column;
        justify-content: center;
        gap:20px;
        width:100vw;
    }
}

#buttons{
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-around;
    margin: 50px 0;
}

.computer{
        display: block !important;
    }

.mobile{
    display: none !important;
}

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
    height:auto;
    font-family: inherit;
    display:flex;
    flex-direction: row;
    justify-content: space-around;
}

.CVsection #SousTitre {
    margin: 0 25px 50px 25px;

}

.CVsection h4 {
    text-align: center;
    margin: 100px 25px;
}

#CVTitre {
    margin: 0 0 10px 25px;
}

div#CV{
    display: flex;
    justify-content: center;
    height: auto;
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.8), 0 0 15px rgba(0, 0, 0, 0.4);

    embed{
        width:100vw;
        max-width: 50vw;
    }
}
</style>
