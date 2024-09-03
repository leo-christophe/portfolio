<script setup>
import Button from 'primevue/button';

const WIDTH = "50%";
const HEIGHT = "900px";
const ZOOM = "70";
const RACINE = "/documents/";
const DOCUMENT = "Web-2024-2025.pdf";
</script>

<template>
    <div>
        <h2 id="CVTitre">Curriculum Vitae</h2>
        <div id="CV">
            <embed :src="`${RACINE}${DOCUMENT}#page=1&zoom=${ZOOM}`" type="application/pdf" :width="WIDTH" :height="HEIGHT" />
        </div>
    </div>
</template>

<style scoped>
#CVTitre {
    margin-left: 25px;
}

#CV {
    display: flex;
    justify-content: center;
    height: 100vh;
}
</style>
