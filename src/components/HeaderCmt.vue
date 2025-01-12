<script setup>
import { ref, onMounted } from "vue";

import { RouterLink  } from 'vue-router';
import { useI18n } from 'vue-i18n'; // Import Vue I18n
import { changeLang, getLangFromUrl } from '../utils/traduction.js';

const { t, locale } = useI18n(); // Accès à la fonction de traduction

const items = ref([
  { label: t('message.home'), route: '/', icon: 'pi pi-home' },
  { label: t('message.education'), route: '/formations', icon: 'pi pi-book' },
  //{ label: t('message.experience'), route: '/experience', icon: 'pi pi-briefcase' },
  { label: t('message.projects'), route: '/projects', icon: 'pi pi-folder' },
  { label: t('message.skills'), route: '/skillsDisplay', icon: 'pi pi-tablet' },
  { label: t('message.contact'), route: '/contact', icon: 'pi pi-envelope' }
]);  

onMounted(() => {
  // Update the language of the page
   changeLang(getLangFromUrl() || 'en');
});

function switchPageLang() {
    const lang = locale.value === 'en' ? 'fr' : 'en'
    locale.value = lang;  // Update the locale in the i18n system
    changeLang(lang);  // Update language in localStorage and URL
    // Update the language of the page
    document.documentElement.lang = lang;
    location.reload();
}
</script>

<template>
  <nav>
    <span id="navContent">
      <span id="headerTitle">
        <a href="/" id="headerHomeLink">
          <img src="/images/app_identity/icon.webp" alt="Logo" title="Léo Christophe Logo" id="headerLogo">
          <p>Léo Christophe</p>
        </a>
      </span>
      <RouterLink v-for="(item, index) in items" :key="index" class="menuItem" :to="item.route">
          <span :ref="'menu_'+index" class="menuItemLink">
            <i :class="item.icon" style="font-size: var(--IconSize)"></i> 
            <div style="font-size: var(--HeaderSize)">{{ item.label }}</div>
          </span>
      </RouterLink>

      <div id="buttonTranslateContainer" class="buttonTranslateContainer" >
        <button id="buttonTranslate" :title="$t('message.translateHeaderDesc')" @click="switchPageLang()">
          <i id="buttonTranslateIcon" class="pi pi-language" style="font-size: var(--IconSize)"></i>
        </button>
      </div>
    </span>
  </nav>

 
</template>

<style scoped>
  @media screen and (max-width: 1318px){
    span#headerTitle{
      visibility:hidden;
    }
  }

  @media screen and (max-width: 860px){
    nav span#navContent{
      justify-content: left !important;
    }

    .menuItem{
      padding: 0.5rem 0rem 0rem 0rem;

    }

    span.menuItemLink{
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

    a.menuItem{
      height:min-content;

      span i {
    
        margin:0;
        padding:0;

      }
    }

    i#buttonTranslateIcon{
      margin:0;
      padding:0;
      display:flex;
      align-items:center;
      justify-content:center;
    }

    

    div#ButtonTranslateContainer{
      display:flex;
      align-items:center;
      justify-content:center;
      height:100%;
    }

    button#buttonTranslate{
      
      height:100%;
      display:flex;
      align-items:center;
      justify-content:center;
    }
  } 

  .menuItemLink{
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    i{
      margin-right:10px;
    }
  }

  nav{
    text-align: center;
    background-color: #000000;
    width:100%;
    z-index:9000;
    position:relative;
  }

  .buttonTranslateContainer{
    position:absolute;

    width:min-content !important;
    display:flex;
    align-items:center;
    justify-self: center;
    justify-content: center;
    padding:0;
    margin:0;
    right:2vw;
    height:100%;
    z-index: 100;
    color:white;

    i, button, #buttonTranslate{
      border:none;
      background-color: transparent;
    }

    i{
      height:100%;
      margin-left:20px;
      transition: 0.3s ease-out all;
    }

    i:hover{
      color:var(--secondColor);
      transition: 0.3s ease-in all;
    }



  }

  #buttonTranslate:active{
    border:0px transparent !important;
  }

  #buttonTranslate{
    width:fit-content;
    cursor:pointer;
    display:flex;
    align-items:center;
    justify-content:center;
  }

  .rlR{
    width:100%;
    height:100%;
  }

  nav span#navContent{
    display:flex;
    justify-content: center;
    height:100%;
    top:0px;
  }


  nav{
    text-align: center;
    background-color: #000000;
    width:100%;
    min-width:100vw;
  }

  .menuItem:hover{
    transition:0.5s ease-in all;
  }

  .menuItem{
    width:170px;
    min-width:fit-content;
    height:50px;
    transition:1s ease-out all;
    align-items: center;
    padding-bottom:10px;
    background-color: black;
    text-decoration: none;
    list-style: none;
    display: block;
    padding: 1rem 2rem 0rem 2rem;
    transition:0.5s ease-out all;
  }

  a{
    text-decoration: none;
    color: white;
  }

  i#buttonTranslateIcon{
      color:white !important;
    
  }

  a#headerHomeLink{
    display:flex;
    flex-direction: row;
    font:inherit;
  }

  span#headerTitle{
    display:flex;
    align-items: center;
    justify-content: center;
    height:100%;
    padding-left:10px;
    font-size: var(--HeaderSize);
    color: white;
    font-weight: bold;
    font-size:1.5em !important;
    position: absolute;
    left:0;
  }

  img#headerLogo{
    width: 35px;
    height: 35px;
    margin-right: 10px;
    border-radius:50%;
  }
</style>