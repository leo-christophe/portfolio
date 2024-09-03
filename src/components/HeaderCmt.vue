<script setup>
import 'primeicons/primeicons.css';
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';

const items = [
  { label: 'Home', route: '/', icon: 'pi pi-home' },
  { label: 'Formations', route: '/formations', icon: 'pi pi-book' },
  { label: 'Experience', route: '/experience', icon: 'pi pi-briefcase' },
  { label: 'Projects', route: '/projects', icon: 'pi pi-folder' },
  { label: 'Contact', route: '/contact', icon: 'pi pi-envelope' }
];

</script>

<template>
  <nav>
      <ul>
          <li v-for="(item, index) in items" :key="index" class="menuItem" >
            <RouterLink :to="item.route">
              <span :ref="'menu_'+index">
                <i :class="item.icon"></i> 
                {{ item.label }}
              </span>
            </RouterLink>
          </li>
      </ul>
  </nav>
</template>

<style scoped>
  i{
    margin-right: 10px;
  }

  nav{
    text-align: center;
    background-color: #000000;
  }

  .menuItem:hover{
    transition:0.5s ease-in all;
  }

  .menuItem{
    transition:1s ease-out all;
    align-items: center;
    padding-bottom:10px;
    margin-right:10px;
  }

  li:hover{
    transition:0.5s all;
  }

  li {
    background-color: black;
    text-decoration: none;
    list-style: none;
    display: inline;
    padding: 1rem 2rem 0rem 2rem;
    margin:1px;
    transition:0.5s ease-out all;
  }

  ul{
    top:0px;
    padding:10px;
    
  }

  a{
    text-decoration: none;
    color: white;
  }


  @media (max-width: 860px){
    li{
      display:block;
    }
  }
</style>