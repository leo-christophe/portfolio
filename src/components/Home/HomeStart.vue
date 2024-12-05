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
                        <h2 id="titreAPropos">Léo CHRISTOPHE</h2>
                        <h5 id="paragrapheAPropos">{{ $t('message.aboutText') }}</h5>
                        <div id="CTAButtons" class="paragraphe">
                            <a :href="CVAdress" target="_blank" id="linkButtonCV" class="btnLink">
                                <Button id="blackVariant">{{ $t('message.viewCV')+" " }} <i class="pi pi-chevron-right chevronDroitBoutonsDroits"></i></Button>
                            </a>
                            <RouterLink to="/contact" id="linkButtonContact" class="btnLink">
                                <Button id="blackVariant">{{ $t('message.contact')+" " }} <i class="pi pi-chevron-right chevronDroitBoutonsDroits"></i></Button>
                            </RouterLink>
                        </div>
                    </div>

                    <span id="photoContainer" class="border-animated-box">
                        <!-- Photo de profil Linkedin -->
                        <img src="https://media.licdn.com/dms/image/v2/D4E03AQGsWTRA8Q7aJA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1698118847727?e=1734566400&v=beta&t=FEXDpgmvSFDF0KLR1L1Rjbf6xxzjfPrk_lCo8Tbv9Rw" 
                            alt="Léo Christophe Photo" 
                            :title="$t('message.profilePicture')"
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


<style lang="scss" scoped>
    @media screen and (max-width: 860px){
        #statisticComponent{
            display:none !important;
        }

        #CTAButtons{
            width:80vw;
        }

        h5#paragrapheAPropos{
            min-width:80vw;
            width:100%;
        }
        
        div#textAndButtons{
            margin:0;

            Button{
                font-size:2em !important;
            }
        }

        #photoContainer{
            width: 400px !important;
            height: 400px !important;
            margin-bottom:1vh;
        }

        div#textAndPhoto{
            flex-direction: column-reverse;
            max-width:100vw;
            min-width:90vw;
            justify-content: left;
            margin: 0 5vw 0 10vw;
        }
    }

    @media screen and (min-width: 861px) and (max-width: 1439px){
        #photoProfil{
            width: 100% !important;
            height: 100% !important;
        }

        #photoContainer{
            min-width: 350px !important;
            min-height: 350px !important;
            margin-bottom:1vh;
        }

        #textAndPhoto{
            flex-direction:column;
            justify-content: center;
            align-items: center;
            width:100%;
        }


    }

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
        flex-direction:row;
        justify-content: left;
        width:80vw;

        /* Paragraphe 1 */
        #mainTextContainer{
            display:flex;
            flex-direction:column;
            max-width:50vw;

            #titreAPropos{
                font-size:3em;
                line-height: 1.6em;
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

        button, i{
            font-size:var(--tailleBoutonsOrdinateur) !important;
        }

        .btnLink{
            margin: 1em;
        }
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

    @keyframes spinCyan {
    0% {
        border-color: transparent; /* Le bord commence cyan */
    }
    50% {
        border-color: var(--secondColor); /* Le bord reste cyan */
    }
    100%{
        border-color: transparent; /* Le bord redevient transparent */
    }
    }



</style>
