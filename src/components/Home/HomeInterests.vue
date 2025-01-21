<script setup>
import { onMounted, ref } from 'vue';
import router from '../../router';

// Définition des listes d'images
const animeImg = ref([
  '/images/home/greatpretender.webp',
  '/images/home/rezero.webp',
  '/images/home/hunterxhunter.webp',
]);

const gameImg = ref([
  '/images/home/stardewvalley.webp',
  '/images/home/mariogalaxy.webp',
  '/images/home/minecraft.webp',
]);

const cookingImg = ref([
  '/images/home/potaufeu.webp',
  '/images/home/steakfrite.webp',
  '/images/home/tiramisu.webp',
]);

const hobbyIcons = ref(null);

onMounted(() => {
  if (!hobbyIcons.value) {
    console.error('Les icones ne sont pas liés.');
    return;
  }

  // Boucle pour tous les enfants (icones)
  Array.from(hobbyIcons.value.children).forEach((child) => {
    const icon = child.querySelector('.hobbyIcon');
    if (!icon) return;

      let hoverTimeout;
      let intervalId;
      let imgIndex = 0;
      let repetitions = 3;
      let iconCount = hobbyIcons.value.children.length;

      icon.addEventListener('mouseover', (event) => {
        const textContainer = icon.closest('.textContainer');
        if (!textContainer) return;

        // Lance le délai de 2 secondes pour changer l'image
        intervalId = setInterval(() => {
            const imgList =
            icon.id === 'torii-gate-icon'
              ? animeImg.value
              : icon.id === 'game-controller-icon'
              ? gameImg.value
              : cookingImg.value;

              // Cache le texte
              icon.style.visibility = 'hidden';
            textContainer.querySelector('div').style.visibility = 'hidden';
            
            icon.style.cursor = 'none';
            textContainer.style.backgroundImage = `url(${imgList[imgIndex]})`;
            textContainer.style.filter = 'blur(0.5px)';
            textContainer.style.backgroundSize = 'cover';
            textContainer.style.backgroundPosition = 'center';

            imgIndex = (imgIndex + 1) % imgList.length; // Incrémente et boucle l'index
        }, 2000);

        // Supprime les images après 6 secondes
        hoverTimeout = setTimeout(() => {
          clearInterval(intervalId);
          event.target.dispatchEvent(new Event('mouseout'));
        }, 2000*iconCount*repetitions);
      });

      icon.addEventListener('mouseout', () => {
        clearTimeout(hoverTimeout);
        clearInterval(intervalId);

        const textContainer = icon.closest('.textContainer');
        if (!textContainer) return;

        // Réinitialise le fond et réaffiche le texte
        textContainer.style.backgroundImage = '';
        textContainer.querySelector('div').style.visibility = 'visible';
        icon.style.visibility = 'visible';
        icon.style.cursor = 'pointer';
        textContainer.style.filter = 'blur(0px)';
      });
    });
});
</script>

<template>
<div id="interetsSection">
  <div id="hobbyTitleContainer">
    <h1 id="titreAProposI">{{ $t('hobbies.interestsTitle') }}</h1>
  </div>
  <div class="paragraphe" id="interets">
    <span id="conteneurInterets" ref="hobbyIcons">
      <div class="textContainer">
        <img class="hobbyIcon" 
              id="torii-gate-icon" 
              src="/images/icons/manga.svg"
              alt="Torii Gate Icon"/>
        <div>
          <h3>{{ $t('hobbies.animes') }}</h3>
          {{ $t('hobbies.animesDescription') }}
        </div>
      </div>
      <div class="textContainer">
        <img class="hobbyIcon" 
              id="game-controller-icon" 
              src="/images/icons/game-controller.svg"
              alt="Videogames Icon"/>
        <div>
          <h3>{{ $t('hobbies.videogames') }}</h3>
          {{ $t('hobbies.videogamesDescription') }}
        </div>
      </div>
      <div class="textContainer" @click="router.push('/interests/cooking')">
        <img class="hobbyIcon" 
              id="cooking-pot-icon" 
              src="/images/icons/cooking-equipment.svg"
              alt="Cooking icon"/>
        <div>
          <h3>{{ $t('hobbies.cooking') }}</h3>
          {{ $t('hobbies.cookingDescription') }}
          <a>En savoir plus</a>
        </div>
      </div>
    </span>
  </div>
</div>
</template>


<style scoped>
    /*
    * /////////////////
    *   STYLE TELEPHONE
    * /////////////////
    */
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
        }

        span#conteneurInterets div.textContainer{
            display:block;
            max-width:80vw;
            min-width:50%;
            min-height: min-content;
            max-height:20vh;
            
            width:auto;
            justify-content:center;
            margin: 0 auto;
            text-align: center;
        }

        span#conteneurInterets div.textContainer img{
            width:100px;
        }
    }

    /*
    * /////////////////
    *   STYLE GENERAL
    * /////////////////
    */
    #conteneurInterets img {
        width: 10em;
        margin-bottom: 15px;
        align-self: center;
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
        justify-content: center;
        width:100%;
    }

    #conteneurInterets {
        display: flex;
        flex-direction: row;
        justify-content:center;
        gap: 5%;
        width: 100%;
    }

    #conteneurInterets div.textContainer {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        margin: 20px 0;
        border: 2px solid var(--secondColor);
        border-radius: 10%;
        padding: 20px;
        max-width: 25%;
        min-width: 20%;
        min-height: 350px;
        text-align: center;
        transition:1s ease all;
    }

    #conteneurInterets div div {
        font-size: 0.8rem;
        text-align: justify;
    }

    #conteneurInterets h3 {
        text-align: center;
        margin-bottom: 10px;
        font-size:2em !important;
    }

    
    img.hobbyIcon {
        width: 10em;
        margin-bottom: 15px;
        border-radius: 30px;
        background-color: transparent;
        transition:0.5s ease all;
    }

    img.hobbyIcon:hover{
        animation:iconHoverAnimation 0.5s infinite;
        transition:0.5s ease all;
        cursor:pointer;
    }

    #torii-gate-icon{
        object-fit:cover !important;
        width:10em !important;
    }

    div#hobbyTitleContainer{
      display:flex;
      justify-content: center;
      margin:0;
    }

    /** Détails d'Hobbies */
    @keyframes iconHoverAnimation{
        0%{
            transform: scale(1);
            transform:rotateZ(-2deg);
        }
        50%{
            transform: scale(1.2);
            
            transform:rotateZ(-5deg);
        }
        75%{
            transform:scale(1.2);
            
            transform:rotateZ(5deg);
        }

        100%{
            transform: scale(1);
            transform:rotateZ(2deg);
        }
    }
</style>