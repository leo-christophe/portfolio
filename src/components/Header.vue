<script setup>
import 'primeicons/primeicons.css'
</script>

<template>
    <nav>
        <RouterLink to="/">
            <li class="menuItem">Home</li>
        </RouterLink>
        <RouterLink to="/formations">
            <li class="menuItem">Formations</li>
        </RouterLink>
        <RouterLink to="/experience">
            <li class="menuItem">Experience</li>
        </RouterLink>
        <RouterLink to="/projects">
            <li class="menuItem">Projects</li>
        </RouterLink>
        <RouterLink to="/hobbies">
            <li class="menuItem">Hobbies</li>
        </RouterLink>
        <RouterLink to="/contact">
            <li class="menuItem">Contact me</li>
        </RouterLink>
    </nav>
</template>


<style scoped>
  nav{
    margin-bottom:50px;
  }

  .menuItem:hover{
    color:rgb(61, 61, 255);
    transition:0.5s ease-in all;
  }

  .menuItem{
    transition:1s ease-out all;
  }

  li:hover{
    padding-bottom:1.2rem;
    transition:0.5s all;
  }

  li {
    background-color: black;
    text-decoration: none;
    list-style: none;
    display: inline;
    padding: 1rem 2rem 1rem 2rem;
    margin:1px;
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
    li{
      display:block;
    }
  }
</style>