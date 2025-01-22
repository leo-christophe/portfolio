<script setup>
import { useRouter } from 'vue-router';  // Import useRouter to access the router instance
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from "primevue/useconfirm";
import { traductionSetup } from '../utils/traduction';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();  // Initialize the i18n instance
const router = useRouter();  // Initialize the router
const toast = useToast();
const confirm = useConfirm();


// Clear all cookies
function clearAllCookies() {
  const cookies = document.cookie.split(";");

  cookies.forEach(cookie => {
    const cookieName = cookie.split("=")[0].trim();
    // Set the cookie expiration date to a past date
    document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  });
}


function effacerStockageLocal(){
    if (localStorage.length == 1){
        showInfo()
        return router.go(-1);  // Go back to the previous page
    }

    const lang = localStorage.getItem('lang');

    localStorage.clear();
    clearAllCookies()
    
    localStorage.setItem('cookieChoice', "0")
    localStorage.setItem('lang', lang);
    window.location.reload();
    showSuccess();
    return router.go(-1);  // Go back to the previous page
}
    const showSuccess = () => {
        toast.add({ severity: 'success', summary: t('manage_data.deletedData'), detail: t('manage_data.succesToast'), life: 2500 });
    };

    const showInfo = () => {
        toast.add({ severity: 'info', summary: t('manage_data.infoData'), detail: t('manage_data.infoToast'), life: 2500 });
    };

    const confirm2 = () => {
    confirm.require({
        message: t('manage_data.etesVousSur'),
        header: t('manage_data.etesVousSurHeader'),
        icon: 'pi pi-exclamation-circle',
        rejectLabel: t('manage_data.cancel'),
        acceptLabel: t('manage_data.delete'),
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'p-button-danger',
        accept: () => {
            effacerStockageLocal();
        },
        reject: () => {
            return;
        }
    });
};
</script>

<template>
    <div id="dataPageContent">
        <div id="title_container">
            <h1 id="title">{{$t('manage_data.donneesTitle')}}</h1>
        </div>

        <p id="disclaimer">{{$t('manage_data.donneesDisclaimer')}}<a href="/confidentialite">{{ $t('privacy.title') }}</a>.<br><br>{{ $t('manage_data.donneesDisclaimer2') }}
        </p>
    
        <div id="suppButtonContainer">
            <Button id="suppButton" :label="t('manage_data.donneesBtnSupp')" severity="danger" @click="confirm2()"/>
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
        margin-top: 50px;
        max-width: 860px;
        margin: 0 auto;
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
