<script setup>
import { useRouter } from 'vue-router';  // Import useRouter to access the router instance
import Button from 'primevue/button';

const router = useRouter();  // Initialize the router

function effacerStockageLocal(){
    if (localStorage.length == 0){
        alert("Aucune donnée n'est stockée sur votre navigateur");
        return router.go(-1);  // Go back to the previous page
    }

    localStorage.clear();
    alert("Vos données ont été supprimées avec succès");
    return router.go(-1);  // Go back to the previous page
}
</script>

<template>
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
    #dataPageContent {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    #disclaimer {
        padding: 20px;
        text-align: justify;
        line-height: 30px;
    }

    #suppButtonContainer {
        margin-top: 100px;
    }
</style>
