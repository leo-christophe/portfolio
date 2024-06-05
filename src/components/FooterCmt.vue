<script setup>
    import { ref } from 'vue';
    import data from '../data/data.json';

    const links = ref(data.links);
</script>

<template>
    <footer>
        <strong><p>© {{new Date().getFullYear()}} Léo CHRISTOPHE</p></strong>
        <div id="links">
            <div v-for="link in links" :key="link.name" :id="link.name" class="link">
                <a :href="link.url" target="_blank">
                    <img :src="link.image" :id="link.name+'_img'" class="imgLink"/>
                </a>
            </div>
        </div>
    </footer>
</template>
  
<style scoped>
p{
    align-items:center;
}

    #links{
        display:inline-flex;
        float:right;
        padding:20px;

    }
    
    .imgLink {
        height: 40px;
        margin: 10px;
    }

    footer {
        background-color: rgb(0, 0, 0);
        height: 150px;
        width: 100%;
        overflow: hidden;
        color: white;
        text-align:center;
    }


</style>
  