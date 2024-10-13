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
                        <img src="https://media.licdn.com/dms/image/v2/D4E03AQGsWTRA8Q7aJA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1698118847727?e=1734566400&v=beta&t=FEXDpgmvSFDF0KLR1L1Rjbf6xxzjfPrk_lCo8Tbv9Rw" alt="Photo de profil" id="photoProfil">
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
    @media screen and (max-width: 860px){
        #statisticComponent{
            display:none !important;
        }

        #CTAButtons{
            width:80vw;
        }

        h4#paragrapheAPropos{
            width:80vw;
        }
        
        div#textAndButtons{
            margin: 0;
        }

        #photoContainer{
            width: 400px !important;
            height: 400px !important;
            margin-bottom:1vh;
        }

        #textAndPhoto{
            flex-direction: column-reverse !important;
        }
    }

    @media screen and (max-width: 1439px){
        #photoProfil{
            width: 100% !important;
            height: 100% !important;
        }

        #photoContainer{
            width: 350px !important;
            height: 350px !important;
            margin-bottom:1vh;
        }

        #textAndPhoto{
            flex-direction:column;
            justify-content: center;
            align-items: center;
            width:100%;
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
