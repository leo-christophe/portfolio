<script setup>
import { useRouter } from 'vue-router';  // Import useRouter to access the router instance
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { traductionSetup } from '../utils/traduction';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();  // Initialize the i18n instance
const router = useRouter();  // Initialize the router
const toast = useToast();

function effacerStockageLocal(){
    if (localStorage.length == 1){
        showInfo()
        return router.go(-1);  // Go back to the previous page
    }

    const confirmation = confirm(t('message.etesVousSur'));
    if (!confirmation) {
        return;  // If the user cancels, do nothing
    }

    const lang = localStorage.getItem('lang');
    localStorage.clear();
    localStorage.setItem('lang', lang);
    window.location.reload();
    showSuccess();
    return router.go(-1);  // Go back to the previous page
}
    const showSuccess = () => {
        toast.add({ severity: 'success', summary: t('message.deletedData'), detail: t('message.succesToast'), life: 2500 });
    };

    const showInfo = () => {
        toast.add({ severity: 'info', summary: t('message.infoData'), detail: t('message.infoToast'), life: 2500 });
    };
</script>

<template>
    <Toast></Toast>
    <div id="dataPageContent">
        <div id="title_container">
            <h1 id="title">{{$t('message.donneesTitle')}}</h1>
        </div>

        <p id="disclaimer">{{$t('message.donneesDisclaimer')}}<br><br>{{ $t('message.donneesDisclaimer2') }}
        </p>
    
        <div id="suppButtonContainer">
            <Button id="suppButton" :label="t('message.donneesBtnSupp')" severity="danger" @click="effacerStockageLocal"/>
        </div>
    </div>
</template>

<style scoped>
    @media (max-width: 860px) {
        #title {
            font-size: 2rem;
        }

        #disclaimer {
            font-size: 1rem;
        }

        #suppButton {
            min-width: min-content;
            min-height: min-content;
        }
    }

    div#dataPageContent {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top:50px;
    }

    #disclaimer {
        padding: 20px;
        text-align: justify;
        line-height: 30px;
    }

    #suppButtonContainer {
        margin-top: 10vh;
    }

    #suppButton {
        width: 200px;
        height:5vh;
        min-width: min-content;
        min-width: min-content;
        font-family: inherit;
    }

    #suppButton:hover {
        border-color:var(--red-800)
    }
</style>
