<script setup>
import { onMounted } from 'vue';
import Button from 'primevue/button';
// onMounted(() => {
//   const video = document.getElementById('video');

//   window.addEventListener('scroll', () => {
//     const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//     const maxScroll = window.innerHeight-300; // Change this value based on how quickly you want the video to disappear
//     const opacity = Math.max(0, 1 - scrollTop / maxScroll);
//     video.style.opacity = opacity;
//   });
// });

function ToCV(){
    window.scrollTo({
        top:1050,
        behavior:'smooth'
    })
}
</script>

<template>

    <div id="welcome">
        <div id="backgroundshadow">
        <img src="/images/app_identity/leochristophe2.png" alt="Léo Christophe"  />
    </div>
    <div id="background">
        <img src="/images/app_identity/leochristophe1.png" alt="Léo Christophe" />
    </div>

        <div id="text" class="paragraphe">
            <h1 class="outlined-text" id="titre">Léo CHRISTOPHE</h1>
            <h2 class="outlined-text text_line" id="soustitre1">Etudiant en 3ème année de BUT Informatique</h2>
            <h3 class="outlined-text text_line" id="soustitre2">Localisé à Annecy, France</h3> 

            <i id="flecheNext1" class="pi pi-arrow-down" @click="ToCV()"></i>
        </div>

        <div id="partieDroite">
            <div class="paragraphe">
                <h2 id="titreAPropos">À propos de moi</h2>
                <h4 id="paragrapheAPropos">
                    Étudiant de BUT Informatique avec une passion idéniable pour la programmation depuis plus de 5 ans.
                    J'ai développé énormément mes compétences lors de la réalisation de projets personnels et professionnels
                </h4>
            </div>

            <div id="CTA" class="paragraphe">
                <Button>Curriculum Vitae <i class="pi pi-chevron-right chevronDroitBoutonsDroits"></i></Button>
                <Button>Me contacter <i class="pi pi-chevron-right chevronDroitBoutonsDroits"></i> </Button>
            </div>
        </div>

        <div id="video_container">
            <!-- <video id="video" autoplay loop muted>
                <source src="../../assets/videos/coding_background.mp4" type="video/mp4">
                Votre navigateur ne supporte pas la balise vidéo.
            </video> -->
        </div>
    </div>
</template>

<style scoped>
    #CTA Button{
        font-size:1rem;
    }

    i{
        padding-left:20px;
        justify-content: center;
    }

    #flecheNext1{
        cursor:pointer;

        width:max-content;
        height:max-content;

        padding:25px;
        margin-top:30px;
        
        border-radius:500px;
        background-color:black;
        color: RGB(159, 229, 227); 
        font-size: 2rem;
        transition:0.7s ease-in-out all;
    }

    #flecheNext1:hover{
        font-size: 2.2rem;
        transition:0.7s ease-in-out all;
        border:1px solid white;
        color:white;
    }

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
        display: flex;
        flex-direction: column;
        top:20vh;
        float:left;
        left:calc(50% - var(--width)/2);

        height: 40vh;
        --width:500px;
        width:var(--width);

        z-index: 10;
        
        
        border-radius:40px;
    }

    .paragraphe{
        padding:30px;
    }

    #partieDroite{
        float:right;
    }

    #titreAPropos{
        font-size: 2em;
        color:white;
    }

    #paragrapheAPropos{
        font-size: 1em;
        color:lightcyan;
        width:500px;
    }

    .outlined-text {
        color: white; /* Ou la couleur de ton choix */
        text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
    }

    .paragraphe{
        padding:100px 100px 0px 100px;
    }

    #CTA button{
        margin-right:20px;
    }

    #background, #backgroundshadow{
        position:absolute;
        left:30%;
        top:15%;
        height:90%
    }

    #backgroundshadow{
        filter:blur(10px);
        z-index:0;
        left:28%;
    }

    #background img, #backgroundshadow img{
        height:100%
    }

</style>
