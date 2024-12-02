<script setup>
    import { CV_NAME_WEB, CV_NAME_WEB_EN } from '../../data/const.js';
    import { onMounted, ref } from 'vue';
    import { getLangFromUrl } from '../../utils/traduction.js';
    import Button from 'primevue/button';

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

        // adjustPdfZoom();
    });
    const downloadFile = (url, target = '_blank') => {
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', '');
        link.setAttribute('target', target);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const downloadCV = () => {
        // Download the CV
        downloadFile(CVAdress.value, '_blank');

    }

    const consultCV = () => {
        // Open the CV in a new tab
        window.open(CVAdress.value, '_blank');
    }

    // function adjustPdfZoom() {
    //     const pdfViewer = document.getElementById('pdf-viewer');
    //     const width = window.innerWidth;
    //     const height = window.innerHeight;

    //     // Logique pour ajuster le zoom (par exemple, en fonction de la taille de la fenêtre)
    //     // Tu peux ajuster ces valeurs selon tes besoins
    //     let zoomLevel;
    //     if (width < 600) {
    //         zoomLevel = 0.5; // Réduire le zoom à 50% pour les écrans petits
    //     } else if (width < 1200) {
    //         zoomLevel = 0.75; // Réduire le zoom à 75% pour les écrans moyens
    //     } else {
    //         zoomLevel = 0.8; // 100% pour les grands écrans
    //     }

    //     // Appliquer le zoom (dans ce cas, en modifiant la taille de l'iframe)
    //     pdfViewer.style.transformOrigin = "0 0"; // Origine du zoom en haut à gauche
    //     pdfViewer.style.width = `${100 / zoomLevel}vw`; // Ajuster la largeur selon le zoom
    //     pdfViewer.style.height = `${100 / zoomLevel}vh`; // Ajuster la hauteur selon le zoom
    // }

</script>


<template>
    <div class="CVsection">
        <div id="textCV">
            <div id="mainText">
                <span>
                    <div id="contactgifContainer">
                        <img 
                            id="imgContact" 
                            alt="Contact Gif"
                            :title="$t('message.contactGifTitle')"
                            src="/images/home/contactGif.gif">
                    </div>
                </span>
                <span>
                    <h1 id="CVTitre">{{ $t('message.homeContactTitle') }}</h1>
                    <div id="SousTitre">{{ $t('message.homeContactDesc') }}</div>

                    <div id="finalText" class="CVsection computer">
                        <h2>{{ $t('message.CTA1') }}<RouterLink to="/contact">{{ $t('message.CTA2') }}</RouterLink>{{ $t('message.CTA3')}}</h2>
                    </div>

                    <span id="buttons">
                        <Button id="blackVariant" @click="downloadCV">
                            <i class="pi pi-download"></i>{{ $t("message.btnDownload") }}
                        </Button>
                        <Button id="blackVariant" @click="consultCV">
                            <i class="pi pi-eye"></i>{{ $t("message.btnConsult") }}
                        </Button>
                    </span>
                </span>
            </div>
        </div>

        <!-- <div id="CV">
            <embed :src="CVAdress" id="pdf-viewer" type="application/pdf" :width="WIDTH" :height="HEIGHT" />
        </div> -->
    </div>
</template>

<style scoped>
    .CVsection {
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

    Button#blackVariant {
        font-size:1.2em;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width:250px;
        max-width: 20vw;
        padding: 20px 20px; /* Pour une meilleure mise en forme */

        i {
            margin-right: 10px; /* Espace entre l'icône et le texte */
        }
    }

    #buttons {
        display: flex; /* Assure que les boutons sont affichés en flex */
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: space-around; /* Centre les boutons horizontalement */
        align-items: center; /* Centre verticalement si besoin */
        margin: 50px 0;
        gap: 20px; /* Espace entre les boutons */
    }

    #CV {
        width: 90%; /* Largeur adaptée à toutes les résolutions */
        max-width: 1000px; /* Limite la taille maximale */
        height:fit-content;
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
            display: flex !important;
        }

        .CVsection {
            flex-direction: column !important;
            max-width: 100% !important;
        }

        div#CV {
            width: 70vw !important;
            height: fit-content !important;
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
        width: 100% !important;
        display:flex !important;
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
        text-align:center;
        
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


</style>
