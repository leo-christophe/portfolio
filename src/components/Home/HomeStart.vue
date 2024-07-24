<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  const video = document.getElementById('video');

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const maxScroll = window.innerHeight-300; // Change this value based on how quickly you want the video to disappear
    const opacity = Math.max(0, 1 - scrollTop / maxScroll);
    video.style.opacity = opacity;
  });
});
</script>

<template>
    <div id="welcome">
        <div id="text">
            <h1 class="outlined-text" id="titre">Léo CHRISTOPHE</h1>
            <h2 class="outlined-text text_line" id="soustitre1">Etudiant en 3ème année de BUT Informatique</h2>
            <h3 class="outlined-text text_line" id="soustitre2">Localisé à Annecy, France</h3>
        </div>
        <div id="video_container">
            <video id="video" autoplay loop muted>
                <source src="../../assets/videos/coding_background.mp4" type="video/mp4">
                Votre navigateur ne supporte pas la balise vidéo.
            </video>
        </div>
    </div>
</template>

<style scoped>
    #titre{
        font-size: 3em;
        color:white;
    }

    #soustitre1{
        font-size: 2em;
        color:lightcyan;
    }

    #soustitre2{
        font-size: 1.5em;
        color:rgb(212, 253, 253);
    }

    .text_line{
        padding-top:50px;
    }

    #video {
        object-fit: fill;
        filter: blur(5px); /* Ajuste la valeur pour plus ou moins de flou */
        width:100vw;
        transition: opacity 0.5s; /* Pour un effet de fondu en douceur */
        height:100vh;
    }

    #video_container {
        z-index: 1;
        filter:grayscale(100%);
        
    }

    #text {
        --width:500px;
        width:var(--width);
        position: absolute;
        z-index: 10;
        padding:30px;
        background-color:rgba(15, 13, 44, 0.7);
        border-radius:40px;
        
        display: flex;
        flex-direction: column;
        
        left:calc(50% - var(--width)/2);
        top:20vh;
        height: 40vh;
    }

    .outlined-text {
        color: white; /* Ou la couleur de ton choix */
        text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
    }
</style>
