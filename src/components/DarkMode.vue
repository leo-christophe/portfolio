<script setup>
import { ref, watch } from 'vue';

const icon = ref(null)

function switchMode(){
    const body = document.querySelector('body');
    
    if (icon.value.classList.contains('pi-sun')){
        icon.value.classList.remove('pi-sun');
        icon.value.classList.add('pi-moon');

        body.style.backgroundColor = '#282828';
        body.style.color = 'white';

    }else{
        icon.value.classList.remove('pi-moon');
        icon.value.classList.add('pi-sun');

        body.style.backgroundColor = 'lightgray';
        body.style.color = 'black';
    }
}
</script>

<template>
    <i ref="icon" class="pi pi-moon" @click="switchMode()"></i>
    
</template>

<style scoped>
    .pi-moon{
        color:darkblue;
    }

    .pi-sun{
        color:orangered
    }

    *{
        position:absolute;
        top:0px;
        left:0px;
        padding:1rem;
        margin:0.5rem;
    }

    i{        
        background-color:rgb(213, 249, 255);
        border-radius: 10px;
        font-size: 2rem;
        color: #ff7300;
        font-weight: 800;
    }
</style>