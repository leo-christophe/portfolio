<script setup>

</script>

<template>
    <div id="interetsSection">

        <h1 id="titreAProposI">{{ $t('message.interestsTitle') }}</h1>
        <h3 id="paragrapheAProposI">{{ $t('message.interestsDescription') }}</h3>

        <div class="paragraphe" id="interets" style="display:flex;">
            <div>

                <span id="conteneurInterets">
                    <div class="textContainer">
                        <img class="hobbyIcon" id="torii-gate-icon" src="/images/icons/manga.svg">
                        
                        <div>
                            <h3>{{$t('message.animes')}}</h3>
                            {{ $t('message.animesDescription') }}
                        </div>
                    </div>
                    <div class="textContainer">
                        <img class="hobbyIcon" id="game-controller-icon" src="/images/icons/game-controller.svg">
                        
                        <div>
                            <h3>{{$t('message.videogames')}}</h3>
                            {{ $t('message.videogamesDescription') }}    
                        </div>
                    </div>
                    <div class="textContainer">
                        <img class="hobbyIcon" id="cooking-pot-icon" src="/images/icons/cooking-equipment.svg">
                        
                        <div>
                            <h3>{{$t('message.cooking')}}</h3>
                            {{ $t('message.cookingDescription') }}
                        </div>
                    </div>
                </span>

            </div>
        </div>
    </div>
</template>

<style scoped>
    @media screen and (max-width: 860px){
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
    }

    h1#titreAProposI, h3#paragrapheAProposI{
        margin-left:10vw;
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
        font-size:2em !important;
    }

    #titreAProposI, #paragrapheAProposI{
        margin-left:30px;
    }
    
    img.hobbyIcon {
        width: 10em; /* Taille des icônes */
        margin-bottom: 15px; /* Space between icon and text */
        border-radius: 30px;
        background-color: transparent;
    }

    #torii-gate-icon{
        object-fit:cover !important;
        width:10em !important;
    }

</style>