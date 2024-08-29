<template>
    <div id="centerButton">
        <button>Consulter mon CV</button>
    </div>
</template>

<script>
import Button from 'primevue/button';
</script>

<style scoped>
.centerButton{
    display:flex;
    place-content: center;
    height:100vh;
}

button{
    width:200px;
    height:50px;

}

*{
    margin-top:10vh;
}
</style>