<script setup>
import 'primeicons/primeicons.css';
import { onMounted } from 'vue';
import { RouterLink  } from 'vue-router';
import { useI18n } from 'vue-i18n'; // Import Vue I18n

const { t } = useI18n(); // Accès à la fonction de traduction

const items = [
  { label: t('message.home'), route: '/', icon: 'pi pi-home' },
  { label: t('message.education'), route: '/formations', icon: 'pi pi-book' },
  { label: t('message.experience'), route: '/experience', icon: 'pi pi-briefcase' },
  { label: t('message.projects'), route: '/projects', icon: 'pi pi-folder' },
  { label: t('message.contact'), route: '/contact', icon: 'pi pi-envelope' }
];
</script>

<template>
  <nav>
      <ul>
          <RouterLink v-for="(item, index) in items" :key="index" class="menuItem" :to="item.route">
              <span :ref="'menu_'+index">
                <i :class="item.icon"></i> 
                {{ item.label }}
              </span>
          </RouterLink>
      </ul>
  </nav>
</template>

<style scoped>
  .rlR{
    width:100%;
    height:100%;
  }

  ul{
    display:flex;
    justify-content: center;

  }

  i{
    margin-right: 10px;
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
    min-width:100px;
    height:50px;
    transition:1s ease-out all;
    align-items: center;
    padding-bottom:10px;
    background-color: black;
    text-decoration: none;
    list-style: none;
    display: inline;
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


  @media (max-width: 860px){
    .menuItem{
      display:block;
    }
  }
</style>