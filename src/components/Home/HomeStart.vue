<script setup>
import Button from 'primevue/button';

const CVAdress = document.querySelector('#app > div > footer > ul > li:nth-child(3) > a').href;

function ToCV() {
    window.scrollTo({
        top: window.innerHeight * 2 + 80,
        behavior: 'smooth'
    });
}
</script>

<template>
    <div id="welcome">
        <div id="text" class="paragraphe">  
            <h1 class="outlined-text" id="titre">{{ $t('message.homeTitle') }}</h1>
            <h3 class="outlined-text text_line" id="soustitre1">{{ $t('message.subtitle1') }}</h3>
            <h4 class="outlined-text text_line" id="soustitre2">{{ $t('message.subtitle2') }}</h4>

            <i id="flecheNext1" class="pi pi-arrow-down" @click="ToCV()"></i>
        </div>

        <div id="partieDroite">
            <div class="paragraphe" id="texteParagrapheDroiteContainer">
                <div id="texteParagrapheDroite">
                    <h2 id="titreAPropos">{{ $t('message.aboutTitle') }}</h2>
                    <h4 id="paragrapheAPropos">{{ $t('message.aboutText') }}</h4>
                </div>
            </div>

            <div id="CTA" class="paragraphe">
                <a :href="CVAdress" target="_blank">
                    <Button id="blackVariant">{{ $t('message.viewCV')+" " }} <i class="pi pi-chevron-right chevronDroitBoutonsDroits"></i></Button>
                </a>
                <RouterLink to="/contact">
                    <Button id="blackVariant">{{ $t('message.contact')+" " }} <i class="pi pi-chevron-right chevronDroitBoutonsDroits"></i></Button>
                </RouterLink>
            </div>

            
        </div>

        <div id="interetsSection">

        <h2 id="titreAProposI">{{ $t('message.interestsTitle') }}</h2>
        <h5 id="paragrapheAProposI">{{ $t('message.interestsDescription') }}</h5>

        <div class="paragraphe" id="interets" style="display:flex;">
                <div>

                    <span id="conteneurInterets">
                        <div class="textContainer">
                            <img class="hobbyIcon" id="torii-gate-icon" src="/images/icons/torii-gate.gif">
                            
                            <div>
                                <h3>{{$t('message.animes')}}</h3>
                                {{ $t('message.animesDescription') }}
                            </div>
                        </div>
                        <div class="textContainer">
                            <img class="hobbyIcon" id="game-controller-icon" src="/images/icons/game-controller.gif">
                            
                            <div>
                                <h3>{{$t('message.videogames')}}</h3>
                                {{ $t('message.videogamesDescription') }}    
                            </div>
                        </div>
                        <div class="textContainer">
                            <img class="hobbyIcon" id="cooking-pot-icon" src="/images/icons/cook.gif">
                            
                            <div>
                                <h3>{{$t('message.cooking')}}</h3>
                                {{ $t('message.cookingDescription') }}
                            </div>
                        </div>
                    </span>
                </div>
            </div>
        </div>
        <div id="video_container">
            <!-- Vidéo background -->
        </div>
    </div>
</template>

<style scoped>
    @media screen and (max-width: 860px){
        #imageLeo{
            display:none;
        }

        #flecheNext1{
            display:none;
        }

        
        div#CTA.paragraphe{
            display:flex;
            flex-direction:column;
            align-items:center;
        }

        .paragraphe{
            padding:5px;
        }

        div#text.paragraphe{
            width:100vw;
            margin:0;
            padding: 0 100px 0 100px;
        }

        div#interetsSection{
            justify-content: left;
            margin:120vh 0 0 0;
        }

        div#interets{
            justify-content: center;
            align-items: center;
        }

        span#conteneurInterets{
            flex-direction: column;
            padding:0;
            margin:0;
            width:100vw;
        }

        div#interets.paragraphe{
            margin:0;
            padding:0;
            
        }

        span#conteneurInterets {
            margin-top:30px;
            gap:20px;

            div.textContainer{
            display:block;
            max-width:80vw;
            min-width:50%;
            min-height: min-content;
            max-height:20vh;
            
            width:auto;
            justify-content:center;
            margin: 0 auto;
            text-align: center;

            img{
                width:100px;
            }
        }
    }

        div#CTA.paragraphe {
            flex-direction: row;
            justify-content: space-around;
        }
        

        div#textCV{
            max-width:none;
            min-width:auto;
        }

        div#partieDroite{
            width:100vw;
            margin-right:0px;
            padding-right:0px;
        }
    }

    @media screen and (max-width: 1219px){
        #CTA button{
            margin-bottom:10px;
        }
    }

    #conteneurInterets img {
        width: 10em; /* Taille des icônes */
        margin-bottom: 15px; /* Space between icon and text */
        align-self: center; /* Align icons to the top */
    }

    #interetsSection{
        border:1px solid black;
        background-color:var(--home-background-color3);
        box-shadow: 0 20px 30px rgba(0, 0, 0, 0.8), 0 0 15px rgba(0, 0, 0, 0.4);
        border-radius: 20px;

        display:flex;
        flex-direction:column;
        justify-content:left;
        margin-top:60vh;
        position:relative;
        z-index: 10;
        width:90vw;
        margin-left:5vw;
        min-width:min-content;
    }

    

    #interets {
        display: flex;
        flex-wrap:wrap;
        flex-direction: row;
        justify-content: center; /* Center the child elements horizontally */
        width:100%;
        
        
    }

    #conteneurInterets {
        display: flex;
        flex-direction: row;
        justify-content:center;
        gap: 5%; /* Space between individual interest items */
        width: 100%;
    }

    #conteneurInterets div.textContainer {
        display: flex;
        flex-direction: column;
        justify-content: flex-start; /* Align content to the top */
        align-items: center;
        margin: 20px 0;
        border: 2px solid var(--secondColor);
        border-radius: 10%;
        padding: 20px;
        max-width: 20%;
        min-width: 15rem;
        min-height: 350px; /* Ensure a minimum height for consistent size */
        text-align: center;
    }



    #conteneurInterets div div {
        font-size: 0.8rem;
        text-align: justify; /* Align text inside the description */
    }

    #conteneurInterets h3 {
        text-align: center;
        margin-bottom: 10px;
    }


    #texteParagrapheDroiteContainer {
        display:flex;
        flex-direction:row-reverse;
    }

    #imageLeo {
        display: grid;
        position: relative;
        grid-template-areas: "background"; /* Les deux images occuperont la même zone */
        justify-content: center;
        align-items: center;
        width: 200px;
        height: 200px;
        border-radius: 50%; /* Forme circulaire */
        border: 1px solid black;
        overflow: hidden; /* Empêche les images de déborder du cadre */
        background-color:white;
        margin-right:100px;
    }

    #backgroundshadow {
        grid-area: background; /* Place l'ombre dans la même zone */
        z-index: 1; /* Derrière l'image principale */
        filter: blur(10px); /* Applique un flou à l'ombre */
    }

    #background {
        grid-area: background; /* Place l'image de fond dans la même zone */
        z-index: 2; /* Devant l'ombre */
    }

    #background img, #backgroundshadow img {
        width: 95%;
        height:95%;
        object-fit: cover; /* Maintient l'aspect des images */
        border-radius: 500px 0px 500px 500px; /* Applique un arrondi aux images */
        margin:10px 20px 0px 5px;
    }


    #CTA Button{
        font-size:1rem;
    }

    i{
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
        float:left;

        height: auto;
        width:40vw;

        position:relative;
        z-index: 10;
        

     
        border-radius:40px;
    }

    .paragraphe{
        padding:30px;
        
    }

    #partieDroite{
        float:right;
        width:50vw;
    }
    
    #titreAProposI, #paragrapheAProposI{
        margin-left:30px;
    }

    #paragrapheAPropos{
        font-size: 1em;
        color:lightcyan;
        width:100%;
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

    img.hobbyIcon {
        width: 10em; /* Taille des icônes */
        margin-bottom: 15px; /* Space between icon and text */
        border-radius: 30px;
    }

    #torii-gate-icon{
        object-fit:cover !important;
        width:10em !important;
    }
</style>
