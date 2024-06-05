<script setup>
import DocumentViewer from '../components/DocumentViewer.vue'
import News from '../components/News.vue'
</script>

<template>

    <div id="welcome">
        <div id="photo">
            Photo
        </div>
        <div id="text">
            <h1>Hi, I'm Léo CHRISTOPHE</h1>
            <p>2nd year IT student</p>
            <p>Based in Annecy, France</p>
        </div>
    </div>

    <News></News>

    <!-- <DocumentViewer/> -->

    

</template>

<style scoped>
    #id{
        background-color:rgb(213, 249, 255);
        border-radius: 10px;
        font-size: 2rem;
        color: #ff7300;
        font-weight: 800;
    }

    #text{
        display:inline;
    }

    #welcome{
        text-align:center;
    }
</style>