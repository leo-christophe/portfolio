<script setup>
import { useRouter } from 'vue-router';  // Import useRouter to access the router instance
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const router = useRouter();  // Initialize the router
const toast = useToast();

function effacerStockageLocal(){
    if (localStorage.length == 0){
        showInfo()
        return router.go(-1);  // Go back to the previous page
    }

    const confirmation = confirm("Êtes-vous sûr de vouloir supprimer toutes vos données ?");
    if (!confirmation) {
        return;  // If the user cancels, do nothing
    }

    localStorage.clear();
    showSuccess();
    return router.go(-1);  // Go back to the previous page
}
    const showSuccess = () => {
        toast.add({ severity: 'success', summary: 'Données supprimées!', detail: 'Vos données ont été supprimé avec succès.', life: 2500 });
    };

    const showInfo = () => {
        toast.add({ severity: 'info', summary: 'Erreur', detail: 'Vous n\'avez aucune donnée à supprimer.', life: 2500 });
    };
</script>

<template>
    <Toast></Toast>
    <div id="dataPageContent">
        <div id="title_container">
            <h1 id="title">Vos données</h1>
        </div>

        <p id="disclaimer">
            Vos données stockées sur le navigateur ont un but purement ergonomique ou graphique. <br>Vous pouvez les effacer à tous moments en cliquant sur le bouton ci-dessous.
        </p>
    
        <div id="suppButtonContainer">
            <Button id="suppButton" label="Supprimer mes données" severity="danger" @click="effacerStockageLocal"/>
        </div>
    </div>
</template>

<style scoped>
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
        font-family: inherit;
    }

    #suppButton:hover {
        border-color:var(--red-800)
    }
</style>
