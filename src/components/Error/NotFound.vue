<template>
    <div class="not-found">
        <h1>{{$t('notfound.title')}}</h1>
        <p>{{$t('notfound.message')}}</p>
        <router-link to="/">{{$t('notfound.home')}}</router-link>
    </div>
</template>

<script setup>

</script>

<style scoped>
.not-found {
    text-align: center;
    margin-top: 50px;
}

.not-found h1 {
    font-size: 3em;
    margin-bottom: 20px;
}

.not-found p {
    font-size: 1.5em;
    margin-bottom: 20px;
}

.not-found a {
    color: #42b983;
    text-decoration: none;
    font-weight: bold;
}
</style>