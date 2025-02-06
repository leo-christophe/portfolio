<script setup>
import Button from 'primevue/button';
import HomeStatistics from './HomeStatistics.vue';

const CVAdress = document.querySelector('#app > div > footer > ul > li:nth-child(3) > a').href;

</script>


<template>
    <div id="welcome">
        <div id="contentContainer">
            <div id="textAndButtons">
                <div id="textAndPhoto">
                    <div id="mainTextContainer" class="paragraphe">
                        <h2 id="titreAPropos">{{$t('home.homeTitle')}}</h2>
                        
                        <h5 id="paragrapheAPropos">{{ $t('home.aboutText') }}</h5>
                        <div id="CTAButtons" class="paragraphe">
                            <a :href="CVAdress" target="_blank" id="linkButtonCV" class="btnLink">
                                <Button id="blackVariant">{{ $t('home.viewCV')+" " }} <i class="pi pi-chevron-right chevronDroitBoutonsDroits"></i></Button>
                            </a>
                            <RouterLink to="/contact" id="linkButtonContact" class="btnLink">
                                <Button id="blackVariant">{{ $t('home.contact')+" " }} <i class="pi pi-chevron-right chevronDroitBoutonsDroits"></i></Button>
                            </RouterLink>
                        </div>
                    </div>

                    <span id="photoContainer" class="border-animated-box">
                        <!-- Photo de profil Linkedin -->
                        <img src="/images/app_identity/photo.webp" 
                            alt="Léo Christophe Photo" 
                            :title="$t('home.profilePicture')"
                            id="photoProfil">
                    </span>

                </div>

            </div>
            <div id="statistics">
                <HomeStatistics id="statisticComponent"></HomeStatistics>
            </div>
        </div>   
    </div>
</template>


<style scoped>

    /* ////////////////////////////////////////
    ///          GENERAL STYLES          ///
    ///          ET VARIABLES            ///
    //////////////////////////////////////// */

    h5#paragrapheAPropos{
        white-space: pre-line;
    }

    i.chevronDroitBoutonsDroits{
        transition:0.5s ease-in-out transform;
    }

    Button:hover{
        i.chevronDroitBoutonsDroits{
            animation: goLeftAndRight 0.5s infinite;
            transition:0.5s ease-in-out transform;
        }
    }


    #textAndButtons{
        display:flex;
        flex-direction:column;
        margin: 10vh 10vw;
    }

    #textAndPhoto{
        display:flex;
        flex-direction:row-reverse;
        justify-content: space-between;
        width:85vw;
        gap:10%;

        /* Paragraphe 1 */
        #mainTextContainer{
            display:flex;
            flex-direction:column;
            max-width:50vw;

            #titreAPropos{
                font-size:3em;
                line-height: 1.6em;
                transition:1s ease-in-out all;
                filter:drop-shadow(0 0 0.1rem white);
                animation:welcomeText 2s ease-in-out infinite;
            }
            
            #paragrapheAPropos{
                font-size:1.5em;
                line-height: 1.4em;
            }
        }
    }
    
    /* Boutons */
    #CTAButtons{
        --tailleBoutonsOrdinateur:1.2em;
        display:flex;
        flex-direction:row;
        justify-content: left;
        margin-top:5vh;
    }

    #CTAButtons button, #CTAButtons i{
        transition:0.5s ease-in-out all;
        font-size:var(--tailleBoutonsOrdinateur) !important;
    }

    #CTAButtons .btnLink{
        margin: 1em;
    }

    #photoContainer {
        position: relative;
        width: 20vw;
        height: 20vw;
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left:5vw;
    }

    /* Image */
    #photoProfil {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        position:absolute;
        animation:photoAppear 0.5s ease-in-out;
        transition: 1s ease-in-out all;
    }

    /* Cercle cyan animé */
    .border-animated-box {
        position: relative;

        border: 5px solid transparent;
        border-radius: 50%;
        padding: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        animation: spinCyan 3s linear infinite; /* Animation de rotation */
    }

    #paragrapheAPropos{
        animation:aboutTextAppear 1s ease-in-out;
    }
/* 
    ////////////////////////////////////////
    //             ANIMATIONS             //
    //////////////////////////////////////// */

    /* // Flèches boutons */
    @keyframes goLeftAndRight{
        0%{
            transform: translateX(0);
        }
        50%{
            transform: translateX(5px);
        }
        100%{
            transform: translateX(0);
        }
    }

    /* // Cercle Avatar */
    @keyframes spinCyan {
        0% {
            border-color: transparent;
            filter:drop-shadow(0 0 0.1rem white);
        }
        50% {
            border-color: var(--secondColor);
            filter:drop-shadow(0 0 0.2rem white);
        }
        100%{
            border-color: transparent;
            filter:drop-shadow(0 0 0.1rem white);
        }
    }

    @keyframes welcomeText{
        0%{
            transform: translateY(-10px);
            filter:drop-shadow(0 0 0.1rem white);
        }
        50%{
            transform: translateY(0);
            filter:drop-shadow(0 0 0.2rem white);
        }
        100%{
            transform: translateY(-10px);
            filter:drop-shadow(0 0 0.1rem white);
        }
    }

    @keyframes aboutTextAppear{
        0%{
            opacity:0;
            transform:translateX(-300px);
        }
        75%{
            opacity:0.35;
        }
        100%{
            opacity:1;
            transform:translateX(0px);
        }
    }

    @keyframes photoAppear{
        0%{
            opacity:0;
        }
        100%{
            opacity:1;
        }
    }

        /* ////////////////////////////////////////
    ///         SMARTPHONE STYLES        ///
    ///        (0px - 860px)             ///
    ///       (Portrait et paysage)      ///
    //////////////////////////////////////// */
    @media screen and (max-width:1024px){
        #CTAButtons{
            flex-direction:column;
            margin:0;
        }

        #CTAButtons button{
            min-width:100%;
            font-size:2em !important;
        }

        span#photoContainer{
            width: 300px;
            height: 300px;
        }

        #photoContainer img {
            width: 100%;
            height: 100%;
        }

        h5#paragrapheAPropos{
            font-size:5em;
            height:45vh;
        }

        #statisticComponent{
            width:30%;
        }

        div#statistics{
            width:30%;
        }

        div#contentContainer{
            display:flex;
            flex-direction:row;
            width:100%;
        }

        div#textAndButtons{
            margin: 0vh 5vw;
            width:50vw;
        }

        div#textAndPhoto{
            flex-direction:column-reverse;
            gap:5vh;
            width:80%;
        }
    }


</style>
