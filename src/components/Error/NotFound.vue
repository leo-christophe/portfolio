<template>
    <div class="not-found">
        <h1>404 - Page inconnue</h1>
        <p>Désolé, la page que vous cherchez n'existe pas.</p>
        <router-link to="/">Retour à l'accueil</router-link>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const message = ref('Sorry, the page you are looking for does not exist.');
</script>

<style scoped>
.not-found {
    text-align: center;
    margin-top: 50px;
}

.not-found h1 {
    font-size: 3em;
    margin-bottom: 20px;
}

.not-found p {
    font-size: 1.5em;
    margin-bottom: 20px;
}

.not-found a {
    color: #42b983;
    text-decoration: none;
    font-weight: bold;
}
</style>