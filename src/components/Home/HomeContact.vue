<script setup>
    import { CV_NAME_WEB, CV_NAME_WEB_EN } from '../../data/const.js';
    import { onMounted, ref } from 'vue';
    import { getLangFromUrl } from '../../utils/traduction.js';
    import Button from 'primevue/button';

    const RACINE = "/documents/";
    const CVAdress = ref(RACINE + CV_NAME_WEB + "#page=1");
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
        downloadFile(CVAdress.value, '_blank');
    }

    const consultCV = () => {
        window.open(CVAdress.value, '_blank');
    }

    onMounted(() => {
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
    </div>
</template>

<style scoped>
    /*
    * /////////////////
    *   STYLE TELEPHONE
    * /////////////////
    */
    @media (max-width: 860px) {
        Button#blackVariant {
            max-width: 90vw;
            width:50vw;
        }

        span#buttons{
            flex-direction: column;
            justify-content:left;
            min-width:50vw;
            display:flex;
        }

        .computer {
            display: none !important;
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

    /*
    * /////////////////
    *   STYLE TABLETTE
    * /////////////////
    */
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

    /*
    * /////////////////
    *   STYLE GENERAL
    * /////////////////
    */
    .CVsection {
        font-family: inherit;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        padding: 20px;
        margin: 0 auto;
        max-width: 80%;
    }

    #mainText {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        width: 100%;
        margin-bottom: 20px;
    }

    Button#blackVariant {
        font-size:1.2em;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width:250px;
        padding: 20px 20px;
    }

    Button#blackVariant i {
        margin-right: 10px;
    }

    #buttons {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        margin: 50px 0;
        gap: 20px;
    }

    #CV {
        width: 90%;
        max-width: 1000px;
        height:fit-content;
        display: flex;
        justify-content: center;
        box-shadow: 0 20px 30px rgba(0, 0, 0, 0.8), 0 0 15px rgba(0, 0, 0, 0.4);
        margin-top: 20px;
    }

    div#contactgifContainer {
        max-width: 10vw;
        width: 20vw;
        min-width: 125px;
        height: 200px;
        display: flex;
        justify-content: center;
        border-radius: 50%;
        transition: 1s ease-in-out all;
        margin: 20px 50px 50px 25px;
    }

    div#finalText {
        margin: 0;
        padding: 0;
        margin-top:5vh;
        text-align:center;
    }
</style>
