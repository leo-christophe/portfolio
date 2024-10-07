<script setup>
import { ref, onMounted } from "vue";

import { RouterLink  } from 'vue-router';
import { useI18n } from 'vue-i18n'; // Import Vue I18n
import { changeLang } from '../utils/traduction.js';

const { t, locale } = useI18n(); // Accès à la fonction de traduction

const items = ref([
  { label: t('message.home'), route: '/', icon: 'pi pi-home' },
  { label: t('message.education'), route: '/formations', icon: 'pi pi-book' },
  //{ label: t('message.experience'), route: '/experience', icon: 'pi pi-briefcase' },
  { label: t('message.projects'), route: '/projects', icon: 'pi pi-folder' },
  { label: t('message.contact'), route: '/contact', icon: 'pi pi-envelope' }
]);  

onMounted(() => {
  // Update the language of the page
   changeLang(localStorage.getItem('lang') || 'en');
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
      <ul>
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
      </ul>
  </nav>

 
</template>

<style scoped>
  @media screen and (max-width: 860px){
    .menuItem{
      padding: 1rem 0rem 0rem 0rem;


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
      margin-right:30px;
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
    
  }

  .buttonTranslateContainer{
    i, button, #buttonTranslate{
      border:none;
      background-color: transparent;
    }

    i{
      padding-left:20px;
      transition: 0.3s ease-out all;
    }

    i:hover{
      color:var(--secondColor);
      transition: 0.3s ease-in all;
    }

    width:min-content !important;
    display:flex;
    align-items:center;
    justify-self: center;
    justify-content: center;
    padding:0;
    margin:0;
    right:0;
    top:0;
    z-index: 100;
    color:white;

  }

  #buttonTranslate{
    cursor:pointer;
  }

  .rlR{
    width:100%;
    height:100%;
  }

  ul{
    display:flex;
    justify-content: center;
    height:100%;

  }


  nav{
    text-align: center;
    background-color: #000000;
    width:100%;
    
  }

  .menuItem:hover{
    transition:0.5s ease-in all;
  }

  .menuItem{
    width:200px;
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

  ul{
    top:0px;
  }

  a{
    text-decoration: none;
    color: white;
  }
</style>