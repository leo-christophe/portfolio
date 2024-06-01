<script setup>
    import { ref } from 'vue';
    const links = ref([
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/leo-christophe/',
            image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogopng.com.br%2Flogos%2Flinkedin-83.png&f=1&nofb=1&ipt=dc66bbb08b2ea34d09367206dd5c669ee65d6b99f7198244a29605273c1296a8&ipo=images',
        },
        {
            name: 'GitHub',
            url: 'https://github.com/leo-christophe',
            image:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogos-download.com%2Fwp-content%2Fuploads%2F2016%2F09%2FGitHub_logo.png&f=1&nofb=1&ipt=7356831c0a018ae48cd7996113e7b49a8d6ea0fd685122de0fd528c18340fcb4&ipo=images',
        }])
</script>

<template>
    <footer>
        <p>© 2021 Léo CHRISTOPHE</p>
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
    }
</style>
  