<script setup>
    import { ref } from 'vue';
    import data from '../data/data.json';

    const links = ref(data.links);
</script>

<template>
    <footer>

        <ul>
            <li>
                <a href="/mesdonnees">Données personnelles</a>
            </li>
            <li>
                <a href="/contact">Informations de contact</a>
            </li>
            <li>
                <a href="/documents/Web-2024-2025.pdf#page=1&zoom=70">CV</a>
            </li>
        </ul>


        <p id="watermark"><strong>© {{new Date().getFullYear()}} Léo CHRISTOPHE</strong></p>

        <div id="links">
            <div v-for="link in links" :key="link.name" :id="link.name" class="link">
                <a :href="link.url" target="_blank"  v-if="link.url">
                    <img :src="link.image" :id="link.name+'_img'" class="imgLink"/>
                </a>
            </div>
        </div>

    </footer>
</template>
  
<style scoped>
    ul{
        margin-top:10px;
    }

    #watermark {
        float:left;
        bottom:0px;
    }

    p{
        align-items:center;
    }

    #links{
        display:inline-flex;
        float:right;
        padding:20px;
        margin-bottom:20px;
    }

    .imgLink {
        height: 40px;
        margin: 10px;
    }

    footer {
        background-color: rgb(0, 0, 0);
        height: 150px;
        width: 100vw;
        max-width:100%;
        overflow: hidden;
        color: white;
        text-align:center;
        position:relative;
    }


</style>
  