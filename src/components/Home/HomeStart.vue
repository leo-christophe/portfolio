<script setup>
    import Button from 'primevue/button';
    import HomeStatistics from './HomeStatistics.vue';

    const CVAdress = document.querySelector('#app > div > footer > ul > li:nth-child(3) > a').href;

    // function ToCV() {
    //     window.scrollTo({
    //         top: window.innerHeight * 2 + 80,
    //         behavior: 'smooth'
    //     });
    // }
</script>

<template>
    <div id="welcome">
        <!-- <div id="text" class="paragraphe">  
            <h1 class="outlined-text" id="titre">{{ $t('message.homeTitle') }}</h1>
            <h3 class="outlined-text text_line" id="soustitre1">{{ $t('message.subtitle1') }}</h3>
            <h4 class="outlined-text text_line" id="soustitre2">{{ $t('message.subtitle2') }}</h4>

            <i id="flecheNext1" class="pi pi-arrow-down" @click="ToCV()"></i>
        </div>  -->

        <div id="partieDroite">
            <div class="paragraphe" id="texteParagrapheDroiteContainer">
                <div id="texteParagrapheDroite">
                    <h2 id="titreAPropos">Léo CHRISTOPHE</h2>
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
        <div id="statistics">
            <HomeStatistics></HomeStatistics>
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
        float:left;
        width:50vw;
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

</style>
